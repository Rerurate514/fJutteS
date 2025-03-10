import { ProviderScope } from "../jiperes/interface/providerScope.js";
import { Provider } from "../jiperes/provider.js";

export class AppRouter extends ProviderScope {
    constructor({ 
        routes,
        page404,
        homePage,
        startPageRoute = "",
     }) {
        super({
            props: { 
                routes,
                page404,
                homePage,
                startPageRoute,
            },
            watchingProviders: [
                Provider.createProvider(() => window.location.hash.substring(1) || startPageRoute, 'currentPage__AppRouter')
            ],
        });
        
        window.addEventListener('hashchange', () => {
            this.props.providers[0].update(() => window.location.hash.substring(1) || startPageRoute);
        });
    }

    createWrapView() {
        return document.createElement('div');
    }

    build() {
        const currentPage = this.props.providers[0].read();
        const PageComponent = this.props.routes[currentPage];

        if(!currentPage){
            return this.props.homePage;
        }

        if (!PageComponent) {
            return this.props.page404;
        }
        return new PageComponent();
    }
}

export function route(hash){
    window.location.hash = `#${hash}`;
}
