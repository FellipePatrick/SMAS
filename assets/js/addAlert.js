class Alert{
    constructor(alert, email,  name, path, data, timer){
        this.alerts = alert;
        this.email = email;
        this.name = name;
        this.path = path;
        this.data = data;
        this.timer = timer;
    }
}

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

updateImg();

const updateScreen = () => {
    const user = getUser().user;
    const name = document.getElementById('name');
    name.value = user.name;
    const municipality = document.getElementById('municipality');
   }


updateScreen();


//Cadstra um alerta
const cadastrar = () => {
    const alerta = document.getElementById('alerta');
    const alerts = JSON.parse(localStorage.getItem('alerts')) || [];
    const user = getUser().user;
    const date = new Date;
    const data =  date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    const timer = date.getHours() +  ":" + date.getMinutes();
    const alert = new Alert(alerta.value,user.email,user.name,user.path, data, timer);
    alerts.push(alert);
    localStorage.setItem('alerts', JSON.stringify(alerts));
    menu();
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
document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.querySelector('.menu-icon');
    const menu = document.querySelector('.menu');
    menuIcon.addEventListener('click', function () {
        menu.classList.toggle('show');
    });
});

  

getMunicipios();

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
