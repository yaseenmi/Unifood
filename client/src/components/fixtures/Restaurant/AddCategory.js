import React, { Component } from "react";
import axios from "axios";
import TextBox from "../../inputs/TextBox";
import RichTextBox from "../../inputs/RichTextBox";
import "./styles/AddCategory.css";
import $ from "jquery";
import getHost from "../../assitance-methods/getHost";
class AddCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Errormessage: "",
      Successmessage: "",
      name: "",
      desc: "",
      image: "",
      imagename: "",
      filename: "",
      filepath: "",
      resMessage: "",
      errors: {
        imageError: "",
        nameError: "",
        descriptionError: "",
      },
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDesChange = this.handleDesChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.nameFieldInputed = this.nameFieldInputed.bind(this);
    this.descriptionFieldInputed = this.descriptionFieldInputed.bind(this);
    this.imageFieldInputed = this.imageFieldInputed.bind(this);
  }
  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleDesChange = (event) => {
    this.setState({ desc: event.target.value });
  };

  handleImageChange = (event) => {
    try {
      this.setState({ image: event.target.files[0] });
      this.setState({ imagename: event.target.files[0].name });
    } catch {}
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    let nameField = $("#add-name-in");
    let nameValue = nameField.val();
    let nameError = $("#add-name-error");

    let descriptionField = $("#add-description-in");
    let descriptionValue = descriptionField.val();
    let descriptionError = $("#add-description-error");

    let imageField = $("#add-image-in");
    let imageValue = imageField.val();
    let imageError = $("#add-image-error");

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
    if (imageValue === "") {
      imageError.css("display", "flex").show();
      errors.imageError = "image can't be empty.";
      this.setState({ errors });
    } else if (
      nameValue !== "" &&
      descriptionValue !== "" &&
      imageValue !== ""
    ) {
      const formData = new FormData();
      formData.append("name", this.state.name);
      formData.append("desc", this.state.desc);
      formData.append("image", this.state.image);

      await axios
        .post(`${getHost()}/Category/insert`, formData)
        .then((resp) => {
          this.setState({
            filename: resp.data.fileName,
            filepath: resp.data.filePath,
            Errormessage: resp.data.Errormessage,
            Successmessage: resp.data.Successmessage,
          });
        });
    }
  };
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
  componentDidMount() {
    axios.get(`${getHost()}/RestaurantEnter/login`).then((response) => {
      if (response.data.loggedIn === true) {
      } else {
        window.location.href = "/entry";
      }
    });
  }
  render() {
    return (
      <div>
        <div className="background-add">
          <div className="card-addition">
            <div className="header-add">
              <h3>Add Category</h3>
            </div>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <TextBox
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
                  inputId="add-image-in"
                  errorId="add-image-error"
                  error={this.state.errors.imageError}
                  type="file"
                  onChange={this.handleImageChange}
                  onInput={this.imageFieldInputed}
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
              <br></br>

              <input
                type="submit"
                value="Add Category"
                className="form-control submit-add"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AddCategory;
