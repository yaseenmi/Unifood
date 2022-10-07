import React, { Component } from "react";
import "./styles/Entry.css";

// Assets
import RoleSelection from "../fixtures/RoleSelection";
import Cookies from "../assitance-methods/Cookies";

class Entry extends Component {
  constructor(props) {
    super(props);

    // refs
    this.ref = React.createRef();

    // State Object
    this.state = {
      selectedRole: "Manager",
    };

    //Bindings Methods
    this.checkSignIn = this.checkSignIn.bind(this);
  }
  checkSignIn() {
    if (Cookies.get("id") !== "") return true;
    return false;
  }
  componentDidMount() {
    if (this.checkSignIn()) window.location.replace("/restaurants");
  }
  render() {
    return (
      <div ref={this.ref} id="entry-container">
        <RoleSelection />
      </div>
    );
  }
}
export default Entry;
