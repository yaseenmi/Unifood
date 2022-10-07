import React, { Component } from "react";
import DefaultButton from "../inputs/DefaultButton";
import IconButton from "../inputs/IconButton";
import Badges from "../labels/Badges";
import CircleLoader from "../loaders/CircleLoader";
import "./styles/CustomerProductCard.css";
import AOS from "aos";
import Cookies from "../assitance-methods/Cookies";
import Axios from "axios";
import getHost from "../assitance-methods/getHost";
import StringProcessor from "../assitance-methods/StringProcessor";

class CustomerProductCard extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.rootRef = React.createRef();

    // State Object
    this.state = {
      counter: props.counter ? props.counter : 1,
      isFavorite: props.isFavorite,
      cartButton: {
        text: (
          <span style={{ color: "var(--secondry-text-color)" }}>
            Add To Cart&nbsp;&nbsp;&nbsp;
          </span>
        ),
        icon: "bi bi-cart-plus",
      },
      isAddedToCart: false,
    };
    this.isBusy = false;

    // Binding Methods
    this.addToFavorites = this.addToFavorites.bind(this);
    this.minusClicked = this.minusClicked.bind(this);
    this.plusClicked = this.plusClicked.bind(this);
    this.photoLoaded = this.photoLoaded.bind(this);
    this.viewDetailsClicked = this.viewDetailsClicked.bind(this);
    this.addToCartClicked = this.addToCartClicked.bind(this);
    this.checkAddToCart = this.checkAddToCart.bind(this);
  }
  addToCartClicked(e) {
    if (!this.props.isAvailable) return;
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

    if (productAdded) {
      items.push({
        id: this.props.id,
        photo: this.props.photo,
        name: this.props.name,
        price: parseInt(this.props.price.slice(1)) * this.state.counter,
        count: this.state.counter,
      });
    } else {
      items = items.filter((x) => x.id !== this.props.id);
    }
    let cartTotal = 0;
    items.forEach((item) => {      
      cartTotal = cartTotal + item.price;      
    });
    storage.setItem("cartTotal", cartTotal);
    storage.setItem("items", JSON.stringify(items));
    if (this.props.onProductAdd)
      this.props.onProductAdd(this.props.id, productAdded);
  }
  checkAddToCart() {
    let storage = localStorage;
    let items = JSON.parse(storage.getItem("items"));
    if (!items) return;
    let index = items.findIndex((x) => x.id === this.props.id);
    let text, icon;
    if (index > -1) {
      setTimeout(() => {
        let current = this.rootRef.current;
        if (!current) return;
        let target = current.querySelector("#customer-product-card-add");
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
        let target = current.querySelector("#customer-product-card-add");
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
  viewDetailsClicked() {
    window.location.href = `/restaurant/${StringProcessor.encodeURLWord(this.props.restaurantName)}/product/${this.props.id}`;
  }
  photoLoaded(e) {
    let target = e.currentTarget;
    let loader = target.parentElement.children[1];
    if (loader) loader.remove();
  }
  addToFavorites() {
    let process = "add";
    if (this.state.isFavorite) process = "remove";

    let formData = {
      id: Cookies.get("id"),
      productId: this.props.id,
      process: process,
    };
    let api = `${getHost()}/customer/addremovefavorite`;

    Axios.post(api, formData).then((response) => {
      let data = response.data;      
    });
    this.setState({ isFavorite: !this.state.isFavorite }, () => {
      if (this.props.removeOnFavorite)
      {
        let current = this.rootRef.current;
        current.style.transform = "scale(0.5)";
        current.style.opacity = "0";
        setTimeout(() => {
          current.remove();
        }, 300)        
      }      
    });
  }
  minusClicked() {
    let current = this.rootRef.current;
    let display = current.querySelectorAll(".customer-product-card-counter p");
    let oldCounter = this.state.counter;
    let newCounter = oldCounter > 1 ? oldCounter - 1 : oldCounter;
    display.innerText = newCounter;
    this.setState({ counter: newCounter });
  }
  plusClicked() {
    let current = this.rootRef.current;
    let display = current.querySelectorAll(".customer-product-card-counter p");
    let oldCounter = this.state.counter;
    let newCounter = oldCounter < 10000 ? oldCounter + 1 : oldCounter;
    display.innerText = newCounter;
    this.setState({ counter: newCounter });
  }
  componentDidMount() {
    AOS.init();
    this.checkAddToCart();
  }
  componentDidUpdate() {}
  UNSAFE_componentWillReceiveProps(newPro) {
    this.setState({
      isFavorite: newPro.isFavorite,
      counter: newPro.counter ? newPro.counter : this.state.counter,
    });    
    setTimeout(() => {
      this.checkAddToCart();
    }, 100);
  }
  render() {
    return (
      <div
        className="customer-product-card-container"
        id={this.props.id}
        ref={this.rootRef}
        onClick={this.props.onClick}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        onMouseOver={this.props.onMouseOver}
        style={this.props.style}
        data-aos="fade-up"
        data-aos-once="true"
      >
        <div className="cutsomer-product-card-top">
          <div
            className="cutsomer-product-card-img-container"
            onClick={this.viewDetailsClicked}
          >
            <img
              src={this.props.photo}
              loading="lazy"
              onLoad={this.photoLoaded}
            />
            <div className="cutsomer-product-card-img-loader">
              <CircleLoader isActive="true" />
            </div>
          </div>
          <div className="customer-product-card-detail-1">
            <p onClick={this.viewDetailsClicked}>{this.props.name}</p>
            <span>{this.props.price}</span>
          </div>
          {this.props.hasTags ? (
            <div className="customer-product-card-tags">
              {this.props.isNew ? (
                <Badges text="new" background="var(--error-color)" />
              ) : null}
              {this.props.isOffer ? (
                <Badges
                  text="offer"
                  background="var(--info-color)"
                  tooltip={this.props.offerTooltip}
                />
              ) : null}
              {!this.props.isAvailable ? (
                <Badges
                  iconClass="bi bi-exclamation-diamond-fill"
                  text="not available"
                  color="gray"
                  background="#ccc"
                />
              ) : null}
            </div>
          ) : null}
          <div className="customer-product-card-rate">
            {["", "", "", "", ""].map((star, i) => {
              let editedStar = <i className="bi bi-star"></i>;
              if (i < this.props.rating)
                editedStar = <i className="bi bi-star-fill"></i>;
              return editedStar;
            })}
          </div>
          {this.props.description !== undefined ? (
            <div className="customer-product-card-detail-2">
              {this.props.description}
            </div>
          ) : null}
        </div>
        <div className="cutsomer-product-card-bottom">
          <div className="customer-product-card-controls">
            <div className="customer-product-card-counter">
              <IconButton iconClass="fa fa-plus" onClick={this.plusClicked} />
              <span className="customer-product-card-count">
                {this.state.counter}
              </span>
              <IconButton iconClass="fa fa-minus" onClick={this.minusClicked} />
            </div>
            <IconButton
              tooltip={this.state.isFavorite ? "Unfavorite" : "Favorite"}
              id="customer-product-card-add-to-favorites"
              onClick={this.addToFavorites}
              iconClass={
                this.state.isFavorite ? "fa fa-heart" : "fa fa-heart-o"
              }
            />
          </div>
          <DefaultButton
            id="customer-product-card-add"
            onClick={this.addToCartClicked}
            text={this.state.cartButton.text}
            iconClass={this.state.cartButton.icon}
            disabled={this.props.isAvailable === false ? true : false}
          />
          <DefaultButton
            onClick={this.viewDetailsClicked}
            text="View Details&nbsp;&nbsp;&nbsp;"
            iconClass="bi bi-box-arrow-up-right"
            type="outline"
          />
        </div>
      </div>
    );
  }
}

export default CustomerProductCard;
