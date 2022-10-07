import React, { Component } from 'react'
import "./styles/OfferDetail.css"
import DefaultButton from "../../inputs/DefaultButton"
import photo from "./../../../assets/images/Myphoto.jpg"
import { NavLink } from "react-router-dom"
import "../../cards/styles/CardProduct.css"
import MessageBox from "../../alerts/MessageBox";
import axios from 'axios'
import $ from "jquery";
import getHost from '../../assitance-methods/getHost'
class OfferDetail extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            result:[],
            rateResult:[],
            isMessageBoxOpen: "false",
            messageBoxTitle: "",
            messageBoxDescription: "",
            messageBoxControls: "yes-no",
            currentDangerAction: "delete",
            sum:0,
            count:0,
            res:"",
        }
        this.messageBoxValueSelected = this.messageBoxValueSelected.bind(this);
        this.deleteOfferClicked = this.deleteOfferClicked.bind(this);

    }
    messageBoxValueSelected(value) {
        if (value === "Yes") {
          let action = this.state.currentDangerAction;
          if (action === "delete")
          {
            let params = this.props.match.params;
            let idof=params.idof;
            axios.delete(`${getHost()}/Offer/delete/${idof}`) 
            this.setState({ isMessageBoxOpen: "false" });        
          }
          window.location.href="/restaurant_admin/offer"
        } else {
          this.setState({ isMessageBoxOpen: "false" });
        }
      }
      deleteOfferClicked() {
        this.setState({ isMessageBoxOpen: "true" });
        this.setState({ messageBoxTitle: "Offer Deletion" });
        this.setState({
          messageBoxDescription:
            "Do you want really to delete this Offer?",
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
      let idof=params.idof;
    axios.get(`${getHost()}/Offer/getOffer_Detail/${idof}`).then(resp =>{
      this.setState({result:resp.data})
    })
    axios.get(`${getHost()}/Offer/getOfferRate_Detail/${idof}`).then(resp =>{
        this.setState({rateResult:resp.data})
      })
}
    render() {
        return (
            <div>{this.state.result.map((val)=>{
                if(val.IsAvailable === 1){
                this.state.IsAvailable = "Available"         
                }
                else {
                    this.state.IsAvailable ="Not Available"
                }

                return(
                    <div>
                <div className="background">
                    <div class="card_img "> 
                        <div className="product_detail">
                            <h5>OFFER IMAGE</h5>
                        </div>
                        
                        <div class="photo">
                            <img className="image_detail" src={`${getHost()}/images/restaurants/${val.UserName}/products/${val.ProductImage}`} alt={val.ProductImage} />
                        </div>
                    </div>
            
                    <div className="card_detail">
                    <div className="product_detail">
                            <h5>OFFER DETAILS</h5>
                        </div>
                        <h2 className="name_detail">{val.Description}</h2>
                        <p class="product_description">{val.ProductDescription}</p>
                    </div>

                    <div className="card_info ">
                        <div className="product_detail">
                            <h5>OFFER INFO</h5>
                        </div>
                            <table className="product_table">
                                
                                <tr>
                                    <th>Actual Price</th>
                                    <td>{val.Price}</td>
                                </tr>
                                <tr>
                                    <th>Discount</th>
                                    <td>{val.Discount}%</td>
                                </tr>
                                
                                <tr>
                                    <th>Price After Discount</th>
                                    <td>{((100-val.Discount)*val.Price)/ 100}</td>
                                </tr>
                                
                                <tr>
                                    <th>Category</th>
                                    <td>{val.CategoryName}</td>
                                </tr>
                                <tr>
                                    <th>Status</th>
                                    <td>{this.state.IsAvailable}</td>
                                </tr>
                                <tr>
                                    <th>rate</th>
                                    
                                    <td>  

                                    </td>
                                </tr>
                            </table>
                                 
                    </div>   

                </div>


 <div className="form-group ">
                    <DefaultButton className="form-control" style={{background:"var(--error-color)" , border:"1px solid var(--error-color)"}} text="Delete" onClick={this.deleteOfferClicked}/><br></br>
                    <NavLink to={`/restaurant_admin/offer/offer_detail/${val.OfferID}/edit_offer`}><DefaultButton className="form-control" style={{background:"#2196f3" , border:"1px solid #2196f3"}} text="Edit"  /></NavLink>
                </div>
                </div>
                              )
})}    
{this.state.rateResult.map((val)=>{
                this.state.sum = val.Value + this.state.sum
                                    this.state.count = this.state.count + 1
                                    this.state.res = ~~(this.state.sum / this.state.count)
 
                                    if(this.state.res === 1){
                                        let star1 = $('.s1')
                                        star1.css("color","orange")
                                        let star2 = $('.s2')
                                        star2.css("color","black")
                                        let star3 = $('.s3')
                                        star3.css("color","black")
                                        let star4 = $('.s4')
                                        star4.css("color","black")
                                        let star5 = $('.s5')
                                        star5.css("color","black")
                                    }
                                    else if(this.state.res === 2){
                                        let star1 = $('.s1')
                                        star1.css("color","orange")
                                        let star2 = $('.s2')
                                        star2.css("color","orange")
                                        let star3 = $('.s3')
                                        star3.css("color","black")
                                        let star4 = $('.s4')
                                        star4.css("color","black")
                                        let star5 = $('.s5')
                                        star5.css("color","black")
                                    }

                                    else if(this.state.res === 3){
   
                                        let star1 = $('.s1')
                                        star1.css("color","orange")
                                        let star2 = $('.s2')
                                        star2.css("color","orange")
                                        let star3 = $('.s3')
                                        star3.css("color","orange")
                                        let star4 = $('.s4')
                                        star4.css("color","black")
                                        let star5 = $('.s5')
                                        star5.css("color","black")
                                    }

                                    else if(this.state.res === 4){
                                        let star1 = $('.s1')
                                        star1.css("color","orange")
                                        let star2 = $('.s2')
                                        star2.css("color","orange")
                                        let star3 = $('.s3')
                                        star3.css("color","orange")
                                        let star4 = $('.s4')
                                        star4.css("color","orange")
                                        let star5 = $('.s5')
                                        star5.css("color","black")
                                    }
                                    else if(this.state.res === 5 ){
                                        let star = $('.fa-star')
                                        star.css("color","orange")

                                    }
})}
        <div  id="rating_detail" className="offer-rate">
            <span className="fa fa-star s1"></span>
            <span className="fa fa-star s2"></span>
            <span className="fa fa-star s3"></span>
            <span className="fa fa-star s4"></span>
            <span className="fa fa-star s5"></span>
        </div>
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
export default OfferDetail;