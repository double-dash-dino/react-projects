import "./contact-page.css";

const ContactPage = () => {
  return (
    <div className="contact-page">
      <h1>Contact me</h1>
      <div className="contact-links">
        <a
          className="contact-button"
          target="_blank"
          rel="noreferrer"
          href="https://www.linkedin.com/in/lionel-de-swarte-danko-426b0b13a/"
        >
          <i className="fa fa-linkedin fa-2x"></i>
        </a>
        <a
          className="contact-button"
          target="_blank"
          rel="noreferrer"
          href="https://github.com/double-dash-dino"
        >
          <i className="fa fa-github fa-2x"></i>
        </a>
        <a
          className="contact-button"
          target="_blank"
          rel="noreferrer"
          href="mailto:lionel.dsw@gmail.com"
        >
          <i className="fa fa-envelope fa-2x"></i>
        </a>
      </div>
    </div>
  );
};

export default ContactPage;
