import React, { Component } from "react";
import "./styles/ViewProfile.css";
import photo from "./../../../assets/images/Myphoto.jpg";
import { NavLink } from "react-router-dom";
import TextBox from "../../inputs/TextBox";
import PasswordBox from "../../inputs/PasswordBox";
import Badges from "../../labels/Badges";
import DefaultButton from "../../inputs/DefaultButton";
import MessageBox from "../../alerts/MessageBox";
import RadioButton from "../../inputs/RadioButton";

import axios from "axios";
import $ from "jquery";
import getHost from "../../assitance-methods/getHost";
class ViewProfile extends Component {
  constructor(props) {
    super(props);

    this.state = this.rootRef = React.createRef(); // Refs

    // State Object
    this.state = {
      passwordResult: [],
      loggedIn: "",
      changePassword: "",
      restName: "",
      image: "",
      result: [],
      username: "",
      newPassword: "",
      oldPassword: "",
      phone: "",
      isMessageBoxOpen: "false",
      messageBoxTitle: "",
      messageBoxDescription: "",
      messageBoxControls: "yes-no",
      currentDangerAction: "delete",
      Status: "",
      PasswordErrormessage: "",
      PasswordSuccessmessage: "",
      StatusErrormessage: "",
      StatusSuccessmessage: "",
      ImageErrormessage: "",
      ImageSuccessmessage: "",
      GeneralErrormessage: "",
      GeneralSuccessmessage: "",
      // Form errors state (password,newpassword)
      errors: {
        newpasswordError: "",
        oldpasswordError: "",

        usernameError: "",
        phoneError: "",
      },
    };

    // Binding Methods
    this.usernameChanged = this.usernameChanged.bind(this);
    this.phoneChanged = this.phoneChanged.bind(this);

    this.deleteAccountClicked = this.deleteAccountClicked.bind(this);
    this.logoutClicked = this.logoutClicked.bind(this);

    this.newPasswordChanged = this.newPasswordChanged.bind(this);
    this.oldPasswordChanged = this.oldPasswordChanged.bind(this);

    this.handleImageChange = this.handleImageChange.bind(this);

    this.IsClosedChanged = this.IsClosedChanged.bind(this);

    this.messageBoxValueSelected = this.messageBoxValueSelected.bind(this);

    this.saveGeneralClicked = this.saveGeneralClicked.bind(this);
    this.saveImageClicked = this.saveImageClicked.bind(this);
    this.savePasswordClicked = this.savePasswordClicked.bind(this);

    this.oldPasswordFieldInputed = this.oldPasswordFieldInputed.bind(this);
    this.newPasswordFieldInputed = this.newPasswordFieldInputed.bind(this);

    this.usernameFieldInputed = this.usernameFieldInputed.bind(this);
    this.phoneFieldInputed = this.phoneFieldInputed.bind(this);
  }

  messageBoxValueSelected(value) {
    if (value === "Yes") {
      let action = this.state.currentDangerAction;
      if (action === "delete") {
        axios.post("http://localhost:3001/Notification/insertDeleteRequest");
        this.setState({ isMessageBoxOpen: "false" });
      } else if (action === "logout") {
        axios.get("http://localhost:3001/RestaurantEnter/logout");
        window.location.href = "/entry";
      }
    } else {
      this.setState({ isMessageBoxOpen: "false" });
    }
  }
  logoutClicked() {
    this.setState({ isMessageBoxOpen: "true" });
    this.setState({ messageBoxTitle: "Log Out" });
    this.setState({
      messageBoxDescription: "Do you want really to log out from your account?",
    });
    this.setState({ currentDangerAction: "logout" });
  }

