import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/main.css'
import './styles/login.css'

function IEInput(props){
    return(
        <div class="login-form-element">
            <label class="login-form-label" for= {props.nameEn}><b>{props.nameFa}</b></label>
            <input class="login-form-input" type="text" placeholder={props.nameFa + " را وارد کنید"} name={props.nameEn} id={props.nameEn}/>
        </div>
    );
}

function Login(){
    return (
        <div class="row width-100">
            <div class="col-4"></div>

            <div class="col-4"> 
                <form class="login-form-container">
                    <div class="login-form-element">
                        <a href="./movies.html"><img src="login-logo.png" class="login-form-logo" alt=""/></a>
                    </div>

                    <IEInput nameEn = "username" nameFa = "نام کاربری"/>
                    <IEInput nameEn = "password" nameFa = "رمز عبور"/>

                    <div class="login-form-element">
                        <button class="login-form-button" type="submit">ورود</button>
                    </div>
                    <div class="login-form-element">
                        <p class="login-form-label" dir="rtl"> حساب کاربری ندارید؟<a class="login-form-link" href="./signup.html">ثبت‌ نام</a></p>
                    </div>
                </form>
            </div>  

            <div class="col-4"></div>
        </div>
    )
}

export default Login;