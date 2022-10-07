import React, { Component } from 'react';
import axios from 'axios';
import Cookies from '../assitance-methods/Cookies';


class Notifications extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }
  
  componentDidMount = () => {
    if(!Cookies.get(`id`)){
      window.location.href = `http://localhost:3000/`
    }
  }


  render() {
    return (
    <div></div>
    );
  }
}

export default Notifications