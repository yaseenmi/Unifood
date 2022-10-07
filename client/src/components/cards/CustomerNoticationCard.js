import Axios from "axios";
import React, { Component } from "react";
import Cookies from "../assitance-methods/Cookies";
import IconButton from "../inputs/IconButton";
import "./styles/CustomerNotificationCard.css";
import getHost from "../assitance-methods/getHost";

class CustomerNotificationCard extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.rootRef = React.createRef();

    // State Object
    this.state = {};

    // Binding Methods
    this.markeAsReadClicked = this.markeAsReadClicked.bind(this);
    this.removeClicked = this.removeClicked.bind(this);
  }
  markeAsReadClicked() {
    let current = this.rootRef.current;
    let readSign = current.querySelector(".bi-circle-fill");
    readSign.style.display = "none";
    current.focus();

    let formData = {
      id: parseInt(Cookies.get("id")),
      notid: this.props.itemId,
    };
    let api = `${getHost()}/customer/markasread`;
    Axios.post(api, formData).then((response) => {
      let data = response.data;
    });
  }
  removeClicked() {
    let current = this.rootRef.current;
    current.focus();

    let formData = {
      id: parseInt(Cookies.get("id")),
      notid: this.props.itemId,
    };
    let api = `${getHost()}/customer/removenotification`;
    Axios.post(api, formData).then((response) => {
      let data = response.data;
      if (this.props.onRemove) this.props.onRemove(this.props.itemId);
    });
  }
  componentDidMount() {}
  componentDidUpdate() {}
  UNSAFE_componentWillReceiveProps(newPro) {}
  render() {
    return (
      <div
        className="customer-notification-card-container"
        id={this.props.id}
        ref={this.rootRef}
        onClick={this.props.onClick}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        onMouseOver={this.props.onMouseOver}
        style={this.props.style}
        tabIndex="0"
      >
        <div className="customer-notification-card-left">
          <div className="customer-notification-card-left-inner-1">
            <div>
              <i className="bi bi-asterisk"></i>
              {this.props.isRead ? null : <i className="bi bi-circle-fill"></i>}
            </div>
          </div>
          <div className="customer-notification-card-left-inner-2">
            <label className="customer-notification-card-from">
              {this.props.from}
            </label>
            <label className="customer-notification-card-description">
              {this.props.description}
            </label>
          </div>
        </div>
        <div className="customer-notification-card-right">
          <time className="customer-notification-card-time">
            {this.props.time}
          </time>
          <div className="customer-notification-card-options-container">
            <IconButton iconClass="bi bi-three-dots-vertical" />
            <div className="customer-notification-card-options">
              {this.props.isRead ? null : (
                <div
                  className="customer-notification-card-option"
                  onClick={this.markeAsReadClicked}
                  tabIndex="0"
                >
                  Mark as read
                </div>
              )}
              <div
                className="customer-notification-card-option"
                onClick={this.removeClicked}
                tabIndex="0"
              >
                Remove
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerNotificationCard;
