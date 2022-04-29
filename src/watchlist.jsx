import React from 'react';
import Movies from './movies';
import Movie from './movie';
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
            <div className="card mb-3 iemdb-watchlist-card">
                <div className="row">
                    <div className="col-md-3">
                        <a onClick={(e) => {redirect(e, <Movie movieId = {this.props.info.id}/>)}}>
                            <img src={this.props.info.image} className="card-img iemdb-watchlist-card-img" alt=""/>
                        </a>
                    </div>
                    <div className="col-md-9">
                        <div className="row">
                            <div className="iemdb-watchlist-movie-name">
                            <p><span className="iemdb-watchlist-movie-title">{this.props.info.name}</span><span className="iemdb-watchlist-trash"><i className="fas fa-trash color-red"></i></span></p>
                            </div>
                        </div>
                        <div className="row iemdb-watchlist-movie-info">
                            <div className="col-5 text-align-right pr-4">
                            <br />
                            <br />
                            <p>{this.props.info.imdbRate} <b dir="rtl">امتیاز IMDB: </b></p>
                            <br />
                            <p><b>امتیاز کاربران: </b>{this.props.info.rating}</p>
                            </div> 
                            <div className="col-7 text-align-right pr-4" dir="rtl">
                            <p><b>کارگردان: </b>{this.props.info.director}</p>
                            <p><b>ژانر: </b>{this.props.info&&this.props.info.genres&&this.props.info.genres.map(t => <span key={t}>{t}</span>).reduce((prev, curr) => [prev, ', ', curr])}</p>
                            <p><b>تاریخ انتشار: </b>{this.props.info.releaseDate}</p>
                            <p><b>مدت زمان: </b>{this.props.info.duration} دقیقه</p>
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
            <div className="col">
                <div className="iemdb-watchlist-recom-movie">
                    <img src={this.props.info.image} className="iemdb-watchlist-recom-movie-image" alt=""/>
                    <div className="iemdb-watchlist-recom-movie-overlay">{this.props.info.name} <br /><br /> {this.props.info.imdbRate}</div>
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

        const watchlist = []
        for(var index in this.state.watchlist){
            watchlist.push(<WatchlistMovie info = {this.state.watchlist[index] }
                            key={this.state.watchlist[index].id}/>)
        }

        const recommendations = []
        
        for(var index in this.state.recommendations){
            console.log(this.state.recommendations[index])
            recommendations.push(<WatchlistRecomMovie  info = {this.state.recommendations[index] }
                            key={this.state.recommendations[index].id}/>)
        }

        return(
            <div>
                <Navbar/>

                <div className="main-container">
                    <div className="container-fluid mt-5 mb-5">
                    <div className="row">
                        <div className="col-3"></div>
                        <div className="col-6 pr-5 pl-5">
                            {watchlist}
                        </div>
                        <div className="col-3"></div> 
                    </div>
                    <div className="row iemdb-watchlist-recom-row">
                        <div className="col-2"></div>
                        <div className="col-8 iemdb-watchlist-container">
                        <div className="row">
                            <div className="col">
                            </div>
                            <div className="col">
                            <p className="color-white text-align-center mt-2">فیلم های پیشنهادی</p>
                            </div>
                            <div className="col">
                            </div>
                        </div>
                        <div className="row">
                            {recommendations}
                        </div>
                        </div>
                        <div className="col-2"></div>
                    </div>
                    </div>  
                </div>
            </div>
        )
    }
    componentDidMount = () => {
        var http1 = new XMLHttpRequest();
        http1.open('GET', 'http://localhost:8080/user/watchlist', true);
        http1.setRequestHeader('Content-type', 'application/json;charset=UTF-8'); 
        http1.onreadystatechange = () => {
            if(http1.readyState == 4 && http1.status == 200) {
                this.setState(prevState => ({watchlist : JSON.parse(http1.responseText).value}))
            }
        }
        http1.send();

        var http2 = new XMLHttpRequest();
        http2.open('GET', 'http://localhost:8080/user/recommendationList', true);
        http2.setRequestHeader('Content-type', 'application/json;charset=UTF-8'); 
        http2.onreadystatechange = () => {
            if(http2.readyState == 4 && http2.status == 200) {
                this.setState(prevState => ({recommendations : JSON.parse(http2.responseText).value}))
            }
        }
        http2.send();
    }
}

export default Watchlist;