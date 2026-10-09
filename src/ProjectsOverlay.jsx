import React, { useEffect, useRef } from 'react';
import './ProjectsOverlay.css';
import placeholderImg from './assets/comp draw.png';

const projects = [
  {
    title: "Phai-music",
    image: "/projects/phai_music.png",
    url: "https://phai-music-app.vercel.app/"
  },
  {
    title: "Demo-Paynet",
    image: "/projects/demo_paynet.png",
    url: "https://wallet-online.vercel.app/"
  },
  {
    title: "MuseWiki",
    image: "/projects/muse_wiki.png",
    url: "https://musewiki.vercel.app/"
  },
  {
    title: "Akademnashr",
    image: "/projects/akademnashr.png",
    url: "https://akademnashr-o8k3.vercel.app/"
  },
  {
    title: "Stopwatch",
    image: "/projects/stopwatch.png",
    url: "https://stop-watch-pearl-delta.vercel.app/"
  },
  {
    title: "Bookpoint",
    image: "/projects/bookpoint.png",
    url: "https://bookpoint-indol.vercel.app/"
  },
  {
    title: "Project 7",
    image: placeholderImg,
    url: "#"
  },
  {
    title: "Project 8",
    image: placeholderImg,
    url: "#"
  },
  {
    title: "Project 9",
    image: placeholderImg,
    url: "#"
  },
  {
    title: "Project 10",
    image: placeholderImg,
    url: "#"
  }
];

export default function ProjectsOverlay({ onClose }) {
  const overlayRef = useRef(null);
  const cameraRef = useRef(null);
  const carouselRef = useRef(null);

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
      
      let cameraZ = -1500;
      let cameraY = 400;
      let cameraRotX = -20;
      let carouselRotY = 0;

      const phase1Boundary = 0.15;
      
      if (currentProgress < phase1Boundary) {
        // move camera in
        const p1 = currentProgress / phase1Boundary; 
        const easeP1 = p1 * p1 * (3 - 2 * p1); // smooth step
        cameraZ = -1500 + (900 * easeP1); // Zoom in to -600
        cameraY = 400 - (400 * easeP1);
        cameraRotX = -20 + (20 * easeP1);
        carouselRotY = 0;
      } else {
        // phase 2: rotate carousel
        cameraZ = -600; // Keep camera pulled back further so the card fits on screen
        cameraY = 0;
        cameraRotX = 0;
        
        const p2 = (currentProgress - phase1Boundary) / (1 - phase1Boundary);
        carouselRotY = -(p2 * 324);
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
        if (idx === active) {
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

  return (
    <div className="overlay-wrapper">
      <div className="overlay-box" ref={overlayRef}>
        <div className="scene-sticky">
          <button className="home-btn" onClick={onClose}>HOME</button>
          <div className="scene-container">
            <div className="camera" ref={cameraRef}>
              <div className="carousel" ref={carouselRef}>
                {projects.map((proj, i) => {
                  const angle = i * 36;
                  const tz = 1100; // radius of the circle
                  return (
                    <div 
                      key={i} 
                      className="project-card" 
                      style={{ transform: `rotateY(${angle}deg) translateZ(${tz}px)` }}
                    >
                      <div className="card-content">
                        <img src={proj.image} alt={proj.title} className="project-img" />
                        <div className="project-info">
                          <h2>{proj.title}</h2>
                          <a href={proj.url} target="_blank" rel="noopener noreferrer" className="glass-btn">
                            Visit this project
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
