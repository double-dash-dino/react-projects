import "./about-page.css";
import React, { useState } from "react";

const AboutPage = () => {
  const [toUnfurl, setToUnfurl] = useState([]);

  const workUnfurlHandler = () => {
    if (toUnfurl.includes("workSection")) {
      console.log("here");

      setToUnfurl((toUnfurl) => {
        return toUnfurl.filter((item) => item !== "workSection");
      });
    } else {
      setToUnfurl((toUnfurl) => {
        return ["workSection", ...toUnfurl];
      });
    }
  };

  return (
    <div className="about-page">
      <h1>About me</h1>
      <div className="about-sections">
        <div className="section__work">
          <div className="section__work__title" onClick={workUnfurlHandler}>
            Work
          </div>
          {toUnfurl.includes("workSection") && (
            <div className="section__work__body">
              Lorem ipsum sic dolor amet
            </div>
          )}
        </div>
        <div className="section__education">Education</div>
        <div className="section__programming">Programming</div>
        <div className="section__personal-interests">Personal interests</div>
      </div>
    </div>
  );
};

export default AboutPage;
