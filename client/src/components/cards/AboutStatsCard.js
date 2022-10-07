import React, { Component } from "react";
import "./styles/AboutStatsCard.css";

class AboutStatsCard extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.rootRef = React.createRef();

    // State Object
    this.state = {
      stats: this.props.stats,
      stat: this.props.stats,
    };

    // Binding Methods
  }
  componentDidMount() {
    let number = 0;
    let interval = setInterval(() => {
      number++;
      if (number === 300) {
        clearInterval(interval);
        console.log(this.state.stat);
        this.setState({ stats: this.state.stat });
        return;
      }
      this.setState({ stats: number });
    }, 1);
  }
  componentDidUpdate() {}
  UNSAFE_componentWillReceiveProps(newPro) {}
  render() {
    return (
      <div
        className="about-stats-card-container"
        id={this.props.id}
        ref={this.rootRef}
        onClick={this.props.onClick}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        onMouseOver={this.props.onMouseOver}
        style={this.props.style}
      >
        <svg className="about-stats-card-ring" height="160" width="160">
          <circle
            className="about-stats-card-ring-circle"
            stroke="var(--primary-color)"
            strokeWidth="6"
            strokeLinecap="round"
            fill="transparent"
            r="70"
            cx="80"
            cy="80"
          ></circle>
          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
            {this.state.stats}
          </text>
        </svg>
        <p>{this.props.for}</p>
      </div>
    );
  }
}

export default AboutStatsCard;
