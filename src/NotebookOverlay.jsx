import React, { useRef, useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import './NotebookOverlay.css';
import page1 from './assets/page 1.png';
import page2 from './assets/page 2.png';
import page3 from './assets/page 3.png';
import page4 from './assets/page 4.png';
import page5 from './assets/page 5.png'; 
import videoFile from './assets/toro dance.mp4';

const Page = React.forwardRef((props, ref) => {
  return (
    <div className="page" ref={ref}>
      <div className="page-content">
        {props.children}
      </div>
    </div>
  );
});

const NotebookOverlay = ({ onClose, initialPage = 0 }) => {
  const bookRef = useRef();
  const videoRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    if (videoRef.current) {
      if (currentPage === 4) {
        videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
      } else {
        videoRef.current.pause();
      }
    }
  }, [currentPage]);

  const handleNext = () => {
    if (currentPage >= 4) {
      onClose();
    } else {
      if (bookRef.current) {
        bookRef.current.pageFlip().flipNext();
      }
    }
  };

  const handlePrev = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipPrev();
    }
  };

  const onPage = (e) => {
    setCurrentPage(e.data);
  };

  const toggleVideo = (e) => {
    // Prevent the click from bubbling up if it interferes with anything
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <div className="notebook-backdrop" onClick={onClose}>
      <div className="notebook-wrapper" onClick={(e) => e.stopPropagation()}>
        <button className="notebook-close-btn" onClick={onClose}>×</button>
        
        <button className="nav-btn nav-btn-left" onClick={handlePrev}>
          &#10094;
        </button>
        
        <button className="nav-btn nav-btn-right" onClick={handleNext}>
          &#10095;
        </button>

        <HTMLFlipBook 
          width={450} 
          height={600} 
          size="fixed"
          minWidth={450}
          maxWidth={450}
          minHeight={600}
          maxHeight={600}
          maxShadowOpacity={0.5}
          showCover={true}
          usePortrait={true}
          useMouseEvents={false}
          mobileScrollSupport={true}
          startPage={initialPage}
          onFlip={onPage}
          className="flip-book"
          ref={bookRef}
        >
          <Page>
            <img src={page1} alt="Page 1" className="page-image" />
          </Page>
          
          <Page>
            <img src={page2} alt="Page 2" className="page-image" />
          </Page>
          
          <Page>
            <img src={page3} alt="Page 3" className="page-image" />
          </Page>
          
          <Page>
            <img src={page4} alt="Page 4" className="page-image" />
          </Page>
          
          <Page>
            <div className="page-with-video">
              <img src={page5} alt="Page 5" className="page-image" />
              <div className="video-container">
                <video 
                  ref={videoRef}
                  className="embedded-video" 
                  onClick={toggleVideo}
                  style={{ cursor: 'pointer' }}
                >
                  <source height="300px" src={videoFile} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </Page>

          <Page>
             <div className="back-cover"></div>
          </Page>
        </HTMLFlipBook>
      </div>
    </div>
  );
};

export default NotebookOverlay;
