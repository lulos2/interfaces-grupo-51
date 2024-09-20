
let loginButton = document.getElementById("login");
let registerButton = document.getElementById("register");

document.querySelectorAll("button").forEach(b => {b.addEventListener("click",function(e){
    e.preventDefault();
});})

loginButton.addEventListener("click",()=>{
    changeRoute("home")
});

registerButton.addEventListener("click",()=>{
    changeRoute("home")
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