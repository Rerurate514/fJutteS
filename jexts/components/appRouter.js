import { ProviderScope } from "../../jiperes/interface/providerScope.js";
import { Provider } from "../../jiperes/logic/provider.js";

export class AppRouter extends ProviderScope {
    constructor({
        routes,
        page404,
        homePage,
        startPageRoute = "",
    }) {
        super({
            providers: [
                Provider.createProvider(() => window.location.hash.substring(1) || startPageRoute, 'currentPage__AppRouter')
            ],
        });
        this.routes = routes;
        this.page404 = page404;
        this.homePage = homePage;
        this.startPageRoute = startPageRoute;

        window.addEventListener('hashchange', () => {
            this.providers[0].update(() => window.location.hash.substring(1) || startPageRoute);
        });
    }

    build() {
        const currentPage = this.providers[0].read();
        const PageComponent = this.routes[currentPage];

        if (!currentPage) {
            return this.homePage;
        }

        if (!PageComponent) {
            return this.page404;
        }
        return new PageComponent();
    }
}
