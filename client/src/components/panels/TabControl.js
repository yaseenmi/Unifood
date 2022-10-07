import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import TabLink from "../links/TabLink";
import Entry from "../pages/Entry";
import "./styles/TabControl.css";
import getIndexOfElement from "../assitance-methods/getIndexOfElement";

class TabControl extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.rootRef = React.createRef();

    // State Object
    this.state = {
      activeIndex: 0,
      tabs: [],
    };

    // Binding Methods
    this.initiateActiveIndex = this.initiateActiveIndex.bind(this);
    this.tabClicked = this.tabClicked.bind(this);
    this.initiateTabs = this.initiateTabs.bind(this);
  }
  tabClicked(e) {
    let target = e.currentTarget;
    let container = this.rootRef.current.querySelector(".tab-control-header");
    let index = getIndexOfElement(target, "tab-link-container", container);
    let tabs = this.state.tabs.map((tab, i) => {
      return {
        text: tab.text,
        iconClass: tab.iconClass,
        isActive: i === index ? true : false,
        content: tab.content,
      };
    });
    this.setState({ activeIndex: index });
    this.setState({ tabs: tabs });
    target.scrollIntoView();
  }
  initiateTabs() {
    this.setState({ tabs: this.props.tabs });
  }
  initiateActiveIndex() {
    let activeIndex;
    this.props.tabs.forEach((tab, i) => {
      if (tab.isActive === true) {
        activeIndex = i;
        return;
      }
    });            
  }
  componentDidMount() {
    this.initiateActiveIndex();
    this.initiateTabs();
  }
  componentDidUpdate() {}
  UNSAFE_componentWillReceiveProps(newPro) {}
  render() {
    return (
      <div
        className="tab-control-container"
        id={this.props.id}
        ref={this.rootRef}
        onClick={this.props.onClick}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        onMouseOver={this.props.onMouseOver}
        style={this.props.style}
      >
        <div className="tab-control-header">
          {this.state.tabs.map((tab) => {
            return (
              <TabLink
                text={tab.text}
                to={tab.to}
                iconClass={tab.iconClass}
                isActive={tab.isActive}
                onClick={this.tabClicked}
              />
            );
          })}
        </div>
        <div className="tab-control-main">
          {this.props.tabs[this.state.activeIndex].content}
        </div>
      </div>
    );
  }
}

export default TabControl;
