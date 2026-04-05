#!/usr/bin/env python3
"""
RE:Boot — Agentic RAG 튜터용 ML/AI 기초 지식 시딩 스크립트

사용법:
    # 1) API 경유 (기본) — /api/tutor/ingest 엔드포인트에 POST
    python scripts/seed_mlai_docs.py

    # 2) API 베이스 URL 지정
    python scripts/seed_mlai_docs.py --base-url http://localhost:8000

    # 3) DB 직접 경로 (API 가용 전 부트스트랩용)
    python scripts/seed_mlai_docs.py --mode db

환경 변수:
    REBOOT_API_BASE   (default: http://localhost:8000)
    DATABASE_URL      (mode=db 인 경우 필요)

각 문서는 한국어로 작성된 부트캠프 수준의 입문 교재 스니펫이며,
Agentic RAG 파이프라인의 hybrid retrieval + reranking 평가에 사용된다.
"""
from __future__ import annotations

import argparse
import asyncio
import os
import sys
from dataclasses import dataclass
from typing import Iterable

# ----------------------------------------------------------------------------
# 문서 데이터 (10 ~ 15 topics)
# ----------------------------------------------------------------------------


@dataclass
class Doc:
    title: str
    content: str


DOCS: list[Doc] = [
    Doc(
        title="지도학습과 비지도학습의 차이",
        content=(
            "머신러닝은 크게 지도학습(supervised learning)과 비지도학습(unsupervised learning)으로 나뉩니다. "
            "지도학습은 입력 x와 정답 레이블 y의 쌍 (x, y)를 가지고 모델이 x → y 매핑을 학습합니다. "
            "대표적인 문제로 분류(classification)와 회귀(regression)가 있으며, 스팸 메일 판별, 주택 가격 예측 등이 여기에 속합니다. "
            "반대로 비지도학습은 레이블 없이 입력 x만 주어졌을 때 데이터의 내재된 구조를 찾는 방법입니다. "
            "군집화(clustering, 예: K-Means), 차원 축소(dimensionality reduction, 예: PCA), 이상치 탐지가 대표 예시입니다. "
            "두 접근의 중간에는 준지도학습(semi-supervised)과 자기지도학습(self-supervised)이 있으며, "
            "최근의 대규모 사전학습 모델은 대부분 자기지도학습을 활용합니다. "
            "문제 정의 단계에서 '레이블이 있는가'를 먼저 확인하는 것이 방법론 선택의 출발점입니다."
        ),
    ),
    Doc(
        title="과적합과 정규화 (L1, L2, Dropout, Early Stopping)",
        content=(
            "과적합(overfitting)은 모델이 학습 데이터에 지나치게 맞춰져서 새로운 데이터에 일반화되지 못하는 현상입니다. "
            "학습 손실은 계속 떨어지는데 검증 손실이 상승하기 시작한다면 과적합의 신호입니다. "
            "정규화(regularization)는 이를 완화하기 위한 기법의 총칭입니다. "
            "L2 정규화(Ridge)는 가중치의 제곱합을 손실에 더해 큰 가중치를 억제하고, "
            "L1 정규화(Lasso)는 절댓값의 합을 더해 일부 가중치를 0으로 만들어 희소 모델을 유도합니다. "
            "신경망에서는 Dropout이 널리 쓰이는데, 학습 중 무작위로 뉴런을 꺼서 특정 경로에 과의존하는 것을 막습니다. "
            "Early Stopping은 검증 손실이 더 이상 개선되지 않을 때 학습을 멈추는 단순하지만 강력한 전략입니다. "
            "데이터 증강(augmentation)도 넓은 의미의 정규화로 볼 수 있습니다."
        ),
    ),
    Doc(
        title="경사 하강법과 학습률",
        content=(
            "경사 하강법(Gradient Descent)은 손실 함수의 기울기(gradient)를 따라 파라미터를 갱신하는 최적화 알고리즘입니다. "
            "기본 공식은 θ_{t+1} = θ_t - η * ∇L(θ_t) 이며, 여기서 η는 학습률(learning rate)입니다. "
            "학습률이 너무 크면 손실이 발산하거나 진동하고, 너무 작으면 수렴이 느리거나 지역 최소점에 갇힙니다. "
            "실전에서는 전체 데이터를 한 번에 쓰는 배치 GD 대신 미니배치 SGD를 사용합니다. "
            "모멘텀(Momentum)은 이전 갱신의 방향을 누적해 진동을 완화하고, "
            "Adam은 1차/2차 모멘트 추정을 결합해 파라미터별 적응형 학습률을 제공합니다. "
            "학습률 스케줄러(Step, Cosine, Warmup)를 함께 쓰면 학습 초반과 후반의 요구가 다른 문제에 잘 대응할 수 있습니다."
        ),
    ),
    Doc(
        title="신경망 기초 — 활성화 함수와 역전파",
        content=(
            "인공 신경망은 입력층, 은닉층, 출력층으로 구성되며 각 뉴런은 가중합 z = Wx + b 에 활성화 함수 σ(z)를 적용합니다. "
            "활성화 함수가 없다면 층을 아무리 쌓아도 하나의 선형 변환과 같아지므로 비선형성이 필수입니다. "
            "대표적 활성화 함수로 Sigmoid, Tanh, ReLU가 있으며, ReLU는 기울기 소실 문제를 완화해 딥러닝 부흥의 한 축이 되었습니다. "
            "최근에는 GELU, SiLU(Swish) 등이 Transformer 계열에서 선호됩니다. "
            "학습은 순전파(forward)로 예측을 만들고, 손실을 계산한 뒤 역전파(backpropagation)로 각 파라미터의 기울기를 계산합니다. "
            "역전파는 연쇄 법칙(chain rule)을 체계적으로 적용하는 알고리즘이며, 현대 프레임워크는 이 과정을 자동미분으로 처리합니다."
        ),
    ),
    Doc(
        title="손실 함수 — MSE와 Cross-Entropy",
        content=(
            "손실 함수(loss function)는 모델의 예측이 정답으로부터 얼마나 떨어져 있는지를 수치화합니다. "
            "회귀 문제에서는 평균제곱오차(MSE, Mean Squared Error)가 기본이며, 큰 오차에 더 큰 페널티를 부여합니다. "
            "이상치에 민감한 특성이 있어 MAE나 Huber Loss가 대안으로 쓰이기도 합니다. "
            "분류 문제에서는 교차 엔트로피(Cross-Entropy)가 표준입니다. "
            "이진 분류에서는 Binary Cross-Entropy, 다중 분류에서는 Categorical Cross-Entropy를 사용하며, "
            "모델 출력을 Softmax로 확률 분포로 만든 뒤 정답 분포와의 KL 발산을 최소화하는 것과 같습니다. "
            "손실 함수는 문제의 가정(출력 분포)과 평가 지표를 연결하는 다리이므로, 문제 성격에 맞춰 신중히 선택해야 합니다."
        ),
    ),
    Doc(
        title="합성곱 신경망 (CNN) 기초",
        content=(
            "합성곱 신경망(Convolutional Neural Network, CNN)은 이미지처럼 국소적 상관이 강한 데이터에 특화된 구조입니다. "
            "완전연결층과 달리 CNN은 작은 커널(filter)을 입력 위에서 슬라이딩하며 지역 패턴을 감지합니다. "
            "핵심 연산은 Convolution, Activation, Pooling의 반복이며, 이를 통해 점진적으로 저수준(에지) → 중수준(질감) → 고수준(객체) 특징을 추출합니다. "
            "파라미터 공유(parameter sharing) 덕분에 완전연결망보다 훨씬 적은 파라미터로 고차원 입력을 다룰 수 있습니다. "
            "대표 아키텍처에는 LeNet, AlexNet, VGG, ResNet이 있으며 ResNet의 Skip Connection은 매우 깊은 네트워크의 학습을 가능하게 만들었습니다. "
            "오늘날에는 Vision Transformer(ViT)가 대안으로 부상했지만, CNN은 여전히 효율성과 지역성 면에서 강력한 baseline입니다."
        ),
    ),
    Doc(
        title="순환 신경망 (RNN, LSTM)",
        content=(
            "순환 신경망(Recurrent Neural Network, RNN)은 순서가 있는 시퀀스 데이터를 처리하기 위해 설계되었습니다. "
            "이전 시점의 은닉 상태(hidden state)를 현재 입력과 결합해 다음 상태를 만드는 구조로, 시계열·언어·음성에 쓰여 왔습니다. "
            "기본 RNN은 긴 시퀀스에서 기울기가 소실되거나 폭발하는 문제로 장기 의존성을 잡기 어렵습니다. "
            "LSTM(Long Short-Term Memory)은 입력·망각·출력 게이트와 셀 상태를 도입해 장기 정보를 선택적으로 유지합니다. "
            "GRU는 LSTM을 간소화해 게이트 수를 줄이면서도 비슷한 성능을 냅니다. "
            "최근에는 Transformer가 대부분의 시퀀스 태스크에서 RNN을 대체했지만, 온디바이스 실시간 추론이나 매우 긴 스트리밍 입력에서는 여전히 RNN 계열이 경쟁력을 가집니다."
        ),
    ),
    Doc(
        title="Transformer 구조의 핵심",
        content=(
            "Transformer는 2017년 'Attention Is All You Need' 논문에서 제안된 구조로, 순환 없이 Self-Attention만으로 시퀀스를 처리합니다. "
            "핵심은 Query(Q), Key(K), Value(V)의 점곱 유사도로 토큰 간 관계 가중치를 계산하는 Scaled Dot-Product Attention입니다. "
            "Multi-Head Attention은 여러 개의 어텐션을 병렬로 수행해 다양한 관계 패턴을 동시에 학습합니다. "
            "각 층은 Attention → Feed-Forward → LayerNorm → Residual의 순서로 구성되며, 위치 정보는 Positional Encoding으로 주입합니다. "
            "BERT(인코더), GPT(디코더), T5(인코더-디코더) 계열이 모두 이 구조에서 파생되었고, "
            "ViT를 통해 비전 분야로도 확장되어 오늘날 파운데이션 모델의 사실상 표준이 되었습니다."
        ),
    ),
    Doc(
        title="파이토치 기본 — 텐서, autograd, nn.Module",
        content=(
            "PyTorch는 연구와 현업 모두에서 널리 쓰이는 딥러닝 프레임워크입니다. "
            "모든 데이터는 `torch.Tensor`로 표현되며 NumPy 배열과 유사하지만 GPU 가속과 자동미분을 지원합니다. "
            "`requires_grad=True`로 만든 텐서에 연산을 수행하면 계산 그래프가 동적으로 구성되고, `.backward()`를 호출하면 autograd가 각 leaf 텐서의 `.grad`를 채웁니다. "
            "모델은 보통 `nn.Module`을 상속해 `__init__`에서 서브모듈을 선언하고 `forward`에서 순전파를 정의합니다. "
            "학습 루프는 (1) 배치 샘플링, (2) forward, (3) loss 계산, (4) `optimizer.zero_grad()`, (5) `loss.backward()`, (6) `optimizer.step()` 의 6단계로 요약됩니다. "
            "GPU 사용 시에는 `.to(device)`로 모델과 입력을 모두 같은 디바이스로 옮겨야 합니다."
        ),
    ),
    Doc(
        title="scikit-learn 기본 — train_test_split, Pipeline, metrics",
        content=(
            "scikit-learn은 고전 머신러닝의 표준 파이썬 라이브러리입니다. "
            "`train_test_split(X, y, test_size=0.2, stratify=y)`로 학습/검증 세트를 나누는 것이 첫 단계입니다. "
            "`Pipeline`은 전처리 단계와 모델을 하나의 객체로 묶어 데이터 누수(leakage)를 방지합니다. "
            "예를 들어 `Pipeline([('scaler', StandardScaler()), ('clf', LogisticRegression())])`와 같이 구성하면 `fit/predict`만으로 전체 흐름이 실행됩니다. "
            "`metrics` 모듈은 accuracy_score, precision_score, recall_score, f1_score, roc_auc_score, confusion_matrix 등 다양한 평가 지표를 제공합니다. "
            "하이퍼파라미터 탐색에는 `GridSearchCV`나 `RandomizedSearchCV`를 사용하며, 교차 검증을 내장하고 있어 안정적인 성능 추정이 가능합니다."
        ),
    ),
    Doc(
        title="분류 모델 평가 지표 — accuracy, precision, recall, F1",
        content=(
            "분류 모델의 성능을 정확도(accuracy) 하나로만 판단하면 위험합니다. "
            "특히 클래스가 불균형할 때, 모든 샘플을 다수 클래스로 예측해도 정확도가 높게 나올 수 있습니다. "
            "정밀도(precision)는 '모델이 양성이라 말한 것 중 실제 양성의 비율'로, False Positive를 줄여야 할 때 중요합니다. "
            "재현율(recall)은 '실제 양성 중 모델이 찾아낸 비율'로, False Negative가 치명적일 때 중시됩니다(예: 질병 진단). "
            "F1 점수는 정밀도와 재현율의 조화평균으로 둘의 균형을 하나의 숫자로 요약합니다. "
            "다중 분류에서는 macro-F1, micro-F1, weighted-F1을 구분해 사용하고, 임계값에 무관한 평가가 필요할 때는 ROC-AUC나 PR-AUC를 고려합니다."
        ),
    ),
    Doc(
        title="편향-분산 트레이드오프",
        content=(
            "일반화 오차는 편향(bias), 분산(variance), 그리고 제거 불가능한 잡음으로 분해됩니다. "
            "편향이 큰 모델은 데이터의 복잡도를 따라가지 못해 학습·검증 성능이 모두 낮으며, 이를 과소적합(underfitting)이라 부릅니다. "
            "분산이 큰 모델은 학습 데이터에는 매우 잘 맞지만 새로운 데이터에는 흔들리는 과적합(overfitting) 상태입니다. "
            "일반적으로 모델 용량(capacity)을 키우면 편향이 줄고 분산이 커지는 트레이드오프가 존재합니다. "
            "해결책은 '적절한 복잡도의 모델 + 정규화 + 충분한 데이터'입니다. "
            "앙상블(Bagging)은 분산을 줄이고, 부스팅(Boosting)은 편향을 줄이는 데 효과적입니다. "
            "검증 곡선(validation curve)과 학습 곡선(learning curve)은 현재 모델이 어느 쪽 문제를 겪고 있는지 진단하는 핵심 도구입니다."
        ),
    ),
    Doc(
        title="데이터 전처리 — 정규화와 인코딩",
        content=(
            "실전 머신러닝에서는 모델링보다 데이터 전처리에 더 많은 시간이 들어갑니다. "
            "수치형 변수는 스케일 차이가 크면 거리 기반 알고리즘(KNN, SVM)이나 경사 하강법 수렴이 불안정해지므로, "
            "StandardScaler(평균 0, 분산 1) 또는 MinMaxScaler(0~1 범위)로 정규화합니다. "
            "범주형 변수는 모델이 이해할 수 있도록 수치로 인코딩해야 합니다. "
            "순서가 없는 경우 One-Hot Encoding, 순서가 있는 경우 Ordinal Encoding, 카디널리티가 매우 큰 경우 Target Encoding을 고려합니다. "
            "결측치는 단순 제거, 평균/중앙값 대체, KNN 기반 대체 등 여러 전략을 비교해야 하며, "
            "전처리 단계는 반드시 Pipeline 안에서 수행해 테스트 세트의 정보가 학습에 누출되지 않도록 해야 합니다."
        ),
    ),
    Doc(
        title="교차 검증 (Cross-Validation)",
        content=(
            "단일한 홀드아웃 분할로 성능을 추정하면 데이터가 적을 때 변동이 큽니다. "
            "교차 검증(Cross-Validation)은 데이터를 여러 폴드로 나누어 돌아가며 검증 세트로 사용하는 방법입니다. "
            "K-Fold CV는 데이터를 K개로 나누고 K번 학습·평가한 뒤 평균 성능을 보고합니다. "
            "분류에서는 클래스 비율을 보존하는 Stratified K-Fold가 기본이며, 시계열에서는 과거로부터 미래를 예측해야 하므로 TimeSeriesSplit을 사용합니다. "
            "교차 검증은 하이퍼파라미터 탐색과 결합되어 GridSearchCV로 쓰이며, 최종 성능 추정은 별도의 홀드아웃 테스트 세트에서 수행해야 공정합니다. "
            "CV는 비용이 크지만 소량 데이터에서 모델 선택의 분산을 크게 줄여주는 필수 도구입니다."
        ),
    ),
    Doc(
        title="하이퍼파라미터 튜닝",
        content=(
            "하이퍼파라미터는 학습으로 결정되지 않고 사람이 설정하는 값입니다. "
            "학습률, 배치 크기, 은닉층 크기, 정규화 강도, 트리 깊이 등이 모두 여기에 속합니다. "
            "가장 단순한 접근은 Grid Search로 미리 정한 격자의 모든 조합을 시도하는 방법이지만, 차원이 커지면 조합 폭발 문제가 생깁니다. "
            "Random Search는 같은 예산에서 고차원 공간을 더 효율적으로 탐색한다는 것이 실험적으로 밝혀져 있습니다. "
            "베이지안 최적화(Optuna, Hyperopt)는 과거 시도의 결과로 다음 시도를 제안해 적은 평가 횟수로 좋은 해를 찾습니다. "
            "튜닝은 항상 교차 검증과 결합해 수행하고, 최종 성능 보고는 튜닝에 사용되지 않은 별도 테스트 세트에서 측정해야 합니다."
        ),
    ),
]


