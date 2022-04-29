import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/main.css'
import './styles/movies.css'
import './styles/vazir-fonts.css'
import Movie from './movie';
import Navbar from './navbar';

import root from './tools';
import {redirect} from './tools';

function MovieItem(props){
    return(
        <div className="col-3 iemdb-movies-movie ">
            <a onClick={(e) => {e.preventDefault(); redirect(e, <Movie movieId = {props.movieId}/>)}}>
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
            movies.push(<MovieItem 
                            movieId = {this.state[index].id}
                            movieName={this.state[index].name} 
                            movieRate = {this.state[index].imdbRate} 
                            imgAddrs={this.state[index].image} 
                            key={this.state[index].id}/>)
        }


        return (
            <div>
                <Navbar showBox = "true"/>

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
        var http = new XMLHttpRequest();
        http.open('GET', 'http://localhost:8080/movies', true);
        http.setRequestHeader('Content-type', 'application/json;charset=UTF-8'); 
        http.onreadystatechange = () => {
            if(http.readyState == 4 && http.status == 200) {
                this.setState(JSON.parse(http.responseText).value)
            }
        }
        http.send();
    }
}

export default Movies;