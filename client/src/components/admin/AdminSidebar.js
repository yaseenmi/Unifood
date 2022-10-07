import React, { Component } from 'react'
import { NavLink, withRouter } from "react-router-dom"
import Cookies from '../assitance-methods/Cookies';
import './styles/AdminSidebar.css'

class AdminSidebar extends Component {
    
    constructor(props) {
        super(props);
    
        // State Object
        this.state = {
    
        }

        this.componentDidMount = () => {
            if(!Cookies.get("id")){
                window.location.href = "http://localhost:3000/"
            }
        }
        
    }

    render() {
        return (
          <div className="admin-sidebar">
                <div className="links">
                    <NavLink exact to="/admin" className="link" activeClassName="selected">
                        <span className="icon"><i class="bi bi-house"></i></span>
                        <span className="title">Home</span>
                    </NavLink>

                    <NavLink to="/admin/restaurants" className="link" activeClassName="selected">
                        <span className="icon"> <i class="bi bi-shop"></i> </span>
                        <span className="title">Restaurants</span>
                    </NavLink>

                    <NavLink exact to="/admin/add" className="link" activeClassName="selected">
                        <span className="icon"><i class="bi bi-plus-circle"></i></span>
                        <span className="title">Add Restaurant</span>
                    </NavLink>

                    <NavLink to="/admin/users" className="link" activeClassName="selected">
                        <span className="icon"><i class="bi bi-people"></i> </span>
                        <span className="title">Users</span>
                    </NavLink>

                    <NavLink exact to="/admin/blacklist" className="link" activeClassName="selected">
                        <span className="icon"><i class="bi bi-slash-circle"></i> </span>
                        <span className="title">Black list</span>
                    </NavLink>

                    <NavLink to="/admin/hidden" className="link" activeClassName="selected">
                        <span className="icon"><i class="bi bi-eye-slash"></i></span>
                        <span className="title">Hidden</span>
                    </NavLink>
                </div>
          </div>
        );
    }
}

export default withRouter(AdminSidebar)