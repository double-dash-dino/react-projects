import "./contact-page.css";

const ContactPage = () => {
  return (
    <div className="contact-page">
      <h1>Contact me</h1>
      <div className="contact-links">
        <button>
          <i className="fa fa-linkedin"></i>
        </button>
        <button>
          <i className="fa fa-github"></i>
        </button>
        <button>
          <i className="fa fa-envelope"></i>
        </button>
      </div>
    </div>
  );
};

export default ContactPage;
