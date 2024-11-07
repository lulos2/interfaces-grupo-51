function handleScroll() {
    const navbar = document.querySelector('.navbar');
    const navLogo = document.querySelector('.nav-logo');
    const heroLogo = document.querySelector('.logo');
    const scrollPosition = window.scrollY;

    if (scrollPosition > 70) {
        console.log(heroLogo);
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