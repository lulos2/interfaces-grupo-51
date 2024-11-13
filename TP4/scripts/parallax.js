
class ObserverParallax {
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

    applyParallaxInTop(scrollTop) {
        this.element.style.transform = `translateY(${scrollTop * this.parallaxFactor}px)`;
    }

    applyParallaxEffect(scrollTop) {
        if (this.isVisible && this.scrollStart !== null) {
            const scrollDiff = scrollTop - this.scrollStart;
            this.element.style.transform = `translateY(${scrollDiff * this.parallaxFactor}px)`;
        }
    }

    applyParallaxEfectMouse(mousePositionX, mousePositionY) {
        if (this.isVisible) {
            if (this.isMouseOver) {
                this.element.style.transform = `translate(${(mousePositionX * this.parallaxFactor) -70}px,${mousePositionY * this.parallaxFactor}px)`;
                this.element.style.transition = 'transform 0.1s';
            }
        }
    }

    resetPosition() {
        this.element.style.transform = '';
    }
}

let observerTreeLeft = new ObserverParallax(document.querySelector('.tree-left'), -0.05);
let observerTreeRight1 = new ObserverParallax(document.querySelector('.tree-right-1'), -0.05);
let observerTreeRight2 = new ObserverParallax(document.querySelector('.tree-right-2'), -0.05);
let observerStoneLeft = new ObserverParallax(document.querySelector('.stone-left'), -0.07);
let observerStoneRight1 = new ObserverParallax(document.querySelector('.stone-right-1'), -0.05);
let observerStoneRight2 = new ObserverParallax(document.querySelector('.stone-right-2'), -0.09);
let observerStoneRight3 = new ObserverParallax(document.querySelector('.stone-right-3'), -0.1);
let observerBushLeft1 = new ObserverParallax(document.querySelector('.bush-left-1'), -0.04);
let observerBushLeft2 = new ObserverParallax(document.querySelector('.bush-left-2'), -0.13);
let observerBushRight1 = new ObserverParallax(document.querySelector('.bush-right-1'), -0.05);
let observerBushRight2 = new ObserverParallax(document.querySelector('.bush-right-2'), -0.1);
let observerFigure1 = new ObserverParallax(document.querySelector('.figure-1'), -0.09);
let observerFigure2 = new ObserverParallax(document.querySelector('.figure-2'), -0.12);
let observerFigure3 = new ObserverParallax(document.querySelector('.figure-3'), -0.1);
let observerSection2Figure3 = new ObserverParallax(document.querySelector('.section-2 .figure-3'), -0.1);

let observerSection1Figures = new ObserverParallax(document.querySelector('.section-1 .figures-123459'), 0.1);

document.addEventListener('mousemove', (e) => {
    let mousePositionX = e.clientX ;
    let mousePositionY = e.clientY ;
    observerSection1Figures.applyParallaxEfectMouse(mousePositionX, mousePositionY);
});

document.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    observerTreeLeft.applyParallaxInTop(scrollTop);
    observerTreeRight2.applyParallaxInTop(scrollTop);
    observerTreeRight1.applyParallaxInTop(scrollTop);
    observerBushRight2.applyParallaxInTop(scrollTop);
    observerBushRight1.applyParallaxInTop(scrollTop);
    observerBushLeft2.applyParallaxInTop(scrollTop);
    observerBushLeft1.applyParallaxInTop(scrollTop);
    observerStoneRight3.applyParallaxInTop(scrollTop);
    observerStoneRight2.applyParallaxInTop(scrollTop);
    observerStoneRight1.applyParallaxInTop(scrollTop);
    observerStoneLeft.applyParallaxInTop(scrollTop);
    observerFigure1.applyParallaxInTop(scrollTop);
    observerFigure2.applyParallaxInTop(scrollTop);
    observerFigure3.applyParallaxInTop(scrollTop);

    observerSection2Figure3.applyParallaxEffect(scrollTop);
});
