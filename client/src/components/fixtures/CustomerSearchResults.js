import React, { Component } from "react";
import CustomerSearchResult from "./CustomerSearchResult";
import "./styles/CustomerSearchResults.css";
import SearchSomthingImg from "../../assets/vectors/SearchSomthing.svg";

class CustomerSearchResults extends Component {
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
        className="customer-search-results-container"
        id={this.props.id}
        ref={this.rootRef}
        onClick={this.props.onClick}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        onMouseOver={this.props.onMouseOver}
        style={this.props.style}
      >
        {this.props.results.length === 0
          ? <div className="customer-search-no-results">
            <img alt="" src={SearchSomthingImg}></img>
            <p>Search in 'Products', 'Categories' and 'Restaurants'...</p>
          </div>
          : this.props.results.map((result) => {
              return (
                <CustomerSearchResult
                  photo={result.photo}
                  title={result.title}
                  caption={result.caption}
                  rating={result.rating}
                  price={result.price}
                  resultId={result.resultId}
                  to={result.to}
                />
              );
            })}
      </div>
    );
  }
}

export default CustomerSearchResults;
