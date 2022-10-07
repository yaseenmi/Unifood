import React, { Component } from 'react';
import axios from 'axios';
import './styles/UserLog.css'
import './styles/Admin.css'
import './styles/UserLog.css'
import DefaultButton from './../inputs/DefaultButton';
import $ from 'jquery'
import Cookies from '../assitance-methods/Cookies';
import RichTextBox from '../inputs/RichTextBox';
import getHost from '../assitance-methods/getHost';



class UserLog extends Component {
  constructor(props){
    super(props)

    this.state = {
      info: [],
      reviews: [],
      orders: [],
      text: '',
      sendNotiMessage: '',
      sendNotiStatus: ''
    }

  }

  handleOrderClick = () => {
    $('.admin-review-container').hide();
    $('.admin-send-container').hide();
    $('.admin-order-container').show();
  }

  handleReviewClick = () => {
    $('.admin-send-container').hide();
    $('.admin-order-container').hide();
    $('.admin-review-container').show();
  }

  handleNotiClick = () => {
    $('.admin-order-container').hide();
    $('.admin-review-container').hide();
    $('.admin-send-container').show();
  }

  timeStampConverter = (timeStamp) => {
    let time = timeStamp.split(/[- T .]/);
    let date = `${time[0]}/${time[1]}/${time[2]} ${time[3]}`
    return date
  }

  componentDidMount = () => {
    if(!Cookies.get("id")){
      window.location.href = "http://localhost:3000/"
    }
    else{
      let userID = this.props.match.params.id;
      axios.get(`${getHost()}/api/admin/user/${userID}`).then( res => {
        this.setState({
          info: res.data.info[0],
          reviews: res.data.reviewResult,
          orders: res.data.orderResult
        })
      }).catch(err => {
        console.log(err)
      })
    }  
  }

  handleTextChange = (event) => {
    this.setState({ text: event.target.value })
  }

  handleSendSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('UserID', this.state.info.UserID);
    formData.append('Sender', 'Admin');
    formData.append('Text', this.state.text);

    axios.post(`${getHost()}/api/admin/notification/send`, formData).then(res => {
      this.setState({
        sendNotiStatus: res.data.resStatus,
        sendNotiMessage: res.data.resMessage,
      })

    }).catch(err => {
      console.log(err)
    })

  }

  render(){
      return(
        <div className="mt-1 admin-user-details">
          <div className="text-center user-info">
            <img src={`${getHost()}/images/customers/${this.state.info.Image}`} alt="" />
            <p className="mt-4">{this.state.info.ID}</p>
            <h2 className="mt-2">{this.state.info.Name}</h2>
            {
              this.state.info.IsBanned == 0
              ?
              <p className="active-user">Active</p>
              :
              <p className="banned-user">Banned</p>
            }
            <div className="admin-flex admin-justify-center user-op-btns mt-5">
              <DefaultButton iconClass="fa fa-paper-plane" text="Send Message" style={{background:'var(--secondry-color)', border: '1px solid var(--secondry-color)'}} onClick={this.handleNotiClick} />
              <DefaultButton iconClass="bi bi-archive" text="View Orders" style={{background:'var(--secondry-color)', border: '1px solid var(--secondry-color)'}} onClick={this.handleOrderClick} />
              <DefaultButton iconClass="bi bi-chat-left-text" text="View Reviews" style={{background:'var(--secondry-color)', border: '1px solid var(--secondry-color)'}} onClick={this.handleReviewClick} />
            </div>
          </div>
          <div className="multi-container mt-5">
            <div className="admin-review-container">
              {
                this.state.reviews.map((item)=>{
                  return(
                    <div className="admin-flex admin-justify-between review-detail">
                      <h4>{item.Text}</h4>
                      <span className="review-date">{this.timeStampConverter(item.Date)}</span>
                    </div>
                  )
                })
              }
            </div>
            <div className="admin-order-container">
              <table>
                <tr>
                  <th>Order id</th>
                  <th className="w80">Total cost</th>
                  <th>Order date</th>
                </tr>
                  {
                    this.state.orders.map((item) => {
                      return(
                        <tr>
                          <td>{item.ID}</td>
                          <td>{item.TotalPrice}$</td>
                          <td>{this.timeStampConverter(item.Date)}</td>
                        </tr>
                      )
                    })
                  }
              </table>
            </div>
            <div className="admin-send-container">
              <h2>To: {this.state.info.Name}</h2>
              <form onSubmit={this.handleSendSubmit}>
                <div className="mt-5">
                  <RichTextBox id="mycustomer-textarea" onChange={this.handleTextChange} errorId="textError" error={this.state.textError}/>
                </div>
                <div className="mt-4 admin-flex">
                  <DefaultButton text="Submit" style={{background:'#F06292', border: '1px solid #F06292'}} onClick={this.handleSendClick} />
                  <div className="mx-2">
                    <DefaultButton text="Cancel" style={{background:'#8c8c8c', border: '1px solid #8c8c8c'}} onClick={this.handleSendCancelClick} />
                  </div>
                </div>
              </form>
              <div className="mt-4">
                <span className={`admin-noti-${this.state.sendNotiStatus}`} >
                  {this.state.sendNotiMessage}
                </span>
              </div>
            </div>
          </div>
        </div>
      )
  }

}

export default UserLog