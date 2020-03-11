import React from "react";
import "./Footer.styles.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <h3 className="footer-header">Contact</h3>
      <ul className="footer-contact">
        <li className="contact-facebook">
          <a
            className="btn btn-info"
            href="https://www.facebook.com/CirclesOfConsciousness/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook"></i> Facebook
          </a>
        </li>
        <li className="contact-whatsapp btn">
          <i className="fab fa-whatsapp"></i> +1 (868) 689-6404
        </li>
        <li className="contact-address btn">
          <i className="fas fa-map-marked-alt"></i> #38 Carlos Street Woodbrook
          Trinidad and Tobago
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
