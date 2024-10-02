window.addEventListener('DOMContentLoaded',function(){changeRoute("login-register")})

document.getElementById("logo").addEventListener("click",()=>{
    fetchFile("home");
    routUrl("home");
});

document.getElementById("loginButton").addEventListener("click",()=>{
    fetchFile("login-register");
    routUrl("login-register");
});

function changeRoute(ruta){
    fetchFile(ruta);
    routUrl(ruta);
}


async function fetchFile(route) {
    let url = window.location.href.includes("/TP2/") ? "html/" + route + ".html" : "/TP2/html/" + route + ".html";
    let promise = await fetch(url);
    let container = document.getElementById("index");
    container.innerHTML = await promise.text();
    container.append(injectionJs(route));
}

function injectionJs(route){
    let script = document.createElement("script");
    script.src = "js/"+route+".js";
    script.async = true;
    return script;
}

function routUrl(ruta){
    let currentURL = window.location.href;
    updateBreadcrumbs(ruta);
    history.pushState({page:ruta+".html"},"index",ruta);
}

window.addEventListener('popstate', function(){
    changeRoute(history.state.page);
    updateBreadcrumbs(history.state.page);

});

function updateBreadcrumbs(actualRoute) {
    let breadCrumb = document.getElementById("breadcrumbs");
    let breadcrumbItems = Array.from(breadCrumb.querySelectorAll("li"));
    let index = breadcrumbItems.findIndex((item) => item.textContent === actualRoute);

    if (index === -1) {
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.innerText = actualRoute;
        li.appendChild(a);
        breadCrumb.appendChild(li);
    } else {
        for (let i = breadcrumbItems.length - 1; i > index; i--) {
            breadCrumb.removeChild(breadcrumbItems[i]);
        }
    }
}

document.querySelector('.hamburger-button').addEventListener('click', deployMenu);

function deployMenu() {
    document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.matches('.hamburger-button')) {
        let dropdowns = document.getElementsByClassName("dropdown-content");
        let i;
        for (i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}