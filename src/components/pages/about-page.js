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
        <div className="work-section">
          <div
            className="section-title"
            id="work-section"
            onClick={unfurlHandler}
          >
            Work
          </div>
          {toUnfurl.includes("work-section") && (
            <div className="section-body">
              Bring to the table win-win survival strategies to ensure proactive
              domination. At the end of the day, going forward, a new normal
              that has evolved from generation X is on the runway heading
              towards a streamlined cloud solution. User generated content in
              real-time will have multiple touchpoints for offshoring.
            </div>
          )}
        </div>
        <div className="education-section">
          <div
            className="section-title"
            id="education-section"
            onClick={unfurlHandler}
          >
            Education
          </div>
          {toUnfurl.includes("education-section") && (
            <div className="section-body">
              Bring to the table win-win survival strategies to ensure proactive
              domination. At the end of the day, going forward, a new normal
              that has evolved from generation X is on the runway heading
              towards a streamlined cloud solution. User generated content in
              real-time will have multiple touchpoints for offshoring.
            </div>
          )}
        </div>
        <div className="programming-section">
          <div
            className="section-title"
            id="programming-section"
            onClick={unfurlHandler}
          >
            Programming
          </div>
          {toUnfurl.includes("programming-section") && (
            <div className="section-body">
              Capitalize on low hanging fruit to identify a ballpark value added
              activity to beta test. Override the digital divide with additional
              clickthroughs from DevOps. Nanotechnology immersion along the
              information highway will close the loop on focusing solely on the
              bottom line.
            </div>
          )}
        </div>
        <div className="personal-interests-section">
          <div
            className="section-title"
            id="personal-interests-section"
            onClick={unfurlHandler}
          >
            Personal interests
          </div>
          {toUnfurl.includes("personal-interests-section") && (
            <div className="section-body">
              Podcasting operational change management inside of workflows to
              establish a framework. Taking seamless key performance indicators
              offline to maximise the long tail. Keeping your eye on the ball
              while performing a deep dive on the start-up mentality to derive
              convergence on cross-platform integration.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
