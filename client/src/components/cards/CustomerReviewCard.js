import Axios from "axios";
import React, { Component } from "react";
import Cookies from "../assitance-methods/Cookies";
import getHost from "../assitance-methods/getHost";
import stringProcessor from "../assitance-methods/StringProcessor";
import IconButton from "../inputs/IconButton";
import "./styles/CustomerReviewCard.css";

class CustomerReviewCard extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.rootRef = React.createRef();

    this.id = 0;
    this.userId = 0;
    // State Object
    this.state = {
      likes: parseInt(this.props.likes),
      dislikes: parseInt(this.props.dislikes),
      text: this.props.review,
    };

    // Binding Methods
    this.like = this.like.bind(this);
    this.dislike = this.dislike.bind(this);
    this.reviewCardDoubleClicked = this.reviewCardDoubleClicked.bind(this);
    this.reviewCardBlured = this.reviewCardBlured.bind(this);
    this.reviewCardKeyUpped = this.reviewCardKeyUpped.bind(this);
  }
  reviewCardKeyUpped(e) {
    e.preventDefault();
    if (e.key === "Enter") this.reviewCardBlured(e);
  }
  reviewCardBlured(e) {
    let target = e.currentTarget;
    let text = target.innerText;
    let sp = stringProcessor;
    let formData = {
      id: this.props.reviewId,
      text: sp.escapeSQ(text),
    };
    let api = `${getHost()}/customer/editreview`;
    if (text === "") {
      target.focus();
      return;
    }
    target.setAttribute("contenteditable", "false");
    target.setAttribute("class", "customer-review-card-bottom");

    if (this.state.text === text) return;
    Axios.post(api, formData).then((response) => {
      let data = response.data;
      console.log(data);
    });
  }
  reviewCardDoubleClicked(e) {
    if (
      this.props.userId !== parseInt(Cookies.get("id")) ||
      Boolean(this.props.isBanned)
    )
      return;
    let target = e.currentTarget;
    let text = target.innerText.trim();
    this.setState({ text: text });
    target.setAttribute("contenteditable", "true");
    target.setAttribute("class", "customer-review-card-bottom-editable");
    target.focus();
  }
  dislike(e) {
    if (this.props.disabled) return;
    let target = e.currentTarget.children[0];
    let className = "review-liked";
    if (target.classList.contains(className)) return;
    let current = this.rootRef.current
      .querySelectorAll(".customer-review-card-right i")
      .forEach((element) => {
        if (element.classList.contains(className)) {
          element.classList.remove(className);
          this.setState({ likes: this.state.likes - 1 });
        }
      });
    target.classList.toggle(className);
    this.setState({ dislikes: this.state.dislikes + 1 }, () => {
      let formData = {
        id: this.props.reviewId,
        likes: this.state.likes,
        dislikes: this.state.dislikes,
      };
      let api = `${getHost()}/customer/addreaction`;
      Axios.post(api, formData).then((response) => {
        let data = response.data;
        console.log(data);
      });
    });
  }
  like(e) {
    if (this.props.disabled) return;
    let target = e.currentTarget.children[0];
    let className = "review-liked";
    if (target.classList.contains(className)) return;
    let current = this.rootRef.current
      .querySelectorAll(".customer-review-card-right i")
      .forEach((element) => {
        if (element.classList.contains(className)) {
          element.classList.remove(className);
          this.setState({ dislikes: this.state.dislikes - 1 });
        }
      });
    target.classList.toggle(className);
    this.setState({ likes: this.state.likes + 1 }, () => {
      let formData = {
        id: this.props.reviewId,
        likes: this.state.likes,
        dislikes: this.state.dislikes,
      };
      let api = `${getHost()}/customer/addreaction`;
      Axios.post(api, formData).then((response) => {
        let data = response.data;
        console.log(data);
      });
    });
  }
  componentDidMount() {
    this.id = this.props.reviewId;
    this.userId = this.props.userId;
  }
  componentDidUpdate() {}
  UNSAFE_componentWillReceiveProps(newPro) {}
  render() {
    return (
      <div
        className="customer-review-card-container"
        id={this.props.id}
        ref={this.rootRef}
        onClick={this.props.onClick}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        onMouseOver={this.props.onMouseOver}
        style={this.props.style}
      >
        <div className="customer-review-card-left">
          <div className="customer-review-card-top">
            <a href={this.props.profileLink}>
              <img
                className="customer-review-card-photo"
                src={this.props.photo}
                alt=""
              />
            </a>
            <div className="customer-review-card-name-time">
              <p className="customer-review-card-name">{this.props.name}</p>
              <time className="customer-review-card-time">
                <i className="b i bi-clock"></i>
                {this.props.time}
              </time>
            </div>
          </div>
          <div
            className="customer-review-card-bottom"
            onBlur={this.reviewCardBlured}
            onDoubleClick={this.reviewCardDoubleClicked}
            onKeyUp={this.reviewCardKeyUpped}
          >
            {this.props.review}
          </div>
        </div>
        <div className="customer-review-card-right">
          <p>
            <IconButton
              iconClass="bi bi-hand-thumbs-up-fill"
              onClick={this.like}
              tooltip="Like"
              disabled={!this.props.canReact}
            />
            {this.state.likes}
          </p>
          <p>
            <IconButton
              iconClass="bi bi-hand-thumbs-down-fill"
              tooltip="Dislike"
              onClick={this.dislike}
              disabled={!this.props.canReact}
            />
            {this.state.dislikes}
          </p>
        </div>
      </div>
    );
  }
}

export default CustomerReviewCard;
