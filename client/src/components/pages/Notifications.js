import React, { Component } from "react";
import "./styles/Notifications.css";
import $ from "jquery";
import Axios from "axios";
import getHost from "../assitance-methods/getHost";
import Cookies from "../assitance-methods/Cookies";
import Header from "../fixtures/Header";
import Footer from "../fixtures/Footer";
import CircleLoader from "../loaders/CircleLoader";
import NoResultsImg from "../../assets/vectors/NoResults.svg";
import CustomerNotificationCard from "../cards/CustomerNoticationCard";

class Notifications extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.rootRef = React.createRef();

    // State Object
    this.state = {
      user: [],
      isNotificationsOpen: "false",
      notificationsCount: null,
      cartCount: null,
      notifications: [],
    };

    // Binding Methods
    this.notificationsClosed = this.notificationsClosed.bind(this);
    this.getNotifications = this.getNotifications.bind(this);
    this.notificationsClicked = this.notificationsClicked.bind(this);
    this.searchClicked = this.searchClicked.bind(this);
    this.getUser = this.getUser.bind(this);
    this.checkSignIn = this.checkSignIn.bind(this);
    this.getCartCount = this.getCartCount.bind(this);
    this.notificationRemoved = this.notificationRemoved.bind(this);
  }
  notificationRemoved(id) {
    let notifications = this.state.notifications.filter((x) => x.id !== id);
    this.setState({ notifications: notifications });
  }
  notificationsClosed() {
    if (this.state.isNotificationsOpen === "true") {
      this.setState({ isNotificationsOpen: "false" });
    }
  }
  async getNotifications() {
    const api = `${getHost()}/customer/getnotifications`;
    const id = Cookies.get("id");
    const postData = { id: id, getAll: true };
    let loader = this.rootRef.current.querySelector(
      "#notifications-table-body-loading"
    );
    await Axios.post(api, postData).then((response) => {
      let data = response.data;      
      this.setState({ notifications: data }, () => {
        if (loader) loader.style.display = "none";
      });
    });
  }
  notificationsClicked() {
    this.setState({ notificationsCount: null });
    this.setState((pre) => ({
      isNotificationsOpen:
        pre.isNotificationsOpen === "false" ? "true" : "false",
    }));
  }
  searchClicked() {
    $("#customer-search-container").slideDown(150);
    $("#customer-search-in").focus();
    $("body").css("overflow-y", "hidden");
  }
  checkSignIn() {
    if (Cookies.get("id") !== "") return true;
    return false;
  }
  getUser() {
    let formData = {
      id: Cookies.get("id"),
    };
    let api = `${getHost()}/customer/getuser`;
    Axios.post(api, formData).then((response) => {
      let data = response.data.data;
      this.setState({ user: data });
    });
  }
  getCartCount() {
    let storage = localStorage;
    let items = JSON.parse(storage.getItem("items"));
    if (!items || items.length === 0) return null;
    return items.length.toString();
  }
  componentDidMount() {
    if (!this.checkSignIn()) {
      window.location.replace("/");
      return;
    }
    this.setState({ cartCount: this.getCartCount() });
    this.getUser();
    this.getNotifications();
  }
  componentDidUpdate() {}
  UNSAFE_componentWillReceiveProps(newPro) {}
  render() {
    return (
      <div
        className="notifications-container"
        id={this.props.id}
        ref={this.rootRef}
        onClick={this.props.onClick}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        onMouseOver={this.props.onMouseOver}
        style={this.props.style}
      >
        <Header
          onNotificationsClose={this.notificationsClosed}
          notificationsCount={this.state.notificationsCount}
          cartCount={this.state.cartCount}
          isNotificationsOpen={this.state.isNotificationsOpen}
          notificationsOnClick={this.notificationsClicked}
          searchOnClick={this.searchClicked}
          profileLink="/profile"
          notificationsLink="/notifications"
          profilePhoto={`${getHost()}/images/customers/${
            this.state.user.Image
          }`}
          isNotificationsVisible="false"
        />
        <p id="notifications-title">
          <div>
            <i className="bi bi-bell-fill"></i>Notifcations
          </div>
          <div>
            <i className="bi bi-list-nested"></i>
            {this.state.notifications.length} Items
          </div>
        </p>
        <div id="notifications-inner">
          <div id="notifications-table-body">
            {this.state.notifications.length !== 0 ? (
              this.state.notifications.map((item) => {
                return (
                  <CustomerNotificationCard
                    itemId={item.id}
                    from={item.from}
                    isRead={item.isRead}
                    time={item.time}
                    description={item.description}
                    onRemove={this.notificationRemoved}
                  />
                );
              })
            ) : (
              <div id="no-notifications-items">
                <p>There is no notifications here...</p>
                <img alt="" src={NoResultsImg} draggable={false} />
              </div>
            )}
            <div id="notifications-table-body-loading">
              <CircleLoader isActive="true" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Notifications;
