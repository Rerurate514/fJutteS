import { View } from "../../core/interface/view.js";
import { Provider } from "../../jiperes/logic/provider.js";
import { LimitedProviderScope } from "../../jiperes/components/limitedProviderScope.js";

export class PageRouter extends View {
    constructor({ pages = [] }) {
        const pageHistoryProvider = Provider.createProvider(() => [0], "pageHistoryProvider__PageRouter");
        const currentPageIndexProvider = Provider.createProvider(() => 0, "currentPageIndexProvider__PageRouter");

        super();
        this.pages = pages;
        this.pageHistoryProvider = pageHistoryProvider;
        this.currentPageIndexProvider = currentPageIndexProvider;
    }

    createWrapView() {
        return document.createElement("div");
    }

    build() {
        if (this.pages.length === 0) return null;

        return new LimitedProviderScope({
            watchingProviders: [this.currentPageIndexProvider],
            build: (index) => {
                return this.pages[index[0]];
            }
        });
    }

    pushPage(pageIndex) {
        this.pageHistoryProvider.update((history) => {
            return [...history, pageIndex];
        });
        this.currentPageIndexProvider.update(() => pageIndex);
    }

    popPage() {
        this.pageHistoryProvider.update((history) => {
            if (history.length > 1) {
                const newHistory = history.slice(0, -1);
                this.currentPageIndexProvider.update(() => newHistory[newHistory.length - 1]);
                return newHistory;
            }
            return history;
        });
    }

    replacePage(pageIndex) {
        this.pageHistoryProvider.update((history) => {
            const newHistory = [...history.slice(0, -1), pageIndex];
            this.currentPageIndexProvider.update(() => pageIndex);
            return newHistory;
        });
    }

    canPop() {
        return this.pageHistoryProvider.read().length > 1;
    }
}
