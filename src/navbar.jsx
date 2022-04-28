import React, { Component } from 'react';
import './styles/main.css';

class Navbar extends Component {
    render() { 
        return (
            <nav className="navbar navbar-expand navbar-fixed-top navbar-inverse iemdb-navbar">
                <div className="navbar-brand col-1 pl-0">
                    <a href="./movies.html">
                        <img src="./logo.png" className="iemdb-logo ml-0" alt=""/>
                    </a>
                </div>

                <div className="col-1 "></div>

                <div className="col-2 ">
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
                </div>

                <div className="col-3 ">
                    <form action="#">
                        <div className="iemdb-search-box" >
                            <input className="iemdb-search-input" type="search" name="search" dir="auto"/>
                            <button className="fas fa-search fa-lg iemdb-search-icon"></button>
                        </div>
                    </form>
                </div>

                
                <div className="col-4 "> </div>

                <div className="col-1">
                    <ul className="user menu">
                        <li>
                        <a><i className="fas fa-user-circle fa-3x iemdb-user"></i></a>
                        <ul>    
                            <li className="iemdb-user-elemnt iemdb-rounded-top"><a href='./login.html' className="color-white" >ورود</a></li>    
                            <li className="iemdb-user-elemnt iemdb-rounded-bottom"><a href='./signup.html' className="color-white">ثبت نام</a></li>    
                        </ul> 
                        </li>
                    </ul>
                </div>
                </nav>
        );
    }
}
 
export default Navbar;