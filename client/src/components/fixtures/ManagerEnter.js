import React, {Component} from "react";
import "./styles/ManagerEnter.css";
import $ from "jquery";
import AOS from "aos";

import DefaultButton from "../inputs/DefaultButton";
import TextBox from "../inputs/TextBox";
import PasswordBox from "../inputs/PasswordBox";
import EntryHeader from "../fixtures/EntryHeader";

// Assets
import SignInManagerImg from "../../assets/vectors/SignInManager.svg";
import axios from "axios";
import getHost from "../assitance-methods/getHost";
axios.defaults.withCredentials = true;
class ManagerEnter extends Component {
    constructor(props) {
        super(props);

        // Refs
        this.ref = React.createRef();

        // State Object
        this.state = {
            message:"",
            status:"",
            errors: {
                username: "",
                password: "",
            }
        };

        //Bindings Methods
        this.enterSubmitted = this.enterSubmitted.bind(this);
        this.usernameFieldInputed = this.usernameFieldInputed.bind(this);
        this.passwordFieldInputed = this.passwordFieldInputed.bind(this);
        this.enter = this.enter.bind(this);
    }

    // Triggered when username field text changed to a new value.
    usernameFieldInputed(e) {
        let usernameValue = e.currentTarget.value;
        let usernameError = $("#username-error");
        let errors = this.state.errors;
        if (usernameValue === "") {
            usernameError.css("display", "flex").show();
            errors.username = "username field can't be empty.";
            this.setState({errors});
        } else {
            usernameError.hide();
            errors.username = "";
            this.setState({errors});
        }
    }

    // Triggered when password field text changed to a new value.
    passwordFieldInputed(e) {
        let passwordValue = e.currentTarget.value;
        let passwordError = $("#password-error");
        let errors = this.state.errors;
        if (passwordValue === "") {
            passwordError.css("display", "flex").show();
            errors.password = "Password field can't be empty.";
            this.setState({errors});
        } else {
            passwordError.hide();
            errors.password = "";
            this.setState({errors});
        }
    }

    // Triggered when customer enter form submitted.
    enterSubmitted(e) {
        e.preventDefault();
        let usernameField = $("#username-in");
        let passwordField = $("#password-in");
        let usernameValue = usernameField.val();
        let passwordValue = passwordField.val();
        let usernameError = $("#username-error");
        let passwordError = $("#password-error");
        let errors = this.state.errors;

        if (usernameValue === "") {

            usernameError.fadeIn(0);
            errors.username = "username field can't be empty.";
            this.setState({errors});
        }
        if (passwordValue === "") {
            passwordError.fadeIn(0);
            errors.password = "Password field can't be empty.";
            this.setState({errors});
        } else if (passwordValue !== "" && usernameValue !== "") {
            this.enter(usernameValue, passwordValue);
        }

    }

    // Tries to enter to a manager account using his id number and password.
    enter(username, password) {
        const formdata = new FormData();
        formdata.append('username',username);
        formdata.append('password',password);
        axios.post(`${getHost()}/RestaurantEnter/login`,formdata).then((resp)=>{
        this.setState({message:resp.data.message,
                       status:resp.data.status,
        })
                if(resp.data.status === "good"){
           window.location.href= "/restaurant_admin";
        }
        else{
            
        }
        })

    }

    // Component created for the first time.
    componentDidMount() {
        AOS.init();
        $("input[type='username']")[0].focus();

        axios.get(`${getHost()}/restaurantEnter/login`).then((response)=>{
            if(response.data.loggedIn === true){
                if(window.location.href = "/entry"){
                window.location.href= "/restaurant_admin";
            }
            }
            else{
                    
            }
 
        })
    }

    // Component rendered as result of (updating, creating, etc.)
    render() {
        return (
            <div
                id="customer-enter-container"
                data-aos="fade"
                data-aos-duration="1000"
                ref={this.ref}
            >
                <EntryHeader
                    buttonText="Contact Us"
                    caption="You're not a subscriber of unifood service?"
                />
                <div id="form-container">
                    <div id="form-intro">
                        <h1>Welcome Again!</h1>
                        <img src={SignInManagerImg} draggable="false"/>
                    </div>
                    <form id="form" onSubmit={this.enterSubmitted} noValidate>
                        <TextBox inputId="username-in" errorId="username-error" placeholder="Name" type="username"
                                 onInput={this.usernameFieldInputed} error={this.state.errors.username}/>
                        <PasswordBox inputId="password-in" errorId="password-error" placeholder="Password"
                                     onInput={this.passwordFieldInputed} error={this.state.errors.password}/>
                                     <p>{this.state.message}</p>
                        <DefaultButton
                            text="Enter&nbsp;&nbsp;&nbsp;"
                            inputType="submit"
                            iconClass="fa fa-arrow-right"
                        />
                    </form>
                </div>
            </div>
        );
    }
}

export default ManagerEnter;
