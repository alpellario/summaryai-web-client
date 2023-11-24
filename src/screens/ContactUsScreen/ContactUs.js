import React from "react";

import "./ContactUs.css";

const ContactUs = () => {
  return (
    <div className="container">
      <div className="content contentContactUs">
        <span className="contactUsTitle">Contact Us</span>
        <textarea
          placeholder="We are glad to hear your opinions"
          className="contactUsInput"
        />
        <button>SUBMIT</button>
      </div>
    </div>
  );
};

export default ContactUs;
