import React, { Component } from "react";
import "./styles/CircleLoader.css";

class CircleLoader extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.ref = React.createRef();
    //State Object
    this.state = {
      style: {
        height: "60px",
        width: "60px",
      },
    };

    // Binding Methods
    this.initialize = this.initialize.bind(this);
  }
  initialize(props) {
    let current = this.ref.current;    
    if (this.props.color)
    {
      current.style.borderTopColor = this.props.color;
      current.style.borderRightColor = this.props.color;
    }     
    if (props.size === "small") {
      this.setState({
        style: {
          height: "30px",
          width: "30px",
        },
      });
    } else if (props.size === "medium") {
      this.setState({
        style: {
          height: "60px",
          width: "60px",
        },
      });
    } else if (props.size === "large") {
      this.setState({
        style: {
          height: "100px",
          width: "100px",
        },
      });
    }

    if (props.isActive === "true") {
      this.ref.current.style.display = "block";
    } else if (props.isActive === "false") {
      this.ref.current.style.display = "none";
    }
  }
  componentDidMount() {
    this.initialize(this.props);
  }
  componentWillReceiveProps(newPro) {
    this.initialize(newPro);
  }

  render() {
    return (
      <div
        ref={this.ref}
        style={this.props.style || this.state.style}
        id={this.props.id}
        className="circle-loader"
      ></div>
    );
  }
}

export default CircleLoader;
