import { CLIENT_ID, CLIENT_SECRET } from './tools'

function getToken(code) {
    var url = "http://localhost:8080/account/sso?code=";
    url += code;
    var http = new XMLHttpRequest();
    http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    http.onreadystatechange = () =>  {
    if(http.readyState == 4){
        if(http.status == 200) {
            localStorage.setItem("jwt", JSON.parse(http.responseText).value.jwt)
            window.location.replace("http://localhost:3000/movies")
        }
        else {
            window.location.replace("http://localhost:3000/login");
        }
    }
    }
    http.send();
}

function handleSSO() {
    var url = window.location.href;
    var splitted_url = url.split("?");
    if (splitted_url.length != 2) {
        window.location.replace("http://localhost:3000/login");
        return;
    }
    var values = splitted_url[1].split("=");
    if (values.length != 2) {
        window.location.replace("http://localhost:3000/login");
        return;
    }
    getToken(values[1]);
}

const SSO = () => {
    if(localStorage.getItem("jwt") != null){
        window.location.replace("http://localhost:3000/movies")
    }
    handleSSO()
};

export {SSO};