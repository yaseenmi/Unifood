import React, { Component } from 'react'
import "./styles/EditCategory.css"
import "../../cards/styles/CardProduct.css"
import DefaultButton from "../../inputs/DefaultButton"
import photo from "./../../../assets/images/Myphoto.jpg"
import MessageBox from "../../alerts/MessageBox";
import axios from 'axios'
import TextBox from '../../inputs/TextBox'
import $ from "jquery"
import RichTextBox from '../../inputs/RichTextBox'
class EditCategory extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            restName:"",
            result:[],
            name: "",
            desc: "",
            image:"",
            imagename:"",
            filename:"",
            filepath:"",
            resMessage:"",
            isMessageBoxOpen: "false",
            messageBoxTitle: "",
            messageBoxDescription: "",
            messageBoxControls: "ok",
            Errormessage:"",
            Successmessage:"",
            errors: {
              imageError:"",
              nameError: "",
              descriptionError:"",
          },
        }

        this.messageBoxValueSelected = this.messageBoxValueSelected.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDesChange = this.handleDesChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.onEditClicked = this.onEditClicked.bind(this);
        this.handleIDChange = this.handleIDChange.bind(this);

        this.nameFieldInputed = this.nameFieldInputed.bind(this);
        this.descriptionFieldInputed = this.descriptionFieldInputed.bind(this);
        this.imageFieldInputed = this.imageFieldInputed.bind(this);


    }
    handleIDChange = (event) => {
      this.setState({ ID: event.target.value})
  }
    handleNameChange = (event) => {
      this.setState({ name: event.target.value})
  }

  handleDesChange = (event) => {
      this.setState({ desc: event.target.value})
  }

  handleImageChange = (event) => {
      this.setState({ image: event.target.files[0]})
      this.setState({ imagename: event.target.files[0].name})
  }
  messageBoxValueSelected(value) {
    if (value === "ok") {
      this.setState({ isMessageBoxOpen: "false" })
    } 
    else{
      this.setState({ isMessageBoxOpen: "false" })
    }
  }
      
      onEditClicked = async event =>{
        event.preventDefault();
        let nameField = $("#name-in");
        let nameValue = nameField.val();
        let nameError = $("#name-error");
  
        let descriptionField = $("#description-in");
        let descriptionValue = descriptionField.val();
        let descriptionError = $("#description-error");

        let imageField = $("#image-in");
        let imageValue = imageField.val();
        let imageError = $("#image-error");

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
    if (imageValue === "") {
      imageError.css("display", "flex").show();
      errors.imageError = "image can't be empty.";
      this.setState({errors});
    }
    else if(nameValue !== "" && descriptionValue !== "" && imageValue !== "") {

        let params = this.props.match.params
        let idc=params.idc;
        const formData = new FormData();
        formData.append('name',this.state.name);
        formData.append('image',this.state.image);
        formData.append('desc',this.state.desc);
    
        await axios.put(`http://localhost:3001/Category/edit/${idc}`,formData).then(resp=>{
            this.setState({
              filename:resp.data.fileName,
              filepath:resp.data.filePath,
              Errormessage:resp.data.Errormessage,
              Successmessage:resp.data.Successmessage,
            })
        })
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
      let idc=params.idc;
    axios.get(`http://localhost:3001/Category/getCategory_Detail/${idc}`).then(resp =>{
      this.setState({result:resp.data.result,restName:resp.data.restName})
    })
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
    render() {
        return (
            <div>
               {this.state.result.map((val)=>{
                  return(
                <form>
                <div className="background">
                    <div class="card_img "> 
                        <div className="product_detail">
                            <h5>CATEGORY IMAGE</h5>
                        </div>
                        <div class="photo">
                            <div className="form-group">
                            <TextBox
                              inputId="image-in"
                              errorId="image-error"
                              error={this.state.errors.imageError}
                              type="file"
                              placeholder={val.Name}
                              onChange={this.handleImageChange}
                              onInput={this.imageFieldInputed}
                              />
                            </div>
                            <img className="edit-image_detail" src={`http://localhost:3001/images/restaurants/${this.state.restName}/categories/${val.Image}`} alt={val.Image} />
                        </div>
                    </div>
            
                    <div className="card_detail">
                    <div className="product_detail">
                            <h5>CATEGORY DETAILS</h5>
                        </div>
                        <div className="form-group">
                        &nbsp;<label className="label">Name:</label>
                        <TextBox
                          inputId="name-in"
                          errorId="name-error"
                          error={this.state.errors.nameError}
                          type="text"
                          placeholder={val.CategoryName}
                          onChange={this.handleNameChange}
                          onInput={this.nameFieldInputed}
                        />
                    </div>

                    <div className="form-group">
                    &nbsp;<label className="label">Description:</label>
                    <RichTextBox
                          inputId="description-in"
                          errorId="description-error"
                          error={this.state.errors.descriptionError}
                          type="text"
                          placeholder={val.Description}
                          onChange={this.handleDesChange}
                          onInput={this.descriptionFieldInputed}
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
export default EditCategory;