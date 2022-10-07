import React, { Component } from "react";
import "./styles/HeaderMenuLink.css";

class HeaderMenuLink extends Component {
  constructor(props) {
    super(props);

    //Refs
    this.ref = React.createRef();

    // State Object
    this.state = {
      activeStyle: {},
    };

    // Bindings Methods
  }
  componentDidMount()
  {
      if (this.props.isActive === "true")
      {
          this.ref.current.setAttribute("id", "header-menu-link-active");
      }
      else
      {
          this.ref.current.removeAttribute("id");
      }
  }
  UNSAFE_componentWillReceiveProps(newPro)
  {
    if (newPro.isActive === "true") {
      this.ref.current.setAttribute("id", "header-menu-link-active");
    } else {
      this.ref.current.removeAttribute("id");
    }
  }
  render() {
    return (
      <a ref={this.ref} id={this.props.id} onClick={this.props.onClick} className="header-menu-link" href={this.props.to}>
        <i className={this.props.iconClass}></i>
        <span>{this.props.text}</span>
      </a>
    );
  }
}

export default HeaderMenuLink;
