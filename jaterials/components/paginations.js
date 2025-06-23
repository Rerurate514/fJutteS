import { BaseCSS } from "../../cssKit/baseCSS.js";
import { View } from "../../core/interface/view.js";
import { Provider } from "../../jiperes/logic/provider.js";
import { LimitedProviderScope } from "../../jiperes/components/limitedProviderScope.js";

export class Paginations extends View {
    constructor({ 
        totalPages,
        currentPageIndex = 1,
        onPageChange = () => { },
        itemStyle = new BaseCSS()
    }) {
        const currentPageProvider = Provider.createProvider(() => 
            currentPageIndex, "currentPage"
        );
        
        super();
        this.totalPages = totalPages;
        this.currentPageProvider = currentPageProvider;
        this.onPageChange = onPageChange;
        this.itemStyle = itemStyle;
    }

    createWrapView() {
        return document.createElement("ul");
    }

    styledView(e) {
        e.style.display = "flex";
        e.style.listStyle = "none";
        e.style.padding = "0";
        return e;
    }

    build() {
        const items = [];
        const maxPagesToShow = 5;

        let startPage = Math.max(1, this.currentPageProvider.read() - 2);
        let endPage = Math.min(this.totalPages, this.currentPageProvider.read() + 2);

        if (endPage - startPage + 1 > maxPagesToShow) {
            if (this.currentPageProvider <= Math.ceil(maxPagesToShow / 2)) {
                endPage = maxPagesToShow;
            } else {
                startPage = endPage - maxPagesToShow + 1;
            }
        }

        items.push(
            new LimitedProviderScope({
                providers: [ this.currentPageProvider ],
                build: (index) => {
                    return new PaginationNavigationItem({ 
                        label: "<", 
                        isActive: index == 1 ? false : true,
                        isAddition: false,
                        currentPageProvider: this.currentPageProvider,
                        itemStyle: this.itemStyle
                    });
                }
            })
        );

        if (startPage > 1) {
            items.push(
                new LimitedProviderScope({
                    providers: [ this.currentPageProvider ],
                    build: () => {
                        return new PaginationItem({ 
                            page: 1, 
                            label: "1", 
                            isActive: false, 
                            onClick: this.onPageChange,
                            currentPageProvider: this.currentPageProvider,
                            itemStyle: this.itemStyle
                        });
                    }
                })
            );
        }

        for (let i = startPage; i <= this.totalPages; i++) {
            const pageNumber = i;
            items.push(
                new LimitedProviderScope({
                    providers: [ this.currentPageProvider ],
                    build: () => {
                        return new PaginationItem({
                            page: pageNumber,
                            label: pageNumber.toString(),
                            isActive: pageNumber === this.currentPageProvider.read(),
                            onClick: this.onPageChange,
                            currentPageProvider: this.currentPageProvider,
                            itemStyle: this.itemStyle
                        });
                    }
                })
            );
        }

        items.push(
            new LimitedProviderScope({
                providers: [ this.currentPageProvider ],
                build: (index) => {
                    return new PaginationNavigationItem({ 
                        label: ">", 
                        isActive: index == this.totalPages ? false : true,
                        isAddition: true,
                        currentPageProvider: this.currentPageProvider,
                        itemStyle: this.itemStyle
                    });
                }
            })
        );

        return items;
    }
}

class PaginationItem extends View {
    constructor({ 
        page, 
        label, 
        isActive, 
        onClick,
        currentPageProvider,
        itemStyle
    }) {
        super({ 
            page, 
            label, 
            isActive, 
            onClick,
            currentPageProvider,
            itemStyle
        });
    }

    createWrapView() {
        return document.createElement("li");
    }

    styledView(element) {
        element.style.margin = "0 5px";
        element.style.padding = "5px 10px";
        element.style.border = "1px solid #ccc";
        element.style.borderRadius = "5px";
        element.style.cursor = "pointer";
        if (this.isActive) {
            element.style.backgroundColor = "#ccc";
        }

        element = this.itemStyle.applyCSS(element);

        element.textContent = this.label;
        
        return element;
    }

    embedScriptToView(e) {
        e.addEventListener("click", () => {
            this.onClick(this.page);

            this.currentPageProvider.update(() => this.page);
        });
        return e;
    }
}


class PaginationNavigationItem extends View {
    constructor({
        label,
        onClick = () => {},
        currentPageProvider,
        isAddition = true,
        isActive = true
    }) {
        super({ 
            label,
            onClick,
            currentPageProvider,
            isAddition,
            isActive
        });
    }

    createWrapView() {
        return document.createElement("li");
    }

    styledView(element) {
        element.style.margin = "0 5px";
        element.style.padding = "5px 10px";
        element.style.border = "1px solid #ccc";
        element.style.borderRadius = "5px";
        element.style.cursor = "pointer";
        if (!this.isActive) {
            element.style.backgroundColor = "#ccc";
        }

        element.textContent = this.label;
        
        return element;
    }

    embedScriptToView(e) {
        e.addEventListener("click", () => {
            if(!this.isActive) return;

            this.onClick(this.page);

            this.currentPageProvider.update((index) => {
                if(this.isAddition){
                    return ++index;
                }
                else{
                    return --index;
                }
            });
        });
        return e;
    }
}
