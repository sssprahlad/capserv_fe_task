import React from "react";
import "./Footer.css";
import { AiOutlineLike } from "react-icons/ai";
import { CiMail } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="shop-details part-1">
        <h6>CapServ</h6>
        <p>
          "Capserve" refers to several distinct Indian businesses, primarily
          related to financial services.
        </p>
        <div className="contact-container">
          <IoCallOutline className="social-icon" />
          <CiMail className="social-icon" />
          <AiOutlineLike className="social-icon" />
        </div>
      </div>
      <div className="shop-details part-2">
        <h6>Quick Links</h6>
        <p>Dashboard</p>
        <p>Contact</p>
        <p>Loan</p>
      </div>
      <div className="shop-details part-3">
        <h6>Help and Support</h6>
        <p>24/7 Support</p>
        <p>Help Center</p>
        <p>FAQ</p>
        <p>Contact Us</p>
      </div>
      <div className="shop-details part-4">
        <h6>Stay in the loop</h6>
        <p>Subscribe to get updates on new loan's and exclusive offers</p>
        <div className="subscribe-container">
          <input
            type="email"
            className="email-field"
            placeholder="Your email address"
          />
          <button className="sub-btn">Subscribe</button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
