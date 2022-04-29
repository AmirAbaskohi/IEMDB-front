import React from 'react';
import Movies from './movies';
import Navbar from './navbar';
import './styles/main.css';
import './styles/watchlist.css'

import root from './tools';
import {redirect} from './tools';

class WatchlistMovie extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};    
    }
    render(){
        return(
            <div class="card mb-3 iemdb-watchlist-card">
                <div class="row">
                    <div class="col-md-3">
                        <a href="./movie.html"><img src="./imgs/movie-3.jpg" class="card-img iemdb-watchlist-card-img" alt=""/></a>
                    </div>
                    <div class="col-md-9">
                        <div class="row">
                            <div class="iemdb-watchlist-movie-name">
                            <p><span class="iemdb-watchlist-movie-title">The Godfather</span><span class="iemdb-watchlist-trash"><i class="fas fa-trash color-red"></i></span></p>
                            </div>
                        </div>
                        <div class="row iemdb-watchlist-movie-info">
                            <div class="col-5 text-align-right pr-4">
                            <br />
                            <br />
                            <p>9.2 <b dir="rtl">امتیاز IMDB: </b></p>
                            <br />
                            <p><b>امتیاز کاربران: </b>9.1</p>
                            </div> 
                            <div class="col-7 text-align-right pr-4" dir="rtl">
                            <p><b>کارگردان: </b>Francis Ford Coppola</p>
                            <p><b>ژانر: </b>جنایی، درام</p>
                            <p><b>تاریخ انتشار: </b>1972/03/2</p>
                            <p><b>مدت زمان: </b>175 دقیقه</p>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class WatchlistRecomMovie extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};    
    }
    render(){
        return(
            <div class="col">
                <div class="iemdb-watchlist-recom-movie">
                    <img src="./imgs/movie-4.jpg" class="iemdb-watchlist-recom-movie-image" alt=""/>
                    <div class="iemdb-watchlist-recom-movie-overlay">The Conjuring <br /><br /> 7.5</div>
                </div>
            </div>
        )
    }
}

class Watchlist extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};    
    }
    render(){
        return(
            <div>
                <Navbar/>

                <div class="main-container">
                    <div class="container-fluid mt-5 mb-5">
                    <div class="row">
                        <div class="col-3"></div>
                        <div class="col-6 pr-5 pl-5">
                            <WatchlistMovie/>
                            <WatchlistMovie/>
                        </div>
                        <div class="col-3"></div> 
                    </div>
                    <div class="row iemdb-watchlist-recom-row">
                        <div class="col-2"></div>
                        <div class="col-8 iemdb-watchlist-container">
                        <div class="row">
                            <div class="col">
                            </div>
                            <div class="col">
                            <p class="color-white text-align-center mt-2">فیلم های پیشنهادی</p>
                            </div>
                            <div class="col">
                            </div>
                        </div>
                        <div class="row">
                            <WatchlistRecomMovie/>
                            <WatchlistRecomMovie/>
                            <WatchlistRecomMovie/>
                        </div>
                        </div>
                        <div class="col-2"></div>
                    </div>
                    </div>  
                </div>
            </div>
        )
    }
}

export default Watchlist;