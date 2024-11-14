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

//-------------------------------APARICION DE CARDS CON TEXTO----------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // Agarramos elementos
    const textElements = document.querySelectorAll('.card-text-1, .card-text-2, .card-text-3');
    const imageElements = document.querySelectorAll('.card-image-1, .card-image-2, .card-image-3');

    // Setteamos cantidad del elemento que debe ser visible
    const options = {
        threshold: 0.5 // El 50%
    };

    // Creamos un nuevo IntersectionObserver para que sea posible la animacion
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Al entrar en la vista, agregar la clase visible
                setTimeout(() => {
                    // Sincronizamos la entrada del texto y la de la imagen correspondiente
                    textElements[index].classList.add('visible');
                    imageElements[index].classList.add('visible');
                }, index * 300); // Retraso entre cada subida de elementos
            }
        });
    }, options);

    // Para observar los elementos de texto e imagen juntos
    textElements.forEach((element, index) => observer.observe(element));
    imageElements.forEach((element, index) => observer.observe(element));
});
