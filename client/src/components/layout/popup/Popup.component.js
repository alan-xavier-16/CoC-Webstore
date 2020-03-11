import React, { useState } from "react";
import "./Popup.styles.scss";

const Popup = ({ children }) => {
  const [popup, setPopup] = useState(true);

  const closePopup = () => {
    setPopup(!popup);
  };
  return (
    <div className={`popup ${!popup ? "hide" : ""}`}>
      <div className="popup-inner">
        <h3>{children}</h3>
        <button className="btn btn-light" onClick={closePopup}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default Popup;
