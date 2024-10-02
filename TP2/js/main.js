// Definición de rutas
const ROUTES = {
    HOME: 'index.html',
    LOGIN_REGISTER: 'login-register.html',
    GAME: 'gamePage.html'
};

// Función de navegación
function navigateTo(route) {
    window.location.href = route;
}

// Función de inicialización
function init() {
    // Configurar event listeners
    document.getElementById("logo")?.addEventListener("click", () => navigateTo(ROUTES.HOME));
    document.getElementById("loginButton")?.addEventListener("click", () => navigateTo(ROUTES.LOGIN_REGISTER));
    document.querySelector('.hamburger-button')?.addEventListener('click', deployMenu);
    document.querySelectorAll(".card").forEach((e)=>{e.addEventListener("click",()=>{navigateTo(ROUTES.GAME)})})
    document.querySelectorAll(".gallery-card").forEach((e)=>{e.addEventListener("click",()=>{navigateTo(ROUTES.GAME)})})
    window.addEventListener('click', handleWindowClick);


    // Actualizar migas de pan basado en la ruta actual
    updateBreadcrumbs(getCurrentRoute());
}

// Obtener la ruta actual
function getCurrentRoute() {
    const path = window.location.pathname;
    return Object.values(ROUTES).find(route => path.endsWith(route)) || ROUTES.HOME;
}

// Actualización de migas de pan
function updateBreadcrumbs(actualRoute) {
    const breadCrumb = document.getElementById("breadcrumbs");
    if (!breadCrumb) return;

    const breadcrumbItems = Array.from(breadCrumb.querySelectorAll("li"));
    const index = breadcrumbItems.findIndex((item) => item.textContent === actualRoute);

    if (index === -1) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.textContent = actualRoute;
        li.appendChild(a);
        breadCrumb.appendChild(li);
    } else {
        breadcrumbItems.slice(index + 1).forEach(item => item.remove());
    }
}

// Despliegue del menú
function deployMenu() {
    document.getElementById("myDropdown")?.classList.toggle("show");
}

// Manejo de clics en la ventana
function handleWindowClick(event) {
    if (!event.target.matches('.hamburger-button')) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        Array.from(dropdowns).forEach(dropdown => {
            if (dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
            }
        });
    }
}

document.querySelector(".arrow-left").addEventListener('click', (e) => {
    let carousel = e.target.parentElement.nextElementSibling.firstElementChild.nextElementSibling;
    let minX = 0;
    let maxX = (carousel.querySelectorAll(".card").length * 400) - 1400;

    if (!carousel.dataset.scroll) {
        carousel.dataset.scroll = 0;
    }

    let currentScroll = Number(carousel.dataset.scroll);
    if (isNaN(currentScroll)) {
        currentScroll = 0;
    }

    let newScrollValue = Math.max(currentScroll - 400, minX);
    carousel.style.transition = `1s ease`;
    carousel.style.transform = `translateX(-${newScrollValue}px)`;
    carousel.dataset.scroll = newScrollValue;
});

document.querySelector(".arrow-right").addEventListener('click', (e) => {
    let carousel = e.target.parentElement.previousElementSibling.firstElementChild.nextElementSibling;
    let minX = 0;
    let maxX = (carousel.querySelectorAll(".card").length )* 220 - 1400;//limite de scroll 220 es el ancho de la card

    if (!carousel.dataset.scroll) {
        carousel.dataset.scroll = 0;
    }

    let currentScroll = Number(carousel.dataset.scroll);
    if (isNaN(currentScroll)) {
        currentScroll = 0;
    }

    let newScrollValue = Math.min(currentScroll + 400, maxX);
    carousel.style.transition = `1s ease`;
    carousel.style.transform = `translateX(-${newScrollValue}px)`;
    carousel.dataset.scroll = newScrollValue;

    console.log(carousel.dataset.scroll);
    console.log(maxX);
});

// Ejecutar init cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', init);