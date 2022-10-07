import React, { Component } from "react";
import TabControl from "../panels/TabControl";
import "./styles/Profile.css";
import $ from "jquery";
import Header from "../fixtures/Header";
import DefaultButton from "../inputs/DefaultButton";
import RecentOrders from "../fixtures/RecentOrders";
import FavoriteList from "../fixtures/FavoriteList";
import ProfileSettings from "../fixtures/ProfileSettings";
import Footer from "../fixtures/Footer";
import getHost from "../assitance-methods/getHost";
import Cookies from "../assitance-methods/Cookies";
import Axios from "axios";

class Profile extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.rootRef = React.createRef();

    // State Object
    this.state = {
      isNotificationsOpen: "false",
      notificationsCount: null,
      cartCount: null,
      user: {},
      img: null,
      image: null,
    };

    // Binding Methods
    this.notificationsClosed = this.notificationsClosed.bind(this);
    this.getNotifications = this.getNotifications.bind(this);
    this.notificationsClicked = this.notificationsClicked.bind(this);
    this.searchClicked = this.searchClicked.bind(this);
    this.getCartCount = this.getCartCount.bind(this);
    this.getUser = this.getUser.bind(this);
    this.setNotificationsCount = this.setNotificationsCount.bind(this);
    this.photoSelected = this.photoSelected.bind(this);
    this.productAdded = this.productAdded.bind(this);
    this.checkSignIn = this.checkSignIn.bind(this);
  }
  productAdded(id, added) {
    let cartCount = parseInt(this.state.cartCount);
    if (added) {
      this.setState({
        cartCount: cartCount ? (cartCount + 1).toString() : "1",
      });
    } else {
      this.setState({
        cartCount: cartCount !== 1 ? (cartCount - 1).toString() : null,
      });
    }
  }
  photoSelected(e) {
    try {
      this.setState({ img: URL.createObjectURL(e.target.files[0]) });
      $("#profile-img").attr("src", this.state.img);
      $("#header-profile-photo").attr("src", this.state.img);
      this.setState({ image: e.target.files[0] }, () => {
        let formData = new FormData();
        formData.append("id", Cookies.get("id"));
        formData.append("img", this.state.image);

        let api = `${getHost()}/customer/uploadprofilephoto`;
        Axios.post(api, formData).then((response) => {
          let data = response.data;
          console.log(data);
        });
      });
    } catch {}
  }
  getCartCount() {
    let storage = localStorage;
    let items = JSON.parse(storage.getItem("items"));
    if (!items || items.length === 0) return null;
    return items.length.toString();
  }
  notificationsClosed() {
    if (this.state.isNotificationsOpen === "true") {
      this.setState({ isNotificationsOpen: "false" });
    }
  }
  async setNotificationsCount() {
    const getNotificationsAPI = `${getHost()}/customer/getnotifications`;
    const id = Cookies.get("id");
    const postData = { id: id };
    await Axios.post(getNotificationsAPI, postData).then((response) => {
      let data = response.data;

      this.setState({
        notificationsCount: data.filter((x) => !x.isRead).length,
      });
    });
  }
  getCartCount() {
    let storage = localStorage;
    let items = JSON.parse(storage.getItem("items"));
    if (!items || items.length === 0) return null;
    return items.length.toString();
  }
  notificationsClosed() {
    if (this.state.isNotificationsOpen === "true") {
      this.setState({ isNotificationsOpen: "false" });
    }
  }
  async setNotificationsCount() {
    const getNotificationsAPI = `${getHost()}/customer/getnotifications`;
    const id = Cookies.get("id");
    const postData = { id: id };
    await Axios.post(getNotificationsAPI, postData).then((response) => {
      let data = response.data;

      this.setState({
        notificationsCount: data.filter((x) => !x.isRead).length,
      });
    });
  }
  getNotifications() {
    const api = `${getHost()}/customer/getnotifications`;
    const id = Cookies.get("id");
    const postData = { id: id };
    let pro = new Promise(async (resolve) => {
      let notifications = [];
      await Axios.post(api, postData).then((response) => {
        let data = response.data;
        notifications = data;
      });
      resolve(notifications);
    });
    return pro;
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
  componentDidMount() {
    if (!this.checkSignIn()) {
      window.location.replace("/");
      return;
    }
    this.getUser();
    this.setState({ cartCount: this.getCartCount() });
    $("#profile-img-fin").change(this.photoSelected);
    this.setNotificationsCount();
  }
  componentDidUpdate() {}
  UNSAFE_componentWillReceiveProps(newPro) {}
  render() {
    return (
      <div
        id="profile-container"
        className={this.props.className}
        ref={this.rootRef}
        onClick={this.props.onClick}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        onMouseOver={this.props.onMouseOver}
      >
        <Header
          onNotificationsClose={this.notificationsClosed}
          notificationsCount={this.state.notificationsCount}
          cartCount={this.state.cartCount}
          isNotificationsOpen={this.state.isNotificationsOpen}
          notificationsOnClick={this.notificationsClicked}
          notificationsHandler={this.getNotifications}
          searchOnClick={this.searchClicked}
          profilePhoto={`${getHost()}/images/customers/${
            this.state.user.Image
          }`}
          profileLink="/profile"
          notificationsLink="/notifications"
        />
        <div id="profile-intro">
          <label htmlFor="profile-img-fin" id="profile-img-container">
            <img
              id="profile-img"
              src={
                this.state.user.Image
                  ? `${getHost()}/images/customers/${this.state.user.Image}`
                  : null
              }
              alt=""
            />
            <div id="profile-img-mask">
              <i className="bi bi-camera"></i>
            </div>
            <input id="profile-img-fin" accept="image/*" type="file" />
          </label>
          <div id="profile-basic-info">
            <p>{this.state.user.Name}</p>
            <span>Online Now</span>
            <DefaultButton
              id="browse-restaurants-btn"
              iconClass="bi bi-arrow-up-right-square"
              text="Restaurants"
              onClick={() => {
                window.location.href = "/restaurants";
              }}
            />
          </div>
        </div>
        <TabControl
          id="profile-tabs"
          tabs={[
            {
              text: "Recent Orders",
              iconClass: "bi bi-clock-history",
              isActive: true,
              content: <RecentOrders />,
            },
            {
              text: "Favorite List",
              iconClass: "bi bi-heart",
              content: <FavoriteList onProductAdd={this.productAdded} />,
            },
            {
              text: "Settings",
              iconClass: "bi bi-gear",
              content: (
                <ProfileSettings
                  onInfoChanged={(name) => {
                    let user = this.state.user;
                    user.Name = name;
                    this.setState({ user: user });
                  }}
                />
              ),
            },
          ]}
        />
        <Footer />
      </div>
    );
  }
}

export default Profile;
