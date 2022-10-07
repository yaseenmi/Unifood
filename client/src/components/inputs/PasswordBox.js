import React, { Component } from "react";
import "./styles/PasswordBox.css";

class PasswordBox extends Component {
  constructor(props) {
    super(props);

    //State Object
    this.state = {
      foundError: false,
      error: {
        name: "",
        password: "",
      },
    };

    // Binding Methods
    this.togglePasswordShowing = this.togglePasswordShowing.bind(this);
  }

  togglePasswordShowing(e) {
    let iconClass = e.target.getAttribute("class");
    let newIconClass =
      iconClass === "bi bi-eye" ? "bi bi-eye-slash" : "bi bi-eye";
    e.target.setAttribute("class", newIconClass);
    let relatedInput = e.target.parentElement.parentElement.childNodes[0];
    if (newIconClass === "bi bi-eye") {
      relatedInput.setAttribute("type", "password");
    } else {
      relatedInput.setAttribute("type", "text");
    }
    relatedInput.focus();
  }
  componentDidMount() {}

  render() {
    return (
      <div id={this.props.id} className="default-password-box-container">
        <div className="password-box-inner-container">
          <input
            id={this.props.inputId}
            onChange={this.props.onChange}
            onInput={this.props.onInput}
            onBlur={this.props.onBlur}
            onKeyUp={this.props.onKeyUp}
            onKeyDown={this.props.onKeyDown}
            className="default-password-box"
            type="password"
            placeholder={this.props.placeholder}
            spellCheck="false"
          />
          <span className="toggle-password-span">
            <i onClick={this.togglePasswordShowing} class="bi bi-eye"></i>
          </span>
        </div>
        <div id={this.props.errorId} className="password-box-error">
          <i class="fa fa-exclamation-circle"></i>
          {this.props.error}
        </div>
      </div>
    );
  }
}

export default PasswordBox;
