import React from 'react';
import ReactStars from "react-rating-stars-component";
import '../styles/main.css';
import '../styles/movie.css';
import '../styles/vazir-fonts.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { PUBLIC_URL, toastConfig, BACK_URL } from './tools';

import Navbar from './navbar';
import Actor from './actor';

function MovieActor(props){
    return(
        <div className="col-3">
            <div className="iemdb-movie-actor cursor-pointer">
                <img src={props.image} className="iemdb-movie-actor-image" alt=""/>
                <a href={"/actors/" + props.id}><div className="iemdb-movie-actor-overlay">{props.name} <br />Age: {props.age}</div></a>
            </div>
        </div>
    );
}

class MovieComment extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
    }

    static getDerivedStateFromProps(props, state) {
        if(props.id != state.id){
            return props;
        }
        return state;
    } 

    doVote(event, score){
        event.preventDefault();

        var http = new XMLHttpRequest();
        var params = '?vote=' + score;
        http.open('PUT', BACK_URL + '/comment/' + this.state.id + params, true);
        http.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        http.setRequestHeader('Authorization', "bearer " + localStorage.getItem('jwt'));
        http.onreadystatechange = () =>  {
            if(http.readyState == 4 && http.status == 202) {
                this.setState(JSON.parse(http.responseText).value)
            }
            else if (http.readyState == 4 && http.status == 403){
                toast.error('You should login first!\nRedirecting to login page', toastConfig);
                window.location.replace(PUBLIC_URL + "/login")
            }
        }
        http.send();
    }

    render(){
        return(
        <div className="col-12 mt-4 iemdb-movie-comment-item">
            <div className="col-12 text-align-right" dir="rtl">
                {this.props.userNickname}
            </div>
            <hr />
            <div className="col-12">
                <div className="row width-100">
                    <div className="col-2 mr-0 mt-0 mb-0">
                        <div className="col-12 m-0 p-0">
                            <div className="row width-100">
                                <div className="col m-0 p-0 cursor-pointer">
                                    <i className="fa fa-chevron-circle-down down-vote" onClick={(e) => {this.doVote(e, 1)}}></i>
                                    <br/><p className="pl-2">{this.state.votes.likes}</p>
                                </div>
                                <div className="col m-0 p-0 cursor-pointer">
                                    <i className="fa fa-chevron-circle-up up-vote" onClick={(e) => {this.doVote(e, -1)}}></i>
                                    <br/><p className="pl-1">{this.state.votes.dislikes}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-10 text-align-right" dir="rtl">
                       {this.props.text}
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

function MovieCommentInput(props){

    const postComment = (e) => {
        e.preventDefault();
        
        var http = new XMLHttpRequest();
        var params = {
            "movieId":props.movieId,
            "text": document.getElementById("commentTextArea").value,
        };
        http.open('POST', BACK_URL + '/comment', true);
        http.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        http.setRequestHeader('Authorization', "bearer " + localStorage.getItem('jwt'));

        http.onreadystatechange = () => {
            if(http.readyState == 4 && http.status == 202) {
                document.getElementById("commentTextArea").value = "";
                props.action(JSON.parse(http.responseText).value);
            }
            else if (http.readyState == 4 && http.status == 403){
                toast.error('You should login first!\nRedirecting to login page', toastConfig);
                window.location.replace(PUBLIC_URL + "/login")
            }
            else if (http.readyState == 4 && ((http.status == 400) || (http.status == 401) || (http.status == 404))) {
                let length_add_comment = JSON.parse(http.responseText).errors.length;
                for (let i = 0; i < length_add_comment ; i++) {
                    toast.error(JSON.parse(http.responseText).errors[i], toastConfig);
                }
            }
            else if (http.readyState == 4) {
                toast.error('Something went wrong!', toastConfig);
            }
        }
        http.send(JSON.stringify(params));
    };

    return(
        <div className="col-12 mt-4 iemdb-movie-comment-item">
            <div className="col-12 text-align-right" dir="rtl">
                ???????????? ?????? ???? ?????????? ????????:
            </div>
            <hr />
            <div className="col-12 mb-3">
                <textarea dir="auto" className="iemdb-input-comment" rows="4" cols="50" id="commentTextArea"></textarea>
            </div>
            <div className="col-12 p-0">
                <button type="submit" onClick={(e) => {postComment(e);}} className="text-align-center iemdb-input-comment-button">??????</button>
            </div>
        </div>
    );
}

class MovieInfo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {showStars : false};
    }

    static getDerivedStateFromProps(props, state) {
        if(props.info.id != state.id){
            return props.info;
        }
        return state;
    }           

    displayStars = (event) =>{
        event.preventDefault();
        this.setState(prevState => ({showStars : true}))
    }

    ratingChanged = (newRating) => {
        var http = new XMLHttpRequest();
        var params = '?score=' + newRating;
        console.log(newRating)
        http.open('PUT', BACK_URL + '/movies/' + this.state.id + params, true);
        http.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        http.setRequestHeader('Authorization', "bearer " + localStorage.getItem('jwt'));

        http.onreadystatechange = () =>  {
            if(http.readyState == 4 && http.status == 202) {
                this.setState(prevState => ({rating : JSON.parse(http.responseText).value.rating}))
                this.setState(prevState => ({numberOfRates : JSON.parse(http.responseText).value.numberOfRates}))
                this.setState(prevState => ({showStars : false}))
            }
            else if (http.readyState == 4 && http.status == 403){
                toast.error('You should login first!\nRedirecting to login page', toastConfig);
                window.location.replace(PUBLIC_URL + "/login")
            }
            else if (http.readyState == 4 && ((http.status == 400) || (http.status == 401) || (http.status == 404))) {
                let length_rate_movie = JSON.parse(http.responseText).errors.length;
                for (let i = 0; i < length_rate_movie ; i++) {
                    toast.error(JSON.parse(http.responseText).errors[i], toastConfig);
                }
            }
            else if (http.readyState == 4) {
                toast.error('Something went wrong!', toastConfig);
            }
        }
        http.send();
    };

    addToWatchlist = (event) => {
        event.preventDefault();
        var http = new XMLHttpRequest();
        var params = '?movieId=' + this.state.id;
        http.open('POST', BACK_URL + '/user/watchlist' + params, true);
        http.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        http.setRequestHeader('Authorization', "bearer " + localStorage.getItem('jwt'));

        http.onreadystatechange = () => {
            if(http.readyState == 4 && http.status == 202) {
                this.setState(prevState => ({existsInWatchlist : true}))
            }
            else if (http.readyState == 4 && http.status == 403){
                toast.error('You should login first!\nRedirecting to login page', toastConfig);
                window.location.replace(PUBLIC_URL + "/login")
            }
            else if (http.readyState == 4 && ((http.status == 400) || (http.status == 401) || (http.status == 404))) {
                let length_add_watchlist = JSON.parse(http.responseText).errors.length;
                for (let i = 0; i < length_add_watchlist ; i++) {
                    toast.error(JSON.parse(http.responseText).errors[i], toastConfig);
                }
            }
            else if (http.readyState == 4) {
                toast.error('Something went wrong!', toastConfig);
            }
        }
        http.send();
    };
    
    render(){
        return(
            <div className="row width-100">
                <div className="col-3 pr-0 pl-0 ml-0 mr-0 iemdb-movie-poster-container">
                    <img className="iemdb-movie-poster" src={this.state.image} alt=""/>
                    {
                        this.state.existsInWatchlist ?
                            <button disabled style={{backgroundColor:"#4ecb71"}} className="login-form-button" type="submit" >?????????? ???? ???????? ??????????</button> 
                            :
                            <button className="login-form-button" type="submit" onClick={(e) => {this.addToWatchlist(e)}}>???????????? ???? ????????</button>
                    }
                    
                </div>
                <div className="col-6 pr-0 pl-0 ml-0 mr-0 ">
                    <div>
                        <div className="col text-align-left pr-0 pl-2 ">
                            <p className="font-size-11">{this.state.name}</p>
                        </div>
                        <div className="col text-align-right pr-1 pl-0 " dir="rtl">
                            <p>????????????????: {this.state.director}</p>
                            <p>??????????????????: {this.state&&this.state.writers&&this.state.writers.map(t => <span key={t}>{t}</span>).reduce((prev, curr) => [prev, ', ', curr])}</p>
                            <p>?????? ????????: {this.state.duration} ??????????</p>
                        </div>
                        <div className="col text-align-left pr-0 pl-2 mt-5" dir="rtl">
                            <p>?????????? ????????????: {this.state.releaseDate}</p>
                        </div>
                    </div>
                    <hr className="seprator"/>
                    <div className="row text-align-right pl-3 pr-3" dir="rtl">
                        <p>{this.state.summary}</p>
                    </div>
                </div>
                <div className="col-3 iemdb-movie-score pt-5 ml-0 mr-0">
                    <h1 className="text-align-center">{this.state.imdbRate}</h1>
                    <br />
                    
                    {!this.state.showStars ?
                        <p className="text-align-center" onClick={(e) =>{this.displayStars(e)}}><span className="fa fa-star checked fa-2x"></span></p>
                        :
                        <div className='star-container'>
                            <ReactStars count={10} onChange={(newRating) => {this.ratingChanged(newRating)}} size={45} activeColor="orange" />
                        </div>
                    }
    
                    <div className="row iemdb-movie-score-row" dir="rtl">
                        <div className="col-7 text-align-right">
                            <p className="font-size-12">???????????? ??????????????</p>
                            <p className="text-align-center pl-4 iemdb-movie-vote-count">({this.state.numberOfRates} ??????)</p>
                        </div>
                        <div className="col-5 pt-2 pr-3">
                            <h3 className="text-align-right">{this.state.rating}</h3>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


class Movie extends React.Component{
    constructor(props) {
        const location = window.location.href;
        super(props);
        this.movideId = location.split("/")[4];
        this.state = {"isLoaded":false};
    }

    render(){
        const actors = []
        for(var index in this.state.actors){
            actors.push(<MovieActor 
                            id = {this.state.actors[index].id}
                            image = {this.state.actors[index].image}
                            name={this.state.actors[index].name} 
                            age={this.state.actors[index].age} 
                            key={this.state.actors[index].id}/>)
        }

        const comments = []
        for(var index in this.state.comments){
            comments.push(<MovieComment
                            id = {this.state.comments[index].id}
                            userNickname = {this.state.comments[index].userNickname}
                            text={this.state.comments[index].text} 
                            votes={this.state.comments[index].votes}
                            key={this.state.comments[index].id}/>)
        }
    
        return(
            <div>
                <Navbar/>
                <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                toastStyle={{ backgroundColor: "#b12025", color: "white" }}
                />

            {this.state.isLoaded &&
                <div className="main-container">
                    <div className="row color-white ml-0 width-100">
                        <img className="iemdb-movie-info-img" src={this.state.coverImage} alt=""/>
                    </div>
                    <div className="row color-white ml-0 width-100 iemdb-movie-info">
                        <div className="col-custom-20" ></div>
                        <div className="col-custom-60" >
                            <MovieInfo info = {this.state}/>
                        </div>
                        <div className="col-custom-20"></div>
                    </div>
                    <div className="row width-100">
                        <div className="col-custom-20"></div>
                        <div className="col-custom-60">
                            <div className="row iemdb-movie-cast ml-0 mr-0 pt-3 width-100">
                                <div className="col-12 text-align-center mt-0 mb-0 pt-0 pb-0">
                                    <p className="font-size-11">????????????????</p>
                                </div>
                                <div className="row ml-0 mr-0 iemdb-cast-row width-100 flex-row flex-nowrap overflow-auto">
                                    {actors}
                                </div>
                            </div>
                        </div>
                        <div className="col-custom-20"></div>
                    </div>
                    <div className="row width-100 mb-5">
                        <div className="col-custom-20"></div>
                        <div className="col-custom-60">
                            <div className="row iemdb-movie-comment ml-0 mr-0 pt-3 width-100">
                                <div className="col-12 text-align-center mt-0 mb-0 pt-0 pb-0">
                                    <p className="font-size-11">???????????? ????</p>
                                </div>
                                <div className="row ml-0 mr-0 iemdb-comment-row width-100 pb-4">
                                    <MovieCommentInput movieId = {this.state.id} action = {this.updateComments}/>
                                    {comments}
                                </div>
                            </div>
                        </div>
                        <div className="col-custom-20"></div>
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
        )
    }

    updateComments = (newComment) =>{
        this.state.comments.push(newComment);
        this.setState(prevState => ({comments : this.state.comments}))
    }

    componentDidMount = () => {
        var http1 = new XMLHttpRequest();
        http1.open('GET', BACK_URL + '/movies/' + this.movideId, true);
        http1.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        http1.setRequestHeader('Authorization', "bearer " + localStorage.getItem('jwt'));
        http1.onreadystatechange = () => {
            if(http1.readyState == 4 && http1.status == 200) {
                this.setState(JSON.parse(http1.responseText).value)
                this.setState(prevState => ({isLoaded : true}))
            }
            else if (http1.readyState == 4 && http1.status == 403){
                toast.error('You should login first!\nRedirecting to login page', toastConfig);
                window.location.replace(PUBLIC_URL + "/login")
            }
            else if (http1.readyState == 4 && ((http1.status == 400) || (http1.status == 401) || (http1.status == 404))) {
                let length1 = JSON.parse(http1.responseText).errors.length;
                for (let i = 0; i < length1 ; i++) {
                    toast.error(JSON.parse(http1.responseText).errors[i], toastConfig);
                }
            }
            else if (http1.readyState == 4) {
                toast.error('Something went wrong!', toastConfig);
            }
        }
        http1.send();

        var http2 = new XMLHttpRequest();
        http2.open('GET', BACK_URL + '/movies/' + this.movideId + "/comments", true);
        http2.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        http2.setRequestHeader('Authorization', "bearer " + localStorage.getItem('jwt'));
        http2.onreadystatechange = () => {
            if(http2.readyState == 4 && http2.status == 200) {
                this.setState(prevState => ({comments : JSON.parse(http2.responseText).value}))
            }
            else if (http2.readyState == 4 && http2.status == 403){
                toast.error('You should login first!\nRedirecting to login page', toastConfig);
                window.location.replace(PUBLIC_URL + "/login")
            }
            else if (http2.readyState == 4 && ((http2.status == 400) || (http2.status == 404))) {
                let length2 = JSON.parse(http2.responseText).errors.length;
                for (let j = 0; j < length2 ; j++) {
                    toast.error(JSON.parse(http2.responseText).errors[j], toastConfig);
                }
            }
            else if (http2.readyState == 4 && http2.status != 401) {
                toast.error('Something went wrong!', toastConfig);
            }
        }
        http2.send();

        var http3 = new XMLHttpRequest();
        http3.open('GET', BACK_URL + '/movies/' + this.movideId + "/actors", true);
        http3.setRequestHeader('Content-type', 'application/json;charset=UTF-8'); 
        http3.setRequestHeader('Authorization', "bearer " + localStorage.getItem('jwt'));
        http3.onreadystatechange = () => {
            if(http3.readyState == 4 && http3.status == 200) {
                this.setState(prevState => ({actors : JSON.parse(http3.responseText).value}))
            }
            else if (http3.readyState == 4 && ((http3.status == 400) || (http3.status == 403) || (http3.status == 404))) {
                let length3 = JSON.parse(http3.responseText).errors.length;
                for (let k = 0; k < length3 ; k++) {
                    toast.error(JSON.parse(http3.responseText).errors[k], toastConfig);
                }
            }
            else if (http3.readyState == 4 && http3.status != 401) {
                toast.error('Something went wrong!', toastConfig);
            }
        }
        http3.send();
    }
}
export default Movie;