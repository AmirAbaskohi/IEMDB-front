import React from 'react';
import ReactDOM from 'react-dom/client';
import Movies from './movies';
import {IEInput, IESubmitButton} from './login';
import Login from './login';
import '../styles/main.css'
import '../styles/login.css'
import '../styles/vazir-fonts.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import root from './tools';
import {redirect} from './tools';


class Signup extends React.Component{
    constructor(props) {
        super(props);
        this.state = {username:"", phone:"", password:"", confirm_password:""}
    }
    render(){
        return (
            <div className="row width-100">
                <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                toastStyle={{ backgroundColor: "#b12025", color: "white" }}
                />
                <div className="col-4"></div>

                <div className="col-4"> 
                    <form className="login-form-container">
                        <div className="login-form-element">
                            <a onClick={(e) => redirect(e, <Movies/>)}><img src="./login-logo.png" className="login-form-logo" alt=""/></a>
                        </div>

                        <IEInput type="email" nameEn = "username" nameFa = "نام کاربری" onChange={this.handleUsernameInput}/>
                        <IEInput type="text" nameEn = "phone" nameFa = "شماره تماس" onChange={this.handlePhoneInput}/>
                        <IEInput type="password" nameEn = "password" nameFa = "رمز عبور" onChange={this.handlePasswordInput}/>
                        <IEInput type="password" nameEn = "confirm-password" nameFa = "تکرار رمز" onChange={this.handleCFPasswordInput}/>

                        <IESubmitButton label = "ثبت نام"/>

                        <div className="login-form-element">
                            <p className="login-form-label">
                                حساب کاربری دارید؟
                                <a className="login-form-link" onClick={(e) => redirect(e, <Login/>)}>ورود</a>
                            </p>
                        </div>
                    </form>
                </div>  

                <div className="col-4"></div>
            </div>
        )
    }

    shouldComponentUpdate() {
        return false;
    }

    handleUsernameInput = (event) =>{
        this.setState(prevState => ({username:event.target.value}))
    }

    handlePhoneInput = (event) =>{
        this.setState(prevState => ({phone:event.target.value}))
    }

    handlePasswordInput = (event) =>{
        this.setState(prevState => ({password:event.target.value}))
    }
    
    handleCFPasswordInput = (event) =>{
        this.setState(prevState => ({confirm_password:event.target.value}))
    }
}

export default Signup;