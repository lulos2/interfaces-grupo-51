//--------------------------------------------LOADER---------------------------------------------
window.addEventListener("load", function() {

    //<----------------------------------CAIDA DE NÚMEROS-------------------------------------->
    // Diferentes colores que toman los números
    const colors = ['#FA0504', '#F4E806', '#4AEC02', '#FF9728', '#E62F9B', '#30E3F9', '#5528B7', '#DC4D83']

    // Seleccion random de color
    function getRandomColor() {
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    }

    // Traemos los números del HTML
    const numbers = document.querySelectorAll(".number");

    numbers.forEach((number, index) => {
        // Asignamos una posición aleatoria para cada número
        const randomX = Math.floor(Math.random() * window.innerWidth); // Posición en x
        const delay = index * 70; // Tiempo de caida entre cada número

        // Establecemos la posicion y el tiempo de caida
        number.style.left = `${randomX}px`;
        number.style.animationDelay = `${delay}ms`;

        // Asignamos el color
        number.style.color = getRandomColor();

        // Agregamos la clase para la animación de caída
        number.classList.add("falling-number");
    });



    //------------------------------------CÍRCULO DE CARGA--------------------------------------
    // Progreso inicializado en 0%
    let progress = 0;
    const progressText = document.getElementById('loading-percentage');

    // Incremento del porcentaje hasta llegar a 100
    const progressInterval = setInterval(() => {
        if (progress < 100) {
            progress += 1;
            progressText.textContent = `${progress}%`; // Muestra el porcentaje actualizado
        } else {
            clearInterval(progressInterval); // Al llegar a 100 detenemos la carga
            document.body.classList.add("loaded");
        }
    }, 50); // Incrementamos porcentaje cada 0.05 segundos




    //--------------------------------CAIDA DE FIGURAS-----------------------------------------
    //Seleccionamos las imagenes a utilizar
    const images = [
        'assets/images/figures/0.png',
        'assets/images/figures/1.png',
        'assets/images/figures/2.png',
        'assets/images/figures/3.png',
        'assets/images/figures/4.png',
        'assets/images/figures/5.png',
        'assets/images/figures/6.png',
        'assets/images/figures/7.png',
        'assets/images/figures/8.png',
        'assets/images/figures/9.png'
    ];

    // Traemos el div
    const loader = document.getElementById('loader');
    const totalImages = 1000; // Pactamos cantidad de imagenes a utilizar

    // Hasta completar el total de imagenes
    for (let i = 0; i < totalImages; i++) {
        const randomImage = images[Math.floor(Math.random() * images.length)]; // Seleccionamos una aleatoria
        const floatingImage = document.createElement('div');
        floatingImage.classList.add('floating-image');
        floatingImage.style.backgroundImage = `url(${randomImage})`; // Creamos un div y establecemos como fondo a la imagen ya seleccionada

        // Asignamos una posicion aleatoria en la pantalla
        const randomX = Math.floor(Math.random() * 100); // Posicion en x
        floatingImage.style.left = `${randomX}vw`;

        // Seleccionamos el delay entre imagen e imagen
        floatingImage.style.animationDelay = `${i * 0.08}s`;

        // Aplicamos nuestro nuevo div floatingImage en nuestro div loader
        loader.appendChild(floatingImage);
    }
});

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


const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const menuItems = document.querySelectorAll('.nav-menu li');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  hamburger.classList.toggle('cross');
  navMenu.classList.toggle('open');

  
  // Aplicar delay a los ítems del menú
  menuItems.forEach((item, index) => {
    item.style.setProperty('--i', index + 1);
  });
});