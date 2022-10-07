import React, { Component } from 'react';
import { Link } from "react-router-dom"
import TextBox from './../inputs/TextBox'
import MessageBox from './../alerts/MessageBox'
import './styles/Tables.css'
import './styles/Restaurants.css'
import axios from 'axios'
import Cookies from '../assitance-methods/Cookies';
import DefaultButton from '../inputs/DefaultButton';
import getHost from '../assitance-methods/getHost';



class Restaurant extends Component {
  constructor(props){
    super(props)

    this.state = {
      Restaurants : [],
      RestaurantsBackup : [],
      hiddePopupState : "false",
      resName: '',
      resID: '',
      isExist: 0
    }
  }

  handleHiddeAlert = (rName, rID) =>{
    this.setState({ 
      hiddePopupState : 'true',
      resName: rName,
      resID: rID
    })
  }

  handlePopup = (value) =>{
    if(value == "Cancel" || value == "No"){
      this.setState({ hiddePopupState : 'false'})
    }
    else if(value == "Yes"){
      this.handleHide(this.state.resID, this.state.resName);
      this.setState({ hiddePopupState: "false" });
    }
  }

  handleHide = (rID, rName) => {
    const formData = new FormData();
    formData.append('id', rID);
    let name = rName;
    axios.post(`${getHost()}/api/admin/restaurant/${name}/hide`, formData).then( res => {
      document.location.reload();
    }).catch(err => {
      console.log(err)
    })
  }

  handleSearchChange = (event) =>{
    
    let value = event.target.value.toLowerCase();
    let searchArray = [];

    this.setState({ Restaurants: this.state.RestaurantsBackup }, () => {
      this.state.Restaurants.map((item) => {
        if(item.Name.toLowerCase().match(value)){
          searchArray.push(item);
        }
      })
      this.setState({ Restaurants: searchArray });
    }); 
  }

  componentDidMount = () => {
    if(!Cookies.get("id")){
        window.location.href = "http://localhost:3000/"
    }
    else{
      axios
        .get(`${getHost()}/api/admin/restaurant`)
        .then((response) => {
          this.setState({
            Restaurants: response.data.rests,
            RestaurantsBackup: response.data.rests,
          });
        });
    }  
  }

  render() {
    return (
        <div className="admin-table-container">
          <div>
            <TextBox placeholder="Search" onChange={this.handleSearchChange}/>
          </div>
          <div>
            <table>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th></th>
              </tr>
              {
                this.state.Restaurants.map((item) => {
                  return(
                    <tr>
                    <td>{item.ID}</td>
                    <td>{item.Name}</td>
                    <td className="op-icons"> 
                      <a href="#" onClick={() => {this.handleHiddeAlert(item.Name, item.UserID)}}><i class="bi bi-eye-slash"></i></a>
                      <Link to={`/admin/restaurants/${item.Name}`}><i class="bi bi-arrow-right-circle"></i></Link>
                    </td>
                  </tr>
                  )
                })
              }
            </table>
            <MessageBox 
              isOpen={this.state.hiddePopupState} 
              onValueSelected={this.handlePopup} 
              controls="yes-no"
              title="Hide" 
              description="Are you sure you want to hide this restaurant" 
              type="warning" 
            />

          </div>
          
        </div>
    );
  }
}

export default Restaurant