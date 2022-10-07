import React, { Component } from "react";
import "./styles/CustomerEnter.css";
import $ from "jquery";
import AOS from "aos";
import ReactDOM from "react-dom";

import DefaultButton from "../inputs/DefaultButton";
import TextBox from "../inputs/TextBox";
import PasswordBox from "../inputs/PasswordBox";
import EntryHeader from "../fixtures/EntryHeader";
import CustomerRegister from "../fixtures/CustomerRegister";
import Axios from "axios";
import Cookies from "../assitance-methods/Cookies";

// Assets
import SignInCustomerImg from "../../assets/vectors/SignInCustomer.svg";
import SelectBox from "../inputs/SelectBox";
import getHost from "../assitance-methods/getHost";

class CustomerEnter extends Component {
  constructor(props) {
    super(props);

    // State Object
    this.state = {
      // Form errors state (password, id, general)
      errors: {
        id: "",
        password: "",
        general: "",
      },
      isReadyToEnter: false,
    };

    //Bindings Methods
    this.goToCustomerRegister = this.goToCustomerRegister.bind(this);
    this.enterSubmitted = this.enterSubmitted.bind(this);
    this.passwordFieldInputed = this.passwordFieldInputed.bind(this);
    this.idFieldInputed = this.idFieldInputed.bind(this);
  }
  // Triggered when id field text changed to a new value.
  idFieldInputed(e) {
    let idValue = e.currentTarget.value;
    let idError = $("#id-error");
    let errors = this.state.errors;
    errors.general = "";
    this.setState({ errors: errors });

    if (idValue === "") {
      idError.css("display", "flex").show();
      errors.id = "ID number field can't be empty.";
      this.setState({ errors });
    } else {
      idError.hide();
      errors.id = "";
      this.setState({ errors });
    }
  }

  // Triggered when password field text changed to a new value.
  passwordFieldInputed(e) {
    let passwordValue = e.currentTarget.value;
    let passwordError = $("#password-error");
    let errors = this.state.errors;
    errors.general = "";
    this.setState({ errors: errors });

    if (passwordValue === "") {
      passwordError.css("display", "flex").show();
      errors.password = "Password field can't be empty.";
      this.setState({ errors });
    } else {
      passwordError.hide();
      errors.password = "";
      this.setState({ errors });
    }
  }

  // Triggered when customer enter form submitted.
  enterSubmitted(e) {
    e.preventDefault();
    let idField = $("#id-in");
    let passwordField = $("#password-in");
    let idValue = idField.val();
    let passwordValue = passwordField.val();
    let idError = $("#id-error");
    let passwordError = $("#password-error");
    let errors = this.state.errors;

    if (idValue === "") {
      idError.css("display", "flex").show();
      errors.id = "ID number field can't be empty.";
      this.setState({ errors });
    }
    if (passwordValue === "") {
      passwordError.css("display", "flex").show();
      errors.password = "Password field can't be empty.";
      this.setState({ errors });
    } else if (passwordValue !== "" && idValue !== "") {
      this.enter(idValue, passwordValue);
    }
  }

  // Tries to enter to a user account using his id number and password.
  enter(id, password) {
    const userData = {
      id: id,
      password: password,
    };
    let apiPath = `${getHost()}/customer/signin`;
    Axios.post(apiPath, userData).then((response) => {
      let data = response.data;
      let hasError = data.hasError;
      let message = data.message;
      if (hasError) {
        let errors = this.state.errors;
        errors.general = message;
        this.setState({ errors: errors });
        return;
      }
      let id = JSON.parse(data.data).userID;
      Cookies.set("id", id.toString(), 30);
      window.location.href = "/restaurants";
    });
  }

  // Renders customer register component on the page (navigate to It).
  goToCustomerRegister() {
    ReactDOM.render(
      <CustomerRegister />,
      document.getElementById("entry-container")
    );
  }

  componentDidMount() {
    AOS.init();
    $("input[type='number']")[0].focus();
  }

  //
  render() {
    return (
      <div
        id="customer-enter-container"
        data-aos="fade"
        data-aos-duration="1000"
      >
        <EntryHeader
          buttonOnClick={this.goToCustomerRegister}
          buttonText="Register"
          caption="Don't have an account yet?"
        />
        <div id="form-container">
          <div id="form-intro">
            <h1>Welcome Again!</h1>
            <img src={SignInCustomerImg} draggable="false" />
          </div>
          <form id="form" onSubmit={this.enterSubmitted} noValidate>
            <div
              id="form-general-error"
              style={{
                display: this.state.errors.general !== "" ? "flex" : "none",
              }}
            >
              <i className="fa fa-exclamation-circle"></i>
              {this.state.errors.general}
            </div>
            <TextBox
              inputId="id-in"
              errorId="id-error"
              placeholder="ID Number"
              type="number"
              error={this.state.errors.id}
              onInput={this.idFieldInputed}
            />
            <PasswordBox
              inputId="password-in"
              errorId="password-error"
              error={this.state.errors.password}
              placeholder="Password"
              onInput={this.passwordFieldInputed}
            />
            <DefaultButton
              text="Enter&nbsp;&nbsp;&nbsp;"
              inputType="submit"
              iconClass="fa fa-arrow-right"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default CustomerEnter;
