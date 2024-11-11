
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

passwordInput.addEventListener('input', function () {
    passwordRules.style.display = 'none'; // Oculta el popup al empezar a escribir
});


const passwordRegisterInput = document.getElementById("passwordRegisterInput");
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const rePasswordInput = document.getElementById("rePasswordInput");

usernameInput.addEventListener('input', function () {
    if (usernameInput.value.trim() === "") {
        usernameInput.classList.add("input-error"); // Si está vacío, agrega clase de error
        usernameInput.classList.remove("input-valid"); // Elimina la clase válida
    } else {
        usernameInput.classList.remove("input-error"); // Si no está vacío, quita el error
        usernameInput.classList.add("input-valid"); // Agrega la clase válida
    }
});

usernameInput.addEventListener('input', function () {
    if (usernameInput.value.trim() === "") {
        usernameInput.classList.add("input-error"); // Si está vacío, agrega clase de error
        usernameInput.classList.remove("input-valid"); // Elimina la clase válida
    } else {
        usernameInput.classList.remove("input-error"); // Si no está vacío, quita el error
        usernameInput.classList.add("input-valid"); // Agrega la clase válida
    }
});

passwordRegisterInput.addEventListener('input', function () {
    if (passwordRegisterInput.value.trim() === "") {
        passwordRegisterInput.classList.add("input-error"); // Si está vacío, agrega clase de error
        passwordRegisterInput.classList.remove("input-valid"); // Elimina la clase válida
    } else {
        passwordRegisterInput.classList.remove("input-error"); // Si no está vacío, quita el error
        passwordRegisterInput.classList.add("input-valid"); // Agrega la clase válida
    }
});

nameInput.addEventListener('input', function () {
    if (nameInput.value.trim() === "") {
        nameInput.classList.add("input-error"); // Si está vacío, agrega clase de error
        nameInput.classList.remove("input-valid"); // Elimina la clase válida
    } else {
        nameInput.classList.remove("input-error"); // Si no está vacío, quita el error
        nameInput.classList.add("input-valid"); // Agrega la clase válida
    }
});

emailInput.addEventListener('input', function () {
    if (emailInput.value.trim() === "") {
        emailInput.classList.add("input-error"); // Si está vacío, agrega clase de error
        emailInput.classList.remove("input-valid"); // Elimina la clase válida
    } else {
        emailInput.classList.remove("input-error"); // Si no está vacío, quita el error
        emailInput.classList.add("input-valid"); // Agrega la clase válida
    }
});

rePasswordInput.addEventListener('input', function () {
    if (rePasswordInput.value.trim() === "") {
        rePasswordInput.classList.add("input-error"); // Si está vacío, agrega clase de error
        rePasswordInput.classList.remove("input-valid"); // Elimina la clase válida
    } else {
        rePasswordInput.classList.remove("input-error"); // Si no está vacío, quita el error
        rePasswordInput.classList.add("input-valid"); // Agrega la clase válida
    }
});
