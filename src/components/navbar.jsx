import React, { Component } from 'react';

class Navbar extends Component {
    render() { 
        return (
            <nav className="navbar navbar-expand iemdb-navbar">
                <div className="navbar-brand col-1 pl-0">
                    <a href="./movies.html">
                        <img src="imgs/logo.png" className="iemdb-logo ml-0" alt="" />
                    </a>
                </div>
                <div className="col-10"></div>
                <div className="col-1">
                    <ul className="user menu">
                        <li>
                        <a><i className="fas fa-user-circle fa-3x iemdb-user"></i></a>
                        <ul>    
                            <li className="iemdb-user-elemnt iemdb-rounded-top"><a href='#' className="color-white" >salehi@gmail.com</a></li>    
                            <li className="iemdb-user-elemnt iemdb-rounded-bottom"><a href='./watchlist.html' className="color-white">watch list</a></li>     
                        </ul> 
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
 
export default Navbar;