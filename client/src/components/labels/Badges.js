import React, { Component } from "react";
import Tooltip from "../tooltips/Tooltip";
import "./styles/Badges.css";

class Badges extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.rootRef = React.createRef();

    // State Object
    this.state = {};

    // Binding Methods
  }
  componentDidMount() {
      let style = this.rootRef.current.style;
      style.backgroundColor = this.props.background;
      style.color = this.props.color;
  }
  componentDidUpdate() {}
  UNSAFE_componentWillReceiveProps(newPro) {}
  render() {
    return (
      <div
        className="badges-container"
        id={this.props.id}
        ref={this.rootRef}
        onClick={this.props.onClick}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        onMouseOver={this.props.onMouseOver}
        style={this.props.style}
      >
        {this.props.text}
        {this.props.iconClass !== undefined? <i style={{color: this.props.color}} className={this.props.iconClass}></i> : null}        
        {this.props.tooltip !== undefined ? (
          <Tooltip text={this.props.tooltip} />
        ) : null}
      </div>
    );
  }
}

export default Badges;
