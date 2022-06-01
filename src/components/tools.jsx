import React from 'react';
import ReactDOM from 'react-dom/client';
import '../styles/vazir-fonts.css'

const PUBLIC_URL = "http://localhost:3000"
const BACK_URL = "http://localhost:8080"

const root = ReactDOM.createRoot(document.getElementById('root'));

const CLIENT_ID = "33aa0e611f539f4a8d70";
const CLIENT_SECRET = "3f032929c619a823bcfc05a46d08c939da0d2803";

const redirect = (event, Component) =>{
    if(event){
        event.preventDefault();
    }
    root.render(Component)
}

const toastConfig = {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    }

export default root;
export {redirect, toastConfig, CLIENT_ID, CLIENT_SECRET, PUBLIC_URL, BACK_URL};