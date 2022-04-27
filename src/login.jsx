import React from 'react';
import ReactDOM from 'react-dom/client';
import Movies from './movies';
import './styles/main.css'
import './styles/login.css'


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
                            <a href="./movies.html"><img src="login-logo.png" className="login-form-logo" alt=""/></a>
                        </div>

                        <IEInput type="email" nameEn = "username" nameFa = "نام کاربری" onChange={this.handleUsernameInput}/>
                        <IEInput type="password" nameEn = "password" nameFa = "رمز عبور" onChange={this.handlePasswordInput}/>

                        <IESubmitButton label = "ورود"/>
                        
                        <div className="login-form-element">
                            <p className="login-form-label" dir="rtl"> حساب کاربری ندارید؟<a className="login-form-link" href="./signup.html">ثبت‌ نام</a></p>
                        </div>
                    </form>
                </div>  

                <div className="col-4"></div>
            </div>
        )
    }

    shouldComponentUpdate() {
        return true;
    }

    handleUsernameInput = (event) =>{
        this.setState(prevState => ({username:event.target.value}))
    }

    handlePasswordInput = (event) =>{
        this.setState(prevState => ({password:event.target.value}))
    }

    doLogin = (event) =>{
        event.preventDefault();

        var params = {
		    "email": this.state.username,
		    "password" : this.state.password,
        };

		var queryString = Object.keys(params).map(function(key) {
    		return key + '=' + params[key]
		}).join('&');

		const requestOptions = {
	        method: 'POST',
	        headers: { 
	        	'content-length' : queryString.length,
	        	'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
	        },
	        body: queryString
	    };

        const checkResponse = (res) =>{
            console.log(res)
            const root = ReactDOM.createRoot(document.getElementById('root'));
            if(res.status == 200){
                root.render(<Movies/>)
            }
        }

	    fetch('http://localhost:8080/account', requestOptions)
	        .then(response => checkResponse(response))
	        .then(data => data);

        
    }
}

export default Login;
export {IEInput, IESubmitButton}