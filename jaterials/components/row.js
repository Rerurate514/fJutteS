import { BaseCSS } from "../../cssKit/baseCSS.js";
import { View } from "../../core/interface/view.js";

export class Row extends View {
    constructor({
        children,
        baseCSS = new BaseCSS(),
        isAlignCenter = false, 
        isJustifySpaceAround = false,
        isJustifySpaceBetween = false,
        isVerticalCenter = false
    }){
        super();
        this.children = children;
        this.baseCSS = baseCSS;
        this.isAlignCenter = isAlignCenter;
        this.isJustifySpaceAround = isJustifySpaceAround;
        this.isJustifySpaceBetween = isJustifySpaceBetween;
        this.isVerticalCenter = isVerticalCenter;
    }

    styledView(element){
        element.className = "row-container";
        element.style.display = "flex";

        if(this.isAlignCenter) element.style.justifyContent = "center";
        if(this.isJustifySpaceAround) element.style.justifyContent = "space-around";
        if(this.isJustifySpaceBetween) element.style.justifyContent = "space-between";
        if(this.isVerticalCenter) element.style.alignItems = "center";

        element = this.baseCSS.applyCSS(element);

        return element;
    }

    build(){
        return this.children;
    }
}
