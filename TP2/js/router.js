const ROUTES = {
    HOME: 'home',
    LOGIN_REGISTER: 'login-register'
};

function getBaseUrl() {
    return window.location.href.includes("/TP2/") ? "/TP2/" : "/";
}

class Router {
    constructor() {
        this.routes = new Map();
        this.init();
    }

    init() {
        window.addEventListener('popstate', this.handlePopState.bind(this));
        window.addEventListener('DOMContentLoaded', () => this.navigateTo(ROUTES.LOGIN_REGISTER));

        document.getElementById("logo").addEventListener("click", () => this.navigateTo(ROUTES.HOME));
        document.getElementById("loginButton").addEventListener("click", () => this.navigateTo(ROUTES.LOGIN_REGISTER));

        document.querySelector('.hamburger-button').addEventListener('click', this.deployMenu);
        window.onclick = this.handleWindowClick.bind(this);
    }

    addRoute(path, handler) {
        this.routes.set(path, handler);
    }

    async navigateTo(route) {
        const handler = this.routes.get(route);
        if (handler) {
            await handler();
            this.updateUrl(route);
            this.updateBreadcrumbs(route);
            initializeHome();
        } else {
            console.error(`No handler found for route: ${route}`);
        }
    }

    async fetchAndInject(route) {
        const baseUrl = getBaseUrl();
        const url = `${baseUrl}html/${route}.html`;
        const container = document.getElementById("index");

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const html = await response.text();
            container.innerHTML = html;
            this.injectJs(route);
        } catch (error) {
            console.error('Error fetching page:', error);
            container.innerHTML = '<p>Error loading page content.</p>';
        }
    }

    injectJs(route) {
        const script = document.createElement("script");
        script.src = `${getBaseUrl()}js/${route}.js`;
        script.async = true;
        document.body.appendChild(script);
    }

    updateUrl(route) {
        history.pushState({ page: route }, "", route);
    }

    updateBreadcrumbs(actualRoute) {
        const breadCrumb = document.getElementById("breadcrumbs");
        const breadcrumbItems = Array.from(breadCrumb.querySelectorAll("li"));
        const index = breadcrumbItems.findIndex((item) => item.textContent === actualRoute);

        if (index === -1) {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.textContent = actualRoute;
            li.appendChild(a);
            breadCrumb.appendChild(li);
        } else {
            breadcrumbItems.slice(index + 1).forEach(item => item.remove());
        }
    }

    handlePopState(event) {
        if (event.state) {
            this.navigateTo(event.state.page).then(r => console.log('State restored:', event.state));
        }
    }

    deployMenu() {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    handleWindowClick(event) {
        if (!event.target.matches('.hamburger-button')) {
            const dropdowns = document.getElementsByClassName("dropdown-content");
            Array.from(dropdowns).forEach(dropdown => {
                if (dropdown.classList.contains('show')) {
                    dropdown.classList.remove('show');
                }
            });
        }
    }
}

const router = new Router();

router.addRoute(ROUTES.HOME, () => router.fetchAndInject(ROUTES.HOME));
router.addRoute(ROUTES.LOGIN_REGISTER, () => router.fetchAndInject(ROUTES.LOGIN_REGISTER));

