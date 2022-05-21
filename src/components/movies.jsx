import React from 'react';
import '../styles/main.css'
import '../styles/movies.css'
import '../styles/vazir-fonts.css'
import Movie from './movie';
import Navbar from './navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import root from './tools';
import {redirect} from './tools';

function MovieItem(props){
    return(
        <div className="col-3 iemdb-movies-movie cursor-pointer">
            <a href={'/movies/'+ props.movieId}>
                <div><p>{props.movieName}<br/><br/>{props.movieRate}</p></div>
                <img src={props.imgAddrs} alt=""/>
            </a>
        </div>
    );
}

class Movies extends React.Component{
    constructor(props) {
        super(props);
        this.state = {"isLoaded": false, "movies": [], sortBy:"", searchType:"", searchText:""}
    }

    doSort = (event, sortBy) => {
        event.preventDefault();
        if(this.state.sortBy === sortBy){
            this.setState(prevState => ({sortBy : "", "isLoaded": false}), this.componentDidMount);
        }
        else {
            this.setState(prevState => ({sortBy : sortBy, "isLoaded": false}), this.componentDidMount);
        }
    }

    doSearch = (searchType, searchText) => {
        this.setState(prevState => ({searchType : searchType, searchText : searchText, "isLoaded": false}),
         this.componentDidMount);
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

        return (
            <div>
                <Navbar showBox = "true" action = {this.doSearch}/>

                <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar={false} newestOnTop={false}
                                closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover
                                toastStyle={{ backgroundColor: "#b12025", color: "white" }}/>

                <div className="main-container">
                    {this.state.isLoaded &&
                        <div className="row width-100 mt-5">
                            <div className="col-2"></div>
                            
                            <div className="col-8 row mb-5">
                                {movies}
                            </div>

                            <div className="col-2 mt-5">
                                <div><p className="iemdb-sort-title" dir="rtl"> رتبه بندی بر اساس:</p>  </div>
                                <ul className="iemdb-sort-list">
                                    <li className="iemdb-user-elemnt iemdb-rounded-top" dir="rtl" 
                                        style={{backgroundColor:this.state.sortBy === "date" ? "rgba(177, 32, 37, 0.9)" : "rgba(177, 32, 37, 0.6)"}}
                                        onClick={(e) => this.doSort(e, "date")}>
                                        <a href='#' className="color-white"  >تاریخ</a>
                                    </li>
                                    <li className="iemdb-user-elemnt iemdb-rounded-bottom" dir="rtl"
                                        style={{backgroundColor:this.state.sortBy === "imdb" ? "rgba(177, 32, 37, 0.9)" : "rgba(177, 32, 37, 0.6)"}}
                                        onClick={(e) => this.doSort(e, "imdb")}>
                                        <a href='#' className="color-white">امتیاز IMDB</a>
                                    </li>
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
        var http = new XMLHttpRequest();
        var params = "";
        this.setState(prevState => ({"isLoaded": false}))
        if(this.state.sortBy !== "" || this.state.searchType !== "" || this.state.searchText !== ""){
            params = "?";
            var hasPrevParam = false;
            if(this.state.sortBy !== ""){
                hasPrevParam = true;
                params = params + "sort=" + this.state.sortBy;
            }
            if(this.state.searchType !== ""){
                if(hasPrevParam){
                    params = params + "&";
                }
                hasPrevParam = true;
                params = params + "queryType=" + this.state.searchType;
            }
            if(this.state.searchText !== ""){
                if(hasPrevParam){
                    params = params + "&";
                }
                hasPrevParam = true;
                params = params + "query=" + this.state.searchText;
            }
        }

        http.open('GET', 'http://localhost:8080/movies' + params, true);
        http.setRequestHeader('Content-type', 'application/json;charset=UTF-8'); 
        http.onreadystatechange = () => {
            if(http.readyState == 4 && http.status == 200) {
                this.setState(prevState => ({"isLoaded": true}))
                this.setState(prevState => ({"movies": JSON.parse(http.responseText).value}))
            }
            else if (http.readyState == 4 && ((http.status == 400) || (http.status == 401) || (http.status == 403) || (http.status == 404))) {
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
            else if (http.readyState == 4) {
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
        http.send();
    }
}

export default Movies;