import React, { useState, useEffect, useRef } from "react";
import script from "./prompts";
import "./Popups.css";

const ScrollingText = ({ speed }) => {
  const [position, setPosition] = useState(0);
  const contentRef = useRef(null);
  const animationRef = useRef();

  useEffect(() => {
    const animate = () => {
      const contentHeight = contentRef.current
        ? contentRef.current.offsetHeight
        : 0;

      setPosition((prev) => {
        if (prev < -contentHeight) return 0;
        return prev - speed;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [speed]);

  return (
    <div
      ref={contentRef}
      className="popups_fullscreen_background_text_animation"
      style={{ transform: `translateY(${position}px)` }}
    >
      {script()}
    </div>
  );
};

export default ScrollingText;
