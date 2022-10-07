import React, { Component } from "react";
import CircleLoader from "../loaders/CircleLoader";
import "./styles/DefaultButton.css";

class DefaultButton extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.ref = React.createRef();

    //State Object
    this.state = {
      class: "default-fill-btn",
      innerClass: "",
    };
  }

  componentDidUpdate() {}
  componentDidMount() {
    let currentClass = "default-fill-btn";
    let innerClass = "";
    // Button Types
    if (this.props.type === "outline") {
      currentClass = "default-outline-btn";
    } else if (this.props.type === "fill") {
      currentClass = "default-fill-btn";
    }
    // Button Sizes
    if (this.props.size === "xsmall") {
      currentClass += " xsmall";
      innerClass = " xsmall";
    } else if (this.props.size === "small") {
      currentClass += " small";
      innerClass = " small";
    } else if (this.props.size === "medium") {
      currentClass += " medium";
      innerClass = " medium";
    } else if (this.props.size === "large") {
      currentClass += " large";
      innerClass = " large";
    } else if (this.props.size === "xlarge") {
      currentClass += " xlarge";
      innerClass = " xlarge";
    }
    currentClass += " " + this.props.className;
    this.setState({ class: currentClass });
    this.setState({ innerClass: innerClass });
    if (this.props.bg) {
      this.ref.current.style.backgroundColor = this.props.bg;
      this.ref.current.style.borderColor = this.props.bg;
    }
  }
  componentWillReceiveProps(newPro) {
    if (newPro.bg) {
      this.ref.current.style.backgroundColor = newPro.bg;
      this.ref.current.style.borderColor = newPro.bg;
    }
  }

  render() {
    return (
      <button
        id={this.props.id}
        className={this.state.class}
        style={this.props.style}
        onClick={this.props.onClick}
        disabled={this.props.loader ? true : this.props.disabled}
        type={this.props.inputType}
        onMouseUp={this.props.onMouseUp}
        onMouseDown={this.props.onMouseDown}
        ref={this.ref}
      >
        {this.props.loader ? (
          <CircleLoader
            color={
              this.props.type === "outline"
                ? "var(--secondry-text-color)"
                : "var(--text-cr)"
            }
            size="small"
            isActive="true"
          />
        ) : (
          <div className={this.state.innerClass}>
            {this.props.text} <i className={this.props.iconClass}></i>
          </div>
        )}
      </button>
    );
  }
}

export default DefaultButton;
