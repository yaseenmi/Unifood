import React,{Component} from 'react'
import { NavLink, withRouter } from "react-router-dom"
import "./styles/ViewOrder.css"
import "../../cards/styles/CardRestaurant.css"
import axios from 'axios';
import SimpleDateTime from 'react-simple-timestamp-to-date'
import DefaultButton from '../../inputs/DefaultButton';
import $ from 'jquery'
class ViewOrder extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             result:[],
             resultBackup:[],

        }
    }
    componentDidMount(){
        axios.get("http://localhost:3001/RestaurantEnter/login").then((response)=>{
          if(response.data.loggedIn === true){
          }
          else {
            window.location.href = "/entry"
          }
      })

        axios.get("http://localhost:3001/Order/get").then(resp =>{
          this.setState({result:resp.data,resultBackup:resp.data})
        })
      }
      Search = (e)=>{
        let value = e.target.value.trim().toLowerCase();
        let result = this.state.resultBackup.filter((el) => el.UserName.trim().toLowerCase().includes(value));
        this.setState({result: result});
    }
    render() {
        return (
     
    <div>
        <div className="background_restaurant">
                    <div className="form-group">
                       <input type="text" placeholder="Search For Customer Name" className="form-control" onInput={this.Search}/>
                    </div>
        <div className="card_restaurant">
            <table className="restaurant_table">
                <thead className="restaurant_thead">
                    
                    <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Total Price</th>
                        <th>Order Status</th>
                    </tr>
                    
                </thead>
                <tbody className="restaurant_tbody">
                        {this.state.result.map((val)=>{
                           // if(val.Status=== "delivered"){
                          //      $('#status').css("color","green").show()
                          //  }
                         //   else if(val.Status=== "pending"){
                         //       $('#status').css("color","orange").show()
                         //   }
                          //  else if(val.Status=== "active"){
                          //      $('#status').css("color","lightblue").show()
                          //  }
                        return(                        
                        <tr>   
                        <td> <NavLink className="link" to={`/restaurant_admin/order/order_detail/${val.OID}/${val.CustomerID}`}>{val.OID}</NavLink></td>
                        <td> <NavLink className="link" to={`/restaurant_admin/order/order_detail/${val.OID}/${val.CustomerID}`}>{val.UserName}</NavLink></td>
                        <td> <NavLink className="link" to={`/restaurant_admin/order/order_detail/${val.OID}/${val.CustomerID}`}><SimpleDateTime dateSeparator="/" timeSeparator=":" meridians="1" format="YMD">{val.Date}</SimpleDateTime></NavLink></td>
                        <td> <NavLink className="link" to={`/restaurant_admin/order/order_detail/${val.OID}/${val.CustomerID}`}>{val.TotalPrice}</NavLink></td>
                        <td > <NavLink className="link" id="status" to={`/restaurant_admin/order/order_detail/${val.OID}/${val.CustomerID}`}>{val.Status}</NavLink></td>
                        </tr>        
                )         
    })}
                </tbody>
            </table>
        </div>
        </div>

    </div>
        );
    }
}

export default withRouter(ViewOrder)