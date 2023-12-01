const url = new URLSearchParams(window.location.search);
const email = url.get('email');


//Plota na tela os alertas
const alerts = JSON.parse(localStorage.getItem('alerts')) || [];
const section = document.getElementById('card');
for(let alert in alerts){
    if(alerts[alert].email != null){
        const a = document.createElement('input');
        a.value = "alerta: " +  alerts[alert].alerts;
        const autor = document.createElement('input');
        autor.value = "autor: " + alerts[alert].name;
        const img = document.createElement('img');
        img.src = alerts[alert].path;
        const data = document.createElement('input');
        data.value  = "data: " + alerts[alert].data;
        const timer = document.createElement('input');
        timer.value  = "hora: " +  alerts[alert].timer;
        section.appendChild(a);
        section.appendChild(autor);
        section.appendChild(img);
        section.appendChild(data);
        section.appendChild(timer);
    }
}

//Procura os dados do usuário com aquele email
const getUser = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    for(let indice in users){
        if(email == users[indice].email){
           // const alertsUser = upadeteAlerts(users[indice]);
            return {user: users[indice], users: users};
        }
    }
    return {user: null, users:null};
}

const updateImg = () => {
    const user = getUser().user;
    const img_perfil = document.getElementById('img-perfil');
    img_perfil.src = user.path;
}

updateImg();

const perfil = () => {
    window.location.href = "../routes/perfil.html" 
    + "?email=" + encodeURIComponent(email);;
}
const menu = () => {
    window.location.href = "../routes/showAlerts.html" 
    + "?email=" + encodeURIComponent(email);;
}
const alertar = () => {
    window.location.href = "../routes/addAlert.html" 
    + "?email=" + encodeURIComponent(email);;
}
const rastreamento  = () => {
    window.location.href = "../routes/rastreamento.html" 
    + "?email=" + encodeURIComponent(email);;
}
const sair = () => {
    window.location.href = "../../index.html";
}