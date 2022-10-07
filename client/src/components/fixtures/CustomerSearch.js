import React, { Component } from "react";
import "./styles/CustomerSearch.css";
import TextBox from "../inputs/TextBox";
import DefaultButton from "../inputs/DefaultButton";
import SelectBox from "../inputs/SelectBox";
import IconButton from "../inputs/IconButton";
import TabControl from "../panels/TabControl";
import $ from "jquery";
import CustomerSearchResult from "./CustomerSearchResult";
import CustomerSearchResults from "./CustomerSearchResults";
import Axios from "axios";
import getHost from "../assitance-methods/getHost";
import Cookies from "../assitance-methods/Cookies";
import StringProcessor from "../assitance-methods/StringProcessor";
import stringProcessor from "../assitance-methods/StringProcessor";

class CustomerSearch extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.ref = React.createRef();

    // Vars
    this.loadingCaption = "In progress...";

    // State Object
    this.state = {
      searchInSelectedIndex: "0",
      products: [],
      categories: [],
      restaurants: [],
      allRestaurants: [],
      caption: 'Write then hit "enter" or click "search".',
    };

    // Binding Methods
    this.onSearchInValueSelected = this.onSearchInValueSelected.bind(this);
    this.searchBackClicked = this.searchBackClicked.bind(this);
    this.searchTyped = this.searchTyped.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.getRestaurants = this.getRestaurants.bind(this);
  }
  searchBackClicked(e) {
    let input = document.querySelector("#customer-search-in");
    input.value = "";
    $(this.ref.current).slideUp(150);
    $("body").css("overflow-y", "unset");
    this.setState({ categories: [], products: [], restaurants: [] });
  }
  searchTyped(e) {
    let target = e.currentTarget;
    let text = target.value;
    this.getProducts(text);
    this.getCategories(text);
    this.getRestaurants(text);
  }
  getProducts(searchQuery) {
    if (searchQuery === "") {
      this.setState({ products: [] });
      return;
    }
    let formData = {
      category: "All",
      id: Cookies.get("id"),
      restId: undefined,
      getAll: true,
      ignorRestaurant: true,
    };
    this.setState({ caption: this.loadingCaption });
    searchQuery = searchQuery.toLowerCase().trim();
    const api = `${getHost()}/customer/getproducts`;
    Axios.post(api, formData).then((response) => {
      console.log(response.data.message);
      let data = response.data
        .filter(
          (d) =>
            d.Name.toLowerCase().trim().includes(searchQuery) ||
            d.RestaurantName.toLowerCase().trim().includes(searchQuery)
        )
        .sort((a, b) => {
          return a.IsFavorite - b.IsFavorite;
        });
      this.setState({ products: data }, () => {
        setTimeout(() => {
          this.setState({
            caption: 'Write then hit "enter" or click "search".',
          });
        }, 300);
      });
    });
  }
  getCategories(searchQuery) {
    if (searchQuery === "") {
      this.setState({ categories: [] });
      return;
    }
    searchQuery = searchQuery.toLowerCase().trim();
    const api = `${getHost()}/customer/getcategories`;
    this.setState({ caption: this.loadingCaption });
    Axios.post(api).then((response) => {
      let data = response.data.filter(
        (d) =>
          d.Name.toLowerCase().trim().includes(searchQuery) ||
          d.RestaurantName.toLowerCase().trim().includes(searchQuery)
      );
      this.setState({ categories: data }, () => {
        setTimeout(() => {
          this.setState({
            caption: 'Write then hit "enter" or click "search".',
          });
        }, 300);
      });
    });
  }
  getRestaurants(searchQuery) {
    if (searchQuery === "") {
      this.setState({ restaurants: [] });
      return;
    }
    const api = `${getHost()}/customer/getrestaurants`;
    this.setState({ caption: this.loadingCaption });
    Axios.get(api).then((response) => {
      let data = response.data.filter((d) =>
        d.Name.toLowerCase().trim().includes(searchQuery)
      );
      console.log(data);
      this.setState({ allRestaurants: response.data });
      this.setState({ restaurants: data }, () => {
        setTimeout(() => {
          this.setState({
            caption: 'Write then hit "enter" or click "search".',
          });
        }, 300);
      });
    });
  }
  onSearchInValueSelected(value, index) {}
  UNSAFE_componentWillMount() {}

  componentDidMount() {
    document.onkeyup = (e) => {
      if (e.key === "Escape") {
        this.searchBackClicked();
        this.ref.current.querySelector("#customer-search-back").focus();
      }
    };
    document.onkeydown = (e) => {
      if (
        e.ctrlKey &&
        e.keyCode == 81 &&
        !(e.shiftKey || e.altKey || e.metaKey)
      ) {
        $("#customer-search-container").slideDown(150);
        $("#customer-search-in").focus();
        $("body").css("overflow-y", "hidden");
      }
    };
  }
  componentDidUpdate() {}
  UNSAFE_componentWillReceiveProps(newPro) {}

  render() {
    return (
      <div id="customer-search-container" ref={this.ref}>
        <p id="customer-search-title">
          <IconButton
            onClick={this.searchBackClicked}
            id="customer-search-back"
            iconClass="fa fa-arrow-left"
            tooltip="Back"
          />
          Search
        </p>
        <div id="customer-search-header">
          <TextBox
            inputId="customer-search-in"
            id="customer-search-box"
            placeholder="Type Something..."
            onInput={this.searchTyped}
            autoComplete="off"
          />
          <DefaultButton id="customer-search-btn" text="Search" />
        </div>
        <div id="customer-search-status">
          <p>{this.state.caption}</p>
        </div>
        <TabControl
          tabs={[
            {
              text: "Products",
              iconClass: "bi bi-front",
              content: (
                <CustomerSearchResults
                  results={this.state.products.map((product) => {
                    return {
                      resultId: product.ID,
                      title: product.Name,
                      caption: `From: ${product.RestaurantName}`,
                      price:
                        "$" +
                        (product.HasOffer
                          ? product.Price * (product.OfferPercentage / 100)
                          : product.Price),
                      rating: product.Rate,
                      photo: `${getHost()}/images/restaurants/${
                        product.RestaurantName
                      }/products/${product.Image}`,
                      to: `/restaurant/${StringProcessor.encodeURLWord(
                        product.RestaurantName
                      )}/product/${product.ID}`,
                    };
                  })}
                />
              ),
              isActive: true,
            },
            {
              text: "Categories",
              iconClass: "bi bi-grid-fill",
              content: (
                <CustomerSearchResults
                  results={this.state.categories.map((category, i) => {
                    return {
                      resultId: category.ID,
                      title: category.Name,
                      caption: `From: ${category.RestaurantName}`,
                      photo: `${getHost()}/images/restaurants/${
                        category.RestaurantName
                      }/categories/${category.Image}`,
                      to: `/restaurants/${stringProcessor.encodeURLWord(
                        category.RestaurantName
                      )}?category=${StringProcessor.encodeURLWord(
                        category.Name
                      )}&filter=none`,
                    };
                  })}
                />
              ),
            },
            {
              text: "Restaurants",
              iconClass: "bi bi-tags-fill",
              content: (
                <CustomerSearchResults
                  results={this.state.restaurants.map((restaurant, i) => {
                    return {
                      resultId: restaurant.ID,
                      title: restaurant.Name,
                      caption:
                        restaurant.IsClosed === 0 ? "Open Naow" : "Closed",
                      photo: `${getHost()}/images/restaurants-images/${restaurant.Image}`,
                      to: `/restaurants#restaurant${this.state.allRestaurants.findIndex(
                        (c) => c.ID === restaurant.ID
                      )}`,
                    };
                  })}
                />
              ),
            },
          ]}
        />
      </div>
    );
  }
}

export default CustomerSearch;
