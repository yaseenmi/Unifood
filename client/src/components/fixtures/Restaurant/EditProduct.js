import React, { Component } from 'react'
import "./styles/EditProduct.css"
import "../../cards/styles/CardProduct.css"
import DefaultButton from "../../inputs/DefaultButton"
import photo from "./../../../assets/images/Myphoto.jpg"
import RadioButton from '../../inputs/RadioButton';
import MessageBox from "../../alerts/MessageBox";
import axios from "axios"
import TextBox from '../../inputs/TextBox'
import RichTextBox from '../../inputs/RichTextBox'
import $ from 'jquery'
import getHost from '../../assitance-methods/getHost'
class EditProduct extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            isMessageBoxOpen: "false",
            messageBoxTitle: "",
            messageBoxDescription: "",
            messageBoxControls: "ok",
            name: "",
            desc: "",
            price: "",
            category:"",
            image: "",
            imagename:"",
            isAvailable:"",
            filename:"",
            filepath:"",
            resMessage:"",
            result:[],
            restName:"",
            CategoryResult:[],
            Errormessage:"",
            Successmessage:"",
            errors: {
              imageError:"",
              nameError: "",
              descriptionError:"",
              priceError:"",
              categoryError:"",
              statusError:"",
          },
        }
        this.messageBoxValueSelected = this.messageBoxValueSelected.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDesChange = this.handleDesChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleIsAvailableChange = this.handleIsAvailableChange.bind(this);
        this.onEditClicked = this.onEditClicked.bind(this);

        this.nameFieldInputed = this.nameFieldInputed.bind(this);
        this.descriptionFieldInputed = this.descriptionFieldInputed.bind(this);
        this.imageFieldInputed = this.imageFieldInputed.bind(this);
        this.priceFieldInputed = this.priceFieldInputed.bind(this);
        this.categoryFieldInputed = this.categoryFieldInputed.bind(this);

        
    }
  

    handleNameChange = (event) => {
        this.setState({ name: event.target.value})
    }
  
    handleDesChange = (event) => {
        this.setState({ desc: event.target.value})
    }
  
    handlePriceChange = (event) => {
        this.setState({ price: event.target.value})
    }
  
    handleCategoryChange = (event) => {
        this.setState({ category: event.target.value})
    }
  
      handleImageChange = (event) => {
          this.setState({ image: event.target.files[0]})
          this.setState({ imagename: event.target.files[0].name})
      }
      handleIsAvailableChange = (event) => {
        this.setState({isAvailable: event.target.value})
        if(this.state.isAvailable === 0){
          $("#notAvailable").prop("checked",true)
        }
        else{
          $("Available").prop("checked",true)
        }
    }
  

    messageBoxValueSelected(value) {
      if (value === "ok") {
        this.setState({ isMessageBoxOpen: "false" })
      } 
      else{
        this.setState({ isMessageBoxOpen: "false" })
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

        let params = this.props.match.params;
        let idp=params.idp;
      axios.get(`${getHost()}/Product/getProduct_Detail/${idp}`).then(resp =>{
        this.setState({result:resp.data.result,restName:resp.data.restName})
      })
      axios.get(`${getHost()}/Category/get`).then(resp =>{
        this.setState({CategoryResult:resp.data.result})
      })
    }
    onEditClicked = async event => {
      event.preventDefault();
      let nameField = $("#name-in");
      let nameValue = nameField.val();
      let nameError = $("#name-error");

      let descriptionField = $("#description-in");
      let descriptionValue = descriptionField.val();
      let descriptionError = $("#description-error");

      let priceField = $("#price-in");
      let priceValue = priceField.val();
      let priceError = $("#price-error");
      
      let imageField = $("#image-in");
      let imageValue = imageField.val();
      let imageError = $("#image-error");

      let categoryField = $("#category-in");
      let categoryValue = categoryField.val();
      let categoryError = $("#category-error");

      let errors = this.state.errors;

      if (nameValue === "") {
        nameError.css("display", "flex").show();
        errors.nameError = "Product name can't be empty.";
        this.setState({errors});
    }
      if (descriptionValue === "") {
      descriptionError.css("display", "flex").show();
      errors.descriptionError = "Description can't be empty.";
      this.setState({errors});
  }
  if (priceValue === "") {
    priceError.css("display", "flex").show();
    errors.priceError = "Price can't be empty.";
    this.setState({errors});
 }
  if (imageValue === "") {
    imageError.css("display", "flex").show();
    errors.imageError = "image can't be empty.";
    this.setState({errors});
  }
  if (categoryValue === "") {
    categoryError.css("display", "flex").show();
    errors.categoryError = "category can't be empty.";
    this.setState({errors});
  }
    else if(nameValue !== "" && descriptionValue !== "" && priceValue !== "" && imageValue !== "" && categoryValue !== "") {
      let params = this.props.match.params;
      let idp=params.idp;
      const formData= new FormData();
      formData.append('name', this.state.name);
      formData.append('desc', this.state.desc);
      formData.append('price', this.state.price);
      formData.append('image', this.state.image);
      formData.append('isAvailable',this.state.isAvailable);
      formData.append('category', this.state.category);
      await axios.put(`${getHost()}/Product/edit/${idp} `,formData).then(resp=>{
          this.setState({
            filename:resp.data.fileName,
            filepath:resp.data.filePath,
            Errormessage:resp.data.Errormessage,
            Successmessage:resp.data.Successmessage,
          })
      })
    }
    }
    nameFieldInputed(e) {
      let nameValue = e.currentTarget.value;
      let nameError = $("#name-error");
      let errors = this.state.errors;
      if (nameValue === "") {
          nameError.css("display", "flex").show();
          errors.nameError = "Product name can't be empty.";
          this.setState({errors});
      } else {
          nameError.hide();
          errors.nameError = "";
          this.setState({errors});
      }
  }
  descriptionFieldInputed(e) {
    let descriptionValue = e.currentTarget.value;
    let descriptionError = $("#description-error");
    let errors = this.state.errors;
    if (descriptionValue === "") {
        descriptionError.css("display", "flex").show();
        errors.descriptionError = "Description can't be empty.";
        this.setState({errors});
    } else {
        descriptionError.hide();
        errors.descriptionError = "";
        this.setState({errors});
    }
}
priceFieldInputed(e) {
  let priceValue = e.currentTarget.value;
  let priceError = $("#price-error");
  let errors = this.state.errors;
  if (priceValue === "") {
    priceError.css("display", "flex").show();
      errors.priceError = "Price can't be empty.";
      this.setState({errors});
  } else {
    priceError.hide();
      errors.priceError = "";
      this.setState({errors});
  }
}
imageFieldInputed(e){
  let imageValue = e.currentTarget.value;
  let imageError = $("#image-error");
  let errors = this.state.errors;
  if (imageValue === "") {
    imageError.css("display", "flex").show();
      errors.imageError = "image can't be empty.";
      this.setState({errors});
  } else {
    imageError.hide();
      errors.imageError = "";
      this.setState({errors});
  }
}
categoryFieldInputed(e){
  let categoryValue = e.currentTarget.value;
  let categoryError = $("#category-error");
  let errors = this.state.errors;
  if (categoryValue === "") {
    categoryError.css("display", "flex").show();
      errors.categoryError = "category can't be empty.";
      this.setState({errors});
  } else {
    categoryError.hide();
      errors.categoryError = "";
      this.setState({errors});
  }
}
    render() {
        return (
            <div>
              {this.state.result.map((val)=>{
                if(val.isAvailable === 1){
                  this.state.isAvailable ="1"
                }
                else{
                  this.state.isAvailable ="0"
                }
                                return(
                <form>
                <div className="background">
                    <div class="card_img "> 
                        <div className="product_detail">
                            <h5>PRODUCT IMAGE</h5>
                        </div>
                        <div class="photo">
                            <div className="form-group">
                            
                            <TextBox
                              className="form-control"
                              inputId="image-in"
                              errorId="image-error"
                              error={this.state.errors.imageError}
                              type="file"
                              onChange={this.handleImageChange}
                              onInput={this.imageFieldInputed}
                              />
                            </div>
                            <img className="edit-image_detail" src={`${getHost()}/images/restaurants/${this.state.restName}/products/${val.ProductImage}`} alt={val.ProductImage} />
                        </div>
                    </div>
            
                    <div className="card_detail">
                    <div className="product_detail">
                            <h5>PRODUCT DETAILS</h5>
                        </div>
                        <div className="form-group">
                        &nbsp;<label className="label">Name:</label>
                        <TextBox
                          className="form-control"
                          inputId="name-in"
                          errorId="name-error"
                          error={this.state.errors.nameError}
                          type="text"
                          placeholder={val.Name}
                          onChange={this.handleNameChange}
                          onInput={this.nameFieldInputed}
                        />
                    </div>

                    <div className="form-group">
                    &nbsp;<label className="label">Description:</label>
                    <RichTextBox
                          className="form-control"
                          inputId="description-in"
                          errorId="description-error"
                          error={this.state.errors.descriptionError}
                          type="text"
                          placeholder={val.ProductDescription}
                          onChange={this.handleDesChange}
                          onInput={this.descriptionFieldInputed}
                        />
                        </div>
                    </div>

                    <div className="card_info ">
                        <div className="product_detail">
                            <h5>PRODUCT INFO</h5>
                        </div>
                        <div className="form-group">
                        &nbsp;<label className="label">Price:</label>
                            <TextBox
                              className="form-control"
                              inputId="price-in"
                              errorId="price-error"
                              error={this.state.errors.priceError}
                              type="number"
                              placeholder={val.Price}
                              onChange={this.handlePriceChange}
                              onInput={this.priceFieldInputed}
                        />
                        </div>


                        <div className="form-group">
                        <select className="form-control" id="category-in" onChange={this.handleCategoryChange} onInput={this.categoryFieldInputed}>
                        <option value="" selected disabled hidden>Category</option>
                        {this.state.CategoryResult.map((val)=>{
                                return(
                            <option value={val.ID}>{val.CategoryName}</option>
                                )
                        })}
 
                        </select>

                        </div>
                        <div id="category-error" className="text-box-error">
                            <i class="bi bi-x-circle"></i>
                              {this.state.errors.categoryError}
                            </div>

                        <div className="form-group Radio-button">
                        &nbsp;Status :
                        <RadioButton
                          id="Available"
                          groupName="status"
                          for="Available"
                          text="Available"
                          value="1"
                          onChange={this.handleIsAvailableChange}
                        />
                        <RadioButton
                          id="notAvailable"
                          groupName="status"
                          for="notAvailable"
                          text="Not Available"
                          value="0"
                          onChange={this.handleIsAvailableChange}
                        />    
                    </div>
                            
                    </div>   
                 
                </div>
                <p className="result-error-message">{this.state.Errormessage}</p>
                <p className="result-success-message">{this.state.Successmessage}</p>
                <div className="form-group">
                <input type="submit" style={{background:"#4CAF50",color:"white"}} value="Save Changes" className="form-control" onClick={this.onEditClicked}/>        
                </div>
                </form>
                     )
                    })}
                 
                
                <MessageBox
              title={this.state.messageBoxTitle}
              description={this.state.messageBoxDescription}
              controls={this.state.messageBoxControls}
              type="success"
              isOpen={this.state.isMessageBoxOpen}
              onValueSelected={this.messageBoxValueSelected}
            />
       
            </div>
        )
    }
}
export default EditProduct;