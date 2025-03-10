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
        super({
            children, 
            baseCSS,
            isAlignCenter, 
            isJustifySpaceAround,
            isJustifySpaceBetween,
            isVerticalCenter
        });
    }

    createWrapView(){
        return document.createElement("div");
    }

    styledView(element){
        element.className = "row-container";
        element.style.display = "flex";

        if(this.props.isAlignCenter) element.style.justifyContent = "center";
        if(this.props.isJustifySpaceAround) element.style.justifyContent = "space-around";
        if(this.props.isJustifySpaceBetween) element.style.justifyContent = "space-between";
        if(this.props.isVerticalCenter) element.style.alignItems = "center";

        element = this.props.baseCSS.applyCSS(element);

        return element;
    }

    build(){
        return this.props.children;
    }
}
