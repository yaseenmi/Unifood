// Minimum Imports
import React, { Component } from "react";
import "./styles/SearchSelectPopup.css";

// Fixtures Needed
import TextBox from "../inputs/TextBox";
import CircleLoader from "../loaders/CircleLoader";

// Assets
import NoResultsImg from "../../assets/vectors/NoResults.svg";

class SearchSelectPopup extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.ref = React.createRef(); // References to first JSX element on this component.

    // State Object
    this.state = {
      openHideStatus: {
        transform: "translate(-50%, -75%)",
        opacity: "0",
        display: "none",
      },
      isLoaderActive: "false",
      isLoaderDiplayed: "none",
    };

    // Bindings Methods
    this.search = this.search.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.openPopup = this.openPopup.bind(this);
    this.itemClicked = this.itemClicked.bind(this);
  }

  async searchTask(e) {
    let searchResultsCounter = 0;
    this.ref.current.childNodes[1].childNodes[1].innerHTML = "";
    if (e.currentTarget.value === "") {
      this.props.items.map((item) => {
        this.ref.current.childNodes[1].childNodes[1].innerHTML += `
                <div class="search-select-popup-item">
                  <span>${item}</span>
                  <i class="fa fa-search"></i>
                </div>
        `;
      });
      this.addClickListenerToItems();      
      return;
    }
    for (let item of this.props.items) {
      if (
        item
          .toLowerCase()
          .trim()
          .includes(e.currentTarget.value.toLowerCase().trim())
      ) {
        searchResultsCounter++;
        this.ref.current.childNodes[1].childNodes[1].innerHTML += `
                <div class="search-select-popup-item">
                  <span>${item}</span>
                  <i class="fa fa-search"></i>
                </div>
        `;
      }
    }
    if (searchResultsCounter === 0) {
      this.ref.current.childNodes[1].childNodes[1].innerHTML = `
        <p class="search-select-popup-no-results">Sorry! There is nothing here...</p>        
        <img class="search-select-popup-no-results-img" src=${NoResultsImg} draggable="false"></img>
        `;
    }
    this.addClickListenerToItems();
  }
  // Own Methods
  search(e) {
    this.ref.current.childNodes[1].childNodes[2].style.display = "flex";
    this.searchTask(e).then(() => {
      this.ref.current.childNodes[1].childNodes[2].style.display = "none";
    });
  }
  closePopup() {
    this.setState({
      openHideStatus: {
        transform: "translate(-50%, -75%)",
        opacity: "0",
      },
    });
    setTimeout(() => {
      this.setState({
        openHideStatus: {
          transform: "translate(-50%, -75%)",
          opacity: "0",
          display: "none",
        },
      });
      this.ref.current.childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].value =
        "";
      this.ref.current.childNodes[1].childNodes[1].innerHTML = "";
      this.props.items.map((item) => {
        this.ref.current.childNodes[1].childNodes[1].innerHTML += `
                <div class="search-select-popup-item">
                  <span>${item}</span>
                  <i class="fa fa-search"></i>
                </div>
        `;
      });
    }, 300);
  }
  openPopup() {
    this.setState({
      openHideStatus: {
        display: "block",
        transform: "translate(-50%, -75%)",
        opacity: "0",
      },
    });
    setTimeout(() => {
      this.setState({
        openHideStatus: {
          transform: "translate(-50%, -50%)",
          opacity: "1",
        },
      });
      this.ref.current.childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].focus();
    }, 10);
  }
  itemClicked(e) {
    alert();
    this.props.onValueSelected(e.currentTarget.childNodes[0].innerText);
    this.closePopup();    
  }
  addClickListenerToItems() {
    let items = document.querySelectorAll(".search-select-popup-item");
    for (let i = 0; i < items.length; i++) {
      items[i].addEventListener("click", this.itemClicked);
    }
  }
  // Overrided Methods
  componentDidMount() {
    this.addClickListenerToItems();
    // Focus Search Box
    this.ref.current.childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].focus();
    if (this.props.isOpen === "true") {
      this.openPopup();
    } else if (this.props.isOpen === "false") {
      this.setState({
        openHideStatus: {
          display: "none",
        },
      });
    }
  }
  componentWillReceiveProps(newPro) {
    // Focus Search Box
    this.ref.current.childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].focus();
    if (newPro.isOpen === "true") {
      this.openPopup();
    } else if (newPro.isOpen === "false") {
      this.closePopup();
    }
  }
  render() {
    return (
      <div
        ref={this.ref}
        id={this.props.id}
        tabIndex="0"
        className="search-select-popup-container"
        style={{ display: this.state.openHideStatus.display }}
      >
        <div
          className="search-select-popup-opacity-box"
          onClick={this.closePopup}
        ></div>
        <div
          className="search-select-popup"
          style={{
            transform: this.state.openHideStatus.transform,
            opacity: this.state.openHideStatus.opacity,
          }}
        >
          <div className="search-select-popup-top">
            <TextBox
              type="text"
              placeholder={this.props.placeholder}
              onInput={this.search}
            />
          </div>
          <div className="search-select-popup-bottom">
            {this.props.items.map((item) => {
              return (
                <div className="search-select-popup-item">
                  <span>{item}</span>
                  <i className="fa fa-search"></i>
                </div>
              );
            })}
          </div>
          <div
            className="search-select-popup-loader"
            style={{ display: this.state.isLoaderDiplayed }}
          >
            <CircleLoader />
          </div>
        </div>
      </div>
    );
  }
}
export default SearchSelectPopup;
