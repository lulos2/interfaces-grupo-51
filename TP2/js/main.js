// Definición de rutas
const ROUTES = {
    HOME: 'index.html',
    LOGIN_REGISTER: 'login-register.html',
    GAME: 'gamePage.html'
};

// Configuración del carrusel
const CARD_MARGIN = 20;
const CARD_WIDTH = 200 + CARD_MARGIN;
const SUPER_CARD_WIDTH = 350 + CARD_MARGIN;
const SCROLL_AMOUNT = 400;
const VIEWPORT_WIDTH = 1400;

// Función de navegación
function navigateTo(route) {
    window.location.href = route;
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


// Función para manejar el desplazamiento del carrusel
function handleCarouselScroll(direction) {
    return (e) => {
        const arrow = e.currentTarget;
        const carouselWrapper = direction === 'left'
            ? arrow.nextElementSibling
            : arrow.previousElementSibling;

        if (!carouselWrapper) return;

        const carousel = carouselWrapper.querySelector('.carousel');
        if (!carousel) return;

        const cards = carousel.querySelectorAll(".card");
        const maxScroll = Math.max(0, cards.length * CARD_WIDTH - VIEWPORT_WIDTH);

        // Inicializar o recuperar el valor de desplazamiento actual
        let currentScroll = Number(carousel.dataset.scroll || 0);
        if (isNaN(currentScroll)) currentScroll = 0;

        // Calcular el nuevo valor de desplazamiento
        let newScrollValue = direction === 'left'
            ? Math.max(currentScroll - SCROLL_AMOUNT, 0)
            : Math.min(currentScroll + SCROLL_AMOUNT, maxScroll);

        // Aplicar el desplazamiento
        carousel.style.transition = `1s ease`;
        carousel.style.transform = `translateX(-${newScrollValue}px)`;
        carousel.dataset.scroll = newScrollValue;

        // Actualizar visibilidad de las flechas
        updateArrowVisibility(carousel, newScrollValue, maxScroll);
    };
}

// Función para actualizar la visibilidad de las flechas
function updateArrowVisibility(carousel, currentScroll, maxScroll) {
    const container = carousel.closest('.carousel-container');
    if (!container) return;

    const leftArrow = container.querySelector('.arrow-left');
    const rightArrow = container.querySelector('.arrow-right');

    if (leftArrow) leftArrow.style.visibility = currentScroll > 0 ? 'visible' : 'hidden';
    if (rightArrow) rightArrow.style.visibility = currentScroll < maxScroll ? 'visible' : 'hidden';
}

// Configurar los controladores para todas las flechas
function setupCarouselControls() {
    document.querySelectorAll(".arrow-left").forEach(arrow => {
        arrow.addEventListener('click', handleCarouselScroll('left'));
    });

    document.querySelectorAll(".arrow-right").forEach(arrow => {
        arrow.addEventListener('click', handleCarouselScroll('right'));
    });
}



function handleSuperCarouselScroll(direction) {
    return (e) => {
        const arrow = e.currentTarget;
        const carouselWrapper = direction === 'left'
            ? arrow.nextElementSibling
            : arrow.previousElementSibling;

        if (!carouselWrapper) return;

        const carousel = carouselWrapper.querySelector('.super-carousel');
        if (!carousel) return;

        const cards = carousel.querySelectorAll(".super-card");
        const maxScroll = Math.max(0, cards.length * SUPER_CARD_WIDTH - VIEWPORT_WIDTH);

        // Inicializar o recuperar el valor de desplazamiento actual
        let currentScroll = Number(carousel.dataset.scroll || 0);
        if (isNaN(currentScroll)) currentScroll = 0;

        // Calcular el nuevo valor de desplazamiento
        let newScrollValue = direction === 'left'
            ? Math.max(currentScroll - SCROLL_AMOUNT, 0)
            : Math.min(currentScroll + SCROLL_AMOUNT, maxScroll);

        // Aplicar el desplazamiento
        carousel.style.transition = `1s ease`;
        carousel.style.transform = `translateX(-${newScrollValue}px)`;
        carousel.dataset.scroll = newScrollValue;

        // Actualizar visibilidad de las flechas
        updateSuperArrowVisibility(carousel, newScrollValue, maxScroll);
    };
}

// Función para actualizar la visibilidad de las flechas
function updateSuperArrowVisibility(carousel, currentScroll, maxScroll) {
    const container = carousel.closest('.super-carousel-container');
    if (!container) return;

    const leftArrow = container.querySelector('.arrow-left');
    const rightArrow = container.querySelector('.arrow-right');

    if (leftArrow) leftArrow.style.visibility = currentScroll > 0 ? 'visible' : 'hidden';
    if (rightArrow) rightArrow.style.visibility = currentScroll < maxScroll ? 'visible' : 'hidden';
}

// Configurar los controladores para todas las flechas
function setupSuperCarouselControls() {
    document.querySelectorAll(".arrow-left").forEach(arrow => {
        arrow.addEventListener('click', handleSuperCarouselScroll('left'));
    });

    document.querySelectorAll(".arrow-right").forEach(arrow => {
        arrow.addEventListener('click', handleSuperCarouselScroll('right'));
    });
}

function init() {
    document.getElementById("logo")?.addEventListener("click", () => navigateTo(ROUTES.HOME));
    document.getElementById("loginButton")?.addEventListener("click", () => navigateTo(ROUTES.LOGIN_REGISTER));
    document.querySelector('.hamburger-button')?.addEventListener('click', deployMenu);
    document.querySelectorAll(".card").forEach((e)=>{e.addEventListener("click",()=>{navigateTo(ROUTES.GAME)})})
    window.addEventListener('click', handleWindowClick);
    updateBreadcrumbs(getCurrentRoute());
}
document.addEventListener('DOMContentLoaded', setupCarouselControls);
document.addEventListener('DOMContentLoaded', setupSuperCarouselControls);
document.addEventListener('DOMContentLoaded', init);
