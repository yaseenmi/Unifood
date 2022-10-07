import React, { Component } from "react";
import Header from "../fixtures/Header";
import DefaultButton from "../inputs/DefaultButton";
import "./styles/Services.css";
import ServicesImg from "../../assets/vectors/Services.svg";
import Footer from "../fixtures/Footer";

class Services extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.rootRef = React.createRef();

    // State Object
    this.state = {};

    // Binding Methods
  }
  componentDidMount() {}
  componentDidUpdate() {}
  UNSAFE_componentWillReceiveProps(newPro) {}
  render() {
    return (
      <div
        className="services-container"
        id={this.props.id}
        ref={this.rootRef}
        onClick={this.props.onClick}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        onMouseOver={this.props.onMouseOver}
        style={this.props.style}
      >
        <Header
          // Determines If The Notifications Panel Opens Or Not.
          isNotificationsOpen={this.state.isNotificationsOpen} // Required
          notificationsOnClick={this.notificationsButtonClicked} // Required
          onNotificationsClose={this.onNotificationsClose} // Required
          onNotificationsOpen={this.onNotificationsOpen} // Optional
          cartOnClick={this.cartButtonClicked} // Optional
          searchOnClick={this.searchButtonClicked} // Optional
          notificationsHandler={this.getNotifications} // Required (Very Important)
          cartCount={this.state.cartCount}
          notificationsCount={this.state.notificationsCount}
          isHome="true"
          activeMenuIndex={1}
        />
        <section id="intro-section">
          <img id="intro-img" src={ServicesImg} alt="" />
          <div id="welcoming-container">
            <span id="welcoming-title">Our Services</span>
            <p id="welcoming-description">
              When we offering our services we focusing on client
              comfortablitity and increasing his trust of us.
            </p>
            <DefaultButton
              text="Expand My Knowledge"
              size="large"
              onClick={() => {
                window.location.href = "#services-details-title";
              }}
            />
          </div>
        </section>
        <section id="services-details-section">
          <label id="services-details-title">Services In Detail</label>
          <div id="services-details-inner">
            <details open>
              <summary>
                <i className="bi bi-chevron-right"></i>Customer ordring process
              </summary>
              <p>
                We are trying to make ordering process more easier than any of
                the ordering apps. by filtering the products of any restaurant
                and selecting the target product more efficiently, viewing the
                product page, ability to see the rating of the product to help
                you choosing and more other features!
              </p>
            </details>
            <details>
              <summary>
                <i className="bi bi-chevron-right"></i>Restaurant dashboard
              </summary>
              <p>
                We give the restaurant the ability to track their sales and
                orders to help them make decisions by showing you which products
                are less in demand to reconsider that product and more insights!
              </p>
            </details>
            <details>
              <summary>
                <i className="bi bi-chevron-right"></i>University Dashboard
              </summary>
              <p>
                University can show statistics about their restaurants and the
                users of that restaurants by providing an easy dashboard to keep
                track of some inforamtions such as how many orders made until
                current time and other useful info.
              </p>
            </details>
          </div>
        </section>
        <section id="services-pricing-section">
          <label>Pricing</label>
          <div id="services-pricing">
            <div className="services-pricing-card">
              <label>Foreign Universities</label>
              <span>
                3000<sub>$</sub>
              </span>
              <div className="services-pricing-features">
                <p>
                  <i className="bi bi-check-square-fill"></i>University
                  dashboard
                </p>
                <p>
                  <i className="bi bi-check-square-fill"></i>Restaurant
                  dashboard
                </p>
                <p>
                  <i className="bi bi-x-square-fill"></i>One year software
                  maintenance
                </p>
              </div>
              <DefaultButton id="subscribe-btn" text="Subscribe" />
            </div>
            <div className="services-pricing-card">
              <label>Syrian Universities</label>
              <span>
                2000<sub>$</sub>
              </span>
              <div className="services-pricing-features">
                <p>
                  <i className="bi bi-check-square-fill"></i>University
                  dashboard
                </p>
                <p>
                  <i className="bi bi-check-square-fill"></i>Restaurant
                  dashboard
                </p>
                <p>
                  <i className="bi bi-check-square-fill"></i>One year software
                  maintenance
                </p>
              </div>
              <DefaultButton id="subscribe-btn" text="Subscribe" />
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default Services;
