const url = new URLSearchParams(window.location.search);
const email = url.get('email');


//Plota na tela os alertas
const alerts = JSON.parse(localStorage.getItem('alerts')) || [];
const section = document.getElementById('alertas');
for(let alert in alerts){
    if(alerts[alert].email != null){
        const divCard = document.createElement('div');
        divCard.classList.add('card');

        const divLeft = document.createElement('div');
        divLeft.classList.add('left');

        const img = document.createElement('img');
        img.src = alerts[alert].path;
        const aNome =  document.createElement('a');
        aNome.classList.add('bold', 'name');
        aNome.innerHTML = "autor: " + alerts[alert].name;

        const divGroup = document.createElement('div');
        divGroup.classList.add('group-info');

        const divInfoData = document.createElement('div');
        divInfoData.classList.add('info');

        const aData =  document.createElement('a');
        aData.classList.add('bold');
        const TextData = document.createElement('a');
        TextData.innerHTML = " Data: " + '&nbsp';
        const iData = document.createElement('i');
        iData.classList.add('fa-regular', 'fa-clock');
        aData.append(iData);
        aData.appendChild(TextData);
        
        const aInfoData = document.createElement('a');

        aInfoData.appendChild(aData);
        aInfoData.innerHTML = alerts[alert].timer;
        divInfoData.appendChild(aData);
        divInfoData.appendChild(aInfoData);
        divLeft.appendChild(divInfoData);

        const divInfoHora = document.createElement('div');
        divInfoHora.classList.add('info');

        const aHora =  document.createElement('a');
        aHora.classList.add('bold');
        const Text = document.createElement('a');
        Text.innerHTML = " Data: " + '&nbsp';
        const iHora = document.createElement('i');
        iHora.classList.add('fa-regular', 'fa-calendar');
        aHora.append(iHora);
        aHora.appendChild(Text);
        
        const aInfoH = document.createElement('a');
        
        aInfoH.appendChild(aHora);

        aInfoH.innerHTML = alerts[alert].data;

        divInfoHora.appendChild(aHora);
        divInfoHora.appendChild(aInfoH);
        

        divLeft.appendChild(divInfoHora);

        const divRight = document.createElement('div');
        divRight.classList.add('right');

        divCard.appendChild(img);
        divCard.appendChild(aNome);
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