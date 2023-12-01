class User{//Criando um objeto user
    constructor(email, name, city, password){
        this.email = email;
        this.name = name;
        this.city = city;
        this.password = password;
        this.path = "../img/user.jpeg";
    }
}

const insert = () => {
    const login_form = document.getElementById('login-form');
    const login_password = document.getElementById('login-password');
    login_form.style.display = "none";
    login_password.style.display = "block";
}

const insert_password = () => {
    const email = document.getElementById('email');
    const name = document.getElementById('name');
    const municipality = document.getElementById('municipality');
    const warning = document.getElementById('warning')
    const password = document.getElementById('password')
    register(email,name, municipality, password, warning);
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
        warning.innerHTML = "usuario cadastrado";
        warning.style.color = "green";
        voltar();
    }else{
        warning.innerHTML = "email já foi cadastrado";
        warning.style.color = "red";
    }
}

//Voltando para a tela de login
const voltar = () => {
    window.location.href = "../../index.html";
}

