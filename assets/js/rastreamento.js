//Pegando o email por url
const url = new URLSearchParams(window.location.search);
const email = url.get('email');

//Retorna os usuário
const getUser = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
   
    for(let indice in users){
        if(email == users[indice].email){
            return {user: users[indice], users: users}
        }
    }
    window.location.href = "../../index.html";
}

const updateImg = () => {
    const user = getUser().user;
    const img_perfil = document.getElementById('img-perfil');
    img_perfil.src = user.path;
}

const producao = () => {
    alert("A tela de rastreamento e detalhes de abelhas ainda está em produção!");
}
document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.querySelector('.menu-icon');
    const menu = document.querySelector('.menu');
    menuIcon.addEventListener('click', function () {
        menu.classList.toggle('show');
    });
});


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
