import React from 'react';
import Navbar from './navbar';
import Movie from './movie';
import root, { redirect, toastConfig, PUBLIC_URL, BACK_URL} from './tools';
import '../styles/vazir-fonts.css'

import '../styles/main.css'
import '../styles/actor.css'
import '../styles/movies.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ActorMovie(props){
    return(
        <div className="col-4">
            <div className="iemdb-actor-movie cursor-pointer">
                <img src={props.image} className="iemdb-actor-movie-image" alt=""/>
                <a href={'/movies/' + props.id} className="iemdb-actor-movie-overlay">{props.name} <br /><br /> {props.imdbRate}</a>
            </div>
        </div>  
    )
}

class Actor extends React.Component{
    constructor(props) {
        const location = window.location.href;
        super(props);
        this.actorId = location.split("/")[4];
        this.state = {}
    }

    render(){
        const movies = []
        for(var index in this.state.movies){
            movies.push(<ActorMovie
                            id = {this.state.movies[index].id}
                            image = {this.state.movies[index].image}
                            name={this.state.movies[index].name} 
                            imdbRate={this.state.movies[index].imdbRate} 
                            key={this.state.movies[index].id}/>)
        }

        return(
            <div>
                <Navbar showBox = "true"/>

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

                <div className="main-container">
                    <div className="row mr-0">
                    <div className="col-sm-3">
                        <img src={this.state.image} className="iemdb-actor-image" alt=""/>
                    </div>
                    <div className="col-sm-9">
                        <div className="row ml-0 mr-0 mt-4">
                            <div className="col-7 iemdb-actor-info">
                                <h5>???????????? ????????????</h5>
                            </div>
                            <div className="col-5 iemdb-actor-info"></div>
                        </div>
                        <div className="row ml-0 mr-0 mt-4">
                            <div className="col-7 iemdb-actor-info"></div>
                            <div className="col-5 iemdb-actor-info">
                                <p dir="rtl">??????: {this.state.name}</p> 
                                <p dir="rtl">?????????? ????????: {this.state.birthDate}</p>
                                <p dir="rtl">????????: {this.state.nationality}</p>
                                <p dir="rtl">?????????? ????????: {this.state.nationality}</p>
                            </div>
                        </div>
                        <div className="row ml-0 mr-0 mt-4 mb-4">
                            <div className="col-7 iemdb-actor-info">
                                <h5 className="pr-4">???????? ????</h5>
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
        var http1 = new XMLHttpRequest();
        http1.open('GET', BACK_URL + '/actors/' + this.actorId, true);
        http1.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        http1.setRequestHeader('Authorization', "bearer " + localStorage.getItem('jwt'));
        http1.onreadystatechange = () => {
            if(http1.readyState == 4 && http1.status == 200) {
                this.setState(JSON.parse(http1.responseText).value)
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
        http2.open('GET', BACK_URL + '/actors/' + this.actorId + "/movies", true);
        http2.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
        http2.setRequestHeader('Authorization', "bearer " + localStorage.getItem('jwt'));
        http2.onreadystatechange = () => {
            if(http2.readyState == 4 && http2.status == 200) {
                this.setState(prevState => ({movies : JSON.parse(http2.responseText).value}))
            }
            else if (http2.readyState == 4 && http2.status == 403){
                toast.error('You should login first!\nRedirecting to login page', toastConfig);
                window.location.replace( PUBLIC_URL + "/login")
            }
            else if (http2.readyState == 4 && ((http2.status == 400) || (http2.status == 401) || (http2.status == 404))) {
                let length1 = JSON.parse(http2.responseText).errors.length;
                for (let i = 0; i < length1 ; i++) {
                    toast.error(JSON.parse(http2.responseText).errors[i], toastConfig);
                }
            }
            else if (http2.readyState == 4) {
                toast.error('Something went wrong!', toastConfig);
            }
        }
        http2.send();
    }
}

export default Actor;