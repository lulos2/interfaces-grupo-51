class StickyScrollSection {
    constructor() {
        this.items = document.querySelectorAll('.scroll-item');
        this.totalSections = 11;
        this.startOffset = 3800;
        this.sectionHeight = 700;
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
            this.items.forEach(item => {
                this.setItemState(item, 'before');
            });
            return;
        }

        const relativePosition = scrollPosition - this.startOffset;

        this.items.forEach((item, index) => {
            const itemIndex = parseInt(item.dataset.scrollIndex || index);
            const sectionStart = itemIndex * this.sectionHeight;
            const sectionEnd = sectionStart + this.sectionHeight;

            if (relativePosition < sectionStart) {
                this.setItemState(item, 'before');
            } else if (relativePosition >= sectionStart && relativePosition < sectionEnd) {
                this.setItemState(item, 'active');
            } else {
                this.setItemState(item, 'after');
            }
        });

        if (relativePosition >= this.totalSections * this.sectionHeight) {
            this.items.forEach(item => {
                this.setItemState(item, 'before');
            });
        }
    }

    setItemState(item, state) {
        item.classList.remove('after', 'active', 'before');
        item.classList.add(state);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new StickyScrollSection();
});

