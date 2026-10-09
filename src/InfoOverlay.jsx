import React from 'react';
import './InfoOverlay.css';

export default function InfoOverlay({ title, children, onClose }) {
  return (
    <div className="info-overlay-wrapper" onClick={onClose}>
      <div className="info-overlay-box sketchy-window" onClick={(e) => e.stopPropagation()}>
        <div className="sketchy-window-header">
          <div className="window-title">
            <span className="window-icon">🗂️</span>
            {title}
          </div>
          <div className="window-controls">
            <span className="window-control-btn">_</span>
            <span className="window-control-btn">□</span>
            <span className="window-control-btn close-btn" onClick={onClose}>✕</span>
          </div>
        </div>
        <div className="info-overlay-content">
          <div className="info-body">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
