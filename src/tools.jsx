import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));

const redirect = (event, Component) =>{
    if(event){
        event.preventDefault();
    }
    root.render(Component)
}

export default root;
export {redirect};