import "./NavBar.css";
import React, { useState } from "react";

const NavBar = () => {
  const [displayMenu, setDisplayMenu] = useState(false);
  const menuClickHandler = () => {
    setDisplayMenu(!displayMenu);
  };
  return (
    <div className="navigation-bar" id="navigation-bar">
      {!displayMenu && (
        <button
          className="menu-button"
          id="menu-button"
          onClick={menuClickHandler}
        >
          <i className="fa fa-bars fa-3x"></i>
        </button>
      )}
      {displayMenu && (
        <div className="opened-bar">
          <button
            className="menu-button"
            id="menu-button"
            onClick={menuClickHandler}
          >
            <i className="fa fa-bars fa-3x"></i>
          </button>
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
