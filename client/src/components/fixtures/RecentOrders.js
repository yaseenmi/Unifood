import React, { Component } from "react";
import RecentOrderCard from "../cards/RecentOrderCard";
import "./styles/RecentOrders.css";
import Axios from "axios";
import Cookies from "../assitance-methods/Cookies";
import getHost from "../assitance-methods/getHost";
import NoOrdersImg from "../../assets/vectors/NoOrders.svg";

class RecentOrders extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.rootRef = React.createRef();

    // State Object
    this.state = {
      orders: [],
    };

    // Binding Methods
    this.getOrders = this.getOrders.bind(this);
  }
  getOrders() {
    let formData = {
      id: Cookies.get("id"),
    };
    let api = `${getHost()}/customer/getorders`;
    Axios.post(api, formData).then((response) => {
      let data = response.data;
      this.setState({ orders: data });
    });
  }
  componentDidMount() {
    this.getOrders();
  }
  componentDidUpdate() {}
  UNSAFE_componentWillReceiveProps(newPro) {}
  render() {
    return (
      <div
        id="recent-orders-container"
        className={this.props.className}
        ref={this.rootRef}
        onClick={this.props.onClick}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        onMouseOver={this.props.onMouseOver}
      >
        {this.state.orders.length === 0 ? (
          <div id="no-orders-ill">
            <img alt="" src={NoOrdersImg} />
            <p>There is no recent orders, try to order a new one...</p>
          </div>
        ) : (
          this.state.orders.map((order) => {
            return (
              <RecentOrderCard
                orderId={order.ID}
                status={order.Status}
                date={new Date(order.Date).toLocaleTimeString()}
                total={order.TotalPrice}
              />
            );
          })
        )}
      </div>
    );
  }
}

export default RecentOrders;
