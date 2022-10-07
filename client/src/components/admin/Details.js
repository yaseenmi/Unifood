import React, { Component } from 'react';
import TextBox from './../inputs/TextBox'
import './../inputs/IconButton'
import DefaultButton from './../inputs/DefaultButton';
import './styles/Details.css'
import axios from 'axios';
import $ from 'jquery';
import Cookies from '../assitance-methods/Cookies';
import RichTextBox from '../inputs/RichTextBox';
import getHost from '../assitance-methods/getHost';
import { Label } from 'recharts';




class Detail extends Component {
  constructor(props){
    super(props)

    this.state = {
      Restaurant: [],
      RestaurantBackup: [],
      folderName: '',
      passwordBackup: '',
      restaurantRate: '',
      hiddePopupState: "false",
      edit: "false",
      status: '',
      message: '',
      did: '',
      isExist: 0,
      didRetrieve: false,
      Reviews: [],
      text: '',
      sendNotiMessage: '',
      sendNotiStatus: '',
      isSuccess: false
    }

  }

  UNSAFE_componentWillReceiveProps()
  {

  }

  componentDidMount = () => {  
    let params = this.props.match.params.name;
    if(!Cookies.get("id")){
      window.location.href = "http://localhost:3000/"
    }
    else{
      axios.get(`${getHost()}/api/admin/restaurant/${params}`).then( response => { 
        this.setState({ 
            Restaurant: response.data.rest[0],
            RestaurantBackup: response.data.rest[0],
            passwordBackup: response.data.rest[0].Password,
            folderName: response.data.rest[0].Name,
            isExist: response.data.rest[0].IsExist,
            restaurantRate: response.data.rate
        })
        if(this.state.isSuccess){
          $('.success-container').show()
        }
      }).catch(err => {
        console.log(err)
      })  
    }
      
  }

  handleGenerateClick = () => {
    this.setState(prevState => {
      let Restaurant = Object.assign({}, prevState.Restaurant);
      Restaurant.Password = Math.random().toString(36).slice(-10);                         
      return { Restaurant };
    })
  }

  handleRestoreClick = () => {
    this.setState(prevState => {
      let Restaurant = Object.assign({}, prevState.Restaurant);
      Restaurant.Password = this.state.passwordBackup;                         
      return { Restaurant };
    })
  }

  handleEditClick = () =>{
    this.setState({edit:"true"})
  }
  
  handleCancelClick = () =>{
    this.setState({edit:"false"})
    this.setState({ 
      Restaurant: this.state.RestaurantBackup
    })
  }

  handlePhoneChange = (event) =>{
    this.setState(prevState => {
      let Restaurant = Object.assign({}, prevState.Restaurant);
      Restaurant.Phone = event.target.value;                         
      return { Restaurant };
    })
  }

  handleNameChange = (event) => {
    this.setState(prevState => {
      let Restaurant = Object.assign({}, prevState.Restaurant);
      Restaurant.Name = event.target.value;                         
      return { Restaurant };
    })
  }

  handleFileChange = (event) => {
     
    this.setState(prevState => {
      let Restaurant = Object.assign({}, prevState.Restaurant);
      Restaurant.Image = event.target.files[0];                         
      return { Restaurant };
    }, 
    () => {
      let reader = new FileReader();
      reader.onload = (event) => {  
        let restaurantImage = document.getElementById("img");
        restaurantImage.style.backgroundImage = 'url('+event.target.result+')';
      }  

      reader.readAsDataURL(event.target.files[0]);
    })
  }

  handleHideClick = () => {
    const formData = new FormData();
    formData.append('id', this.state.Restaurant.UserID);
    let params = this.props.match.params.name;
    axios.post(`${getHost()}/api/admin/restaurant/${params}/hide`, formData).then( res => {
      this.setState({ isExist: 0 })
    }).catch(err => {
      console.log(err)
    })
  }

  handleUnHideClick = () => {
    const formData = new FormData();
    formData.append('id', this.state.Restaurant.UserID);
    let params = this.props.match.params.name;
    axios.post(`${getHost()}/api/admin/restaurant/${params}/unhide`, formData).then( res => {
      this.setState({ isExist: 1 })
    }).catch(err => {
      console.log(err)
    })
  }

  handleSaveClick = (event) => {    
    let params = this.props.match.params.name;

    const formData = new FormData();
    formData.append('id', this.state.Restaurant.ID);
    formData.append('name', this.state.Restaurant.Name);
    formData.append('password', this.state.Restaurant.Password);
    formData.append('phone', this.state.Restaurant.Phone);
    formData.append('oldImg', this.state.RestaurantBackup.Image);
    formData.append('img', this.state.Restaurant.Image);
    formData.append('userID', this.state.Restaurant.UserID);
    formData.append('isClosed', this.state.Restaurant.IsClosed);
    formData.append('isExist', this.state.Restaurant.IsExist);
    
    axios.post(`${getHost()}/api/admin/restaurant/${params}/edit`, formData).then( response => {
      let name = response.data.rest[0].Name;
        this.setState({
          Restaurant: response.data.rest[0],
          RestaurantBackup: response.data.rest[0],
          edit: "false",
          status: response.data.status,
          message: response.data.message
        }, () => {
          
          window.history.pushState({"rest": name},  document.title, `/admin/restaurants/${name}`)
        })      
    }).catch(err => {
      console.log(err)
    })
  }
  
