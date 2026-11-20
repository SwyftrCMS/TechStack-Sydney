/**
 * TechStack Sydney — How We Build
 * Vanilla JS controller for:
 *  - Wide, smooth, exaggerated S-curve path across mobile, tablet, laptop & desktop
 *  - Visible guide track + progressive gradient ribbon drawn behind the orb
 *  - Motion-blurred slate circle + 6-dot moving-RGB lighter circle tail
 *  - Parallax backdrop canvas with stage ripples
 *  - Strict middle-of-screen (50vh) persistent title pop-up reveals
 *  - Mid-screen calibrated anchor navigation & arrival confetti
 */

(function () {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const root = document.getElementById('process-journey');
  if (!root) return;

  const stageEl = root.querySelector('#journey-main');
  const svgEl = root.querySelector('#' + 'journey-svg');
  const guidePath = root.querySelector('#' + 'journey-guide-path');
  const purpleGlowPath = root.querySelector('#' + 'journey-purple-glow');
  const cometGrad = root.querySelector('#' + 'trail-comet-grad');
  const purpleGlowGrad = root.querySelector('#' + 'purple-glow-grad');
  const lightOrb = root.querySelector('#' + 'light-orb');
  const trailDots = Array.from(root.querySelectorAll('.trail-dot'));
  const backdropCanvas = root.querySelector('#' + 'journey-backdrop-canvas');

  const TRAIL_OPACITIES = [0.78, 0.62, 0.46, 0.32, 0.18, 0.08];
  const MAX_TRAIL_SPREAD = 104;
  const COMET_TRAIL_LENGTH = 620;
  const SCREEN_MID_RATIO = 0.5;
  const stages = Array.from(root.querySelectorAll('.stage[data-stage]'));
  const introStage = root.querySelector('#stage-intro');
  let visibleStage = introStage;
  let requestedStage = introStage;
  introStage?.classList.add('is-revealed');
  let fadingOut = false;

  let pathTotalLength = 0;
  let waypointPositions = [];
  let introRestY = 120;
  let targetDrawLen = 0;
  let smoothDrawLen = 0;
  let trailAnchorLen = 0;
  let trailInitialized = false;
  let runnerRafId = 0;
  let backdropRafId = 0;
  let currentScrollProgress = 0;

  // Milestone ripples spawned on the backdrop canvas when a stage locks in at 50vh
  const activeRipples = [];

  // Multi-plane parallax depth particles for the backdrop canvas
  const DEPTH_NODES = Array.from({ length: 34 }, (_, i) => {
    const layer = i % 3; // 0 = far, 1 = mid, 2 = near
    return {
      xNorm: ((i * 73 + 19) % 100) / 100,
      yBase: ((i * 137 + 41) % 100) / 100,
      layer,
      parallax: layer === 0 ? 0.14 : layer === 1 ? 0.32 : 0.56,
      radius: layer === 0 ? 1.3 : layer === 1 ? 2.0 : 2.8,
      phase: i * 0.85,
      isCross: i % 5 === 0,
    };
  });

  // =========================================================================
  // 1. Wide, Smooth, Exaggerated Monotonic S-Curve Path
  // =========================================================================

  function getOrderedWaypoints() {
    const order = [
      'w-discovery',
      'w-preparation',
      'w-build',
      'w-testing',
      'w-golive',
    ];
    return order
      .map((key) => root.querySelector(`[data-waypoint="${key}"]`))
      .filter((el) => el !== null);
  }

  function getStageObstacle(stageSection, stageRect) {
    if (!stageSection) return null;

    const isRevealed = stageSection.classList.contains('is-revealed');
    const headlineEl = stageSection.querySelector('.section-headline');
    const visualEl =
      stageSection.querySelector(
        '.slot-visual .stage-showcase, .slot-visual .minimal-agenda, .slot-visual .minimal-arch'
      ) || stageSection.querySelector('.slot-visual');

    if (!headlineEl && !visualEl) return null;

    const getBox = (el, unrevealedTopShift, unrevealedPadX) => {
      const r = el.getBoundingClientRect();
      return {
        top: r.top - stageRect.top - (isRevealed ? 0 : unrevealedTopShift),
        bottom: r.bottom - stageRect.top,
        left: r.left - stageRect.left - (isRevealed ? 0 : unrevealedPadX),
        right: r.right - stageRect.left + (isRevealed ? 0 : unrevealedPadX),
      };
    };

    const hBox = headlineEl ? getBox(headlineEl, 12, 2) : null;
    const vBox = visualEl ? getBox(visualEl, 26, 6) : null;
    const boxes = [hBox, vBox].filter(Boolean);

    let top = Infinity;
    let bottom = -Infinity;
    let left = Infinity;
    let right = -Infinity;

    boxes.forEach((b) => {
      top = Math.min(top, b.top);
      bottom = Math.max(bottom, b.bottom);
      left = Math.min(left, b.left);
      right = Math.max(right, b.right);
    });

    let corridorLeft = null;
    let corridorRight = null;
    const isReversed = Boolean(stageSection.querySelector('.stage-split.is-reversed'));
    if (hBox && vBox) {
      const leftColBox = isReversed ? vBox : hBox;
      const rightColBox = isReversed ? hBox : vBox;
      corridorLeft = leftColBox.right;
      corridorRight = rightColBox.left;
    }

    return { top, bottom, left, right, corridorLeft, corridorRight };
  }

  function buildJourneyPath() {
    if (!stageEl || !svgEl || !guidePath) return;

    const stageRect = stageEl.getBoundingClientRect();
    const width = stageEl.offsetWidth;
    const height = stageEl.offsetHeight;
    const vw = window.innerWidth;
    const isMobile = vw < 768;

    svgEl.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svgEl.setAttribute('width', String(width));
    svgEl.setAttribute('height', String(height));

    const nodes = getOrderedWaypoints();
    if (nodes.length < 2) return;

    const points = nodes.map((el) => {
      const rect = el.getBoundingClientRect();
      return {
        el,
        key: el.getAttribute('data-waypoint') || '',
        x: rect.left - stageRect.left + rect.width / 2,
        y: rect.top - stageRect.top + rect.height / 2,
      };
    });

    waypointPositions = points;

    const stageIds = ['stage-discovery', 'stage-preparation', 'stage-build', 'stage-testing'];
    const obstacles = stageIds.map((id) => getStageObstacle(root.querySelector('#' + id), stageRect));

    const goliveHeadline = root.querySelector('#stage-golive .golive-headline');
    const goliveHeadlineRect = goliveHeadline ? goliveHeadline.getBoundingClientRect() : null;

    const centerX = width / 2;
    const anchors = [];

    function pushAnchor(x, y) {
      const prev = anchors[anchors.length - 1];
      if (!prev) {
        anchors.push({ x, y });
        return;
      }
      const safeY = Math.max(prev.y + 4, y);
      anchors.push({ x, y: safeY });
    }

    const golivePt = points[points.length - 1];
    const obs0 = obstacles[0];
    const topStartY = 8;
    introRestY = obs0
      ? Math.max(76, Math.min(obs0.top - 48, Math.round(obs0.top * 0.72)))
      : 120;

    pushAnchor(centerX, topStartY);
    pushAnchor(centerX, introRestY);

    if (isMobile) {
      const goliveTargetY = goliveHeadlineRect
        ? Math.min(golivePt.y, goliveHeadlineRect.top - stageRect.top - 22)
        : golivePt.y;

      for (let s = 0; s <= 3; s++) {
        const wPt = points[s];
        const obs = obstacles[s];
        const prevY = anchors[anchors.length - 1].y;
        const rawLandY = obs ? Math.min(wPt.y, obs.top - (s === 0 ? 28 : 40)) : wPt.y;
        const landY = Math.max(prevY + 12, rawLandY);

        if (s > 0 && landY - prevY >= 92) {
          const swingDir = s % 2 === 1 ? 1 : -1;
          const amp = Math.max(68, centerX - 24);
          pushAnchor(centerX + swingDir * amp, (prevY + landY) / 2);
        }

        pushAnchor(centerX, landY);

        if (obs) {
          const dir = s % 2 === 1 ? 1 : -1;
          const desiredRight = obs.right + 30;
          const rightX =
            desiredRight <= width - 16 ? desiredRight : Math.max(desiredRight, width + 22);
          const desiredLeft = obs.left - 30;
          const leftX = desiredLeft >= 16 ? desiredLeft : Math.min(desiredLeft, -22);
          const detourX = dir > 0 ? rightX : leftX;

          const topEdgeY = Math.max(landY + 18, obs.top - 10);
          const botEdgeY = Math.max(topEdgeY + 20, obs.bottom + 14);

          pushAnchor(detourX, topEdgeY);
          pushAnchor(detourX, botEdgeY);

          const nextObs = s < 3 ? obstacles[s + 1] : null;
          const nextTargetY =
            s < 3
              ? nextObs
                ? Math.min(points[s + 1].y, nextObs.top - 40)
                : points[s + 1].y
              : goliveTargetY;
          const returnY = Math.min(botEdgeY + 34, nextTargetY - 14);

          if (returnY >= botEdgeY + 18) {
            pushAnchor(centerX, returnY);
          }
        }
      }

      pushAnchor(centerX, Math.max(anchors[anchors.length - 1].y + 12, goliveTargetY));
    } else {
      const swingMargin = 44;
      const amplitude = Math.min(340, Math.max(150, width * 0.31));

      for (let s = 0; s <= 3; s++) {
        const wPt = points[s];
        const obs = obstacles[s];

        let spineX = wPt.x;
        if (obs && obs.corridorLeft !== null && obs.corridorRight !== null) {
          const gapW = obs.corridorRight - obs.corridorLeft;
          if (gapW >= 44) {
            spineX = Math.max(obs.corridorLeft + 22, Math.min(obs.corridorRight - 22, wPt.x));
          } else {
            spineX = (obs.corridorLeft + obs.corridorRight) / 2;
          }
        }

        const prevY = anchors[anchors.length - 1].y;
        const rawEntryY = obs ? Math.min(wPt.y - 12, obs.top - 24) : wPt.y - 12;
        const entryY = Math.max(prevY + 16, rawEntryY);
        const rawExitY = obs ? Math.max(wPt.y + 12, obs.bottom + 24) : wPt.y + 12;

        if (s > 0 && entryY - prevY >= 56) {
          const dir = s % 2 === 1 ? 1 : -1;
          const swingX = Math.max(
            swingMargin,
            Math.min(width - swingMargin, centerX + dir * amplitude)
          );
          pushAnchor(swingX, (prevY + entryY) / 2);
        }

        pushAnchor(spineX, entryY);
        const midY = Math.max(anchors[anchors.length - 1].y + 8, wPt.y);
        pushAnchor(spineX, midY);
        const exitY = Math.max(anchors[anchors.length - 1].y + 8, rawExitY);
        pushAnchor(spineX, exitY);
      }

      const prevY = anchors[anchors.length - 1].y;
      const goliveX = goliveHeadlineRect
        ? Math.min(golivePt.x, goliveHeadlineRect.left - stageRect.left - 28)
        : golivePt.x;
      const goliveTop = goliveHeadlineRect
        ? goliveHeadlineRect.top - stageRect.top
        : golivePt.y - 24;
      const goliveEntryY = Math.max(prevY + 16, Math.min(golivePt.y - 12, goliveTop - 24));

      if (goliveEntryY - prevY >= 56) {
        const swingX = Math.max(swingMargin, Math.min(width - swingMargin, centerX - amplitude));
        pushAnchor(swingX, (prevY + goliveEntryY) / 2);
      }

      pushAnchor(goliveX, goliveEntryY);
      pushAnchor(goliveX, Math.max(anchors[anchors.length - 1].y + 8, golivePt.y));
    }

    let d = `M ${anchors[0].x.toFixed(1)} ${anchors[0].y.toFixed(1)}`;
    for (let i = 0; i < anchors.length - 1; i++) {
      const p0 = anchors[i];
      const p1 = anchors[i + 1];
      const dy = p1.y - p0.y;
      const h = dy * 0.48;
      d += [
        ` C ${p0.x.toFixed(1)} ${(p0.y + h).toFixed(1)},`,
        ` ${p1.x.toFixed(1)} ${(p1.y - h).toFixed(1)},`,
        ` ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`,
      ].join('');
    }

    guidePath.setAttribute('d', d);
    if (purpleGlowPath) purpleGlowPath.setAttribute('d', d);

    pathTotalLength = guidePath.getTotalLength();

    resizeBackdropCanvas();
    updateScrollProgress();
  }

  function findLengthAtY(targetY) {
    if (!guidePath || pathTotalLength <= 0) return 0;
    let low = 0;
    let high = pathTotalLength;
    for (let i = 0; i < 20; i++) {
      const mid = (low + high) / 2;
      const pt = guidePath.getPointAtLength(mid);
      if (pt.y < targetY) {
        low = mid;
      } else {
        high = mid;
      }
    }
    return (low + high) / 2;
  }

  function getTangentAngle(len, stepSign) {
    const aheadLen = Math.max(0, Math.min(pathTotalLength, len + stepSign * 4));
    const behindLen = Math.max(0, Math.min(pathTotalLength, len - stepSign * 4));
    const pA = guidePath.getPointAtLength(aheadLen);
    const pB = guidePath.getPointAtLength(behindLen);
    return Math.hypot(pA.x - pB.x, pA.y - pB.y) > 0.2
      ? (Math.atan2(pA.y - pB.y, pA.x - pB.x) * 180) / Math.PI
      : 90;
  }

  function getSectionAnchorEl(sectionEl) {
    return sectionEl?.querySelector('[data-waypoint]') || sectionEl;
  }

  // =========================================================================
  // 2. Orb, Moving-RGB Tail & Progressive Drawn Ribbon
  // =========================================================================

  function renderOrbAndTrail() {
    if (!guidePath || pathTotalLength <= 0) return;

    const vw = window.innerWidth || 1024;
    const vh = window.innerHeight || 720;
    const isMobile = vw < 768;
    const activeCometLen = isMobile
      ? Math.max(120, Math.min(220, Math.round(vh * 0.28)))
      : COMET_TRAIL_LENGTH;

    const orbPt = guidePath.getPointAtLength(smoothDrawLen);
    const velocity = Math.abs(targetDrawLen - smoothDrawLen);
    const gap = smoothDrawLen - trailAnchorLen;
    const absGap = Math.abs(gap);
    const stepSign = gap >= 0 ? 1 : -1;
    const angleDeg = getTangentAngle(smoothDrawLen, stepSign);

    const energy = prefersReducedMotion.matches
      ? 0
      : Math.min(1, (velocity * 0.55 + absGap * 0.45) / 30);
    const blurPx = prefersReducedMotion.matches ? 0 : energy * 2.4;

    let runnerOpacity = 0;
    if (!prefersReducedMotion.matches) {
      const startFade = smoothDrawLen <= 1 ? 0 : Math.min(1, smoothDrawLen / 18);
      const distToEnd = Math.max(0, pathTotalLength - smoothDrawLen);
      const endFade = distToEnd >= 115 ? 1 : Math.max(0, (distToEnd - 12) / 103);
      runnerOpacity = startFade * endFade;
    }

    const segLen = Math.min(activeCometLen, smoothDrawLen);
    const startGap = Math.max(0, smoothDrawLen - segLen);
    const showComet =
      !prefersReducedMotion.matches && segLen >= 4 && runnerOpacity > 0.01;

    const dashPattern = `${segLen.toFixed(1)} ${(pathTotalLength + 1000).toFixed(1)}`;
    const segOffset = (-startGap).toFixed(1);
    guidePath.style.strokeDasharray = dashPattern;
    guidePath.style.strokeDashoffset = segOffset;
    if (purpleGlowPath) {
      purpleGlowPath.style.strokeDasharray = dashPattern;
      purpleGlowPath.style.strokeDashoffset = segOffset;
    }

    if (showComet) {
      const tailStartPt = guidePath.getPointAtLength(startGap);
      [cometGrad, purpleGlowGrad].forEach((gradEl) => {
        if (!gradEl) return;
        gradEl.setAttribute('x1', tailStartPt.x.toFixed(1));
        gradEl.setAttribute('y1', tailStartPt.y.toFixed(1));
        gradEl.setAttribute('x2', orbPt.x.toFixed(1));
        gradEl.setAttribute('y2', orbPt.y.toFixed(1));
      });
    }

    if (stageEl) {
      stageEl.style.setProperty('--orb-energy', energy.toFixed(3));
      stageEl.style.setProperty('--orb-blur', blurPx.toFixed(2));
      stageEl.style.setProperty('--runner-opacity', (showComet ? runnerOpacity : 0).toFixed(3));
    }

    if (lightOrb) {
      lightOrb.style.transform = `translate3d(${orbPt.x.toFixed(1)}px, ${orbPt.y.toFixed(1)}px, 0) translate(-50%, -50%) rotate(${angleDeg.toFixed(1)}deg)`;
    }

    if (prefersReducedMotion.matches || absGap < 0.8 || runnerOpacity <= 0.01) {
      trailDots.forEach((dotEl) => {
        dotEl.style.opacity = '0';
      });
      return;
    }

    const dir = gap >= 0 ? -1 : 1;
    const spread = Math.min(isMobile ? 64 : MAX_TRAIL_SPREAD, absGap * 1.65);
    const catchFade = Math.min(1, absGap / 22);

    trailDots.forEach((dotEl) => {
      const idx = Number(dotEl.getAttribute('data-trail-index') || '0');
      const dotLen = smoothDrawLen + dir * ((idx + 1) / 6) * spread;

      if (dotLen < 0 || dotLen > pathTotalLength) {
        dotEl.style.opacity = '0';
        return;
      }

      const pt = guidePath.getPointAtLength(dotLen);
      const startDotFade = Math.min(1, dotLen / 24);
      const scale = Math.max(0.35, 0.92 - idx * 0.11);
      const opacity = (TRAIL_OPACITIES[idx] ?? 0) * catchFade * startDotFade * runnerOpacity;

      dotEl.style.opacity = opacity.toFixed(3);
      dotEl.style.transform = `translate3d(${pt.x.toFixed(1)}px, ${pt.y.toFixed(1)}px, 0) translate(-50%, -50%) scale(${scale.toFixed(2)})`;
    });
  }

  // =========================================================================
  // 3. Mid-Screen (50vh) Persistent Stage Reveals & Kinetic Ripples
  // =========================================================================

  function triggerMilestoneRipple(viewportX, viewportY) {
    if (prefersReducedMotion.matches) return;
    activeRipples.push({
      x: viewportX,
      y: viewportY,
      docY: viewportY + window.scrollY,
      progress: 0,
    });
  }

  function showRequestedStage() {
    if (fadingOut || visibleStage === requestedStage) return;

    if (visibleStage) {
      const outgoing = visibleStage;
      const container = outgoing.querySelector('.stage-container');
      outgoing.inert = true;
      outgoing.classList.remove('is-revealed');
      visibleStage = null;

      const exit = prefersReducedMotion.matches ? null : container.getAnimations().find(
        (animation) => animation.transitionProperty === 'opacity'
      );
      if (exit) {
        fadingOut = true;
        const finishExit = () => {
          fadingOut = false;
          showRequestedStage();
        };
        exit.finished.then(finishExit, finishExit);
        return;
      }
    }

    visibleStage = requestedStage;
    if (visibleStage) {
      visibleStage.inert = false;
      visibleStage.classList.add('is-revealed');
      if (visibleStage.id === 'stage-golive') celebrateAfterReveal(visibleStage);
      else if (currentScrollProgress < 0.72) confettiArmed = true;
      const rect = getSectionAnchorEl(visibleStage).getBoundingClientRect();
      triggerMilestoneRipple(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
  }

  function updateMidScreenReveals() {
    const viewportHeight = window.innerHeight;
    requestedStage = stages.findLast((stage) => {
      const rect = stage.getBoundingClientRect();
      return rect.top <= Math.max(0, (viewportHeight - rect.height) / 2) + 1;
    }) ?? introStage;
    showRequestedStage();
  }

  // =========================================================================
  // 4. Atmospheric Parallax Spatial Backdrop Canvas
  // =========================================================================

  let backdropW = 0;
  let backdropH = 0;
  let backdropDpr = 1;

  function resizeBackdropCanvas() {
    if (!backdropCanvas) return;
    backdropDpr = Math.min(window.devicePixelRatio || 1, 2);
    backdropW = window.innerWidth;
    backdropH = window.innerHeight;
    backdropCanvas.width = Math.floor(backdropW * backdropDpr);
    backdropCanvas.height = Math.floor(backdropH * backdropDpr);
  }

  function drawBackdropFrame(nowMs) {
    if (!backdropCanvas) return;
    const ctx = backdropCanvas.getContext('2d');
    if (!ctx) return;

    if (backdropW === 0 || backdropH === 0) resizeBackdropCanvas();

    ctx.setTransform(backdropDpr, 0, 0, backdropDpr, 0, 0);
    ctx.clearRect(0, 0, backdropW, backdropH);

    ctx.translate(0, -backdropCanvas.getBoundingClientRect().top);

    const time = prefersReducedMotion.matches ? 0 : nowMs * 0.001;
    const p = currentScrollProgress;
    const stageTop = stageEl.getBoundingClientRect().top;
    const scrollY = Math.max(0, -stageTop);

    // Fade subtle contours and depth nodes cleanly out near Stage 5 arrival so no lines or dots remain at the end
    const endQuietFactor = p > 0.86 ? Math.max(0, 1 - (p - 0.86) / 0.11) : 1;

    // Subtle parallax architectural horizon contours that glide as you scroll
    if (endQuietFactor > 0.01) {
      const contourCount = 5;
      for (let c = 0; c < contourCount; c++) {
        const baseSpacing = backdropH * 0.28;
        const parallaxScroll = (scrollY * (0.12 + c * 0.035)) % (baseSpacing * contourCount);
        const yAnchor = ((c * baseSpacing - parallaxScroll + baseSpacing * contourCount) % (baseSpacing * contourCount)) - baseSpacing * 0.5;
        const waveAmp = 18 + c * 5;
        const waveFreq = (Math.PI * 2) / Math.max(backdropW, 640);

        ctx.beginPath();
        for (let x = 0; x <= backdropW; x += 48) {
          const wy =
            yAnchor +
            Math.sin(x * waveFreq + time * 0.22 + c * 1.3 + p * 2.4) * waveAmp +
            Math.cos(x * waveFreq * 0.5 - time * 0.15) * (waveAmp * 0.4);
          if (x === 0) ctx.moveTo(x, wy);
          else ctx.lineTo(x, wy);
        }
        ctx.strokeStyle = `rgba(99, 102, 241, ${((0.035 + (c % 2) * 0.015) * endQuietFactor).toFixed(3)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    // Multi-plane parallax depth particles & subtle coordinate crosshairs
    if (endQuietFactor > 0.01) {
      DEPTH_NODES.forEach((node) => {
        const driftX = Math.sin(time * 0.35 + node.phase) * (8 + node.layer * 5);
        const px = node.xNorm * backdropW + driftX;
        const rawY = node.yBase * (backdropH + 140) - scrollY * node.parallax;
        const wrapH = backdropH + 140;
        const py = (((rawY % wrapH) + wrapH) % wrapH) - 70;

        const baseAlpha = node.layer === 0 ? 0.08 : node.layer === 1 ? 0.12 : 0.16;
        const alpha = baseAlpha * endQuietFactor;

        if (node.isCross) {
          const arm = 3.5 + node.layer * 1.2;
          ctx.strokeStyle = `rgba(79, 70, 229, ${(alpha * 0.85).toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(px - arm, py);
          ctx.lineTo(px + arm, py);
          ctx.moveTo(px, py - arm);
          ctx.lineTo(px, py + arm);
          ctx.stroke();
        } else {
          ctx.fillStyle = `rgba(100, 116, 139, ${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(px, py, node.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    }

    // Expanding architectural milestone ripples when stages reveal at 50vh
    for (let i = activeRipples.length - 1; i >= 0; i--) {
      const rip = activeRipples[i];
      rip.progress += 0.022;
      if (rip.progress >= 1) {
        activeRipples.splice(i, 1);
        continue;
      }

      const easeOut = 1 - Math.pow(1 - rip.progress, 3);
      const currentY = rip.docY - window.scrollY;
      const radius1 = 12 + easeOut * 110;
      const radius2 = 6 + easeOut * 66;
      const alpha = (1 - rip.progress) * 0.34;

      ctx.strokeStyle = `rgba(124, 58, 237, ${alpha.toFixed(3)})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(rip.x, currentY, radius1, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = `rgba(2, 132, 199, ${(alpha * 0.75).toFixed(3)})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(rip.x, currentY, radius2, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  function updateBackdropLoop() {
    if (backdropRafId) window.cancelAnimationFrame(backdropRafId);
    backdropRafId = 0;
    if (document.hidden) return;
    const rect = root.getBoundingClientRect();
    if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;

    if (prefersReducedMotion.matches) {
      drawBackdropFrame(0);
      return;
    }

    function loop(nowMs) {
      drawBackdropFrame(nowMs);
      backdropRafId = window.requestAnimationFrame(loop);
    }

    backdropRafId = window.requestAnimationFrame(loop);
  }

  // =========================================================================
  // 5. Scroll Progress & Runner Animation Loop
  // =========================================================================

  function stepRunnerLoop() {
    runnerRafId = 0;
    if (prefersReducedMotion.matches) return;

    const orbDiff = targetDrawLen - smoothDrawLen;
    if (Math.abs(orbDiff) <= 0.4) {
      smoothDrawLen = targetDrawLen;
    } else {
      smoothDrawLen += orbDiff * 0.24;
    }

    const trailDiff = smoothDrawLen - trailAnchorLen;
    if (Math.abs(trailDiff) <= 0.5) {
      trailAnchorLen = smoothDrawLen;
    } else {
      trailAnchorLen += trailDiff * 0.1;
    }

    renderOrbAndTrail();

    if (Math.abs(targetDrawLen - smoothDrawLen) > 0.4 || Math.abs(smoothDrawLen - trailAnchorLen) > 0.5) {
      runnerRafId = window.requestAnimationFrame(stepRunnerLoop);
    }
  }

  function ensureRunnerAnimating() {
    if (!runnerRafId && !prefersReducedMotion.matches) {
      runnerRafId = window.requestAnimationFrame(stepRunnerLoop);
    }
  }

  function updateScrollProgress() {
    if (!stageEl || !guidePath || pathTotalLength <= 0) return;

    const stageRect = stageEl.getBoundingClientRect();
    const viewportH = window.innerHeight || 800;
    const localScroll = Math.max(0, -stageRect.top);
    const arrivalY = waypointPositions.at(-1)?.y ?? stageEl.offsetHeight;
    const finishScroll = Math.max(1, arrivalY - viewportH * SCREEN_MID_RATIO);
    const scrollProgress = Math.min(1, localScroll / finishScroll);
    currentScrollProgress = scrollProgress;

    if (prefersReducedMotion.matches) {
      targetDrawLen = pathTotalLength;
      smoothDrawLen = pathTotalLength;
      trailAnchorLen = pathTotalLength;
      renderOrbAndTrail();
      drawBackdropFrame(0);
      updateMidScreenReveals();
      return;
    }

    const midScreenYInStage = -stageRect.top + viewportH * SCREEN_MID_RATIO;

    const startBlend = Math.min(1, localScroll / 140);
    const rawTargetY = Math.max(introRestY, introRestY + (midScreenYInStage - introRestY) * startBlend);
    const arrivalBlend = scrollProgress > 0.9 ? (scrollProgress - 0.9) / 0.1 : 0;
    const clampedY = Math.max(introRestY, Math.min(arrivalY, rawTargetY));
    const targetYInStage = clampedY + (arrivalY - clampedY) * arrivalBlend;

    const drawLen =
      scrollProgress >= 0.992
        ? pathTotalLength
        : Math.min(pathTotalLength, Math.max(0, findLengthAtY(targetYInStage)));

    targetDrawLen = drawLen;
    if (!trailInitialized) {
      if (localScroll <= 4) {
        smoothDrawLen = 0;
        trailAnchorLen = 0;
      } else {
        smoothDrawLen = drawLen;
        trailAnchorLen = drawLen;
      }
      trailInitialized = true;
    }

    updateMidScreenReveals();
    renderOrbAndTrail();

    if (Math.abs(targetDrawLen - smoothDrawLen) > 0.4 || Math.abs(smoothDrawLen - trailAnchorLen) > 0.5) {
      ensureRunnerAnimating();
    }
  }

  // =========================================================================
  // 6. Confetti Burst on Arrival
  // =========================================================================

  let confettiArmed = true;
  let confettiFrameId = 0;

  async function celebrateAfterReveal(stage) {
    if (!confettiArmed || prefersReducedMotion.matches) return;
    const headline = stage.querySelector('.golive-headline');
    const animations = headline.getAnimations();
    try {
      await Promise.all(animations.map(animation => animation.finished));
    } catch {
      return; // The reveal was interrupted.
    }
    const bounds = headline.getBoundingClientRect();
    if (visibleStage !== stage || requestedStage !== stage || !confettiArmed ||
        prefersReducedMotion.matches || bounds.bottom <= 0 || bounds.top >= window.innerHeight) return;
    confettiArmed = false;
    launchConfettiFromArrival();
  }

  function launchConfettiFromArrival() {
    const canvas = root.querySelector('#' + 'confetti-canvas');
    const arrivalNode = root.querySelector('[data-waypoint="w-golive"]');
    if (!canvas || !arrivalNode || prefersReducedMotion.matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const rect = arrivalNode.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top - canvas.getBoundingClientRect().top + rect.height / 2;

    const palette = ['#7C3AED', '#4F46E5', '#0EA5E9', '#10B981', '#F59E0B'];
    const particles = Array.from({ length: 48 }, (_, i) => {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.9;
      const speed = 3.6 + Math.random() * 6.2;
      return {
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        w: 6 + Math.random() * 5,
        h: 3 + Math.random() * 2.5,
        rot: Math.random() * Math.PI,
        vRot: (Math.random() - 0.5) * 0.22,
        color: palette[i % palette.length],
        alpha: 1,
      };
    });

    if (confettiFrameId) window.cancelAnimationFrame(confettiFrameId);

    function tick() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      let alive = 0;

      particles.forEach((p) => {
        p.vy += 0.22;
        p.vx *= 0.985;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vRot;
        p.alpha -= 0.013;

        if (p.alpha > 0.02) {
          alive++;
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.roundRect(-p.w / 2, -p.h / 2, p.w, p.h, 2);
          ctx.fill();
          ctx.restore();
        }
      });

      if (alive > 0) {
        confettiFrameId = window.requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      }
    }

    confettiFrameId = window.requestAnimationFrame(tick);
  }

  let scrollTicking = false;
  window.addEventListener(
    'scroll',
    () => {
      if (!scrollTicking) {
        scrollTicking = true;
        window.requestAnimationFrame(() => {
          updateScrollProgress();
          scrollTicking = false;
        });
      }
    },
    { passive: true }
  );

  window.addEventListener('resize', () => {
    window.requestAnimationFrame(buildJourneyPath);
  });

  if (typeof ResizeObserver !== 'undefined' && stageEl) {
    const ro = new ResizeObserver(() => {
      window.requestAnimationFrame(buildJourneyPath);
    });
    ro.observe(stageEl);
  }

  // =========================================================================
  // 8. Stage 4: Interactive Code & Client Testing Loop
  // =========================================================================

  const previewToggleBtn = root.querySelector('#' + 'preview-order-toggle');
  const dynamicCodeLine = root.querySelector('#' + 'code-dynamic-line');
  const dynamicCodeText = root.querySelector('#' + 'code-dynamic-text');
  const testingMeta = root.querySelector('#' + 'testing-stage-meta');
  const testingOutcome = root.querySelector('#' + 'testing-outcome-label');

  if (previewToggleBtn && dynamicCodeText) {
    let feedbackApplied = true;
    previewToggleBtn.addEventListener('click', () => {
      feedbackApplied = !feedbackApplied;

      if (feedbackApplied) {
        dynamicCodeText.innerHTML =
          '<span class="tok-fn">notifyClient</span>(<span class="tok-str">"Ready + team alerted"</span>);';
        if (dynamicCodeLine) dynamicCodeLine.classList.add('is-editable');
        if (testingMeta) testingMeta.textContent = 'Staging v2 · Live';
        if (testingOutcome) {
          testingOutcome.textContent = 'Updated in staging — client + lead alerted';
        }
        previewToggleBtn.textContent = 'Compare before tweak';
      } else {
        dynamicCodeText.innerHTML =
          '<span class="tok-fn">notifyClient</span>(<span class="tok-str">"Ready for kickoff"</span>);';
        if (dynamicCodeLine) dynamicCodeLine.classList.remove('is-editable');
        if (testingMeta) testingMeta.textContent = 'Staging v1 · Initial';
        if (testingOutcome) {
          testingOutcome.textContent = 'Original build — client notified only';
        }
        previewToggleBtn.textContent = 'Apply feedback to code';
      }
    });
  }


  if (document.readyState === 'complete') {
    buildJourneyPath();
  } else {
    window.addEventListener('load', buildJourneyPath);
  }
  buildJourneyPath();
  stages.forEach((stage) => { stage.inert = stage !== visibleStage; });
  root.classList.add('journey-ready');
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(updateBackdropLoop).observe(root);
  } else {
    window.addEventListener('scroll', updateBackdropLoop, { passive: true });
    updateBackdropLoop();
  }
  document.addEventListener('visibilitychange', updateBackdropLoop);
  prefersReducedMotion.addEventListener('change', () => {
    updateScrollProgress();
    updateBackdropLoop();
  });
})();
