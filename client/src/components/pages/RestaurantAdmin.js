import React, { Component, createRef } from "react";
import "./styles/RestaurantAdmin.css";
import Header from "../fixtures/Header";
import photo from "./../../assets/images/Myphoto.jpg";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import RestaurantSidebar from "../fixtures/Restaurant/RestaurantSidebar";
import ViewCategory from "../fixtures/Restaurant/ViewCategory";
import ViewOrder from "../fixtures/Restaurant/ViewOrder";
import OrderDetail from "../fixtures/Restaurant/OrderDetail";
import ViewProduct from "../fixtures/Restaurant/ViewProduct";
import ProductDetail from "../fixtures/Restaurant/ProductDetail";
import Dashboard from "../fixtures/Restaurant/Dashboard";
import ViewOffer from "../fixtures/Restaurant/ViewOffer";
import ViewReview from "../fixtures/Restaurant/ViewReview";
import ViewProfile from "../fixtures/Restaurant/ViewProfile";
import OfferDetail from "../fixtures/Restaurant/OfferDetail";
import AddOffer from "../fixtures/Restaurant/AddOffer";
import AddProduct from "../fixtures/Restaurant/AddProduct";
import AddCategory from "../fixtures/Restaurant/AddCategory";
import EditOffer from "../fixtures/Restaurant/EditOffer";
import EditProduct from "../fixtures/Restaurant/EditProduct";
import CategoryDetail from "../fixtures/Restaurant/CategoryDetail";
import EditCategory from "../fixtures/Restaurant/EditCategory";
import axios from "axios";
import getHost from "../assitance-methods/getHost";
class RestaurantAdmin extends Component {
  constructor(props) {
    super(props);

    //Refs
    this.ref = React.createRef();

    // State Object
    this.state = {
      restName: "",
      result: [],
      resID: 0,
      isNotificationsOpen: "false", // For Change Opening State Of Notifications Panel.
      notificationsCount: null, // For Change The Number Of Notifications Items.
      cartCount: null, // For Change The Number Of Cart Items.
    };

    // Bindings Methods
    this.notificationMarkAsReadClicked =
      this.notificationMarkAsReadClicked.bind(this);
    this.notificationsButtonClicked =
      this.notificationsButtonClicked.bind(this);
    this.getNotifications = this.getNotifications.bind(this);
    this.cartButtonClicked = this.cartButtonClicked.bind(this);
    this.searchButtonClicked = this.searchButtonClicked.bind(this);
    this.onNotificationsClose = this.onNotificationsClose.bind(this);
    this.onNotificationsOpen = this.onNotificationsOpen.bind(this);
    this.setNotificationCount = this.setNotificationCount.bind(this);
  }
  setNotificationCount()
  {
    const api = `${getHost()}/Notification/count`;
    axios.get(api).then((resp) => {
      let data = resp.data;
      let count = data.count.toString();
      this.setState({notificationsCount: count});
    });
    
  }

  // Event Triggered When Mark As Read Button Clicked.
  notificationMarkAsReadClicked(e) {}

  // Required Method With Header Call To Get Notificaions Array To Show It In The Panel.
  getNotifications() {
    const api = `${getHost()}/Notification/get`;
    let pro = new Promise(async (resolve) => {
      let notifications = [];
      await axios.get(api).then((response) => {
        let data = response.data;
        for (let res of data) {
          res.isRestaurant = this.state.restID;
        }
        notifications = data;
        console.log(notifications);
      });
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

  // Event Triggered When Search Button Clicked.
  searchButtonClicked() {}

  // Event Triggered When Cart Button Clicked.
  cartButtonClicked() {}

  UNSAFE_componentWillMount() {
    this.setState({ cartCount: "10", notificationsCount: "12" });
  }
  componentDidMount() {
    this.setNotificationCount();
    axios.get("http://localhost:3001/RestaurantProfile/get").then((resp) => {
      this.setState({
        result: resp.data.result,
        restName: resp.data.restName,
        restID: resp.data.restID,
      });
    });
  }
  render() {
    return (
      <div>
        <div className="admin-dashboard-container">
          <RestaurantSidebar />
          <div className="main-content">
            <Switch>
              <Route exact component path="/restaurant_admin">
                <Dashboard />
              </Route>

              <Route exact component path="/restaurant_admin/product">
                <ViewProduct />
              </Route>

              <Route exact component path="/restaurant_admin/category">
                <ViewCategory />
              </Route>

              <Route exact component path="/restaurant_admin/order">
                <ViewOrder />
              </Route>

              <Route exact component path="/restaurant_admin/offer">
                <ViewOffer />
              </Route>

              <Route exact component path="/restaurant_admin/review">
                <ViewReview />
              </Route>

              <Route exact component path="/restaurant_admin/profile">
                <ViewProfile />
              </Route>

              <Route
                path="/restaurant_admin/order/order_detail/:ido/:idcu"
                render={(props) => <OrderDetail {...props} />}
              />

              <Route
                exact
                path="/restaurant_admin/product/product_detail/:idp"
                render={(props) => <ProductDetail {...props} />}
              />

              <Route
                exact
                path="/restaurant_admin/offer/offer_detail/:idof"
                render={(props) => <OfferDetail {...props} />}
              />

              <Route
                exact
                path="/restaurant_admin/category/category_detail/:idc"
                render={(props) => <CategoryDetail {...props} />}
              />

              <Route
                exact
                path="/restaurant_admin/offer/offer_detail/:idof/edit_offer"
                render={(props) => <EditOffer {...props} />}
              />

              <Route
                exact
                path="/restaurant_admin/product/product_detail/:idp/edit_product"
                render={(props) => <EditProduct {...props} />}
              />

              <Route
                exact
                path="/restaurant_admin/category/category_detail/:idc/edit_category"
                render={(props) => <EditCategory {...props} />}
              />

              <Route exact component path="/restaurant_admin/add_offer">
                <AddOffer />
              </Route>

              <Route exact component path="/restaurant_admin/add_product">
                <AddProduct />
              </Route>

              <Route exact component path="/restaurant_admin/add_category">
                <AddCategory />
              </Route>
            </Switch>
          </div>
        </div>
        {this.state.result.map((val) => {
          return (
            <Header
              isSearchVisible="false"
              isCartVisible="false"
              isNotificationsOpen={this.state.isNotificationsOpen} // Required
              notificationsOnClick={this.notificationsButtonClicked} // Required
              onNotificationsClose={this.onNotificationsClose} // Required
              onNotificationsOpen={this.onNotificationsOpen} // Optional
              cartOnClick={this.cartButtonClicked} // Optional
              searchOnClick={this.searchButtonClicked} // Optional
              notificationsHandler={this.getNotifications} // Required (Very Important)
              notificationsCount={this.state.notificationsCount}
              profileLink="/restaurant_admin/profile"
              canSeeAllNotifications={false}
              profilePhoto={`http://localhost:3001/images/restaurants-images/${val.Image}`}
            />
          );
        })}
      </div>
    );
  }
}
export default RestaurantAdmin;
