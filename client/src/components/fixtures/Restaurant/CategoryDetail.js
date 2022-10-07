import React, { Component } from 'react'
import "./styles/CategoryDetail.css"
import DefaultButton from "../../inputs/DefaultButton"
import photo from "./../../../assets/images/Myphoto.jpg"
import { NavLink } from "react-router-dom"
import "../../cards/styles/CardProduct.css"
import MessageBox from "../../alerts/MessageBox";
import axios from "axios"
class CategoryDetail extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            restName:"",
            result:[],
            isMessageBoxOpen: "false",
            messageBoxTitle: "",
            messageBoxDescription: "",
            messageBoxControls: "yes-no",
            currentDangerAction: "delete",
        }
        this.messageBoxValueSelected = this.messageBoxValueSelected.bind(this);
        this.deleteCategoryClicked = this.deleteCategoryClicked.bind(this);
    
    }
    messageBoxValueSelected(value) {
        if (value === "Yes") {
          let action = this.state.currentDangerAction;
          if (action === "delete")
          {
            let params = this.props.match.params;
            let idc=params.idc;
            axios.delete(`http://localhost:3001/Category/delete/${idc}`) 
            this.setState({ isMessageBoxOpen: "false" });               
          }
          window.location.href="/restaurant_admin/category"
        } else {
          this.setState({ isMessageBoxOpen: "false" });
        }
      }
      
      deleteCategoryClicked() {
        this.setState({ isMessageBoxOpen: "true" });
        this.setState({ messageBoxTitle: "Delete Category" });
        this.setState({
          messageBoxDescription:
            "Do you want really to delete this category?",
        });
        this.setState({ currentDangerAction: "delete" });
      }
      componentDidMount(){
        axios.get("http://localhost:3001/RestaurantEnter/login").then((response)=>{
          if(response.data.loggedIn === true){
          }
          else {
            window.location.href = "/entry"
          }
      })
        let params = this.props.match.params
        let idc=params.idc;
      axios.get(`http://localhost:3001/Category/getCategory_Detail/${idc}`).then(resp =>{
        this.setState({result:resp.data.result,restName:resp.data.restName})
      })
    }
    render() {
        return (
            <div>{this.state.result.map((val)=>{
              return(
                <div>
                <div className="background">
                    <div class="card_img "> 
                        <div className="product_detail">
                            <h5>CATEGORY IMAGE</h5>
                        </div>
                        
                        <div class="photo">
                            <img className="category-image_detail" src={`http://localhost:3001/images/restaurants/${this.state.restName}/categories/${val.Image}`} alt={val.Image} />
                        </div>
                    </div>
            
                    <div className="card_detail">
                    <div className="product_detail">
                            <h5>CATEGORY DETAILS</h5>
                        </div>
                        <h2 className="name_detail">{val.CategoryName}</h2>
                        <p class="product_description">{val.Description}</p>
                    </div>  
                   
                </div> <div className="form-group ">
                    <DefaultButton className="form-control" style={{background:"var(--error-color)" , border:"1px solid var(--error-color)"}} text="Delete" onClick={this.deleteCategoryClicked} /><br></br>
                    <NavLink to={`/restaurant_admin/category/category_detail/${val.ID}/edit_category`}><DefaultButton className="form-control" style={{background:"#2196f3" , border:"1px solid #2196f3"}} text="Edit"  /></NavLink>
                </div>
                </div>
                )
              })}
          
                
                <MessageBox
              title={this.state.messageBoxTitle}
              description={this.state.messageBoxDescription}
              controls={this.state.messageBoxControls}
              type="warning"
              isOpen={this.state.isMessageBoxOpen}
              onValueSelected={this.messageBoxValueSelected}
            />
            </div>
        )
    }
}
export default CategoryDetail;