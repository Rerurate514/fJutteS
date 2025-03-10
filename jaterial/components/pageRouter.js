import { View } from "../core/interface/view.js";
import { Provider } from "../jiperes/logic/provider.js";
import { LimitedProviderScope } from "../components/limitedProviderScope.js";

export class PageRouter extends View {
    constructor({ pages = [] }) {
        const pageHistoryProvider = Provider.createProvider(() => [0], "pageHistoryProvider__PageRouter");
        const currentPageIndexProvider = Provider.createProvider(() => 0, "currentPageIndexProvider__PageRouter");

        super({ pages, pageHistoryProvider, currentPageIndexProvider });
    }

    createWrapView() {
        return document.createElement("div");
    }

    build() {
        if (this.props.pages.length === 0) return null;

        return new LimitedProviderScope({
            watchingProviders: [this.props.currentPageIndexProvider],
            build: (index) => {
                return this.props.pages[index[0]];
            }
        });
    }

    pushPage(pageIndex) {
        this.props.pageHistoryProvider.update((history) => {
            return [...history, pageIndex];
        });
        this.props.currentPageIndexProvider.update(() => pageIndex);
    }

    popPage() {
        this.props.pageHistoryProvider.update((history) => {
            if (history.length > 1) {
                const newHistory = history.slice(0, -1);
                this.props.currentPageIndexProvider.update(() => newHistory[newHistory.length - 1]);
                return newHistory;
            }
            return history;
        });
    }

    replacePage(pageIndex) {
        this.props.pageHistoryProvider.update((history) => {
            const newHistory = [...history.slice(0, -1), pageIndex];
            this.props.currentPageIndexProvider.update(() => pageIndex);
            return newHistory;
        });
    }

    canPop() {
        return this.props.pageHistoryProvider.read().length > 1;
    }
}
