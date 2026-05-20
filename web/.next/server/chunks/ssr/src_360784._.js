module.exports = {

"[project]/src/lib/utils.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "cn": (()=>cn)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
}}),
"[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "Button": (()=>Button),
    "buttonVariants": (()=>buttonVariants)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
;
// MVP: uses native <button>; swap for @radix-ui/react-slot if asChild needed.
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cva"])('inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50', {
    variants: {
        variant: {
            // 4안 Modern Gradient Indigo 팔레트 적용
            default: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-[0_8px_24px_-12px_rgba(79,70,229,0.5)] hover:shadow-[0_12px_32px_-12px_rgba(67,56,202,0.55)] active:scale-[0.98]',
            destructive: 'bg-red-600 text-white hover:bg-red-700 shadow-sm',
            outline: 'border border-indigo-200 bg-white hover:bg-indigo-50 text-indigo-700',
            secondary: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-100',
            ghost: 'hover:bg-indigo-50 text-slate-700 hover:text-indigo-700',
            link: 'text-indigo-500 underline-offset-4 decoration-indigo-200 decoration-2 hover:decoration-indigo-500 underline'
        },
        size: {
            default: 'h-10 px-5 py-2',
            sm: 'h-9 rounded-lg px-3',
            lg: 'h-12 rounded-2xl px-7 text-base',
            icon: 'h-10 w-10'
        }
    },
    defaultVariants: {
        variant: 'default',
        size: 'default'
    }
});
const Button = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.forwardRef(({ className, variant, size, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/button.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this));
Button.displayName = 'Button';
;
}}),
"[project]/src/components/Navbar.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "Navbar": (()=>Navbar)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-ssr] (ecmascript) <export default as Sparkles>");
'use client';
;
;
;
;
// v2.1-C — 학습자 5개 컴포넌트 + 강사 루프
const LEARNER_NAV = [
    {
        href: '/gap-map',
        label: '이수율'
    },
    {
        href: '/placement',
        label: '자기평가'
    },
    {
        href: '/tutor',
        label: 'CAM 튜터'
    },
    {
        href: '/checklist',
        label: '체크리스트'
    },
    {
        href: '/quiz',
        label: '망각곡선'
    }
];
const INSTRUCTOR_NAV = [
    {
        href: '/curriculum',
        label: '커리큘럼 등록'
    },
    {
        href: '/instructor',
        label: '강사 대시보드'
    }
];
function Navbar() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "fixed top-4 inset-x-0 z-50 flex justify-center px-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
            className: "glass flex w-full max-w-5xl items-center gap-1 rounded-full px-3 py-2 shadow-lg",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    href: "/",
                    className: "flex items-center gap-2 px-3 font-black tracking-tight text-indigo-700",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                            className: "h-4 w-4 text-indigo-500"
                        }, void 0, false, {
                            fileName: "[project]/src/components/Navbar.tsx",
                            lineNumber: 29,
                            columnNumber: 11
                        }, this),
                        "RE:Boot"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Navbar.tsx",
                    lineNumber: 25,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    className: "ml-2 hidden items-center gap-1 md:flex",
                    children: [
                        LEARNER_NAV.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: item.href,
                                    className: "rounded-full px-2.5 py-1.5 text-sm text-slate-700 transition hover:bg-white/60 hover:text-indigo-700",
                                    children: item.label
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.tsx",
                                    lineNumber: 35,
                                    columnNumber: 15
                                }, this)
                            }, item.href, false, {
                                fileName: "[project]/src/components/Navbar.tsx",
                                lineNumber: 34,
                                columnNumber: 13
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: "mx-1 h-4 w-px bg-indigo-100",
                            "aria-hidden": true
                        }, void 0, false, {
                            fileName: "[project]/src/components/Navbar.tsx",
                            lineNumber: 43,
                            columnNumber: 11
                        }, this),
                        INSTRUCTOR_NAV.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: item.href,
                                    className: "rounded-full px-2.5 py-1.5 text-sm text-slate-700 transition hover:bg-white/60 hover:text-violet-700",
                                    children: item.label
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Navbar.tsx",
                                    lineNumber: 46,
                                    columnNumber: 15
                                }, this)
                            }, item.href, false, {
                                fileName: "[project]/src/components/Navbar.tsx",
                                lineNumber: 45,
                                columnNumber: 13
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Navbar.tsx",
                    lineNumber: 32,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "ml-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/auth",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                            size: "sm",
                            variant: "secondary",
                            children: "로그인"
                        }, void 0, false, {
                            fileName: "[project]/src/components/Navbar.tsx",
                            lineNumber: 57,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Navbar.tsx",
                        lineNumber: 56,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/Navbar.tsx",
                    lineNumber: 55,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Navbar.tsx",
            lineNumber: 24,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/Navbar.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/components/ui/card.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "Card": (()=>Card),
    "CardContent": (()=>CardContent),
    "CardDescription": (()=>CardDescription),
    "CardFooter": (()=>CardFooter),
    "CardHeader": (()=>CardHeader),
    "CardTitle": (()=>CardTitle)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
const Card = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('double-bezel-indigo bg-white text-card-foreground', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 6,
        columnNumber: 5
    }, this));
