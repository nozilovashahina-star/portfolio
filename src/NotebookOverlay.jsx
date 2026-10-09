import React, { useState } from 'react';
import './NotebookOverlay.css';

const NotebookOverlay = ({ pagesData, onClose }) => {
  const [activeLeaf, setActiveLeaf] = useState(0);

  const handleNext = (e) => {
    e.stopPropagation();
    if (activeLeaf < 2) {
      setActiveLeaf(activeLeaf + 1);
    }
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if (activeLeaf > 0) {
      setActiveLeaf(activeLeaf - 1);
    }
  };

  return (
    <div className="notebook-backdrop" onClick={onClose}>
      <div className="notebook-wrapper" onClick={(e) => e.stopPropagation()}>
        <button className="notebook-close-btn" onClick={onClose}>×</button>
        
        <div className="notebook-container">
          
          <div className="binder-rings">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="ring">
                <div className="ring-left"></div>
                <div className="ring-right"></div>
              </div>
            ))}
          </div>

          {/* Left cover (fixed) */}
          <div className="notebook-cover cover-left"></div>
          {/* Right cover (fixed) */}
          <div className="notebook-cover cover-right"></div>

          {/* Leaf 1 */}
          <div 
            className={`leaf leaf-1 ${activeLeaf >= 1 ? 'flipped' : ''}`} 
            style={{ zIndex: activeLeaf >= 1 ? 1 : 2 }}
          >
            <div className="page front" onClick={handleNext}>
              {pagesData[0] || <EmptyPage />}
            </div>
            <div className="page back" onClick={handlePrev}>
              {pagesData[1] || <EmptyPage />}
            </div>
          </div>

          {/* Leaf 2 */}
          <div 
            className={`leaf leaf-2 ${activeLeaf >= 2 ? 'flipped' : ''}`} 
            style={{ zIndex: activeLeaf >= 2 ? 2 : 1 }}
          >
            <div className="page front" onClick={handleNext}>
              {pagesData[2] || <EmptyPage />}
            </div>
            <div className="page back" onClick={handlePrev}>
              {pagesData[3] || <EmptyPage />}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

const EmptyPage = () => (
  <div className="empty-page-content">
    <div className="cute-graphics">
      <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🌸</div>
      <p style={{ fontFamily: 'cursive', color: '#6874a9', fontSize: '1.5rem' }}>Good things take time</p>
    </div>
  </div>
);

export default NotebookOverlay;
