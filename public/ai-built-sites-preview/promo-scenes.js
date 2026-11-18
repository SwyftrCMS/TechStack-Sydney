export function sceneDefinitions(createSceneElement, Fragment) {
return {
"scenes/Scene1DiscoveryCall": (exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scene1DiscoveryCall = void 0;
const remotion_1 = require("remotion");
const KineticPrimitives_1 = require("../components/KineticPrimitives");
const copy_1 = require("../copy");
const theme_1 = require("../theme");
const chapter = copy_1.PROMO_CHAPTERS[0];
const GOAL_ITEMS = [
    {
        title: 'Built for Speed',
        metric: '48h .com.au',
        detail: 'Launch your Australian site live in days, not months.',
        accent: theme_1.COLORS.mint,
        softBg: theme_1.COLORS.mintSoftLight,
        delay: 14,
    },
    {
        title: 'Lead Conversion',
        metric: '24/7 Capture',
        detail: 'Single-page funnel built to route local quotes.',
        accent: theme_1.COLORS.rose,
        softBg: theme_1.COLORS.roseSoftLight,
        delay: 26,
    },
    {
        title: 'Cost Effective',
        metric: '-80% AUD Cost',
        detail: 'Flat fixed-rate scope with zero agency retainers.',
        accent: theme_1.COLORS.amber,
        softBg: theme_1.COLORS.amberSoftLight,
        delay: 38,
    },
];
const Scene1DiscoveryCall = () => {
    const frame = (0, remotion_1.useCurrentFrame)();
    const { fps } = (0, remotion_1.useVideoConfig)();
    const enterP = (0, theme_1.clampedInterpolate)(frame, [0, 15], [0, 1], theme_1.EASE.expoOut);
    const pushP = (0, theme_1.clampedInterpolate)(frame, [18, 76], [0, 1], theme_1.EASE.snappy);
    const exitP = (0, theme_1.clampedInterpolate)(frame, [77, 89], [0, 1], theme_1.EASE.expoIn);
    const camZoom = 1.28 - enterP * 0.28 + pushP * 0.08 + exitP * 0.16;
    const camX = (1 - enterP) * 140 - exitP * 520;
    const camY = (1 - enterP) * 40 - pushP * 16;
    const camRotY = (1 - enterP) * 14 - 3 - exitP * 18;
    const camRotZ = (1 - enterP) * -2 + exitP * 2.5;
    const streakIntensity = (1 - (0, theme_1.clampedInterpolate)(frame, [0, 13], [0, 1])) +
        (0, theme_1.clampedInterpolate)(frame, [78, 89], [0, 1]);
    const cardPop = (0, remotion_1.spring)({
        frame: Math.max(0, frame - 4),
        fps,
        config: theme_1.SPRING_PRESETS.whip,
    });
    const timerProgress = (0, theme_1.clampedInterpolate)(frame, [10, 62], [0, 1], theme_1.EASE.snappy);
    const minsRemaining = Math.max(0, Math.round(15 * (1 - timerProgress)));
    const lockPop = frame < 56
        ? 0
        : (0, remotion_1.spring)({
            frame: frame - 56,
            fps,
            config: theme_1.SPRING_PRESETS.punch,
        });
    const waveBars = Array.from({ length: 22 }, (_, i) => {
        const wave = Math.abs(Math.sin(frame * 0.3 + i * 0.55));
        return 14 + wave * 36;
    });
    return (createSceneElement(remotion_1.AbsoluteFill, { style: { backgroundColor: theme_1.COLORS.bg } },
        createSceneElement(KineticPrimitives_1.KineticBackdrop, { glowX: 540, glowY: 880, accentColor: theme_1.COLORS.violet, secondaryColor: theme_1.COLORS.indigo }),
        createSceneElement(KineticPrimitives_1.CameraRig, { x: camX, y: camY, zoom: camZoom, rotateY: camRotY, rotateZ: camRotZ, origin: "540px 880px" },
            createSceneElement("svg", { width: 1080, height: 1440, viewBox: "0 0 1080 1440", shapeRendering: "geometricPrecision" },
                createSceneElement("defs", null,
                    createSceneElement("filter", { id: "lightCardShadow", x: "-12%", y: "-12%", width: "124%", height: "128%" },
                        createSceneElement("feDropShadow", { dx: "0", dy: "18", stdDeviation: "22", floodColor: "#4F46E5", floodOpacity: "0.09" }))),
                createSceneElement("g", { transform: `translate(72, ${460 + (1 - cardPop) * 44})`, opacity: cardPop, filter: "url(#lightCardShadow)" },
                    createSceneElement("rect", { x: 0, y: 0, width: 936, height: 848, rx: 24, fill: theme_1.COLORS.cardLight, stroke: theme_1.COLORS.borderLightStrong, strokeWidth: 1.5 }),
                    createSceneElement("rect", { x: 32, y: 32, width: 872, height: 176, rx: 16, fill: theme_1.COLORS.stage, stroke: theme_1.COLORS.borderLight, strokeWidth: 1.2 }),
                    createSceneElement("text", { x: 64, y: 74, fill: theme_1.COLORS.violet, fontSize: 16, fontWeight: 700, fontFamily: "var(--font-demo)" }, "15-MINUTE AU DISCOVERY SPRINT"),
                    createSceneElement("text", { x: 64, y: 144, fill: theme_1.COLORS.ink, fontSize: 60, fontWeight: 800, fontFamily: "var(--font-demo)", style: { fontVariantNumeric: 'tabular-nums' } },
                        String(minsRemaining).padStart(2, '0'),
                        ":00"),
                    createSceneElement("g", { transform: "translate(328, 96)" }, waveBars.map((h, idx) => (createSceneElement("rect", { key: idx, x: idx * 24, y: 52 - h, width: 13, height: h, rx: 4, fill: idx % 4 === 0
                            ? theme_1.COLORS.mint
                            : idx % 2 === 0
                                ? theme_1.COLORS.violet
                                : theme_1.COLORS.indigo, opacity: 0.85 })))),
                    GOAL_ITEMS.map((item, idx) => {
                        const p = frame < item.delay
                            ? 0
                            : (0, remotion_1.spring)({
                                frame: frame - item.delay,
                                fps,
                                config: theme_1.SPRING_PRESETS.punch,
                            });
                        const yPos = 232 + idx * 164;
                        const slideX = (1 - p) * 70;
                        return (createSceneElement("g", { key: item.title, transform: `translate(${32 + slideX}, ${yPos})`, opacity: p },
                            createSceneElement("rect", { x: 0, y: 0, width: 872, height: 140, rx: 16, fill: theme_1.COLORS.cardLight, stroke: theme_1.COLORS.borderLight, strokeWidth: 1.5 }),
                            createSceneElement("rect", { x: 20, y: 24, width: 254, height: 92, rx: 12, fill: item.softBg }),
                            createSceneElement("text", { x: 147, y: 78, textAnchor: "middle", fill: item.accent, fontSize: 23, fontWeight: 700, fontFamily: "var(--font-demo)", style: { fontVariantNumeric: 'tabular-nums' } }, item.metric),
                            createSceneElement("text", { x: 302, y: 62, fill: theme_1.COLORS.ink, fontSize: 27, fontWeight: 700, fontFamily: "var(--font-demo)" }, item.title),
                            createSceneElement("text", { x: 302, y: 100, fill: theme_1.COLORS.inkSecondary, fontSize: 19.5, fontWeight: 400, fontFamily: "var(--font-demo)" }, item.detail)));
                    }),
                    createSceneElement("g", { transform: `translate(32, 738) scale(${0.95 + lockPop * 0.05})`, opacity: 0.45 + lockPop * 0.55 },
                        createSceneElement("rect", { x: 0, y: 0, width: 872, height: 74, rx: 16, fill: lockPop > 0.3 ? theme_1.COLORS.mintSoftLight : theme_1.COLORS.stage, stroke: lockPop > 0.3 ? theme_1.COLORS.mint : theme_1.COLORS.borderLight, strokeWidth: 1.5 }),
                        createSceneElement("text", { x: 436, y: 45, textAnchor: "middle", fill: lockPop > 0.3 ? theme_1.COLORS.mint : theme_1.COLORS.inkMuted, fontSize: 19.5, fontWeight: 600, fontFamily: "var(--font-demo)" }, lockPop > 0.3
                            ? 'Goals Aligned · Advancing to Scope Blueprint →'
                            : 'Capturing offer & Australian conversion goals...'))))),
        createSceneElement(KineticPrimitives_1.KineticTextStage, { chapter: chapter, activeStepIndex: 0, sceneDuration: 90 }),
        createSceneElement(KineticPrimitives_1.SpeedStreaks, { intensity: streakIntensity, direction: "left", accentColor: theme_1.COLORS.violet })));
};
exports.Scene1DiscoveryCall = Scene1DiscoveryCall;

},
"scenes/Scene2Scope": (exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scene2Scope = void 0;
const remotion_1 = require("remotion");
const KineticPrimitives_1 = require("../components/KineticPrimitives");
const copy_1 = require("../copy");
const theme_1 = require("../theme");
const chapter = copy_1.PROMO_CHAPTERS[1];
const BLUEPRINT_NODES = [
    {
        step: '01',
        title: 'Hero Hook + Local CTA',
        detail: 'Above-the-fold clarity & instant quote trigger',
        accent: theme_1.COLORS.rose,
        delay: 10,
    },
    {
        step: '02',
        title: 'Speed & Local Proof',
        detail: 'Quantified ROI & Australian client trust signals',
        accent: theme_1.COLORS.mint,
        delay: 22,
    },
    {
        step: '03',
        title: 'Flat AUD Comparison',
        detail: '80% cost saving vs. traditional local agencies',
        accent: theme_1.COLORS.amber,
        delay: 34,
    },
    {
        step: '04',
        title: 'Instant Enquiry Form',
        detail: 'Zero-friction capture routed straight to SMS & CRM',
        accent: theme_1.COLORS.violet,
        delay: 46,
    },
];
const Scene2Scope = () => {
    const frame = (0, remotion_1.useCurrentFrame)();
    const { fps } = (0, remotion_1.useVideoConfig)();
    const enterP = (0, theme_1.clampedInterpolate)(frame, [0, 14], [0, 1], theme_1.EASE.expoOut);
    const panP = (0, theme_1.clampedInterpolate)(frame, [18, 72], [0, 1], theme_1.EASE.snappy);
    const exitP = (0, theme_1.clampedInterpolate)(frame, [76, 89], [0, 1], theme_1.EASE.expoIn);
    const camX = (1 - enterP) * 440;
    const camY = 30 - panP * 60 - exitP * 40;
    const camZoom = 1.24 - enterP * 0.24 + panP * 0.1 + exitP * 0.45;
    const camRotY = (1 - enterP) * -14 + 3 - panP * 5;
    const camRotZ = (1 - enterP) * 2.2 - exitP * 1.5;
    const streakIntensity = (1 - (0, theme_1.clampedInterpolate)(frame, [0, 12], [0, 1])) +
        (0, theme_1.clampedInterpolate)(frame, [77, 89], [0, 1]);
    const spineDraw = (0, theme_1.clampedInterpolate)(frame, [10, 58], [0, 1], theme_1.EASE.snappy);
    const spineLength = 520 * spineDraw;
    const approvedPop = frame < 62
        ? 0
        : (0, remotion_1.spring)({
            frame: frame - 62,
            fps,
            config: theme_1.SPRING_PRESETS.whip,
        });
    return (createSceneElement(remotion_1.AbsoluteFill, { style: { backgroundColor: theme_1.COLORS.bg } },
        createSceneElement(KineticPrimitives_1.KineticBackdrop, { glowX: 540, glowY: 900, accentColor: theme_1.COLORS.amber, secondaryColor: theme_1.COLORS.indigo }),
        createSceneElement(KineticPrimitives_1.CameraRig, { x: camX, y: camY, zoom: camZoom, rotateY: camRotY, rotateZ: camRotZ, origin: "540px 880px" },
            createSceneElement("svg", { width: 1080, height: 1440, viewBox: "0 0 1080 1440", shapeRendering: "geometricPrecision" },
                createSceneElement("defs", null,
                    createSceneElement("filter", { id: "scopeShadow", x: "-12%", y: "-12%", width: "124%", height: "128%" },
                        createSceneElement("feDropShadow", { dx: "0", dy: "18", stdDeviation: "22", floodColor: "#4F46E5", floodOpacity: "0.09" }))),
                createSceneElement("g", { transform: "translate(72, 460)", filter: "url(#scopeShadow)" },
                    createSceneElement("rect", { x: 0, y: 0, width: 936, height: 848, rx: 24, fill: theme_1.COLORS.cardLight, stroke: theme_1.COLORS.borderLightStrong, strokeWidth: 1.5 }),
                    createSceneElement("text", { x: 32, y: 56, fill: theme_1.COLORS.inkMuted, fontSize: 16, fontWeight: 700, fontFamily: "var(--font-demo)" }, "SINGLE-PAGE AU FUNNEL BLUEPRINT"),
                    approvedPop > 0.05 && (createSceneElement("g", { transform: `translate(664, 28) scale(${0.88 + approvedPop * 0.12})`, opacity: approvedPop },
                        createSceneElement("rect", { x: 0, y: 0, width: 240, height: 40, rx: 10, fill: theme_1.COLORS.amberSoftLight, stroke: theme_1.COLORS.amber, strokeWidth: 1.5 }),
                        createSceneElement("text", { x: 120, y: 26, textAnchor: "middle", fill: theme_1.COLORS.amber, fontSize: 14.5, fontWeight: 700, fontFamily: "var(--font-demo)" }, "FLAT AUD SCOPE LOCKED"))),
                    createSceneElement("line", { x1: 76, y1: 124, x2: 76, y2: 644, stroke: theme_1.COLORS.borderLight, strokeWidth: 4, strokeLinecap: "round" }),
                    createSceneElement("line", { x1: 76, y1: 124, x2: 76, y2: 124 + spineLength, stroke: theme_1.COLORS.indigo, strokeWidth: 4, strokeLinecap: "round" }),
                    BLUEPRINT_NODES.map((node, idx) => {
                        const p = frame < node.delay
                            ? 0
                            : (0, remotion_1.spring)({
                                frame: frame - node.delay,
                                fps,
                                config: theme_1.SPRING_PRESETS.whip,
                            });
                        const yPos = 96 + idx * 164;
                        const isLocked = frame >= node.delay + 10;
                        return (createSceneElement("g", { key: node.step, transform: `translate(0, ${yPos + (1 - p) * 26})`, opacity: p },
                            createSceneElement("circle", { cx: 76, cy: 68, r: 22, fill: isLocked ? node.accent : theme_1.COLORS.cardLight, stroke: node.accent, strokeWidth: 3 }),
                            createSceneElement("text", { x: 76, y: 74, textAnchor: "middle", fill: isLocked ? '#FFFFFF' : theme_1.COLORS.ink, fontSize: 16, fontWeight: 700, fontFamily: "var(--font-demo)", style: { fontVariantNumeric: 'tabular-nums' } }, node.step),
                            createSceneElement("rect", { x: 124, y: 0, width: 780, height: 136, rx: 16, fill: theme_1.COLORS.stage, stroke: isLocked ? node.accent : theme_1.COLORS.borderLight, strokeOpacity: isLocked ? 0.5 : 1, strokeWidth: 1.5 }),
                            createSceneElement("text", { x: 156, y: 56, fill: theme_1.COLORS.ink, fontSize: 26, fontWeight: 700, fontFamily: "var(--font-demo)" }, node.title),
                            createSceneElement("text", { x: 156, y: 94, fill: theme_1.COLORS.inkSecondary, fontSize: 19, fontWeight: 400, fontFamily: "var(--font-demo)" }, node.detail),
                            createSceneElement("text", { x: 876, y: 74, textAnchor: "end", fill: isLocked ? theme_1.COLORS.mint : theme_1.COLORS.inkMuted, fontSize: 15, fontWeight: 700, fontFamily: "var(--font-demo)" }, isLocked ? 'LOCKED' : 'QUEUED')));
                    }),
                    createSceneElement("text", { x: 468, y: 796, textAnchor: "middle", fill: theme_1.COLORS.inkSecondary, fontSize: 18, fontWeight: 600, fontFamily: "var(--font-demo)" }, "Zero Scope Creep \u00B7 Flat AUD Price \u00B7 Launching into AI Build \u2192")))),
        createSceneElement(KineticPrimitives_1.KineticTextStage, { chapter: chapter, activeStepIndex: 1, sceneDuration: 90 }),
        createSceneElement(KineticPrimitives_1.SpeedStreaks, { intensity: streakIntensity, direction: "right", accentColor: theme_1.COLORS.amber })));
};
exports.Scene2Scope = Scene2Scope;

},
"scenes/Scene3AiBuild": (exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scene3AiBuild = void 0;
const remotion_1 = require("remotion");
const KineticPrimitives_1 = require("../components/KineticPrimitives");
const KineticSiteBuild_1 = require("../components/KineticSiteBuild");
const copy_1 = require("../copy");
const theme_1 = require("../theme");
const chapter = copy_1.PROMO_CHAPTERS[2];
/**
 * Scene 3 (6–12s | Frames 180–359, local 0–179) — HIGH-IMPACT AI BUILD
 * - Light white canvas & Plus Jakarta Sans header section above
 * - Lexend Deca inside the telemetry dock and dark-mode Aussie website preview
 */
const Scene3AiBuild = () => {
    const frame = (0, remotion_1.useCurrentFrame)();
    const { fps } = (0, remotion_1.useVideoConfig)();
    const enterP = (0, theme_1.clampedInterpolate)(frame, [0, 16], [0, 1], theme_1.EASE.expoOut);
    const trackP = (0, theme_1.clampedInterpolate)(frame, [20, 158], [0, 1], theme_1.EASE.snappy);
    const exitP = (0, theme_1.clampedInterpolate)(frame, [164, 179], [0, 1], theme_1.EASE.expoIn);
    const camZoom = 1.38 - enterP * 0.36 + trackP * 0.08 + exitP * 0.24;
    const camX = (1 - enterP) * -120 + Math.sin(trackP * Math.PI) * -18;
    const camY = (1 - enterP) * -60 - trackP * 24 + exitP * -28;
    const camRotX = (1 - enterP) * 14 + 4 - trackP * 3;
    const camRotY = (1 - enterP) * -16 - 5 + trackP * 8;
    const streakIntensity = (1 - (0, theme_1.clampedInterpolate)(frame, [0, 14], [0, 1])) +
        (0, theme_1.clampedInterpolate)(frame, [165, 179], [0, 1]);
    const dockPop = (0, remotion_1.spring)({
        frame: Math.max(0, frame - 4),
        fps,
        config: theme_1.SPRING_PRESETS.whip,
    });
    const sectionsBuilt = (frame >= 6 ? 1 : 0) +
        (frame >= 26 ? 1 : 0) +
        (frame >= 52 ? 1 : 0) +
        (frame >= 78 ? 1 : 0) +
        (frame >= 106 ? 1 : 0) +
        (frame >= 132 ? 1 : 0);
    const buildPct = Math.min(100, Math.round((0, theme_1.clampedInterpolate)(frame, [6, 152], [0, 100], theme_1.EASE.snappy)));
    const ringSpin = frame * 4.5;
    const beamDash = -frame * 18;
    return (createSceneElement(remotion_1.AbsoluteFill, { style: { backgroundColor: theme_1.COLORS.bg } },
        createSceneElement(KineticPrimitives_1.KineticBackdrop, { glowX: 540, glowY: 900, accentColor: theme_1.COLORS.rose, secondaryColor: theme_1.COLORS.violet, intensity: 1.15 }),
        createSceneElement(KineticPrimitives_1.CameraRig, { x: camX, y: camY, zoom: camZoom, rotateX: camRotX, rotateY: camRotY, origin: "540px 880px" },
            createSceneElement("svg", { width: 1080, height: 1440, viewBox: "0 0 1080 1440", shapeRendering: "geometricPrecision" },
                createSceneElement("g", { transform: `translate(72, ${460 + (1 - dockPop) * 24})`, opacity: dockPop },
                    createSceneElement("rect", { x: 0, y: 0, width: 936, height: 88, rx: 20, fill: theme_1.COLORS.cardLight, stroke: theme_1.COLORS.borderLightStrong, strokeWidth: 1.5 }),
                    createSceneElement("g", { transform: "translate(52, 44)" },
                        createSceneElement("g", { transform: `rotate(${ringSpin})` },
                            createSceneElement("circle", { cx: 0, cy: 0, r: 22, fill: theme_1.COLORS.violetSoft, stroke: theme_1.COLORS.violet, strokeWidth: 2.5, strokeDasharray: "10 5" })),
                        createSceneElement("text", { x: 0, y: 5, textAnchor: "middle", fill: theme_1.COLORS.violet, fontSize: 12, fontWeight: 800, fontFamily: "var(--font-demo)" }, "AI")),
                    createSceneElement("text", { x: 92, y: 38, fill: theme_1.COLORS.ink, fontSize: 17.5, fontWeight: 700, fontFamily: "var(--font-demo)" }, "Assembling a cost effective, performance based website"),
                    createSceneElement("text", { x: 92, y: 64, fill: theme_1.COLORS.inkSecondary, fontSize: 15, fontWeight: 500, fontFamily: "var(--font-demo)", style: { fontVariantNumeric: 'tabular-nums' } },
                        sectionsBuilt,
                        "/6 Blocks \u00B7 0.4s AU Edge \u00B7 -80% AUD Build Cost"),
                    createSceneElement("rect", { x: 644, y: 34, width: 180, height: 20, rx: 10, fill: theme_1.COLORS.stage, stroke: theme_1.COLORS.borderLight, strokeWidth: 1 }),
                    createSceneElement("rect", { x: 644, y: 34, width: (180 * buildPct) / 100, height: 20, rx: 10, fill: buildPct === 100 ? theme_1.COLORS.mint : theme_1.COLORS.violet }),
                    createSceneElement("text", { x: 904, y: 52, textAnchor: "end", fill: buildPct === 100 ? theme_1.COLORS.mint : theme_1.COLORS.violet, fontSize: 22, fontWeight: 800, fontFamily: "var(--font-demo)", style: { fontVariantNumeric: 'tabular-nums' } },
                        buildPct,
                        "%")),
                createSceneElement("g", { opacity: frame < 162 ? 0.9 : 0 },
                    createSceneElement("line", { x1: 306, y1: 548, x2: 306, y2: 586, stroke: theme_1.COLORS.indigoBright, strokeWidth: 3, strokeDasharray: "10 6", strokeDashoffset: beamDash }),
                    createSceneElement("line", { x1: 540, y1: 548, x2: 540, y2: 586, stroke: theme_1.COLORS.roseBright, strokeWidth: 3, strokeDasharray: "10 6", strokeDashoffset: beamDash * 1.2 }),
                    createSceneElement("line", { x1: 774, y1: 548, x2: 774, y2: 586, stroke: theme_1.COLORS.mintBright, strokeWidth: 3, strokeDasharray: "10 6", strokeDashoffset: beamDash * 0.9 })),
                createSceneElement(KineticSiteBuild_1.KineticSiteBuild, { x: 72, y: 584, width: 936, height: 748, buildFrame: frame, ctaPulse: frame > 130 ? ((frame - 130) % 24) / 24 : 0 }))),
        createSceneElement(KineticPrimitives_1.KineticTextStage, { chapter: chapter, activeStepIndex: 2, sceneDuration: 180 }),
        createSceneElement(KineticPrimitives_1.SpeedStreaks, { intensity: streakIntensity, direction: "vertical", accentColor: theme_1.COLORS.rose })));
};
exports.Scene3AiBuild = Scene3AiBuild;

},
"scenes/Scene4Live": (exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scene4Live = void 0;
const remotion_1 = require("remotion");
const KineticPrimitives_1 = require("../components/KineticPrimitives");
const KineticSiteBuild_1 = require("../components/KineticSiteBuild");
const copy_1 = require("../copy");
const theme_1 = require("../theme");
const chapter = copy_1.PROMO_CHAPTERS[3];
const Scene4Live = () => {
    const frame = (0, remotion_1.useCurrentFrame)();
    const { fps } = (0, remotion_1.useVideoConfig)();
    const enterP = (0, theme_1.clampedInterpolate)(frame, [0, 18], [0, 1], theme_1.EASE.expoOut);
    const settlePush = (0, theme_1.clampedInterpolate)(frame, [24, 119], [0, 1], theme_1.EASE.snappy);
    const camZoom = 1.28 - enterP * 0.28 + settlePush * 0.04;
    const camX = (1 - enterP) * -40;
    const camY = (1 - enterP) * -28;
    const camRotY = (1 - enterP) * 10 - 3 + settlePush * 2;
    const camRotX = (1 - enterP) * 6 + 2 - settlePush * 1;
    const streakIntensity = 1 - (0, theme_1.clampedInterpolate)(frame, [0, 14], [0, 1]);
    const scrollBack = (0, theme_1.clampedInterpolate)(frame, [0, 28], [468, 0], theme_1.EASE.expoOut);
    const mobileReveal = (0, theme_1.clampedInterpolate)(frame, [20, 48], [0, 1], theme_1.EASE.expoOut);
    // Mobile responsive designs card pops up as the phone slides out
    const responsiveCardPop = frame < 34
        ? 0
        : (0, remotion_1.spring)({
            frame: frame - 34,
            fps,
            config: theme_1.SPRING_PRESETS.whip,
        });
    const livePop = frame < 36
        ? 0
        : (0, remotion_1.spring)({
            frame: frame - 36,
            fps,
            config: theme_1.SPRING_PRESETS.punch,
        });
    const shockwave = (0, theme_1.clampedInterpolate)(frame, [36, 70], [0, 1], theme_1.EASE.expoOut);
    const roiPop = frame < 46
        ? 0
        : (0, remotion_1.spring)({
            frame: frame - 46,
            fps,
            config: theme_1.SPRING_PRESETS.whip,
        });
    const ctaPulse = frame > 48 && frame < 114 ? ((frame - 48) % 28) / 28 : 0;
    return (createSceneElement(remotion_1.AbsoluteFill, { style: { backgroundColor: theme_1.COLORS.bg } },
        createSceneElement(KineticPrimitives_1.KineticBackdrop, { glowX: 540, glowY: 840, accentColor: theme_1.COLORS.mint, secondaryColor: theme_1.COLORS.violet, intensity: 1.1 }),
        createSceneElement(KineticPrimitives_1.CameraRig, { x: camX, y: camY, zoom: camZoom, rotateX: camRotX, rotateY: camRotY, origin: "540px 840px" },
            createSceneElement("svg", { width: 1080, height: 1440, viewBox: "0 0 1080 1440", shapeRendering: "geometricPrecision" },
                createSceneElement("defs", null,
                    createSceneElement("filter", { id: "responsiveCardShadow", x: "-12%", y: "-12%", width: "124%", height: "135%" },
                        createSceneElement("feDropShadow", { dx: "0", dy: "14", stdDeviation: "18", floodColor: "#4F46E5", floodOpacity: "0.12" }))),
                createSceneElement(KineticSiteBuild_1.KineticSiteBuild, { x: 72, y: 454, width: 760, height: 556, buildFrame: 200, scrollOverride: scrollBack, mobileReveal: mobileReveal, ctaPulse: ctaPulse }),
                createSceneElement("g", { transform: "translate(944, 486)" },
                    shockwave > 0.02 && shockwave < 0.99 && (createSceneElement(Fragment, null,
                        createSceneElement("circle", { cx: 0, cy: 0, r: 24 + shockwave * 105, fill: "none", stroke: theme_1.COLORS.mint, strokeWidth: 3, opacity: (1 - shockwave) * 0.7 }),
                        createSceneElement("circle", { cx: 0, cy: 0, r: 14 + shockwave * 66, fill: "none", stroke: theme_1.COLORS.violet, strokeWidth: 2.5, opacity: (1 - shockwave) * 0.55 }))),
                    livePop > 0.02 && (createSceneElement("g", { transform: `scale(${livePop})` },
                        createSceneElement("rect", { x: -64, y: -28, width: 128, height: 56, rx: 14, fill: theme_1.COLORS.mint }),
                        createSceneElement("text", { x: 0, y: 8, textAnchor: "middle", fill: "#FFFFFF", fontSize: 23, fontWeight: 800, fontFamily: "var(--font-demo)" }, "LIVE")))),
                responsiveCardPop > 0.02 && (createSceneElement("g", { transform: `translate(576, ${1032 + (1 - responsiveCardPop) * 26})`, opacity: responsiveCardPop, filter: "url(#responsiveCardShadow)" },
                    createSceneElement("rect", { x: 0, y: 0, width: 432, height: 92, rx: 18, fill: theme_1.COLORS.cardLight, stroke: theme_1.COLORS.violetBright, strokeWidth: 1.75 }),
                    createSceneElement("rect", { x: 20, y: 20, width: 52, height: 52, rx: 12, fill: theme_1.COLORS.violetSoft }),
                    createSceneElement("rect", { x: 31, y: 34, width: 22, height: 18, rx: 3, fill: "none", stroke: theme_1.COLORS.violet, strokeWidth: 2.2 }),
                    createSceneElement("rect", { x: 46, y: 39, width: 12, height: 20, rx: 2.5, fill: theme_1.COLORS.violetSoft, stroke: theme_1.COLORS.indigo, strokeWidth: 2.2 }),
                    createSceneElement("text", { x: 88, y: 43, fill: theme_1.COLORS.ink, fontSize: 21, fontWeight: 700, fontFamily: "var(--font-demo)" }, "Mobile responsive designs"),
                    createSceneElement("text", { x: 88, y: 69, fill: theme_1.COLORS.inkSecondary, fontSize: 15, fontWeight: 500, fontFamily: "var(--font-demo)" }, "Built for phone, tablet & desktop"))),
                createSceneElement("g", { transform: `translate(72, ${1152 + (1 - roiPop) * 32})`, opacity: roiPop },
                    createSceneElement("rect", { x: 0, y: 0, width: 296, height: 160, rx: 20, fill: theme_1.COLORS.cardLight, stroke: theme_1.COLORS.borderLightStrong, strokeWidth: 1.5 }),
                    createSceneElement("text", { x: 28, y: 58, fill: theme_1.COLORS.amber, fontSize: 38, fontWeight: 800, fontFamily: "var(--font-demo)", style: { fontVariantNumeric: 'tabular-nums' } }, "-80%"),
                    createSceneElement("text", { x: 28, y: 98, fill: theme_1.COLORS.ink, fontSize: 21, fontWeight: 700, fontFamily: "var(--font-demo)" }, "AUD Cost"),
                    createSceneElement("text", { x: 28, y: 130, fill: theme_1.COLORS.inkSecondary, fontSize: 15.5, fontFamily: "var(--font-demo)" }, "Flat fixed rate"),
                    createSceneElement("rect", { x: 320, y: 0, width: 296, height: 160, rx: 20, fill: theme_1.COLORS.cardLight, stroke: theme_1.COLORS.borderLightStrong, strokeWidth: 1.5 }),
                    createSceneElement("text", { x: 348, y: 58, fill: theme_1.COLORS.rose, fontSize: 38, fontWeight: 800, fontFamily: "var(--font-demo)", style: { fontVariantNumeric: 'tabular-nums' } }, "7d"),
                    createSceneElement("text", { x: 348, y: 98, fill: theme_1.COLORS.ink, fontSize: 21, fontWeight: 700, fontFamily: "var(--font-demo)" }, "Turnaround Time"),
                    createSceneElement("text", { x: 348, y: 130, fill: theme_1.COLORS.inkSecondary, fontSize: 15.5, fontFamily: "var(--font-demo)" }, "Basic API calls"),
                    createSceneElement("rect", { x: 640, y: 0, width: 296, height: 160, rx: 20, fill: theme_1.COLORS.cardLight, stroke: theme_1.COLORS.borderLightStrong, strokeWidth: 1.5 }),
                    createSceneElement("text", { x: 668, y: 58, fill: theme_1.COLORS.mint, fontSize: 38, fontWeight: 800, fontFamily: "var(--font-demo)", style: { fontVariantNumeric: 'tabular-nums' } }, "99.9%"),
                    createSceneElement("text", { x: 668, y: 98, fill: theme_1.COLORS.ink, fontSize: 21, fontWeight: 700, fontFamily: "var(--font-demo)" }, "Uptime"),
                    createSceneElement("text", { x: 668, y: 130, fill: theme_1.COLORS.inkSecondary, fontSize: 15.5, fontFamily: "var(--font-demo)" }, "Service level agreement")))),
        createSceneElement(KineticPrimitives_1.KineticTextStage, { chapter: chapter, activeStepIndex: 3, sceneDuration: 120, persistOnEnd: true }),
        createSceneElement(KineticPrimitives_1.SpeedStreaks, { intensity: streakIntensity, direction: "vertical", accentColor: theme_1.COLORS.mint })));
};
exports.Scene4Live = Scene4Live;

},
"theme": (exports, require) => {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clampedInterpolate = exports.EASE = exports.SPRING_PRESETS = exports.COLORS = exports.VIDEO_CONFIG = void 0;
const remotion_1 = require("remotion");
/**
 * 3:4 Portrait Hero Composition tailored for mobile & tablet hero sections
 * (1080x1440 @ 30fps, 16 seconds / 480 frames).
 */
exports.VIDEO_CONFIG = {
    width: 1080,
    height: 1440,
    fps: 30,
    durationInFrames: 480,
};
/**
 * Light Page & Process Chrome + Dark Website UI Elements:
 * - Page / Process layer: Pure White (#FFFFFF), Soft Indigo Mist (#F6F5FF), Deep Ink (#0F0D24)
 * - Website Elements layer: Dark Obsidian/Indigo (#080614, #110E26, #191538)
 * - Brand & Semantic Accents: Violet (#7C3AED), Indigo (#4F46E5), Mint (#10B981 / #34D399),
 *   Rose (#E11D48 / #FB7185), Amber (#D97706 / #FBBF24)
 */
exports.COLORS = {
    // Light stage & process typography
    bg: '#FFFFFF',
    stage: '#F7F6FE',
    cardLight: '#FFFFFF',
    borderLight: '#E2E0F4',
    borderLightStrong: '#C7C2EC',
    ink: '#0F0D24',
    inkSecondary: '#47436B',
    inkMuted: '#78739B',
    // Dark website UI elements
    siteBg: '#080614',
    siteChrome: '#100D24',
    siteSurface: '#13102B',
    siteSurfaceRaised: '#1B163B',
    siteBorder: 'rgba(139, 92, 246, 0.28)',
    siteBorderBright: 'rgba(167, 139, 250, 0.55)',
    siteText: '#F8F7FF',
    siteTextMuted: '#B6B0DC',
    // Violet & Indigo core
    indigo: '#4F46E5',
    indigoBright: '#6366F1',
    indigoSoft: '#EEF2FF',
    violet: '#7C3AED',
    violetBright: '#A78BFA',
    violetSoft: '#F3EEFF',
    // Mint (Speed & Live)
    mint: '#10B981',
    mintBright: '#34D399',
    mintSoftLight: '#ECFDF5',
    mintSoftDark: 'rgba(52, 211, 153, 0.16)',
    // Rose (Lead Conversion)
    rose: '#E11D48',
    roseBright: '#FB7185',
    roseSoftLight: '#FFF1F2',
    roseSoftDark: 'rgba(251, 113, 133, 0.16)',
    // Amber (Cost Effectiveness)
    amber: '#D97706',
    amberBright: '#FBBF24',
    amberSoftLight: '#FFFBEB',
    amberSoftDark: 'rgba(251, 191, 36, 0.16)',
};
exports.SPRING_PRESETS = {
    whip: { damping: 16, stiffness: 290, mass: 0.62 },
    slam: { damping: 14, stiffness: 320, mass: 0.68 },
    punch: { damping: 13, stiffness: 240, mass: 0.72 },
    settle: { damping: 22, stiffness: 155, mass: 0.85 },
};
exports.EASE = {
    expoOut: remotion_1.Easing.bezier(0.16, 1, 0.3, 1),
    expoIn: remotion_1.Easing.bezier(0.7, 0, 0.84, 0),
    snappy: remotion_1.Easing.bezier(0.22, 1, 0.36, 1),
};
const clampedInterpolate = (frame, inputRange, outputRange, easing = exports.EASE.expoOut) => {
    return (0, remotion_1.interpolate)(frame, inputRange, outputRange, {
        easing,
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
};
exports.clampedInterpolate = clampedInterpolate;

}};
}
