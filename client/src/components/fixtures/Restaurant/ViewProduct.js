import React, { Component } from "react";
import "./styles/ViewProduct.css";
import "../../cards/styles/CardRestaurant.css";
import { NavLink, withRouter } from "react-router-dom";
import photo from "./../../../assets/images/Myphoto.jpg";
import axios from "axios";
import getHost from "../../assitance-methods/getHost";
class ViewProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: [],
      IsAvailable: "",
      restName: "",
      resultBackup: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3001/RestaurantEnter/login")
      .then((response) => {
        if (response.data.loggedIn === true) {
        } else {
          window.location.href = "/entry";
        }
      });

    axios.get("http://localhost:3001/Product/get").then((resp) => {
      this.setState({
        result: resp.data.result,
        resultBackup: resp.data.result,
        restName: resp.data.restName,
      });
    });
  }
  Search = (e) => {
    let value = e.target.value.trim().toLowerCase();
    let result = this.state.resultBackup.filter((el) =>
      el.Name.trim().toLowerCase().includes(value)
    );
    this.setState({ result: result });
  };
  render() {
    return (
      <div>
        <div className="background_restaurant">
          <div className="form-group">
            <input
              type="text"
              placeholder="Search For Product Name"
              onInput={this.Search}
              className="form-control"
            />
          </div>
          <div className="card_restaurant">
            <table className="restaurant_table">
              <thead className="restaurant_thead">
                <tr>
                  <th>Product</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody className="restaurant_tbody">
                {this.state.result.map((val) => {
                  if (val.IsAvailable === 1) {
                    this.state.IsAvailable = "Available";
                  } else {
                    this.state.IsAvailable = "Not Available";
                  }
                  return (
                    <tr>
                      <td>
                        {" "}
                        <NavLink
                          className="link"
                          to={`/restaurant_admin/product/product_detail/${val.ProductID}`}
                        >
                          <img
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                              border: "none",
                            }}
                            src={
                              `${getHost()}/images/restaurants/${this.state.restName}/products/${val.ProductImage}`
                            }
                            alt=""
                            onerror="this.style.display='none'"
                          />
                        </NavLink>
                      </td>
                      <td>
                        {" "}
                        <NavLink
                          className="link"
                          to={`/restaurant_admin/product/product_detail/${val.ProductID}`}
                        >
                          {val.Name}
                        </NavLink>
                      </td>
                      <td>
                        {" "}
                        <NavLink
                          className="link"
                          to={`/restaurant_admin/product/product_detail/${val.ProductID}`}
                        >
                          {val.CategoryName}
                        </NavLink>
                      </td>
                      <td>
                        {" "}
                        <NavLink
                          className="link"
                          to={`/restaurant_admin/product/product_detail/${val.ProductID}`}
                        >
                          {this.state.IsAvailable}
                        </NavLink>
                      </td>
                      <td>
                        {" "}
                        <NavLink
                          className="link"
                          to={`/restaurant_admin/product/product_detail/${val.ProductID}`}
                        >
                          {val.Price}
                        </NavLink>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ViewProduct);
