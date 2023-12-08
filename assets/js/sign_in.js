const boxWarning = document.getElementById('boxWarning');
boxWarning.style.display = 'none';

const autenticar = (email, password, warning) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    let flag = true;
    for(let indice in users){
        if(email.value == users[indice].email){
            if(password.value == users[indice].password){//acesso liberado
                flag = false;
                break;
            }
        }
    }    
    if(flag){
        boxWarning.style.display = 'flex';
        boxWarning.style.backgroundColor = '#f1aeb5';
        const p = document.getElementById('pWarning');
        p.style.color = "#dc3545";
        p.innerHTML = "Email ou senha inavlidos!";
    }else{//passando o email por url
        window.location.href="./assets/routes/showAlerts.html" 
        + "?email=" + encodeURIComponent(email.value);
    }
}


const closeWarning = () => {
    const warning = document.getElementById('boxWarning');
    warning.style.display = 'none';
}



const forms_login = document.getElementById('forms_login');

const entrar = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const warning = document.getElementById('warning');
    autenticar(email,password, warning);
}

//Altera para tela de ccadastro
const cadastrar = () => {
    window.location.href = "../assets/routes/sign_up.html";
}

