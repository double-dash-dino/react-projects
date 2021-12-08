import "./contact-page.css";

const ContactPage = () => {
  return (
    <div className="contact-page">
      <h1>Contact me</h1>
      <div className="contact-links">
        <button className="contact-button">
          <i className="fa fa-linkedin fa-2x"></i>
        </button>
        <button className="contact-button">
          <i className="fa fa-github fa-2x"></i>
        </button>
        <button className="contact-button">
          <i className="fa fa-envelope fa-2x"></i>
        </button>
      </div>
    </div>
  );
};

export default ContactPage;
