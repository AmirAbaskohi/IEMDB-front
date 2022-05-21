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
        this.state = {name:"", userEmail:"", birthDate:"", password:"", confirm_password:""}
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
                    <form className="login-form-container" onSubmit={(e) => this.doSignup(e)}>
                        <div className="login-form-element">
                            <a onClick={(e) => redirect(e, <Movies/>)}><img src="./login-logo.png" className="login-form-logo" alt=""/></a>
                        </div>

                        <IEInput type="text" nameEn = "name" nameFa = "نام" onChange={this.handleNameInput}/>
                        <IEInput type="email" nameEn = "userEmail" nameFa = "نام کاربری" onChange={this.handleUsernameInput}/>
                        <IEInput type="date" nameEn = "birthDate" nameFa = "تاریخ تولد" onChange={this.handleBirthDateInput}/>
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

    handleNameInput = (event) =>{
        this.setState(prevState => ({name:event.target.value}))
    }

    handleUsernameInput = (event) =>{
        this.setState(prevState => ({userEmail:event.target.value}))
    }

    handleBirthDateInput = (event) =>{
        this.setState(prevState => ({birthDate:event.target.value}))
    }

    handlePasswordInput = (event) =>{
        this.setState(prevState => ({password:event.target.value}))
    }
    
    handleCFPasswordInput = (event) =>{
        this.setState(prevState => ({confirm_password:event.target.value}))
    }

    doSignup = (event) =>{
        event.preventDefault();

        if(this.state.password != this.state.confirm_password){
            toast.error('password and confirm password don\'t match', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            this.setState(prevState => ({confirm_password:""}));
            return;
        }

        var http = new XMLHttpRequest();
        var params = '?' + 'name=' + this.state.name + '&userEmail=' + this.state.userEmail 
        + '&birthDate=' + this.state.birthDate + '&password=' + this.state.password;

        http.open('POST', 'http://localhost:8080/account/signup/' + params, true);
        http.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        http.onreadystatechange = () =>  {
            if(http.readyState == 4){
                if(http.status == 200) {
                    localStorage.setItem("jwt", JSON.parse(http.responseText).value.jwt)
                    root.render(<Movies/>)
                }
                else if ((http.status == 400) || (http.status == 401) ||
                         (http.status == 403) || (http.status == 404)){
                    let length = JSON.parse(http.responseText).errors.length;
                    for (let i = 0 ; i < length ; i++) {
                        toast.error(JSON.parse(http.responseText).errors[i], {
                            position: "bottom-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                }
                else {
                    toast.error('Something went wrong!', {
                        position: "bottom-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            }
        }
        http.send();
    }
}

export default Signup;