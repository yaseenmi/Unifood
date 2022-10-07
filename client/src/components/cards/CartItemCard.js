import React, { Component } from "react";
import IconButton from "../inputs/IconButton";
import "./styles/CartItemCard.css";
import Badges from "../labels/Badges";
import getHost from "../assitance-methods/getHost";
import stringProcessor from "../assitance-methods/StringProcessor";

class CartItemCard extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.rootRef = React.createRef();

    // State Object
    this.state = {
      counter: 1,
      id: 0,
      price: this.props.price,
    };

    // Binding Methods
    this.plusClicked = this.plusClicked.bind(this);
    this.minusClicked = this.minusClicked.bind(this);
    this.removeClicked = this.removeClicked.bind(this);
    this.setStorageCounter = this.setStorageCounter.bind(this);
  }
  removeClicked() {
    this.rootRef.current.classList.add("cart-item-card-removed-state");
    setTimeout(() => {
      let current = this.rootRef.current;
      let storage = localStorage;
      let items = JSON.parse(storage.getItem("items"));
      items = items.filter((item) => item.id !== this.state.id);
      let ct = 0;
      items.forEach((item) => {
        ct = ct + item.price;        
      });
      storage.setItem("cartTotal", ct);
      storage.setItem("items", JSON.stringify(items));
      if (this.props.onRemove) this.props.onRemove(this.state.id);
    }, 300);
  }
  plusClicked() {
    let current = this.rootRef.current;
    let display = current.querySelectorAll(".cart-item-card-counter p");
    let oldCounter = this.state.counter;
    let newCounter = oldCounter < 10000 ? oldCounter + 1 : oldCounter;
    display.innerText = newCounter;
    this.setState({ counter: newCounter });
    this.setStorageCounter(newCounter);
    if (this.props.onItemChange) this.props.onItemChange("plus");
  }
  minusClicked() {
    let current = this.rootRef.current;
    let display = current.querySelectorAll(".cart-item-card-counter p");
    let oldCounter = this.state.counter;
    let newCounter = oldCounter > 1 ? oldCounter - 1 : oldCounter;
    display.innerText = newCounter;
    this.setState({ counter: newCounter });
    this.setStorageCounter(newCounter);
    if (this.props.onItemChange) this.props.onItemChange("minus");
  }
  setStorageCounter(newCounter) {
    let storage = localStorage;
    let items = JSON.parse(storage.getItem("items"));
    items.forEach((item) => {
      if (item.id === this.state.id) {
        let price = item.price / item.count;
        item.count = newCounter;
        item.price = price * newCounter;
        this.setState({ price: item.price });
        return;
      }
    });
    let ct = 0;
    items.forEach((item) => {
      ct = ct + item.price;
    });
    storage.setItem("cartTotal", ct);
    storage.setItem("items", JSON.stringify(items));
  }
  componentDidMount() {
    this.setState({ counter: this.props.count });
    this.setState({ id: this.props.itemId });
  }
  componentDidUpdate() {}
  UNSAFE_componentWillReceiveProps(newPro) {}
  render() {
    return (
      <div
        className="cart-item-card-container"
        id={this.props.id}
        ref={this.rootRef}
        onClick={this.props.onClick}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        onMouseOver={this.props.onMouseOver}
        style={this.props.style}
        itemId={this.props.itemId}
      >
        <div className="cart-item-card-details">
          <img
            className="cart-item-card-photo"
            alt=""
            src={this.props.photo}
            loading="lazy"
            draggable={false}
          />
          <p>{this.props.name}</p>
          {!this.props.isAvailable ? (
            <Badges
              text="not available"
              iconClass="bi bi-exclamation-diamond-fill"
              color="gray"
              background="rgb(204, 204, 204)"
            />
          ) : null}
        </div>
        <p className="cart-item-card-price-counter">
          {this.props.isAvailable ? (
            <div className="cart-item-card-counter">
              <IconButton iconClass="fa fa-plus" onClick={this.plusClicked} />
              <span className="customer-product-card-count">
                {this.state.counter}
              </span>
              <IconButton iconClass="fa fa-minus" onClick={this.minusClicked} />
            </div>
          ) : null}
          <span className="cart-item-card-price">${this.state.price}</span>
          <div className="trash-sep"></div>
          <IconButton
            iconClass="bi bi-trash"
            tooltip="Remove"
            onClick={this.removeClicked}
          />
        </p>
      </div>
    );
  }
}

export default CartItemCard;
