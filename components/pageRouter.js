import { View } from "../interface/view.js";
import { Provider } from "../jiperes/provider.js";
import { LimitedProviderScope } from "../components/limitedProviderScope.js";

export class PageRouter extends View {
    constructor({
        pages = [],
        onMoveNextPage = () => {},
        onMovePreviousPage = () => {}
    }){
        const pageIndexProvider = Provider.createProvider(() => {
            return 0;
        });

        super({
            pages,
            pageIndexProvider,
            onMoveNextPage,
            onMovePreviousPage
        });
    }

    createWrapView(){
        return document.createElement("div");
    }

    build(){
        if(this.props.pages.isEmpty()) return null;

        return new LimitedProviderScope({
            watchingProviders: [ this.props.pageIndexProvider ],
            build: (index) => {
                return this.props.pages[index];
            }
        });
    }

    moveNextPage(){
        this.props.pageIndexProvider.update((currentIndex) => {
            return currentIndex++;
        });
    }

    movePreviousPage(){
        this.props.pageIndexProvider.update((currentIndex) => {
            return currentIndex--;
        });
    }
}