Card.displayName = 'Card';
const CardHeader = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex flex-col space-y-1.5 p-6', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 19,
        columnNumber: 3
    }, this));
CardHeader.displayName = 'CardHeader';
const CardTitle = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('text-xl font-semibold leading-tight tracking-tight', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 27,
        columnNumber: 3
    }, this));
CardTitle.displayName = 'CardTitle';
const CardDescription = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('text-sm text-slate-600', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 39,
        columnNumber: 3
    }, this));
CardDescription.displayName = 'CardDescription';
const CardContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('p-6 pt-0', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 47,
        columnNumber: 3
    }, this));
CardContent.displayName = 'CardContent';
const CardFooter = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.forwardRef(({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex items-center p-6 pt-0', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 55,
        columnNumber: 3
    }, this));
CardFooter.displayName = 'CardFooter';
;
}}),
"[project]/src/components/ui/badge.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "Badge": (()=>Badge),
    "badgeVariants": (()=>badgeVariants)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
const badgeVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cva"])('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors', {
    variants: {
        variant: {
            // 4안 — 전부 indigo / violet 그라데이션 가족 내에서만
            default: 'border-transparent bg-indigo-600 text-white',
            secondary: 'border border-indigo-100 bg-indigo-50 text-indigo-700',
            destructive: 'border-transparent bg-red-500 text-white',
            outline: 'border-indigo-200 text-indigo-700 bg-white',
            // emerald/amber/rose 는 금지이므로 전부 indigo 계열로 재매핑
            emerald: 'border-transparent bg-indigo-50 text-indigo-700',
            amber: 'border-transparent bg-indigo-50 text-indigo-700',
            rose: 'border-transparent bg-indigo-50 text-indigo-700',
            violet: 'border-transparent bg-violet-50 text-violet-600',
            indigo: 'border-transparent bg-indigo-50 text-indigo-700'
        }
    },
    defaultVariants: {
        variant: 'default'
    }
});
function Badge({ className, variant, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(badgeVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/badge.tsx",
        lineNumber: 32,
        columnNumber: 10
    }, this);
}
;
}}),
"[project]/src/components/ui/skeleton.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "Skeleton": (()=>Skeleton)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
function Skeleton({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('animate-pulse rounded-xl bg-slate-200/70', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/skeleton.tsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
;
}}),
"[project]/src/components/GapMapDonut.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "GapMapDonut": (()=>GapMapDonut)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/d3/src/index.js [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/d3/src/index.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const COLORS = {
    owned: '#4F46E5',
    learning: '#818CF8',
    gap: '#C7D2FE'
};
const LABELS = {
    owned: '보유',
    learning: '학습중',
    gap: '갭'
};
function GapMapDonut({ data, size = 200, className }) {
    const containerRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useRef(null);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useEffect(()=>{
        const container = containerRef.current;
        if (!container) return;
        // Clear previous render
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.select(container).selectAll('*').remove();
        const total = Math.max(data.owned + data.learning + data.gap, 1);
        const ownedPct = Math.round(data.owned / total * 100);
        const width = size;
        const height = size;
        const outerRadius = Math.min(width, height) / 2 - 8;
        const innerRadius = outerRadius * 0.6;
        const segments = [
            {
                key: 'owned',
                value: data.owned
            },
            {
                key: 'learning',
                value: data.learning
            },
            {
                key: 'gap',
                value: data.gap
            }
        ];
        const pie = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.pie().value((d)=>d.value).sort(null).padAngle(0.02);
        const arc = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.arc().innerRadius(innerRadius).outerRadius(outerRadius).cornerRadius(3);
        const arcHover = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.arc().innerRadius(innerRadius).outerRadius(outerRadius + 6).cornerRadius(3);
        const svg = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.select(container).append('svg').attr('width', width).attr('height', height).attr('viewBox', `0 0 ${width} ${height}`).style('overflow', 'visible');
        const g = svg.append('g').attr('transform', `translate(${width / 2},${height / 2})`);
        // Tooltip
        const tooltip = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.select(container).append('div').style('position', 'absolute').style('pointer-events', 'none').style('background', 'rgba(30, 27, 75, 0.92)').style('color', '#fff').style('padding', '6px 12px').style('border-radius', '8px').style('font-size', '13px').style('line-height', '1.4').style('white-space', 'nowrap').style('box-shadow', '0 4px 12px rgba(0,0,0,0.15)').style('opacity', '0').style('transition', 'opacity 150ms ease').style('z-index', '50');
        const arcs = pie(segments);
        // Track clicked segment
        let activeKey = null;
        const paths = g.selectAll('path').data(arcs).enter().append('path').attr('fill', (d)=>COLORS[d.data.key]).attr('cursor', 'pointer').style('transition', 'filter 150ms ease');
        // Animated entrance: animate from 0 to final arc
        paths.each(function(d) {
            const element = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.select(this);
            const interpolate = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.interpolate({
                startAngle: d.startAngle,
                endAngle: d.startAngle
            }, {
                startAngle: d.startAngle,
                endAngle: d.endAngle
            });
            element.transition().duration(750).ease(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.easeCubicOut).attrTween('d', ()=>(t)=>arc(interpolate(t)) || '');
        });
        // Hover interactions
        paths.on('mouseenter', function(event, d) {
            const pct = Math.round(d.data.value / total * 100);
            const label = LABELS[d.data.key] || d.data.key;
            tooltip.html(`<strong>${label}</strong>: ${d.data.value}개 (${pct}%)`).style('opacity', '1');
            if (activeKey !== d.data.key) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.select(this).transition().duration(200).attr('d', arcHover(d) || '');
            }
        }).on('mousemove', function(event) {
            const rect = container.getBoundingClientRect();
            tooltip.style('left', `${event.clientX - rect.left + 12}px`).style('top', `${event.clientY - rect.top - 10}px`);
        }).on('mouseleave', function(_event, d) {
            tooltip.style('opacity', '0');
            if (activeKey !== d.data.key) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.select(this).transition().duration(200).attr('d', arc(d) || '');
            }
        });
        // Click interaction: highlight segment
        paths.on('click', function(_event, d) {
            const clickedKey = d.data.key;
            if (activeKey === clickedKey) {
                // Deselect
                activeKey = null;
                paths.transition().duration(200).attr('d', (dd)=>arc(dd) || '').style('filter', 'none');
            } else {
                activeKey = clickedKey;
                paths.transition().duration(200).attr('d', (dd)=>dd.data.key === clickedKey ? arcHover(dd) || '' : arc(dd) || '').style('filter', (dd)=>dd.data.key === clickedKey ? 'none' : 'opacity(0.5)');
            }
        });
        // Center text: percentage
        g.append('text').attr('text-anchor', 'middle').attr('dy', '-0.1em').style('font-size', `${size * 0.2}px`).style('font-weight', '700').style('font-family', 'ui-monospace, monospace').style('fill', '#312E81') // indigo-900
        .text(`${ownedPct}%`);
        // Center text: category name
        g.append('text').attr('text-anchor', 'middle').attr('dy', '1.4em').style('font-size', `${size * 0.075}px`).style('fill', '#6366F1') // indigo-500
        .text(data.category);
        // Cleanup
        return ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2f$src$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.select(container).selectAll('*').remove();
        };
    }, [
        data,
        size
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("figure", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex flex-col items-center gap-3', className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: containerRef,
                className: "relative"
            }, void 0, false, {
                fileName: "[project]/src/components/GapMapDonut.tsx",
                lineNumber: 215,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-3 text-xs text-slate-700",
                children: [
                    'owned',
                    'learning',
                    'gap'
                ].map((key)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "inline-flex items-center gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "w-2 h-2 rounded-full",
                                style: {
                                    backgroundColor: COLORS[key]
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/GapMapDonut.tsx",
                                lineNumber: 219,
                                columnNumber: 13
                            }, this),
                            LABELS[key],
                            " ",
                            data[key]
                        ]
                    }, key, true, {
                        fileName: "[project]/src/components/GapMapDonut.tsx",
                        lineNumber: 218,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/GapMapDonut.tsx",
                lineNumber: 216,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/GapMapDonut.tsx",
        lineNumber: 214,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/components/GapMapRadar.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "GapMapRadar": (()=>GapMapRadar)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
function GapMapRadar({ data, size = 320, className }) {
    if (!data || data.length === 0) return null;
    const cx = size / 2;
    const cy = size / 2;
    const maxRadius = size / 2 - 40;
    const levels = 4; // 동심원 개수
    const n = data.length;
    const angleStep = 2 * Math.PI / n;
    const startAngle = -Math.PI / 2; // 12시 방향 시작
    // 각 카테고리의 보유율 (0~1)
    const values = data.map((d)=>{
        const total = d.owned + d.learning + d.gap;
        return total > 0 ? d.owned / total : 0;
    });
    // 학습중 포함 비율 (보유 + 학습중)
    const valuesWithLearning = data.map((d)=>{
        const total = d.owned + d.learning + d.gap;
        return total > 0 ? (d.owned + d.learning) / total : 0;
    });
    // 점 좌표 계산
    const getPoint = (index, value)=>{
        const angle = startAngle + index * angleStep;
        const r = value * maxRadius;
        return {
            x: cx + r * Math.cos(angle),
            y: cy + r * Math.sin(angle)
        };
    };
    // 다각형 path
    const toPath = (vals)=>{
        return vals.map((v, i)=>{
            const p = getPoint(i, v);
            return `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`;
        }).join(' ') + ' Z';
    };
    // 동심원 (레벨 가이드)
    const gridCircles = Array.from({
        length: levels
    }, (_, i)=>{
        const r = (i + 1) / levels * maxRadius;
        const points = Array.from({
            length: n
        }, (_, j)=>{
            const angle = startAngle + j * angleStep;
            return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
        });
        return points.join(' ');
    });
    // 축 라인
    const axisLines = data.map((_, i)=>{
        const angle = startAngle + i * angleStep;
        return {
            x2: cx + maxRadius * Math.cos(angle),
            y2: cy + maxRadius * Math.sin(angle)
        };
    });
    // 라벨 위치
    const labels = data.map((d, i)=>{
        const angle = startAngle + i * angleStep;
        const labelR = maxRadius + 24;
        const total = d.owned + d.learning + d.gap;
        const pct = total > 0 ? Math.round(d.owned / total * 100) : 0;
        return {
            x: cx + labelR * Math.cos(angle),
            y: cy + labelR * Math.sin(angle),
            category: d.category,
            pct
        };
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex flex-col items-center', className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                width: size,
                height: size,
                viewBox: `0 0 ${size} ${size}`,
                children: [
                    gridCircles.map((points, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                            points: points,
                            fill: "none",
                            stroke: "#C7D2FE",
                            strokeWidth: i === levels - 1 ? 1.5 : 0.5,
                            strokeDasharray: i === levels - 1 ? 'none' : '3,3',
                            opacity: 0.6
                        }, `grid-${i}`, false, {
                            fileName: "[project]/src/components/GapMapRadar.tsx",
                            lineNumber: 100,
                            columnNumber: 11
                        }, this)),
                    axisLines.map((line, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                            x1: cx,
                            y1: cy,
                            x2: line.x2,
                            y2: line.y2,
                            stroke: "#C7D2FE",
                            strokeWidth: 0.5,
                            opacity: 0.6
                        }, `axis-${i}`, false, {
                            fileName: "[project]/src/components/GapMapRadar.tsx",
                            lineNumber: 113,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: toPath(valuesWithLearning),
                        fill: "#818CF8",
                        fillOpacity: 0.15,
                        stroke: "#818CF8",
                        strokeWidth: 1.5,
                        strokeDasharray: "4,4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/GapMapRadar.tsx",
                        lineNumber: 126,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: toPath(values),
                        fill: "#4F46E5",
                        fillOpacity: 0.25,
                        stroke: "#4F46E5",
                        strokeWidth: 2
                    }, void 0, false, {
                        fileName: "[project]/src/components/GapMapRadar.tsx",
                        lineNumber: 136,
                        columnNumber: 9
                    }, this),
                    values.map((v, i)=>{
                        const p = getPoint(i, v);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                            cx: p.x,
                            cy: p.y,
                            r: 4,
                            fill: "#4F46E5",
                            stroke: "white",
                            strokeWidth: 2
                        }, `dot-${i}`, false, {
                            fileName: "[project]/src/components/GapMapRadar.tsx",
                            lineNumber: 148,
                            columnNumber: 13
                        }, this);
                    }),
                    labels.map((l, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                            x: l.x,
                            y: l.y,
                            textAnchor: "middle",
                            dominantBaseline: "central",
                            className: "text-[11px] font-semibold",
                            fill: "#1F2937",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tspan", {
                                    x: l.x,
                                    dy: "-0.4em",
                                    children: l.category
                                }, void 0, false, {
                                    fileName: "[project]/src/components/GapMapRadar.tsx",
                                    lineNumber: 171,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tspan", {
                                    x: l.x,
                                    dy: "1.3em",
                                    className: "text-[10px] font-mono",
                                    fill: "#4F46E5",
                                    children: [
                                        l.pct,
                                        "%"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/GapMapRadar.tsx",
                                    lineNumber: 172,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, `label-${i}`, true, {
                            fileName: "[project]/src/components/GapMapRadar.tsx",
                            lineNumber: 162,
                            columnNumber: 11
                        }, this)),
                    Array.from({
                        length: levels
                    }, (_, i)=>{
                        const pct = Math.round((i + 1) / levels * 100);
                        const r = (i + 1) / levels * maxRadius;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                            x: cx + 8,
                            y: cy - r + 4,
                            className: "text-[9px] font-mono",
                            fill: "#6366F1",
                            opacity: 0.5,
                            children: [
                                pct,
                                "%"
                            ]
                        }, `lvl-${i}`, true, {
                            fileName: "[project]/src/components/GapMapRadar.tsx",
                            lineNumber: 183,
                            columnNumber: 13
                        }, this);
                    })
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/GapMapRadar.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-6 mt-4 text-xs text-gray-600",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-3 h-3 rounded-sm bg-indigo-600 opacity-60"
                            }, void 0, false, {
                                fileName: "[project]/src/components/GapMapRadar.tsx",
                                lineNumber: 200,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "보유"
                            }, void 0, false, {
                                fileName: "[project]/src/components/GapMapRadar.tsx",
                                lineNumber: 201,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/GapMapRadar.tsx",
                        lineNumber: 199,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-3 h-3 rounded-sm border-2 border-indigo-400 border-dashed opacity-60"
                            }, void 0, false, {
                                fileName: "[project]/src/components/GapMapRadar.tsx",
                                lineNumber: 204,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "보유 + 학습중"
                            }, void 0, false, {
                                fileName: "[project]/src/components/GapMapRadar.tsx",
                                lineNumber: 205,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/GapMapRadar.tsx",
                        lineNumber: 203,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-3 h-3 rounded-sm bg-indigo-100"
                            }, void 0, false, {
                                fileName: "[project]/src/components/GapMapRadar.tsx",
                                lineNumber: 208,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "갭 영역"
                            }, void 0, false, {
                                fileName: "[project]/src/components/GapMapRadar.tsx",
                                lineNumber: 209,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/GapMapRadar.tsx",
                        lineNumber: 207,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/GapMapRadar.tsx",
                lineNumber: 198,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/GapMapRadar.tsx",
        lineNumber: 96,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/lib/auth.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
/**
 * Minimal auth token storage for MVP.
 * Prefers cookie (SameSite=Lax) so server components can read later,
 * with localStorage as a fallback.
 */ __turbopack_esm__({
    "clearToken": (()=>clearToken),
    "getToken": (()=>getToken),
    "setToken": (()=>setToken)
});
const TOKEN_KEY = 'reboot_token';
function setToken(token) {
    if ("TURBOPACK compile-time truthy", 1) return;
    "TURBOPACK unreachable";
}
function getToken() {
    if ("TURBOPACK compile-time truthy", 1) return null;
    "TURBOPACK unreachable";
}
function clearToken() {
    if ("TURBOPACK compile-time truthy", 1) return;
    "TURBOPACK unreachable";
}
}}),
"[project]/src/lib/api.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "api": (()=>api),
    "apiStream": (()=>apiStream),
    "apiUrl": (()=>apiUrl)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/auth.ts [app-ssr] (ecmascript)");
