import React, { Component } from "react";
import "./styles/AddProduct.css";
import "./../../cards/styles/CardAdd.css";
import RadioButton from "../../inputs/RadioButton";
import axios from "axios";
import DefaultButton from "../../inputs/DefaultButton";
import $ from "jquery";
import TextBox from "../../inputs/TextBox";
import RichTextBox from "../../inputs/RichTextBox";
import getHost from "../../assitance-methods/getHost";

class AddProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      val: 0.0,
      price: 0.0,
      percent: 0.0,
      name: "",
      desc: "",
      price: 0,
      category: "",
      image: "",
      imagename: "",
      isAvailable: 1,
      filename: "",
      filepath: "",
      resMessage: "",
      result: [],
      Errormessage: "",
      Successmessage: "",
      errors: {
        imageError: "",
        nameError: "",
        descriptionError: "",
        priceError: "",
        categoryError: "",
        statusError: "",
      },
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDesChange = this.handleDesChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleIsAvailableChange = this.handleIsAvailableChange.bind(this);

    this.nameFieldInputed = this.nameFieldInputed.bind(this);
    this.descriptionFieldInputed = this.descriptionFieldInputed.bind(this);
    this.imageFieldInputed = this.imageFieldInputed.bind(this);
    this.priceFieldInputed = this.priceFieldInputed.bind(this);
    this.categoryFieldInputed = this.categoryFieldInputed.bind(this);
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleDesChange = (event) => {
    this.setState({ desc: event.target.value });
  };

  handlePriceChange = (event) => {
    this.setState({ price: event.target.value });
  };

  handleCategoryChange = (event) => {
    this.setState({ category: event.target.value });
  };

  handleImageChange = (event) => {
    try {
      this.setState({ image: event.target.files[0] });
      this.setState({ imagename: event.target.files[0].name });
    } catch {}
  };
  handleIsAvailableChange = (event) => {
    this.setState({ isAvailable: event.target.value });
  };

  componentDidMount() {}
  handleSubmit = async (event) => {
    event.preventDefault();
    let nameField = $("#add-name-in");
    let nameValue = nameField.val();
    let nameError = $("#add-name-error");

    let descriptionField = $("#add-description-in");
    let descriptionValue = descriptionField.val();
    let descriptionError = $("#add-description-error");

    let priceField = $("#add-price-in");
    let priceValue = priceField.val();
    let priceError = $("#add-price-error");

    let imageField = $("#add-image-in");
    let imageValue = imageField.val();
    let imageError = $("#add-image-error");

    let categoryField = $("#add-category-in");
    let categoryValue = categoryField.val();
    let categoryError = $("#add-category-error");

    let errors = this.state.errors;

    if (nameValue === "") {
      nameError.css("display", "flex").show();
      errors.nameError = "Product name can't be empty.";
      this.setState({ errors });
    }
    if (descriptionValue === "") {
      descriptionError.css("display", "flex").show();
      errors.descriptionError = "Description can't be empty.";
      this.setState({ errors });
    }
    if (priceValue === "") {
      priceError.css("display", "flex").show();
      errors.priceError = "Price can't be empty.";
      this.setState({ errors });
    }
    if (imageValue === "") {
      imageError.css("display", "flex").show();
      errors.imageError = "image can't be empty.";
      this.setState({ errors });
    }
    if (categoryValue === "") {
      categoryError.css("display", "flex").show();
      errors.categoryError = "category can't be empty.";
      this.setState({ errors });
    } else if (
      nameValue !== "" &&
      descriptionValue !== "" &&
      priceValue !== "" &&
      imageValue !== "" &&
      categoryValue !== ""
    ) {
      const formData = new FormData();
      formData.append("name", this.state.name);
      formData.append("desc", this.state.desc);
      formData.append("price", this.state.price);
      formData.append("image", this.state.image);
      formData.append("isAvailable", this.state.isAvailable);
      formData.append("category", this.state.category);

      await axios.post(`${getHost()}/Product/insert`, formData).then((resp) => {
        this.setState({
          filename: resp.data.fileName,
          filepath: resp.data.filePath,
          Successmessage: resp.data.Successmessage,
          Errormessage: resp.data.Errormessage,
        });
      });
    }
  };
  componentDidMount() {
    axios
      .get("http://localhost:3001/RestaurantEnter/login")
      .then((response) => {
        if (response.data.loggedIn === true) {
        } else {
          window.location.href = "/entry";
        }
      });

    axios.get("http://localhost:3001/Category/get").then((resp) => {
      this.setState({ result: resp.data.result });
    });
  }
  nameFieldInputed(e) {
    let nameValue = e.currentTarget.value;
    let nameError = $("#add-name-error");
    let errors = this.state.errors;
    if (nameValue === "") {
      nameError.css("display", "flex").show();
      errors.nameError = "Product name can't be empty.";
      this.setState({ errors });
    } else {
      nameError.hide();
      errors.nameError = "";
      this.setState({ errors });
    }
  }
  descriptionFieldInputed(e) {
    let descriptionValue = e.currentTarget.value;
    let descriptionError = $("#add-description-error");
    let errors = this.state.errors;
    if (descriptionValue === "") {
      descriptionError.css("display", "flex").show();
      errors.descriptionError = "Description can't be empty.";
      this.setState({ errors });
    } else {
      descriptionError.hide();
      errors.descriptionError = "";
      this.setState({ errors });
    }
  }
  priceFieldInputed(e) {
    let priceValue = e.currentTarget.value;
    let priceError = $("#add-price-error");
    let errors = this.state.errors;
    if (priceValue === "") {
      priceError.css("display", "flex").show();
      errors.priceError = "Price can't be empty.";
      this.setState({ errors });
    } else {
      priceError.hide();
      errors.priceError = "";
      this.setState({ errors });
    }
  }
  imageFieldInputed(e) {
    let imageValue = e.currentTarget.value;
    let imageError = $("#add-image-error");
    let errors = this.state.errors;
    if (imageValue === "") {
      imageError.css("display", "flex").show();
      errors.imageError = "image can't be empty.";
      this.setState({ errors });
    } else {
      imageError.hide();
      errors.imageError = "";
      this.setState({ errors });
    }
  }
  categoryFieldInputed(e) {
    let categoryValue = e.currentTarget.value;
    let categoryError = $("#add-category-error");
    let errors = this.state.errors;
    if (categoryValue === "") {
      categoryError.css("display", "flex").show();
      errors.categoryError = "category can't be empty.";
      this.setState({ errors });
    } else {
      categoryError.hide();
      errors.categoryError = "";
      this.setState({ errors });
    }
  }
  render() {
    return (
      <div>
        <div className="background-add">
          <div className="card-addition">
            <div className="header-add">
              <h3>Add Product</h3>
            </div>
            <form className="form-add-product" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <TextBox
                  className="form-control"
                  inputId="add-name-in"
                  errorId="add-name-error"
                  error={this.state.errors.nameError}
                  type="text"
                  placeholder="Name"
                  onChange={this.handleNameChange}
                  onInput={this.nameFieldInputed}
                />
              </div>

              <div className="form-group">
                <RichTextBox
                  className="form-control"
                  inputId="add-description-in"
                  errorId="add-description-error"
                  error={this.state.errors.descriptionError}
                  type="text"
                  placeholder="Description"
                  onChange={this.handleDesChange}
                  onInput={this.descriptionFieldInputed}
                />
              </div>

              <div className="form-group">
                <TextBox
                  className="form-control"
                  inputId="add-price-in"
                  errorId="add-price-error"
                  error={this.state.errors.priceError}
                  type="number"
                  placeholder="Price"
                  onChange={this.handlePriceChange}
                  onInput={this.priceFieldInputed}
                />
              </div>

              <div className="form-group">
                <TextBox
                  className="form-control"
                  inputId="add-image-in"
                  errorId="add-image-error"
                  error={this.state.errors.imageError}
                  type="file"
                  onChange={this.handleImageChange}
                  onInput={this.imageFieldInputed}
                />
              </div>

              <div className="form-group">
                <select
                  className="form-control"
                  id="add-category-in"
                  onChange={this.handleCategoryChange}
                >
                  <option value="" selected disabled hidden>
                    Category
                  </option>
                  {this.state.result.map((val) => {
                    return <option value={val.ID}>{val.CategoryName}</option>;
                  })}
                </select>
              </div>

              <div id="add-category-error" className="text-box-error">
                <i class="bi bi-x-circle"></i>
                {this.state.errors.categoryError}
              </div>

              <div className="form-group Radio-button">
                &nbsp;Status :
                <RadioButton
                  controlId="Available"
                  groupName="status"
                  text="Available"
                  value={1}
                  onChange={this.handleIsAvailableChange}
                />
                <RadioButton
                  controlId="notAvailable"
                  groupName="status"
                  text="Not Available"
                  value={0}
                  onChange={this.handleIsAvailableChange}
                />
              </div>

              <div className="form-group">
                <img
                  style={{ width: "100%" }}
                  src={this.state.filepath}
                  alt=""
                />
              </div>
              <p className="result-error-message">{this.state.Errormessage}</p>
              <p className="result-success-message">
                {this.state.Successmessage}
              </p>
              <input
                type="submit"
                value="Add Product"
                className="form-control submit-add"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AddProduct;
