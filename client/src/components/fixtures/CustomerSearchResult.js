import React, { Component } from "react";
import CircleLoader from "../loaders/CircleLoader";
import "./styles/CustomerSearchResult.css";

class CustomerSearchResult extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.rootRef = React.createRef();

    // State Object
    this.state = {
      photoLoading: "true",
    };

    // Binding Methods
    this.photoLoaded = this.photoLoaded.bind(this);
  }
  photoLoaded() {
    let current = this.rootRef.current;
    let loader = current.querySelector(".customer-search-result-img-loader");
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }
  componentDidMount() {}
  componentDidUpdate() {}
  UNSAFE_componentWillReceiveProps(newPro) {}
  render() {
    return (
      <div
        className="customer-search-result-container"
        id={this.props.id}
        ref={this.rootRef}
        onClick={() => {
          window.location.href = this.props.to;
        }}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        onMouseOver={this.props.onMouseOver}
        style={this.props.style}
        resultId={this.props.resultId}
      >
        <div className="customer-search-result-left">
          <div className="customer-search-result-img-container">
            <img
              className="customer-search-result-img"
              loading="lazy"
              src={this.props.photo}
              alt=""
              onLoad={this.photoLoaded}
            />
            <div className="customer-search-result-img-loader">
              <CircleLoader isActive={this.state.photoLoading} size="small" />
            </div>
          </div>
          <div className="customer-search-result-details">
            <p>{this.props.title}</p>
            <span>{this.props.caption}</span>
          </div>
        </div>
        {this.props.price === undefined ? null : (
          <div className="customer-search-result-right">
            <p>{this.props.price}</p>
            <div className="customer-search-result-rating">
              {["", "", "", "", ""].map((star, i) => {
                let editedStar = <i className="bi bi-star"></i>;
                if (i < this.props.rating)
                  editedStar = <i className="bi bi-star-fill"></i>;
                return editedStar;
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default CustomerSearchResult;
