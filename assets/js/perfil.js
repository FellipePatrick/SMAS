const url = new URLSearchParams(window.location.search);
const email = url.get('email');

//Procura os dados do usuário com aquele email
const getUser = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    for(let indice in users){
        if(email == users[indice].email){
           // const alertsUser = upadeteAlerts(users[indice]);
            return {user: users[indice], users: users};
        }
    }
    return {user: null, users:null};
}


const updatePerfil = () => {
    const user = getUser().user;
    const email_dom =  document.getElementById('email');
    email_dom.placeholder = user.email;
    const name = document.getElementById('name');
    name.placeholder =  user.name;
    const city = document.getElementById('municipality');
    city.placeholder = user.city;
    const password = document.getElementById('password');
    password.placeholder = user.password;
    const img = document.getElementById('img');
    img.src = user.path;
    const img_perfil = document.getElementById('img-perfil');
    img_perfil.src = user.path;
    let urlImg = '';
}

updatePerfil();

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
           // getAlerts();
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
