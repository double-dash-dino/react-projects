import "./NavBar.css";
import React, { useState } from "react";

const NavBar = () => {
  const [displayMenu, setDisplayMenu] = useState(false);
  const menuClickHandler = () => {
    setDisplayMenu(!displayMenu);
  };
  return (
    <div className="navigation-bar" id="navigation-bar">
      <button
        className="nav-button"
        id="menu-button"
        onClick={menuClickHandler}
      >
        Menu
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
