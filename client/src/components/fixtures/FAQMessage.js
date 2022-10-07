import React, { Component } from "react";
import "./styles/FAQMessage.css";

class FAQMessage extends Component {
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
      <div
        className={`faq-message-container faq-message-container-${this.props.type}`}
        id={this.props.id}
        ref={this.rootRef}
        onClick={this.props.onClick}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        onMouseOver={this.props.onMouseOver}
        style={this.props.style}
      >
        <div className={`faq-message faq-message-${this.props.type}`}>
          {this.props.message}
        </div>
      </div>
    );
  }
}

export default FAQMessage;
