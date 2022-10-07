import React, { Component } from "react";
import "./styles/RichTextBox.css";

class RichTextBox extends Component {
  constructor(props) {
    super(props);

    //State Object
    this.state = {};

    // Binding Methods
  }

  componentDidMount() {}

  render() {
    return (
      <div
        id={this.props.id}
        className="default-rich-text-box-container"
        style={this.props.style}
      >
        <div className="rich-text-box-inner-container">
          <textarea            
            onChange={this.props.onChange}
            onInput={this.props.onChange}
            onBlur={this.props.onBlur}
            className="default-rich-text-box"
            type={this.props.type}
            placeholder={this.props.placeholder}
            spellCheck="false"
            disabled={this.props.disabled}
            style={this.props.inputStyle}
            id={this.props.inputId}
          />
        </div>
        <div id={this.props.errorId} className="rich-text-box-error">
          <i class="fa fa-exclamation-circle"></i>
          {this.props.error}
        </div>
      </div>
    );
  }
}

export default RichTextBox;
