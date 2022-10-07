import React, { Component } from "react";
import DefaultButton from "../inputs/DefaultButton";
import "./styles/NotificationsPanelItem.css";
import $ from "jquery";
import Cookies from "../assitance-methods/Cookies";
import getHost from "../assitance-methods/getHost";
import Axios from "axios";

class NotificationsPanelItem extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.ref = React.createRef();

    // State Object
    this.state = {
      description: this.props.description,
    };

    // Binding Methods
    this.markAsReadClicked = this.markAsReadClicked.bind(this);
    this.seeMoreClicked = this.seeMoreClicked.bind(this);
    this.seeLessClicked = this.seeLessClicked.bind(this);
  }

  markAsReadClicked() {
    this.ref.current.childNodes[1].childNodes[1].style.display = "none";
    this.ref.current.childNodes[0].style.display = "none";
    this.ref.current.focus();

    let formData = {
      id: parseInt(Cookies.get("id")),
      notid: this.props.itemId, 
      admin: this.props.isAdmin,
      restaurant: this.props.isRestaurant
    }
    let api = `${getHost()}/customer/markasread`
    Axios.post(api, formData).then((response) => {
      let data = response.data;
      console.log(data);
    });
  }
  addClickListenerToSeeMore() {
    let seeMoreSpan = document.querySelectorAll(
      ".notifications-panel-item-see-more"
    );
    for (let i = 0; i < seeMoreSpan.length; i++) {
      seeMoreSpan[i].addEventListener("click", this.seeMoreClicked);
    }
  }
  addClickListenerToSeeLess() {
    let seeLessSpan = document.querySelectorAll(
      ".notifications-panel-item-see-less"
    );
    for (let i = 0; i < seeLessSpan.length; i++) {
      seeLessSpan[i].addEventListener("click", this.seeLessClicked);
    }
  }
  componentDidMount() {
    if (this.props.isRead === "true") {
      this.ref.current.childNodes[1].childNodes[1].style.display = "none";
      this.ref.current.childNodes[0].style.display = "none";
    } else {
      this.ref.current.childNodes[1].childNodes[1].style.display = "flex";
      this.ref.current.childNodes[0].style.display = "flex";
    }

    if (this.state.description.length > 80) {
      let descriptionPiece =
        this.state.description.substr(0, 40) +
        "...<br/><span class='notifications-panel-item-see-more'>See More</span>";
      this.ref.current.childNodes[1].childNodes[0].childNodes[0].childNodes[1].childNodes[1].innerHTML = descriptionPiece;
      this.addClickListenerToSeeMore();
    }
  }

  seeLessClicked() {
    let descriptionPiece =
      this.state.description.substr(0, 50) +
      "...<br/><span class='notifications-panel-item-see-more'>See More</span>";
    this.ref.current.childNodes[1].childNodes[0].childNodes[0].childNodes[1].childNodes[1].innerHTML = descriptionPiece;
    this.addClickListenerToSeeMore();
  }

  seeMoreClicked() {
    let description =
      this.state.description +
      "<br/><span class='notifications-panel-item-see-less'>See Less</span>";
    this.ref.current.childNodes[1].childNodes[0].childNodes[0].childNodes[1].childNodes[1].innerHTML = description;
    this.addClickListenerToSeeLess();
  }
  UNSAFE_componentWillReceiveProps(newPro) {
    this.addClickListenerToSeeMore();
    if (newPro.isRead === "true") {
      this.ref.current.childNodes[1].childNodes[1].style.display = "none";
      this.ref.current.childNodes[0].style.display = "none";
    } else if (newPro.isRead === "false") {
      this.ref.current.childNodes[1].childNodes[1].style.display = "flex";
      this.ref.current.childNodes[0].style.display = "flex";
    }
  }

  render() {
    return (
      <div
        ref={this.ref}
        id={this.props.id}
        className="notifications-panel-item-container"        
        tabIndex="0"
      >
        <div className="notifications-panel-item-label">
          <div></div>
        </div>
        <div className="notifications-panel-item-details">
          <div className="notifications-panel-item-details-inner">
            <div className="notifications-panel-item-info">
              <i className="bi bi-asterisk"></i>
              <div>
                <p>{this.props.from}</p>
                <p>{this.props.description}</p>
              </div>
            </div>
            <p className="notifications-panel-item-time">{this.props.time}</p>
          </div>
          <div className="notifications-panel-item-footer">
            <DefaultButton
              text="Mark as read"
              type="outline"
              size="small"
              onMouseUp={this.markAsReadClicked}
              onClick={this.props.markAsReadOnClick}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default NotificationsPanelItem;
