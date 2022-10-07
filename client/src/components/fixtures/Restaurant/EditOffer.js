import React, { Component } from 'react'
import "./styles/EditOffer.css"
import "../../cards/styles/CardProduct.css"
import DefaultButton from "../../inputs/DefaultButton"
import photo from "./../../../assets/images/Myphoto.jpg"
import RadioButton from '../../inputs/RadioButton';
import MessageBox from "../../alerts/MessageBox";
import axios from 'axios'
import TextBox from '../../inputs/TextBox'
import $ from 'jquery'
class EditOffer extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            result:[],
            val:0.0,
            price:0.0,
            percent:0.0,
            isMessageBoxOpen: "false",
            messageBoxTitle: "",
            messageBoxDescription: "",
            messageBoxControls: "yes-no",
            currentDangerAction: "edit",
            Discount:"",
            Errormessage:"",
            Successmessage:"",
            errors: {
              discountError:"",

          },
        }
        this.messageBoxValueSelected = this.messageBoxValueSelected.bind(this);
        this.editOfferClicked = this.editOfferClicked.bind(this);
        this.handleDiscountChange = this.handleDiscountChange.bind(this);
        this.onEditClicked = this.onEditClicked.bind(this);

        this.discountFieldInputed = this.discountFieldInputed.bind(this);


        

    }

    messageBoxValueSelected(value) {
        if (value === "Yes") {
          let action = this.state.currentDangerAction;
          if (action === "edit")
          {
            // edit Method        
          }
        } else {
          this.setState({ isMessageBoxOpen: "false" });
        }
      }
      
    handleDiscountChange = (event) => {
        this.setState({Discount: event.target.value})
    }
      editOfferClicked() {
        this.setState({ isMessageBoxOpen: "true" });
        this.setState({ messageBoxTitle: "Edit Offer" });
        this.setState({
          messageBoxDescription:
            "Do you want really to save the changes?",
        });
        this.setState({ currentDangerAction: "edit" });
      }
    componentDidMount(){
      axios.get("http://localhost:3001/RestaurantEnter/login").then((response)=>{
        if(response.data.loggedIn === true){
        }
        else {
          window.location.href = "/entry"
        }
    })

        let params = this.props.match.params;
        let idof=params.idof;
      axios.get(`http://localhost:3001/Offer/getOffer_Price/${idof}`).then(resp =>{
        this.setState({result:resp.data})
      })
    }
    onEditClicked = async event => {
        event.preventDefault();
        let discountField = $("#discount-in");
        let discountValue = discountField.val();
        let discountError = $("#discount-error");

        let errors = this.state.errors;

        if (discountValue === "") {
          discountError.css("display", "flex").show();
          errors.discountError = "discount can't be empty.";
          this.setState({errors});
      }
      else if(discountValue !== "" && discountValue <= 100 ) {
        let params = this.props.match.params;
        let idof=params.idof;
        const formData= new FormData();
        formData.append('Discount', this.state.Discount);
        await axios.put(`http://localhost:3001/Offer/editDiscount/${idof} `,formData).then(resp=>{
            this.setState({
              Errormessage:resp.data.Errormessage,
              Successmessage:resp.data.Successmessage,
            })
        })
      }
    }
      discountFieldInputed(e){
        let discountValue = e.currentTarget.value;
        let discountError = $("#discount-error");
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
                <form>
                <div className="background">
                    <div className="offer-card-info">
                        <div className="product_detail">
                            <h5>OFFER INFO</h5>
                        </div>
                        {this.state.result.map((val)=>{
                            return(
                                <div>
                        <div className="form-group">
                        <p className="label">Price:</p>
                            <input type="text" id="price" disabled value={val.Price} id="price" className="form-control" />
                        </div>
   
                        <div className="form-group">
                        <p className="label">Discount Percentage:</p>
                            <TextBox
                              inputId="discount-in"
                              errorId="discount-error"
                              error={this.state.errors.discountError}
                              type="number"
                              placeholder={val.Discount}
                              onChange={this.handleDiscountChange}
                              onInput={this.discountFieldInputed}
                              />
                              <p id="percentVal">&nbsp;  After Discount : {((100-this.state.Discount)*val.Price)/ 100 }</p>
                        </div>
                            </div>  
                            )
    })}
                    </div>   
                 
                </div>
                </form>
                <p className="result-error-message">{this.state.Errormessage}</p>
                <p className="result-success-message">{this.state.Successmessage}</p>
                <div className="form-group">
                <DefaultButton className="form-control" style={{background:"#4CAF50" , border:"1px solid #2196f3"}} text="Save Changes"  onClick={this.onEditClicked}/>
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
export default EditOffer;