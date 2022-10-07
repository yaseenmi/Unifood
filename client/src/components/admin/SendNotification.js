import React, { Component } from 'react';
import axios from 'axios';

import './styles/AddRestaurant.css'
import TextBox from './../inputs/TextBox';
import RichTextBox from './../inputs/RichTextBox';
import DefaultButton from './../inputs/DefaultButton';
import SelectBox from '../inputs/SelectBox';
import Cookies from '../assitance-methods/Cookies';
import getHost from '../assitance-methods/getHost';


class SendNotification extends Component {
  constructor(props){
    super(props)
    this.state = {
      textError: '',
      text: '',
      to: '',
      err: '',
      resStatus: '',
      resMessage: ''
    }
  }

  componentDidMount = () => {
    if(!Cookies.get("id")){
      window.location.href = "http://localhost:3000/"
    }
  }

  handleTextChange = (event) => {
    this.setState({ text: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('id', Cookies.get("id"));
    formData.append('to', this.state.to);
    formData.append('text', this.state.text);

    if(this.state.text == '' || this.state.to == ''){
      this.setState({ err: "Fields can't be empty" })
    }
    else{
      axios.post(`${getHost()}/api/admin/notification/send`, formData).then(res => {
        this.setState({
          resStatus: res.data.status,
          resMessage: res.data.message
        })
      }).catch(err => {
        console.log(err)
      })
    }
  }

  render() {
    return (
      <div className="center-container">
        <div id="add-res-container" style={{height: 'auto'}}>
          <form onSubmit={this.handleSubmit}>
            <h2>Send Notification</h2>
            <div>
              <div className="mt-4">
                  <SelectBox styles={{width: '100%'}} items={['To', 'Customer', 'Restaurant']} selectedIndex={"To"} onValueSelected={(value) => {
                    this.setState({ to: value })
                  }} />
              </div>
              <div className="mt-4">
                <label for="usr">Message:</label>
                <RichTextBox placeholder="" id="mycustomer-textarea" onChange={this.handleTextChange} errorId="textError" error={this.state.textError}/>
              </div>
              <div className="mt-4">
                <DefaultButton text="Submit" inputType="submit" size="medium"/>
              </div>
              <div className="mt-4">
                <p style={{color: 'crimson'}}>{this.state.err}</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SendNotification