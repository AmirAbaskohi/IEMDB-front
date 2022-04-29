import React from 'react';
import ReactDOM from 'react-dom/client';
import Movies from './movies';
import './styles/main.css'
import './styles/login.css'
import Signup from './signup';

import root from './tools';
import {redirect} from './tools';

// const root = ReactDOM.createRoot(document.getElementById('root'));

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
        this.state = {username:"", password:""}
        
    }
    render(){
        return (
            <div className="row width-100">
                <div className="col-4"></div>

                <div className="col-4"> 
                    <form className="login-form-container" onSubmit={(e) => this.doLogin(e)}>
                        <div className="login-form-element">
                            <a onClick={(e) => redirect(e, <Movies/>)}><img src="./login-logo.png" className="login-form-logo" alt=""/></a>
                        </div>

                        <IEInput type="email" nameEn = "username" nameFa = "نام کاربری" onChange={this.handleUsernameInput}/>
                        <IEInput type="password" nameEn = "password" nameFa = "رمز عبور" onChange={this.handlePasswordInput}/>

                        <IESubmitButton label = "ورود"/>
                        
                        <div className="login-form-element">
                            <p className="login-form-label" dir="rtl">
                                حساب کاربری ندارید؟
                                <a className="login-form-link" onClick={(e) => redirect(e, <Signup/>)}>ثبت‌ نام</a>
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

    handlePasswordInput = (event) =>{
        this.setState(prevState => ({password:event.target.value}))
    }

    doLogin = (event) =>{
        event.preventDefault();

        var http = new XMLHttpRequest();
        var params = '?' + 'email=' + this.state.username + '&password=' + this.state.password;
        http.open('POST', 'http://localhost:8080/account/login/' + params, true);
        http.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        http.onreadystatechange = () =>  {
            if(http.readyState == 4 && http.status == 200) {
                if(http.status  == 200){
                    root.render(<Movies/>)
                }
            }
        }
        http.send();
    }
}

export default Login;
export {IEInput, IESubmitButton}