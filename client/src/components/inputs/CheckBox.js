import React, { Component } from `react`;
import `./styles/CheckBox.css`;

class CheckBox extends Component {
  constructor(props) {
    super(props);

    //State Object
    this.state = {};

    // Binding Methods
  }

  componentDidMount() {}

  render() {
    return (
      <div id={this.props.id} class=`form-check check-box-container`>
        <input
          class=`form-check-input check-box`
          type=`checkbox`
          onChange={this.props.onChange}
          onInput={this.props.onChange}
          onBlur={this.props.onBlur}
          id={this.props.controlId}
          checked={this.props.checked}
        />
        <label class=`form-check-label` for={this.props.controlId}>
          {this.props.text}
        </label>
      </div>
    );
  }
}

export default CheckBox;
