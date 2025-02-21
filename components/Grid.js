import { View } from "fjuttes";

export class Grid extends View {
    constructor({
        children,
        minmaxPX,
        fraction = 1,
        gap = "0px"
    }){
        super({
            children: children,
            minmaxPX: minmaxPX,
            fraction: fraction,
            gap: gap
        });
    }

    createWrapView(){
        return document.createElement("div");
    }

    styledView(element){
        element.style.display = "grid";
        element.style.gridTemplateColumns = "repeat(auto-fit, minmax(" + this.props.minmaxPX + "px, " + this.props.fraction + "fr))";
        element.style.gap = this.props.gap;

        return element;
    }

    build(){
        return this.props.children;
    }
}
