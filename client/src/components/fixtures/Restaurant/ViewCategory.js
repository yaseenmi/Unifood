import React,{Component} from 'react'
import Header from '../Header'
import photo from "./../../../assets/images/Myphoto.jpg"
import { NavLink, withRouter } from "react-router-dom"
import "../../cards/styles/CardRestaurant.css"
import axios from "axios"
import getHost from '../../assitance-methods/getHost'
class ViewCategory extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             result:[],
             resultBackup:[],
             restName:"",
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

        axios.get("http://localhost:3001/Category/get").then(resp =>{
          this.setState({result:resp.data.result,resultBackup:resp.data.result,restName:resp.data.restName})
        })
      }
      Search = (e)=>{
        let value = e.target.value.trim().toLowerCase();
        let result = this.state.resultBackup.filter((el) => el.CategoryName.trim().toLowerCase().includes(value));
        this.setState({result: result});
    }
    render() {
        return (

<div>
<div className="background_restaurant">
        <div className="form-group">
            <input type="text" placeholder="Search For Category Name" className="form-control" onInput={this.Search}/>
        </div>
<div className="card_restaurant">
    <table className="restaurant_table">
        <thead className="restaurant_thead">
            
            <tr>
                <th>Category</th>
                <th>Name</th>
                <th>Description</th>
            </tr>
            
        </thead>
        <tbody className="restaurant_tbody">
          {this.state.result.map((val)=>{
              return(
          
                <tr>    
                   <td> <NavLink className="link" to={`/restaurant_admin/category/category_detail/${val.ID}`}><img style={{width:"50px",height: "50px",borderRadius: "50%",border:"none"}} src={`${getHost()}/images/restaurants/${this.state.restName}/categories/${val.Image}`} alt="" onerror="this.style.display='none'"/></NavLink></td>
                   <td> <NavLink className="link" to={`/restaurant_admin/category/category_detail/${val.ID}`}>{val.CategoryName}</NavLink></td>
                   <td> <NavLink className="link" to={`/restaurant_admin/category/category_detail/${val.ID}`}>{val.Description}</NavLink></td>
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

export default ViewCategory