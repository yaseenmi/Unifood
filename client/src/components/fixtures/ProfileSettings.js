import React, { Component } from "react";
import "./styles/ProfileSettings.css";
import TextBox from "../inputs/TextBox";
import PasswordBox from "../inputs/PasswordBox";
import Badges from "../labels/Badges";
import DefaultButton from "../inputs/DefaultButton";
import MessageBox from "../alerts/MessageBox";
import Cookies from "../assitance-methods/Cookies";
import getHost from "../assitance-methods/getHost";
import Axios from "axios";
import $ from "jquery";

class ProfileSettings extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.rootRef = React.createRef();

    // State Object
    this.state = {
      username: "-----------------",
      email: "-----------------",
      phone: "0",
      oldPassword: "",
      newPassword: "",
      isMessageBoxOpen: "false",
      messageBoxTitle: "",
      messageBoxDescription: "",
      messageBoxControls: "yes-no",
      currentDangerAction: "delete",
      messageBoxType: "info",
      errors: {
        name: "",
        phone: "",
        oldPassword: "",
        newPassword: "",
        General: "",
      },
      loader: false,
      user: [],
    };

    // Binding Methods
    this.usernameChanged = this.usernameChanged.bind(this);
    this.emailChanged = this.emailChanged.bind(this);
    this.phoneChanged = this.phoneChanged.bind(this);
    this.deleteAccountClicked = this.deleteAccountClicked.bind(this);
    this.resetAccountClicked = this.resetAccountClicked.bind(this);
    this.logoutClicked = this.logoutClicked.bind(this);
    this.saveChangesClicked = this.saveChangesClicked.bind(this);
    this.messageBoxValueSelected = this.messageBoxValueSelected.bind(this);
    this.getUser = this.getUser.bind(this);
    this.newPasswordChanged = this.newPasswordChanged.bind(this);
    this.oldPasswordChanged = this.oldPasswordChanged.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.profileSettingsKeyUpped = this.profileSettingsKeyUpped.bind(this);
  }
  profileSettingsKeyUpped(e) {
    if (e.keyCode === 13) {
      this.saveChangesClicked();
    }
  }
  saveChangesClicked(e) {
    let id = Cookies.get("id");
    let username = this.state.username;
    let phone = this.state.phone;
    let oldPassword = this.state.oldPassword;
    let newPassword = this.state.newPassword;
    let changePassword = false;
    let passwordRegex = /^.*(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}.*$/;
    let onlyNumbersRegex = /^[0-9]+$/;
    let current = this.rootRef.current;
    let nameError = $("#name-error");
    let phoneError = $("#phone-error");
    let oldPasswordError = $("#old-password-error");
    let newPasswordError = $("#new-password-error");
    let errors = this.state.errors;
    let hasErrors = false;

    if (username === "") {
      nameError.css("display", "flex").show();
      errors.name = "Username field can't be empty.";
      this.setState({ errors: errors });
      hasErrors = true;
    }
    if (!onlyNumbersRegex.test(phone)) {
      hasErrors = true;
      phoneError.css("display", "flex").show();
      errors.phone = "Phone Number must contains only numbers.";
      this.setState({ errors: errors });
    }
    if (oldPassword !== "" && newPassword !== "") {
      changePassword = true;
      if (!passwordRegex.test(newPassword)) {
        hasErrors = true;
        newPasswordError.css("display", "flex").show();
        errors.newPassword =
          "Password must contains at minimum eight characters, at least one uppercase letter, one lowercase letter and one number.";
        this.setState({ errors: errors });
      }
    }
    if (!hasErrors) {
      this.saveChanges(
        username,
        phone,
        changePassword,
        oldPassword,
        newPassword
      );
    }
  }
  saveChanges(name, phone, changePassword, oldPassword = "", newPassword = "") {
    this.setState({ loader: true });
    let nameError = $("#name-error");
    let phoneError = $("#phone-error");
    let oldPasswordError = $("#old-password-error");
    let newPasswordError = $("#new-password-error");
    let errors = this.state.errors;
    let formData = {
      id: Cookies.get("id"),
      name: name,
      phone: phone,
      oldPassword: oldPassword,
      newPassword,
      newPassword,
      changePassword: changePassword,
    };
    let api = `${getHost()}/customer/changeinfo`;
    Axios.post(api, formData).then((response) => {
      setTimeout(() => {
        let data = response.data;
        if (this.props.onInfoChanged) this.props.onInfoChanged(name);
        if (data.hasError) {
          oldPasswordError.css("display", "flex").show();
          errors.oldPassword = data.message;
          this.setState({ errors: errors });
        } else {
          nameError.hide();
          phoneError.hide();
          oldPasswordError.hide();
          newPasswordError.hide();
        }
        this.setState({ loader: false });
      }, 500);
    });
  }
  getUser() {
    let formData = {
      id: Cookies.get("id"),
    };
    let api = `${getHost()}/customer/getuser`;
    Axios.post(api, formData).then((response) => {
      let data = response.data.data;
      this.setState({ user: data }, () => {
        this.setState({
          username: this.state.user.Name,
          phone: this.state.user.Phone,
        });
      });
    });
  }
  messageBoxValueSelected(value) {
    if (value === "Yes") {
      let action = this.state.currentDangerAction;
      if (action === "delete") {
        // Deletion Method
      } else if (action === "logout") {
        Cookies.set("id", "", 0);
        window.location.href = "/entry";
      } else if (action === "reset") {
        // Reseting Method
      }
    } else {
      this.setState({ isMessageBoxOpen: "false" });
    }
  }
  logoutClicked() {
    this.setState({ isMessageBoxOpen: "true" });
    this.setState({ messageBoxTitle: "Log Out" });
    this.setState({ messageBoxControls: "yes-no" });
    this.setState({ messageBoxType: "warning" });
    this.setState({
      messageBoxDescription:
        "Are you sure you want to log out from your account?",
    });
    this.setState({ currentDangerAction: "logout" });
  }
  resetAccountClicked() {
    this.setState({ isMessageBoxOpen: "true" });
    this.setState({ messageBoxTitle: "Soon!" });
    this.setState({ messageBoxControls: "none" });
    this.setState({ messageBoxType: "info" });
    this.setState({
      messageBoxDescription: "This feature will be added soon!",
    });
    this.setState({ currentDangerAction: "reset" });
  }
  deleteAccountClicked() {
    this.setState({ isMessageBoxOpen: "true" });
    this.setState({ messageBoxTitle: "Soon!" });
    this.setState({ messageBoxControls: "none" });
    this.setState({ messageBoxType: "info" });
    this.setState({
      messageBoxDescription: "This feature will be added soon!",
    });
    this.setState({ currentDangerAction: "delete" });
  }
  usernameChanged(e) {
    let nameError = $("#name-error");
    nameError.hide();
    let errors = this.state.errors;
    errors.name = "";
    this.setState({ username: e.target.value, errors: errors });
  }
  emailChanged(e) {
    let emailError = $("#email-error");
    emailError.hide();
    let errors = this.state.errors;
    errors.email = "";
    this.setState({ email: e.target.value, errors: errors });
  }
  phoneChanged(e) {
    let phoneError = $("#phone-error");
    phoneError.hide();
    let errors = this.state.errors;
    errors.phone = "";
    this.setState({ phone: e.target.value, errors: errors });
  }
  oldPasswordChanged(e) {
    let oldPasswordError = $("#old-password-error");
    oldPasswordError.hide();
    let errors = this.state.errors;
    errors.oldPassword = "";
    this.setState({ oldPassword: e.target.value, errors: errors });
  }
  newPasswordChanged(e) {
    let newPasswordError = $("#new-password-error");
    newPasswordError.hide();
    let errors = this.state.errors;
    errors.newPassword = "";
    this.setState({ newPassword: e.target.value, errors: errors });
  }
  componentDidMount() {
    this.getUser();
  }
  componentDidUpdate() {}
  UNSAFE_componentWillReceiveProps(newPro) {}
  render() {
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
        <p className="profile-settings-title">
          <i className="bi bi-circle-fill"></i>General
        </p>
        <TextBox
          type="text"
          value={this.state.username}
          placeholder="Username"
          onChange={this.usernameChanged}
          error={this.state.errors.name}
          errorId="name-error"
          onKeyUp={this.profileSettingsKeyUpped}
        />
        <TextBox
          placeholder="Phone"
          type="number"
          value={this.state.phone}
          onChange={this.phoneChanged}
          error={this.state.errors.phone}
          errorId="phone-error"
          onKeyUp={this.profileSettingsKeyUpped}
        />
        <PasswordBox
          placeholder="Old Password"
          onChange={this.oldPasswordChanged}
          error={this.state.errors.oldPassword}
          errorId="old-password-error"
          onKeyUp={this.profileSettingsKeyUpped}
        />
        <PasswordBox
          placeholder="New Password"
          onChange={this.newPasswordChanged}
          error={this.state.errors.newPassword}
          errorId="new-password-error"
          onKeyUp={this.profileSettingsKeyUpped}
        />
        <DefaultButton
          id="save-changes-btn"
          text="Save Changes"
          iconClass="bi bi-cloud-check"
          loader={this.state.loader}
          onClick={this.saveChangesClicked}
        />
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
          id="reset-my-account-btn"
          text="Reset My Account&nbsp;&nbsp;&nbsp;"
          iconClass="bi bi-arrow-clockwise"
          onClick={this.resetAccountClicked}
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
          type={this.state.messageBoxType}
          isOpen={this.state.isMessageBoxOpen}
          onValueSelected={this.messageBoxValueSelected}
          onClose={() => {
            if (this.state.isMessageBoxOpen === "true")
              this.setState({ isMessageBoxOpen: "false" });
          }}
        />
      </div>
    );
  }
}

export default ProfileSettings;
