import React from 'react';
import Navbar from './navbar';
import Movie from './movie';
import root from './tools';

import './styles/main.css'
import './styles/actor.css'
import './styles/movies.css'

function ActorMovie(props){
    return(
        <div className="col-4">
            <div className="iemdb-actor-movie">
                <img src={props.image} className="iemdb-actor-movie-image" alt=""/>
                <div onClick={(e) => {e.preventDefault();console.log("HEllO")}} className="iemdb-actor-movie-overlay">{props.name} <br /><br /> {props.imdbRate}</div>
            </div>
        </div>
    )
}

class Actor extends React.Component{
    constructor(props) {
        super(props);
        this.state = {}
    }

    render(){
        const movies = []
        for(var index in this.state.movies){
            movies.push(<ActorMovie 
                            image = {this.state.movies[index].image}
                            name={this.state.movies[index].name} 
                            imdbRate={this.state.movies[index].imdbRate} 
                            key={this.state.movies[index].id}/>)
        }

        return(
            <div>
                 <Navbar/>

                <div className="main-container">
                    <div className="row mr-0">
                    <div className="col-sm-3">
                        <img src={this.state.image} className="iemdb-actor-image" alt=""/>
                    </div>
                    <div className="col-sm-9">
                        <div className="row ml-0 mr-0 mt-4">
                            <div className="col-7 iemdb-actor-info">
                                <h5>مشخصات بازیگر</h5>
                            </div>
                            <div className="col-5 iemdb-actor-info"></div>
                        </div>
                        <div className="row ml-0 mr-0 mt-4">
                            <div className="col-7 iemdb-actor-info"></div>
                            <div className="col-5 iemdb-actor-info">
                                <p dir="rtl">نام: {this.state.name}</p> 
                                <p dir="rtl">تاریخ تولد: {this.state.birthDate}</p>
                                <p dir="rtl">ملیت: {this.state.nationality}</p>
                                <p dir="rtl">تعداد فیلم: {this.state.nationality}</p>
                            </div>
                        </div>
                        <div className="row ml-0 mr-0 mt-4 mb-4">
                            <div className="col-7 iemdb-actor-info">
                                <h5 className="pr-4">فیلم ها</h5>
                            </div>
                            <div className="col-5 iemdb-actor-info"></div>
                        </div>
                        <div className="row ml-0 mr-0 pr-2 iemdb-actor-movie-container flex-row flex-nowrap overflow-auto">
                            {movies}
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount = () => {      
        fetch('http://localhost:8080/actor/' + this.props.actorId)
            .then(response => response.json())
            .then(data => {this.setState(data.value)});  
    }
}

export default Actor;