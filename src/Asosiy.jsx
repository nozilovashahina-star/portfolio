import React, { useState } from 'react'
import Idcard from './assets/id.png'
import comp from './assets/comp draw.png'
import folder from './assets/folder.png'
import skill from './assets/skill.png'
import frames from './assets/frame.jpg'
import comment from './assets/comment.png'
import comment2 from './assets/comment 2.png'
import background from './assets/paper background.jpg'
import phone from './assets/phone.png'
import Badge from './Badge'
import ProjectsOverlay from './ProjectsOverlay'
import InfoOverlay from './InfoOverlay'
import NotebookOverlay from './NotebookOverlay'
import './Asosiy.css'


const Asosiy = () => {
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isCommentHovered, setIsCommentHovered] = useState(false);

  // Notebook state
  const [notebookPages, setNotebookPages] = useState(null);

  // CV state
  const [isCVOpen, setIsCVOpen] = useState(false);

  const folderPages = [
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
    null // 4th page will be empty cute graphic automatically
  ];

  const framePages = [
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
  ];

  return (
    <div>
        <div onClick={() => setIsCVOpen(true)} style={{ cursor: 'pointer' }}>
          <Badge className="idcard" src={Idcard} />
        </div>

        <img  className="background" width="100%" src={background} alt="" />

        <img 
          className="computer" 
          height="500" 
          src={comp} 
          alt="" 
          onClick={() => setIsProjectsOpen(true)}
          style={{ cursor: 'pointer' }}
        />

        <img 
          className="folder" 
          height="380" 
          src={folder} 
          alt="" 
          onClick={() => setNotebookPages(folderPages)}
          style={{ cursor: 'pointer' }}
        />

        <img 
          className="phone" 
          height="220" 
          src={phone} 
          alt="" 
          onClick={() => setIsContactOpen(true)}
          style={{ cursor: 'pointer' }}
        />

        <img className="skill" height="300" src={skill} alt="" />

        <img 
          className="comment" 
          height="200" 
          src={isCommentHovered ? comment2 : comment} 
          alt="" 
          onMouseEnter={() => setIsCommentHovered(true)}
          onMouseLeave={() => setIsCommentHovered(false)}
        />

        <img 
          className="frames" 
          height="300" 
          src={frames} 
          alt="" 
          onClick={() => setNotebookPages(framePages)}
          style={{ cursor: 'pointer' }}
        />

        {isProjectsOpen && <ProjectsOverlay onClose={() => setIsProjectsOpen(false)} />}
        
        {notebookPages && (
          <NotebookOverlay 
            pagesData={notebookPages} 
            onClose={() => setNotebookPages(null)} 
          />
        )}

        {isCVOpen && (
          <div className="notebook-backdrop" onClick={() => setIsCVOpen(false)}>
            <div className="cv-modal" onClick={e => e.stopPropagation()}>
              <button className="notebook-close-btn" onClick={() => setIsCVOpen(false)}>×</button>
              <div className="cv-content" id="cv-content-to-print">
                <h2 style={{ color: '#5b6bb4', marginBottom: '20px' }}>Curriculum Vitae</h2>
                <div style={{ background: '#fdfcfa', padding: '30px', borderRadius: '15px', border: '1px solid #e0e0e0' }}>
                  <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>Shahina Xayriddinova</h3>
                  <p style={{ color: '#666', marginBottom: '20px' }}>Junior Front-End Developer | Gulistan, Uzbekistan</p>
                  
                  <h4 style={{ borderBottom: '2px solid #b8c4f0', paddingBottom: '5px', marginBottom: '10px' }}>Profile</h4>
                  <p style={{ fontSize: '0.95rem', marginBottom: '20px' }}>Passionate about creating clean, interactive, and user-friendly websites. Combining technical skills with creativity and attention to detail.</p>
                  
                  <h4 style={{ borderBottom: '2px solid #b8c4f0', paddingBottom: '5px', marginBottom: '10px' }}>Skills</h4>
                  <p style={{ fontSize: '0.95rem', marginBottom: '20px' }}>HTML, CSS, JavaScript, React, Python</p>

                  <h4 style={{ borderBottom: '2px solid #b8c4f0', paddingBottom: '5px', marginBottom: '10px' }}>Languages</h4>
                  <p style={{ fontSize: '0.95rem', marginBottom: '20px' }}>Uzbek (Native), Russian (Advanced), English (Advanced), Japanese (Learning)</p>

                  <button 
                    data-html2canvas-ignore="true"
                    onClick={() => {
                      import('html2canvas').then(({ default: html2canvas }) => {
                        import('jspdf').then(({ default: jsPDF }) => {
                          const input = document.getElementById('cv-content-to-print');
                          html2canvas(input, { scale: 2 }).then((canvas) => {
                            const imgData = canvas.toDataURL('image/png');
                            const pdf = new jsPDF('p', 'mm', 'a4');
                            const pdfWidth = pdf.internal.pageSize.getWidth();
                            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
                            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                            pdf.save('Shahina_CV.pdf');
                          });
                        });
                      });
                    }}
                    style={{
                      background: '#5b6bb4',
                      color: 'white',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      marginTop: '10px'
                    }}
                  >
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {isContactOpen && (
          <InfoOverlay title="Let's Talk" onClose={() => setIsContactOpen(false)}>
            <div className="contact-layout">
              <span className="deco-star" style={{ top: '-10px', left: '-20px' }}>☆</span>
              
              <div className="contact-phone-illustration">
                <div className="phone-notch"></div>
                <div className="phone-avatar">👤</div>
                <div className="phone-text">
                  <h3 style={{ margin: '10px 0', color: '#3d3b73' }}>Get in touch! ♡</h3>
                  <p style={{ fontSize: '1.1rem' }}>I'm always open to new opportunities, collaborations and interesting projects.</p>
                </div>
              </div>

              <div className="contact-links-right">
                <a href="https://github.com/nozilovashahina-star" target="_blank" rel="noopener noreferrer" className="contact-item">
                  <div className="contact-icon-bubble">💻</div>
                  <div className="contact-item-text">
                    <span className="contact-platform">GitHub</span>
                    <span className="contact-handle">@nozilovashahina-star</span>
                  </div>
                </a>
                <a href="https://t.me/P_NeiKos496" target="_blank" rel="noopener noreferrer" className="contact-item">
                  <div className="contact-icon-bubble">✈️</div>
                  <div className="contact-item-text">
                    <span className="contact-platform">Telegram</span>
                    <span className="contact-handle">@P_NeiKos496</span>
                  </div>
                </a>
                <a href="mailto:nozilovashahina@gmail.com" className="contact-item">
                  <div className="contact-icon-bubble">✉️</div>
                  <div className="contact-item-text">
                    <span className="contact-platform">Email</span>
                    <span className="contact-handle">nozilovashahina@gmail.com</span>
                  </div>
                </a>
                <a href="https://www.instagram.com/neikos496_shahina/" target="_blank" rel="noopener noreferrer" className="contact-item">
                  <div className="contact-icon-bubble">📷</div>
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
  )
}

export default Asosiy