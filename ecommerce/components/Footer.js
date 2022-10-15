import React from "react";
import { AiOutlineGithub, AiOutlineLinkedin } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="footer-container">
      <p>2022 Eliyahu's Electronics All right reserve</p>
      <p className="icons">
        <AiOutlineGithub />
        <AiOutlineLinkedin />
      </p>
    </div>
  );
};

export default Footer;
