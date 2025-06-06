import { View } from "../../core/interface/view.js";

export class Header extends View {
    constructor({
        child,
        isStickyHeader = false
    }){
        super({
            child: child,
            isStickyHeader: isStickyHeader
        });
    }

    styledView(element){
        if(this.props.isStickyHeader) element.style.position = "sticky";
        element.style.top = "0";

        element.style.zIndex = 999;

        return element;
    }

    build(){
        return this.props.child;
    }
}