  deleteAccountClicked() {
    this.setState({ isMessageBoxOpen: "true" });
    this.setState({ messageBoxTitle: "Account Deletion" });
    this.setState({
      messageBoxDescription:
        "Do you want really to delete your account? This step can't be undone!",
    });
    this.setState({ currentDangerAction: "delete" });
  }
  usernameChanged(e) {
    this.setState({ username: e.target.value });
  }
  IsClosedChanged(e) {
    this.setState({ IsClosed: e.target.value });
    $("#Open").on("change", function () {
      $("#IsClosed").show();
    });
    $("#Closed").on("change", function () {
      $("#IsClosed").show();
    });
  }
  newPasswordChanged(e) {
    this.setState({ newPassword: e.target.value });
  }
  oldPasswordChanged(e) {
    this.setState({ oldPassword: e.target.value });
  }
  phoneChanged(e) {
    this.setState({ phone: e.target.value });
  }
  handleImageChange = (event) => {
    this.setState({ image: event.target.files[0] });
    this.setState({ imagename: event.target.files[0].name });
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
    axios
      .get("http://localhost:3001/RestaurantProfile/getPassword")
      .then((resp) => {
        this.setState({ passwordResult: resp.data }, () => {
          this.state.passwordResult.map((val) => {
            this.state.changePassword = val.Password;
          });
        });
      });
    axios.get("http://localhost:3001/RestaurantProfile/get").then((resp) => {
      this.setState({ result: resp.data.result, restName: resp.data.restName });
    });
  }
  savePasswordClicked = async (event) => {
    event.preventDefault();
    let oldpasswordField = $("#oldpassword-in");
    let oldpasswordValue = oldpasswordField.val();
    let oldpasswordError = $("#oldpassword-error");

    let newpasswordField = $("#newpassword-in");
    let newpasswordValue = newpasswordField.val();
    let newpasswordError = $("#newpassword-error");

    let errors = this.state.errors;

    if (oldpasswordValue === "") {
      oldpasswordError.css("display", "flex").show();
      errors.oldpasswordError = "Password field can't be empty.";
      this.setState({ errors });
    }
    if (newpasswordValue === "") {
      newpasswordError.css("display", "flex").show();
      errors.newpasswordError = "Password field can't be empty.";
      this.setState({ errors });
    }

    if (oldpasswordValue !== "" && newpasswordValue !== "") {
      if (oldpasswordValue === this.state.changePassword) {
        const formData = new FormData();
        formData.append("newPassword", this.state.newPassword);
        formData.append("oldPassword", this.state.oldPassword);
        await axios
          .put("http://localhost:3001/RestaurantProfile/edit", formData)
          .then((resp) => {
            this.setState({
              PasswordErrormessage: resp.data.PasswordErrormessage,
              PasswordSuccessmessage: resp.data.PasswordSuccessmessage,
            });
          });
      } else {
        this.setState({ PasswordErrormessage: "Password Incorrect" });
      }
    }
  };

  saveImageClicked = async (event) => {
    event.preventDefault();
    const formDataImage = new FormData();
    formDataImage.append("image", this.state.image);
    await axios
      .put("http://localhost:3001/RestaurantProfile/editImage", formDataImage)
      .then((resp) => {
        this.setState({
          ImageErrormessage: resp.data.ImageErrormessage,
          ImageSuccessmessage: resp.data.ImageSuccessmessage,
        });
      });
  };
  saveIsClosedClicked = async (event) => {
    event.preventDefault();
    const formDataIsClosed = new FormData();
    let isClosed = document.querySelector(
      '#profile-settings-container input[name="status"]:checked'
    ).value;
    formDataIsClosed.append("IsClosed", isClosed);
    await axios
      .put(
        "http://localhost:3001/RestaurantProfile/editIsClosed",
        formDataIsClosed
      )
      .then((resp) => {
        this.setState({
          StatusErrormessage: resp.data.StatusErrormessage,
          StatusSuccessmessage: resp.data.StatusSuccessmessage,
        });
      });
  };
  saveGeneralClicked = async (event) => {
    event.preventDefault();
    let usernameField = $("#username-in");
    let usernameValue = usernameField.val();
    let usernameError = $("#username-error");

    let phoneField = $("#phone-in");
    let phoneValue = phoneField.val();
    let phoneError = $("#phone-error");

    let errors = this.state.errors;

    if (usernameValue === "") {
      usernameError.css("display", "flex").show();
      errors.usernameError = "Password field can't be empty.";
      this.setState({ errors });
    }
    if (phoneValue === "") {
      phoneError.css("display", "flex").show();
      errors.phoneError = "Password field can't be empty.";
      this.setState({ errors });
    } else if (usernameValue !== "" && phoneValue !== "") {
      const formDataGeneral = new FormData();
      formDataGeneral.append("username", this.state.username);
      formDataGeneral.append("phone", this.state.phone);
      await axios
        .put(
          "http://localhost:3001/RestaurantProfile/editGeneral",
          formDataGeneral
        )
        .then((resp) => {
          this.setState({
            GeneralErrormessage: resp.data.GeneralErrormessage,
            GeneralSuccessmessage: resp.data.GeneralSuccessmessage,
          });
        });
    }
  };
  onClickImage() {
    $("#image").show();
  }
  showStatus() {
    $("#radio-div").toggle();
  }

