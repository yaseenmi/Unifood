import React, { Component } from "react";
import "./styles/FooterLink.css";
import DarkLogo from "../../assets/vectors/DarkLogo.svg";

class FooterLink extends Component {
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
        <a id={this.props.id} className="footer-link" href={this.props.to} style={this.props.style}>
            {this.props.text}
        </a>
    );
  }
}

export default FooterLink;