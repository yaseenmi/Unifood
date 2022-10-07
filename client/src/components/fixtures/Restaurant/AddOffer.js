import React, { Component } from "react";
import RadioButton from "../../inputs/RadioButton";
import "./styles/AddOffer.css";
import axios from "axios";
import TextBox from "../../inputs/TextBox";
import $ from "jquery";
import getHost from "../../assitance-methods/getHost";
class AddOffer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      val: 0.0,
      Price: "",
      percent: 0.0,
      ProductResult: [],
      result: [],
      Description: "",
      ProductID: "",
      Discount: "",
      Errormessage: "",
      Successmessage: "",
      errors: {
        discountError: "",
      },
    };
    this.handleDiscountChange = this.handleDiscountChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.discountFieldInputed = this.discountFieldInputed.bind(this);
  }

  handleDiscountChange = (event) => {
    this.setState({ Discount: event.target.value });
  };
  handlePriceChange = (event) => {
    this.setState({ Price: event.target.value });
  };
  handleSelectChange = (e) => {
    this.setState({ ProductID: e.target.value }, () => {
      let ProductID = this.state.ProductID;
      axios
        .get(`${getHost()}/Product/getPriceDescription/${ProductID}`)
        .then((resp) => {                    
          this.setState({ result: resp.data });
        });
    });
  };
  handleDescriptionChange = (event) => {
    this.setState({ Description: event.target.value });
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    let discountField = $("#add-discount-in");
    let discountValue = discountField.val();
    let discountError = $("#add-discount-error");

    let errors = this.state.errors;

    if (discountValue === "") {
      discountError.css("display", "flex").show();
      errors.discountError = "discount can't be empty.";
      this.setState({ errors });
    } else if (discountValue !== "" && discountValue <= 100) {
      const formData = new FormData();
      formData.append("Discount", this.state.Discount);
      formData.append("ProductID", this.state.ProductID);
      formData.append("Description", "Discount " + this.state.Discount + "%");
      await axios
        .post(`${getHost()}/Offer/insertOffer`, formData)
        .then((resp) => {
          this.setState({
            Successmessage: resp.data.Successmessage,
            Errormessage: resp.data.Errormessage,
          });
        });
    }
  };
  componentDidMount() {
    axios.get(`${getHost()}/RestaurantEnter/login`).then((response) => {
      if (response.data.loggedIn === true) {
      } else {
        window.location.href = "/entry";
      }
    });

    axios.get(`${getHost()}/Product/getProductList`).then((resp) => {
      this.setState({ ProductResult: resp.data });
    });
  }
  discountFieldInputed(e) {
    let discountValue = e.currentTarget.value;
    let discountError = $("#add-discount-error");
    let errors = this.state.errors;
    if (discountValue === "") {
      discountError.css("display", "flex").show();
      errors.discountError = "discount can't be empty.";
      this.setState({ errors });
    } else if (discountValue > 100) {
      discountError.css("display", "flex").show();
      errors.discountError = "discount can't be greater than 100";
      this.setState({ errors });
    } else {
      discountError.hide();
      errors.discountError = "";
      this.setState({ errors });
    }
  }
  render() {
    return (
      <div>
        <div className="background-add">
          <div className="card-addition">
            <div className="header-add">
              <h3>Add Offer</h3>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <select
                  className="form-control"
                  onChange={this.handleSelectChange}
                >
                  <option value="" selected disabled hidden>
                    Choose Product
                  </option>
                  {this.state.ProductResult.map((val) => {
                    return <option value={val.ProductID}>{val.Name}</option>;
                  })}
                </select>
              </div>
              {this.state.result.map((val) => {
                this.state.Description = val.ProductDescription;
                return (
                  <div>
                    <div className="form-group">
                      <input
                        type="number"
                        id="price"
                        placeholder="Price"
                        disabled
                        value={val.Price}
                        className="form-control"
                        onChange={this.handlePriceChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Description"
                        disabled
                        value={"Discount " + this.state.Discount + "%"}
                        onChange={this.handleDescriptionChange}
                      />
                    </div>

                    <div className="form-group">
                      <TextBox
                        inputId="add-discount-in"
                        errorId="add-discount-error"
                        error={this.state.errors.discountError}
                        type="number"
                        placeholder="Discount Percentage"
                        onChange={this.handleDiscountChange}
                        onInput={this.discountFieldInputed}
                      />
                      <p id="percentVal">
                        &nbsp; After Discount :{" "}
                        {((100 - this.state.Discount) * val.Price) / 100}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div className="form-group">
                <img style={{ width: "100%" }} src="" alt="" />
              </div>
              <p className="result-error-message">{this.state.Errormessage}</p>
              <p className="result-success-message">
                {this.state.Successmessage}
              </p>
              <br></br>
              <input
                type="submit"
                value="Add Offer"
                className="form-control submit-add"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AddOffer;
