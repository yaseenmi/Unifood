import React, { Component } from "react";
import CustomerProductCard from "../cards/CustomerProductCard";
import "./styles/FavoriteList.css";
import Axios from "axios";
import CircleLoader from "../loaders/CircleLoader";
import getHost from "../assitance-methods/getHost";
import Cookies from "../assitance-methods/Cookies";
import NoFavorites from "../../assets/vectors/NoFavorites.svg";
import stringProcessor from "../assitance-methods/StringProcessor";

class FavoriteList extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.rootRef = React.createRef();

    // State Object
    this.state = {
      favorites: [],
      loading: "true",
    };

    // Binding Methods
    this.getFavorites = this.getFavorites.bind(this);
  }
  getFavorites() {
    let formData = {
      category: "All",
      id: Cookies.get("id"),
      restId: null,
      ignorRestaurant: true,
      getAll: true,
    };
    let api = `${getHost()}/customer/getproducts`;
    Axios.post(api, formData).then((response) => {
      let data = response.data.filter((x) => x.IsFavorite);
      this.setState({ favorites: data }, () => {
        let loader = document.querySelector("#favorites-loading");
        if (loader) loader.remove();
      });
    });
  }
  componentDidMount() {
    this.getFavorites();
  }
  componentDidUpdate() {}
  UNSAFE_componentWillReceiveProps(newPro) {}
  render() {
    return (
      <div
        id="favorite-list-container"
        className={this.props.className}
        ref={this.rootRef}
        onClick={this.props.onClick}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        onMouseOver={this.props.onMouseOver}
        style={{
          display: this.state.favorites.length === 0 ? "block" : "grid",
        }}
      >
        {this.state.favorites.length === 0 ? (
          <div id="no-favorites-ill">
            <img alt="" src={NoFavorites} />
            <p>There is no items in favorite list, try to add a new one...</p>
          </div>
        ) : (
          this.state.favorites.map((favorite, i) => {
            let hasTags = false;
            if (
              favorite.HasOffer ||
              !Boolean(favorite.IsAvailable) ||
              favorite.IsNew
            )
              hasTags = true;
            return (
              <CustomerProductCard
                id={favorite.ID}
                isFavorite={true}
                name={favorite.Name}
                price={`$ ${favorite.Price}`}
                description={favorite.Description}
                photo={`${getHost()}/images/restaurants/${
                  favorite.RestaurantName
                }/products/${favorite.Image}`}
                onProductAdd={this.props.onProductAdd}
                hasTags={hasTags}
                isOffer={favorite.HasOffer ? true : false}
                isNew={favorite.IsNew}
                isAvailable={Boolean(favorite.IsAvailable)}
                rating={favorite.Rate}
                offerTooltip={
                  favorite.HasOffer ? favorite.OfferDescription : null
                }
                restaurantName={favorite.RestaurantName}
                removeOnFavorite={true}
              />
            );
          })
        )}
        <div id="favorites-loading">
          <CircleLoader isActive={this.state.loading} />
        </div>
      </div>
    );
  }
}

export default FavoriteList;
