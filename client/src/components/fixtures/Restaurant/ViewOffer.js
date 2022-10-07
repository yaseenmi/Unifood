import React,{Component} from 'react'
import { NavLink, withRouter, Link } from "react-router-dom"
import "../../cards/styles/CardRestaurant.css"
import axios from "axios"
class ViewOffer extends Component {
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

        axios.get("http://localhost:3001/Offer/get").then(resp =>{
          this.setState({result:resp.data,resultBackup:resp.data})
        })
      }
      Search = (e)=>{
        let value = e.target.value.trim().toLowerCase();
        let result = this.state.resultBackup.filter((el) => el.Description.trim().toLowerCase().includes(value));
        this.setState({result: result});
    }
    render() {
        return (

<div>
<div className="background_restaurant">
    <div className="form-group">
        <input type="text" placeholder="Search For Offer Name" className="form-control" onInput={this.Search}/>
    </div>
<div className="card_restaurant">
    <table className="restaurant_table">
        <thead className="restaurant_thead">
            
            <tr>
                <th>Offer</th>
                <th>Discount</th>
                <th>Before Discount</th>
                <th>After Discount</th>
            </tr>
            
        </thead>
        <tbody className="restaurant_tbody">
        {this.state.result.map((val)=>{
              return(
                <tr>    

                <td> <NavLink className="link" to={`/restaurant_admin/offer/offer_detail/${val.OfferID}`}>{val.Description}</NavLink></td>
                <td> <NavLink className="link" to={`/restaurant_admin/offer/offer_detail/${val.OfferID}`}>{val.Discount}%</NavLink></td>
                <td> <NavLink className="link" to={`/restaurant_admin/offer/offer_detail/${val.OfferID}`}>{val.Price}</NavLink></td>
                <td> <NavLink className="link" to={`/restaurant_admin/offer/offer_detail/${val.OfferID}`}>{((100-val.Discount)*val.Price)/ 100 }</NavLink></td>

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

export default withRouter(ViewOffer)