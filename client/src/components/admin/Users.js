import axios from 'axios';
import React, { Component } from 'react';
import { Link } from "react-router-dom"
import Cookies from '../assitance-methods/Cookies';
import getHost from '../assitance-methods/getHost';
import TextBox from './../inputs/TextBox'
import './styles/Tables.css'



class User extends Component {
  constructor(props){
    super(props)
    this.state = {
      Users : [],
      UsersBackup: []
    }
  }
  
  componentDidMount = () => {
    if(Cookies.get("id")){
      axios.get(`${getHost()}/api/admin/user/`).then( res => {
        this.setState({ 
          Users: res.data.users,
          UsersBackup: res.data.users 
        })
      }).catch(err => {
        console.log(err)
      })
    }
    else{
      window.location.href = "http://localhost:3000/"
    }
  }

  handleBanClick = (id) => {
      axios.post(`${getHost()}/api/admin/user/${id}/ban`).then( res => {
        this.componentDidMount()
      }).catch(err => {
        console.log(err)
      })
  }

  handleSearchChange = (event) =>{
    
    let value = event.target.value.toLowerCase();
    let searchArray = [];

    this.setState({ Users: this.state.UsersBackup }, () => {
      this.state.Users.map((item) => {
        if(item.Name.toLowerCase().match(value)){
          searchArray.push(item);
        }
      })
      this.setState({ Users: searchArray });
    }); 
  }

  render() {
    return (
        <div className="admin-table-container">
          <div>
            <TextBox placeholder="Search" onInput={this.handleSearchChange}/>
          </div>
          <div>
            <table>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th></th>
              </tr>
              {
                this.state.Users.map((item) => {
                  return(
                    <tr>
                    <td>{item.ID}</td>
                    <td>{item.Name}</td>  
                    <td className="op-icons"> 
                      <Link to="#" onClick={() => {this.handleBanClick(item.ID)}}><i class="bi bi-slash-circle"></i></Link>
                      <Link to={`/admin/users/${item.ID}`}><i class="bi bi-arrow-right-circle"></i></Link>
                    </td>
                  </tr>
                  )
                })
              }
            </table>
          </div>
        </div>
    );
  }
}

export default User