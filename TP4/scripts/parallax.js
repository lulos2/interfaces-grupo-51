
class ElementParallax {
    constructor(element, parallaxFactor) {
        this.element = element;
        this.parallaxFactor = parallaxFactor;
        this.isVisible = false;
        this.isMouseOver = false;
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

    applyParallaxEffectMouse(mousePositionX, mousePositionY) {
        if (this.isVisible) {
            if (this.isMouseOver) {
                this.element.style.transform = `translate(${(mousePositionX * this.parallaxFactor) +31}px,${(mousePositionY * this.parallaxFactor)+70}px)`;
                this.element.style.transition = 'transform 0.1s';
            }
        }
    }

}

const parallaxConfig = [
    { selector: '.tree-left', multiplier: -0.05, offset: 0 },
    { selector: '.tree-right-1', multiplier: -0.05, offset: 0 },
    { selector: '.tree-right-2', multiplier: -0.05, offset: 0 },
    { selector: '.stone-left', multiplier: -0.07, offset: 0 },
    { selector: '.stone-right-1', multiplier: -0.05, offset: 0 },
    { selector: '.stone-right-2', multiplier: -0.09, offset: 0 },
    { selector: '.stone-right-3', multiplier: -0.1, offset: 0 },
    { selector: '.bush-left-1', multiplier: -0.04, offset: 0 },
    { selector: '.bush-left-2', multiplier: -0.13, offset: 0 },
    { selector: '.bush-right-1', multiplier: -0.05, offset: 0 },
    { selector: '.bush-right-2', multiplier: -0.1, offset: 0 },
    { selector: '.figure-1', multiplier: -0.26, offset: 0 },
    { selector: '.figure-2', multiplier: -0.30, offset: 0 },
    { selector: '.figure-3', multiplier: -0.28, offset: 0 },
    { selector: '.section-1 .shade-1', multiplier: 0.06, offset: 0 },
    { selector: '.section-1 .shade-2', multiplier: 0.04, offset: 0 },
    { selector: '.section-1 .shade-3', multiplier: 0.02, offset: 0 },
    { selector: '.section-1 .figures-123459', multiplier: -0.1, isMouseSensitive: true },
    { selector: '.la-app-mas-divertida', multiplier: -0.1, offset: 500 },
    { selector: '.la-app-mas-divertida-desc', multiplier: -0.1, offset: 530 },
    { selector: '.section-1 .figure-5', multiplier: 0.05, offset: 800 },
    { selector: '.section-1 .figure-4', multiplier: -0.01, offset: 700 },
    { selector: '.section-1 .carousel', multiplier: 0.02, offset: 1000 },
    { selector: '.section-2 .figure-3', multiplier: -0.6, offset: 12000 }
];

const parallaxElements = [];

document.addEventListener('DOMContentLoaded', () => {
    parallaxConfig.forEach(({ selector, multiplier, offset, isMouseSensitive }) => {
        const element = document.querySelector(selector);
        if (element) {
            const instance = new ElementParallax(element, multiplier);
            parallaxElements.push({ instance, offset, isMouseSensitive });
        } else {
            console.warn(`Elemento no encontrado para el selector: ${selector}`);
        }
    });
});

document.addEventListener('mousemove', (e) => {
    const { clientX: mouseX, clientY: mouseY } = e;
    parallaxElements.forEach(({ instance, isMouseSensitive }) => {
        if (isMouseSensitive) {
            instance.applyParallaxEffectMouse(mouseX, mouseY);
        }
    });
});

document.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    parallaxElements.forEach(({ instance, offset, isMouseSensitive }) => {
        if (!isMouseSensitive) {
            instance.applyParallaxWithCorrection(scrollTop, offset || 0);
        }
    });
});