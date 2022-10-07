import React, { Component } from "react";
import HeaderMenuLink from "../links/HeaderMenuLink";
import "./styles/ItemsSidebar.css";
import getIndexOfElement from "../assitance-methods/getIndexOfElement"

class ItemsSidebar extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.rootRef = React.createRef();

    // State Object
    this.state = {
      items: [],
    };

    // Binding Methods
    this.itemClicked = this.itemClicked.bind(this);    
  }
  itemClicked(e) {
    let target = e.currentTarget;
    let current = this.rootRef.current;
    let className = "header-menu-link";    
    let index = getIndexOfElement(target, className, current);
    let newItems = this.state.items.map((element, i) => {
      let isActive;
      if (i === index) isActive = "true";
      else isActive = "false";
      return {
        text: element.text,
        to: element.to,
        isActive: isActive,
      };
    });
    this.setState({ currentActiveIndex: index }, () => {
      this.setState({
        items: newItems,
      });
    });
  }
  componentDidMount() {      
    this.setState({ items: this.props.items });
  }
  componentDidUpdate() {}
  UNSAFE_componentWillReceiveProps(newPro) {
      this.setState({ items: newPro.items });
  }
  render() {
    return (
      <div
        className="items-sidebar-container"
        id={this.props.id}
        ref={this.rootRef}
        onClick={this.props.onClick}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        onMouseOver={this.props.onMouseOver}
        style={this.props.style}
      >
        {this.state.items.map((item, i) => {          
          return (
            <HeaderMenuLink
              key={i}
              isActive={item.isActive}
              onClick={this.itemClicked}
              text={item.text}
              iconClass="bi bi-tags-fill"
              to={item.to}
            ></HeaderMenuLink>
          );
        })}
      </div>
    );
  }
}

export default ItemsSidebar;
