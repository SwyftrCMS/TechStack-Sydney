export function sceneParts(createSceneElement, Fragment) {
return {"components/KineticPrimitives": (exports, require) => {
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KineticTextStage = exports.SpeedStreaks = exports.CameraRig = exports.KineticBackdrop = void 0;
const react_1 = __importDefault(require("react"));
const remotion_1 = require("remotion");
const copy_1 = require("../copy");
const theme_1 = require("../theme");
/**
 * Crisp White / Light Indigo portrait canvas with subtle architectural grid
 * and soft violet/indigo ambient depth.
 */
const KineticBackdrop = ({ glowX = 540, glowY = 860, accentColor = theme_1.COLORS.violet, secondaryColor = theme_1.COLORS.indigo, intensity = 1, }) => {
    const frame = (0, remotion_1.useCurrentFrame)();
    const driftX = Math.sin(frame * 0.045) * 24;
    const driftY = Math.cos(frame * 0.035) * 18;
    return (createSceneElement(remotion_1.AbsoluteFill, { style: { backgroundColor: theme_1.COLORS.bg, overflow: 'hidden' } },
        createSceneElement("svg", { width: 1080, height: 1440, viewBox: "0 0 1080 1440", style: { position: 'absolute', inset: 0 } },
            createSceneElement("defs", null,
                createSceneElement("radialGradient", { id: "lightVioletAura", cx: "50%", cy: "50%", r: "50%" },
                    createSceneElement("stop", { offset: "0%", stopColor: accentColor, stopOpacity: 0.11 * intensity }),
                    createSceneElement("stop", { offset: "55%", stopColor: secondaryColor, stopOpacity: 0.05 * intensity }),
                    createSceneElement("stop", { offset: "100%", stopColor: theme_1.COLORS.bg, stopOpacity: 0 })),
                createSceneElement("pattern", { id: "lightPrecisionGrid", width: "48", height: "48", patternUnits: "userSpaceOnUse" },
                    createSceneElement("path", { d: "M 48 0 L 0 0 0 48", fill: "none", stroke: "rgba(79, 70, 229, 0.05)", strokeWidth: "1" })),
                createSceneElement("radialGradient", { id: "lightGridMask", cx: "50%", cy: "58%", r: "56%" },
                    createSceneElement("stop", { offset: "0%", stopColor: "white", stopOpacity: "1" }),
                    createSceneElement("stop", { offset: "100%", stopColor: "white", stopOpacity: "0" })),
                createSceneElement("mask", { id: "lightGridFade" },
                    createSceneElement("rect", { width: "1080", height: "1440", fill: "url(#lightGridMask)" }))),
            createSceneElement("rect", { width: 1080, height: 1440, fill: theme_1.COLORS.bg }),
            createSceneElement("rect", { width: 1080, height: 1440, fill: "url(#lightPrecisionGrid)", mask: "url(#lightGridFade)" }),
            createSceneElement("circle", { cx: glowX + driftX, cy: glowY + driftY, r: 480, fill: "url(#lightVioletAura)" }))));
};
exports.KineticBackdrop = KineticBackdrop;
/**
 * 3D Perspective Camera Rig driving whip-pans, rapid zoom punches, and dynamic camera tilt.
 */
const CameraRig = ({ children, x = 0, y = 0, zoom = 1, rotateX = 0, rotateY = 0, rotateZ = 0, origin = '540px 880px', }) => {
    return (createSceneElement(remotion_1.AbsoluteFill, { style: {
            perspective: 1400,
            perspectiveOrigin: origin,
            overflow: 'visible',
        } },
        createSceneElement("div", { style: {
                width: '100%',
                height: '100%',
                transformOrigin: origin,
                transform: `translate3d(${x}px, ${y}px, 0px) scale(${zoom}) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`,
                transformStyle: 'preserve-3d',
                willChange: 'transform',
            } }, children)));
};
exports.CameraRig = CameraRig;
/**
 * Crisp kinetic motion lines during camera whip-pans and zoom slams.
 */
const SpeedStreaks = ({ intensity = 0, direction = 'left', accentColor = theme_1.COLORS.violet, }) => {
    if (intensity <= 0.02)
        return null;
    const streaks = [
        { x: 80, y: 460, len: 220, color: theme_1.COLORS.indigoBright, w: 3 },
        { x: 260, y: 580, len: 310, color: accentColor, w: 3.5 },
        { x: 680, y: 510, len: 240, color: theme_1.COLORS.mint, w: 2.5 },
        { x: 150, y: 880, len: 340, color: theme_1.COLORS.violet, w: 3 },
        { x: 610, y: 1020, len: 260, color: theme_1.COLORS.amber, w: 2.5 },
        { x: 340, y: 1240, len: 290, color: theme_1.COLORS.rose, w: 3 },
    ];
    const offset = direction === 'left'
        ? -180 * (1 - intensity)
        : direction === 'right'
            ? 180 * (1 - intensity)
            : 0;
    return (createSceneElement(remotion_1.AbsoluteFill, { style: { pointerEvents: 'none', opacity: intensity * 0.72 } },
        createSceneElement("svg", { width: 1080, height: 1440, viewBox: "0 0 1080 1440" }, streaks.map((s, idx) => direction === 'vertical' ? (createSceneElement("line", { key: idx, x1: s.x, y1: s.y - 120 * (1 - intensity), x2: s.x, y2: s.y - 120 * (1 - intensity) + s.len * (0.4 + intensity * 0.6), stroke: s.color, strokeWidth: s.w, strokeLinecap: "round", opacity: 0.65 })) : (createSceneElement("line", { key: idx, x1: s.x + offset, y1: s.y, x2: s.x + offset + s.len * (0.4 + intensity * 0.6), y2: s.y, stroke: s.color, strokeWidth: s.w, strokeLinecap: "round", opacity: 0.65 }))))));
};
exports.SpeedStreaks = SpeedStreaks;
const ACCENT_HEX = {
    violet: theme_1.COLORS.violet,
    amber: theme_1.COLORS.amber,
    rose: theme_1.COLORS.rose,
    mint: theme_1.COLORS.mint,
};
/**
 * Light-mode video header section strictly in Plus Jakarta Sans:
 * - Light gray divider line above the 4-step process stages
 * - Consistent 72px outer margins & balanced vertical spacing for phone/tablet viewports
 */
const KineticTextStage = ({ chapter, activeStepIndex, sceneDuration, persistOnEnd = false, }) => {
    const frame = (0, remotion_1.useCurrentFrame)();
    const enterP = (0, theme_1.clampedInterpolate)(frame, [2, 16], [0, 1], theme_1.EASE.expoOut);
    const subP = (0, theme_1.clampedInterpolate)(frame, [7, 22], [0, 1], theme_1.EASE.expoOut);
    const exitP = persistOnEnd
        ? 1
        : (0, theme_1.clampedInterpolate)(frame, [sceneDuration - 12, sceneDuration - 2], [1, 0], theme_1.EASE.expoIn);
    const masterOpacity = Math.min(enterP > 0 ? 1 : 0, exitP);
    const headY = (1 - enterP) * 38 - (1 - exitP) * 24;
    const subY = (1 - subP) * 22 - (1 - exitP) * 16;
    const accentHex = ACCENT_HEX[chapter.accent];
    return (createSceneElement(remotion_1.AbsoluteFill, { style: { pointerEvents: 'none' } },
        createSceneElement("div", { style: {
                position: 'absolute',
                top: 28,
                left: 72,
                right: 72,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTop: '2px solid #E5E7EB',
                borderBottom: '1px solid #ECEBF5',
                paddingTop: 18,
                paddingBottom: 18,
                fontFamily: 'var(--font-sans)',
            } }, copy_1.PROMO_CHAPTERS.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            const isPast = idx < activeStepIndex;
            const stepAccent = ACCENT_HEX[step.accent];
            return (createSceneElement(react_1.default.Fragment, { key: step.id },
                createSceneElement("div", { style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        fontSize: 22,
                        fontWeight: isActive ? 800 : 600,
                        color: isActive
                            ? theme_1.COLORS.ink
                            : isPast
                                ? theme_1.COLORS.inkSecondary
                                : theme_1.COLORS.inkMuted,
                    } },
                    createSceneElement("span", { style: {
                            fontFamily: 'var(--font-sans)',
                            fontSize: 18,
                            fontWeight: 700,
                            fontVariantNumeric: 'tabular-nums',
                            color: isActive ? stepAccent : theme_1.COLORS.inkMuted,
                        } }, step.stepNumber),
                    createSceneElement("span", { style: { fontFamily: 'var(--font-sans)' } }, step.label)),
                idx < copy_1.PROMO_CHAPTERS.length - 1 && (createSceneElement("span", { style: {
                        fontFamily: 'var(--font-sans)',
                        fontSize: 18,
                        color: '#CBD5E1',
                    } }, "\u2192"))));
        })),
        createSceneElement("div", { style: {
                position: 'absolute',
                top: 126,
                left: 72,
                right: 72,
                textAlign: 'center',
                opacity: masterOpacity,
                fontFamily: 'var(--font-sans)',
            } },
            createSceneElement("div", { style: {
                    fontFamily: 'var(--font-sans)',
                    fontSize: 20,
                    fontWeight: 700,
                    color: accentHex,
                    marginBottom: 12,
                    letterSpacing: '0.02em',
                    fontVariantNumeric: 'tabular-nums',
                    transform: `translate3d(0, ${headY * 0.45}px, 0)`,
                } },
                chapter.stepNumber,
                " \u00B7 ",
                chapter.label),
            createSceneElement("div", { style: { overflow: 'hidden' } },
                createSceneElement("h2", { style: {
                        margin: '0 auto',
                        maxWidth: 920,
                        fontFamily: 'var(--font-sans)',
                        fontSize: 56,
                        fontWeight: 800,
                        lineHeight: 1.08,
                        letterSpacing: '-0.03em',
                        color: theme_1.COLORS.ink,
                        transform: `translate3d(0, ${headY}px, 0)`,
                        textWrap: 'balance',
                    } }, chapter.headline)),
            createSceneElement("div", { style: { overflow: 'hidden', marginTop: 14 } },
                createSceneElement("p", { style: {
                        margin: '0 auto',
                        maxWidth: 840,
                        fontFamily: 'var(--font-sans)',
                        fontSize: 24,
                        fontWeight: 500,
                        lineHeight: 1.38,
                        color: theme_1.COLORS.inkSecondary,
                        transform: `translate3d(0, ${subY}px, 0)`,
                        opacity: subP,
                    } }, chapter.subhead)))));
};
exports.KineticTextStage = KineticTextStage;

},
"components/KineticSiteBuild": (exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KineticSiteBuild = void 0;
const remotion_1 = require("remotion");
const theme_1 = require("../theme");
const SECTION_TIMINGS = [
    { id: 'nav', start: 6 },
    { id: 'hero', start: 26 },
    { id: 'metrics', start: 52 },
    { id: 'compare', start: 78 },
    { id: 'form', start: 106 },
    { id: 'footer', start: 132 },
];
/**
 * High-impact Dark-Mode Single-Page AU Website built top-to-bottom at speed:
 * - Uses Lexend Deca for all items inside the demo site
 * - Geared toward Australian businesses (.com.au, AUD pricing, local enquiries)
 * - Slams sections downward while scrolling completed sections smoothly upward
 */
const KineticSiteBuild = ({ x, y, width, height, buildFrame, scrollOverride, mobileReveal = 0, ctaPulse = 0, }) => {
    const { fps } = (0, remotion_1.useVideoConfig)();
    const frame = (0, remotion_1.useCurrentFrame)();
    const scale = width / 760;
    const viewH = height / scale;
    const chromeH = 50;
    const viewportInnerH = viewH - chromeH;
    const autoScroll = (0, theme_1.clampedInterpolate)(buildFrame, [52, 74], [0, 66], theme_1.EASE.expoOut) +
        (0, theme_1.clampedInterpolate)(buildFrame, [78, 102], [0, 152], theme_1.EASE.expoOut) +
        (0, theme_1.clampedInterpolate)(buildFrame, [106, 128], [0, 154], theme_1.EASE.expoOut) +
        (0, theme_1.clampedInterpolate)(buildFrame, [132, 154], [0, 96], theme_1.EASE.expoOut);
    const scrollY = scrollOverride !== undefined ? scrollOverride : autoScroll;
    const getSectionAnim = (startFrame) => {
        if (buildFrame >= 180) {
            return { pop: 1, yOffset: 0, flash: 0, scaleY: 1 };
        }
        if (buildFrame < startFrame) {
            return { pop: 0, yOffset: 48, flash: 0, scaleY: 0.88 };
        }
        const pop = (0, remotion_1.spring)({
            frame: buildFrame - startFrame,
            fps,
            config: theme_1.SPRING_PRESETS.slam,
        });
        const localAge = buildFrame - startFrame;
        const flash = localAge < 16 ? (0, theme_1.clampedInterpolate)(localAge, [0, 16], [1, 0], theme_1.EASE.expoOut) : 0;
        const yOffset = (1 - pop) * 44;
        const scaleY = 0.92 + pop * 0.08;
        return { pop, yOffset, flash, scaleY };
    };
    const navAnim = getSectionAnim(SECTION_TIMINGS[0].start);
    const heroAnim = getSectionAnim(SECTION_TIMINGS[1].start);
    const metricsAnim = getSectionAnim(SECTION_TIMINGS[2].start);
    const compareAnim = getSectionAnim(SECTION_TIMINGS[3].start);
    const formAnim = getSectionAnim(SECTION_TIMINGS[4].start);
    const footerAnim = getSectionAnim(SECTION_TIMINGS[5].start);
    const totalImpactRecoil = navAnim.flash * 3 +
        heroAnim.flash * 5 +
        metricsAnim.flash * 4 +
        compareAnim.flash * 4 +
        formAnim.flash * 5 +
        footerAnim.flash * 3;
    return (createSceneElement("g", { transform: `translate(${x}, ${y + totalImpactRecoil}) scale(${scale})` },
        createSceneElement("defs", null,
            createSceneElement("clipPath", { id: "darkSiteViewportClip" },
                createSceneElement("rect", { x: 0, y: chromeH, width: 760, height: viewportInnerH })),
            createSceneElement("linearGradient", { id: "darkSiteHeroGrad", x1: "0", y1: "0", x2: "1", y2: "1" },
                createSceneElement("stop", { offset: "0%", stopColor: theme_1.COLORS.violet, stopOpacity: 0.34 }),
                createSceneElement("stop", { offset: "100%", stopColor: theme_1.COLORS.indigo, stopOpacity: 0.14 })),
            createSceneElement("linearGradient", { id: "roseCtaFill", x1: "0", y1: "0", x2: "1", y2: "0" },
                createSceneElement("stop", { offset: "0%", stopColor: theme_1.COLORS.rose }),
                createSceneElement("stop", { offset: "100%", stopColor: theme_1.COLORS.roseBright })),
            createSceneElement("filter", { id: "darkBrowserShadow", x: "-15%", y: "-12%", width: "130%", height: "130%" },
                createSceneElement("feDropShadow", { dx: "0", dy: "26", stdDeviation: "24", floodColor: "#1E1B4B", floodOpacity: "0.22" }))),
        createSceneElement("g", { filter: "url(#darkBrowserShadow)" },
            createSceneElement("rect", { x: 0, y: 0, width: 760, height: viewH, rx: 24, fill: theme_1.COLORS.siteBg, stroke: theme_1.COLORS.siteBorderBright, strokeWidth: 2 })),
        createSceneElement("path", { d: `M 0 24 Q 0 0 24 0 L 736 0 Q 760 0 760 24 L 760 ${chromeH} L 0 ${chromeH} Z`, fill: theme_1.COLORS.siteChrome }),
        createSceneElement("line", { x1: 0, y1: chromeH, x2: 760, y2: chromeH, stroke: theme_1.COLORS.siteBorder, strokeWidth: 1.2 }),
        createSceneElement("circle", { cx: 28, cy: 25, r: 5.5, fill: theme_1.COLORS.roseBright, opacity: 0.9 }),
        createSceneElement("circle", { cx: 48, cy: 25, r: 5.5, fill: theme_1.COLORS.amberBright, opacity: 0.9 }),
        createSceneElement("circle", { cx: 68, cy: 25, r: 5.5, fill: theme_1.COLORS.mintBright, opacity: 0.9 }),
        createSceneElement("rect", { x: 205, y: 11, width: 350, height: 28, rx: 8, fill: theme_1.COLORS.siteBg, stroke: theme_1.COLORS.siteBorder, strokeWidth: 1 }),
        createSceneElement("text", { x: 380, y: 29, textAnchor: "middle", fill: theme_1.COLORS.siteTextMuted, fontSize: 13, fontWeight: 500, fontFamily: "var(--font-demo)" }, "harbourline.com.au"),
        createSceneElement("g", { clipPath: "url(#darkSiteViewportClip)" },
            createSceneElement("g", { transform: `translate(0, ${chromeH - scrollY})` },
                navAnim.pop > 0.01 && (createSceneElement("g", { transform: `translate(28, ${20 + navAnim.yOffset}) scale(1, ${navAnim.scaleY})`, opacity: navAnim.pop },
                    createSceneElement("rect", { x: 0, y: 0, width: 704, height: 64, rx: 14, fill: theme_1.COLORS.siteSurface, stroke: navAnim.flash > 0.1 ? theme_1.COLORS.indigoBright : theme_1.COLORS.siteBorder, strokeWidth: 1.5 + navAnim.flash * 2 }),
                    createSceneElement("text", { x: 24, y: 39, fill: theme_1.COLORS.siteText, fontSize: 19, fontWeight: 700, fontFamily: "var(--font-demo)" }, "Harbourline"),
                    createSceneElement("text", { x: 356, y: 37, fill: theme_1.COLORS.siteTextMuted, fontSize: 13.5, fontWeight: 500, fontFamily: "var(--font-demo)" }, "Services"),
                    createSceneElement("text", { x: 436, y: 37, fill: theme_1.COLORS.siteTextMuted, fontSize: 13.5, fontWeight: 500, fontFamily: "var(--font-demo)" }, "Pricing"),
                    createSceneElement("text", { x: 502, y: 37, fill: theme_1.COLORS.siteTextMuted, fontSize: 13.5, fontWeight: 500, fontFamily: "var(--font-demo)" }, "Reviews"),
                    createSceneElement("rect", { x: 572, y: 14, width: 114, height: 36, rx: 9, fill: theme_1.COLORS.indigoBright }),
                    createSceneElement("text", { x: 629, y: 37, textAnchor: "middle", fill: theme_1.COLORS.siteText, fontSize: 13.5, fontWeight: 600, fontFamily: "var(--font-demo)" }, "Free Quote"))),
                heroAnim.pop > 0.01 && (createSceneElement("g", { transform: `translate(28, ${100 + heroAnim.yOffset}) scale(1, ${heroAnim.scaleY})`, opacity: heroAnim.pop },
                    createSceneElement("rect", { x: 0, y: 0, width: 704, height: 224, rx: 16, fill: "url(#darkSiteHeroGrad)", stroke: heroAnim.flash > 0.1 ? theme_1.COLORS.roseBright : theme_1.COLORS.siteBorderBright, strokeWidth: 1.5 + heroAnim.flash * 2.5 }),
                    createSceneElement("text", { x: 28, y: 40, fill: theme_1.COLORS.violetBright, fontSize: 12.5, fontWeight: 700, fontFamily: "var(--font-demo)" }, "AUSTRALIAN LEAD ENGINE"),
                    createSceneElement("text", { x: 28, y: 82, fill: theme_1.COLORS.siteText, fontSize: 32, fontWeight: 800, fontFamily: "var(--font-demo)" }, "More Local Jobs."),
                    createSceneElement("text", { x: 28, y: 120, fill: theme_1.COLORS.violetBright, fontSize: 32, fontWeight: 800, fontFamily: "var(--font-demo)" }, "Booked On Autopilot."),
                    createSceneElement("text", { x: 28, y: 148, fill: theme_1.COLORS.siteTextMuted, fontSize: 14, fontWeight: 500, fontFamily: "var(--font-demo)" }, "Sydney & Melb edge \u00B7 Flat AUD scope \u00B7 Zero lock-in"),
                    createSceneElement("rect", { x: 28, y: 166, width: 186, height: 40, rx: 10, fill: "url(#roseCtaFill)" }),
                    ctaPulse > 0.05 && (createSceneElement("rect", { x: 28 - ctaPulse * 8, y: 166 - ctaPulse * 8, width: 186 + ctaPulse * 16, height: 40 + ctaPulse * 16, rx: 12, fill: "none", stroke: theme_1.COLORS.roseBright, strokeWidth: 2, opacity: 1 - ctaPulse })),
                    createSceneElement("text", { x: 121, y: 191, textAnchor: "middle", fill: theme_1.COLORS.siteText, fontSize: 14, fontWeight: 700, fontFamily: "var(--font-demo)" }, "Book 15m Discovery"),
                    createSceneElement("rect", { x: 430, y: 24, width: 250, height: 176, rx: 12, fill: theme_1.COLORS.siteBg, stroke: theme_1.COLORS.siteBorder, strokeWidth: 1.2 }),
                    createSceneElement("text", { x: 452, y: 56, fill: theme_1.COLORS.mintBright, fontSize: 24, fontWeight: 700, fontFamily: "var(--font-demo)", style: { fontVariantNumeric: 'tabular-nums' } }, "0.4s Load"),
                    createSceneElement("text", { x: 452, y: 78, fill: theme_1.COLORS.siteTextMuted, fontSize: 12.5, fontWeight: 500, fontFamily: "var(--font-demo)" }, "AU Edge Conversion Rate"),
                    createSceneElement("polyline", { points: "452,166 490,150 528,156 570,124 610,128 658,94", fill: "none", stroke: theme_1.COLORS.mintBright, strokeWidth: 3, strokeLinecap: "round", strokeLinejoin: "round" }),
                    createSceneElement("circle", { cx: 658, cy: 94, r: 5, fill: theme_1.COLORS.mintBright }))),
                metricsAnim.pop > 0.01 && (createSceneElement("g", { transform: `translate(28, ${340 + metricsAnim.yOffset}) scale(1, ${metricsAnim.scaleY})`, opacity: metricsAnim.pop },
                    createSceneElement("rect", { x: 0, y: 0, width: 220, height: 132, rx: 14, fill: theme_1.COLORS.siteSurface, stroke: metricsAnim.flash > 0.1 ? theme_1.COLORS.mintBright : theme_1.COLORS.siteBorder, strokeWidth: 1.5 + metricsAnim.flash * 2 }),
                    createSceneElement("text", { x: 22, y: 48, fill: theme_1.COLORS.mintBright, fontSize: 30, fontWeight: 700, fontFamily: "var(--font-demo)", style: { fontVariantNumeric: 'tabular-nums' } }, "48 hrs"),
                    createSceneElement("text", { x: 22, y: 78, fill: theme_1.COLORS.siteText, fontSize: 15, fontWeight: 700, fontFamily: "var(--font-demo)" }, "Live .com.au"),
                    createSceneElement("text", { x: 22, y: 102, fill: theme_1.COLORS.siteTextMuted, fontSize: 12.5, fontWeight: 400, fontFamily: "var(--font-demo)" }, "Rapid AI delivery"),
                    createSceneElement("rect", { x: 242, y: 0, width: 220, height: 132, rx: 14, fill: theme_1.COLORS.siteSurface, stroke: metricsAnim.flash > 0.1 ? theme_1.COLORS.roseBright : theme_1.COLORS.siteBorder, strokeWidth: 1.5 + metricsAnim.flash * 2 }),
                    createSceneElement("text", { x: 264, y: 48, fill: theme_1.COLORS.roseBright, fontSize: 30, fontWeight: 700, fontFamily: "var(--font-demo)", style: { fontVariantNumeric: 'tabular-nums' } }, "24/7"),
                    createSceneElement("text", { x: 264, y: 78, fill: theme_1.COLORS.siteText, fontSize: 15, fontWeight: 700, fontFamily: "var(--font-demo)" }, "Lead Capture"),
                    createSceneElement("text", { x: 264, y: 102, fill: theme_1.COLORS.siteTextMuted, fontSize: 12.5, fontWeight: 400, fontFamily: "var(--font-demo)" }, "Built-in quote form"),
                    createSceneElement("rect", { x: 484, y: 0, width: 220, height: 132, rx: 14, fill: theme_1.COLORS.siteSurface, stroke: metricsAnim.flash > 0.1 ? theme_1.COLORS.amberBright : theme_1.COLORS.siteBorder, strokeWidth: 1.5 + metricsAnim.flash * 2 }),
                    createSceneElement("text", { x: 506, y: 48, fill: theme_1.COLORS.amberBright, fontSize: 30, fontWeight: 700, fontFamily: "var(--font-demo)", style: { fontVariantNumeric: 'tabular-nums' } }, "-80%"),
                    createSceneElement("text", { x: 506, y: 78, fill: theme_1.COLORS.siteText, fontSize: 15, fontWeight: 700, fontFamily: "var(--font-demo)" }, "AUD Build Cost"),
                    createSceneElement("text", { x: 506, y: 102, fill: theme_1.COLORS.siteTextMuted, fontSize: 12.5, fontWeight: 400, fontFamily: "var(--font-demo)" }, "Flat AUD pricing"))),
                compareAnim.pop > 0.01 && (createSceneElement("g", { transform: `translate(28, ${488 + compareAnim.yOffset}) scale(1, ${compareAnim.scaleY})`, opacity: compareAnim.pop },
                    createSceneElement("rect", { x: 0, y: 0, width: 704, height: 170, rx: 14, fill: theme_1.COLORS.siteSurface, stroke: compareAnim.flash > 0.1 ? theme_1.COLORS.amberBright : theme_1.COLORS.siteBorder, strokeWidth: 1.5 + compareAnim.flash * 2 }),
                    createSceneElement("rect", { x: 18, y: 18, width: 322, height: 134, rx: 10, fill: theme_1.COLORS.siteBg }),
                    createSceneElement("text", { x: 36, y: 48, fill: theme_1.COLORS.siteTextMuted, fontSize: 12, fontWeight: 700, fontFamily: "var(--font-demo)" }, "TRADITIONAL AU AGENCY"),
                    createSceneElement("text", { x: 36, y: 84, fill: theme_1.COLORS.siteTextMuted, fontSize: 23, fontWeight: 700, fontFamily: "var(--font-demo)", style: { fontVariantNumeric: 'tabular-nums' } }, "8 Weeks \u00B7 $12k+ AUD"),
                    createSceneElement("text", { x: 36, y: 114, fill: theme_1.COLORS.siteTextMuted, fontSize: 13, fontFamily: "var(--font-demo)" }, "Slow handoffs \u00B7 Retainer lock-in"),
                    createSceneElement("rect", { x: 358, y: 18, width: 328, height: 134, rx: 10, fill: theme_1.COLORS.siteSurfaceRaised, stroke: theme_1.COLORS.violetBright, strokeWidth: 1.5 }),
                    createSceneElement("text", { x: 376, y: 48, fill: theme_1.COLORS.amberBright, fontSize: 12, fontWeight: 700, fontFamily: "var(--font-demo)" }, "AI SINGLE-PAGE BUILD"),
                    createSceneElement("text", { x: 376, y: 84, fill: theme_1.COLORS.siteText, fontSize: 23, fontWeight: 800, fontFamily: "var(--font-demo)", style: { fontVariantNumeric: 'tabular-nums' } }, "48 Hours \u00B7 Flat AUD"),
                    createSceneElement("text", { x: 376, y: 114, fill: theme_1.COLORS.mintBright, fontSize: 13, fontWeight: 600, fontFamily: "var(--font-demo)" }, "Discovery \u2192 Scope \u2192 AI Build \u2192 Live"))),
                formAnim.pop > 0.01 && (createSceneElement("g", { transform: `translate(28, ${674 + formAnim.yOffset}) scale(1, ${formAnim.scaleY})`, opacity: formAnim.pop },
                    createSceneElement("rect", { x: 0, y: 0, width: 704, height: 152, rx: 14, fill: theme_1.COLORS.siteSurfaceRaised, stroke: formAnim.flash > 0.1 ? theme_1.COLORS.mintBright : theme_1.COLORS.siteBorderBright, strokeWidth: 1.5 + formAnim.flash * 2.5 }),
                    createSceneElement("text", { x: 24, y: 38, fill: theme_1.COLORS.siteText, fontSize: 20, fontWeight: 700, fontFamily: "var(--font-demo)" }, "Ready to win more local work?"),
                    createSceneElement("text", { x: 24, y: 62, fill: theme_1.COLORS.siteTextMuted, fontSize: 13, fontFamily: "var(--font-demo)" }, "Enter your details for a flat AUD scope within 15 minutes."),
                    createSceneElement("rect", { x: 24, y: 84, width: 226, height: 44, rx: 8, fill: theme_1.COLORS.siteBg, stroke: theme_1.COLORS.siteBorder, strokeWidth: 1 }),
                    createSceneElement("text", { x: 40, y: 111, fill: theme_1.COLORS.siteTextMuted, fontSize: 13, fontFamily: "var(--font-demo)" }, "jack@harbourline.com.au"),
                    createSceneElement("rect", { x: 264, y: 84, width: 206, height: 44, rx: 8, fill: theme_1.COLORS.siteBg, stroke: theme_1.COLORS.siteBorder, strokeWidth: 1 }),
                    createSceneElement("text", { x: 280, y: 111, fill: theme_1.COLORS.siteTextMuted, fontSize: 13, fontFamily: "var(--font-demo)" }, "Sydney / Melbourne"),
                    createSceneElement("rect", { x: 484, y: 84, width: 196, height: 44, rx: 8, fill: theme_1.COLORS.mintBright }),
                    createSceneElement("text", { x: 582, y: 111, textAnchor: "middle", fill: "#051811", fontSize: 14, fontWeight: 700, fontFamily: "var(--font-demo)" }, "Get Fixed Quote"))),
                footerAnim.pop > 0.01 && (createSceneElement("g", { transform: `translate(28, ${842 + footerAnim.yOffset}) scale(1, ${footerAnim.scaleY})`, opacity: footerAnim.pop },
                    createSceneElement("rect", { x: 0, y: 0, width: 704, height: 84, rx: 12, fill: theme_1.COLORS.siteChrome, stroke: footerAnim.flash > 0.1 ? theme_1.COLORS.violetBright : theme_1.COLORS.siteBorder, strokeWidth: 1.5 + footerAnim.flash * 2 }),
                    createSceneElement("text", { x: 24, y: 48, fill: theme_1.COLORS.siteText, fontSize: 16, fontWeight: 700, fontFamily: "var(--font-demo)" }, "Harbourline"),
                    createSceneElement("text", { x: 150, y: 48, fill: theme_1.COLORS.mintBright, fontSize: 13, fontWeight: 600, fontFamily: "var(--font-demo)" }, "99.9% AU Edge Uptime \u00B7 ABN Verified"),
                    createSceneElement("text", { x: 680, y: 48, textAnchor: "end", fill: theme_1.COLORS.siteTextMuted, fontSize: 12, fontFamily: "var(--font-demo)" }, "Built for Aussie Growth"))))),
        buildFrame < 168 && (createSceneElement("g", { opacity: 0.9 },
            createSceneElement("line", { x1: 28, y1: chromeH + Math.min(viewportInnerH - 28, 84 + (buildFrame / 154) * 440), x2: 732, y2: chromeH + Math.min(viewportInnerH - 28, 84 + (buildFrame / 154) * 440), stroke: theme_1.COLORS.violetBright, strokeWidth: 2, strokeDasharray: "16 10", strokeDashoffset: -frame * 18, opacity: 0.65 }))),
        mobileReveal > 0.01 && (createSceneElement("g", { transform: `translate(${602 + (1 - mobileReveal) * 80}, ${148 + (1 - mobileReveal) * 44})`, opacity: mobileReveal },
            createSceneElement("rect", { x: 0, y: 0, width: 204, height: 398, rx: 26, fill: theme_1.COLORS.siteBg, stroke: theme_1.COLORS.indigoBright, strokeWidth: 2.5 }),
            createSceneElement("rect", { x: 70, y: 14, width: 64, height: 6, rx: 3, fill: theme_1.COLORS.siteBorderBright }),
            createSceneElement("rect", { x: 16, y: 36, width: 172, height: 114, rx: 12, fill: "url(#darkSiteHeroGrad)", stroke: theme_1.COLORS.siteBorder, strokeWidth: 1 }),
            createSceneElement("rect", { x: 28, y: 52, width: 126, height: 13, rx: 4, fill: theme_1.COLORS.siteText }),
            createSceneElement("rect", { x: 28, y: 72, width: 104, height: 11, rx: 4, fill: theme_1.COLORS.violetBright }),
            createSceneElement("rect", { x: 28, y: 102, width: 128, height: 32, rx: 7, fill: theme_1.COLORS.roseBright }),
            createSceneElement("text", { x: 92, y: 122, textAnchor: "middle", fill: theme_1.COLORS.siteText, fontSize: 11.5, fontWeight: 700, fontFamily: "var(--font-demo)" }, "Book Call"),
            createSceneElement("rect", { x: 16, y: 164, width: 172, height: 62, rx: 10, fill: theme_1.COLORS.siteSurface, stroke: theme_1.COLORS.siteBorder, strokeWidth: 1 }),
            createSceneElement("text", { x: 30, y: 202, fill: theme_1.COLORS.mintBright, fontSize: 16, fontWeight: 700, fontFamily: "var(--font-demo)", style: { fontVariantNumeric: 'tabular-nums' } }, "0.4s AU Load"),
            createSceneElement("rect", { x: 16, y: 238, width: 172, height: 62, rx: 10, fill: theme_1.COLORS.siteSurface, stroke: theme_1.COLORS.siteBorder, strokeWidth: 1 }),
            createSceneElement("text", { x: 30, y: 276, fill: theme_1.COLORS.amberBright, fontSize: 15, fontWeight: 700, fontFamily: "var(--font-demo)", style: { fontVariantNumeric: 'tabular-nums' } }, "-80% AUD Cost"),
            createSceneElement("rect", { x: 16, y: 314, width: 172, height: 66, rx: 10, fill: theme_1.COLORS.siteSurfaceRaised, stroke: theme_1.COLORS.siteBorderBright, strokeWidth: 1 }),
            createSceneElement("rect", { x: 28, y: 334, width: 148, height: 30, rx: 7, fill: theme_1.COLORS.mintBright }),
            createSceneElement("text", { x: 102, y: 353, textAnchor: "middle", fill: "#051811", fontSize: 11.5, fontWeight: 700, fontFamily: "var(--font-demo)" }, "Get Fixed Quote")))));
};
exports.KineticSiteBuild = KineticSiteBuild;

},
"copy": (exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PROMO_CHAPTERS = void 0;
exports.PROMO_CHAPTERS = [
    {
        id: 'discovery',
        stepNumber: '01',
        label: 'Discovery Call',
        startFrame: 0,
        durationFrames: 90,
        headline: 'Tell us about your business',
        subhead: 'We’ll talk about what you do, who you serve and what you want your website to help with.',
        accent: 'violet',
    },
    {
        id: 'scope',
        stepNumber: '02',
        label: 'Scope',
        startFrame: 90,
        durationFrames: 90,
        headline: 'Agree on what to build',
        subhead: 'Together, we’ll decide which pages and features your website needs before we start.',
        accent: 'amber',
    },
    {
        id: 'ai-build',
        stepNumber: '03',
        label: 'AI Build',
        startFrame: 180,
        durationFrames: 180,
        headline: 'Watch your website take shape',
        subhead: 'We use AI to build your site around the plan we agreed on, then share it for your feedback.',
        accent: 'rose',
    },
    {
        id: 'live',
        stepNumber: '04',
        label: 'Live',
        startFrame: 360,
        durationFrames: 120,
        headline: 'Share your website with the world',
        subhead: 'Once you’re happy with it, we’ll publish it on your domain so customers can find you online.',
        accent: 'mint',
    },
];

},
};
}
