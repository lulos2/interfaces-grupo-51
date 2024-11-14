
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

document.addEventListener('DOMContentLoaded', () => {
    new StickyScrollSection();
});

