import React, { Component } from "react";
import "./styles/AboutTeammateCard.css";
import AOS from "aos";

class AboutTeammateCard extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.rootRef = React.createRef();

    // State Object
    this.state = {};

    // Binding Methods
  }
  componentDidMount() {
    AOS.init();
  }
  componentDidUpdate() {}
  UNSAFE_componentWillReceiveProps(newPro) {}
  render() {
    return (
      <div
        className="about-teammate-card-container"
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
        <img alt="" src={this.props.photo} />
        <div className="about-teammate-card-details">
          <label>{this.props.name}</label>
          <p>{this.props.career}</p>
        </div>
        <div className="about-teammate-card-social">
          <a href={this.props.instagram}>
            <i className="bi bi-instagram"></i>
          </a>
          <a href={this.props.twitter}>
            <i className="bi bi-twitter"></i>
          </a>
          <a href={this.props.facebook}>
            <i className="bi bi-facebook"></i>
          </a>
        </div>
      </div>
    );
  }
}

export default AboutTeammateCard;
