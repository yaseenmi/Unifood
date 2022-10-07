import React, { Component } from 'react'
import "./styles/ProductDetail.css"
import DefaultButton from "../../inputs/DefaultButton"
import { NavLink } from "react-router-dom"
import "../../cards/styles/CardProduct.css"
import MessageBox from "../../alerts/MessageBox";
import $ from "jquery";
import axios from "axios"
import TextBox from '../../inputs/TextBox'
import getHost from '../../assitance-methods/getHost'
class ProductDetail extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            Discount:"",
            Description:"",
            price:"",
            result:[],
            restName:"",
            rateResult:[],
            IsAvailable:"",
            Errormessage:"",
            Successmessage:"",
            isMessageBoxOpen: "false",
            messageBoxTitle: "",
            messageBoxDescription: "",
            messageBoxControls: "yes-no",
            currentDangerAction: "delete",
            sum:0,
            count:0,
            res:"",
            errors: {
                discountError:"",
            },
        }
        this.messageBoxValueSelected = this.messageBoxValueSelected.bind(this);
        this.handleDiscountChange = this.handleDiscountChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleDiscountChange = this.handleDiscountChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);

        this.discountFieldInputed = this.discountFieldInputed.bind(this);

        
    }
    messageBoxValueSelected(value) {
        
        if (value === "Yes") {
          let action = this.state.currentDangerAction;
          if (action === "delete")
          {
            let params = this.props.match.params;
            let idp=params.idp;
            axios.delete(`${getHost()}/Product/delete/${idp}`) 
            this.setState({ isMessageBoxOpen: "false" });  
          } 
          window.location.href="/restaurant_admin/product"
        }
         else {
          this.setState({ isMessageBoxOpen: "false" });
        }
      }
      discountShow(){
        $('#product-discount-in').toggle();
        $('#save').toggle();
        $('#afterDiscount').toggle();
      }    


    handleDiscountChange = (event) => {
        this.setState({Discount: event.target.value})
    }
    handlePriceChange = (event) => {
        this.setState({ price: event.target.value})
    }    
    handleDescriptionChange = (event) => {
      this.setState({ Description: event.target.value})
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
          let idp=params.idp;
        axios.get(`${getHost()}/Product/getProduct_Detail/${idp}`).then(resp =>{
          this.setState({result:resp.data.result,restName:resp.data.restName})
        })
        axios.get(`${getHost()}/Product/getProduct_rate/${idp}`).then(resp =>{
          this.setState({rateResult:resp.data})
        })
      }
      handleSubmit = async event => {
        event.preventDefault();
        let discountField = $("#product-discount-in");
        let discountValue = discountField.val();
        let discountError = $("#product-discount-error");

        let errors = this.state.errors;

        if (discountValue === "") {
          discountError.css("display", "flex").show();
          errors.discountError = "discount can't be empty.";
          this.setState({errors});
      }
      else if(discountValue !== "" && discountValue <= 100 ) {
        event.preventDefault();
        let params = this.props.match.params;
        let idp=params.idp;
        const formData= new FormData();
        formData.append('Discount', this.state.Discount);
        formData.append('Description', this.state.Description);
      await axios.post(`${getHost()}/Offer/insert/${idp}`,formData).then(resp=>{
            this.setState({
              Successmessage:resp.data.Successmessage,
              Errormessage:resp.data.Errormessage
            })
        })
    }
      }

      onDeleteClicked=()=>{

        this.setState({ isMessageBoxOpen: "true" });
        this.setState({ messageBoxTitle: "Product Deletion" });
        this.setState({
          messageBoxDescription:
            "Do you want really to delete this product?",
        });
        this.setState({ currentDangerAction: "delete" });

      }
      discountFieldInputed(e){
        let discountValue = e.currentTarget.value;
        let discountError = $("#product-discount-error");
        let errors = this.state.errors;
        if (discountValue === "") {
          discountError.css("display", "flex").show();
            errors.discountError = "discount can't be empty.";
            this.setState({errors});
        
        }
        else if(discountValue > 100 ){
          discountError.css("display", "flex").show();
          errors.discountError = "discount can't be greater than 100";
          this.setState({errors});
        }
        else {
          discountError.hide();
            errors.discountError = "";
            this.setState({errors});
        }
      }
    render() {
        return (
            <div>
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
                            <h5>PRODUCT IMAGE</h5>
                        </div>
                        
                        <div class="photo">
                            <img className="image_detail" src={`${getHost()}/images/restaurants/${this.state.restName}/products/${val.ProductImage}`} alt={val.ProductImage} />
                        </div>
                    </div>
            
                    <div className="card_detail">
                    <div className="product_detail">
                            <h5>PRODUCT DETAILS</h5>
                        </div>
                        <h2><input type="text" class="name_detail" style={{border:"none" , background:"#f0eeeb"}} value={this.state.Description =val.Name} onChange={this.handleDescriptionChange}/></h2>
                        <p class="product_description">{val.ProductDescription}</p>

                        <div className="form-group">
                        <DefaultButton id="add-disconut-btn" text="add a discount if you want" onClick={this.discountShow}/>
                        <form onSubmit={this.handleSubmit}>
                        <TextBox
                              inputId="product-discount-in"
                              errorId="product-discount-error"
                              error={this.state.errors.discountError}
                              type="number"
                              placeholder="Discount Percentage"
                              onChange={this.handleDiscountChange}
                              onInput={this.discountFieldInputed}
                              />
                        <p id="afterDiscount" style={{display:"none"}}>After Discount: {((100-this.state.Discount)*val.Price)/ 100} </p>
                        <DefaultButton  id="save" style={{background:"#2196f3" , border:"1px solid #2196f3" ,display:"none"}} text="save"/>                         
                        </form>
                        <p style={{color:"red"}}>{this.state.Errormessage}</p>
                        <p style={{color:"green"}}>{this.state.Successmessage}</p>
                        </div>
                        
                    </div>

                    <div className="card_info ">
                        <div className="product_detail">
                            <h5>PRODUCT INFO</h5>
                        </div>
                        
                            <table className="product_table">
                            
                                <tr>
                                    <th>Price</th>
                                    <td>{val.Price}</td>
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
                                    {this.state.rateResult.map((val)=>{
                                    this.state.sum = val.Value + this.state.sum
                                    this.state.count = this.state.count + 1
                                    this.state.res = Math.round(this.state.sum / this.state.count)
 
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
                                    <td>
                                        <div  id="rating_detail">
                                        <span className="fa fa-star s1"></span>
                                        <span className="fa fa-star s2"></span>
                                        <span className="fa fa-star s3"></span>
                                        <span className="fa fa-star s4"></span>
                                        <span className="fa fa-star s5"></span>
                                        </div>
                                    </td>
                                
                                </tr>
                                 
                            </table>
                    </div>   
                 
                </div>
                <div className="form-group ">
                    <DefaultButton className="form-control" style={{background:"var(--error-color)" , border:"1px solid var(--error-color)"}} text="Delete" onClick={this.onDeleteClicked} /><br></br>
                    <NavLink to={`/restaurant_admin/product/product_detail/${val.ProductID}/edit_product`}><DefaultButton className="form-control" style={{background:"#2196f3" , border:"1px solid #2196f3"}} text="Edit"  /></NavLink>
                </div>
                    </div>)
                                })}
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
export default ProductDetail;