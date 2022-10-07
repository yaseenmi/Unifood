import React, { Component } from `react`;
import `./styles/ToggleButton.css`;

class ToggleButton extends Component {
  constructor(props) {
    super(props);

    //State Object
    this.state = {};

    // Binding Methods
  }

  componentDidMount() {}

  render() {
    return (
      <div id={this.props.id} className=`toggle-button-container` tabIndex=`0`>
        <input
          disabled={this.props.disabled}
          onInput={this.props.onInput}
          onChange={this.props.onChange}
          id={this.props.controlId}
          checked={this.props.checked}
          type=`checkbox`
        />
        <label
          disabled={this.props.disabled}
          for={this.props.controlId}
          className=`toggle-button-control`
        ></label>
        <label for={this.props.controlId}></label>
      </div>
    );
  }
}

export default ToggleButton;
