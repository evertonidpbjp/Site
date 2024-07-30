// src/components/Animation.js
"use client"
// src/components/Animation.js
import React, { useEffect, useRef, useState } from 'react';
import './animation.css'; // Certifique-se de criar este arquivo CSS

const Animation = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref.current); // Stop observing after the element is visible
        }
      },
      { threshold: 0.1 } // Adjust as needed
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`animation-container ${isVisible ? 'animate' : ''}`}
    >
      {children}
    </div>
  );
};

export default Animation;