# ----------------------------------------------------------------------------
# 청크 분할 유틸
# ----------------------------------------------------------------------------


def chunk_document(text: str, chunk_size: int = 500, overlap: int = 100) -> list[str]:
    """
    긴 문서를 slide-window 방식으로 chunk_size 문자 단위로 자른다.
    overlap 만큼 겹쳐서 문맥 단절을 완화한다.

    - chunk_size: 한 조각 최대 문자 수
    - overlap:    이전 조각과 겹치는 문자 수
    """
    if chunk_size <= 0:
        raise ValueError("chunk_size must be > 0")
    if overlap < 0 or overlap >= chunk_size:
        raise ValueError("overlap must satisfy 0 <= overlap < chunk_size")

    text = text.strip()
    if len(text) <= chunk_size:
        return [text]

    chunks: list[str] = []
    start = 0
    step = chunk_size - overlap
    while start < len(text):
        end = min(start + chunk_size, len(text))
        chunks.append(text[start:end])
        if end >= len(text):
            break
        start += step
    return chunks


# ----------------------------------------------------------------------------
# Ingest 경로 1 — API 경유
# ----------------------------------------------------------------------------


async def ingest_via_api(docs: Iterable[Doc], base_url: str, token: str) -> None:
    """
    /api/tutor/ingest 엔드포인트는 INSTRUCTOR/MANAGER 권한 JWT를 요구하며,
    payload 는 `{title, content, section?}` 형태이다. 청킹/임베딩은 서버에서 수행한다.
    """
    try:
        import httpx  # type: ignore
    except ImportError:
        print("[!] httpx가 설치되어 있지 않습니다. `pip install httpx` 후 다시 실행하세요.", file=sys.stderr)
        sys.exit(2)

    endpoint = base_url.rstrip("/") + "/api/tutor/ingest"
    headers = {"Authorization": f"Bearer {token}"} if token else {}
    print(f"[i] API 모드: {endpoint}")

    async with httpx.AsyncClient(timeout=120.0, headers=headers) as client:
        for idx, doc in enumerate(docs, 1):
            payload = {
                "title": doc.title,
                "content": doc.content,
                "section": getattr(doc, "section", None) or None,
            }
            try:
                resp = await client.post(endpoint, json=payload)
                resp.raise_for_status()
                data = resp.json() if resp.headers.get("content-type", "").startswith("application/json") else {}
                chunks = data.get("chunks_created", "?") if isinstance(data, dict) else "?"
                print(f"  [{idx:02d}/{len(DOCS):02d}] ✓ {doc.title} ({chunks} chunks)")
            except httpx.HTTPStatusError as e:
                print(f"  [{idx:02d}/{len(DOCS):02d}] ✗ {doc.title} — HTTP {e.response.status_code}: {e.response.text[:200]}", file=sys.stderr)
            except Exception as e:
                print(f"  [{idx:02d}/{len(DOCS):02d}] ✗ {doc.title} — {type(e).__name__}: {e}", file=sys.stderr)


