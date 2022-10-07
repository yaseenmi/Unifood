import React, { Component } from "react";
import Header from "../fixtures/Header";
import "./styles/Products.css";
import $ from "jquery";
import CustomerProductCard from "../cards/CustomerProductCard";
import Footer from "../fixtures/Footer";
import SelectBox from "../inputs/SelectBox";
import Axios from "axios";
import CircleLoader from "../loaders/CircleLoader";
import getHost from "../assitance-methods/getHost";
import Cookies from "../assitance-methods/Cookies";
import IconButton from "../inputs/IconButton";
import StringProcessor from "../assitance-methods/StringProcessor";
import NoProductsImg from "../../assets/vectors/Empty.svg";
import stringProcessor from "../assitance-methods/StringProcessor";

class Products extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.rootRef = React.createRef();

    this.id = 0;

    // State Object
    this.state = {
      isNotificationsOpen: "false",
      notificationsCount: null,
      cartCount: null,
      products: [],
      isRestaurantClosed: 0,
      categories: ["All"],
      fitlers: [
        "None",
        "Top Rated",
        "Newest",
        "Available Only",
        "Offered Products",
        "My Favorites",
      ],
      restaurantImage: null,
      restaurantName: "",
      restaurantID: null,
      selectedCategoryIndex: "",
      selectedFilterIndex: "0",
      filterProducts: [],
      selectedFilter: "None",
      selectedCategory: "All",
      user: {},
    };

    // Binding Methods
    this.notificationsClosed = this.notificationsClosed.bind(this);
    this.getNotifications = this.getNotifications.bind(this);
    this.notificationsClicked = this.notificationsClicked.bind(this);
    this.searchClicked = this.searchClicked.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.categorySelected = this.categorySelected.bind(this);
    this.filterSelected = this.filterSelected.bind(this);
    this.productAdded = this.productAdded.bind(this);
    this.getRestaurant = this.getRestaurant.bind(this);
    this.setSelectedCategoryIndex = this.setSelectedCategoryIndex.bind(this);
    this.setSelectedFilterIndex = this.setSelectedFilterIndex.bind(this);
    this.triggerPopState = this.triggerPopState.bind(this);
    this.checkParameter = this.checkParameter.bind(this);
    this.getParameter = this.getParameter.bind(this);
    this.getCartCount = this.getCartCount.bind(this);
    this.getUser = this.getUser.bind(this);
    this.setNotificationsCount = this.setNotificationsCount.bind(this);
    this.checkSignIn = this.checkSignIn.bind(this);
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
    let sp = StringProcessor;
    let name = sp.decodeURLWord(params.name);
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
          let sp = StringProcessor;
          let urlParams = new URLSearchParams(window.location.search);
          let paramName1 = "category";
          let paramName2 = "filter";
          let filter = "None";
          if (this.checkParameter(paramName2))
            filter = sp.capitalizeEachWord(
              sp.decodeURLWord(this.getParameter(paramName2))
            );
          let getAll = urlParams.has(paramName1) ? false : true;
          if (getAll) this.setState({ selectedCategoryIndex: "0" });
          this.getProducts(urlParams.get(paramName1), getAll, filter);
          this.getCategories();
          this.triggerPopState();
        }
      );
    });
  }
  productAdded(id, added) {
    let count = !this.state.cartCount ? 0 : parseInt(this.state.cartCount);
    count = added ? count + 1 : count - 1;
    if (count === 0) {
      this.setState({ cartCount: null });
      return;
    }
    this.setState({ cartCount: count });
  }
  triggerPopState() {
    window.addEventListener("popstate", (e) => {
      let sp = StringProcessor;
      let urlParams = new URLSearchParams(window.location.search);
      let paramName = "category";
      let filter = "None";
      if (urlParams.has("filter")) {
        filter = sp.capitalizeEachWord(
          sp.decodeURLWord(urlParams.get("filter"))
        );
      }
      let getAll = urlParams.has(paramName) ? false : true;
      if (getAll) this.setState({ selectedCategoryIndex: "0" });
      this.getProducts(urlParams.get(paramName), getAll, filter);
    });
  }
  categorySelected(value, i) {
    let getAll = false;
    if (value === "All") getAll = true;
    this.getProducts(value, getAll, this.state.selectedFilter);
    this.setState({ selectedCategoryIndex: i });
  }
  filterSelected(value, i) {
    let category = this.state.selectedCategory;
    let getAll = category === "All" ? true : false;
    this.getProducts(category, getAll, value);
    this.setState({ selectedFilter: value });
    this.setState({ selectedFilterIndex: i });
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
  getProducts(category, getAll = false, filter = null) {
    let formData = {
      category: category,
      id: Cookies.get("id"),
      restId: this.state.restaurantID,
      getAll: getAll,
    };
    let current = this.rootRef.current;
    let loader = document.querySelector("#products-loader");
    let main = document.querySelector("main");
    let mainIll = document.querySelector("#no-products-ill");
    main.setAttribute("id", "products-main");
    mainIll.style.display = "none";

    loader.style.display = "flex";
    if (filter === null) filter = this.state.selectedFilter;
    if (category === null) category = "All";
    Axios.post(`${getHost()}/customer/getproducts`, formData).then(
      (response) => {
        let data = response.data;
        console.log(data);
        if (data.hasError) window.location.replace("/restaurants");
        this.setState({ selectedCategory: category });
        if (filter === "Top Rated") {
          data = data.filter((prod) => prod.Rate >= 3);
        } else if (filter === "Newest") {
          data = data.filter((prod) => prod.IsNew);
        } else if (filter === "Available Only") {
          data = data.filter((prod) => prod.IsAvailable === 1);
        } else if (filter === "My Favorites") {
          data = data.filter((prod) => prod.IsFavorite === true);
        } else if (filter === "Offered Products") {
          data = data.filter((prod) => prod.HasOffer === true);
        }
        this.setState({ selectedFilter: filter }, () => {
          if (category === "All") {
            window.history.replaceState(
              { category: null, filter: this.state.selectedFilter },
              document.title,
              `?filter=${StringProcessor.encodeURLWord(
                this.state.selectedFilter
              )}`
            );
          } else {
            window.history.replaceState(
              { category: category, filter: filter },
              document.title,
              `?category=${category.toLowerCase()}&filter=${StringProcessor.encodeURLWord(
                filter
              )}`
            );
          }
        });
        this.setState({ products: data }, () => {
          if (data.length === 0) {
            main.setAttribute("id", "no-products");
            mainIll.style.display = "flex";
          }
          setTimeout(() => {
            if (loader) loader.style.display = "none";
          }, 200);
        });
      }
    );
  }
  getCategories() {
    let api = `${getHost()}/customer/getcategories`;
    Axios.post(api, { restId: this.state.restaurantID }).then((response) => {
      let data = response.data.map((d) => {
        return d.Name;
      });
      this.setState({ categories: this.state.categories.concat(data) }, () => {
        this.setSelectedCategoryIndex();
        this.setSelectedFilterIndex();
      });
    });
  }
  setSelectedFilterIndex() {
    let sp = StringProcessor;
    let urlParams = new URLSearchParams(window.location.search);
    let paramName = "filter";
    let has = urlParams.has(paramName) ? true : false;
    if (has) {
      let param = sp.capitalizeEachWord(
        sp.decodeURLWord(urlParams.get(paramName))
      );
      this.state.fitlers.forEach((filt, i) => {
        if (filt === param) {
          this.setState({ selectedFilterIndex: i.toString() });
          return;
        }
      });
    }
  }
  setSelectedCategoryIndex() {
    let sp = StringProcessor;
    let urlParams = new URLSearchParams(window.location.search);
    let paramName = "category";
    let has = urlParams.has(paramName) ? true : false;
    if (has) {
      let param = sp.decodeURLWord(urlParams.get(paramName));
      this.state.categories.forEach((cate, i) => {
        if (cate.toLowerCase() === param) {
          this.setState({ selectedCategoryIndex: i.toString() });
          return;
        }
      });
    }
  }
  getCartCount() {
    let storage = localStorage;
    let items = JSON.parse(storage.getItem("items"));
    if (!items || items.length === 0) return null;
    return items.length.toString();
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
    this.setState({ cartCount: this.getCartCount() });
    this.setNotificationsCount();
    this.getUser();
    this.getRestaurant();
    this.id = this.props.id;
    setTimeout(() => {
      this.setSelectedCategoryIndex();
    }, 200);
  }
  componentDidUpdate() {}

  UNSAFE_componentWillReceiveProps(newPro) {}
  render() {
    return (
      <div
        id="products-container"
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
        <div id="prodcuts-header">
          <div id="product-header-left">
            <IconButton
              id="products-back-btn"
              iconClass="fa fa-arrow-left"
              tooltip="Back"
              onClick={() => {
                window.location.href = "/restaurants";
              }}
            />
            <div id="restaurant-img-container">
              <a
                href={`/restaurants/${StringProcessor.encodeURLWord(
                  this.state.restaurantName
                )}`}
              >
                <img
                  id="restaurant-img"
                  alt=""
                  src={this.state.restaurantImage}
                  onLoad={() => {
                    let loader = document.querySelector(
                      "#restaurant-img-loader"
                    );
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
          <div id="product-header-right">
            <SelectBox
              items={this.state.categories}
              selectedIndex={this.state.selectedCategoryIndex}
              notInitial
              placeholder="Category"
              onValueSelected={this.categorySelected}
            />
            <SelectBox
              items={this.state.fitlers}
              notInitial
              selectedIndex={this.state.selectedFilterIndex}
              placeholder="Filter By"
              onValueSelected={this.filterSelected}
            />
          </div>
        </div>
        <main id="products-main">
          <div id="no-products-ill">
            <img alt="" src={NoProductsImg} />
            <p>
              Category '{this.state.selectedCategory}' and filter '
              {this.state.selectedFilter}' not match...
            </p>
          </div>
          {this.state.products.map((product, i) => {
            let hasTags = false;            
            let isAvailable =
              this.state.isRestaurantClosed === 0
                ? Boolean(product.IsAvailable)
                : false;
            if (!isAvailable || product.IsNew || product.HasOffer)
              hasTags = true;
            return (
              <CustomerProductCard
                id={product.ID}
                restaurantName={this.state.restaurantName}
                isFavorite={product.IsFavorite}
                name={product.Name}
                price={
                  "$" +
                  (product.HasOffer
                    ? ((100 - product.OfferPercentage) * product.Price) / 100
                    : product.Price)
                }
                description={product.Description}
                photo={`${getHost()}/images/restaurants/${
                  this.state.restaurantName
                }/products/${product.Image}`}
                onProductAdd={this.productAdded}
                hasTags={hasTags}
                isOffer={product.HasOffer}
                isNew={product.IsNew}
                isAvailable={isAvailable}
                rating={product.Rate}
                offerTooltip={product.OfferDescription}
                removeOnFavorite={
                  this.state.selectedFilter === "My Favorites" ? true : false
                }
              />
            );
          })}
        </main>
        <Footer />
        <div id="products-loader">
          <CircleLoader isActive="true" />
        </div>
      </div>
    );
  }
}

export default Products;
