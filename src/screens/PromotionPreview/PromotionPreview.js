import React, { useState, useRef } from "react";
import "./PromotionPreview.css";
import { AiOutlineSearch } from "react-icons/ai";

const PromotionPreview = () => {
  const [animate, setAnimate] = useState(false);
  const inputRef = useRef(null);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setAnimate(true);
      if (inputRef.current) inputRef.current.blur();
    }
  };

  return (
    <div className="add-container">
      <div className={`add-search-container ${animate ? "animate" : ""}`}>
        <AiOutlineSearch
          className={`add-search-icon ${animate ? "animate" : ""}`}
        />
        <input
          type="text"
          className="add-search-input"
          placeholder=""
          onKeyDown={handleKeyPress}
          ref={inputRef}
        />
      </div>
    </div>
  );
};

export default PromotionPreview;
