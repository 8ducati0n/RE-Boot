(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/src_9d0021._.js", {

"[project]/src/lib/utils.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "cn": (()=>cn)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/button.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "Button": (()=>Button),
    "buttonVariants": (()=>buttonVariants)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
// MVP: uses native <button>; swap for @radix-ui/react-slot if asChild needed.
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])('inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50', {
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
const Button = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.forwardRef(_c = ({ className, variant, size, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
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
_c1 = Button;
Button.displayName = 'Button';
;
var _c, _c1;
__turbopack_refresh__.register(_c, "Button$React.forwardRef");
__turbopack_refresh__.register(_c1, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/Navbar.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "Navbar": (()=>Navbar)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "fixed top-4 inset-x-0 z-50 flex justify-center px-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
            className: "glass flex w-full max-w-5xl items-center gap-1 rounded-full px-3 py-2 shadow-lg",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/",
                    className: "flex items-center gap-2 px-3 font-black tracking-tight text-indigo-700",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    className: "ml-2 hidden items-center gap-1 md:flex",
                    children: [
                        LEARNER_NAV.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: "mx-1 h-4 w-px bg-indigo-100",
                            "aria-hidden": true
                        }, void 0, false, {
                            fileName: "[project]/src/components/Navbar.tsx",
                            lineNumber: 43,
                            columnNumber: 11
                        }, this),
                        INSTRUCTOR_NAV.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "ml-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/auth",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
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
_c = Navbar;
var _c;
__turbopack_refresh__.register(_c, "Navbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/card.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "Card": (()=>Card),
    "CardContent": (()=>CardContent),
    "CardDescription": (()=>CardDescription),
    "CardFooter": (()=>CardFooter),
    "CardHeader": (()=>CardHeader),
    "CardTitle": (()=>CardTitle)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const Card = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.forwardRef(_c = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('double-bezel-indigo bg-white text-card-foreground', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 6,
        columnNumber: 5
    }, this));
_c1 = Card;
Card.displayName = 'Card';
const CardHeader = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.forwardRef(_c2 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex flex-col space-y-1.5 p-6', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 19,
        columnNumber: 3
    }, this));
_c3 = CardHeader;
CardHeader.displayName = 'CardHeader';
const CardTitle = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.forwardRef(_c4 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-xl font-semibold leading-tight tracking-tight', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 27,
        columnNumber: 3
    }, this));
_c5 = CardTitle;
CardTitle.displayName = 'CardTitle';
const CardDescription = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.forwardRef(_c6 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-sm text-slate-600', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 39,
        columnNumber: 3
    }, this));
_c7 = CardDescription;
CardDescription.displayName = 'CardDescription';
const CardContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.forwardRef(_c8 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('p-6 pt-0', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 47,
        columnNumber: 3
    }, this));
_c9 = CardContent;
CardContent.displayName = 'CardContent';
const CardFooter = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.forwardRef(_c10 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex items-center p-6 pt-0', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 55,
        columnNumber: 3
    }, this));
