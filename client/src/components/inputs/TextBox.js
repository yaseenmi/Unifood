import React, { Component } from "react";
import "./styles/TextBox.css";

class TextBox extends Component {
  constructor(props) {
    super(props);

    //State Object
    this.state = {

    };

    // Binding Methods
    
  }

  componentDidMount() {}

  render() {
    return (
      <div id={this.props.id} className="default-text-box-container">
        <div className="text-box-inner-container">
          <input
            id={this.props.inputId}
            onChange={this.props.onChange}
            onInput={this.props.onInput}
            onBlur={this.props.onBlur}
            className="default-text-box"
            onKeyPress={this.props.onKeyPress}
            onKeyUp={this.props.onKeyUp}
            onKeyDown={this.props.onKeyDown}
            type={this.props.type}
            placeholder={this.props.placeholder}
            spellCheck="false"
            disabled={this.props.disabled}
            value={this.props.value}
            onClick={this.props.onClick}
            autoComplete={this.props.autoComplete}
          />
        </div>
        <div id={this.props.errorId} className="text-box-error">
          <i class="fa fa-exclamation-circle"></i>
          {this.props.error}
        </div>
      </div>
    );
  }
}

export default TextBox;
