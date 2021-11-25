import "./NavBar.css";
import React, { useState } from "react";

const NavBar = () => {
  const [displayMenu, setDisplayMenu] = useState(false);
  const menuClickHandler = () => {
    setDisplayMenu(!displayMenu);
  };
  return (
    <div className="navigation-bar" id="navigation-bar">
      <i className="fa-solid fa-bars"></i>
      <button
        className="nav-button fa-solid fa-bars"
        id="menu-button"
        onClick={menuClickHandler}
      >
        <i className="fa-solid fa-bars"></i>
      </button>
      {displayMenu && (
        <div>
          <button className="nav-button" id="projects-button">
            Projects
          </button>
          <button className="nav-button" id="about-button">
            About
          </button>
          <button className="nav-button" id="contact-button">
            Contact
          </button>{" "}
        </div>
      )}
    </div>
  );
};

export default NavBar;
