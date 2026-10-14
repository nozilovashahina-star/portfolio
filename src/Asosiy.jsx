import React, { useState, useEffect } from 'react'
import Idcard from './assets/id.png'
import comp from './assets/comp draw.png'
import folder from './assets/folder.png'
import skill from './assets/skill.png'
import frames from './assets/frame.jpg'
import comment from './assets/comment.png'
import comment2 from './assets/comment 2.png'
import phone from './assets/phone.png'
import toroImg from './assets/toro-inoue.jpg'
import iconGithub    from './assets/icon-github.png'
import iconTelegram  from './assets/icon-telegram.png'
import iconEmail     from './assets/icon-email.png'
import iconInstagram from './assets/icon-instagram.png'
import Badge from './Badge'
import ProjectsOverlay from './ProjectsOverlay'
import InfoOverlay from './InfoOverlay'
import NotebookOverlay from './NotebookOverlay'
import './Asosiy.css'
import LoadingScreen from './LoadingScreen'


const Asosiy = () => {
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isCommentHovered, setIsCommentHovered] = useState(false);
  const [isFramesHovered, setIsFramesHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    // After 2s start fade-out, then unmount after 600ms transition
    const showTimer = setTimeout(() => setFadingOut(true), 2000);
    const hideTimer = setTimeout(() => setIsLoading(false), 2600);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  // Notebook state
  const [notebookPages, setNotebookPages] = useState(null);

  const folderPages = React.useMemo(() => [
    <div className="notebook-content">
      <h2>About Me ☆</h2>
      <p>I'm a junior <span className="highlight">front-end developer</span> from <span className="highlight">Gulistan, Uzbekistan</span>, passionate about creating clean, interactive, and user-friendly websites.</p>
      <p>I work with <span className="highlight">HTML, CSS</span> and <span className="highlight">JavaScript</span>, combining technical skills with creativity and attention to detail.</p>
      <p>Outside of coding, I enjoy <span className="highlight">drawing, music, gaming</span>, and exploring new creative ideas.</p>
      <p>My goal is to become a skilled developer and expand my knowledge of <span className="highlight">back-end development</span>.</p>
    </div>,
    <div className="notebook-content">
      <h2>Education ☆</h2>
      <p>I'm currently continuing my education while developing my programming skills.</p>
      <p>I have studied front-end development at <span className="highlight">ITLive Academy</span>, where I built a foundation in web technologies and website development.</p>
      <p>I enjoy learning through practice, experimenting with new ideas, and building personal projects to strengthen my skills.</p>
    </div>,
    <div className="notebook-content">
      <h2>Languages ☆</h2>
      <ul style={{ background: '#f0f4f8', padding: '15px 20px', borderRadius: '15px' }}>
        <li><span className="highlight">Uzbek</span> — Native</li>
        <li><span className="highlight">Russian</span> — Advanced</li>
        <li><span className="highlight">English</span> — Advanced</li>
        <li><span className="highlight">Japanese</span> — Currently learning</li>
      </ul>
      <p style={{ marginTop: '20px' }}>I enjoy learning languages because they allow me to explore different cultures, communicate with more people, and broaden my perspective.</p>
    </div>,
    null
  ], []);

  const framePages = React.useMemo(() => [
    <div className="notebook-content">
      <h2>My work Skills ♪</h2>
      <ul>
        <li>Clear HTML</li>
        <li>CSS</li>
        <li>React</li>
        <li>Python</li>
      </ul>
      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <p style={{ fontStyle: 'italic', color: '#888' }}>Always learning and exploring new technologies...</p>
      </div>
    </div>,
    null, null, null
  ], []);

  if (isLoading) {
    return <LoadingScreen fadingOut={fadingOut} />;
  }

  return (
    <div className="page-fade-in">
    <div>
      <div className="background-3d">
        <div className="bg-wall"></div>
        <div className="bg-floor"></div>
      </div>

      <Badge className="idcard" src={Idcard} />

      <img
        className="computer"
        height="500"
        src={comp}
        alt=""
        onClick={() => setIsProjectsOpen(true)}
        style={{ cursor: 'pointer' }}
      />

      <img
        className="folder hover-scale"
        height="380"
        src={folder}
        alt=""
        onClick={() => setNotebookPages(folderPages)}
        style={{ cursor: 'pointer' }}
      />

      <div className="phone">
        <img
          className="hover-scale"
          height="220"
          src={phone}
          alt=""
          onClick={() => setIsContactOpen(true)}
          style={{ cursor: 'pointer', transition: 'transform 0.3s ease-in-out' }}
        />
      </div>

      <img
        className={`skill ${isFramesHovered ? 'hovered-scale' : ''}`}
        height="300"
        src={skill}
        alt=""
      />

      <img
        className="comment"
        height="200"
        src={isCommentHovered ? comment2 : comment}
        alt=""
        onMouseEnter={() => setIsCommentHovered(true)}
        onMouseLeave={() => setIsCommentHovered(false)}
      />

      <img
        className="frames hover-scale"
        height="300"
        src={frames}
        alt=""
        onClick={() => setNotebookPages(framePages)}
        onMouseEnter={() => setIsFramesHovered(true)}
        onMouseLeave={() => setIsFramesHovered(false)}
        style={{ cursor: 'pointer' }}
      />

      {isProjectsOpen && <ProjectsOverlay onClose={() => setIsProjectsOpen(false)} />}

      {notebookPages && (
        <NotebookOverlay
          pagesData={notebookPages}
          onClose={() => setNotebookPages(null)}
          initialPage={notebookPages === folderPages ? 1 : 0}
        />
      )}

      {isContactOpen && (
        <InfoOverlay title="Let's Talk ♡" onClose={() => setIsContactOpen(false)}>
          <div className="contact-layout">

            {/* Left — Toro Inoue image */}
            <div className="contact-toro-card">
              <img src={toroImg} alt="Toro Inoue" className="toro-img" />
            </div>

            {/* Right — contact links with AI icons */}
            <div className="contact-links-right">
              <a href="https://github.com/nozilovashahina-star" target="_blank" rel="noopener noreferrer" className="contact-item">
                <div className="contact-icon-bubble">
                  <img src={iconGithub} alt="GitHub" />
                </div>
                <div className="contact-item-text">
                  <span className="contact-platform">GitHub</span>
                  <span className="contact-handle">@nozilovashahina-star</span>
                </div>
              </a>
              <a href="https://t.me/P_NeiKos496" target="_blank" rel="noopener noreferrer" className="contact-item">
                <div className="contact-icon-bubble">
                  <img src={iconTelegram} alt="Telegram" />
                </div>
                <div className="contact-item-text">
                  <span className="contact-platform">Telegram</span>
                  <span className="contact-handle">@P_NeiKos496</span>
                </div>
              </a>
              <a href="mailto:nozilovashahina@gmail.com" className="contact-item">
                <div className="contact-icon-bubble">
                  <img src={iconEmail} alt="Email" />
                </div>
                <div className="contact-item-text">
                  <span className="contact-platform">Email</span>
                  <span className="contact-handle">nozilovashahina@gmail.com</span>
                </div>
              </a>
              <a href="https://www.instagram.com/neikos496_shahina/" target="_blank" rel="noopener noreferrer" className="contact-item">
                <div className="contact-icon-bubble">
                  <img src={iconInstagram} alt="Instagram" />
                </div>
                <div className="contact-item-text">
                  <span className="contact-platform">Instagram</span>
                  <span className="contact-handle">@neikos496_shahina</span>
                </div>
              </a>
            </div>
          </div>
        </InfoOverlay>
      )}

    </div>
    </div>
  )
}

export default Asosiy