  timeStampConverter = (timeStamp) => {
    let time = timeStamp.split(/[- T .]/);
    let date = `${time[0]}/${time[1]}/${time[2]} ${time[3]}`
    return date
  }

  handleShowReviewsClick = () => {
    if($('.reviews-container').css('display') == 'none'){
      $('.notification-container').hide();
      $('.reviews-container').show();
    }
    else
      $('.reviews-container').hide();
    
    if(this.state.didRetrieve == false){
      let params = this.props.match.params.name;
      axios.get(`${getHost()}/api/admin/restaurant/${params}/review`).then( res => {
        this.setState({ 
          Reviews: res.data.reviews,
          didRetrieve: true 
        })
      }).catch(err => {
        console.log(err)
      })
    }
  }

  handleTextChange = (event) => {
    this.setState({ text: event.target.value })
  }

  handleSendClick = () => {
    if($('.notification-container').css('display') == 'none'){
      $('.reviews-container').hide();
      $('.notification-container').show();
    }
    else
      $('.notification-container').hide();
  }

  handleSendCancelClick = () => {
    $('.notification-container').hide();
  }

  hideStatus = () => {
    $('.success-container').hide();
  }

  handleSendSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('UserID', this.state.Restaurant.UserID);
    formData.append('Sender', 'Admin');
    formData.append('Text', this.state.text);

