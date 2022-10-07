import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import $ from "jquery";

import AdminSidebar from "./AdminSidebar";
import Header from "./../fixtures/Header";
import Statistics from "./Statistics";
import Restaurant from "./Restaurants";
import BlackList from "./BlackList";
import Hidden from "./Hidden";
import User from "./Users";
import AddRestaurant from "./AddRestaurant";
import Details from "./Details";
import UserLog from "./UserLog";
import Notifications from "./Notifications";
import SendNotification from "./SendNotification";

import profilePhoto from "../../assets/images/Yas.jpg";
import "./styles/Admin.css";
import Cookies from "../assitance-methods/Cookies";
import axios from "axios";
import getHost from "../assitance-methods/getHost";
import MessageBox from "../alerts/MessageBox";

class AdminDashboard extends Component {
  constructor(props) {
    super(props);

    //Refs
    this.ref = React.createRef();

    // State Object
    this.state = {
      isNotificationsOpen: "false", // For Change Opening State Of Notifications Panel.
      notificationsCount: null, // For Change The Number Of Notifications Items.
      isCartVisible: false,
      test: [],
      isMessageBoxOpen: "false",
    };

    // Bindings Methods
    this.notificationMarkAsReadClicked =
      this.notificationMarkAsReadClicked.bind(this);
    this.notificationsButtonClicked =
      this.notificationsButtonClicked.bind(this);
    this.getNotifications = this.getNotifications.bind(this);
    this.onNotificationsClose = this.onNotificationsClose.bind(this);
    this.onNotificationsOpen = this.onNotificationsOpen.bind(this);
  }

  // Event Triggered When Mark As Read Button Clicked.
  notificationMarkAsReadClicked(e) {

  }

  // Required Method With Header Call To Get Notificaions Array To Show It In The Panel.
  getNotifications() {
    let notifications = [];
    const formData = new FormData();
    formData.append("userID", Cookies.get("id"));
    let pro = new Promise(async (resolve) => {
      // Block Start --- This Block Can Be Placed With A Code that Get Notifications From The Server.
      await axios
        .post(`${getHost()}/api/admin/notification/`, formData)
        .then((res) => {
          let data = res.data;
          for (let el of data) {
            notifications.push({
              isAdmin: parseInt(Cookies.get("id")),
              id: el.ID,
              from: el.Sender,
              description: el.Text,
              time: el.Date,
              isRead: Boolean(el.IsRead),
              markAsReadOnClick: this.notificationMarkAsReadClicked,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
      // Block End ---
      resolve(notifications);
    });
    return pro;
  }

  // Required Method With Header Call To Toggle Opening Of Notifications Panel.
  notificationsButtonClicked(e) {
    this.setState({ notificationsCount: null });
    this.setState((pre) => ({
      isNotificationsOpen:
        pre.isNotificationsOpen === "false" ? "true" : "false",
    }));
  }

  // Event Triggered When Notifications Panel Closed.
  onNotificationsClose() {
    // Close Notifications Panel
    if (this.state.isNotificationsOpen === "true") {
      this.setState({ isNotificationsOpen: "false" });
    }
  }

  // Event Triggered When Notifications Panel Opened.
  onNotificationsOpen() {}

  componentDidMount = () => {
    if (!Cookies.get("id")) {
      $("#Dashboard").addClass("admin-display-none");
      window.location.href = "http://localhost:3000/";
    } else {
      $("#Dashboard").removeClass("admin-display-none");
      const formData = new FormData();
      formData.append("userID", Cookies.get("id"));
      axios
        .post(`${getHost()}/api/admin/notification/count`, formData)
        .then((res) => {
          this.setState({
            notificationsCount: res.data.count === "0" ? null : res.data.count,
          });
        });
    }
  };

  render() {
    return (
      <div>
        <div
          className="admin-flex admin-vh100 w100 admin-border-box admin-display-none"
          id="Dashboard"
        >
          <AdminSidebar />
          <div className="admin-main-content admin-overflow-auto admin-relative admin-background-f2 admin-border-box h100">
            <Switch>
              <Route exact path="/admin">
                <Statistics />
              </Route>
              <Route exact path="/admin/restaurants">
                <Restaurant />
              </Route>
              <Route exact path="/admin/users">
                <User />
              </Route>
              <Route exact path="/admin/blacklist">
                <BlackList />
              </Route>
              <Route exact path="/admin/hidden">
                <Hidden />
              </Route>
              <Route exact path="/admin/add">
                <AddRestaurant />
              </Route>
              <Route
                exact
                path="/admin/restaurants/:name"
                render={(props) => <Details {...props} />}
              />
              <Route
                exact
                path="/admin/users/:id"
                render={(props) => <UserLog {...props} />}
              />
              <Route exact path="/admin/notifications">
                <Notifications />
              </Route>
            </Switch>
          </div>
        </div>
        <Header
          // The Header Profile Photo (Admin, Customer, Restuarant)
          // Determines If The Notifications Panel Opens Or Not.
          isNotificationsOpen={this.state.isNotificationsOpen}
          notificationsOnClick={this.notificationsButtonClicked}
          onNotificationsClose={this.onNotificationsClose}
          onNotificationsOpen={this.onNotificationsOpen} // Optional
          notificationsHandler={this.getNotifications} // Required (Very Important)
          isCartVisible="false"
          notificationsCount={this.state.notificationsCount}
          canSeeAllNotifications={false}
          isSearchVisible="false"
          extraIcon="bi bi-door-open-fill"
          extraTooltip="Log Out"
          extraIconOnClick={() => {
            this.setState({ isMessageBoxOpen: "true" });
          }}
        />
        <MessageBox
          title="Log Out"
          description="Do you want really to log out from your account?"
          isOpen={this.state.isMessageBoxOpen}
          type="warning"
          controls="yes-no"
          onValueSelected={(value) => {
            if (value === "Yes") {
              Cookies.set("id", "", 0);
              window.location.href = "/admin_enter/entery";
            } else if (value === "No") {
              this.setState({ isMessageBoxOpen: "false" });
            }
          }}
        />
      </div>
    );
  }
}
export default AdminDashboard;
