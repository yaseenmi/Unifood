import React, { Component } from "react";
import IconButton from "../inputs/IconButton";
import DefaultButton from "../inputs/DefaultButton";
import "./styles/Header.css";
import NothingImg from "../../assets/images/Nothing.png";

// Assets
import LightLogo from "../../assets/vectors/LightLogo.svg";
import HeaderControl from "./HeaderControl";
import HeaderMenu from "./HeaderMenu";
import NotificationsPanel from "../panels/NotificationsPanel";
import CustomerSearch from "./CustomerSearch";
import { Link } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);

    // Bindings Methods
    this.openHeaderMenuClicked = this.openHeaderMenuClicked.bind(this);
    this.entryClicked = this.entryClicked.bind(this);
    this.cartClicked = this.cartClicked.bind(this);

    //Refs
    this.ref = React.createRef();

    // State Object
    this.state = {
      headerControl: (
        <div id="header-right">
          <HeaderControl
            notificationsCount={this.props.notificationsCount}
            cartCount={this.props.cartCount}
            isSearchVisible={this.props.isSearchVisible}
            isCartVisible={this.props.isCartVisible}
            isNotificationsVisible={this.props.isNotificationsVisible}
            cartOnClIsick={this.cartClicked}
            notificationsOnClick={this.props.notificationsOnClick}
            searchOnClick={this.props.searchOnClick}
            extraIcon={this.props.extraIcon}
            extraIconOnClick={this.props.extraIconOnClick}
            extraIconCount={this.props.extraIconCount}
            extraTooltip={this.props.extraTooltip}
          />
          <a href={this.props.profileLink}>
            <img
              id="header-profile-photo"
              src={this.props.profilePhoto}
              onError={(e) => {
                e.currentTarget.setAttribute("src", NothingImg);
              }}
              alt=""
              draggable="false"
            />
          </a>
        </div>
      ),
      notificationsPanel: (
        <NotificationsPanel
          onOpen={this.props.onNotificationsOpen}
          onClose={this.props.onNotificationsClose}
          notificationsHandler={this.props.notificationsHandler}
          isOpen={this.props.isNotificationsOpen}
          notificationsLink={this.props.notificationsLink}
          canSeeAll={this.props.canSeeAllNotifications}
        />
      ),
      isMenuOpen: "false",
    };
  }
  cartClicked() {
    window.location.href = "/cart";
  }
  entryClicked() {
    window.location.href = "/entry";
  }
  openHeaderMenuClicked() {
    this.setState({ isMenuOpen: "true" });
  }
  componentDidMount() {
    if (this.props.isHome === "true") {
      this.setState({
        headerControl: (
          <div id="header-right">
            <DefaultButton
              text="Entry&nbsp;"
              iconClass="bi bi-box-arrow-in-right"
              onClick={this.entryClicked}
            />
          </div>
        ),
      });
      this.setState({ notificationsPanel: null });
    }
  }

  componentWillReceiveProps(newPro) {
    if (newPro.isHome === "true") {
      this.setState({
        headerControl: (
          <div id="header-right">
            <DefaultButton text="Entry" />
          </div>
        ),
      });
      this.setState({ notificationsPanel: null });
    } else {
      this.setState({
        headerControl: (
          <div id="header-right">
            <HeaderControl
              notificationsCount={newPro.notificationsCount}
              cartCount={newPro.cartCount}
              isSearchVisible={newPro.isSearchVisible}
              isCartVisible={newPro.isCartVisible}
              isNotificationsVisible={newPro.isNotificationsVisible}
              cartOnClick={this.cartClicked}
              notificationsOnClick={newPro.notificationsOnClick}
              searchOnClick={newPro.searchOnClick}
              extraIcon={newPro.extraIcon}
              extraIconOnClick={newPro.extraIconOnClick}
              extraIconCount={newPro.extraIconCount}
              extraTooltip={newPro.extraTooltip}
            />
            <a href={this.props.profileLink}>
              <img
                id="header-profile-photo"
                src={newPro.profilePhoto}
                onError={(e) => {
                  e.currentTarget.setAttribute("src", NothingImg);
                }}
                draggable="false"
              />
            </a>
          </div>
        ),
      });
      this.setState({
        notificationsPanel: (
          <NotificationsPanel
            onOpen={newPro.onNotificationsOpen}
            onClose={newPro.onNotificationsClose}
            notificationsHandler={newPro.notificationsHandler}
            isOpen={newPro.isNotificationsOpen}
            notificationsLink={newPro.notificationsLink}
            canSeeAll={newPro.canSeeAllNotifications}
          />
        ),
        isMenuOpen: "false",
      });
    }
  }
  render() {
    return (
      <div ref={this.ref} id="header-container">
        <header id="header">
          <div id="header-left">
            <IconButton
              tooltip="Menu"
              iconClass="fa fa-bars"
              onClick={this.openHeaderMenuClicked}
            />
            <a href="/">
              <img id="header-logo" src={LightLogo} draggable="false" />
            </a>
          </div>
          {this.state.headerControl}
        </header>
        {this.state.notificationsPanel}
        <HeaderMenu
          activeIndex={this.props.activeMenuIndex}
          isOpen={this.state.isMenuOpen}
          onMenuOpen={() => {
            console.log("open");
          }}
          onMenuClose={() => {
            if (this.state.isMenuOpen === "true") this.setState({ isMenuOpen: "false" });
          }}
        />
        <CustomerSearch />
      </div>
    );
  }
}

export default Header;
