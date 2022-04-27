import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/main.css'
import './styles/movies.css'
// import './styles/vazir-fonts.css'

function Movie(props){
    return(
        <div className="col-3 iemdb-movies-movie ">
        <a href="./movie.html">
            <div><p>{props.movieName}<br/><br/>{props.movieRate}</p></div>
            <img src={props.imgAddrs} alt=""/>
        </a>
        </div>
    );
}

class Movies extends React.Component{
    constructor(props) {
        super(props);
        this.state = {}
    }
    render(){

        const movies = []
        
        for(var index in this.state){
            movies.push(<Movie movieName={this.state[index].name} 
                            movieRate = "8.8" 
                            imgAddrs={this.state[index].image} 
                            key={this.state[index].id}/>)
        }


        return (
            <div>
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

                <div className="main-container">
                    <div className="row width-100 mt-5">
                        <div className="col-2"></div>
                        
                        <div className="col-8 row">
                            {movies}
                        </div>

                        <div className="col-2 mt-5">
                            <div><p className="iemdb-sort-title" dir="rtl"> رتبه بندی بر اساس:</p>  </div>
                            <ul className="iemdb-sort-list">
                                <li className="iemdb-user-elemnt iemdb-rounded-top" dir="rtl"><a href='#' className="color-white" >تاریخ</a></li>
                                <li className="iemdb-user-elemnt iemdb-rounded-bottom" dir="rtl"><a href='#' className="color-white">امتیاز IMDB</a></li>
                            </ul> 
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    componentDidMount() {        
        fetch('http://localhost:8080/movies')
            .then(response => response.json())
            .then(data => this.setState(data.value))
    }
}

export default Movies;