import React, { useRef, useState, useCallback } from 'react';
import './InfoOverlay.css';

const WINDOW_W = Math.min(760, window.innerWidth * 0.9);

export default function InfoOverlay({ title, children, onClose }) {
  const [pos, setPos] = useState({
    x: (window.innerWidth  - WINDOW_W) / 2,
    y: Math.max(40, (window.innerHeight - 500) / 2),
  });

  const dragging  = useRef(false);
  const dragStart = useRef({ mx: 0, my: 0, wx: 0, wy: 0 });

  const handleTitleMouseDown = useCallback((e) => {
    if (e.button !== 0) return;
    e.preventDefault();
    dragging.current = true;
    dragStart.current = { mx: e.clientX, my: e.clientY, wx: pos.x, wy: pos.y };

    const onMove = (e) => {
      if (!dragging.current) return;
      setPos({
        x: dragStart.current.wx + (e.clientX - dragStart.current.mx),
        y: dragStart.current.wy + (e.clientY - dragStart.current.my),
      });
    };
    const onUp = () => {
      dragging.current = false;
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup',   onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup',   onUp);
  }, [pos]);

  return (
    <div className="info-overlay-wrapper" onClick={onClose}>
      <div
        className="info-overlay-box"
        style={{ left: pos.x, top: pos.y, width: WINDOW_W }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow blobs */}
        <div className="glow-blob blob-1" />
        <div className="glow-blob blob-2" />

        {/* Title bar */}
        <div className="iow-header" onMouseDown={handleTitleMouseDown} title="Drag to move">
          <div className="iow-traffic-lights">
            <button className="traffic-light tl-close" onClick={onClose} title="Close" />
            <button className="traffic-light tl-min"   title="Minimise" />
            <button className="traffic-light tl-max"   title="Maximise" />
          </div>
          <span className="iow-title">{title}</span>
          {/* X close button right side */}
          <button className="iow-close-btn" onClick={onClose} title="Close">✕</button>
        </div>

        {/* Content */}
        <div className="iow-content">
          {children}
        </div>
      </div>
    </div>
  );
}
