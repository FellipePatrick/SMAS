const url = new URLSearchParams(window.location.search);
const email = url.get('email');

//Procura os dados do usuário com aquele email
const getUser = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    for(let indice in users){
        if(email == users[indice].email){
            const alertsUser = upadeteAlerts(users[indice]);
            return {user: users[indice], users: users, alertsUser : alertsUser.alertsUser, alerts: alertsUser.alerts};
        }
    }
    return {user: null, users:null};
}

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

//Plota na tela os alertas daquele usuário
const getAlerts = () => {
    const alerts = getUser().alerts;
    const alertsUser = getUser().alertsUser;
    const section = document.getElementById('section');
    let cont = 1;
    for(let alert in alertsUser){
        const a = document.createElement('p');
        a.innerHTML = alertsUser[alert].alerts;
        const data = document.createElement('p');
        data.innerHTML = alertsUser[alert].data;
        const timer = document.createElement('p');
        timer.innerHTML =  alertsUser[alert].timer;
        const btn = document.createElement('input');
        btn.type = 'button';
        btn.value = 'excluir';
        btn.id = cont;
        btn.onclick = () => {
            deleteAlert(btn.id, alerts, alertsUser);
        }
        const editar = document.createElement('input');
        editar.type = 'button';
        editar.value = 'editar';
        editar.id = cont;
        editar.onclick = () => {
            updateAlert(a, editar ,alerts, alertsUser, editar.id);
        }
        section.appendChild(a);
        section.appendChild(data);
        section.appendChild(timer);
        section.append(btn);
        section.appendChild(editar);
        cont++;
    }
}

//Permite alterar o alerta já publicado
const updateAlert = (a, editar, alerts, alertsUser, id) => {
    a.contentEditable = "true";
    a.style.backgroundColor = "green";
    editar.value = "enviar";
    //salvar os dados
    editar.onclick = () => {
        for(let alert in alerts){
            if(email == alerts[alert].email){
                if(JSON.stringify(alertsUser[id-1]) === JSON.stringify(alerts[alert])){
                    if(alerts[alert].alerts != a.innerHTML){
                        const date = new Date();
                        const data =  date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
                        const timer = date.getHours() +  ":" + date.getMinutes();
                        alerts[alert].alerts = a.innerHTML;
                        alerts[alert].data = data;
                        alerts[alert].timer = timer;
                        localStorage.setItem('alerts', JSON.stringify(alerts));
                        location.reload();
                    }
                    break;
                }
            }
        }
    }
}

//Deleta um determinado alerta
const deleteAlert = (id, alerts, alertsUser) => {
    for(let alert in alerts){
        if(email == alerts[alert].email){
            if(JSON.stringify(alertsUser[id-1]) === JSON.stringify(alerts[alert])){
                alerts[alert].email = null;
                localStorage.setItem('alerts', JSON.stringify(alerts));
                location.reload();
                break;
            }
        }
    }
}

//Apenas para mostrar na tela
const user = getUser().user;
const email_dom =  document.getElementById('email');
email_dom.innerHTML = "email: " + user.email;
const name = document.getElementById('name');
name.innerHTML = "nome: " +  user.name;
const city = document.getElementById('municipality');
city.innerHTML = "municipio: " + user.city;
const password = document.getElementById('password');
password.innerHTML = "senha:"  + user.password;
const img = document.getElementById('img');
img.src = user.path;
img.style.width = '200px';
let urlImg = '';
getAlerts();

const updateImageUser = () => {
    //Pega o arquivo vindo do input
    const uploadImage = document.getElementById('uploadImage');
    //Verifica se tem arquivo no input
    if(uploadImage.files.length  > 0){
        //Busca o banco e o usuário
        const resultado = getUser();
        const users = resultado.users;
        const file = uploadImage.files[0];
        const leitor = new FileReader();
        leitor.onload = (e) => {
            //Pega o obejto user
            const user = resultado.user;
            //Pega a url da imagem e guarda no objeto
            user.path = e.target.result;
            getAlerts();
            //Update no banco
            localStorage.setItem('users', JSON.stringify(users));
            //Mostrando na tela a imagem
            img.src = user.path;
            location.reload();
        };
        
        leitor.readAsDataURL(file);
    }
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


