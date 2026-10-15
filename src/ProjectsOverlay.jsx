import React, { useEffect, useRef, useState } from 'react';
import './ProjectsOverlay.css';

// Import all 10 project images from src/proj
import img1 from './proj/phaimusic 1.png';
import img2 from './proj/solarsystem 2.png';
import img3 from './proj/stopwatch 3.png';
import img4 from './proj/wallet 4.png';
import img5 from './proj/musewiki 5.png';
import img6 from './proj/adminpanel 6.png';
import img7 from './proj/cookpal 7.png';
import img8 from './proj/bookpint 8.png';
import img9 from './proj/angelfaces 9.png';
import img10 from './proj/akademnashr 10.png';

const projects = [
  {
    title: "Phai Music",
    image: img1,
    url: "https://phai-music-app.vercel.app"
  },
  {
    title: "Solar System",
    image: img2,
    url: "https://solarsystem-xi-jet.vercel.app/"
  },
  {
    title: "Stopwatch",
    image: img3,
    url: "https://stopwatch-psi-woad.vercel.app/"
  },
  {
    title: "Online Wallet",
    image: img4,
    url: "https://wallet-online.vercel.app"
  },
  {
    title: "MuseWiki",
    image: img5,
    url: "https://musewiki.vercel.app/"
  },
  {
    title: "Admin Panel",
    image: img6,
    url: "https://admin-panel-woad-two.vercel.app"
  },
  {
    title: "Cookpal",
    image: img7,
    url: "https://cookapall.vercel.app/"
  },
  {
    title: "Bookpoint",
    image: img8,
    url: "https://bookpoint-cpvp.vercel.app/web/index.html"
  },
  {
    title: "Angel Faces",
    image: img9,
    url: "https://angel-faces-five.vercel.app/"
  },
  {
    title: "Akademnashr",
    image: img10,
    url: "https://akademnashr-oyhh.vercel.app/"
  }
];

export default function ProjectsOverlay({ onClose }) {
  const overlayRef = useRef(null);
  const cameraRef = useRef(null);
  const carouselRef = useRef(null);
  const topOverlayRef = useRef(null);

  useEffect(() => {
    let currentProgress = 0;
    let targetProgress = 0;
    let animationFrameId;

    const handleScroll = () => {
      if (!overlayRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = overlayRef.current;
      const maxScroll = scrollHeight - clientHeight;
      targetProgress = maxScroll > 0 ? scrollTop / maxScroll : 0;
    };

    if (overlayRef.current) {
      overlayRef.current.addEventListener('scroll', handleScroll);
    }

    const render = () => {
      currentProgress += (targetProgress - currentProgress) * 0.06;
      
      // Initial top-down camera view (looking down into the circular installation from overhead)
      let cameraZ = -2100;
      let cameraY = 120;
      let cameraRotX = -76;
      let carouselRotY = 0;

      const phase1Boundary = 0.15;
      
      if (currentProgress < phase1Boundary) {
        // Phase 1: Descend from top-down overhead view to front eye-level view
        const p1 = currentProgress / phase1Boundary; 
        const easeP1 = p1 * p1 * (3 - 2 * p1); // smoothstep easing
        
        cameraZ = -2100 + (1500 * easeP1); // Zoom from -2100 to -600
        cameraY = 120 - (120 * easeP1);    // 120 down to 0px
        cameraRotX = -76 + (76 * easeP1);  // -76deg up to 0deg
        carouselRotY = 0;

        // Button in middle fades out as camera approaches first project
        if (topOverlayRef.current) {
          topOverlayRef.current.style.opacity = `${Math.max(0, 1 - p1 * 1.5)}`;
          topOverlayRef.current.style.pointerEvents = p1 > 0.35 ? 'none' : 'auto';
        }
      } else {
        // Phase 2: Carousel rotates through the 10 projects (original mechanics preserved)
        cameraZ = -600;
        cameraY = 0;
        cameraRotX = 0;
        
        const p2 = (currentProgress - phase1Boundary) / (1 - phase1Boundary);
        carouselRotY = -(p2 * 324);

        if (topOverlayRef.current) {
          topOverlayRef.current.style.opacity = '0';
          topOverlayRef.current.style.pointerEvents = 'none';
        }
      }
      
      if (cameraRef.current) {
        cameraRef.current.style.transform = `translate3d(0, ${cameraY}px, ${cameraZ}px) rotateX(${cameraRotX}deg)`;
      }
      
      if (carouselRef.current) {
        carouselRef.current.style.transform = `rotateY(${carouselRotY}deg)`;
      }

      const anglePerItem = 36;
      let active = Math.round(Math.abs(carouselRotY) / anglePerItem);
      if (active < 0) active = 0;
      if (active > 9) active = 9;
      
      const cards = document.querySelectorAll('.project-card');
      cards.forEach((card, idx) => {
        if (currentProgress >= phase1Boundary && idx === active) {
          card.classList.add('active');
        } else {
          card.classList.remove('active');
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };
    
    render();

    return () => {
      if (overlayRef.current) overlayRef.current.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleScrollToExplore = () => {
    if (!overlayRef.current) return;
    const { scrollHeight, clientHeight } = overlayRef.current;
    const maxScroll = scrollHeight - clientHeight;
    overlayRef.current.scrollTo({
      top: maxScroll * 0.16,
      behavior: 'smooth'
    });
  };

  return (
    <div className="overlay-wrapper">
      <div className="overlay-box" ref={overlayRef}>
        <div className="scene-sticky">
          <button className="home-btn" onClick={onClose}>HOME</button>

          {/* Top-down initial prompt overlay matching reference */}
          <div className="top-view-overlay" ref={topOverlayRef}>
            <button className="scroll-explore-pill" onClick={handleScrollToExplore}>
              <span>Scroll to start exploring</span>
              <span className="scroll-arrow">↓</span>
            </button>
          </div>

          <div className="scene-container">
            <div className="camera" ref={cameraRef}>
              <div className="carousel" ref={carouselRef}>
                {projects.map((proj, i) => {
                  const angle = i * 36;
                  const tz = 1100; // Radius of circular arrangement
                  return (
                    <div 
                      key={i} 
                      className="project-card" 
                      style={{ transform: `rotateY(${angle}deg) translateZ(${tz}px)` }}
                    >
                      {/* Realistic soft light cast onto surrounding darkness */}
                      <div className="screen-floor-cast" aria-hidden="true"></div>
                      <div className="screen-light-spill" aria-hidden="true"></div>

                      <div className="card-content">
                        <img src={proj.image} alt={proj.title} className="project-img" />
                        <div className="project-info">
                          <h2>{proj.title}</h2>
                          <a 
                            href={proj.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="glass-btn"
                          >
                            Visit this project ↗
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-spacer"></div>
      </div>
    </div>
  );
}
