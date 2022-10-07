import React, { Component } from 'react';
import axios from 'axios'
import TextBox from './../inputs/TextBox'
import DefaultButton from './../inputs/DefaultButton'
import './styles/AddRestaurant.css'
import CircleLoader from './../loaders/CircleLoader'
import $ from 'jquery'
import Cookies from '../assitance-methods/Cookies';
import getHost from '../assitance-methods/getHost';


class AddRestaurant extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            phone: '',
            file: '',
            resMessage: '',
            resStatus: '',
            nameError: '',
            phoneError: '',
            isLoading: false
        }
    }

    componentDidMount = () => {
        if(!Cookies.get("id")){
            window.location.href = "http://localhost:3000/"
        }
    }

    handleNameChange = (event) => {
        this.setState({name: event.target.value});
        this.handleSubmitDisableChange();
    }

    handlePhoneChange = (event) => {
        this.setState({phone: event.target.value});
        let Exp = /^[0-9]+$/;
        if(Exp.test(event.target.value) || event.target.value === ''){
            $("#phoneError").css('display', 'flex').hide();
            this.setState({ phoneError: "" })
        }
        else{
            $("#phoneError").css('display', 'flex').show();
            this.setState({ phoneError: "*Phone number can only have numbers" })
        }
        this.handleSubmitDisableChange();
    }

    handleFileChange = (event) => {
        
        this.setState({
            isLoading: true,
            file: event.target.files[0]
        }, () => {
            let reader = new FileReader();           
            reader.onload = (event) => {  
                $('.upload-icon').removeClass('admin-full-opacity');
                $('.upload-icon').addClass('admin-zero-opacity');
                let restaurantImage = document.getElementById("img-upload");
                restaurantImage.style.backgroundImage = 'url('+event.target.result+')';
            }  
            reader.readAsDataURL(event.target.files[0]);
        })

        this.setState({
            isLoading: false,
        })

        this.handleSubmitDisableChange();
    }

    handleSubmitDisableChange = () => {
        setTimeout(() => {
            if( this.state.name !== '' && this.state.phone !== '' && this.state.file !== '' && this.state.nameError === ''  && this.state.phoneError === '' ){
                $('#SubmitBtn button').prop('disabled', false);
                $('#SubmitBtn').removeClass('admin-SubmitBtn-inactive');
            }
            else{
                $('#SubmitBtn button').prop('disabled', true);
                $('#SubmitBtn').addClass('admin-SubmitBtn-inactive');
            }
        }, 10)
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({resStatus: 'loading', resMessage: 'Loading...'})

        const formData = new FormData();
        formData.append('name', this.state.name);
        formData.append('phone', this.state.phone);
        formData.append('img', this.state.file);

        axios.post(`${getHost() }/api/admin/restaurant/add`, formData).then( response => {
            this.setState({ 
                resMessage: response.data.message,
                resStatus: response.data.status,
                name: '',
                phone: '',
                file: ''
            });
            let restaurantImage = document.getElementById("img-upload");
            restaurantImage.style.backgroundImage = 'none';
            $('.upload-icon').removeClass('admin-zero-opacity');
            $('.upload-icon').addClass('admin-full-opacity');
        }).catch(err => {
            console.log(err);
        })
    }

  render() {
    return (
        <div className="admin-center-container">
            <div id="admin-add-res-container">
                <h2> Add Restaurant</h2>
                <div className="admin-row">
                    <div className="left-side">
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <label htmlFor="">Name</label>
                                <TextBox onInput={this.handleNameChange} value={this.state.name} errorId="nameError" error={this.state.nameError} />
                            </div>
                            <div>
                                <label htmlFor="">Phone number</label>
                                <TextBox onInput={this.handlePhoneChange} value={this.state.phone} errorId="phoneError" error={this.state.phoneError} />
                            </div>
                            <div>
                                <p style={{color:'gray'}}>*Note: Password will automatically be generated and added to the database</p>
                            </div>
                            <div id="SubmitBtn" className="admin-SubmitBtn-inactive">
                                <DefaultButton text="Submit" inputType="submit" size="medium" disabled/>
                            </div>
                            <div className={'admin'+this.state.resStatus +"-response"}>
                                <span>{this.state.resMessage}</span>
                            </div>
                        </form>
                    </div>
                    <div className="right-side admin-flex admin-justify-center admin-align-center">
                        <div className="upload-container admin-flex admin-justify-center w100 h100">
                            <label htmlFor="upload-btn" id="img-upload" className="admin-relative admin-background-cover">
                                <div className="upload-icon admin-full-opacity admin-flex admin-justify-center admin-align-center admin-absolute admin-absolute-cover">
                                    <i class="bi bi-card-image"></i>
                                </div>
                                {
                                    this.state.isLoading == false 
                                    ?
                                    null
                                    :
                                    <div className="upload-loader admin-justify-center admin-align-center admin-absolute admin-absolute-cover">
                                        <CircleLoader />
                                    </div>
                                }
                            </label>
                            <input type="file" id="upload-btn" className="admin-input-file-reset" onChange={this.handleFileChange} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default AddRestaurant