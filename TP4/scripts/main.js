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

class ObserverParallax {
    constructor(element, parallaxFactor) {
        this.element = element;
        this.parallaxFactor = parallaxFactor;
        this.isVisible = false;
        this.scrollStart = null;


        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.isVisible = true;
                    this.scrollStart = window.scrollY;
                } else {
                    this.isVisible = false;
                }
            });
        });

        this.observer.observe(this.element);
    }

    applyParallaxEffect(scrollTop) {
        if (this.isVisible && this.scrollStart !== null) {
            const scrollDiff = scrollTop - this.scrollStart;
            this.element.style.transform = `translateY(${scrollDiff * this.parallaxFactor}px)`;
        }
    }
}

class InitialParallax {
    constructor(element, parallaxFactor) {
        this.element = element;
        this.parallaxFactor = parallaxFactor;
    }

    applyParallaxEffect(scrollTop) {
        this.element.style.transform = `translateY(${scrollTop * this.parallaxFactor}px)`;
    }
}

let observerTreeLeft = new InitialParallax(document.querySelector('.tree-left'), -0.05);
let observerTreeRight1 = new InitialParallax(document.querySelector('.tree-right-1'), -0.05);
let observerTreeRight2 = new InitialParallax(document.querySelector('.tree-right-2'), -0.05);
let observerStoneLeft = new InitialParallax(document.querySelector('.stone-left'), -0.07);
let observerStoneRight1 = new InitialParallax(document.querySelector('.stone-right-1'), -0.05);
let observerStoneRight2 = new InitialParallax(document.querySelector('.stone-right-2'), -0.09);
let observerStoneRight3 = new InitialParallax(document.querySelector('.stone-right-3'), -0.1);
let observerBushLeft1 = new InitialParallax(document.querySelector('.bush-left-1'), -0.04);
let observerBushLeft2 = new InitialParallax(document.querySelector('.bush-left-2'), -0.13);
let observerBushRight1 = new InitialParallax(document.querySelector('.bush-right-1'), -0.05);
let observerBushRight2 = new InitialParallax(document.querySelector('.bush-right-2'), -0.1);
let observerFigure1 = new InitialParallax(document.querySelector('.figure-1'), -0.09);
let observerFigure2 = new InitialParallax(document.querySelector('.figure-2'), -0.12);
let observerFigure3 = new InitialParallax(document.querySelector('.figure-3'), -0.1);
let observerSection2Figure3 = new ObserverParallax(document.querySelector('.section-2 .figure-3'), -0.1);


document.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    observerTreeLeft.applyParallaxEffect(scrollTop);
    observerTreeRight2.applyParallaxEffect(scrollTop);
    observerTreeRight1.applyParallaxEffect(scrollTop);
    observerBushRight2.applyParallaxEffect(scrollTop);
    observerBushRight1.applyParallaxEffect(scrollTop);
    observerBushLeft2.applyParallaxEffect(scrollTop);
    observerBushLeft1.applyParallaxEffect(scrollTop);
    observerStoneRight3.applyParallaxEffect(scrollTop);
    observerStoneRight2.applyParallaxEffect(scrollTop);
    observerStoneRight1.applyParallaxEffect(scrollTop);
    observerStoneLeft.applyParallaxEffect(scrollTop);
    observerFigure1.applyParallaxEffect(scrollTop);
    observerFigure2.applyParallaxEffect(scrollTop);
    observerFigure3.applyParallaxEffect(scrollTop);
    observerSection2Figure3.applyParallaxEffect(scrollTop);
});
