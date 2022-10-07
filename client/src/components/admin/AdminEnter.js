import React, {Component} from "react";
import "./styles/CustomerEnter.css";
import $ from "jquery";
import AOS from "aos";
import ReactDOM from "react-dom";

import DefaultButton from "./../inputs/DefaultButton";
import TextBox from "./../inputs/TextBox";
import PasswordBox from "./../inputs/PasswordBox";
import EntryHeader from "./../fixtures/EntryHeader";
import CustomerRegister from "./../fixtures/CustomerRegister";
import axios from "axios";

// Assets
import SignInCustomerImg from "./svg/SignInCustomer.svg";
import Cookies from "../assitance-methods/Cookies";
import getHost from "../assitance-methods/getHost";

class AdminEnter extends Component {
    constructor(props) {
        super(props);

        // State Object
        this.state = {
            // Form errors state (password, id, general)
            errors: {
                id: "",
                password: "",
                general: "",
            },
            isReadyToEnter: false,
            resMessage: '',
            resStatus: '',
            id: 0,
            name: '',
            cID: ''

        };

        //Bindings Methods
        this.goToCustomerRegister = this.goToCustomerRegister.bind(this);
        this.enterSubmitted = this.enterSubmitted.bind(this);
        this.passwordFieldInputed = this.passwordFieldInputed.bind(this);
        this.idFieldInputed = this.idFieldInputed.bind(this);
    }
    // Triggered when id field text changed to a new value.
    idFieldInputed(e) {
        this.setState({ id: e.target.value })
        let idValue = e.currentTarget.value;
        let idError = $("#id-error");
        let errors = this.state.errors;

        if (idValue === "") {
            idError.css("display", "flex").show();
            errors.id = "ID number field can't be empty.";
            this.setState({errors});
        } else {
            idError.hide();
            errors.id = "";
            this.setState({errors});
        }
    }

    // Triggered when password field text changed to a new value.
    passwordFieldInputed(e) {
        this.setState({ password: e.target.value })
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
        let idField = $("#id-in");
        let passwordField = $("#password-in");
        let idValue = idField.val();
        let passwordValue = passwordField.val();
        let idError = $("#id-error");
        let passwordError = $("#password-error");
        let errors = this.state.errors;

        if (idValue === "") {
            idError.css("display", "flex").show();
            errors.id = "ID number field can't be empty.";
            this.setState({errors});
        }
        if (passwordValue === "") {
            passwordError.css("display", "flex").show();
            errors.password = "Password field can't be empty.";
            this.setState({errors});
        } else if (passwordValue !== "" && idValue !== "") {
            this.enter(idValue, passwordValue);
        }

    }

    // Tries to enter to a user account using his id number and password.
    enter(idValue, passwordValue) {
        const formData = new FormData();
        formData.append('id', idValue);
        formData.append('password', passwordValue);

        axios.post(`${getHost()}/api/admin/login`, formData).then( res => {
            if(res.data.status === 'good'){
                Cookies.set('id', res.data.id, 30);
                window.location.href="http://localhost:3000/admin"
            }
            else{
                this.setState({
                    resMessage: res.data.message
                })
            }
        }).catch(err => {
            console.log(err)
        });
    }

    // Renders customer register component on the page (navigate to It).
    goToCustomerRegister() {
        ReactDOM.render(
            <CustomerRegister/>,
            document.getElementById("entry-container")
        );
    }

    componentDidMount() {
        AOS.init();
        $("input[type='number']")[0].focus();
    }

    //
    render() {
        return (
            <div
                id="customer-enter-container"
                data-aos="fade"
                data-aos-duration="1000"
            >
                <EntryHeader
                    buttonOnClick={this.goToCustomerRegister}
                    buttonText="Register"
                    caption="Don't have an account yet?"
                    isMain="true"
                />
                <div id="form-container">
                    <div id="form-intro">
                        <h1>Welcome Again!</h1>
                        <img src={SignInCustomerImg} draggable="false"/>
                    </div>
                    <form id="form" onSubmit={this.enterSubmitted} noValidate>
                        <TextBox
                            inputId="id-in"
                            errorId="id-error"
                            placeholder="ID Number"
                            type="number"
                            error={this.state.errors.id}
                            onInput={this.idFieldInputed}
                        />
                        <PasswordBox
                            inputId="password-in"
                            errorId="password-error"
                            error={this.state.errors.password}
                            placeholder="Password"
                            onInput={this.passwordFieldInputed}
                        />
                        <DefaultButton
                            text="Enter&nbsp;&nbsp;&nbsp;"
                            inputType="submit"
                            iconClass="fa fa-arrow-right"
                        />
                        <div style={{color: 'red'}}>
                            {this.state.resMessage}
                        </div>
                    </form>
                   
                </div>
                  
            </div>
        );
    }
}

export default AdminEnter;
