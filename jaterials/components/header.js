import { View } from "../../core/interface/view.js";

export class Header extends View {
    constructor({
        child,
        isStickyHeader = false
    }){
        super();
        this.child = child;
        this.isStickyHeader = isStickyHeader;
    }

    styledView(element){
        if(this.isStickyHeader) element.style.position = "sticky";
        element.style.top = "0";

        element.style.zIndex = 999;

        return element;
    }

    build(){
        return this.child;
    }
}
