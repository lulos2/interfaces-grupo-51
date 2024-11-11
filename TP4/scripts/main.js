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
        '../TP4/assets/images/carousel/carrousel_img.png',
        '../TP4/assets/images/carousel/carrousel_img_1.png',
        '../TP4/assets/images/carousel/carrousel_img_2.png'
    ];
    let currentIndex = 0;
    const interval = 3000;

    function loadImage(index) {
        carouselContainer.style.backgroundImage = `url('${images[index]}')`;
    }
    // llama a la funcion cada 3 segundos
    setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        loadImage(currentIndex);
    }, interval);

    new StickyScrollSection();
});

document.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;

    //document.querySelector('.background-hills').style.transform = `translateY(${scrollTop * 0.05}px)`;
    document.querySelector('.tree-left').style.transform = `translateY(${scrollTop * -0.05}px)`;
    document.querySelector('.tree-right-1').style.transform = `translateY(${scrollTop * -0.05}px)`;
    document.querySelector('.tree-right-2').style.transform = `translateY(${scrollTop * -0.05}px)`;
    document.querySelector('.stone-left').style.transform = `translateY(${scrollTop * -0.07}px)`;
    document.querySelector('.stone-right-1').style.transform = `translateY(${scrollTop * -0.05}px)`;
    document.querySelector('.stone-right-2').style.transform = `translateY(${scrollTop * -0.09}px)`;
    document.querySelector('.stone-right-3').style.transform = `translateY(${scrollTop * -0.1}px)`;
    document.querySelector('.bush-left-1').style.transform = `translateY(${scrollTop * -0.04}px)`;
    document.querySelector('.bush-left-2').style.transform = `translateY(${scrollTop * -0.13}px)`;
    document.querySelector('.bush-right-1').style.transform = `translateY(${scrollTop * -0.05}px)`;
    document.querySelector('.bush-right-2').style.transform = `translateY(${scrollTop * -0.1}px)`;
    document.querySelector('.figure-1').style.transform = `translateY(${scrollTop * -0.09}px)`;
    document.querySelector('.figure-2').style.transform = `translateY(${scrollTop * -0.12}px)`;
    document.querySelector('.figure-3').style.transform = `translateY(${scrollTop * -0.1}px)`;
});

class StickyScrollSection {
    constructor() {
        this.items = document.querySelectorAll('.scroll-item');
        this.totalSections = 11; // Número total de secciones
        this.startOffset = 3800; // Punto de inicio del scroll
        this.sectionHeight = 400; // Altura de cada sección

        this.bindEvents();
        this.updateSection();
    }

    bindEvents() {
        window.addEventListener('scroll', () => {
            requestAnimationFrame(() => {
                this.updateSection();
            });
        });
    }

    updateSection() {
        const scrollPosition = window.scrollY;

        if (scrollPosition < this.startOffset) {
            this.items.forEach(item => item.classList.remove('active'));
            return;
        }

        const relativePosition = scrollPosition - this.startOffset;

        const currentSection = Math.floor(relativePosition / this.sectionHeight);

        if (currentSection >= 0 && currentSection < this.totalSections) {
            this.items.forEach(item => {
                const itemIndex = parseInt(item.dataset.scrollIndex);
                if (itemIndex === currentSection) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        }

        if (currentSection >= this.totalSections) {
            this.items.forEach(item => item.classList.remove('active'));
        }
    }
}
