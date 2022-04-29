import React from 'react';

import Movies from './movies';
import Watchlist from './watchlist';
import Signup from './signup';
import Login from './login';
import root from './tools';
import './styles/vazir-fonts.css';
import {redirect} from './tools';

import './styles/main.css';

class CartBox extends React.Component{
    constructor(props) {
        super(props);
        this.state = {}
    }
    render(){
        return(
            <ul className="menu cart">
                <li>
                    <div className="iemdb-cart-box">
                        <div className="iemdb-cart-input" dir="rtl">
                            <p>جستجو بر اساس:</p>
                        </div>
                        
                        <div className="iemdb-cart-icon">
                            <i className="fas fa-caret-down fa-2x "></i>
                        </div>
                        <ul>    
                            <li className="iemdb-user-elemnt iemdb-rounded-top"><a href='#' className="color-white" >نام</a></li>
                            <li className="iemdb-user-elemnt"><a href='#' className="color-white">ژانر</a></li>
                            <li className="iemdb-user-elemnt iemdb-rounded-bottom"><a href='#' className="color-white">تاریخ تولید</a></li>
                        </ul> 
                    </div>
                </li>
            </ul>
        )
    }
}

class SearchBox extends React.Component{
    constructor(props) {
        super(props);
        this.state = {}
    }
    render(){
        return(
            <form action="#">
                <div className="iemdb-search-box" >
                    <input className="iemdb-search-input" type="search" name="search" dir="auto"/>
                    <button className="fas fa-search fa-lg iemdb-search-icon"></button>
                </div>
            </form>
        )
    }
}

class UserMenu extends React.Component{
    constructor(props) {
        super(props);
        this.state = {}
    }
    render(){   
        return(
            <ul className="user menu">
                <li>
                <a><i className="fas fa-user-circle fa-3x iemdb-user"></i></a>
                <ul>    
                    <li className="iemdb-user-elemnt iemdb-rounded-top">
                        <a className="color-white cursor-pointer" onClick={(e)=>{!this.state.isLoggedIn && redirect(e, <Login/>)}} >
                            {this.state.isLoggedIn ? this.state.email : "ورود"}
                        </a>
                    </li>
                    <li className="iemdb-user-elemnt" style={{display: this.state.isLoggedIn ? "block" : "none"}}>
                        <a href='./login.html' className="color-white" onClick={(e)=>{this.state.isLoggedIn && redirect(e, <Watchlist/>)}}>
                            لیست تماشا
                        </a>
                    </li> 
                    <li className="iemdb-user-elemnt iemdb-rounded-bottom">
                        <a href='./signup.html' className="color-white" onClick={(e)=>{this.state.isLoggedIn ? this.doLogout(e) : redirect(e, <Signup/>)}}>
                            {this.state.isLoggedIn ? "خروج" : "ثبت نام"}
                        </a>
                    </li>       
                </ul> 
                </li>
            </ul>
        )
    }

    doLogout = (event) => {
        event.preventDefault();
        var http = new XMLHttpRequest();
        http.open('POST', 'http://localhost:8080/account/logout', true);

        http.setRequestHeader('Content-type', 'application/json;charset=UTF-8'); 

        http.onreadystatechange = () => {
            if(http.readyState == 4 && http.status == 200) {
                if(JSON.parse(http.responseText).success == true){   
                    this.setState(prevState => ({isLoggedIn : false}));
                }
            }
        }
        http.send();
        redirect(event, <Movies/>);
    }

    componentDidMount() {     
        var http1 = new XMLHttpRequest();
        http1.open('GET', 'http://localhost:8080/account', true);
        http1.setRequestHeader('Content-type', 'application/json;charset=UTF-8'); 
        http1.onreadystatechange = () => {
            if(http1.readyState == 4 && http1.status == 200) {
                this.setState(JSON.parse(http1.responseText).value)
            }
        }
        http1.send();
    }
} 

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() { 
        return (
            <nav className="navbar navbar-expand navbar-fixed-top navbar-inverse iemdb-navbar">
                <div className="navbar-brand col-1 pl-0 cursor-pointer">
                    <a onClick={(e) => redirect(e, <Movies/>)}>
                        <img src="./logo.png" className="iemdb-logo ml-0" alt=""/>
                    </a>
                </div>

                {this.props.showBox && <div className="col-1 "></div>}

                {this.props.showBox && <div className="col-2 "> {<CartBox/>} </div>}

                {this.props.showBox && <div className="col-3 "> <SearchBox/> </div>}
                
                {this.props.showBox && <div className="col-4 "> </div>}

                {!this.props.showBox && <div className="col-10 "> </div>}

                <div className="col-1"> <UserMenu data = {this.state}/> </div>
            </nav>
        );
    }
}
 
export default Navbar;