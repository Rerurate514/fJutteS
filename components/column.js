import { BaseCSS } from "../enums/baseCSS.js";
import { View } from "../interface/view.js";

export class Column extends View {
    constructor({
        children: children,
        baseCSS = new BaseCSS(),
        isHorizontalCenter = false
    }){
        super({
            children: children,
            baseCSS: baseCSS,
            isHorizontalCenter: isHorizontalCenter
        });
    }

    createWrapView(){
        return document.createElement("div");
    }

    styledView(element){
        element.style.display = "flex";
        element.style.flexDirection = "column";

        if(this.props.isHorizontalCenter) element.style.alignItems = "center";

        element = this.props.baseCSS.applyCSS(element);

        return element; 
    }

    build(){
        return this.props.children;
    }
}