_c11 = CardFooter;
CardFooter.displayName = 'CardFooter';
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11;
__turbopack_refresh__.register(_c, "Card$React.forwardRef");
__turbopack_refresh__.register(_c1, "Card");
__turbopack_refresh__.register(_c2, "CardHeader$React.forwardRef");
__turbopack_refresh__.register(_c3, "CardHeader");
__turbopack_refresh__.register(_c4, "CardTitle$React.forwardRef");
__turbopack_refresh__.register(_c5, "CardTitle");
__turbopack_refresh__.register(_c6, "CardDescription$React.forwardRef");
__turbopack_refresh__.register(_c7, "CardDescription");
__turbopack_refresh__.register(_c8, "CardContent$React.forwardRef");
__turbopack_refresh__.register(_c9, "CardContent");
__turbopack_refresh__.register(_c10, "CardFooter$React.forwardRef");
__turbopack_refresh__.register(_c11, "CardFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/badge.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "Badge": (()=>Badge),
    "badgeVariants": (()=>badgeVariants)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const badgeVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors', {
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(badgeVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/badge.tsx",
        lineNumber: 32,
        columnNumber: 10
    }, this);
}
_c = Badge;
;
var _c;
__turbopack_refresh__.register(_c, "Badge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/input.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "Input": (()=>Input)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const Input = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.forwardRef(_c = ({ className, type = 'text', ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex h-10 w-full rounded-xl border border-indigo-200 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/input.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this));
_c1 = Input;
Input.displayName = 'Input';
;
var _c, _c1;
__turbopack_refresh__.register(_c, "Input$React.forwardRef");
__turbopack_refresh__.register(_c1, "Input");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/scroll-area.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "ScrollArea": (()=>ScrollArea)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
// MVP stub — replace with @radix-ui/react-scroll-area for custom scrollbars.
const ScrollArea = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.forwardRef(_c = ({ className, children, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('relative overflow-auto', className),
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/scroll-area.tsx",
        lineNumber: 9,
        columnNumber: 3
    }, this));
_c1 = ScrollArea;
ScrollArea.displayName = 'ScrollArea';
;
var _c, _c1;
__turbopack_refresh__.register(_c, "ScrollArea$React.forwardRef");
__turbopack_refresh__.register(_c1, "ScrollArea");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/separator.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "Separator": (()=>Separator)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const Separator = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.forwardRef(_c = ({ className, orientation = 'horizontal', decorative = true, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        role: decorative ? 'none' : 'separator',
        "aria-orientation": orientation,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('shrink-0 bg-slate-200', orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/separator.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this));
_c1 = Separator;
Separator.displayName = 'Separator';
;
var _c, _c1;
__turbopack_refresh__.register(_c, "Separator$React.forwardRef");
__turbopack_refresh__.register(_c1, "Separator");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/tutor/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>TutorPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Navbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/Navbar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/ui/scroll-area.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/components/ui/separator.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$brain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Brain$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/brain.js [app-client] (ecmascript) <export default as Brain>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/graduation-cap.js [app-client] (ecmascript) <export default as GraduationCap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2d$handshake$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HeartHandshake$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/heart-handshake.js [app-client] (ecmascript) <export default as HeartHandshake>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/message-square.js [app-client] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript) <export default as Send>");
;
var _s = __turbopack_refresh__.signature();
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
const STAGES = [
    {
        key: 'articulation',
        label: 'Articulation',
        ko: '명료화'
    },
    {
        key: 'reflection',
        label: 'Reflection',
        ko: '성찰'
    }
];
const SUGGESTED_QUESTIONS = [
    {
        emoji: '🌀',
        text: '함수에서 return이 왜 None이 나와요?',
        topic: '코드 업로드'
    },
    {
        emoji: '📊',
        text: '제 차트 좀 봐주세요 (예시)',
        topic: '디자인 업로드'
    },
    {
        emoji: '🔭',
        text: '지역변수와 전역변수의 차이가 헷갈려요',
        topic: '개념 질문'
    },
    {
        emoji: '🪞',
        text: '오늘 배운 함수 단원 정리해주세요',
        topic: '회고'
    }
];
// G6 ★ 3-Step 시연 — 함수 return None 시나리오 (Mentor Mode)
const RETURN_NONE_SCRIPT = [
    {
        role: 'user',
        text: '함수에서 return이 왜 None이 나와요? def add(a, b): print(a + b)'
    },
    {
        role: 'assistant',
        labels: [
            'Verbalize'
        ],
        stage: 'articulation',
        text: '제가 본 것은 `def add(a, b): print(a + b)` 함수입니다.\n' + 'a와 b를 받아 print로 화면에 출력하는 구조이고, return 문은 없습니다.'
    },
    {
        role: 'assistant',
        labels: [
            'Ground-Truth'
        ],
        stage: 'articulation',
        text: '혹시 제가 잘못 본 부분이 있을까요?\n' + '화면에 출력만 하시려는 의도였는지, 아니면 값을 돌려받고 싶었는지 확인하고 싶습니다.'
    },
    {
        role: 'user',
        text: '값을 돌려받고 싶었어요. 그래서 add(1,2) + 3 했더니 에러가 났어요.'
    },
    {
        role: 'assistant',
        labels: [
            'Pass',
            'Articulation'
        ],
        stage: 'articulation',
        text: '좋습니다. 의도가 명료해졌어요.\n' + 'Q. 그렇다면 print와 return의 역할 차이를 본인 말로 한 줄로 설명해본다면요?'
    },
    {
        role: 'user',
        text: '음... 둘 다 결과를 보여주는 거 아닌가요?'
    },
    {
        role: 'assistant',
        labels: [
            'Reflection'
        ],
        stage: 'reflection',
        text: '방금 말씀하신 목표는 "값을 돌려받아 다음 계산에 쓰기"였죠.\n' + 'Q. 그 목표를 기준으로 보면, "화면에 보여주기"와 "값을 돌려주기" 중 어느 쪽이 다음 계산에 필요한가요?'
    }
];
// 차트 디자인 업로드 시나리오 — G6 + G7 (Logical Remodeling)
const CHART_SCRIPT = [
    {
        role: 'user',
        text: '제 차트 좀 봐주세요 (예시): 8개 항목 파이차트, 모두 다른 색, 가장 큰 조각 회색 40%'
    },
    {
        role: 'assistant',
        labels: [
            'Verbalize'
        ],
        stage: 'articulation',
        text: '제가 본 것은 8개 항목을 표현한 파이차트이고, 각 항목은 서로 다른 색으로 칠해져 있으며,\n' + '가장 큰 조각은 약 40%를 차지하는 회색 영역입니다.'
    },
    {
        role: 'assistant',
        labels: [
            'Ground-Truth'
        ],
        stage: 'articulation',
        text: '혹시 제가 잘못 본 부분이 있을까요?\n' + '회색 영역이 "기타" 항목인지, 아니면 특정 카테고리인지 확인하고 싶습니다.'
    },
    {
        role: 'user',
        text: '회색은 "기타"예요. 그런데 너무 화려하다는 피드백을 받았어요.'
    },
    {
        role: 'assistant',
        labels: [
            'Pass',
            'Remodel'
        ],
        stage: 'articulation',
        text: '색·크기 조정은 표면 수정이고, 그것보다 먼저 정해야 할 게 있어 보입니다.\n' + 'Q. 이 차트에서 독자가 3초 안에 받기를 원하는 메시지 한 줄은 무엇인가요?'
    }
];
const SCOPE_SCRIPT = [
    {
        role: 'user',
        text: '지역변수와 전역변수의 차이가 헷갈려요'
    },
    {
        role: 'assistant',
        labels: [
            'Articulation'
        ],
        stage: 'articulation',
        text: '좋은 출발입니다. 개념 자체를 묻기 전에 본인 경험부터 가져갈게요.\n' + 'Q. 최근 작성하신 코드 중에서 "함수 안에서 만든 변수를 함수 밖에서 못 썼던" 경험이 있으셨나요? 있다면 한 줄로 적어 주세요.'
    }
];
const DEFAULT_SCRIPT = [
    {
        role: 'assistant',
        labels: [
            'Articulation'
        ],
        stage: 'articulation',
        text: '바로 답을 드리지 않습니다.\n' + 'Q. 현재 본인 코드와 막힌 지점, 그리고 기대했던 결과를 한 줄로 적어 주세요.'
    }
];
// Vending Mode 시연
const VENDING_SCRIPT = [
    {
        role: 'user',
        text: '[Vending] return 문법 빨리 알려줘'
    },
    {
        role: 'assistant',
        labels: [
            'Mode-Confirm'
        ],
        text: 'Vending Mode로 전환합니다. 다음부터는 바로 답변드리겠습니다.'
    },
    {
        role: 'assistant',
        text: '`def 함수명(매개변수): return 값` 형태로 작성합니다. return이 없으면 자동으로 None을 반환합니다.\n예: `def add(a, b): return a + b`'
    }
];
function pickScript(input, mode) {
    if (mode === 'vending') return VENDING_SCRIPT;
    if (input.includes('차트') || input.includes('파이') || input.includes('디자인')) return CHART_SCRIPT;
    if (input.includes('return') || input.includes('None') || input.includes('add')) return RETURN_NONE_SCRIPT;
    if (input.includes('지역') || input.includes('전역') || input.includes('스코프')) return SCOPE_SCRIPT;
    return [
        {
            role: 'user',
            text: input
        },
        ...DEFAULT_SCRIPT
    ];
}
const LABEL_COLOR = {
    'Mode-Confirm': 'bg-amber-100 text-amber-700',
    Verbalize: 'bg-indigo-100 text-indigo-700',
    'Ground-Truth': 'bg-violet-100 text-violet-700',
    Pass: 'bg-emerald-100 text-emerald-700',
    Articulation: 'bg-indigo-100 text-indigo-700',
    Reflection: 'bg-rose-100 text-rose-700',
    Remodel: 'bg-slate-100 text-slate-700'
};
function TutorPage() {
    _s();
    const [messages, setMessages] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useState([]);
    const [input, setInput] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useState('');
    const [currentStage, setCurrentStage] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useState(null);
    const [isPlaying, setIsPlaying] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useState(false);
    const [mode, setMode] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useState('mentor');
    const playScript = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.useCallback({
        "TutorPage.useCallback[playScript]": async (script)=>{
            setIsPlaying(true);
            setMessages([]);
            setCurrentStage(null);
            for(let i = 0; i < script.length; i++){
                const msg = script[i];
                await new Promise({
                    "TutorPage.useCallback[playScript]": (r)=>setTimeout(r, msg.role === 'user' ? 400 : 900)
                }["TutorPage.useCallback[playScript]"]);
                setMessages({
                    "TutorPage.useCallback[playScript]": (prev)=>[
                            ...prev,
                            msg
                        ]
                }["TutorPage.useCallback[playScript]"]);
                if (msg.stage) setCurrentStage(msg.stage);
            }
            setIsPlaying(false);
        }
    }["TutorPage.useCallback[playScript]"], []);
    const handleSubmit = (e)=>{
        e.preventDefault();
        if (!input.trim() || isPlaying) return;
        playScript(pickScript(input.trim(), mode));
        setInput('');
    };
    const handleSuggested = (text)=>{
        if (isPlaying) return;
        playScript(pickScript(text, mode));
    };
    const reset = ()=>{
        setMessages([]);
        setCurrentStage(null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Navbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Navbar"], {}, void 0, false, {
                fileName: "[project]/src/app/tutor/page.tsx",
                lineNumber: 262,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "min-h-screen pt-32 pb-6 px-4 bg-cream-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto grid max-w-7xl grid-cols-12 gap-4 h-[calc(100vh-8rem)]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                            className: "hidden lg:block col-span-3 space-y-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                className: "text-base flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$brain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Brain$3e$__["Brain"], {
                                                        className: "w-4 h-4 text-indigo-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/tutor/page.tsx",
                                                        lineNumber: 270,
                                                        columnNumber: 19
                                                    }, this),
                                                    "CAM 기반 멘토링 LLM"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/tutor/page.tsx",
                                                lineNumber: 269,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/tutor/page.tsx",
                                            lineNumber: 268,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                            className: "space-y-2 text-xs",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-slate-600 leading-relaxed",
                                                    children: "Cognitive Apprenticeship Model (Collins/Brown/Newman 1989) + Schön Reflection-in-Action 기반 멘토링 LLM."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/tutor/page.tsx",
                                                    lineNumber: 275,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                                                    fileName: "[project]/src/app/tutor/page.tsx",
                                                    lineNumber: 279,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs font-mono uppercase tracking-widest text-indigo-500",
                                                    children: "2-Stage Cycle"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/tutor/page.tsx",
                                                    lineNumber: 280,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                    className: "space-y-1.5 text-slate-700",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-mono font-semibold text-indigo-700",
                                                                    children: "Stage 1"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/tutor/page.tsx",
                                                                    lineNumber: 285,
                                                                    columnNumber: 21
                                                                }, this),
                                                                " · Articulation (명료화)"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/tutor/page.tsx",
                                                            lineNumber: 284,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-mono font-semibold text-rose-700",
                                                                    children: "Stage 2"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/tutor/page.tsx",
                                                                    lineNumber: 289,
                                                                    columnNumber: 21
                                                                }, this),
                                                                " · Reflection (성찰)"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/tutor/page.tsx",
                                                            lineNumber: 288,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/tutor/page.tsx",
                                                    lineNumber: 283,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                                                    fileName: "[project]/src/app/tutor/page.tsx",
                                                    lineNumber: 293,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs font-mono uppercase tracking-widest text-indigo-500",
                                                    children: "7 Guidelines"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/tutor/page.tsx",
                                                    lineNumber: 294,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                    className: "space-y-1 text-slate-600 text-[11px]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            children: "G1 즉답 금지"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/tutor/page.tsx",
                                                            lineNumber: 298,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            children: "G2 3문장 + 1질문 cap"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/tutor/page.tsx",
                                                            lineNumber: 299,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            children: "G3 모드 자각"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/tutor/page.tsx",
                                                            lineNumber: 300,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            children: "G4 구조 우선 (색·폰트 X)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/tutor/page.tsx",
                                                            lineNumber: 301,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            children: "G5 공 패스"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/tutor/page.tsx",
                                                            lineNumber: 302,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            className: "font-semibold text-indigo-700",
                                                            children: "G6 ★ Verbalize → Ground → Pass"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/tutor/page.tsx",
                                                            lineNumber: 303,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            children: "G7 논리 리모델링"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/tutor/page.tsx",
                                                            lineNumber: 306,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/tutor/page.tsx",
                                                    lineNumber: 297,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/tutor/page.tsx",
                                            lineNumber: 274,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/tutor/page.tsx",
                                    lineNumber: 267,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                className: "text-sm flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                                        className: "w-4 h-4 text-amber-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/tutor/page.tsx",
                                                        lineNumber: 315,
                                                        columnNumber: 19
                                                    }, this),
                                                    "Mode 분기"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/tutor/page.tsx",
                                                lineNumber: 314,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/tutor/page.tsx",
                                            lineNumber: 313,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                            className: "space-y-2 text-xs",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-2 gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setMode('mentor'),
                                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('rounded-lg border px-2 py-2 text-xs transition', mode === 'mentor' ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-semibold' : 'border-indigo-100 text-slate-600 hover:bg-indigo-50'),
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$graduation$2d$cap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GraduationCap$3e$__["GraduationCap"], {
                                                                    className: "mx-auto h-3.5 w-3.5 mb-0.5"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/tutor/page.tsx",
                                                                    lineNumber: 330,
                                                                    columnNumber: 21
                                                                }, this),
                                                                "Mentor"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/tutor/page.tsx",
                                                            lineNumber: 321,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setMode('vending'),
                                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('rounded-lg border px-2 py-2 text-xs transition', mode === 'vending' ? 'border-amber-500 bg-amber-50 text-amber-700 font-semibold' : 'border-indigo-100 text-slate-600 hover:bg-amber-50'),
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                                                    className: "mx-auto h-3.5 w-3.5 mb-0.5"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/tutor/page.tsx",
                                                                    lineNumber: 342,
                                                                    columnNumber: 21
                                                                }, this),
                                                                "Vending"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/tutor/page.tsx",
                                                            lineNumber: 333,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/tutor/page.tsx",
                                                    lineNumber: 320,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[10px] text-slate-500 leading-relaxed",
                                                    children: mode === 'mentor' ? '7 Guidelines 전체 활성. 사고 확장 우선.' : '즉답 허용. 강사 대시보드에 모드 전환 알림.'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/tutor/page.tsx",
                                                    lineNumber: 346,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/tutor/page.tsx",
                                            lineNumber: 319,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/tutor/page.tsx",
                                    lineNumber: 312,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                className: "text-sm flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2d$handshake$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HeartHandshake$3e$__["HeartHandshake"], {
                                                        className: "w-4 h-4 text-rose-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/tutor/page.tsx",
                                                        lineNumber: 357,
                                                        columnNumber: 19
                                                    }, this),
                                                    "역할 분리 (RAI)"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/tutor/page.tsx",
                                                lineNumber: 356,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/tutor/page.tsx",
                                            lineNumber: 355,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                            className: "text-xs space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "rounded-lg bg-emerald-50 p-2 text-emerald-800",
                                                    children: "✅ 인지: 사고 외현화·진단·점진적 지원"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/tutor/page.tsx",
                                                    lineNumber: 362,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "rounded-lg bg-rose-50 p-2 text-rose-800",
                                                    children: '❌ 정서 위로 ("힘들지", "잘하고 있어") 금지'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/tutor/page.tsx",
                                                    lineNumber: 365,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-slate-600 leading-relaxed",
                                                    children: '정서 신호 감지 시 → "강사 면담 요청" 옵션 노출.'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/tutor/page.tsx",
                                                    lineNumber: 368,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/tutor/page.tsx",
                                            lineNumber: 361,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/tutor/page.tsx",
                                    lineNumber: 354,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                className: "text-sm flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                                        className: "w-4 h-4 text-indigo-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/tutor/page.tsx",
                                                        lineNumber: 377,
                                                        columnNumber: 19
                                                    }, this),
                                                    "데모 시나리오"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/tutor/page.tsx",
                                                lineNumber: 376,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/tutor/page.tsx",
                                            lineNumber: 375,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                            className: "space-y-1.5 text-xs",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>playScript(RETURN_NONE_SCRIPT),
                                                    className: "w-full text-left rounded-lg px-3 py-2 text-slate-700 hover:bg-indigo-50 disabled:opacity-50",
                                                    disabled: isPlaying,
                                                    children: "· G6 ★ 함수 return None (3-Step)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/tutor/page.tsx",
                                                    lineNumber: 382,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>playScript(CHART_SCRIPT),
                                                    className: "w-full text-left rounded-lg px-3 py-2 text-slate-700 hover:bg-indigo-50 disabled:opacity-50",
                                                    disabled: isPlaying,
                                                    children: "· G7 차트 디자인 (Remodel)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/tutor/page.tsx",
                                                    lineNumber: 389,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>playScript(SCOPE_SCRIPT),
                                                    className: "w-full text-left rounded-lg px-3 py-2 text-slate-700 hover:bg-indigo-50 disabled:opacity-50",
                                                    disabled: isPlaying,
                                                    children: "· 지역/전역 스코프 (Articulation)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/tutor/page.tsx",
                                                    lineNumber: 396,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>playScript(VENDING_SCRIPT),
                                                    className: "w-full text-left rounded-lg px-3 py-2 text-slate-700 hover:bg-amber-50 disabled:opacity-50",
                                                    disabled: isPlaying,
                                                    children: "· Vending 모드 시연"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/tutor/page.tsx",
                                                    lineNumber: 403,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/tutor/page.tsx",
                                            lineNumber: 381,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/tutor/page.tsx",
                                    lineNumber: 374,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/tutor/page.tsx",
                            lineNumber: 266,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "col-span-12 lg:col-span-9 flex flex-col gap-3 h-full",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                        className: "py-3",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                    variant: "violet",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                            className: "w-3 h-3 mr-1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/tutor/page.tsx",
                                                            lineNumber: 421,
                                                            columnNumber: 21
                                                        }, this),
                                                        " CAM 멘토링 LLM"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/tutor/page.tsx",
                                                    lineNumber: 420,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                    variant: "outline",
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('font-mono text-[10px]', mode === 'vending' && 'bg-amber-50 text-amber-700 border-amber-200'),
                                                    children: mode === 'mentor' ? 'Mentor Mode' : 'Vending Mode'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/tutor/page.tsx",
                                                    lineNumber: 423,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
                                                    orientation: "vertical",
                                                    className: "h-5 mx-1"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/tutor/page.tsx",
                                                    lineNumber: 432,
                                                    columnNumber: 19
                                                }, this),
                                                STAGES.map((s, i)=>{
                                                    const isActive = currentStage === s.key;
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__.Fragment, {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex items-center gap-1.5 text-xs whitespace-nowrap', isActive ? 'text-indigo-700 font-semibold' : 'text-slate-400'),
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('w-1.5 h-1.5 rounded-full', isActive ? 'bg-indigo-700 animate-pulse' : 'bg-slate-300')
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/tutor/page.tsx",
                                                                        lineNumber: 445,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    s.label,
                                                                    " (",
                                                                    s.ko,
                                                                    ")"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/tutor/page.tsx",
                                                                lineNumber: 437,
                                                                columnNumber: 25
                                                            }, this),
                                                            i < STAGES.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-slate-300 text-xs",
                                                                children: "↔"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/tutor/page.tsx",
                                                                lineNumber: 454,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, s.key, true, {
                                                        fileName: "[project]/src/app/tutor/page.tsx",
                                                        lineNumber: 436,
                                                        columnNumber: 23
                                                    }, this);
                                                }),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "ml-auto",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                        type: "button",
                                                        size: "sm",
                                                        variant: "outline",
                                                        onClick: reset,
                                                        disabled: isPlaying,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                                                className: "w-3 h-3"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/tutor/page.tsx",
                                                                lineNumber: 467,
                                                                columnNumber: 23
                                                            }, this),
                                                            " 초기화"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/tutor/page.tsx",
                                                        lineNumber: 460,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/tutor/page.tsx",
                                                    lineNumber: 459,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/tutor/page.tsx",
                                            lineNumber: 419,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/tutor/page.tsx",
                                        lineNumber: 418,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/tutor/page.tsx",
                                    lineNumber: 417,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                    className: "flex-1 flex flex-col overflow-hidden",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollArea"], {
                                            className: "flex-1 p-6",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-4",
                                                children: [
                                                    messages.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "py-8 space-y-6",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-center",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                                        className: "w-10 h-10 mx-auto text-indigo-500 mb-3"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/tutor/page.tsx",
                                                                        lineNumber: 481,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                        className: "text-lg font-bold text-indigo-900",
                                                                        children: "AI는 정답 자판기가 아닙니다. 사고의 거울입니다."
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/tutor/page.tsx",
                                                                        lineNumber: 482,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm text-slate-600 mt-1.5",
                                                                        children: mode === 'mentor' ? '업로드물에 즉답·평가하지 않습니다. G6 ★ Verbalize → Ground → Pass 3-Step으로 응답합니다.' : 'Vending Mode: 빠른 결과 산출. 강사 대시보드에 전환 알림.'
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/tutor/page.tsx",
                                                                        lineNumber: 485,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/tutor/page.tsx",
                                                                lineNumber: 480,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "space-y-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs font-mono uppercase tracking-widest text-indigo-500 text-center",
                                                                        children: "예시 입력"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/tutor/page.tsx",
                                                                        lineNumber: 493,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "mx-auto grid max-w-2xl gap-2 sm:grid-cols-2",
                                                                        children: SUGGESTED_QUESTIONS.map((q)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                type: "button",
                                                                                onClick: ()=>handleSuggested(q.text),
                                                                                disabled: isPlaying,
                                                                                className: "group rounded-xl border border-indigo-100 bg-white p-3 text-left transition hover:border-indigo-300 hover:bg-indigo-50/50 disabled:opacity-50",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "flex items-start gap-2",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "flex-shrink-0 text-lg",
                                                                                            children: q.emoji
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/tutor/page.tsx",
                                                                                            lineNumber: 506,
                                                                                            columnNumber: 33
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "min-w-0 flex-1",
                                                                                            children: [
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                    className: "text-sm font-semibold text-indigo-900 group-hover:text-indigo-700",
                                                                                                    children: q.text
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/src/app/tutor/page.tsx",
                                                                                                    lineNumber: 508,
                                                                                                    columnNumber: 35
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                                    className: "mt-0.5 font-mono text-[10px] text-slate-500",
                                                                                                    children: q.topic
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/src/app/tutor/page.tsx",
                                                                                                    lineNumber: 511,
                                                                                                    columnNumber: 35
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/src/app/tutor/page.tsx",
                                                                                            lineNumber: 507,
                                                                                            columnNumber: 33
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/app/tutor/page.tsx",
                                                                                    lineNumber: 505,
                                                                                    columnNumber: 31
                                                                                }, this)
                                                                            }, q.text, false, {
                                                                                fileName: "[project]/src/app/tutor/page.tsx",
                                                                                lineNumber: 498,
                                                                                columnNumber: 29
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/tutor/page.tsx",
                                                                        lineNumber: 496,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/tutor/page.tsx",
                                                                lineNumber: 492,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mx-auto max-w-xl rounded-xl border border-amber-100 bg-amber-50/60 p-3 text-xs text-amber-800",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                                        className: "mr-1 -mt-0.5 inline h-3.5 w-3.5"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/tutor/page.tsx",
                                                                        lineNumber: 522,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    "Pre-Output Self-Check (C1~C7 Hard + S1~S5 Soft)이 응답 직전 매번 실행됩니다. 위반 시 응답 재생성."
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/tutor/page.tsx",
                                                                lineNumber: 521,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/tutor/page.tsx",
                                                        lineNumber: 479,
                                                        columnNumber: 21
                                                    }, this),
                                                    messages.map((m, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex', m.role === 'user' ? 'justify-end' : 'justify-start'),
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line shadow-sm', m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white border border-indigo-100 text-slate-800'),
                                                                children: [
                                                                    m.role === 'assistant' && m.labels && m.labels.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "mb-2 flex flex-wrap gap-1",
                                                                        children: m.labels.map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('rounded-full px-2 py-0.5 text-[10px] font-mono font-semibold', LABEL_COLOR[l]),
                                                                                children: [
                                                                                    "[",
                                                                                    l,
                                                                                    "]"
                                                                                ]
                                                                            }, l, true, {
                                                                                fileName: "[project]/src/app/tutor/page.tsx",
                                                                                lineNumber: 548,
                                                                                columnNumber: 31
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/tutor/page.tsx",
                                                                        lineNumber: 546,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    m.text
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/tutor/page.tsx",
                                                                lineNumber: 537,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, i, false, {
                                                            fileName: "[project]/src/app/tutor/page.tsx",
                                                            lineNumber: 530,
                                                            columnNumber: 21
                                                        }, this)),
                                                    isPlaying && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-start",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "rounded-2xl border border-indigo-100 bg-indigo-50/60 px-4 py-3",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex gap-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-500"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/tutor/page.tsx",
                                                                        lineNumber: 569,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-500 [animation-delay:120ms]"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/tutor/page.tsx",
                                                                        lineNumber: 570,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-500 [animation-delay:240ms]"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/tutor/page.tsx",
                                                                        lineNumber: 571,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/tutor/page.tsx",
                                                                lineNumber: 568,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/tutor/page.tsx",
                                                            lineNumber: 567,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/tutor/page.tsx",
                                                        lineNumber: 566,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/tutor/page.tsx",
                                                lineNumber: 477,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/tutor/page.tsx",
                                            lineNumber: 476,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "border-t border-indigo-100 p-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                                    onSubmit: handleSubmit,
                                                    className: "flex gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                            value: input,
                                                            onChange: (e)=>setInput(e.target.value),
                                                            placeholder: mode === 'mentor' ? '코드·디자인·자료를 업로드하거나 막힌 지점을 적어주세요…' : '[Vending] 빠르게 답이 필요한 질문…',
                                                            className: "flex-1",
                                                            disabled: isPlaying
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/tutor/page.tsx",
                                                            lineNumber: 582,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            type: "submit",
                                                            disabled: isPlaying || !input.trim(),
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                                                    className: "w-4 h-4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/tutor/page.tsx",
                                                                    lineNumber: 594,
                                                                    columnNumber: 21
                                                                }, this),
                                                                "전송"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/tutor/page.tsx",
                                                            lineNumber: 593,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/tutor/page.tsx",
                                                    lineNumber: 581,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-2 text-[10px] text-slate-400",
                                                    children: "키워드: 'return'·'None'·'add'·'차트'·'파이'·'디자인'·'스코프'·'지역/전역' → 해당 시나리오 재생. 그 외 → 기본 Articulation 응답."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/tutor/page.tsx",
                                                    lineNumber: 598,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/tutor/page.tsx",
                                            lineNumber: 580,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/tutor/page.tsx",
                                    lineNumber: 475,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/tutor/page.tsx",
                            lineNumber: 415,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/tutor/page.tsx",
                    lineNumber: 264,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/tutor/page.tsx",
                lineNumber: 263,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(TutorPage, "6EpGslqEnE0Fy/8j1PsqBmUqUDo=");
_c = TutorPage;
var _c;
__turbopack_refresh__.register(_c, "TutorPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/tutor/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: require } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=src_9d0021._.js.map