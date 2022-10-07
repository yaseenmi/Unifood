import React, { Component } from "react";
import "./styles/Footer.css";
import DarkLogo from "../../assets/vectors/DarkLogo.svg";
import FooterLink from "../links/FooterLink";

class Footer extends Component {
  constructor(props) {
    super(props);
    // Refs
    this.ref = React.createRef();

    // State Object
    this.state = {};

    // Binding Methods
  }

  render() {
    return (
      <footer
        id="footer-container"
        style={this.props.style}
        className={this.props.className}
      >
        <div id="footer-container-inner">
          <div id="footer-logo-container">
            <img src={DarkLogo} />
            <p>All Rights Reserved &copy;</p>
          </div>
          <div className="footer-seperator"></div>
          <div id="footer-get-in-touch-container">
            <h4>Get In Touch</h4>
            <p>
              Email&nbsp;
              <span>
                <FooterLink
                  text="unifood@gmail.com"
                  to="mailto:Unifood@gmail.com?subject=Subject&body=Message"
                />
              </span>
            </p>
            <p>
              Phone&nbsp;
              <span>
                <FooterLink text="+963 40 322 106" to="tel:+963 40 322 106" />
              </span>
            </p>
            <p>
              Social&nbsp;
              <div id="footer-social">
                <a href="#">
                  <i className="fa fa-facebook-square"></i>
                </a>
                <a href="#">
                  <i className="fa fa-twitter-square"></i>
                </a>
                <a href="#">
                  <i className="fa fa-linkedin-square"></i>
                </a>
              </div>
            </p>
          </div>
          <div className="footer-seperator"></div>
          <div id="footer-where-we-are-container">
            <h4>Where We Are</h4>
            <p>
              Address <span>670 Hillhaven Drive</span>
            </p>
          </div>
          <div className="footer-seperator"></div>
          <div id="footer-menu-container">
            <h4>Menu</h4>
            <div>
              <FooterLink text=".&nbsp;Home" to="/" />
              <FooterLink text=".&nbsp;Services" to="/services" />
              <FooterLink text=".&nbsp;About Unifood" to="/about" />
              <FooterLink text=".&nbsp;Need Help" to="/help" />
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
