
let loginButton = document.getElementById("login");
let registerButton = document.getElementById("register");

document.querySelectorAll("button").forEach(b => {b.addEventListener("click",function(e){
    e.preventDefault();
});})

loginButton.addEventListener("click",()=>{
    navigateTo(ROUTES.HOME);
});

registerButton.addEventListener("click",()=>{
    navigateTo(ROUTES.HOME);
});

document.getElementById("showRegisterForm").addEventListener("click", (e)=>{
    document.querySelector("#loginForm").classList.add("d-none")
    document.querySelector("#loginForm").classList.remove("d-flex")
    document.querySelector("#registerForm").classList.remove("d-none")
    document.querySelector("#registerForm").classList.add("d-flex")
});

document.getElementById("showLoginForm").addEventListener("click", (e)=>{
    document.querySelector("#loginForm").classList.remove("d-none")
    document.querySelector("#loginForm").classList.add("d-flex")
    document.querySelector("#registerForm").classList.remove("d-flex")
    document.querySelector("#registerForm").classList.add("d-none")
});

const usernameInput = document.getElementById('usernameInput');
const usernameTick = document.getElementById('usernameTick');

usernameInput.addEventListener('input', function () {
    if (usernameInput.value.trim() !== '') {
        usernameTick.classList.remove('d-none'); // Mostrar tick
    } else {
        usernameTick.classList.add('d-none'); // Ocultar tick si está vacío
    }
});

const passwordInput = document.getElementById('passwordInput');
const passwordRules = document.getElementById('passwordRules');

// Mostrar las reglas al hacer foco en el campo de contraseña
passwordInput.addEventListener('focus', function () {
    passwordRules.style.display = "block"; // Muestra el popup
});

// Ocultar las reglas al perder el foco
passwordInput.addEventListener('blur', function () {
    passwordRules.style.display = "none"; // Oculta el popup
});