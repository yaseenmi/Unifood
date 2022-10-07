import React, { Component } from "react";
import "./styles/MessageBox.css";
import DefaultButton from "../inputs/DefaultButton";

class MessageBox extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.ref = React.createRef();

    // Binding Methods
    this.hides = this.hides.bind(this);
    this.hideClicked = this.hideClicked.bind(this);
    this.getResult = this.getResult.bind(this);

    //State Object
    let controlsStyle = {
      marginLeft: "5px",
    };
    this.state = {
      display: "block",
      opacity: "0",
      transform: "translate(-50%, -75%)",
      type: <i class="bi bi-info-circle-fill"></i>,
      controls: (
        <div className="message-box-controls">
          <DefaultButton
            onClick={this.getResult}
            style={controlsStyle}
            text="Cancel"
            type="outline"
          />
          <DefaultButton
            onClick={this.getResult}
            style={controlsStyle}
            text="No"
          />
          <DefaultButton
            onClick={this.getResult}
            style={controlsStyle}
            text="Yes"
          />
        </div>
      ),
      color: "var(--info-color)",
    };
  }

  hideClicked(e) {
    if (e.target.getAttribute("class") === "message-box-container") {
      this.hides(300);
      if (this.props.onClose) this.props.onClose();
    }
  }
  hides(after) {
    this.setState({ transform: "translate(-50%, -75%)", opacity: "0" });
    setTimeout(() => {
      this.setState({ display: "none" });
    }, after);
  }
  componentWillReceiveProps(newPro) {
    let controlsStyle = {
      marginLeft: "5px",
    };

    if (newPro.isOpen === "true") {
      this.setState({ display: "block" });
      setTimeout(() => {
        this.setState({ transform: "translate(-50%, -50%)", opacity: "1" });
        if (this.props.onOpen) this.props.onOpen();
      }, 10);
    } else if (newPro.isOpen === "false") {
      this.hides(300);
      if (this.props.onClose) this.props.onClose();
    }

    if (newPro.type === "info") {
      this.setState({ color: "var(--info-color)" }, () => {
        this.setState({
          type: (
            <i
              class="bi bi-info-circle-fill"
              style={{ color: this.state.color }}
            ></i>
          ),
        });
      });
    } else if (newPro.type === "error") {
      this.setState({ color: "var(--error-color)" }, () => {
        this.setState({
          type: (
            <i class="bi bi-x-circle-fill" style={{ color: this.state.color }}></i>
          ),
        });
      });
    } else if (newPro.type === "warning") {
      this.setState({ color: "var(--warning-color)" }, () => {
        this.setState({
          type: (
            <i
              class="bi bi-exclamation-triangle-fill"
              style={{ color: this.state.color }}
            ></i>
          ),
        });
      });
    } else if (newPro.type === "success") {
      this.setState({ color: "var(--success-color)" }, () => {
        this.setState({
          type: (
            <i
              class="bi bi-check-circle-fill"
              style={{ color: this.state.color }}
            ></i>
          ),
        });
      });
    }
    setTimeout(() => {
      if (newPro.controls === "yes-no") {
        this.setState({
          controls: (
            <div className="message-box-controls">
              <DefaultButton
                onClick={this.getResult}
                style={controlsStyle}
                type="outline"
                text="No"
              />
              <DefaultButton
                onClick={this.getResult}
                style={controlsStyle}
                text="Yes"
                bg={this.state.color}
              />
            </div>
          ),
        });
      } else if (newPro.controls === "ok-cancel") {
        this.setState({
          controls: (
            <div className="message-box-controls">
              <DefaultButton
                onClick={this.getResult}
                style={controlsStyle}
                type="outline"
                text="Cancel"
              />
              <DefaultButton
                onClick={this.getResult}
                style={controlsStyle}
                text="Ok"
                bg={this.state.color}
              />
            </div>
          ),
        });
      } else if (newPro.controls === "yes-no-cancel") {
        this.setState({
          controls: (
            <div className="message-box-controls">
              <DefaultButton
                onClick={this.getResult}
                style={controlsStyle}
                text="Cancel"
                type="outline"
              />
              <DefaultButton
                onClick={this.getResult}
                style={controlsStyle}
                text="No"
                bg={this.state.color}
              />
              <DefaultButton
                onClick={this.getResult}
                style={controlsStyle}
                text="Yes"
                bg={this.state.color}
              />
            </div>
          ),
        });
      } else if (newPro.controls === "ok") {
        this.setState({
          controls: (
            <div className="message-box-controls">
              <DefaultButton
                onClick={this.getResult}
                style={controlsStyle}
                text="Ok"
              />
            </div>
          ),
        });
      } else if (newPro.controls === "none") {
        this.setState({
          controls: "",
        });
      }
    }, 10);
  }

  // Getting the result of message box, if It's (yes, no, cancel, ok)
  getResult(e) {
    this.props.onValueSelected(e.target.innerText);
  }
  componentDidMount() {
    let controlsStyle = {
      marginLeft: "5px",
    };
    if (this.props.isOpen === "true") {
      this.setState({ display: "block" });
      setTimeout(() => {
        this.setState({ transform: "translate(-50%, -50%)", opacity: "1" });
        if (this.props.onOpen) this.props.onOpen();
      }, 10);
    } else if (this.props.isOpen === "false") {
      this.hides(10);
      if (this.props.onClose) this.props.onClose();
    }

    if (this.props.type === "info") {
      this.setState({
        type: (
          <i class="bi bi-info-circle-fill" style={{ color: this.state.color }}></i>
        ),
        color: "var(--info-color)",
      });
    } else if (this.props.type === "error") {
      this.setState({
        type: (
          <i class="bi bi-x-circle-fill" style={{ color: this.state.color }}></i>
        ),
        color: "var(--error-color)",
      });
    } else if (this.props.type === "warning") {
      this.setState({
        type: (
          <i
            class="bi bi-exclamation-triangle-fill"
            style={{ color: this.state.color }}
          ></i>
        ),
        color: "var(--warning-color)",
      });
    } else if (this.props.type === "success") {
      this.setState({
        type: (
          <i class="bi bi-check-circle-fill" style={{ color: this.state.color }}></i>
        ),
        color: "var(--success-color)",
      });
    }

    if (this.props.controls === "yes-no") {
      this.setState({
        controls: (
          <div className="message-box-controls">
            <DefaultButton
              onClick={this.getResult}
              style={controlsStyle}
              type="outline"
              text="No"
            />
            <DefaultButton
              onClick={this.getResult}
              style={controlsStyle}
              text="Yes"
              bg={this.state.color}
            />
          </div>
        ),
      });
    } else if (this.props.controls === "ok-cancel") {
      this.setState({
        controls: (
          <div className="message-box-controls">
            <DefaultButton
              onClick={this.getResult}
              style={controlsStyle}
              type="outline"
              text="Cancel"
            />
            <DefaultButton
              onClick={this.getResult}
              style={controlsStyle}
              text="Ok"
              bg={this.state.color}
            />
          </div>
        ),
      });
    } else if (this.props.controls === "yes-no-cancel") {
      this.setState({
        controls: (
          <div className="message-box-controls">
            <DefaultButton
              onClick={this.getResult}
              style={controlsStyle}
              text="Cancel"
              type="outline"
            />
            <DefaultButton
              onClick={this.getResult}
              style={controlsStyle}
              text="No"
              bg={this.state.color}
            />
            <DefaultButton
              onClick={this.getResult}
              style={controlsStyle}
              text="Yes"
              bg={this.state.color}
            />
          </div>
        ),
      });
    } else if (this.props.controls === "ok") {
      this.setState({
        controls: (
          <div className="message-box-controls">
            <DefaultButton
              onClick={this.getResult}
              style={controlsStyle}
              text="Ok"
            />
          </div>
        ),
      });
    } else if (this.props.controls === "none") {
      this.setState({
        controls: "",
      });
    }
    this.ref.current.childNodes[0].focus();
  }

  render() {
    return (
      <div
        ref={this.ref}
        style={{ display: this.state.display }}
        id={this.props.id}
        className="message-box-container"
        onClick={this.hideClicked}
      >
        <div
          tabIndex="0"
          style={{
            transform: this.state.transform,
            opacity: this.state.opacity,
          }}
          className="message-box"
        >
          <h4 style={{ color: this.state.color }}>
            {this.state.type}
            {this.props.title}
          </h4>
          <p>{this.props.description}</p>
          {this.state.controls}
        </div>
      </div>
    );
  }
}
export default MessageBox;
