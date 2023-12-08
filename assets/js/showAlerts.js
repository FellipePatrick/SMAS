const url = new URLSearchParams(window.location.search);
const email = url.get('email');


//Plota na tela os alertas
const alerts = JSON.parse(localStorage.getItem('alerts')) || [];
const section = document.getElementById('alertas');
for(let alert in alerts.reverse()){
    if(alerts[alert].email != null){
        const divCard = document.createElement('div');
        divCard.classList.add('card');
        const divLeft = document.createElement('div');
        divLeft.classList.add('left');
        const img = document.createElement('img');
        img.src = alerts[alert].path;
        const aNome =  document.createElement('a');
        aNome.classList.add('bold', 'name');
        aNome.innerHTML =alerts[alert].name;
        const divGroup = document.createElement('div');
        divGroup.classList.add('group-info');
        const divInfoData = document.createElement('div');
        divInfoData.classList.add('info');
        const aData =  document.createElement('a');
        aData.classList.add('bold');
        const TextData = document.createElement('a');
        TextData.innerHTML = " Data: " + '&nbsp';
        const iData = document.createElement('i');
        iData.classList.add('fa-regular', 'fa-calendar');
        aData.append(iData);
        aData.appendChild(TextData);
        const aInfoData = document.createElement('a');
        aInfoData.appendChild(aData);
        aInfoData.innerHTML = alerts[alert].data;
        divInfoData.appendChild(aData);
        divInfoData.appendChild(aInfoData);
        divGroup.appendChild(divInfoData);
        const divInfoHora = document.createElement('div');
        divInfoHora.classList.add('info');
        const aHora =  document.createElement('a');
        aHora.classList.add('bold');
        const Text = document.createElement('a');
        Text.innerHTML = " Data: " + '&nbsp';
        const iHora = document.createElement('i');
        iHora.classList.add('fa-regular', 'fa-clock');
        aHora.append(iHora);
        aHora.appendChild(Text);
        const aInfoH = document.createElement('a');
        aInfoH.appendChild(aHora);
        aInfoH.innerHTML = alerts[alert].timer;
        divInfoHora.appendChild(aHora);
        divInfoHora.appendChild(aInfoH);
        divGroup.appendChild(divInfoHora);
        const divMuni = document.createElement('div');
        divMuni.classList.add('info');
        const aMuni = document.createElement('a');
        aMuni.classList.add('bold');
        const iMuni = document.createElement('i');
        iMuni.classList.add('fa-solid', 'fa-map-pin');
        aMuni.appendChild(iMuni);
        const aNomeMuni = document.createElement('a');
        aNomeMuni.innerHTML = " Municipio: ";
        aMuni.appendChild(aNomeMuni);
        const aLocalMuni = document.createElement('a');
        aLocalMuni.innerHTML = "&nbsp" + alerts[alert].municipality;   
        divMuni.appendChild(aMuni);
        divMuni.appendChild(aLocalMuni);
        divGroup.appendChild(divMuni);
        const divEspecie = document.createElement('div');
        divEspecie.classList.add('info');
        const aEspecie = document.createElement('a');
        aEspecie.classList.add('bold');
        const iEspecie = document.createElement('i');
        iEspecie.classList.add('fa-solid', 'fa-bug');
        aEspecie.appendChild(iEspecie);
        const aNomeEspecie = document.createElement('a');
        aNomeEspecie.innerHTML = " Especie: ";
        aEspecie.appendChild(aNomeEspecie);
        const aEspecieT = document.createElement('a');
        aEspecieT.innerHTML = "&nbsp" + alerts[alert].bee; 
        divEspecie.appendChild(aEspecie);
        divEspecie.appendChild(aEspecieT);
        divGroup.appendChild(divEspecie);
        const divRight = document.createElement('div');
        divRight.classList.add('right');
        const descricao = document.createElement('p');
        descricao.innerHTML = alerts[alert].alerts;
        divRight.appendChild(descricao);
        divLeft.appendChild(img);
        divLeft.appendChild(aNome);
        divLeft.appendChild(divGroup);
        divCard.appendChild(divLeft);
        divCard.appendChild(divRight);
        section.appendChild(divCard);
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
    window.location.href = "../../index.html";
}

const updateImg = () => {
    const user = getUser().user;
    const img_perfil = document.getElementById('img-perfil');
    img_perfil.src = user.path;
}

document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.querySelector('.menu-icon');
    const menu = document.querySelector('.menu');
    menuIcon.addEventListener('click', function () {
        menu.classList.toggle('show');
    });
});



updateImg();

const link_alerta = document.getElementById('link_alerta');

link_alerta.onclick = () => {
    alertar();
}

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