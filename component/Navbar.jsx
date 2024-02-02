"use client"
import React, { useState, useEffect } from 'react';

function ChangingTextColor() {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const colors = ['text-white','text-primary', 'text-warning', 'text-info'];
  const text = "The Music of Love Is Flowing Here, Enjoy ...";

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 788);
    };
    
    handleResize();
    
    window.addEventListener('resize', handleResize);
   
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [colors.length]);

  return (
    <nav className={`navbar ${isSmallScreen ? 'bg-light' : 'bg-body-dark'}`}>
      <div className="container-fluid d-flex justify-content-center pt-3 bg-dark">
        <a className="navbar-brand" href="#">
          <h1 className={` ${colors[currentColorIndex]}  ${isSmallScreen ? 'fs-6' : 'fs-1'}`}>{text}</h1>
        </a>
      </div>
    </nav>
  );
}

export default ChangingTextColor;