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
        this.state = {"isLoaded": false, "movies": []}
    }
    render(){
        const movies = []
        
        for(var index in this.state.movies){
            movies.push(<MovieItem 
                            movieId = {this.state.movies[index].id}
                            movieName={this.state.movies[index].name} 
                            movieRate = {this.state.movies[index].imdbRate} 
                            imgAddrs={this.state.movies[index].image} 
                            key={this.state.movies[index].id}/>)
        }

        console.log(this.state.isLoaded)


        return (
            <div>
                <Navbar showBox = "true"/>

                <div className="main-container">
                    {this.state.isLoaded &&
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
                    }
                    {!this.state.isLoaded &&
                        <div className="d-flex justify-content-center text-secondary loader-margin">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
    componentDidMount() {      
        let lastMovies = this.state.movies;
        this.setState({"isLoaded": false, "movies":lastMovies})
        var http = new XMLHttpRequest();
        http.open('GET', 'http://localhost:8080/movies', true);
        http.setRequestHeader('Content-type', 'application/json;charset=UTF-8'); 
        http.onreadystatechange = () => {
            if(http.readyState == 4 && http.status == 200) {
                this.setState({"isLoaded": true, "movies": JSON.parse(http.responseText).value})
            }
        }
        http.send();
    }
}

export default Movies;