# ----------------------------------------------------------------------------
# Ingest 경로 2 — DB 직접 (API 부트스트랩 전 단계)
# ----------------------------------------------------------------------------


async def ingest_via_db(docs: Iterable[Doc], database_url: str) -> None:
    """
    API 엔드포인트가 아직 준비되지 않았을 때의 fallback.
    `tutor_documents` 테이블에 (title, content, chunk_index, chunk_text) 행을 삽입한다.
    실제 스키마는 api/app/models/tutor.py 를 따른다고 가정한다.
    """
    try:
        import asyncpg  # type: ignore
    except ImportError:
        print("[!] asyncpg가 설치되어 있지 않습니다. `pip install asyncpg` 후 다시 실행하세요.", file=sys.stderr)
        sys.exit(2)

    print(f"[i] DB 모드: {database_url.split('@')[-1] if '@' in database_url else database_url}")
    conn = await asyncpg.connect(database_url)
    try:
        for idx, doc in enumerate(docs, 1):
            chunks = chunk_document(doc.content)
            async with conn.transaction():
                for ci, chunk in enumerate(chunks):
                    await conn.execute(
                        """
                        INSERT INTO tutor_documents (title, content, chunk_index, chunk_text, source, lang)
                        VALUES ($1, $2, $3, $4, 'seed_mlai_docs.py', 'ko')
                        """,
                        doc.title,
                        doc.content,
                        ci,
                        chunk,
                    )
            print(f"  [{idx:02d}/{len(DOCS):02d}] ✓ {doc.title} ({len(chunks)} chunks)")
    finally:
        await conn.close()


