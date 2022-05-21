import React from 'react';
import Movies from './movies';
import '../styles/main.css'
import '../styles/login.css'
import Signup from './signup';
import '../styles/vazir-fonts.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import root from './tools';
import {redirect} from './tools';

function IEInput(props){
    return(
        <div className="login-form-element">
            <label className="login-form-label" htmlFor= {props.nameEn}><b>{props.nameFa}</b></label>
            <input className="login-form-input" type={props.type} placeholder={props.nameFa + " را وارد کنید"} 
                name={props.nameEn} id={props.nameEn} value = {props.value} onChange={(e) => props.onChange(e)} required/>
        </div>
    );
}

function IESubmitButton(props){
    return(
        <div className="login-form-element">
            <button className="login-form-button" type="submit">{props.label}</button>
        </div>
    );
}

class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {userEmail:"", password:""}
        
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
                    <form className="login-form-container" onSubmit={(e) => this.doLogin(e)}>
                        <div className="login-form-element">
                            <a onClick={(e) => redirect(e, <Movies/>)}><img src="./login-logo.png" className="login-form-logo" alt=""/></a>
                        </div>

                        <IEInput type="email" nameEn = "userEmail" nameFa = "نام کاربری" onChange={this.handleuserEmailInput}/>
                        <IEInput type="password" nameEn = "password" nameFa = "رمز عبور" onChange={this.handlePasswordInput}/>

                        <IESubmitButton label = "ورود"/>
                        
                        <div className="login-form-element">
                            <p className="login-form-label" dir="rtl">
                                حساب کاربری ندارید؟
                                <a className="login-form-link cursor-pointer" onClick={(e) => redirect(e, <Signup/>)}>ثبت‌ نام</a>
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

    handleuserEmailInput = (event) =>{
        this.setState(prevState => ({userEmail:event.target.value}))
    }

    handlePasswordInput = (event) =>{
        this.setState(prevState => ({password:event.target.value}))
    }

    doLogin = (event) =>{
        event.preventDefault();

        var http = new XMLHttpRequest();
        var params = '?' + 'userEmail=' + this.state.userEmail + '&password=' + this.state.password;
        http.open('POST', 'http://localhost:8080/account/login/' + params, true);
        http.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        http.onreadystatechange = () =>  {
            if(http.readyState == 4){
                if(http.status == 200) {
                    localStorage.setItem("jwt", JSON.parse(http.responseText).value.jwt)
                    window.location.replace("http://localhost:3000/movies")
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

export default Login;
export {IEInput, IESubmitButton}