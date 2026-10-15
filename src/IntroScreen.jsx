import React, { useState, useEffect } from 'react'
import './IntroScreen.css'

const IntroScreen = ({ onEnterComplete }) => {
  const [isEntered, setIsEntered] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    // Trigger boxes entrance immediately after mount
    const timer = setTimeout(() => {
      setIsEntered(true)
    }, 60)
    return () => clearTimeout(timer)
  }, [])

  const handleEnterClick = () => {
    if (isExiting) return
    setIsExiting(true)

    // After exit animations complete (750ms), notify parent to unmount
    setTimeout(() => {
      if (onEnterComplete) {
        onEnterComplete()
      }
    }, 750)
  }

  return (
    <div className={`intro-screen ${isEntered ? 'is-entered' : ''} ${isExiting ? 'is-exiting' : ''}`}>
      {/* 6 separate geometric boxes forming the background layout matching the reference */}
      <div className="intro-boxes-layer" aria-hidden="true">
        {/* 1. Top-Left Box */}
        <div className="intro-box box-tl" />

        {/* 2. Top-Right Box */}
        <div className="intro-box box-tr" />

        {/* 3. Center Square / Box */}
        <div className="intro-box box-center" />

        {/* 4. Middle-Right Box */}
        <div className="intro-box box-mr" />

        {/* 5. Bottom-Left Box */}
        <div className="intro-box box-bl" />

        {/* 6. Bottom-Right Box */}
        <div className="intro-box box-br" />
      </div>

      {/* Center content: Text + Sketch Button */}
      <div className="intro-center-content">
        <div className="intro-title-wrapper">
          <h1 className="intro-name">Shahina Xayriddinova</h1>
          <p className="intro-role">Frontend developer</p>
        </div>

        <div className="intro-btn-wrapper">
          <button 
            type="button" 
            className="sketch-button"
            onClick={handleEnterClick}
          >
            <span>Enter Portfolio</span>
            <span className="sketch-btn-icon">✦</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default IntroScreen
