import React, { Component } from "react";
import "./styles/RadioButton.css";

class RadioButton extends Component {
  constructor(props) {
    super(props);

    //State Object
    this.state = {};

    // Binding Methods
  }

  componentDidMount() {}

  render() {
    return (
      <div id={this.props.id} class="form-check radio-button-container">
        <input
          class="form-check-input radio-button"
          type="radio"
          name={this.props.groupName}
          onChange={this.props.onChange}
          onInput={this.props.onChange}
          onBlur={this.props.onBlur}
          id={this.props.controlId}
          checked={this.props.checked}
          value={this.props.value}
        />
        <label class="form-check-label" htmlFor={this.props.controlId}>
          {this.props.text}
        </label>
      </div>
    );
  }
}

export default RadioButton;