# ----------------------------------------------------------------------------
# main
# ----------------------------------------------------------------------------


async def main() -> None:
    parser = argparse.ArgumentParser(description="ML/AI 기초 문서 시딩")
    parser.add_argument(
        "--mode",
        choices=["api", "db"],
        default="api",
        help="api: /api/tutor/ingest 호출 / db: asyncpg 직접 INSERT",
    )
    parser.add_argument(
        "--base-url",
        default=os.environ.get("REBOOT_API_BASE", "http://localhost:8000"),
        help="API 베이스 URL (mode=api)",
    )
    parser.add_argument(
        "--token",
        default=os.environ.get("INSTRUCTOR_TOKEN", ""),
        help="INSTRUCTOR/MANAGER JWT (mode=api). env INSTRUCTOR_TOKEN 으로도 전달 가능",
    )
    parser.add_argument(
        "--database-url",
        default=os.environ.get("DATABASE_URL", ""),
        help="PostgreSQL 접속 URL (mode=db)",
    )
    args = parser.parse_args()

    print(f"[+] 총 {len(DOCS)}개 문서를 시딩합니다.")
    if args.mode == "api":
        if not args.token:
            print("[!] --token 또는 INSTRUCTOR_TOKEN 환경변수가 필요합니다 (INSTRUCTOR 권한).", file=sys.stderr)
            print("    예: INSTRUCTOR_TOKEN=$(curl -s -X POST http://localhost:8000/api/auth/login -d '{...}' | jq -r .access_token) \\")
            print("         python scripts/seed_mlai_docs.py")
            sys.exit(1)
        await ingest_via_api(DOCS, args.base_url, args.token)
    else:
        if not args.database_url:
            print("[!] --database-url 또는 DATABASE_URL 환경변수가 필요합니다.", file=sys.stderr)
            sys.exit(1)
        await ingest_via_db(DOCS, args.database_url)

    print("[✓] 완료.")


if __name__ == "__main__":
    asyncio.run(main())
