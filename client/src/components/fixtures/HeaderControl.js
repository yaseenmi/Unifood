import React, { Component } from "react";
import IconButton from "../inputs/IconButton";
import "./styles/HeaderControl.css";

class HeaderControl extends Component {
  constructor(props) {
    super(props);

    //Refs
    this.ref = React.createRef();

    // State Object
    this.state = {
      searchIcon: null,
      cartIcon: null,
      notificationsIcon: null,
    };

    // Bindings Methods
  }

  componentDidMount() {
    if (this.props.isSearchVisible === "false") {
      this.setState({ searchIcon: null });
    } else {
      this.setState({
        searchIcon: (
          <IconButton
            tooltip="Search"
            iconClass="fa fa-search"
            onClick={this.props.searchOnClick}
          />
        ),
      });
    }
    if (this.props.isCartVisible === "false") {
      this.setState({ cartIcon: null });
    } else {
      this.setState({
        cartIcon: (
          <IconButton
            tooltip="Cart"
            count={this.props.cartCount}
            iconClass="bi bi-cart-fill"
            onClick={this.props.cartOnClick}
          />
        ),
      });
    }
    if (this.props.isNotificationsVisible === "false") {
      this.setState({ notificationsIcon: null });
    } else {
      this.setState({
        notificationsIcon: (
          <IconButton
            tooltip="Notifications"
            count={this.props.notificationsCount}
            iconClass="bi bi-bell-fill"
            id="notifications-icon-btn"
            onClick={this.props.notificationsOnClick}
          />
        ),
      });
    }
  }

  UNSAFE_componentWillReceiveProps(newPro) {
    if (newPro.isSearchVisible === "false") {
      this.setState({ searchIcon: null });
    } else {
      this.setState({
        searchIcon: (
          <IconButton
            tooltip="Search"
            iconClass="fa fa-search"
            onClick={newPro.searchOnClick}
          />
        ),
      });
    }
    if (newPro.isCartVisible === "false") {
      this.setState({ cartIcon: null });
    } else {
      this.setState({
        cartIcon: (
          <IconButton
            tooltip="Cart"
            count={newPro.cartCount}
            iconClass="bi bi-cart-fill"
            onClick={newPro.cartOnClick}
          />
        ),
      });
    }
    if (newPro.isNotificationsVisible === "false") {
      this.setState({ notificationsIcon: null });
    } else {
      this.setState({
        notificationsIcon: (
          <IconButton
            tooltip="Notifications"
            count={newPro.notificationsCount}
            iconClass="bi bi-bell-fill"
            id="notifications-icon-btn"
            onClick={newPro.notificationsOnClick}
          />
        ),
      });
    }
  }
  render() {
    return (
      <div ref={this.ref} id="header-control-container">
        {this.props.extraIcon ? (
          <IconButton
            tooltip={this.props.extraTooltip}
            count={this.props.extraIconCount ? this.props.extraIconCount : null}
            iconClass={
              this.props.extraIcon ? this.props.extraIcon : "bi bi-app"
            }
            id="notifications-icon-btn"
            onClick={this.props.extraIconOnClick}
          />
        ) : null}
        {this.state.searchIcon}
        {this.state.cartIcon}
        {this.state.notificationsIcon}
      </div>
    );
  }
}

export default HeaderControl;
