
class ElementParallax {
    constructor(element, parallaxFactor) {
        this.element = element;
        this.parallaxFactor = parallaxFactor;
        this.isVisible = false;
        this.isMouseOver = false;
        this.scrollStart = null;
        this.initialPosition = {
            x: element.offsetLeft,
            y: element.offsetTop
        };
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

        this.element.addEventListener('mouseenter', () => {
            this.isMouseOver = true;
        });

        this.element.addEventListener('mouseleave', () => {
            this.isMouseOver = false;
            this.element.style.transform = '';
        });
    }

    applyParallaxWithCorrection(scrollTop, pxCorrection) {
        this.element.style.transform = `translateY(${(scrollTop - pxCorrection) * this.parallaxFactor}px)`;
    }

    applyParallaxEfectMouse(mousePositionX, mousePositionY) {
        if (this.isVisible) {
            if (this.isMouseOver) {
                this.element.style.transform = `translate(${(mousePositionX * this.parallaxFactor) -70}px,${mousePositionY * this.parallaxFactor}px)`;
                this.element.style.transition = 'transform 0.1s';
            }
        }
    }

}

let observerTreeLeft = new ElementParallax(document.querySelector('.tree-left'), -0.05);
let observerTreeRight1 = new ElementParallax(document.querySelector('.tree-right-1'), -0.05);
let observerTreeRight2 = new ElementParallax(document.querySelector('.tree-right-2'), -0.05);
let observerStoneLeft = new ElementParallax(document.querySelector('.stone-left'), -0.07);
let observerStoneRight1 = new ElementParallax(document.querySelector('.stone-right-1'), -0.05);
let observerStoneRight2 = new ElementParallax(document.querySelector('.stone-right-2'), -0.09);
let observerStoneRight3 = new ElementParallax(document.querySelector('.stone-right-3'), -0.1);
let observerBushLeft1 = new ElementParallax(document.querySelector('.bush-left-1'), -0.04);
let observerBushLeft2 = new ElementParallax(document.querySelector('.bush-left-2'), -0.13);
let observerBushRight1 = new ElementParallax(document.querySelector('.bush-right-1'), -0.05);
let observerBushRight2 = new ElementParallax(document.querySelector('.bush-right-2'), -0.1);
let observerSection1Figure1 = new ElementParallax(document.querySelector('.figure-1'), -0.17);
let observerSection1Figure2 = new ElementParallax(document.querySelector('.figure-2'), -0.22);
let observerSection1Figure3 = new ElementParallax(document.querySelector('.figure-3'), -0.2);
let observerSection1Figures = new ElementParallax(document.querySelector('.section-1 .figures-123459'), 0.1);

let laAppMasDivertidaH1 = new ElementParallax(document.querySelector('.la-app-mas-divertida'), -0.1);
let laAppMasDivertidaDesc = new ElementParallax(document.querySelector('.la-app-mas-divertida-desc'), -0.1);
let section1Figure5 = new ElementParallax(document.querySelector('.section-1 .figure-5'), 0.05);
let section1Figure4 = new ElementParallax(document.querySelector('.section-1 .figure-4'), -0.01);
let section1Carousel = new ElementParallax(document.querySelector('.section-1 .carousel'), 0.02);

let observerSection2Figure3 = new ElementParallax(document.querySelector('.section-2 .figure-3'), -0.6);


document.addEventListener('mousemove', (e) => {
    let mousePositionX = e.clientX ;
    let mousePositionY = e.clientY ;
    observerSection1Figures.applyParallaxEfectMouse(mousePositionX, mousePositionY);
});

document.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    observerTreeLeft.applyParallaxWithCorrection(scrollTop,0);
    observerTreeRight2.applyParallaxWithCorrection(scrollTop,0);
    observerTreeRight1.applyParallaxWithCorrection(scrollTop,0);
    observerBushRight2.applyParallaxWithCorrection(scrollTop,0);
    observerBushRight1.applyParallaxWithCorrection(scrollTop,0);
    observerBushLeft2.applyParallaxWithCorrection(scrollTop,0);
    observerBushLeft1.applyParallaxWithCorrection(scrollTop,0);
    observerStoneRight3.applyParallaxWithCorrection(scrollTop,0);
    observerStoneRight2.applyParallaxWithCorrection(scrollTop,0);
    observerStoneRight1.applyParallaxWithCorrection(scrollTop,0);
    observerStoneLeft.applyParallaxWithCorrection(scrollTop,0);
    observerSection1Figure1.applyParallaxWithCorrection(scrollTop,0);
    observerSection1Figure2.applyParallaxWithCorrection(scrollTop,0);
    observerSection1Figure3.applyParallaxWithCorrection(scrollTop,0);

    laAppMasDivertidaH1.applyParallaxWithCorrection(scrollTop, 500);
    laAppMasDivertidaDesc.applyParallaxWithCorrection(scrollTop, 530);
    section1Figure4.applyParallaxWithCorrection(scrollTop, 700);
    section1Figure5.applyParallaxWithCorrection(scrollTop, 800);
    section1Carousel.applyParallaxWithCorrection(scrollTop, 1000);

    observerSection2Figure3.applyParallaxWithCorrection(scrollTop,12000);
});
