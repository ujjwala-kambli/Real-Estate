'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import {
  ArrowDown,
  ArrowUpRight,
  Play,
  Pause,
  Compass,
  Layers,
  HardHat,
  Eye,
  SlidersHorizontal,
  CheckCircle2,
  Volume2,
  VolumeX,
  Sparkles,
  Maximize2
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { stages, ConstructionStage } from '@/lib/content';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollStory() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [activeStage, setActiveStage] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);
  const [loadPercent, setLoadPercent] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasVideoFile, setHasVideoFile] = useState<boolean>(false);
  const [renderMode, setRenderMode] = useState<'canvas' | 'video'>('canvas');
  const [showTelemetry, setShowTelemetry] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [transitioning, setTransitioning] = useState<boolean>(false);
  const [watermarkStage, setWatermarkStage] = useState<ConstructionStage>(stages[0]);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentProgressRef = useRef<number>(0);
  const targetProgressRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);
  const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastActiveStageRef = useRef<number>(0);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Discrete luxury mechanical/optical click using Web Audio API
  const playHapticSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioContextClass) {
          audioCtxRef.current = new AudioContextClass();
        }
      }
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(160, ctx.currentTime + 0.035);
      gain.gain.setValueAtTime(0.045, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.035);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.035);
    } catch {
      // Audio not permitted without direct user gesture
    }
  }, [soundEnabled]);

  // Check if real video exists in public/videos
  useEffect(() => {
    fetch('/videos/construction-master.mp4', { method: 'HEAD' })
      .then(res => {
        if (res.ok && res.headers.get('content-type')?.includes('video')) {
          setHasVideoFile(true);
        }
      })
      .catch(() => {
        setHasVideoFile(false);
      });
  }, []);

  // Preload all 9 stage images into memory
  useEffect(() => {
    let loadedCount = 0;
    const total = stages.length;
    const loadedImages: HTMLImageElement[] = [];

    stages.forEach((stage, index) => {
      const img = new Image();
      img.src = stage.image;
      img.crossOrigin = 'anonymous';

      const handleLoad = () => {
        loadedCount += 1;
        setLoadPercent(Math.round((loadedCount / total) * 100));
        if (loadedCount === total) {
          imagesRef.current = loadedImages;
          setImagesLoaded(true);
        }
      };

      const handleError = () => {
        loadedCount += 1;
        setLoadPercent(Math.round((loadedCount / total) * 100));
        if (loadedCount === total) {
          imagesRef.current = loadedImages;
          setImagesLoaded(true);
        }
      };

      img.onload = handleLoad;
      img.onerror = handleError;
      loadedImages[index] = img;
    });
  }, []);

  // Canvas draw logic: Plateau-Glide with Architectural Laser Scanline & Shutter Exposure Bloom
  const renderCanvas = useCallback(
    (progress: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) return;

      const images = imagesRef.current;
      if (!images || images.length === 0) return;

      const width = canvas.width;
      const height = canvas.height;

      // Clamped stage position (0 to stages.length - 1)
      const maxIndex = stages.length - 1;
      const floatIndex = Math.max(0, Math.min(maxIndex, progress * maxIndex));
      const baseIndex = Math.floor(floatIndex);
      const nextIndex = Math.min(maxIndex, baseIndex + 1);
      const rawBlend = floatIndex - baseIndex;

      // PLATEAU-GLIDE CURVE:
      // Keep current stage 100% crisp & solid for rawBlend < 0.45.
      // Transition dynamically during rawBlend from 0.45 to 1.00.
      let transitionT = 0;
      if (rawBlend > 0.42 && baseIndex < maxIndex) {
        const norm = (rawBlend - 0.42) / 0.58;
        // Quintic smoothstep (3t^2 - 2t^3)
        transitionT = norm * norm * norm * (norm * (norm * 6 - 15) + 10);
      }

      const currentImg = images[baseIndex];
      const nextImg = images[nextIndex];

      const drawCover = (img: HTMLImageElement, alpha: number, scaleMultiplier = 1) => {
        if (!img || !img.complete || img.naturalWidth === 0) return;

        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = width / height;
        let drawWidth = width;
        let drawHeight = height;
        let offsetX = 0;
        let offsetY = 0;

        if (canvasRatio > imgRatio) {
          drawWidth = width * scaleMultiplier;
          drawHeight = (width / imgRatio) * scaleMultiplier;
          offsetX = (width - drawWidth) / 2;
          offsetY = (height - drawHeight) / 2;
        } else {
          drawHeight = height * scaleMultiplier;
          drawWidth = height * imgRatio * scaleMultiplier;
          offsetX = (width - drawWidth) / 2;
          offsetY = (height - drawHeight) / 2;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        ctx.restore();
      };

      ctx.fillStyle = '#081016';
      ctx.fillRect(0, 0, width, height);

      // Camera forward push-in (subtle breathing 1.0 to 1.03)
      const currentScale = 1.0 + rawBlend * 0.032;
      const nextScale = 1.032 - transitionT * 0.032;

      // 1. Draw base frame at full opacity
      drawCover(currentImg, 1.0, currentScale);

      // 2. Draw next frame when transitioning past plateau threshold
      if (transitionT > 0.001 && nextImg && nextImg !== currentImg) {
        drawCover(nextImg, transitionT, nextScale);

        // 3. Architectural Laser Scanline Curtain & Exposure Bloom
        const shutterPulse = Math.sin(transitionT * Math.PI);
        if (shutterPulse > 0.03) {
          ctx.save();
          // Exposure Bloom
          ctx.globalCompositeOperation = 'screen';
          ctx.fillStyle = `rgba(223, 202, 168, ${shutterPulse * 0.18})`;
          ctx.fillRect(0, 0, width, height);

          // Glowing laser scanline traveling vertically down as next stage builds
          const scanY = height * transitionT;
          const beamGrad = ctx.createLinearGradient(0, scanY - 36, 0, scanY + 36);
          beamGrad.addColorStop(0, 'rgba(223, 202, 168, 0)');
          beamGrad.addColorStop(0.5, `rgba(255, 235, 200, ${shutterPulse * 0.65})`);
          beamGrad.addColorStop(1, 'rgba(223, 202, 168, 0)');
          ctx.fillStyle = beamGrad;
          ctx.fillRect(0, scanY - 36, width, 72);

          // Intense core beam
          ctx.strokeStyle = `rgba(255, 255, 255, ${shutterPulse * 0.9})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(0, scanY);
          ctx.lineTo(width, scanY);
          ctx.stroke();
          ctx.restore();
        }
      }

      // 4. Subtle Vignette
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, 'rgba(8, 16, 22, 0.42)');
      gradient.addColorStop(0.25, 'rgba(8, 16, 22, 0.04)');
      gradient.addColorStop(0.7, 'rgba(8, 16, 22, 0.18)');
      gradient.addColorStop(1, 'rgba(8, 16, 22, 0.86)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // 5. Left shade gradient for card legibility
      const leftGrad = ctx.createLinearGradient(0, 0, width * 0.58, 0);
      leftGrad.addColorStop(0, 'rgba(8, 16, 22, 0.74)');
      leftGrad.addColorStop(1, 'rgba(8, 16, 22, 0)');
      ctx.fillStyle = leftGrad;
      ctx.fillRect(0, 0, width, height);
    },
    []
  );

  // Resize canvas to window dimensions with Retina scaling
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      renderCanvas(targetProgressRef.current);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [renderCanvas, imagesLoaded]);

  // Animation frame loop for buttery smooth lerp scrubbing
  useEffect(() => {
    const loop = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0001) {
        currentProgressRef.current += diff * 0.14;
        renderCanvas(currentProgressRef.current);

        if (renderMode === 'video' && videoRef.current && videoRef.current.duration) {
          videoRef.current.currentTime = currentProgressRef.current * videoRef.current.duration;
        }
      }
      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [renderCanvas, renderMode]);

  // GSAP ScrollTrigger Setup (calibrated to 4600px for responsive, tactile scrolling)
  useEffect(() => {
    if (!rootRef.current || !pinRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: rootRef.current,
        start: 'top top',
        end: '+=4600',
        pin: pinRef.current,
        pinSpacing: true,
        scrub: 0.5,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: self => {
          const p = Math.max(0, Math.min(1, self.progress));
          targetProgressRef.current = p;
          setScrollProgress(p);

          const maxIndex = stages.length - 1;
          const floatIdx = p * maxIndex;
          const baseIdx = Math.floor(floatIdx);
          const rawB = floatIdx - baseIdx;

          // Switch active stage when past threshold (0.50 of segment)
          const targetIndex = rawB >= 0.5 ? Math.min(maxIndex, baseIdx + 1) : baseIdx;

          if (targetIndex !== lastActiveStageRef.current) {
            lastActiveStageRef.current = targetIndex;
            setActiveStage(targetIndex);
            setWatermarkStage(stages[targetIndex]);
            setTransitioning(true);
            playHapticSound();
            setTimeout(() => setTransitioning(false), 800);
          }
        }
      });

      return () => trigger.kill();
    }, rootRef);

    return () => ctx.revert();
  }, [playHapticSound]);

  const jumpToStage = (index: number) => {
    if (!rootRef.current) return;
    const trigger = ScrollTrigger.getAll().find(t => t.trigger === rootRef.current);
    if (trigger) {
      const targetP = index / (stages.length - 1);
      const scrollPos = trigger.start + targetP * (trigger.end - trigger.start);
      window.scrollTo({ top: scrollPos, behavior: 'smooth' });
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      if (autoPlayIntervalRef.current) clearInterval(autoPlayIntervalRef.current);
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      const trigger = ScrollTrigger.getAll().find(t => t.trigger === rootRef.current);
      if (!trigger) return;

      autoPlayIntervalRef.current = setInterval(() => {
        const nextProgress = targetProgressRef.current + 0.0045;
        if (nextProgress >= 1) {
          if (autoPlayIntervalRef.current) clearInterval(autoPlayIntervalRef.current);
          setIsPlaying(false);
        } else {
          const scrollPos = trigger.start + nextProgress * (trigger.end - trigger.start);
          window.scrollTo({ top: scrollPos, behavior: 'auto' });
        }
      }, 30);
    }
  };

  useEffect(() => {
    return () => {
      if (autoPlayIntervalRef.current) clearInterval(autoPlayIntervalRef.current);
    };
  }, []);

  const currentStage = stages[activeStage] || stages[0];
  const liveElevation = Math.round(240 + scrollProgress * 50);

  return (
    <section ref={rootRef} className="construction-film-section" id="construction-film">
      <div ref={pinRef} className="film-viewport">
        {/* Loading Overlay */}
        {!imagesLoaded && (
          <div className="film-loader" aria-live="polite">
            <div className="loader-inner">
              <span className="loader-badge">AUREVIA CINEMATIC ARCHITECTURE</span>
              <h3>INITIALIZING CONSTRUCTION TIMELINE</h3>
              <div className="loader-bar-track">
                <div className="loader-bar-fill" style={{ width: `${loadPercent}%` }} />
              </div>
              <div className="loader-meta">
                <span>PRELOADING MASTER FRAMES</span>
                <span>{loadPercent}% COMPLETE</span>
              </div>
            </div>
          </div>
        )}

        {/* Media Render Engine */}
        <div className="film-media-layer" aria-hidden="true">
          <canvas
            ref={canvasRef}
            className={`film-canvas ${renderMode === 'canvas' ? 'is-active' : ''}`}
          />

          {hasVideoFile && (
            <video
              ref={videoRef}
              src="/videos/construction-master.mp4"
              playsInline
              muted
              preload="auto"
              className={`film-video ${renderMode === 'video' ? 'is-active' : ''}`}
            />
          )}

          {/* Center Stage Shift Holographic Indicator */}
          <div className={`center-stage-watermark ${transitioning ? 'is-visible' : ''}`}>
            <div className="watermark-halo" />
            <span className="watermark-tag">MILESTONE UNLOCKED · STAGE {watermarkStage.number} / 09</span>
            <h3>{watermarkStage.telemetry.phase} // {watermarkStage.title.toUpperCase()}</h3>
            <span className="watermark-elev">{liveElevation}M ELEVATION ATTAINED</span>
          </div>
        </div>

        {/* Film Header Bar HUD */}
        <div className="film-header-hud container-wide">
          <div className="hud-left">
            <span className="live-rec-dot" />
            <span className="hud-label">SCROLL FILM SCRUBBER</span>
            <span className="hud-divider">|</span>
            <span className="hud-mode-pill">
              {renderMode === 'canvas' ? '4K SEQUENTIAL MASTER' : 'NATIVE MP4 STREAM'}
            </span>
          </div>

          <div className="hud-center">
            <span className="hud-chapter">
              PHASE {currentStage.number} OF 09 — {currentStage.title.toUpperCase()}
            </span>
          </div>

          <div className="hud-right">
            {/* Audio Feedback Toggle */}
            <button
              type="button"
              className={`hud-audio-toggle ${soundEnabled ? 'is-active' : ''}`}
              onClick={() => {
                setSoundEnabled(prev => !prev);
                if (!soundEnabled) {
                  playHapticSound();
                }
              }}
              title="Toggle tactile mechanical click on milestone unlock"
              aria-label="Toggle haptic audio"
            >
              {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
              <span>{soundEnabled ? 'SFX: ON' : 'SFX: OFF'}</span>
            </button>

            {hasVideoFile && (
              <button
                type="button"
                className="hud-engine-toggle"
                onClick={() => setRenderMode(m => (m === 'canvas' ? 'video' : 'canvas'))}
                title="Switch between Canvas Sequence and MP4 Video stream"
              >
                <SlidersHorizontal size={13} />
                <span>{renderMode === 'canvas' ? 'USE VIDEO MP4' : 'USE CANVAS'}</span>
              </button>
            )}

            <button
              type="button"
              className="hud-telemetry-toggle"
              onClick={() => setShowTelemetry(v => !v)}
              aria-label="Toggle technical telemetry HUD"
            >
              <Eye size={13} />
              <span>{showTelemetry ? 'HIDE SPECS' : 'SHOW SPECS'}</span>
            </button>
          </div>
        </div>

        {/* Floating Story Card with Rounded Container & Staggered Reveal */}
        <div className="film-story-panel-wrap container-wide">
          <article
            key={currentStage.number}
            className={`film-story-card ${transitioning ? 'card-animating' : ''}`}
          >
            {/* Card Progress Strip */}
            <div className="card-mini-progress">
              <div
                className="card-mini-progress-fill"
                style={{ width: `${((activeStage + 1) / stages.length) * 100}%` }}
              />
            </div>

            <div className="card-topline">
              <span className="card-phase-tag">{currentStage.telemetry.phase}</span>
              <span className="card-counter">
                <strong>{currentStage.number}</strong>
                <span> / 09</span>
              </span>
            </div>

            <div className="card-content-body">
              <span className="card-subtitle">{currentStage.subtitle}</span>
              <h2 className="card-heading">{currentStage.title}</h2>
              <p className="card-lead">{currentStage.short}</p>
              <p className="card-description">{currentStage.description}</p>
            </div>

            {/* Stage Technical Specs HUD */}
            {showTelemetry && (
              <div className="card-telemetry-box">
                <div className="telemetry-item">
                  <span className="telemetry-label">
                    <Compass size={12} /> ELEVATION / LEVEL
                  </span>
                  <span className="telemetry-val">
                    <strong>{liveElevation}m</strong> Above Sea Level
                  </span>
                </div>
                <div className="telemetry-item">
                  <span className="telemetry-label">
                    <HardHat size={12} /> EQUIPMENT ACTIVE
                  </span>
                  <span className="telemetry-val">{currentStage.telemetry.equipment}</span>
                </div>
                <div className="telemetry-item">
                  <span className="telemetry-label">
                    <Layers size={12} /> STRUCTURAL SPEC
                  </span>
                  <span className="telemetry-val">{currentStage.telemetry.specs}</span>
                </div>
              </div>
            )}

            <div className="card-footer">
              <span className="card-visual-note">
                <CheckCircle2 size={12} /> Coherent Architectural Timeline · Identical Vantage Point
              </span>
            </div>
          </article>
        </div>

        {/* Bottom Timeline Control Bar */}
        <div className="film-control-bar container-wide">
          <div className="control-left">
            <button
              type="button"
              className={`film-play-btn ${isPlaying ? 'is-playing' : ''}`}
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause timelapse' : 'Play continuous timelapse'}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              <span>{isPlaying ? 'PAUSE FILM' : 'PLAY TIMELAPSE'}</span>
            </button>
            <span className="film-timecode">
              TC 00:0{activeStage + 1}:{Math.floor(scrollProgress * 60)
                .toString()
                .padStart(2, '0')}:12
            </span>
          </div>

          <div className="control-center">
            <div
              className="scrub-timeline"
              role="slider"
              aria-label="Construction timeline scrub progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(scrollProgress * 100)}
            >
              <div className="scrub-track">
                <div className="scrub-fill" style={{ width: `${scrollProgress * 100}%` }} />
                <div className="scrub-thumb" style={{ left: `${scrollProgress * 100}%` }} />
              </div>

              <div className="scrub-stages-pills">
                {stages.map((stage, idx) => {
                  const isCurrent = activeStage === idx;
                  const isPassed = activeStage >= idx;
                  return (
                    <button
                      key={stage.number}
                      type="button"
                      className={`stage-pill ${isCurrent ? 'is-current' : ''} ${
                        isPassed ? 'is-passed' : ''
                      }`}
                      onClick={() => jumpToStage(idx)}
                      title={`Jump to Stage ${stage.number}: ${stage.title}`}
                    >
                      <span className="pill-dot" />
                      <span className="pill-label">{stage.number}</span>
                      <span className="pill-name">{stage.title.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="control-right">
            <div className="scroll-direct-hint">
              <ArrowDown size={13} className="bob-anim" />
              <span>SCROLL TO ADVANCE / REVERSE</span>
            </div>
            <Link href="/development" className="film-details-link">
              <span>Technical Dossier</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
