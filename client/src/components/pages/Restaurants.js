import React, { Component } from "react";
import Header from "../fixtures/Header";
import "./styles/Restaurants.css";
import $ from "jquery";
import ItemsSidebar from "../sidebars/ItemsSidebar";
import CategoryCard from "../cards/CategoryCard";
import Axios from "axios";
import CircleLoader from "../loaders/CircleLoader";
import IconButton from "../inputs/IconButton";
import Cookies from "../assitance-methods/Cookies";
import getHost from "../assitance-methods/getHost";
import stringProcessor from "../assitance-methods/StringProcessor";

class Restaurants extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.rootRef = React.createRef();

    // State Object
    this.state = {
      isNotificationsOpen: "false",
      notificationsCount: null,
      cartCount: null,
      categories: [],
      restaurants: [],
      expandMenuIcon: "fa fa-chevron-up",
      user: {},
      
    };

    // Binding Methods
    this.notificationsClosed = this.notificationsClosed.bind(this);
    this.getNotifications = this.getNotifications.bind(this);
    this.setNotificationsCount = this.setNotificationsCount.bind(this);
    this.notificationsClicked = this.notificationsClicked.bind(this);
    this.searchClicked = this.searchClicked.bind(this);
    this.getCartCount = this.getCartCount.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.getRestaurants = this.getRestaurants.bind(this);
    this.getchangeSelectedItemToIntersected =
      this.changeSelectedItemToIntersected.bind(this);
    this.expandMenuClicked = this.expandMenuClicked.bind(this);
    this.getUser = this.getUser.bind(this);
    this.checkSignIn = this.checkSignIn.bind(this);
  }
  getCartCount() {
    let storage = localStorage;
    let items = JSON.parse(storage.getItem("items"));
    if (!items || items.length === 0) return null;
    return items.length.toString();
  }
  expandMenuClicked() {
    let menu = document.querySelector("#categories-sidebar");
    if (this.state.expandMenuIcon.includes("up"))
      this.setState({ expandMenuIcon: "fa fa-chevron-down" });
    else this.setState({ expandMenuIcon: "fa fa-chevron-up" });
    menu.classList.toggle("categories-sidebar-open");
  }
  searchClicked() {
    $("#customer-search-container").slideDown(150);
    $("#customer-search-in").focus();
    $("body").css("overflow-y", "hidden");
  }
  notificationsClosed() {
    if (this.state.isNotificationsOpen === "true") {
      this.setState({ isNotificationsOpen: "false" });
    }
  }
  getCategories() {
    Axios.post(`${getHost()}/customer/getcategories`).then((response) => {
      let data = response.data;
      this.setState({ categories: data });
    });
  }
  getRestaurants() {
    Axios.get(`${getHost()}/customer/getrestaurants`).then((response) => {
      let data = response.data;    
      let newData = [];
      data.forEach((element, i) => {
        newData.push({
          id: data[i].ID,
          text: data[i].Name,
          to: `#restaurant${i}`,
          isActive: i === 0 ? "true" : "false",
        });
      });
      this.setState({ restaurants: newData }, () => {
        document.querySelector("#restaurants-loader").style.display = "none";
        let hash = window.location.hash;
        if (hash && document.querySelector(hash)) document.querySelector(hash).scrollIntoView();
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
        let markAsReadOnClick = function () {
          alert("hello");
        };
        data.markAsReadOnClick = markAsReadOnClick;
        notifications = data;
      });
      resolve(notifications);
    });
    return pro;
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
  notificationsClicked() {
    this.setState({ notificationsCount: null });
    this.setState((pre) => ({
      isNotificationsOpen:
        pre.isNotificationsOpen === "false" ? "true" : "false",
    }));
  }
  changeSelectedItemToIntersected() {
    setTimeout(() => {
      let options = {
        root: document.querySelector("#restaurants-categories-container"),
        rootMargin: "0px",
        threshold: 1.0,
      };
      let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let newCategories = this.state.restaurants.map((element, i) => {
              let isActive;
              if (element.to === "#" + entry.target.getAttribute("id"))
                isActive = "true";
              else isActive = "false";
              return {
                id: element.id,
                text: element.text,
                to: element.to,
                isActive: isActive,
              };
            });
            this.setState({ restaurants: newCategories });
          }
        });
      }, options);
      document.querySelectorAll(".restaurant-name").forEach((element) => {
        observer.observe(element);
      });
    }, 1000);
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
  checkSignIn() {
    if (Cookies.get("id") !== "") return true;
    return false;
  }
  componentDidMount() {
    if (!this.checkSignIn()) {
      window.location.replace("/");
      return;
    }
    this.setState({ cartCount: this.getCartCount() });
    this.getUser();
    this.setNotificationsCount();
    this.getCategories();
    this.getRestaurants();
    this.changeSelectedItemToIntersected();
  }
  componentDidUpdate() {}
  UNSAFE_componentWillReceiveProps() {}
  render() {
    return (
      <div
        className={this.props.className}
        id="restaurants-container"
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
          notificationsLink="/notifications"
        />
        <main id="restaurants-main">
          <div id="restaurants-loader">
            <CircleLoader isActive="true" />
          </div>
          <ItemsSidebar
            id="categories-sidebar"
            items={this.state.restaurants}
          />
          <div id="restaurants-categories-outer">
            <div id="restaurants-categories-container">
              {this.state.restaurants.map((restaurant, i) => {
                return (
                  <div className="resturant-categories">
                    <h1 id={`restaurant${i}`} className="restaurant-name">
                      {restaurant.text}
                    </h1>
                    <div className="resturant-categories-inner">
                      {this.state.categories
                        .filter(
                          (element) => element.RestaurantID === restaurant.id
                        )
                        .map((prodcut) => {
                          return (
                            <CategoryCard
                              key={prodcut.ID}
                              photo={`${getHost()}/images/restaurants/${restaurant.text}/categories/${prodcut.Image}`}
                              category={prodcut.Name}
                              description={prodcut.Description}
                              restaurantName={restaurant.text}
                            />
                          );
                        })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
        <IconButton
          id="expand-menu"
          iconClass={this.state.expandMenuIcon}
          onClick={this.expandMenuClicked}
        />
      </div>
    );
  }
}

export default Restaurants;