;
function apiUrl(path) {
    const base = process.env.NEXT_PUBLIC_API_URL ?? '';
    const normalized = path.startsWith('/') ? path : `/${path}`;
    if (!base) return normalized;
    return `${base.replace(/\/$/, '')}${normalized}`;
}
async function api(path, init = {}) {
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getToken"])();
    const headers = new Headers(init.headers);
    if (!headers.has('Content-Type') && init.body && !(init.body instanceof FormData)) {
        headers.set('Content-Type', 'application/json');
    }
    if (token && !headers.has('Authorization')) {
        headers.set('Authorization', `Bearer ${token}`);
    }
    const res = await fetch(apiUrl(path), {
        ...init,
        headers,
        cache: 'no-store'
    });
    if (!res.ok) {
        const err = new Error(`API ${res.status} ${res.statusText}`);
        err.status = res.status;
        try {
            err.body = await res.json();
        } catch  {}
        throw err;
    }
    if (res.status === 204) return undefined;
    const contentType = res.headers.get('content-type') ?? '';
    if (contentType.includes('application/json')) {
        return await res.json();
    }
    return await res.text();
}
async function apiStream(path, body, init = {}) {
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getToken"])();
    const headers = new Headers(init.headers);
    headers.set('Content-Type', 'application/json');
    if (token && !headers.has('Authorization')) {
        headers.set('Authorization', `Bearer ${token}`);
    }
    const res = await fetch(apiUrl(path), {
        ...init,
        method: init.method ?? 'POST',
        headers,
        body: JSON.stringify(body)
    });
    if (!res.ok || !res.body) {
        const err = new Error(`Stream ${res.status} ${res.statusText}`);
        err.status = res.status;
        throw err;
    }
    return res.body;
}
}}),
"[project]/src/app/gap-map/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>ProgressPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Navbar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/Navbar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/ui/card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/ui/badge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/ui/skeleton.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$GapMapDonut$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/GapMapDonut.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$GapMapRadar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/GapMapRadar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-ssr] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/shield-alert.js [app-ssr] (ecmascript) <export default as ShieldAlert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-ssr] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$compass$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Compass$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/compass.js [app-ssr] (ecmascript) <export default as Compass>");
'use client';
;
;
;
;
;
;
;
;
;
;
;
/* ───────────────────────────────────────────
   F0. 전체 과정 이수율 + 동기 비교 (v2.1-C · Component 0)
   - 상시 노출
   - 하위 25% 학습자 → 비교 정보 노출 약화 (자기효능감 보호)
   - Risk Score 가중치 20
   ─────────────────────────────────────────── */ const PROGRESS_METRICS = [
    {
        key: 'overall',
        label: '전체 진행',
        value: 42,
        max: 100,
        sub: 'Day 12/120'
    },
    {
        key: 'objectives',
        label: '학습목표 달성',
        value: 38,
        max: 100,
        sub: '45/120 목표'
    },
    {
        key: 'checklist',
        label: '체크리스트',
        value: 55,
        max: 100,
        sub: '66/120 항목'
    },
    {
        key: 'quiz',
        label: '퀴즈 정답률',
        value: 72,
        max: 100,
        sub: 'D+1·D+3 누적'
    }
];
const COHORT_AVG = {
    overall: 51,
    objectives: 47,
    checklist: 58,
    quiz: 70
};
// 하위 25% 가드: 본인 이수율이 cohort 평균 - 15% 미만이면 비교 정보를 흐리게 처리
const isBottomQuartile = PROGRESS_METRICS[0].value < COHORT_AVG.overall - 8;
function ProgressPage() {
    const [data, setData] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useState(null);
    const [error, setError] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useState(null);
    const [showCompare, setShowCompare] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useState(!isBottomQuartile);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.useEffect(()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"])('/api/diagnose/gap-map').then((d)=>{
            const cats = d.categories ?? {};
            const arr = Object.entries(cats).map(([name, stats])=>({
                    category: name,
                    owned: stats.owned ?? 0,
                    learning: stats.learning ?? 0,
                    gap: (stats.weak ?? 0) + (stats.gap ?? 0)
                }));
            setData(arr);
        }).catch((e)=>setError(e.message));
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Navbar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Navbar"], {}, void 0, false, {
                fileName: "[project]/src/app/gap-map/page.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "min-h-screen pt-32 pb-16 px-4 bg-cream-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-6xl space-y-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                            variant: "indigo",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                                    className: "mr-1 h-3 w-3"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/gap-map/page.tsx",
                                                    lineNumber: 68,
                                                    columnNumber: 17
                                                }, this),
                                                " 학습자 컴포넌트 0"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/gap-map/page.tsx",
                                            lineNumber: 67,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                            variant: "outline",
                                            children: "전체 과정 이수율 (상시)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/gap-map/page.tsx",
                                            lineNumber: 70,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                            variant: "outline",
                                            className: "font-mono text-[10px]",
                                            children: "Risk 가중치 20"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/gap-map/page.tsx",
                                            lineNumber: 71,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/gap-map/page.tsx",
                                    lineNumber: 66,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-3xl md:text-4xl font-bold text-indigo-900 tracking-tight",
                                    children: "Python 부트캠프 · 진행률"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/gap-map/page.tsx",
                                    lineNumber: 75,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-slate-600 leading-relaxed",
                                    children: "본인의 객관적 위치를 인식하고 메타인지를 보정합니다. 다만 하위 25% 학습자에게는 비교 정보를 약화해 자기효능감을 보호합니다."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/gap-map/page.tsx",
                                    lineNumber: 78,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/gap-map/page.tsx",
                            lineNumber: 65,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap items-center justify-between gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                className: "text-base text-indigo-900",
                                                children: "나의 진행률"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/gap-map/page.tsx",
                                                lineNumber: 88,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    isBottomQuartile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                        variant: "outline",
                                                        className: "font-mono text-[10px] text-amber-700 border-amber-200 bg-amber-50",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__["ShieldAlert"], {
                                                                className: "mr-1 h-3 w-3"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/gap-map/page.tsx",
                                                                lineNumber: 94,
                                                                columnNumber: 23
                                                            }, this),
                                                            " 비교 노출 약화 활성"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/gap-map/page.tsx",
                                                        lineNumber: 93,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setShowCompare((s)=>!s),
                                                        className: "rounded-full border border-indigo-100 px-3 py-1 text-xs text-indigo-700 hover:bg-indigo-50",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                                className: "-mt-0.5 mr-1 inline h-3 w-3"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/gap-map/page.tsx",
                                                                lineNumber: 101,
                                                                columnNumber: 21
                                                            }, this),
                                                            showCompare ? '동기 평균 숨기기' : '동기 평균 보기'
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/gap-map/page.tsx",
                                                        lineNumber: 97,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/gap-map/page.tsx",
                                                lineNumber: 91,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/gap-map/page.tsx",
                                        lineNumber: 87,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/gap-map/page.tsx",
                                    lineNumber: 86,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                                    className: "space-y-5",
                                    children: PROGRESS_METRICS.map((m)=>{
                                        const cohort = COHORT_AVG[m.key];
                                        const youAhead = m.value >= cohort;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-baseline justify-between gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm font-medium text-slate-800",
                                                            children: m.label
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/gap-map/page.tsx",
                                                            lineNumber: 114,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-mono text-xs text-slate-500",
                                                            children: m.sub
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/gap-map/page.tsx",
                                                            lineNumber: 115,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/gap-map/page.tsx",
                                                    lineNumber: 113,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative h-3 w-full overflow-hidden rounded-full bg-indigo-50",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "h-full rounded-full bg-indigo-600 transition-all",
                                                            style: {
                                                                width: `${m.value}%`
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/gap-map/page.tsx",
                                                            lineNumber: 118,
                                                            columnNumber: 23
                                                        }, this),
                                                        showCompare && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('absolute top-0 h-full w-0.5', youAhead ? 'bg-emerald-500' : 'bg-rose-500'),
                                                            style: {
                                                                left: `${cohort}%`
                                                            },
                                                            "aria-label": `동기 평균 ${cohort}%`
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/gap-map/page.tsx",
                                                            lineNumber: 123,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/gap-map/page.tsx",
                                                    lineNumber: 117,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between text-xs",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-mono font-semibold text-indigo-700",
                                                            children: [
                                                                m.value,
                                                                "%"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/gap-map/page.tsx",
                                                            lineNumber: 134,
                                                            columnNumber: 23
                                                        }, this),
                                                        showCompare && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('font-mono', isBottomQuartile ? 'text-slate-400' : 'text-slate-500'),
                                                            children: [
                                                                "동기 평균 ",
                                                                cohort,
                                                                "%",
                                                                !isBottomQuartile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('ml-2', youAhead ? 'text-emerald-600' : 'text-rose-600'),
                                                                    children: [
                                                                        youAhead ? '▲' : '▼',
                                                                        " ",
                                                                        Math.abs(m.value - cohort),
                                                                        "p"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/gap-map/page.tsx",
                                                                    lineNumber: 146,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/gap-map/page.tsx",
                                                            lineNumber: 138,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/gap-map/page.tsx",
                                                    lineNumber: 133,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, m.key, true, {
                                            fileName: "[project]/src/app/gap-map/page.tsx",
                                            lineNumber: 112,
                                            columnNumber: 19
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/app/gap-map/page.tsx",
                                    lineNumber: 107,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/gap-map/page.tsx",
                            lineNumber: 85,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                                className: "py-5 text-sm leading-relaxed text-slate-700",
                                children: isBottomQuartile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__["ShieldAlert"], {
                                            className: "-mt-0.5 mr-1 inline h-4 w-4 text-amber-600"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/gap-map/page.tsx",
                                            lineNumber: 169,
                                            columnNumber: 19
                                        }, this),
                                        "현재 비교 정보 노출이 약화되어 있습니다. 본인의 진행률에만 집중해 체크리스트 증거 입력과 CAM 자습 큐를 우선 처리해보세요."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/gap-map/page.tsx",
                                    lineNumber: 168,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                            className: "-mt-0.5 mr-1 inline h-4 w-4 text-indigo-600"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/gap-map/page.tsx",
                                            lineNumber: 175,
                                            columnNumber: 19
                                        }, this),
                                        "본인 이수율 ",
                                        PROGRESS_METRICS[0].value,
                                        "% vs 동기 평균",
                                        ' ',
                                        COHORT_AVG.overall,
                                        "% → 객관적 위치 인식 → 메타인지 보정 단계로 진입합니다."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/gap-map/page.tsx",
                                    lineNumber: 174,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/gap-map/page.tsx",
                                lineNumber: 166,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/gap-map/page.tsx",
                            lineNumber: 165,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                            variant: "indigo",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$compass$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Compass$3e$__["Compass"], {
                                                    className: "mr-1 h-3 w-3"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/gap-map/page.tsx",
                                                    lineNumber: 187,
                                                    columnNumber: 17
                                                }, this),
                                                " 카테고리별 갭맵 · ZPD"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/gap-map/page.tsx",
                                            lineNumber: 186,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-slate-500",
                                            children: "보유 · 학습중 · 갭 비율"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/gap-map/page.tsx",
                                            lineNumber: 189,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/gap-map/page.tsx",
                                    lineNumber: 185,
                                    columnNumber: 13
                                }, this),
                                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                                        className: "pt-6 text-xs text-slate-500",
                                        children: [
                                            "카테고리 갭맵 데이터를 불러오지 못했습니다. (",
                                            error,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/gap-map/page.tsx",
                                        lineNumber: 194,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/gap-map/page.tsx",
                                    lineNumber: 193,
                                    columnNumber: 15
                                }, this),
                                !data && !error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
                                    children: [
                                        0,
                                        1,
                                        2,
                                        3,
                                        4,
                                        5
                                    ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Skeleton"], {
                                            className: "h-64"
                                        }, i, false, {
                                            fileName: "[project]/src/app/gap-map/page.tsx",
                                            lineNumber: 203,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/gap-map/page.tsx",
                                    lineNumber: 201,
                                    columnNumber: 15
                                }, this),
                                data && data.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
                                            children: data.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                                className: "text-base",
                                                                children: d.category
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/gap-map/page.tsx",
                                                                lineNumber: 214,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/gap-map/page.tsx",
                                                            lineNumber: 213,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                                                            className: "flex justify-center",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$GapMapDonut$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GapMapDonut"], {
                                                                data: d
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/gap-map/page.tsx",
                                                                lineNumber: 217,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/gap-map/page.tsx",
                                                            lineNumber: 216,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, d.category, true, {
                                                    fileName: "[project]/src/app/gap-map/page.tsx",
                                                    lineNumber: 212,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/gap-map/page.tsx",
                                            lineNumber: 210,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                            className: "text-base",
                                                            children: "전체 역량 레이더"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/gap-map/page.tsx",
                                                            lineNumber: 224,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardDescription"], {
                                                            children: "모든 카테고리를 한 화면에서"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/gap-map/page.tsx",
                                                            lineNumber: 225,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/gap-map/page.tsx",
                                                    lineNumber: 223,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$GapMapRadar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GapMapRadar"], {
                                                        data: data
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/gap-map/page.tsx",
                                                        lineNumber: 228,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/gap-map/page.tsx",
                                                    lineNumber: 227,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/gap-map/page.tsx",
                                            lineNumber: 222,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/gap-map/page.tsx",
                            lineNumber: 184,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/gap-map/page.tsx",
                    lineNumber: 64,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/gap-map/page.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}}),
"[project]/src/app/gap-map/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules ssr)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: require } = __turbopack_context__;
{
}}),

};

//# sourceMappingURL=src_360784._.js.map