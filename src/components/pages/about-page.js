import "./about-page.css";

const AboutPage = () => {
  return (
    <div className="about-page">
      <h1>About me</h1>
      <div className="about-sections">
        <div className="section__work">Work</div>
        <div className="section__education">Education</div>
        <div className="section__programming">Programming</div>
        <div className="section__personal-interests">Personal interests</div>
      </div>
    </div>
  );
};

export default AboutPage;
