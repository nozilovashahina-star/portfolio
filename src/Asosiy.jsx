import React, { useState } from 'react'
import Idcard from './assets/id.png'
import comp from './assets/comp draw.png'
import folder from './assets/folder.png'
import skill from './assets/skill.png'
import frames from './assets/frames.png'
import comment from './assets/comment.png'
import comment2 from './assets/comment 2.png'
import background from './assets/paper background.jpg'
import phone from './assets/phone.png'
import Badge from './Badge'
import ProjectsOverlay from './ProjectsOverlay'
import InfoOverlay from './InfoOverlay'
import './Asosiy.css'


const Asosiy = () => {
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isCommentHovered, setIsCommentHovered] = useState(false);

  return (
    <div>
        <Badge className="idcard" src={Idcard} />

        <img  className="background" width="100%" src={background} alt="" />

        <img 
          className="computer" 
          height="500" 
          src={comp} 
          alt="" 
          onClick={() => setIsProjectsOpen(true)}
        />

        <img 
          className="folder" 
          height="380" 
          src={folder} 
          alt="" 
          onClick={() => setIsAboutOpen(true)}
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
          onClick={() => setIsSkillsOpen(true)}
          style={{ cursor: 'pointer' }}
        />

        {isProjectsOpen && <ProjectsOverlay onClose={() => setIsProjectsOpen(false)} />}
        
        {isAboutOpen && (
          <InfoOverlay title="About Me" onClose={() => setIsAboutOpen(false)}>
            <div className="about-me-content">
              <span className="deco-star" style={{ top: '-10px', right: '10%' }}>☆</span>
              <p>Hi, my name is <span className="highlight">Shahina Xayriddinova</span>!</p>
              <p>I was born on <span className="highlight">26-09-2009</span>. I'm currently studying at school and also mastering web development at the <span className="highlight">ITLive academy</span>.</p>
              <p>I have a huge passion for creating interactive, beautiful, and user-friendly web experiences. Every project I build is an opportunity to learn something new and push my creative boundaries!</p>
            </div>
          </InfoOverlay>
        )}

        {isSkillsOpen && (
          <InfoOverlay title="My Skills" onClose={() => setIsSkillsOpen(false)}>
            <div className="skills-layout">
              <div className="skills-left">
                <div className="skill-row">
                  <div className="skill-icon" style={{ borderRadius: '4px', fontSize: '1rem' }}>HTML</div>
                  <div className="skill-bar-container"><div className="skill-bar-fill" style={{ width: '95%' }}></div></div>
                  <div className="skill-percent">95%</div>
                </div>
                <div className="skill-row">
                  <div className="skill-icon" style={{ borderRadius: '4px', fontSize: '1rem' }}>CSS</div>
                  <div className="skill-bar-container"><div className="skill-bar-fill" style={{ width: '90%' }}></div></div>
                  <div className="skill-percent">90%</div>
                </div>
                <div className="skill-row">
                  <div className="skill-icon" style={{ borderRadius: '4px', fontSize: '1rem' }}>JS</div>
                  <div className="skill-bar-container"><div className="skill-bar-fill" style={{ width: '85%' }}></div></div>
                  <div className="skill-percent">85%</div>
                </div>
                <div className="skill-row">
                  <div className="skill-icon" style={{ borderRadius: '4px' }}>⚛️</div>
                  <div className="skill-bar-container"><div className="skill-bar-fill" style={{ width: '80%' }}></div></div>
                  <div className="skill-percent">80%</div>
                </div>
                <div className="skill-row">
                  <div className="skill-icon" style={{ borderRadius: '4px' }}>🐍</div>
                  <div className="skill-bar-container"><div className="skill-bar-fill" style={{ width: '70%' }}></div></div>
                  <div className="skill-percent">70%</div>
                </div>
                <div style={{ marginTop: '20px', fontStyle: 'italic', display: 'flex', gap: '10px' }}>
                  <span>☆</span> Always learning...
                </div>
              </div>
              
              <div className="skills-right">
                <div className="tools-title">
                  <span>&lt;/&gt;</span> Tools I use:
                </div>
                <ul className="tools-list">
                  <li>VS Code</li>
                  <li>Git & GitHub</li>
                  <li>PyCharm</li>
                  <li>Figma</li>
                </ul>
              </div>
            </div>
          </InfoOverlay>
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