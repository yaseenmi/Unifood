import React, { Component } from "react";
import ReactDOM from "react-dom";
import NotificationsPanelItem from "../fixtures/NotificationsPanelItem";
import CircleLoader from "../loaders/CircleLoader";
import DefaultButton from "../inputs/DefaultButton";
import "./styles/NotificationsPanel.css";
import NoResultsImg from "../../assets/vectors/NoResults.svg";
import $ from "jquery";

class NotificationsPanel extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.ref = React.createRef();

    // State Object
    this.state = {
      notificationsItems: null,
      isLoaderActive: "false",
    };

    // Binding Methods
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  async open(props) {
    if (props.onOpen !== undefined) props.onOpen();
    this.setState({ isLoaderActive: "true" });
    let notificationsPanelItems = this.ref.current;
    $(notificationsPanelItems).fadeIn(200);
    $(notificationsPanelItems).css("top", "65px");
    setTimeout(async () => {
      await props.notificationsHandler().then(async (notifications) => {
        if (notifications === undefined || notifications.length === 0) {
          ReactDOM.render(
            <div id="notifications-panel-no-results">
              <p>There is no notifications here...</p>
              <img src={NoResultsImg} draggable="false"></img>
            </div>,
            document.querySelector("#notifications-panel-items")
          );
          $("#notifications-panel-footer").css("display", "none");
        } else {
          ReactDOM.render(
            notifications.map((element) => {
              return (
                <NotificationsPanelItem
                  itemId={element.id}
                  isAdmin={element.isAdmin}
                  isRestaurant={element.isRestaurant}
                  from={element.from}
                  description={element.description}
                  time={element.time}
                  isRead={element.isRead.toString()}
                  markAsReadOnClick={element.markAsReadOnClick}
                />
              );
            }),
            document.querySelector("#notifications-panel-items"),
            () => {
              $("#notifications-panel-footer").css("display", "block");
            }
          );
        }
        this.setState({ isLoaderActive: "false" });
      });
    }, 200);
  }
  close(props) {
    if (props.onClose !== undefined) props.onClose();

    let notificationsPanelItems = this.ref.current;
    $(notificationsPanelItems).hide();
    $(notificationsPanelItems).css("top", "55px");
    ReactDOM.render(null, document.querySelector("#notifications-panel-items"));
    $("#notifications-panel-footer").css("display", "none");
  }
  UNSAFE_componentWillMount() {
    $(document).mouseup((e) => {
      if (this.ref.current === null) return;
      if (
        e.target !== this.ref.current &&
        !this.ref.current.contains(e.target) &&
        e.target.getAttribute("id") !== "notifications-icon-btn" &&
        e.target.getAttribute("class") !== "bi bi-bell-fill"
      ) {
        this.close(this.props);
      }
    });
    if (this.props.isOpen === "true") {
      this.open(this.props);
    }
  }

  UNSAFE_componentWillReceiveProps(newPro) {
    if (newPro.isOpen === "false") {
      this.close(newPro);
    } else {
      this.open(newPro);
    }
  }

  render() {
    return (
      <div ref={this.ref} id="notifications-panel-container">
        <p id="notifications-panel-title">
          Notifications
          <CircleLoader isActive={this.state.isLoaderActive} size="small" />
        </p>
        <div id="notifications-panel-items">
          {this.state.notificationsItems}
        </div>
        {this.props.canSeeAll === false ? null : (
          <div id="notifications-panel-footer">
            <DefaultButton
              text="See All Notifications"
              iconClass="bi bi-chevron-right"
              onClick={() => {
                window.location.href = this.props.notificationsLink
                  ? this.props.notificationsLink
                  : "#";
              }}
            />
          </div>
        )}
      </div>
    );
  }
}
export default NotificationsPanel;
