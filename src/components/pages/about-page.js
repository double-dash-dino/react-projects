import "./about-page.css";
import React, { useState } from "react";

const AboutPage = () => {
  const [toUnfurl, setToUnfurl] = useState([]);

  const unfurlHandler = (smt) => {
    if (toUnfurl.includes(smt.target.id)) {
      setToUnfurl((toUnfurl) => {
        return toUnfurl.filter((item) => item !== smt.target.id);
      });
    } else {
      setToUnfurl((toUnfurl) => {
        return [smt.target.id, ...toUnfurl];
      });
    }
  };

  return (
    <div className="about-page">
      <h1>About me</h1>
      <div className="about-sections">
        <div className="section__work">
          <div
            className="section__work__title"
            id="work-section"
            onClick={unfurlHandler}
          >
            Work
          </div>
          {toUnfurl.includes("work-section") && (
            <div className="section__work__body">
              Lorem ipsum sic dolor amet
            </div>
          )}
        </div>
        <div className="section__education">
          <div
            className="section__education__title"
            id="education-section"
            onClick={unfurlHandler}
          >
            Education
          </div>
          {toUnfurl.includes("education-section") && (
            <div className="section__education__body">
              Lorem ipsum sic dolor amet
            </div>
          )}
        </div>
        <div className="section__programming">
          <div
            className="section__programming__title"
            id="programming-section"
            onClick={unfurlHandler}
          >
            Programming
          </div>
          {toUnfurl.includes("programming-section") && (
            <div className="section__programming__body">
              Lorem ipsum sic dolor amet
            </div>
          )}
        </div>
        <div className="section__personal-interests">
          <div
            className="section__personal-interests__title"
            id="personal-interests-section"
            onClick={unfurlHandler}
          >
            Personal interests
          </div>
          {toUnfurl.includes("personal-interests-section") && (
            <div className="section__personal-interests__body">
              Lorem ipsum sic dolor amet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
