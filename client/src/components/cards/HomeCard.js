import React, { Component } from "react";
import "./styles/HomeCard.css";
import AOS from "aos";

class HomeCard extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.rootRef = React.createRef();

    // State Object
    this.state = {};

    // Binding Methods
  }
  componentDidMount() {}
  componentDidUpdate() {
      AOS.init();
  }
  UNSAFE_componentWillReceiveProps(newPro) {}
  render() {
    return (
      <div
        className="home-card-container"
        data-aos="fade-up"
        data-aos-once="true"
        data-aos-duration="1000"
        id={this.props.id}
        ref={this.rootRef}
        onClick={this.props.onClick}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        onMouseOver={this.props.onMouseOver}
        style={this.props.style}
      >
        <i className={this.props.iconClass}></i>
        <span>{this.props.title}</span>
        <p>
          {this.props.description}
        </p>
      </div>
    );
  }
}

export default HomeCard;
