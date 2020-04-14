import React, { useState } from "react";
import PropTypes from "prop-types";

import "./Slider.styles.scss";

const Slider = ({ photo }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  const goToSlide = (idx) => {
    setActiveIdx(idx);
  };

  const goToPrevSlide = (e) => {
    e.preventDefault();

    let idx = activeIdx;
    let sliderLength = photo.length;

    if (idx < 1) {
      idx = sliderLength;
    }
    idx = idx - 1;

    setActiveIdx(idx);
  };

  const goToNextSlide = (e) => {
    e.preventDefault();

    let idx = activeIdx;
    let sliderLength = photo.length - 1;

    if (idx === sliderLength) {
      idx = -1;
    }
    idx = idx + 1;

    setActiveIdx(idx);
  };

  return (
    <div className="slider">
      <div className="slides">
        {photo.map((slide, idx) => (
          <img
            key={`photo-${idx}`}
            src={`/uploads/${photo[idx]}`}
            alt={`product`}
            className={`slide ${idx === activeIdx && "active"}`}
          />
        ))}
      </div>

      <div className="slider-actions">
        <button className="btn btn-gold" onClick={goToPrevSlide}>
          <i className="fas fa-angle-left"></i>
        </button>
        <button className="btn btn-gold" onClick={goToNextSlide}>
          <i className="fas fa-angle-right"></i>
        </button>
      </div>

      <div className="slider-indicators">
        {photo.map((slide, idx) => (
          <button
            key={`slider-indicator-${idx}`}
            className={`slider-indicator ${idx === activeIdx && "active"}`}
            onClick={(e) => goToSlide(idx)}
          ></button>
        ))}
      </div>
    </div>
  );
};

Slider.propTypes = {
  photo: PropTypes.array.isRequired,
};

export default Slider;
