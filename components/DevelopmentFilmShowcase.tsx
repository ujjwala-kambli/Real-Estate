'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Compass,
  Layers,
  Volume2,
  VolumeX
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { stages } from '@/lib/content';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function DevelopmentFilmShowcase() {
  const [activeStageIdx, setActiveStageIdx] = useState<number>(0);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);

  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const activeStageRef = useRef<number>(0);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const isSeekingRef = useRef<boolean>(false);

  // Play subtle sound on stage switch
  const playClickSound = () => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioClass) audioCtxRef.current = new AudioClass();
      }
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      if (ctx.state === 'suspended') ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(840, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {}
  };

  // TRUE 60FPS LIQUID-SMOOTH VIDEO WITH 2-SECOND GRACE MOMENTUM (ZERO STUTTER)
  useEffect(() => {
    if (!containerRef.current || !videoRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const video = videoRef.current;
    video.muted = true;
    video.pause();

    const videoDuration = 24.77;
    let pauseTimer: NodeJS.Timeout | null = null;
    let lastSeekTime = 0;

    const onSeeking = () => { isSeekingRef.current = true; };
    const onSeeked = () => { isSeekingRef.current = false; };

    video.addEventListener('seeking', onSeeking);
    video.addEventListener('seeked', onSeeked);

    // Initial setup: strictly paused at frame 0 on load
    if (video.readyState >= 2) {
      video.currentTime = 0;
      video.pause();
    } else {
      video.addEventListener('loadedmetadata', () => {
        video.currentTime = 0;
        video.pause();
      }, { once: true });
    }

    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=3800',
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onEnter: () => {
          video.pause();
        },
        onEnterBack: () => {
          video.pause();
        },
        onLeave: () => {
          video.pause();
        },
        onLeaveBack: () => {
          video.pause();
          video.currentTime = 0;
        },
        onUpdate: (self) => {
          const p = self.progress;
          const dur = video.duration || videoDuration;
          const targetTime = p * dur;

          // 1. Direct 0ms progress fill update
          if (progressFillRef.current) {
            progressFillRef.current.style.width = `${p * 100}%`;
          }

          // 2. Active milestone pill update
          const stageIdx = Math.min(8, Math.max(0, Math.floor(p * 9)));
          if (stageIdx !== activeStageRef.current) {
            activeStageRef.current = stageIdx;
            setActiveStageIdx(stageIdx);
          }

          const now = Date.now();
          const delta = targetTime - video.currentTime;

          // 3. User Scrolling: Start video and run buttery smooth!
          if (self.direction === 1) {
            // Forward scroll: keep video playing at 60fps hardware decoded speed
            if (video.paused) {
              video.playbackRate = 1.0;
              video.play().catch(() => {});
            }

            if (delta > 2.5) {
              // Large leap forward: catch up with rate-limited seek
              if (!isSeekingRef.current && now - lastSeekTime > 120) {
                lastSeekTime = now;
                video.currentTime = targetTime;
              }
            } else if (delta > 0.05) {
              // Accelerate seamlessly to match scroll velocity
              const targetSpeed = Math.min(2.4, 1.0 + delta * 1.5);
              if (Math.abs(video.playbackRate - targetSpeed) > 0.1) {
                video.playbackRate = targetSpeed;
              }
            }
          } else if (self.direction === -1) {
            // Reverse scroll: smoothly rewind
            video.pause();
            if (!isSeekingRef.current && now - lastSeekTime > 80) {
              lastSeekTime = now;
              video.currentTime = Math.max(0, targetTime);
            }
          }

          // 4. "LAGGECH INSTANT NAY THAMBLA PAHIJE, 2 SEC NANTR THAMBLA PAHIJE":
          // Keep playing smoothly for a full 2 SECONDS after user stops scrolling!
          // This eliminates all micro-stutters between mouse wheel notches.
          if (pauseTimer) clearTimeout(pauseTimer);
          pauseTimer = setTimeout(() => {
            // Restore natural 1.0x playback rate then pause gently after 2 full seconds
            if (video.playbackRate !== 1.0) {
              video.playbackRate = 1.0;
            }
            video.pause();
          }, 2000); // Exactly 2 seconds!
        }
      });

      return () => {
        trigger.kill();
        if (pauseTimer) clearTimeout(pauseTimer);
      };
    }, containerRef);

    return () => {
      ctx.revert();
      if (pauseTimer) clearTimeout(pauseTimer);
      video.removeEventListener('seeking', onSeeking);
      video.removeEventListener('seeked', onSeeked);
    };
  }, []);

  // Update active milestone while video is playing during the 2-second grace period
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const cur = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 24.77;
    const stageIdx = Math.min(8, Math.max(0, Math.floor((cur / dur) * 9)));
    if (stageIdx !== activeStageRef.current) {
      activeStageRef.current = stageIdx;
      setActiveStageIdx(stageIdx);
    }
  };

  // Jump to specific stage on click
  const setStage = (idx: number) => {
    activeStageRef.current = idx;
    setActiveStageIdx(idx);
    playClickSound();

    const video = videoRef.current;
    if (video) {
      const dur = video.duration || 24.77;
      video.currentTime = (idx / 9) * dur;
      video.playbackRate = 1.0;
      video.play().catch(() => {});
    }

    const trigger = ScrollTrigger.getAll().find(t => t.trigger === containerRef.current);
    if (trigger) {
      const targetProgress = idx / 8.0;
      const targetScroll = trigger.start + targetProgress * (trigger.end - trigger.start);
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  const currentStage = stages[activeStageIdx] || stages[0];

  return (
    <section className="showcase-fullscreen-root" ref={containerRef} id="construction-film">
      {/* 1. 100% PURE FULL-SCREEN 4K VIDEO (2-SECOND MOMENTUM PLAYBACK, ZERO STUTTER) */}
      <div className="showcase-fullscreen-media-stage">
        <video
          ref={videoRef}
          src="/videos/build.mp4"
          className="showcase-fullscreen-native-video"
          playsInline
          loop
          muted={!soundEnabled}
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
        />
      </div>

      {/* 2. DISCREET, CLEAN ARCHITECTURAL TELEMETRY STRIP (BELOW VIDEO AT SCREEN BOTTOM) */}
      <div className="showcase-bottom-telemetry-bar">
        {/* Left: Phase Title & Stage Name */}
        <div className="telemetry-bar-left">
          <span className="telemetry-phase-tag">
            <span className="telemetry-pulse-dot" />
            PHASE 0{currentStage.number} OF 09
          </span>
          <h3 className="telemetry-stage-title">{currentStage.title}</h3>
          <span className="telemetry-stage-subtitle">{currentStage.subtitle}</span>
        </div>

        {/* Center: 9 Stage Marker Pills + Smooth Golden Progress Track */}
        <div className="telemetry-bar-center">
          <div className="milestones-timeline-strip">
            {stages.map((stg, i) => {
              const isActive = activeStageIdx === i;
              return (
                <button
                  key={stg.number}
                  type="button"
                  className={`timeline-stage-marker ${isActive ? 'is-active' : ''}`}
                  onClick={() => setStage(i)}
                  title={`Phase 0${stg.number}: ${stg.title}`}
                >
                  <span className="marker-num">0{stg.number}</span>
                  {isActive && <span className="marker-name">{stg.title}</span>}
                </button>
              );
            })}
          </div>

          {/* Progress Indicator Line (Direct DOM Accelerated Fill) */}
          <div className="timeline-progress-line-track">
            <div
              ref={progressFillRef}
              className="timeline-progress-line-fill"
              style={{ width: '0%', transition: 'none' }}
            />
          </div>
        </div>

        {/* Right: Technical Badges & Audio Toggle */}
        <div className="telemetry-bar-right">
          <div className="telemetry-spec-chips">
            <span className="spec-chip" title="Elevation / Datum">
              <Compass size={12} className="chip-icon" />
              <span>{currentStage.telemetry.elevation}</span>
            </span>
            <span className="spec-chip" title="Structural Specification">
              <Layers size={12} className="chip-icon" />
              <span>{currentStage.telemetry.specs.split(' ')[0]}</span>
            </span>
          </div>

          <button
            type="button"
            className={`telemetry-audio-btn ${soundEnabled ? 'sound-active' : ''}`}
            onClick={() => setSoundEnabled(s => !s)}
            title={soundEnabled ? 'Mute Audio' : 'Enable Mechanical Sound'}
            aria-label="Toggle Audio"
          >
            {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>
        </div>
      </div>
    </section>
  );
}
