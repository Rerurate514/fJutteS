import { View } from "../../core/interface/view.js";

export class Grid extends View {
    constructor({
        children,
        minmaxPX,
        fraction = 1,
        gap = "0px"
    }){
        super();
        this.children = children;
        this.minmaxPX = minmaxPX;
        this.fraction = fraction;
        this.gap = gap;
    }

    styledView(element){
        element.style.display = "grid";
        element.style.gridTemplateColumns = "repeat(auto-fit, minmax(" + this.minmaxPX + "px, " + this.fraction + "fr))";
        element.style.gap = this.gap;

        return element;
    }

    build(){
        return this.children;
    }
}