    axios.post(`${getHost()}/api/admin/notification/send`, formData).then(res => {
      this.setState({
        sendNotiStatus: res.data.resStatus,
        sendNotiMessage: res.data.resMessage,
        isSuccess: true
      }, ()=> {
        this.componentDidMount()
      })
    }).catch(err => {
      console.log(err)
    })

  }

  render() {
    return (
      <div className="admin-details-container">
        <div className="details-card admin-center-container">

            <div className="admin-row-1">
               
                <div className="left-side admin-flex admin-justify-center admin-align-center ">
                  {
                    this.state.edit === 'false' // IF 
                    ?
                    <div className="admin-relative img-edit-container" style={{ backgroundImage: `url('${getHost()}/images/restaurants-images/${this.state.Restaurant.Image}')` }}>
                    </div>
                    :
                    <div id="img" className="admin-relative img-edit-container" style={{ backgroundImage: `url('${getHost()}/images/restaurants-images/${this.state.Restaurant.Image}')` }}>
                        <label htmlFor="upload-btn" className="admin-absolute upload-icon-edit admin-flex admin-justify-center admin-align-center">
                          <i class="bi bi-card-image"></i>
                        </label>
                        <input type="file" id="upload-btn" className="admin-input-file-reset" onChange={this.handleFileChange} />
                    </div>
                  }
                  
                </div>
                
                <div className="right-side admin-flex admin-flex-col admin-justify-between">
                    <div>
                        <div className="heading">
                          {
                            this.state.edit === 'true' // IF 
                            ?
                            <h1 onInput={this.handleNameChange} disabled={true}>{this.state.Restaurant.Name}</h1>
                            :
                            <h1>{this.state.Restaurant.Name}</h1> 
                          }
                        </div>
                        <div id="rate">
                            <span> {this.state.restaurantRate}</span>
                            <span className="star">
                                <i class="bi bi-star-fill"></i>
                            </span>
                        </div>
                        <br />
                        {
                          this.state.edit === 'true' // IF
                          ?
                          <div>
                            <div className="info">
                              <div className="admin-flex admin-align-center mb-2 pass"> 
                               Password: 
                               <span className="mx-2"><TextBox placeholder={this.state.Restaurant.Password} disabled="true"/></span>
                              </div>
                              <div className="mb-2 pass-btns">
                                <DefaultButton iconClass="bi bi-gear-wide-connected" text="Generate" style={{background:'gray', border: '1px solid gray'}} onClick={this.handleGenerateClick} />   
                                <DefaultButton iconClass="bi bi-arrow-counterclockwise" text="Restore" style={{background:'gray', border: '1px solid gray'}} onClick={this.handleRestoreClick} />                               
                              </div>
                            </div>

                            <div className="info">
                              Phone number: <TextBox placeholder={this.state.Restaurant.Phone} onInput={this.handlePhoneChange} />
                            </div>

                            <div className="info mt-3"> 
                              <p> <i class="bi bi-bag-check"></i> Status:
                                <span className={`${this.state.Restaurant.IsClosed === 1 ? 'closed' : 'opened'} mx-1`}>
                                  {this.state.Restaurant.IsClosed === 1 ? 'Closed' : 'Opened'}
                                </span> 
                              </p> 
                            </div>
                          </div>
                        :
                        <div className="p-info">
                          <div className="info"> <p> <i class="bi bi-shield-lock"></i> Password: {this.state.Restaurant.Password} </p> </div>
                          <div className="info"> <p> <i class="bi bi-phone"></i> Phone number: {this.state.Restaurant.Phone} </p> </div>
                          <div className="info"> 
                            <p> <i class="bi bi-bag-check"></i> Status:
                              <span className={`${this.state.Restaurant.IsClosed === 1 ? 'closed' : 'opened'} mx-1`}>
                                {this.state.Restaurant.IsClosed === 1 ? 'Closed' : 'Opened'}
                              </span> 
                            </p> 
                          </div>
                        </div>
                        }
                    </div>
                    {
                      this.state.edit === 'false' // IF 
                      ?
                      <div className="op-buttons">
                              <DefaultButton iconClass="bi bi-pen" text="Edit" style={{background:'#0066ff', border: '1px solid #0066ff'}} onClick={this.handleEditClick} />
                              <DefaultButton iconClass="fa fa-paper-plane" text="Send" style={{background:'#F06292', border: '1px solid #F06292'}} onClick={this.handleSendClick} />
                          { 
                              this.state.isExist === 1 
                          ? 
                              <DefaultButton iconClass="fa fa-eye-slash" text="Hide" style={{background:'var(--warning-color)', border: '1px solid var(--warning-color)'}} onClick={this.handleHideClick}/> 
                          : 
                              <DefaultButton iconClass="fa fa-eye" text="Unhide" style={{background:'var(--warning-color)', border: '1px solid var(--warning-color)'}} onClick={this.handleUnHideClick}/>
                          }
                              <DefaultButton iconClass="bi bi-chat-quote" text="Reviews" style={{background:'gray', border: '1px solid gray'}} onClick={this.handleShowReviewsClick}/>

                      </div>
                      :
                      <div className="op-buttons">
                              <DefaultButton iconClass="bi bi-check-circle" text="Save" style={{background:'#009933', border: '1px solid #009933'}} onClick={this.handleSaveClick} />
                              <DefaultButton iconClass="bi bi-x-circle" text="Discard" style={{background:'#ff5050', border: '1px solid #ff5050'}} onClick={this.handleCancelClick}/>                                     
                      </div>
                    }
                </div>
                <div>
                    <span> {this.state.message} </span>
                  </div>
            </div>
            <hr />
        </div>

        <div className="reviews-container mt-5 mb-5">
         {
          this.state.Reviews.length > 0 ?
          <div>
            {
              this.state.Reviews.map((item) => {
                return(
                  <div className="reviews-card">
                    <div className="admin-flex admin-justify-between admin-align-center">
                      <h4>{item.Text}</h4> 
                      <span className="date">
                        {this.timeStampConverter(item.ReviewDate)}
                      </span>
                    </div>
                    <div className="mt-3">
                      <span>{item.UserName} Reviewed on: {item.ProductName}.</span>       
                    </div>
                    <div className="mt-3">
                        <span className="like" >{item.Like} <i class="bi bi-hand-thumbs-up"></i></span>
                        <span className="dislike mx-4">{item.Dislike} <i class="bi bi-hand-thumbs-down"></i></span>
                    </div>
                  </div>
                )
              })
            }   
          </div>
          :
          <div className="reviews-card admin-text-center"> 
              <h3>Looks like this Restaurant has no reviews yet!</h3>
          </div>
         }     
        </div>

        <div className="notification-container">
          <div>
            <div>
              <h2>To: {this.state.Restaurant.Name}</h2>
              <form onSubmit={this.handleSendSubmit}>
                <div className="mt-5">
                  <RichTextBox placeholder="" id="mycustomer-textarea" onChange={this.handleTextChange} errorId="textError" error={this.state.textError}/>
                </div>
                <div className="mt-4 admin-flex">
                  <DefaultButton text="Submit" style={{background:'#F06292', border: '1px solid #F06292'}} onClick={this.handleSendClick} />
                  <div className="mx-2">
                    <DefaultButton inputType="button" text="Cancel" style={{background:'#8c8c8c', border: '1px solid #8c8c8c'}} onClick={this.handleSendCancelClick} />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className={`success-container admin-text-center noti-${this.state.sendNotiStatus}-container`}>
          <div className={`noti-${this.state.sendNotiStatus} admin-flex admin-justify-between admin-align-center`}>
              <div>
                {
                  this.state.sendNotiStatus == 'good'
                  ?
                  <i class="bi bi-check-circle"></i>
                  :
                  <i class="bi bi-x-circle"></i>
                } 
                <span className="mx-2">
                  {this.state.sendNotiMessage}
                </span>
              </div>
              <div onClick={this.hideStatus} style={{cursor: 'pointer'}}>
              <i style={{color: 'gray'}} class="bi bi-x"></i>
              </div>
          </div>    
        </div>

      </div>
    );
  }
}

export default Detail