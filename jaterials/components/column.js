import { BaseCSS } from "../../cssKit/baseCSS.js";
import { View } from "../../core/interface/view.js";

export class Column extends View {
    constructor({
        children: children,
        baseCSS = new BaseCSS(),
        isHorizontalCenter = false
    }){
        super();
        this.children = children;
        this.baseCSS = baseCSS;
        this.isHorizontalCenter = isHorizontalCenter;
    }

    styledView(element){
        element.style.display = "flex";
        element.style.flexDirection = "column";

        if(this.isHorizontalCenter) element.style.alignItems = "center";

        element = this.baseCSS.applyCSS(element);

        return element; 
    }

    build(){
        return this.children;
    }
}