  oldPasswordFieldInputed(e) {
    let oldpasswordValue = e.currentTarget.value;
    let oldpasswordError = $("#oldpassword-error");
    let errors = this.state.errors;
    if (oldpasswordValue === "") {
      oldpasswordError.css("display", "flex").show();
      errors.oldpasswordError = "Password field can't be empty.";
      this.setState({ errors });
    } else {
      oldpasswordError.hide();
      errors.oldpasswordError = "";
      this.setState({ errors });
    }
  }
  newPasswordFieldInputed(e) {
    let newpasswordValue = e.currentTarget.value;
    let newpasswordError = $("#newpassword-error");
    let errors = this.state.errors;
    if (newpasswordValue === "") {
      newpasswordError.css("display", "flex").show();
      errors.newpasswordError = "Password field can't be empty.";
      this.setState({ errors });
    } else {
      newpasswordError.hide();
      errors.newpasswordError = "";
      this.setState({ errors });
    }
  }
  usernameFieldInputed(e) {
    let usernameValue = e.currentTarget.value;
    let usernameError = $("#username-error");
    let errors = this.state.errors;
    if (usernameValue === "") {
      usernameError.css("display", "flex").show();
      errors.usernameError = "name field can't be empty.";
      this.setState({ errors });
    } else {
      usernameError.hide();
      errors.usernameError = "";
      this.setState({ errors });
    }
  }
  phoneFieldInputed(e) {
    let phoneValue = e.currentTarget.value;
    let phoneError = $("#phone-error");
    let errors = this.state.errors;
    if (phoneValue === "") {
      phoneError.css("display", "flex").show();
      errors.phoneError = "phone field can't be empty.";
      this.setState({ errors });
    } else {
      phoneError.hide();
      errors.phoneError = "";
      this.setState({ errors });
    }
  }
  render() {
    return (
      <div>
        {this.state.result.map((val) => {
          if (val.IsClosed === 1) {
            $("Closed").attr("checked", true);
            this.state.Status = "Closed";
          } else {
            $("Open").attr("checked", true);
            this.state.Status = "Open";
          }
          if (this.state.Status === "Open") {
            $(".status").css("color", "green");
          } else {
            $(".status").css("color", "red");
          }
          return (
            <div
              id="profile-settings-container"
              className={this.props.className}
              ref={this.rootRef}
              onClick={this.props.onClick}
              onMouseDown={this.props.onMouseDown}
              onMouseUp={this.props.onMouseUp}
              onMouseOver={this.props.onMouseOver}
              style={this.props.style}
            >
              <div id="res-profile-intro">
                <input
                  type="file"
                  className="custom-file-input img-label"
                  id="imgFile"
                  onChange={this.handleImageChange}
                />
                <label
                  className="custom-file-label img-label"
                  htmlFor="imgFile"
                >
                  <img
                    id="rest-profile-img"
                    src={`${getHost()}/images/restaurants-images/${val.Image}`}
                    alt={val.Image}
                    onClick={this.onClickImage}
                  />
                </label>{" "}
                <br></br>
                <DefaultButton
                  id="image"
                  text="save image"
                  className="save-image"
                  onClick={this.saveImageClicked}
                />
                <p style={{ color: "red", textAlign: "center" }}>
                  {this.state.ImageErrormessage}
                </p>
                <p style={{ color: "green", textAlign: "center" }}>
                  {this.state.ImageSuccessmessage}
                </p>
              </div>
              {/* <p className="profile-settings-title">
                <i className="bi bi-circle-fill"></i>General
              </p> */}
              {/* <TextBox
                inputId="username-in"
                errorId="username-error"
                error={this.state.errors.usernameError}
                type="text"
                placeholder={`Name : ${val.UserName}`}
                onChange={this.usernameChanged}
                onInput={this.usernameFieldInputed}
              />
              <TextBox
                inputId="phone-in"
                errorId="phone-error"
                error={this.state.errors.phoneError}
                placeholder={`Phone : ${val.Phone}`}
                type="number"
                onChange={this.phoneChanged}
                onInput={this.phoneFieldInputed}
              /> */}
              {/* <p className="result-error-message">
                {this.state.GeneralErrormessage}
              </p>
              <p className="result-success-message">
                {this.state.GeneralSuccessmessage}
              </p>
              <DefaultButton
                id="save-changes-btn"
                text="Save Changes&nbsp;&nbsp;&nbsp;"
                iconClass="bi bi-save"
                onClick={this.saveGeneralClicked}
              /> */}
              <p className="profile-settings-title">
                <i className="bi bi-circle-fill"></i>Change Password
              </p>
              <PasswordBox
                inputId="oldpassword-in"
                errorId="oldpassword-error"
                error={this.state.errors.oldpasswordError}
                placeholder="Old Password"
                onChange={this.oldPasswordChanged}
                onInput={this.oldPasswordFieldInputed}
              />
              <PasswordBox
                inputId="newpassword-in"
                errorId="newpassword-error"
                error={this.state.errors.newpasswordError}
                placeholder="New Password"
                onChange={this.newPasswordChanged}
                onInput={this.newPasswordFieldInputed}
              />
              <p className="result-error-message">
                {this.state.PasswordErrormessage}
              </p>
              <p className="result-success-message">
                {this.state.PasswordSuccessmessage}
              </p>
              <DefaultButton
                id="save-changes-btn"
                text="Save Changes&nbsp;&nbsp;&nbsp;"
                iconClass="bi bi-save"
                onClick={this.savePasswordClicked}
              />
              <p className="profile-settings-title">
                <i className="bi bi-circle-fill status"></i>Status :{" "}
                {this.state.Status}
                <span
                  className="fa fa-angle-down"
                  style={{ cursor: "pointer" }}
                  onClick={this.showStatus}
                ></span>
              </p>
              <div id="radio-div" className="form-group profile-Radio-button">
                <RadioButton
                  controlId="Open"
                  groupName="status"
                  text="Open"
                  value={1}
                  onChange={this.IsClosedChanged}
                />
                <RadioButton
                  controlId="Closed"
                  groupName="status"
                  text="Closed"
                  value={0}
                  onChange={this.IsClosedChanged}
                />
                <DefaultButton
                  id="IsClosed"
                  text="Save Status"
                  className="save-status"
                  onClick={this.saveIsClosedClicked}
                />
              </div>
              <p className="result-error-message">
                {this.state.StatusErrormessage}
              </p>
              <p className="result-success-message">
                {this.state.StatusSuccessmessage}
              </p>

              <p className="profile-settings-title">
                <i className="bi bi-circle-fill"></i>Danger Zone
                <Badges text="Whatch out" background="var(--error-color)" />
              </p>
              <DefaultButton
                id="delete-my-account-btn"
                text="Delete My Account&nbsp;&nbsp;&nbsp;"
                iconClass="bi bi-trash-fill"
                onClick={this.deleteAccountClicked}
              />

              <DefaultButton
                id="log-out-btn"
                text="Log Out&nbsp;&nbsp;&nbsp;"
                iconClass="bi bi-arrow-bar-right"
                onClick={this.logoutClicked}
              />
              <MessageBox
                title={this.state.messageBoxTitle}
                description={this.state.messageBoxDescription}
                controls={this.state.messageBoxControls}
                type="warning"
                isOpen={this.state.isMessageBoxOpen}
                onValueSelected={this.messageBoxValueSelected}
              />
            </div>
          );
        })}
      </div>
    );
  }
}
export default ViewProfile;
