import React, { Component } from 'react'
import { NavLink, withRouter } from "react-router-dom"
import './styles/RestaurantSidebar.css'
import { Link } from "react-router-dom";
import $ from "jquery"
const itemsConfig = {
    home: {
      icon: "bi bi-house",
      text: "Home",
      link: "/restaurant_admin"
    },
  
    products: {
      icon: "bi bi-list",
      text: "Products",
      link: "/restaurant_admin/product"
    },

    categories: {
        icon: "bi bi-archive",
        text: "Categories",
        link: "/restaurant_admin/category"
      },

    orders: {
        icon: "bi bi-clipboard",
        text: "Orders",
        link: "/restaurant_admin/order"
      },
    
    offers: {
        icon: "bi bi-percent",
        text: "Offers",
        link: "/restaurant_admin/offer"
      },

    reviews: {
        icon: "bi bi-chat",
        text: "Reviews",
        link: "/restaurant_admin/review"
      },
    
    addProduct: {
        icon: "bi bi-plus-square-fill",
        text: "Add Product",
        link: "/restaurant_admin/add_product"
      },

    addOffer: {
        icon: "bi bi-plus-square-fill",
        text: "Add Offer",
        link: "/restaurant_admin/add_offer"
      },
    
    addCategory: {
        icon: "bi bi-plus-square-fill",
        text: "Add Category",
        link: "/restaurant_admin/add_category"
      },
    
  };
class RestaurantSidebar extends Component {
    constructor(props) {
        super(props);
    
        // State Object
        this.state = {
  
        }
        
    }

    render() {
        return (
          <div className="sidebar">
            <ul className="links">
            {["home", "products","categories","orders","offers","reviews","addProduct","addOffer","addCategory"].map((item, i) => {
                return (
                  <li>
                    <NavLink
                      exact={i === 0 ? true : false }                      
                      to={itemsConfig[item].link}
                      activeClassName="restaurant-active-sidebar"
                    >
                      <span className="icon">
                        <i class={itemsConfig[item].icon}></i>
                      </span>
                      <span className="title">{itemsConfig[item].text}</span>
                    </NavLink>
                  </li>
                );
                })}
            </ul>
          </div>
        );
    }
}

export default withRouter(RestaurantSidebar)