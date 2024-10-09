const ROUTES = {
    HOME: 'index.html',
    LOGIN_REGISTER: 'login-register.html',
    GAME: 'gamePage.html'
};

const CARD_MARGIN = 20;
const CARD_WIDTH = 200 + CARD_MARGIN;
const SUPER_CARD_WIDTH = 350 + CARD_MARGIN;
const SCROLL_AMOUNT = 400;
const VIEWPORT_WIDTH = 1400;

function navigateTo(route) {
    window.location.href = route;
}

function getCurrentRoute() {
    const path = window.location.pathname;
    return Object.values(ROUTES).find(route => path.endsWith(route)) || ROUTES.HOME;
}

function updateBreadcrumbs() {
    const breadCrumb = document.getElementById("breadcrumbs");
    if (!breadCrumb) return;

    breadCrumb.innerHTML = '';

    let homeLi = document.createElement("li");
    let homeA = document.createElement("a");
    homeA.href = ROUTES.HOME;
    homeA.textContent = 'Inicio';
    homeLi.appendChild(homeA);
    breadCrumb.appendChild(homeLi);

    const currentPath = window.location.pathname;

    if (currentPath.endsWith(ROUTES.HOME) || currentPath === '/' || currentPath === '') {
        homeLi.removeChild(homeA);
        homeLi.textContent = 'Inicio';
        homeLi.classList.add('active');
    }
    else if (currentPath.endsWith(ROUTES.GAME)) {
        let gameLi = document.createElement("li");
        gameLi.textContent = "4 en Línea";
        gameLi.classList.add('active');
        breadCrumb.appendChild(gameLi);
    }
}

function deployMenu() {
    document.getElementById("myDropdown")?.classList.toggle("show");
}

function deployProfile() {
    document.getElementById("profile-dropdown").classList.toggle("show-profile");
}

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

function handleGenericCarouselScroll(direction, carouselClass, cardClass, cardWidth) {
    return (e) => {
        const arrow = e.currentTarget;
        const carouselWrapper = direction === 'left'
            ? arrow.nextElementSibling
            : arrow.previousElementSibling;

        if (!carouselWrapper) return;

        const carousel = carouselWrapper.querySelector(`.${carouselClass}`);
        if (!carousel) return;

        const cards = carousel.querySelectorAll(`.${cardClass}`);
        const maxScroll = Math.max(0, cards.length * cardWidth - VIEWPORT_WIDTH);

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

        animateCards(cards);

        updateArrowVisibility(carousel, newScrollValue, maxScroll, carouselClass);
    };
}

function animateCards(cards) {
    cards.forEach(card => {
        card.style.transform = `matrix(1.02,tan(0.01),tan(0.00),0.98,0,0)`;
        card.style.transition = `transform 0.5s ease`;
        setTimeout(() => {
            card.style.transform = `matrix(1,0,0,1,0,0)`;
        }, 500);
    });
}

function updateArrowVisibility(carousel, currentScroll, maxScroll, carouselClass) {
    const container = carousel.closest(`.${carouselClass}-container`);
    if (!container) return;

    const leftArrow = container.querySelector('.arrow-left');
    const rightArrow = container.querySelector('.arrow-right');

    if (leftArrow) leftArrow.style.visibility = currentScroll > 0 ? 'visible' : 'hidden';
    if (rightArrow) rightArrow.style.visibility = currentScroll < maxScroll ? 'visible' : 'hidden';
}

function setupGenericCarouselControls() {
    // Configurar carrusel normal
    document.querySelectorAll(".carousel-container .arrow-left").forEach(arrow => {
        arrow.addEventListener('click', handleGenericCarouselScroll('left', 'carousel', 'card', CARD_WIDTH));
    });
    document.querySelectorAll(".carousel-container .arrow-right").forEach(arrow => {
        arrow.addEventListener('click', handleGenericCarouselScroll('right', 'carousel', 'card', CARD_WIDTH));
    });

    // Configurar super carrusel
    document.querySelectorAll(".super-carousel-container .arrow-left").forEach(arrow => {
        arrow.addEventListener('click', handleGenericCarouselScroll('left', 'super-carousel', 'super-card', SUPER_CARD_WIDTH));
    });
    document.querySelectorAll(".super-carousel-container .arrow-right").forEach(arrow => {
        arrow.addEventListener('click', handleGenericCarouselScroll('right', 'super-carousel', 'super-card', SUPER_CARD_WIDTH));
    });
}

function handleAddToCart(event) {
    const card = event.currentTarget.closest('.card') ? event.currentTarget.closest('.card') : event.currentTarget.closest('.super-card');
    let addedLabel = card.querySelector('.added-label');

    if (!addedLabel) {
        addedLabel = document.createElement('div');
        addedLabel.className = 'added-label';
        addedLabel.textContent = 'En Carrito';
        card.appendChild(addedLabel);
    }

    if (addedLabel.style.display === 'block') {
        addedLabel.style.display = 'none';
    } else {
        addedLabel.style.display = 'block';
    }
}

function init() {
    document.getElementById("logo")?.addEventListener("click", () => navigateTo(ROUTES.HOME));
    document.getElementById("profileButton")?.addEventListener("click", deployProfile);
    document.querySelector('.hamburger-button')?.addEventListener('click', deployMenu);
    document.querySelectorAll(".play-button").forEach((e)=>{
        e.addEventListener("click",()=>{navigateTo(ROUTES.GAME)})})
    window.addEventListener('click', handleWindowClick);
    document.querySelectorAll('.add-to-cart').forEach((button) => {
        button.addEventListener('click', handleAddToCart);
    });
}
document.addEventListener('DOMContentLoaded', setupGenericCarouselControls);
document.addEventListener('DOMContentLoaded', init);


window.addEventListener("load", function() {
    if (getCurrentRoute() === ROUTES.HOME){
        const loader = document.getElementById('loader');
        const percentageText = document.getElementById('loading-percentage');

        let percentage = 0;
        const interval = setInterval(function() {
            percentage += 1;
            percentageText.innerText = percentage + '%';
            if (percentage === 100) {
                clearInterval(interval);
                loader.style.display = 'none';
            }
        }, 30);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    updateBreadcrumbs();
});
