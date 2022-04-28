import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/main.css'
import './styles/movie.css'

import Navbar from './navbar';

function MovieActor(props){
    return(
        <div className="col-3">
            <div className="iemdb-movie-actor">
                <img src={props.image} className="iemdb-movie-actor-image" alt=""/>
                <a href="./actor.html"><div className="iemdb-movie-actor-overlay">{props.name} <br />Age: {props.age}</div></a>
            </div>
        </div>
    );
}

function MovieComment(props){
    return(
        <div className="col-12 mt-4 iemdb-movie-comment-item">
            <div className="col-12 text-align-right" dir="rtl">
                {props.userNickname}
            </div>
            <hr />
            <div className="col-12">
                <div className="row width-100">
                    <div className="col-2 mr-0 mt-0 mb-0">
                        <div className="col-12 m-0 p-0">
                            <div className="row width-100">
                                <div className="col m-0 p-0"><i className="fa fa-chevron-circle-down down-vote"></i><br/><p className="pl-2">{props.likes}</p></div>
                                <div className="col m-0 p-0"><i className="fa fa-chevron-circle-up up-vote"></i><br/><p className="pl-1">{props.dislikes}</p></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-10 text-align-right" dir="rtl">
                       {props.text}
                    </div>
                </div>
            </div>
        </div>
    );
}

function MovieCommentInput(props){
    return(
        <div className="col-12 mt-4 iemdb-movie-comment-item">
            <div className="col-12 text-align-right" dir="rtl">
                دیدگاه خود را اضافه کنید:
            </div>
            <hr />
            <div className="col-12 mb-3">
                <textarea dir="auto" className="iemdb-input-comment" rows="4" cols="50"></textarea>
            </div>
            <div className="col-12 p-0">
                <button type="submit" className="text-align-center iemdb-input-comment-button">ثبت</button>
            </div>
        </div>
    );
}

function MovieInfo(props){
    return(
        <div className="row width-100">
            <div className="col-3 pr-0 pl-0 ml-0 mr-0 iemdb-movie-poster-container">
                <img className="iemdb-movie-poster" src={props.info.image} alt=""/>
            </div>
            <div className="col-6 pr-0 pl-0 ml-0 mr-0 ">
                <div>
                    <div className="col text-align-left pr-0 pl-2 ">
                        <p className="font-size-11">{props.info.name}</p>
                    </div>
                    <div className="col text-align-right pr-1 pl-0 " dir="rtl">
                        <p>کارگردان: {props.info.director}</p>
                        <p>نویسندگان: {props&&props.info.writers&&props.info.writers.map(t => <span key={t}>{t}</span>).reduce((prev, curr) => [prev, ', ', curr])}</p>
                        <p>مدت زمان: {props.info.duration} دقیقه</p>
                    </div>
                    <div className="col text-align-left pr-0 pl-2 mt-5" dir="rtl">
                        <p>تاریخ انتشار: {props.info.releaseDate}</p>
                    </div>
                </div>
                <hr className="seprator"/>
                <div className="row text-align-right pl-3 pr-3" dir="rtl">
                    <p>{props.info.summary}</p>
                </div>
            </div>
            <div className="col-3 iemdb-movie-score pt-5 ml-0 mr-0">
                <h1 className="text-align-center">{props.info.imdbRate}</h1>
                <br />
                <p className="text-align-center"><span className="fa fa-star checked fa-2x"></span></p>
                <div className="row iemdb-movie-score-row" dir="rtl">
                    <div className="col-7 text-align-right">
                        <p className="font-size-12">امتیاز کاربران</p>
                        <p className="text-align-center pl-4 iemdb-movie-vote-count">(23 رای)</p>
                    </div>
                    <div className="col-5 pt-2 pr-0">
                        <h3 className="text-align-right">8.3</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}



class Movie extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
        var data = {};
    }

    render(){
        const actors = []
        for(var index in this.state.actors){
            actors.push(<MovieActor 
                            image = {this.state.actors[index].image}
                            name={this.state.actors[index].name} 
                            age={this.state.actors[index].age} 
                            key={this.state.actors[index].id}/>)
        }

        const comments = []
        for(var index in this.state.comments){
            comments.push(<MovieComment 
                            userNickname = {this.state.comments[index].userNickname}
                            text={this.state.comments[index].text} 
                            likes={this.state.comments[index].votes.likes}
                            dislikes={this.state.comments[index].votes.dislikes} 
                            key={this.state.comments[index].id}/>)
        }
        

        return(
            <div>
                <Navbar/>

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
                                <p className="font-size-11">بازیگران</p>
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
                                <p className="font-size-11">دیدگاه ها</p>
                            </div>
                            <div className="row ml-0 mr-0 iemdb-comment-row width-100 pb-4">
                                <MovieCommentInput/>
                                {comments}
                            </div>
                        </div>
                    </div>
                    <div className="col-custom-20"></div>
                </div>
            </div>
            </div>
        )
    }

    componentDidMount = () => {      
        fetch('http://localhost:8080/movies/' + this.props.movieId)
            .then(response => response.json())
            .then(data => {this.setState(data.value)});

        fetch('http://localhost:8080/movies/' + this.props.movieId + "/comments")
        .then(response => response.json())
        .then(data => {this.setState(this.setState(prevState => ({comments : data.value})))});

        fetch('http://localhost:8080/movies/' + this.props.movieId + "/actors")
        .then(response => response.json())
        .then(data => {this.setState(this.setState(prevState => ({actors : data.value})))});
        
    }
}
export default Movie;