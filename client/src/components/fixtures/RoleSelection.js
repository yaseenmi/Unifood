import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./styles/RoleSelection.css";
import $ from "jquery";
import AOS from "aos";
// import ReactDOMServer from "react-dom/server";

import DefaultButton from "../inputs/DefaultButton";
import EntryHeader from "../fixtures/EntryHeader";
import CustomerEnter from "./CustomerEnter";

// Assets
import ManagerSVG from "../../assets/vectors/Manager.svg";
import CustomerSVG from "../../assets/vectors/Customer.svg";
import ManagerEnter from "./ManagerEnter";

class RoleSelection extends Component {
  constructor(props) {
    super(props);

    // refs
    this.ref = React.createRef();

    // State Object
    this.state = {
      selectedRole: "Manager",
    };

    //Bindings Methods
    this.roleClicked = this.roleClicked.bind(this);
    this.continueClicked = this.continueClicked.bind(this);
  }
  roleClicked(e) {
    let role = e.currentTarget;
    for (let element of $(".role-container")) {
      $(element).removeAttr("id");
    }
    $(role).attr("id", "active-role");
    this.setState({ selectedRole: role.childNodes[1].childNodes[0].innerText });
  }
  continueClicked(e) {
    if (this.state.selectedRole === "Manager") {
      ReactDOM.render(
        <ManagerEnter />,
        document.getElementById("entry-container")
      );
    } else if (this.state.selectedRole === "Customer") {
      ReactDOM.render(
        <CustomerEnter />,
        document.getElementById("entry-container")
      );
    }
  }
  componentDidMount() {
    AOS.init();
  }
  render() {
    return (
      <div ref={this.ref} id="role-selection-container">
        <EntryHeader isMain="true" />
        <div id="entry-inner-container">
          <h1
            data-aos="fade"
            data-aos-anchor="#example-anchor"
            data-aos-offset="500"
            data-aos-duration="500"
          >
            What's your role?
          </h1>
          <div
            id="entry-roles"
            data-aos="fade"
            data-aos-anchor="#example-anchor"
            data-aos-offset="500"
            data-aos-duration="800"
          >
            <div
              role="button"
              id="active-role"
              tabIndex="0"
              className="role-container"
              onClick={this.roleClicked}
            >
              <img src={ManagerSVG} draggable="false" />
              <div>
                <h3>Manager</h3>
                <p>
                  You're a university restaurant manager and a subscriber of
                  unifood service for managing your restaurant.
                </p>
              </div>
            </div>
            <div
              tabIndex="0"
              role="button"
              className="role-container"
              onClick={this.roleClicked}
            >
              <img src={CustomerSVG} draggable="false" />
              <div>
                <h3>Customer</h3>
                <p>
                  You're a student/stuff individual and you want to be a
                  customer of your university restaurants.
                </p>
              </div>
            </div>
          </div>
          <DefaultButton
            id="continue-btn"
            onClick={this.continueClicked}
            text="Continue&nbsp;&nbsp;&nbsp;"
            iconClass="fa fa-arrow-right"
          />
          <div id="role-container-spacer"></div>
        </div>
      </div>
    );
  }
}
export default RoleSelection;
