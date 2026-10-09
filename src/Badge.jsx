import React, { useState, useEffect, useRef } from 'react';
import './Badge.css';

const Badge = ({ src, className }) => {
  const containerRef = useRef(null);
  const badgeWrapperRef = useRef(null);
  const pathRef = useRef(null);
  const frameRef = useRef(null);

  const state = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    badgeStartX: 0,
    badgeStartY: 0,
    pointerId: null,
    width: 0,
    anchorY: -100 // fallback
  });

  useEffect(() => {
    // Calculate anchor position
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      let offsetTop = 0;
      let el = containerRef.current;
      while (el) {
        offsetTop += el.offsetTop;
        el = el.offsetParent;
      }
      state.current.anchorY = -offsetTop;
      
      // We need to wait for the image to load to get its width, 
      // or we can use the rect width if it's already rendered.
      // But image might not be fully loaded. Let's set a resize observer or just use rect.
      const updateWidth = () => {
        if (containerRef.current) {
           state.current.width = containerRef.current.getBoundingClientRect().width;
           renderFrame();
        }
      };
      updateWidth();
      // Optional: window resize listener
      window.addEventListener('resize', updateWidth);
      
      // Delay an update to ensure image width is captured after load
      setTimeout(updateWidth, 100);
      setTimeout(updateWidth, 500);
      
      return () => {
        window.removeEventListener('resize', updateWidth);
        if (frameRef.current) {
          cancelAnimationFrame(frameRef.current);
        }
      };
    }
  }, []);

  const handlePointerDown = (e) => {
    const s = state.current;
    if (s.isDragging) return;
    
    // Only allow left mouse button for mouse events
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    
    // e.preventDefault() can prevent native drag/select on some browsers
    if (e.cancelable) {
      // e.preventDefault(); // Sometimes causes issues with pointer capture, let's rely on onDragStart
    }
    
    e.target.setPointerCapture(e.pointerId);
    
    s.isDragging = true;
    s.pointerId = e.pointerId;
    s.dragStartX = e.clientX;
    s.dragStartY = e.clientY;
    s.badgeStartX = s.x;
    s.badgeStartY = s.y;
    s.vx = 0;
    s.vy = 0;
    
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }
    frameRef.current = requestAnimationFrame(updatePhysics);
    
    if (badgeWrapperRef.current) {
      badgeWrapperRef.current.style.cursor = 'grabbing';
      badgeWrapperRef.current.style.transition = 'none';
    }
  };

  const handlePointerMove = (e) => {
    const s = state.current;
    if (!s.isDragging || e.pointerId !== s.pointerId) return;
    
    const dx = e.clientX - s.dragStartX;
    const dy = e.clientY - s.dragStartY;
    
    let nextX = s.badgeStartX + dx;
    let nextY = s.badgeStartY + dy;
    
    // Bounds clamping to prevent dragging completely out of viewport
    if (containerRef.current) {
       const rect = containerRef.current.getBoundingClientRect();
       const maxLeft = -rect.left + 50; // Keep at least 50px visible on left
       const maxRight = window.innerWidth - rect.left - rect.width + 50; // At least 50px on right
       const maxUp = -rect.top + 50; // At least 50px from top
       const maxDown = window.innerHeight - rect.top - rect.height + 50; // At least 50px from bottom
       
       if (nextX < maxLeft) nextX = maxLeft;
       if (nextX > maxRight) nextX = maxRight;
       if (nextY < maxUp) nextY = maxUp;
       if (nextY > maxDown) nextY = maxDown;
    }
    
    s.x = nextX;
    s.y = nextY;
  };

  const handlePointerUp = (e) => {
    const s = state.current;
    if (!s.isDragging || e.pointerId !== s.pointerId) return;
    
    s.isDragging = false;
    s.pointerId = null;
    
    if (badgeWrapperRef.current) {
      badgeWrapperRef.current.style.cursor = 'grab';
    }
  };

  const generateCoilPath = (sx, sy, ex, ey) => {
    const dx = ex - sx;
    const dy = ey - sy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    if (dist < 1) return `M ${sx} ${sy} L ${ex} ${ey}`;
    
    const ux = dx / dist;
    const uy = dy / dist;
    const nx = -uy;
    const ny = ux;
    
    const coils = Math.max(5, Math.floor(dist / 15)); // dynamic number of coils based on stretch
    const steps = coils * 16;
    const radiusX = 8; // width of coil
    const radiusY = 5; // overlap factor
    
    let path = `M ${sx} ${sy} `;
    
    // Starting straight segment
    const startStraight = 10;
    const endStraight = 15;
    
    path += `L ${sx + ux * startStraight} ${sy + uy * startStraight} `;
    
    const coilStartDist = startStraight;
    const coilEndDist = dist - endStraight;
    const coilLength = coilEndDist - coilStartDist;
    
    if (coilLength > 0) {
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const progress = coilStartDist + t * coilLength;
        const theta = t * coils * Math.PI * 2;
        
        const perpOffset = Math.sin(theta) * radiusX;
        const alongOffset = Math.cos(theta) * radiusY;
        
        const px = sx + (progress + alongOffset) * ux + perpOffset * nx;
        const py = sy + (progress + alongOffset) * uy + perpOffset * ny;
        
        path += `L ${px} ${py} `;
      }
    }
    
    path += `L ${ex} ${ey}`;
    return path;
  };

  const updatePhysics = () => {
    const s = state.current;
    
    if (!s.isDragging) {
      // Spring force toward (0,0)
      const k = 0.05; // Stiffness
      const damping = 0.82; // Damping (friction)
      
      const fx = -k * s.x;
      const fy = -k * s.y;
      
      s.vx += fx;
      s.vy += fy;
      
      s.vx *= damping;
      s.vy *= damping;
      
      s.x += s.vx;
      s.y += s.vy;
      
      // Stop condition
      if (Math.abs(s.vx) < 0.01 && Math.abs(s.vy) < 0.01 && Math.abs(s.x) < 0.01 && Math.abs(s.y) < 0.01) {
        s.x = 0;
        s.y = 0;
        s.vx = 0;
        s.vy = 0;
      } else {
        frameRef.current = requestAnimationFrame(updatePhysics);
      }
    } else {
      // Keep loop alive while dragging to render
      frameRef.current = requestAnimationFrame(updatePhysics);
    }
    
    renderFrame();
  };

  const renderFrame = () => {
    const s = state.current;
    
    // Tilt based on x displacement and velocity
    const tilt = (s.x * 0.03) + (s.vx * 0.3);
    
    if (badgeWrapperRef.current) {
      // Transform origin at top center to swing naturally
      badgeWrapperRef.current.style.transformOrigin = 'top center';
      badgeWrapperRef.current.style.transform = `translate(${s.x}px, ${s.y}px) rotate(${tilt}deg)`;
    }
    
    if (pathRef.current) {
      const anchorX = s.width ? s.width / 2 : 100; // fallback width 200/2
      const anchorY = s.anchorY;
      
      const badgeAttachX = anchorX + s.x;
      const badgeAttachY = s.y; // top of the badge
      
      const pathData = generateCoilPath(anchorX, anchorY, badgeAttachX, badgeAttachY);
      pathRef.current.setAttribute('d', pathData);
    }
  };

  return (
    <div className={className} ref={containerRef}>
      <svg 
        className="badge-spring-svg"
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '1px', 
          height: '1px', 
          overflow: 'visible', 
          pointerEvents: 'none', 
          zIndex: -1 
        }}
      >
        <defs>
          <linearGradient id="blueberry-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#281A54" />
            <stop offset="30%" stopColor="#483D8B" />
            <stop offset="70%" stopColor="#6A5ACD" />
            <stop offset="100%" stopColor="#281A54" />
          </linearGradient>
          <filter id="shadow">
            <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.4" />
          </filter>
        </defs>
        
        {/* Attachment clip at the top anchor */}
        <circle 
          cx={state.current.width ? state.current.width / 2 : 100} 
          cy={state.current.anchorY} 
          r="12" 
          fill="url(#blueberry-grad)" 
          filter="url(#shadow)"
        />
        <circle 
          cx={state.current.width ? state.current.width / 2 : 100} 
          cy={state.current.anchorY} 
          r="4" 
          fill="#111" 
        />
        
        <path 
          ref={pathRef}
          fill="none" 
          stroke="url(#blueberry-grad)" 
          strokeWidth="6" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          filter="url(#shadow)"
        />
      </svg>

      <div 
        ref={badgeWrapperRef}
        className="badge-interactive-wrapper"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onDragStart={(e) => e.preventDefault()}
        style={{ touchAction: 'none', cursor: 'grab', position: 'relative', userSelect: 'none' }}
      >
        <img draggable="false" height="400" src={src} alt="ID Badge" style={{ pointerEvents: 'none', userSelect: 'none' }} />
        
        {/* Badge attachment clip overlay */}
        <div className="badge-clip" style={{
          position: 'absolute',
          top: '-15px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '30px',
          height: '25px',
          backgroundColor: '#483D8B',
          borderRadius: '4px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.4)',
          zIndex: 2,
          backgroundImage: 'linear-gradient(to bottom, #6A5ACD, #281A54)',
          border: '1px solid #222'
        }}>
          <div style={{
            position: 'absolute',
            top: '5px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '14px',
            height: '4px',
            backgroundColor: '#111',
            borderRadius: '2px'
          }}></div>
        </div>
      </div>
    </div>
  );
};

export default Badge;
