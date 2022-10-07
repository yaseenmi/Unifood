import React, { Component } from "react";
import "./styles/EntryHeader.css";
import DefaultButton from "../inputs/DefaultButton";
import LightLogo from "../../assets/vectors/LightLogo.svg";
import IconButton from "../inputs/IconButton";
import ReactDOM from "react-dom";
import RoleSelection from "./RoleSelection";

class EntryHeader extends Component {
  constructor(props) {
    super(props);

    // State Object
    this.ref = React.createRef();

    //Bindings Methods
    this.customize = this.customize.bind(this);
    this.back = this.back.bind(this);
  }
  customize(props) {
    let currentChilds = this.ref.current.childNodes;
    if (props.isMain === "true") {
      currentChilds[0].childNodes[0].style.display = currentChilds[1].style.display =
        "none";
    } else {
      currentChilds[0].childNodes[0].style.display = "block";
      currentChilds[1].style.display = "flex";
    }
  }
  back()
  {    
    ReactDOM.render(<RoleSelection />, document.getElementById("entry-container"));
  }
  componentDidMount() {
      this.customize(this.props);
  }
  componentWillReceiveProps(newPro)
  {
      this.customize(newPro);
  }
  render() {
    return (
      <div id="entry-header" ref={this.ref}>
        <div id="entry-header-left">
          <IconButton tooltip="Back" onClick={this.back} iconClass="fa fa-arrow-left" />
          <a href="/">
            <img id="entry-header-logo" src={LightLogo} draggable="false"/>
          </a>
        </div>
        <div id="entry-header-right">
          <p>{this.props.caption}</p>
          <DefaultButton onClick={this.props.buttonOnClick} text={this.props.buttonText} type="outline" />
        </div>
      </div>
    );
  }
}
export default EntryHeader;
