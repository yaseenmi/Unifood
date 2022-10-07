import React, { Component } from "react";
import "./styles/RecentOrderCard.css";

class RecentOrderCard extends Component {
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
        className="recent-order-card-container"
        id={this.props.id}
        ref={this.rootRef}
        onClick={this.props.onClick}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        onMouseOver={this.props.onMouseOver}
        style={this.props.style}
      >
        <time>
          <div className="recent-order-card-number">{this.props.orderId}</div>
          <i className="bi bi-clock"></i>
          {this.props.date}
          <div className="recent-order-card-status">
            <i
              className="bi bi-circle-fill"
              style={{
                color:
                  this.props.status !== "pending"
                    ? "var(--success-color)"
                    : "var(--error-color)",
              }}
            ></i>
            {this.props.status}
          </div>
        </time>
        <span>
          <i className="bi bi-currency "></i>${this.props.total}
        </span>
      </div>
    );
  }
}

export default RecentOrderCard;
