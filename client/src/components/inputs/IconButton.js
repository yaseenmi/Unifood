import React, { Component } from "react";
import "./styles/IconButton.css";
import $ from "jquery";
import Tooltip from "../tooltips/Tooltip";

class IconButton extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.ref = React.createRef();

    // State Object
    this.state = {
      tooltip: null,
    };

    //Bindings Methods
  }

  componentWillMount() {
    if (this.props.tooltip !== undefined && this.props.tooltip !== "") {
      this.setState({ tooltip: <Tooltip text={this.props.tooltip} /> });
    } else {
      this.setState({ tooltip: null });
    }
  }

  UNSAFE_componentWillReceiveProps(newPro) {
    if (newPro.tooltip !== undefined && newPro.tooltip !== "") {
      this.setState({ tooltip: <Tooltip text={newPro.tooltip} /> });
    } else {
      this.setState({ tooltip: null });
    }
  }
  render() {
    return (
      <button
        ref={this.ref}
        className="icon-btn"
        id={this.props.id}
        style={this.props.style}
        onClick={this.props.onClick}
        disabled={this.props.disabled}
      >
        {this.props.count === undefined ? null : this.props.count ===
          null ? null : (
          <p className="icon-btn-label">{this.props.count}</p>
        )}
        <i className={this.props.iconClass} style={this.props.iconStyle}></i>
        {this.state.tooltip}
      </button>
    );
  }
}
export default IconButton;
