
const url = new URLSearchParams(window.location.search);
const email = url.get('email');
const id = url.get('id');
const descricaoUrl = url.get('descricao');


//Procura os dados do usuário com aquele email
const getUser = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    for(let indice in users){
        if(email == users[indice].email){
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

const select = document.getElementById('lista-cidades');


const getMunicipios = () => {
    const apiUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/rn/municipios';
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erro de requisição: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        let cont = 0;
        for(const dado of data){
            const city = document.createElement('option');
            city.value = data[cont]['nome'];
            cont++;
            select.appendChild(city);
        }
      })
      .catch(error => {
        console.error('Erro ao consumir a API:', error);
      });
}
  

getMunicipios();

updateImg();



//Caso o usuário faça alguma alteração em seus dados será necessário atualizar os seus dados nos alertas
const upadeteAlerts = (users) => {
    const alerts = JSON.parse(localStorage.getItem('alerts')) || [];
    const alertsUser = [];
    for(let alert in alerts){
        if(email == alerts[alert].email){
            alerts[alert].path = users.path;
            alertsUser.push(alerts[alert]);
            localStorage.setItem('alerts', JSON.stringify(alerts));
        }
    }
    return {alertsUser, alerts};
}

const updateScreen = () => {
    const user = getUser().user;
    const name = document.getElementById('name');
    name.value = user.name;
    const descricao = document.getElementById('descricao');
    descricao.value = descricaoUrl;
}


updateScreen();

//Permite alterar o alerta já publicado
const updateAlert = () => {
    const alerts = upadeteAlerts(getUser().user).alerts;
    const alertsUser = upadeteAlerts(getUser().user).alertsUser;
    const descricao = document.getElementById('descricao');
    const date = document.getElementById('date');
    //salvar os dados
    for(let alert in alerts){
        if(email == alerts[alert].email){
            if(JSON.stringify(alertsUser[id-1]) === JSON.stringify(alerts[alert])){
                date.value = alertsUser[id-1].data;
                if(alerts[alert].alerts != descricao.value && descricao.value != ""){
                    const date = new Date();
                    const data =  date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
                    const timer = date.getHours() +  ":" + date.getMinutes();
                    alerts[alert].alerts = descricao.value;
                    alerts[alert].data = data;
                    alerts[alert].timer = timer;
                    localStorage.setItem('alerts', JSON.stringify(alerts));
                    window.location.href = "../routes/perfil.html" 
                    + "?email=" + encodeURIComponent(email);
                }
            }
        } 
    }
}
document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.querySelector('.menu-icon');
    const menu = document.querySelector('.menu');
    menuIcon.addEventListener('click', function () {
        menu.classList.toggle('show');
    });
});

updateAlert();

const perfil = () => {
    window.location.href = "../routes/perfil.html" 
    + "?email=" + encodeURIComponent(email);
}
const menu = () => {
    window.location.href = "../routes/showAlerts.html" 
    + "?email=" + encodeURIComponent(email);
}
const alertar = () => {
    window.location.href = "../routes/addAlert.html" 
    + "?email=" + encodeURIComponent(email);
}
const rastreamento  = () => {
    window.location.href = "../routes/rastreamento.html" 
    + "?email=" + encodeURIComponent(email);
}

const sair = () => {
    window.location.href = "../../index.html";
}
