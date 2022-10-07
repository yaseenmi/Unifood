import React, { Component } from "react";
import photo from "./../../../assets/images/Myphoto.jpg";
import DefaultButton from "../../inputs/DefaultButton";
import "../../cards/styles/CardRestaurant.css";
import MessageBox from "../../alerts/MessageBox";
import Tooltip from "../../tooltips/Tooltip";
import "./styles/ViewReview.css";
import SimpleDateTime from "react-simple-timestamp-to-date";
import axios from "axios";
import getHost from "../../assitance-methods/getHost";
class ViewReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resultBackup: [],
      result: [],
      UserID: "",
      isMessageBoxOpen: "false",
      messageBoxTitle: "",
      messageBoxDescription: "",
      messageBoxControls: "ok",
      currentDangerAction: "",
    };
    this.messageBoxValueSelected = this.messageBoxValueSelected.bind(this);
    this.reportCustomerClicked = this.reportCustomerClicked.bind(this);
  }
  add3Dots(string, limit) {
    let dots = "...";
    if (string.length > limit) {
      string = string.substring(0, limit) + dots;
    }

    return string;
  }

  messageBoxValueSelected(value) {
    if (value === "Yes") {
      let action = this.state.currentDangerAction;
      if (action === "ok") {
        this.setState({ isMessageBoxOpen: "false" });
      }
    } else {
      this.setState({ isMessageBoxOpen: "false" });
    }
  }
  reportCustomerClicked = (id) => {
    this.setState({ isMessageBoxOpen: "true" });
    this.setState({ messageBoxTitle: "Customer Report" });
    this.setState({
      messageBoxDescription: "report request has been sent",
    });
    this.setState({ currentDangerAction: "ok" });

    const formdata = new FormData();
    formdata.append("CustomerID", id);
    axios.post(
      "http://localhost:3001/Notification/insertReportCustomer",
      formdata
    );
  };

  componentDidMount() {
    axios
      .get("http://localhost:3001/RestaurantEnter/login")
      .then((response) => {
        if (response.data.loggedIn === true) {
        } else {
          window.location.href = "/entry";
        }
      });
    axios.get("http://localhost:3001/Review/get").then((resp) => {
      this.setState({ result: resp.data, resultBackup: resp.data });
    });
  }
  Search = (e) => {
    let value = e.target.value.trim().toLowerCase();
    let result = this.state.resultBackup.filter((el) =>
      el.UserName.trim().toLowerCase().includes(value)
    );
    this.setState({ result: result });
  };
  render() {
    return (
      <div>
        <div className="background_restaurant">
          <div className="form-group">
            <input
              type="text"
              placeholder="Search For Customer Name"
              className="form-control"
              onInput={this.Search}
            />
          </div>
          <div className="card_restaurant">
            <table className="restaurant_table">
              <thead className="restaurant_thead">
                <tr>
                  <th></th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Date</th>
                  <th>Review</th>
                  <th>Like</th>
                  <th>Dislike</th>
                  <th>Report</th>
                </tr>
              </thead>
              <tbody className="restaurant_tbody">
                {this.state.result.map((val) => {
                  return (
                    <tr>
                      <td>
                        {" "}
                        <img
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                            border: "none",
                          }}
                          src={`${getHost()}/images/customers/${val.Image}`}
                          alt=""
                          onerror="this.style.display='none'"
                        />
                        </td>
                        <td>
                        &nbsp;&nbsp;{val.UserName}
                      </td>
                      <td> {val.Name}</td>
                      <td>
                        {" "}
                        <SimpleDateTime
                          dateSeparator="/"
                          timeSeparator=":"
                          meridians="1"
                          format="YMD"
                        >
                          {val.Date}
                        </SimpleDateTime>
                      </td>
                      <td
                        style={{
                          margin: "0",
                          padding: "0",
                          color: "black",
                          fontSize: "20px",
                        }}
                      >
                        <div className="tooltip-des">
                          {this.add3Dots(`${val.Text}`, 80)}
                          <span className="tooltiptext-des">{val.Text}</span>
                        </div>
                      </td>
                      <td> {val.Like}</td>
                      <td>{val.Dislike}</td>
                      <td>
                        {" "}
                        <DefaultButton
                          text="Report"
                          bg="var(--error-color)"
                          iconClass="bi bi-flag-fill"
                          onClick={() =>
                            this.reportCustomerClicked(val.CustomerID)
                          }
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <MessageBox
          title={this.state.messageBoxTitle}
          description={this.state.messageBoxDescription}
          controls={this.state.messageBoxControls}
          type="warning"
          isOpen={this.state.isMessageBoxOpen}
          onValueSelected={this.messageBoxValueSelected}
        />
      </div>
    );
  }
}

export default ViewReview;
