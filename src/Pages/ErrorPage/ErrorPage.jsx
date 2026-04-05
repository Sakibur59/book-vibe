import React, { useEffect, useState } from 'react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:ital,wght@0,300;0,400;1,300&display=swap');

  :root {
    --bg: #0a0a0f;
    --surface: #111118;
    --border: #1e1e2e;
    --accent: #ff3c5c;
    --accent2: #ff8c42;
    --text: #e8e8f0;
    --muted: #4a4a6a;
    --glow: rgba(255, 60, 92, 0.15);
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  .error-root {
    font-family: 'DM Mono', monospace;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
  }

  .grid-bg {
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,60,92,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,60,92,0.04) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
  }

  .scanlines {
    position: fixed;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0,0,0,0.08) 2px,
      rgba(0,0,0,0.08) 4px
    );
    pointer-events: none;
    z-index: 1;
  }

  .vignette {
    position: fixed;
    inset: 0;
    background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.75) 100%);
    pointer-events: none;
    z-index: 1;
  }

  .container {
    position: relative;
    z-index: 2;
    max-width: 720px;
    width: 100%;
    padding: 48px 32px;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  /* TOP BAR */
  .top-bar {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 56px;
    opacity: 0;
    animation: fadeSlideDown 0.5s ease forwards 0.1s;
  }
  .dot { width: 10px; height: 10px; border-radius: 50%; }
  .dot-red { background: #ff3c5c; box-shadow: 0 0 8px #ff3c5c; }
  .dot-yellow { background: #ffb800; }
  .dot-green { background: #00d26a; }
  .top-label {
    margin-left: auto;
    font-size: 11px;
    letter-spacing: 0.2em;
    color: var(--muted);
    text-transform: uppercase;
  }

  /* CODE NUMBER */
  .code-wrapper {
    position: relative;
    margin-bottom: 24px;
    opacity: 0;
    animation: fadeSlideUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards 0.2s;
  }
  .code-bg-text {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(140px, 22vw, 240px);
    line-height: 0.85;
    color: transparent;
    -webkit-text-stroke: 1px var(--border);
    user-select: none;
    letter-spacing: -4px;
    display: block;
  }
  .code-front {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(140px, 22vw, 240px);
    line-height: 0.85;
    background: linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -4px;
    filter: drop-shadow(0 0 40px rgba(255,60,92,0.4));
  }

  /* DIVIDER */
  .divider {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 32px;
    opacity: 0;
    animation: fadeSlideUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards 0.35s;
  }
  .divider-line { flex: 1; height: 1px; background: var(--border); }
  .divider-tag {
    font-size: 10px;
    letter-spacing: 0.25em;
    color: var(--accent);
    text-transform: uppercase;
    padding: 4px 10px;
    border: 1px solid rgba(255,60,92,0.3);
    border-radius: 2px;
  }

  /* HEADING */
  .heading {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(28px, 5vw, 48px);
    letter-spacing: 0.05em;
    color: var(--text);
    line-height: 1.1;
    margin-bottom: 16px;
    opacity: 0;
    animation: fadeSlideUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards 0.45s;
  }
  .heading span { color: var(--accent); }

  /* BODY */
  .body-text {
    font-size: 13px;
    line-height: 1.8;
    color: var(--muted);
    max-width: 480px;
    margin-bottom: 48px;
    opacity: 0;
    animation: fadeSlideUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards 0.55s;
  }

  /* LOG BLOCK */
  .log-block {
    background: var(--surface);
    border: 1px solid var(--border);
    border-left: 3px solid var(--accent);
    padding: 20px 24px;
    margin-bottom: 48px;
    font-size: 11px;
    line-height: 2;
    color: var(--muted);
    opacity: 0;
    animation: fadeSlideUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards 0.65s;
  }
  .log-line { display: flex; gap: 16px; }
  .log-key { color: var(--accent2); min-width: 80px; }
  .log-val { color: var(--text); }
  .blink {
    display: inline-block;
    width: 7px; height: 13px;
    background: var(--accent);
    margin-left: 2px;
    animation: blink 1s step-end infinite;
    vertical-align: middle;
  }

  /* ACTIONS */
  .actions {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    opacity: 0;
    animation: fadeSlideUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards 0.75s;
  }
  .btn {
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 14px 28px;
    border: none;
    cursor: pointer;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s ease;
  }
  .btn-primary {
    background: var(--accent);
    color: #fff;
  }
  .btn-primary:hover {
    background: #ff5570;
    box-shadow: 0 0 24px rgba(255,60,92,0.5);
    transform: translateY(-1px);
  }
  .btn-ghost {
    background: transparent;
    color: var(--muted);
    border: 1px solid var(--border);
  }
  .btn-ghost:hover {
    border-color: var(--muted);
    color: var(--text);
    transform: translateY(-1px);
  }

  /* CORNER DECO */
  .corner {
    position: fixed;
    width: 60px; height: 60px;
    pointer-events: none;
    z-index: 2;
  }
  .corner::before, .corner::after {
    content: '';
    position: absolute;
    background: var(--accent);
    opacity: 0.5;
  }
  .corner::before { width: 100%; height: 1px; top: 0; left: 0; }
  .corner::after  { width: 1px; height: 100%; top: 0; left: 0; }
  .corner-tl { top: 24px; left: 24px; }
  .corner-br { bottom: 24px; right: 24px; transform: rotate(180deg); }

  /* NOISE OVERLAY */
  .noise {
    position: fixed;
    inset: 0;
    opacity: 0.03;
    pointer-events: none;
    z-index: 3;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    background-size: 150px;
  }

  @keyframes fadeSlideDown {
    from { opacity: 0; transform: translateY(-12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  @keyframes glitch {
    0%   { clip-path: inset(40% 0 61% 0); transform: translate(-4px, 0); }
    20%  { clip-path: inset(92% 0 1% 0);  transform: translate(4px, 0); }
    40%  { clip-path: inset(43% 0 48% 0); transform: translate(-2px, 0); }
    60%  { clip-path: inset(25% 0 58% 0); transform: translate(2px, 0); }
    80%  { clip-path: inset(54% 0 7% 0);  transform: translate(-4px, 0); }
    100% { clip-path: inset(58% 0 43% 0); transform: translate(0); }
  }
  .glitch-wrap { position: relative; }
  .glitch-wrap::before, .glitch-wrap::after {
    content: attr(data-text);
    position: absolute;
    top: 50%; left: 0;
    transform: translateY(-50%);
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(140px, 22vw, 240px);
    line-height: 0.85;
    letter-spacing: -4px;
    pointer-events: none;
  }
  .glitch-wrap::before {
    color: #0ff;
    animation: glitch 3.5s infinite linear alternate-reverse;
    opacity: 0.12;
  }
  .glitch-wrap::after {
    color: var(--accent);
    animation: glitch 2.8s infinite linear alternate;
    opacity: 0.10;
    left: 2px;
  }
`;

const ErrorPage = () => {
  const [time, setTime] = useState(new Date().toISOString());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date().toISOString()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div className="error-root">
        <div className="grid-bg" />
        <div className="scanlines" />
        <div className="vignette" />
        <div className="noise" />
        <div className="corner corner-tl" />
        <div className="corner corner-br" />

        <div className="container">
          {/* Top bar */}
          <div className="top-bar">
            <div className="dot dot-red" />
            <div className="dot dot-yellow" />
            <div className="dot dot-green" />
            <span className="top-label">system / error</span>
          </div>

          {/* Big 404 */}
          <div className="code-wrapper">
            <div className="glitch-wrap" data-text="404">
              <span className="code-bg-text">404</span>
              <span className="code-front">404</span>
            </div>
          </div>

          {/* Divider */}
          <div className="divider">
            <div className="divider-line" />
            <span className="divider-tag">KERNEL PANIC</span>
            <div className="divider-line" />
          </div>

          {/* Heading */}
          <h1 className="heading">
            Page <span>not</span> found.
          </h1>

          {/* Body */}
          <p className="body-text">
            The resource you requested has been moved, removed, or never existed.
            Double-check the URL or navigate back to a known location.
          </p>

          {/* Log */}
          <div className="log-block">
            <div className="log-line">
              <span className="log-key">STATUS</span>
              <span className="log-val">404 Not Found</span>
            </div>
            <div className="log-line">
              <span className="log-key">PATH</span>
              <span className="log-val">{typeof window !== 'undefined' ? window.location.pathname : '/unknown'}</span>
            </div>
            <div className="log-line">
              <span className="log-key">TIME</span>
              <span className="log-val">{time}<span className="blink" /></span>
            </div>
            <div className="log-line">
              <span className="log-key">CODE</span>
              <span className="log-val">ERR_RESOURCE_NOT_FOUND</span>
            </div>
          </div>

          {/* Actions */}
          <div className="actions">
            <button className="btn btn-primary" onClick={() => window.history.back()}>
              ← Go Back
            </button>
            <button className="btn btn-ghost" onClick={() => window.location.href = '/'}>
              ⌂ Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;