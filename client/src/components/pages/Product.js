import React, { Component } from "react";
import "./styles/Product.css";
import $, { contains } from "jquery";
import Header from "../fixtures/Header";
import Axios from "axios";
import NoCommentsImg from "../../assets/vectors/NoComments.svg";
import Footer from "../fixtures/Footer";
import Badges from "../labels/Badges";
import IconButton from "../inputs/IconButton";
import DefaultButton from "../inputs/DefaultButton";
import TextBox from "../inputs/TextBox";
import CustomerReviewCard from "../cards/CustomerReviewCard";
import getIndexOfElement from "../assitance-methods/getIndexOfElement";
import CircleLoader from "../loaders/CircleLoader";
import getHost from "../assitance-methods/getHost";
import Cookies from "../assitance-methods/Cookies";
import stringProcessor from "../assitance-methods/StringProcessor";

class Product extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.rootRef = React.createRef();

    // State Object
    this.state = {
      isNotificationsOpen: "false",
      notificationsCount: null,
      cartCount: null,
      from: "Deep House",
      name: <CircleLoader isActive="true" size="small" />,
      price: "0.00",
      description: <CircleLoader isActive="true" />,
      isAddedToCart: false,
      isFavorite: false,
      isRated: false,
      rating: 1,
      counter: props.counter ? props.counter : 1,
      hasTags: true,
      isNew: false,
      isOffer: false,
      offerTooltip: undefined,
      isAvailable: true,
      image: null,
      isExist: 1,
      cartButton: {
        text: (
          <span style={{ color: "var(--secondry-text-color)" }}>
            Add To Cart&nbsp;&nbsp;&nbsp;
          </span>
        ),
        icon: "bi bi-cart-plus",
        customerRating: 1,
      },
      reviews: [],
      reviewsLoading: "true",
      user: {},
      restaurantName: "-------",
      restaurantImage: null,
      restaurantID: 0,
      isRestaurantClosed: false,
      firstTimeRating: true,
    };
    this.isBusy = false;

    // Binding Methods
    this.notificationsClosed = this.notificationsClosed.bind(this);
    this.getNotifications = this.getNotifications.bind(this);
    this.notificationsClicked = this.notificationsClicked.bind(this);
    this.searchClicked = this.searchClicked.bind(this);
    this.minusClicked = this.minusClicked.bind(this);
    this.plusClicked = this.plusClicked.bind(this);
    this.addToFavorites = this.addToFavorites.bind(this);
    this.addToCartClicked = this.addToCartClicked.bind(this);
    this.rateThisClicked = this.rateThisClicked.bind(this);
    this.starClicked = this.starClicked.bind(this);
    this.closeRating = this.closeRating.bind(this);
    this.submitRatingClicked = this.submitRatingClicked.bind(this);
    this.getReviews = this.getReviews.bind(this);
    this.insertClicked = this.insertClicked.bind(this);
    this.addReviewKeyUpped = this.addReviewKeyUpped.bind(this);
    this.getUser = this.getUser.bind(this);
    this.getCartCount = this.getCartCount.bind(this);
    this.getProduct = this.getProduct.bind(this);
    this.getRestaurant = this.getRestaurant.bind(this);
    this.checkParameter = this.checkParameter.bind(this);
    this.getParameter = this.getParameter.bind(this);
    this.checkAddToCart = this.checkAddToCart.bind(this);
    this.getCustomerRate = this.getCustomerRate.bind(this);
    this.starSelected = this.starSelected.bind(this);
    this.setNotificationsCount = this.setNotificationsCount.bind(this);
    this.checkSignIn = this.checkSignIn.bind(this);
    this.setProductImage = this.setProductImage.bind(this);
  }
  setProductImage() {
    let current = this.rootRef.current;
    console.log(current.querySelector("#product-intro"));
    current.querySelector(
      "#product-intro"
    ).style.backgroundImage = `url("${getHost()}/images/restaurants/${
      this.state.restaurantName
    }/products/${this.state.image}")`;
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
  getCustomerRate() {
    let formData = {
      id: Cookies.get("id"),
      pid: parseInt(this.props.match.params.id),
    };
    let api = `${getHost()}/customer/getrating`;
    Axios.post(api, formData).then((response) => {
      let data = response.data;
      let value = data.data.value;
      this.setState({ customerRating: value });
      this.starSelected(
        document.querySelectorAll("#rating-dial-stars i")[value - 1]
      );
      if (data.message === "first") this.setState({ firstTimeRating: true });
      else this.setState({ firstTimeRating: false });
    });
  }
  checkAddToCart() {
    let storage = localStorage;
    let items = JSON.parse(storage.getItem("items"));
    if (!items) return;
    let index = items.findIndex(
      (x) => x.id === parseInt(this.props.match.params.id)
    );
    let text, icon;
    if (index > -1) {
      setTimeout(() => {
        let current = this.rootRef.current;
        if (!current) return;
        let target = current.querySelector("#product-add");
        target.classList.add("remove-from-cart-btn");
      }, 100);
      this.setState({ counter: items[index].count });
      text = (
        <span style={{ color: "var(--secondry-text-color)" }}>
          Remove From Cart&nbsp;&nbsp;&nbsp;
        </span>
      );
      icon = "bi bi-cart-dash";
    } else {
      setTimeout(() => {
        let current = this.rootRef.current;
        if (!current) return;
        let target = current.querySelector("#product-add");
        target.classList.remove("remove-from-cart-btn");
        this.setState({ counter: 1 });
      }, 100);
      text = (
        <span style={{ color: "var(--secondry-text-color)" }}>
          Add To Cart&nbsp;&nbsp;&nbsp;
        </span>
      );
      icon = "bi bi-cart-plus";
    }
    this.setState({
      cartButton: {
        text: text,
        icon: icon,
      },
    });
  }
  checkParameter(name) {
    let urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has(name)) return true;
    return false;
  }
  getParameter(name) {
    let urlParams = new URLSearchParams(window.location.search);
    if (this.checkParameter(name)) return urlParams.get(name);
    return "?";
  }
  getRestaurant() {
    let params = this.props.match.params;
    let name = stringProcessor.decodeURLWord(params.restaurant);
    let restaurantData = { name: name };
    let api = `${getHost()}/customer/getrestaurantbyname`;
    Axios.post(api, restaurantData).then((response) => {
      let data = response.data;
      let image = `${getHost()}/images/restaurants-images/${data.Image}`;
      let isClosed = data.IsClosed;
      let id = data.ID;
      let restaurantName = data.Name;
      this.setState(
        {
          restaurantName: restaurantName,
          restaurantImage: image,
          restaurantID: id,
          isRestaurantClosed: isClosed,
        },
        () => {
          this.getProduct();
        }
      );
    });
  }
  getCartCount() {
    let storage = localStorage;
    let items = JSON.parse(storage.getItem("items"));
    if (!items || items.length === 0) return null;
    return items.length.toString();
  }
  addReviewKeyUpped(e) {
    if (e.keyCode === 13) this.insertClicked();
  }
  insertClicked() {
    let textbox = document.querySelector("#add-review-tbx");
    let text = textbox.value;
    let sp = stringProcessor;
    let formDate = {
      pid: this.props.match.params.id,
      id: Cookies.get("id"),
      text: sp.escapeSQ(text),
    };
    let api = `${getHost()}/customer/addreview`;
    if (text === "") return;
    textbox.value = "";
    Axios.post(api, formDate).then((response) => {
      let data = response.data;
      this.setState({
        reviews: [
          {
            ID: data.data.ID,
            Name: this.state.user.Name,
            Image: this.state.user.Image,
            Text: text,
            Date: "Just Now",
            Like: 0,
            Dislike: 0,
            UserID: parseInt(Cookies.get("id")),
            canReact: false,
          },
          ...this.state.reviews,
        ],
      });
    });
  }
  getReviews() {
    let formData = {
      pid: this.props.match.params.id,
      id: Cookies.get("id"),
    };
    let api = `${getHost()}/customer/getreviews`;
    Axios.post(api, formData).then((response) => {
      let data = response.data;
      this.setState({ reviews: data }, () => {
        this.setState({ reviewsLoading: "false" });
      });
    });
  }
  submitRatingClicked() {
    let dial = document.querySelector("#rating-dial");
    dial.innerHTML =
      "<div class='thanks-rating'>Thanks for rating! <i class='fa fa-check'></i><div>";
    let api = `${getHost()}/customer/addrating`;
    let formData = {
      id: parseInt(Cookies.get("id")),
      pid: parseInt(this.props.match.params.id),
      value: this.state.customerRating,
    };
    Axios.post(api, formData).then((response) => {
      let data = response.data;
      this.setState({ firstTimeRating: false });
      setTimeout(() => {
        this.closeRating();
      }, 1500);
    });
  }
  starSelected(s) {
    let target = s;
    let stars = document.querySelector("#rating-dial-stars");
    let star = document.querySelectorAll("#rating-dial-stars i");
    let index = getIndexOfElement(target, "bi", stars);
    let caption = document.querySelector("#rating-dial-caption");
    let captions = [
      "Never try this 😔",
      "It has chance to try 😐",
      "Good product 🙂",
      "Excellent product 😄",
      "I extremly recommend this 😍",
    ];
    caption.innerText = captions[index];
    for (let i = 0; i < 5; i++) {
      if (i <= index) star[i].setAttribute("class", "bi bi-star-fill");
      else star[i].setAttribute("class", "bi bi-star");
    }
    this.setState({ customerRating: index + 1 });
  }
  starClicked(e) {
    this.starSelected(e.currentTarget);
  }
  closeRating() {
    let box = document.querySelector("#rating-dial-container");
    box.style.display = "none";
  }
  addToCartClicked(e) {
    if (!this.state.isAvailable) return;
    let target = e.currentTarget;
    target.classList.toggle("remove-from-cart-btn");
    let oldIcon = this.state.cartButton.icon;
    let iconClass = "bi bi-cart-plus";
    let text =
      oldIcon === iconClass ? (
        <span style={{ color: "var(--secondry-text-color)" }}>
          Remove From Cart&nbsp;&nbsp;&nbsp;
        </span>
      ) : (
        <span style={{ color: "var(--secondry-text-color)" }}>
          Add To Cart&nbsp;&nbsp;&nbsp;
        </span>
      );
    let icon = oldIcon === iconClass ? "bi bi-cart-dash" : iconClass;
    this.setState({
      cartButton: {
        text: text,
        icon: icon,
      },
    });
    let productAdded = oldIcon === iconClass ? true : false;
    let storage = localStorage;
    if (!storage.getItem("items")) storage.setItem("items", JSON.stringify([]));
    let items = JSON.parse(storage.getItem("items"));
    let cartCounter =
      this.state.cartCount !== null ? parseInt(this.state.cartCount) : 0;
    if (productAdded) {
      items.push({
        id: parseInt(this.props.match.params.id),
        photo: `${getHost()}/images/restaurants/${
          this.state.restaurantName
        }/products/${this.state.image}`,
        name: this.state.name,
        price: parseInt(this.state.price) * this.state.counter,
        count: this.state.counter,
      });
      this.setState({ cartCount: cartCounter + 1 });
    } else {
      items = items.filter(
        (x) => x.id !== parseInt(this.props.match.params.id)
      );
      this.setState({
        cartCount: cartCounter === 1 ? null : cartCounter - 1,
        counter: 1,
      });
    }
    let cartTotal = 0;
    items.forEach((item) => {
      cartTotal = cartTotal + item.price;
    });
    storage.setItem("cartTotal", cartTotal);
    storage.setItem("items", JSON.stringify(items));
  }
  rateThisClicked() {
    let box = document.querySelector("#rating-dial-container");
    box.style.display = "block";
  }
  addToFavorites() {
    let process = this.state.isFavorite ? "remove" : "add";

    let formData = {
      id: Cookies.get("id"),
      productId: parseInt(this.props.match.params.id),
      process: process,
    };
    let api = `${getHost()}/customer/addremovefavorite`;

    Axios.post(api, formData).then((response) => {
      let data = response.data;
    });
    this.setState({ isFavorite: !this.state.isFavorite });
  }
  minusClicked(e) {
    let current = this.rootRef.current;
    let display = current.querySelectorAll(".customer-product-card-counter p");
    let oldCounter = this.state.counter;
    let newCounter = oldCounter > 1 ? oldCounter - 1 : oldCounter;
    display.innerText = newCounter;
    this.setState({ counter: newCounter });
  }
  plusClicked(e) {
    let current = this.rootRef.current;
    let display = current.querySelectorAll(".customer-product-card-counter p");
    let oldCounter = this.state.counter;
    let newCounter = oldCounter < 10000 ? oldCounter + 1 : oldCounter;
    display.innerText = newCounter;
    this.setState({ counter: newCounter });
  }
  notificationsClosed() {
    if (this.state.isNotificationsOpen === "true") {
      this.setState({ isNotificationsOpen: "false" });
    }
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
  getProduct() {
    let formData = {
      id: Cookies.get("id"),
      pid: this.props.match.params.id,
    };
    const api = `${getHost()}/customer/getproductbyid`;
    Axios.post(api, formData).then((response) => {
      let data = response.data;
      console.log(data);
      if (data.IsExist === 0) window.location.replace("/restaurants");
      let hasTags = false;
      let isAvailable =
        this.state.isRestaurantClosed === 0 ? Boolean(data.IsAvailable) : false;
      if (data.HasOffer || !isAvailable || data.IsNew)
        hasTags = true;
      this.setState(
        {
          from: "Deep House",
          name: data.Name,
          price: `${
            data.HasOffer
              ? ((100 - data.OfferPercentage) * data.Price) / 100
              : data.Price
          }`,
          description: data.Description,
          isAddedToCart: false,
          isFavorite: data.IsFavorite,
          isRated: false,
          rating: data.Rate,
          counter: 1,
          hasTags: true,
          isNew: data.IsNew,
          isOffer: data.HasOffer,
          offerTooltip: data.HasOffer ? data.OfferDescription : null,
          isAvailable: isAvailable,
          image: data.Image,
          isExist: data.IsExist,
        },
        () => {
          this.setProductImage();
          this.checkAddToCart();
          this.getCustomerRate();
        }
      );
    });
  }
  componentDidMount() {
    if (!this.checkSignIn()) {
      window.location.replace("/");
      return;
    }
    this.setState({ cartCount: this.getCartCount() });
    this.setNotificationsCount();
    this.getRestaurant();
    this.getUser();
    this.getReviews();
  }
  componentDidUpdate() {}
  UNSAFE_componentWillReceiveProps(newPro) {}
  render() {
    return (
      <div
        id="product-container"
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

        <div id="product-header">
          <div id="restaurant-img-container">
            <a href={`/restaurants/${this.props.match.params.restaurant}`}>
              <img
                id="restaurant-img"
                alt=""
                src={this.state.restaurantImage}
                onLoad={() => {
                  let loader = document.querySelector("#restaurant-img-loader");
                  setTimeout(() => {
                    loader.style.display = "none";
                  }, 500);
                }}
              />
            </a>
            <div id="restaurant-img-loader">
              <CircleLoader isActive="true" size="small" />
            </div>
          </div>
          <div id="restaurant-name">
            {this.state.restaurantName}
            <div>
              {this.state.isRestaurantClosed === 0 ? "Open Now" : "Closed"}
              <i
                style={{
                  color:
                    this.state.isRestaurantClosed === 0
                      ? "var(--success-color)"
                      : "var(--error-color)",
                }}
                className="bi bi-circle-fill"
              ></i>
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundImage: `url(${`${getHost()}/images/restaurants/${
              this.state.restaurantName
            }/products/${this.state.image}`})`,
          }}
          id="product-intro"
        >
          <div id="product-intro-inner">
            <div id="product-top">
              <div id="product-detail-1">
                <p>{this.state.name}</p>
                <span>${this.state.price}</span>
              </div>
              <div id="product-detail-2">
                {this.state.hasTags ? (
                  <div id="product-tags">
                    {this.state.isNew ? (
                      <Badges text="new" background="var(--error-color)" />
                    ) : null}
                    {this.state.isOffer ? (
                      <Badges
                        text="offer"
                        background="var(--info-color)"
                        tooltip={this.state.offerTooltip}
                      />
                    ) : null}
                    {!this.state.isAvailable ? (
                      <Badges
                        iconClass="bi bi-exclamation-diamond-fill"
                        text="not available"
                        color="gray"
                        background="#ccc"
                      />
                    ) : null}
                  </div>
                ) : null}
                <div id="product-rating">
                  {["", "", "", "", ""].map((star, i) => {
                    let editedStar = <i className="bi bi-star"></i>;
                    if (i < this.state.rating)
                      editedStar = <i className="bi bi-star-fill"></i>;
                    return editedStar;
                  })}
                </div>
              </div>
              {this.state.description ? (
                <div id="product-detail-3">{this.state.description}</div>
              ) : null}
            </div>
            <div id="product-bottom">
              <div className="product-counter">
                <IconButton iconClass="fa fa-plus" onClick={this.plusClicked} />
                <span className="product-count">{this.state.counter}</span>
                <IconButton
                  iconClass="fa fa-minus"
                  onClick={this.minusClicked}
                />
              </div>
              <div id="product-controls">
                <IconButton
                  tooltip={this.state.isFavorite ? "Unfavorite" : "Favorite"}
                  id="customer-product-card-add-to-favorites"
                  onClick={this.addToFavorites}
                  iconClass={
                    this.state.isFavorite ? "fa fa-heart" : "fa fa-heart-o"
                  }
                />
                <DefaultButton
                  id="product-add"
                  onClick={this.addToCartClicked}
                  text={this.state.cartButton.text}
                  iconClass={this.state.cartButton.icon}
                  disabled={this.state.isAvailable === false ? true : false}
                />
                <DefaultButton
                  id="product-rate-btn"
                  onClick={this.rateThisClicked}
                  text={
                    this.state.firstTimeRating ? (
                      <span>Rate This&nbsp;&nbsp;&nbsp;</span>
                    ) : (
                      <span>Change My Rating&nbsp;&nbsp;&nbsp;</span>
                    )
                  }
                  iconClass="bi bi-hand-thumbs-up"
                  type="outline"
                />
              </div>
            </div>
          </div>
        </div>
        <section id="reviews-section">
          <div id="reviews-header">
            <p id="reviews-title">
              Reviews ({this.state.reviews.length}){" "}
              <CircleLoader isActive={this.state.reviewsLoading} size="small" />
            </p>
            {Boolean(this.state.user.IsBanned) ? (
              <div id="add-comment-banned">
                <i class="bi bi-exclamation-octagon-fill"></i>Sorry, but you're
                banned due to some unwanted behavior, review the restaurant for
                more info..
              </div>
            ) : (
              <div id="add-comment-section">
                <TextBox
                  onKeyUp={this.addReviewKeyUpped}
                  inputId="add-review-tbx"
                  placeholder="Add a review..."
                  autoComplete="off"
                />
                <DefaultButton text="Insert" onClick={this.insertClicked} />
              </div>
            )}
          </div>
          <div id="reviews-container">
            {this.state.reviews.length === 0 ? (
              <div id="no-reviews-container">
                <img alt="" src={NoCommentsImg} />
                <p>There is no reviews here, try to add your own :)</p>
              </div>
            ) : (
              this.state.reviews.map((review) => {
                return (
                  <CustomerReviewCard
                    isBanned={review.IsBanned}
                    name={review.Name}
                    review={review.Text}
                    time={review.Date}
                    profileLink="#"
                    likes={review.Like}
                    dislikes={review.Dislike}
                    userId={review.UserID}
                    reviewId={review.ID}
                    photo={`${getHost()}/images/customers/${review.Image}`}
                    canReact={review.CanReact}
                  />
                );
              })
            )}
          </div>
        </section>
        <div id="rating-dial-container">
          <div id="rating-dial-opacity-box" onClick={this.closeRating}></div>
          <div id="rating-dial">
            <div id="rating-dial-stars">
              <i className="bi bi-star-fill" onClick={this.starClicked}></i>
              <i className="bi bi-star" onClick={this.starClicked}></i>
              <i className="bi bi-star" onClick={this.starClicked}></i>
              <i className="bi bi-star" onClick={this.starClicked}></i>
              <i className="bi bi-star" onClick={this.starClicked}></i>
            </div>
            <p id="rating-dial-caption">Never try this 😔</p>
            <DefaultButton text="Submit" onClick={this.submitRatingClicked} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Product;
