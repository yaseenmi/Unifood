import React, { Component } from "react";
import "./styles/TabLink.css";

class TabLink extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.rootRef = React.createRef();

    // State Object
    this.state = {};

    // Binding Methods
  }
  componentDidMount() {}
  componentDidUpdate() {}
  UNSAFE_componentWillReceiveProps(newPro) {}
  render() {
    return (
      <a
        className={`tab-link-container ${this.props.isActive ? "tab-link-active" : ""}`}
        id={this.props.id}
        ref={this.rootRef}
        onClick={this.props.onClick}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        onMouseOver={this.props.onMouseOver}
        style={this.props.style}
        href={this.props.to}
      >{this.props.iconClass ? <i className={this.props.iconClass}></i> : null}{this.props.text}</a>
    );
  }
}

export default TabLink;
