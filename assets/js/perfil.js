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
    window.location.href = "../../index.html";
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
    const tbody = document.getElementById('bodyTable');
    let cont = 1;
    for(let alert in alertsUser){
        const tr = document.createElement('tr');
        tr.id = cont;
        
        const id = document.createElement('td');
        id.innerHTML = cont;

        const tdEditar = document.createElement('td');
        const iconEditar =  document.createElement('i');
        iconEditar.id = cont;
        iconEditar.style.color = 'green';
       
        iconEditar.classList.add('fa-solid', 'fa-pen');

        const tdExcluir = document.createElement('td');
        const iconExcluir = document.createElement('i');
        iconExcluir.id = cont;
        iconExcluir.style.color = 'red';
        iconExcluir.onclick = () => {
            deleteAlert(iconExcluir.id, alerts, alertsUser);
        }
        iconExcluir.classList.add('fa-solid', 'fa-xmark');

        const descricao = document.createElement('td');
        descricao.innerHTML = alertsUser[alert].alerts; 
        
        iconEditar.onclick = () =>{
            editAlert(iconEditar.id, alertsUser[alert].alerts);
        }

        tdEditar.appendChild(iconEditar);
        tdExcluir.appendChild(iconExcluir);

        tr.appendChild(id);
        tr.appendChild(descricao);
        tr.appendChild(tdEditar);
        tr.appendChild(tdExcluir);
        
        tbody.appendChild(tr);
        cont++;
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

const updateUser = () => {
    const user = getUser().user;
    const email_dom =  document.getElementById('email');
    email_dom.value =  user.email;
    const name = document.getElementById('name');
    name.value=   user.name;
    const city = document.getElementById('cidades');
    city.value =  user.city;
    const password = document.getElementById('password');
    password.value =  user.password;
    const img = document.getElementById('img');
    img.src = user.path;
    const img_perfil = document.getElementById('img-perfil');
    img_perfil.src = user.path;
    getAlerts();
}

updateUser();

const updateImageUser = () => {
    //Pega o arquivo vindo do input
    const uploadImage = document.getElementById('uploadImage');
    //Verifica se tem arquivo no input
    if(uploadImage.files.length  > 0){
        const file = uploadImage.files[0];
        const leitor = new FileReader();
        leitor.onload = (e) => {
            path = e.target.result;
            img.src = path;
        };
        
        leitor.readAsDataURL(file);
    }
}

const enviar = () => {
    //Pega o arquivo vindo do input
    const uploadImage = document.getElementById('uploadImage');
    //Verifica se tem arquivo no input
    //Busca o banco e o usuário
    const resultado = getUser();
    const users = resultado.users;
    //Pega o obejto user
    const user = resultado.user;
    if(uploadImage.files.length  > 0){
        const file = uploadImage.files[0];
        const leitor = new FileReader();
        leitor.onload = (e) => {
            //Pega a url da imagem e guarda no objeto
            user.path = e.target.result;
            getAlerts();
            //Mostrando na tela a imagem
            img.src = user.path;
            localStorage.setItem('users', JSON.stringify(users));
            location.reload();
        };
        
        leitor.readAsDataURL(file);
    }
    const name = document.getElementById('name');
    user.name = name.value;
    const city = document.getElementById('cidades');
    user.city = city.value;
    //Update no banco
    localStorage.setItem('users', JSON.stringify(users));
    location.reload();
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

const editAlert = (iconEditar, descricao) => {
    window.location.href = "../routes/updateAlert.html" 
    + "?email=" + encodeURIComponent(email) + "&id=" +  encodeURIComponent(iconEditar)
    + "&descricao=" +  encodeURIComponent(descricao);
}

const sair = () => {
    window.location.href = "../../index.html";
}
