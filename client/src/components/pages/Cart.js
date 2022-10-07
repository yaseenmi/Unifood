import React, { Component } from "react";
import "./styles/Cart.css";
import $ from "jquery";
import Header from "../fixtures/Header";
import Footer from "../fixtures/Footer";
import CartItemCard from "../cards/CartItemCard";
import DefaultButton from "../inputs/DefaultButton";
import MessageBox from "../alerts/MessageBox";
import Axios from "axios";
import NoItemsImg from "../../assets/vectors/NoResults.svg";
import CircleLoader from "../loaders/CircleLoader";
import RichTextBox from "../inputs/RichTextBox";
import getHost from "../assitance-methods/getHost";
import Cookies from "../assitance-methods/Cookies";

class Cart extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.rootRef = React.createRef();

    // State Object
    this.state = {
      isNotificationsOpen: "false",
      notificationsCount: null,
      cartCount: null,
      isCartMessageBoxOpen: "false",
      messageBoxTitle: "Cart checkout",
      messageBoxDescription: "Do you want really to checkout your cart?",
      messageBoxControls: "yes-no",
      messageBoxType: "warning",
      messageBoxOnValueSelected: (value) => {
        this.valueSelected(value);
      },
      cartTotal: localStorage.getItem("cartTotal"),
      items: [],
      user: [],
    };

    // Binding Methods
    this.notificationsClosed = this.notificationsClosed.bind(this);
    this.getNotifications = this.getNotifications.bind(this);
    this.notificationsClicked = this.notificationsClicked.bind(this);
    this.searchClicked = this.searchClicked.bind(this);
    this.setNotificationsCount = this.setNotificationsCount.bind(this);
    this.getUser = this.getUser.bind(this);
    this.checkSignIn = this.checkSignIn.bind(this);
    this.checkoutClicked = this.checkoutClicked.bind(this);
    this.continueClicked = this.continueClicked.bind(this);
    this.valueSelected = this.valueSelected.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.itemRemoved = this.itemRemoved.bind(this);
    this.itemChanged = this.itemChanged.bind(this);
  }
  itemRemoved(id) {
    let newItems = this.state.items.filter((item) => item.id !== id);
    this.setState({ items: newItems });
    this.setState({ cartTotal: localStorage.getItem("cartTotal") });
  }
  itemChanged(process) {
    let total = localStorage.getItem("cartTotal");
    this.setState({ cartTotal: total });
  }
  getCartItems() {
    let storage = localStorage;
    let items = JSON.parse(storage.getItem("items"));
    let data = items ? items : [];
    this.setState({ items: data }, () => {
      let loading = document.querySelector("#cart-table-body-loading");
      if (loading) loading.style.display = "none";
    });
  }
  valueSelected(value) {
    if (value === "Yes") {
      this.setState({ isCartMessageBoxOpen: "false" });
      let formData = {
        id: Cookies.get("id"),
        total: this.state.cartTotal,
        note: this.rootRef.current.querySelector("#cart-notes").value,
        ids: JSON.parse(localStorage.getItem("items")),
      };
      let api = `${getHost()}/customer/cartcheckout`;
      Axios.post(api, formData).then((response) => {
        localStorage.setItem("items", JSON.stringify([]));
        this.setState({ items: [] }, () => {
          setTimeout(() => {
            this.setState({
              messageBoxTitle: "Success",
              messageBoxType: "success",
              messageBoxDescription: "Your cart is successfully checked out.",
              messageBoxControls: "none",
              messageBoxOnValueSelected: undefined,
              isCartMessageBoxOpen: "true",
            });
          }, 1000);
        });
      });
    } else {
      this.setState({ isCartMessageBoxOpen: "false" });
    }
  }
  continueClicked() {
    window.location.href = "/restaurants";
  }
  checkoutClicked() {
    this.setState({ isCartMessageBoxOpen: "true" });
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
    this.getCartItems();
    this.setNotificationsCount();
  }
  componentDidUpdate() {}
  UNSAFE_componentWillReceiveProps(newPro) {}
  render() {
    return (
      <div
        id="cart-container"
        className={this.props.className}
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
          notificationsHandler={this.getNotifications}
          searchOnClick={this.searchClicked}
          profileLink="/profile"
          notificationsLink="/notifications"
          profilePhoto={`${getHost()}/images/customers/${
            this.state.user.Image
          }`}
          isCartVisible="false"
        />
        <p id="cart-title">
          <div>
            <i className="bi bi-cart4"></i>Cart
          </div>
          <div>
            <i className="bi bi-list-nested"></i>
            {this.state.items.length} Items
          </div>
        </p>
        <div id="cart-inner">
          <div id="cart-table-body">
            {this.state.items.length !== 0 ? (
              this.state.items.map((item) => {
                return (
                  <CartItemCard
                    itemId={item.id}
                    key={item.id}
                    photo={item.photo}
                    name={item.name}
                    price={item.price}
                    count={item.count}
                    onRemove={this.itemRemoved}
                    isAvailable={true}
                    onItemChange={this.itemChanged}
                  />
                );
              })
            ) : (
              <div id="no-cart-items">
                <p>There is no cart items here...</p>
                <img alt="" src={NoItemsImg} draggable={false} />
              </div>
            )}
            <div id="cart-table-body-loading">
              <CircleLoader isActive="true" />
            </div>
          </div>
          {this.state.items.length !== 0 ? (
            <RichTextBox
              inputId="cart-notes"
              style={{ minWidth: "100%" }}
              inputStyle={{ minHeight: "150px" }}
              placeholder="Notes..."
            />
          ) : null}
          <div id="cart-summary">
            {this.state.items.length !== 0 ? (
              <p>
                Total Price: <span>${this.state.cartTotal}</span>
              </p>
            ) : null}
            <div id="cart-controls">
              <DefaultButton
                text="Continue Shopping"
                type="outline"
                onClick={this.continueClicked}
              />
              {this.state.items.length !== 0 ? (
                <DefaultButton text="Checkout" onClick={this.checkoutClicked} />
              ) : null}
            </div>
          </div>
        </div>
        <Footer />
        <MessageBox
          title={this.state.messageBoxTitle}
          description={this.state.messageBoxDescription}
          type={this.state.messageBoxType}
          controls={this.state.messageBoxControls}
          onValueSelected={this.state.messageBoxOnValueSelected}
          isOpen={this.state.isCartMessageBoxOpen}
        />
      </div>
    );
  }
}

export default Cart;
