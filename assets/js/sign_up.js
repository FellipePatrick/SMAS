class User{//Criando um objeto user
    constructor(email, name, city, password){
        this.email = email;
        this.name = name;
        this.city = city;
        this.password = password;
        this.path = "../img/user.jpeg";
    }
}

const flagFirst = true;

const boxWarning = document.getElementById('boxWarning');
boxWarning.style.display = 'none';

const boxWarningPassword = document.getElementById('boxWarningPassword');
boxWarningPassword.style.display = 'none';


const closeWarning = () => {
    boxWarning.style.display = 'none';
    boxWarningPassword.style.display = 'none';
}


const insert = () => {
    const email = document.getElementById('email');
    const name = document.getElementById('name');
    const municipality = document.getElementById('municipality');
    if(name.value != "" && email.value != "" && municipality.value != ""){
        const users = JSON.parse(localStorage.getItem('users')) || [];
        let flag = true;
        for(let indice in users){
            if(email.value == users[indice].email){//email já cadastrado
                flag = false;
                break;
            }
        }
        if(flag){
            const login_form = document.getElementById('login-form');
            const login_password = document.getElementById('login-password');
            login_form.style.display = "none";
            login_password.style.display = "block";
        }else{
            boxWarning.style.display = 'flex';
            boxWarning.style.backgroundColor = '#f1aeb5';
            const p = document.getElementById('pWarning');
            p.innerHTML = "Email já cadastrado no sistema!";
            p.style.color = "#dc3545";
        }
    }else{
        boxWarning.style.display = 'flex';
        boxWarning.style.backgroundColor = '#f1aeb5';
        const p = document.getElementById('pWarning');
        p.innerHTML = "Preencha todos os campos!";
        p.style.color = "#dc3545";
    }
}

const insert_password = () => {
    const password = document.getElementById('password');
    const repeatpassword = document.getElementById('repeatpassword');
    if(password.value == repeatpassword.value){
        const email = document.getElementById('email');
        const name = document.getElementById('name');
        const municipality = document.getElementById('municipality');
        const warning = document.getElementById('warning')
        register(email,name, municipality, password, warning);
    }else{
        boxWarningPassword.style.display = 'flex';
        boxWarningPassword.style.backgroundColor = '#f1aeb5';
        const p = document.getElementById('pWarningS');
        p.innerHTML = "Senhas dissemelhante!";
        p.style.color = "#dc3545";
    }
}


const register = (email, name, municipality, password, warning) => {
    //Criando objeto com os dados vindo do HTML
    const user = new User(email.value, name.value, municipality.value, password.value);
    //Recebendo os dados do local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    let flag = true;
    for(let indice in users){
        if(email.value == users[indice].email){//email já cadastrado
            flag = false;
            break;
        }
    }

    if(flag){
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        boxWarningPassword.style.display = 'flex';
        boxWarningPassword.style.backgroundColor = '#a3cfbb';
        const p = document.getElementById('pWarningS');
        p.innerHTML = "Usuario cadastrado!";
        p.style.color = "#0f5132";
        voltar();
    }
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



//Voltando para a tela de login
const voltar = () => {
    window.location.href = "../../index.html";
}

