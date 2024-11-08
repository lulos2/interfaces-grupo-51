function handleScroll() {
    const navbar = document.querySelector('.navbar');
    const navLogo = document.querySelector('.nav-logo');
    const heroLogo = document.querySelector('.logo');
    const scrollPosition = window.scrollY;

    if (scrollPosition > 70) {
        navbar.classList.add('scrolled');
        navLogo.classList.add('visible');
        heroLogo.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
        navLogo.classList.remove('visible');
        heroLogo.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleScroll);

document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.querySelector('.carousel');
    const images = [
        '../TP4/assets/images/carousel/default.png',
        '../TP4/assets/images/carousel/img.png',
        '../TP4/assets/images/carousel/img_1.png',
        '../TP4/assets/images/carousel/img_2.png'
    ];
    let currentIndex = 0;
    const interval = 3000; // Cambiar cada 3 segundos

    function loadImage(index) {
        carouselContainer.style.backgroundImage = `url('${images[index]}')`;
    }
    // llama a la funcion cada 3 segundos
    setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        loadImage(currentIndex);
    }, interval);
});