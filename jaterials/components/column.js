import { BaseCSS } from "../../cssKit/baseCSS.js";
import { View } from "../../core/interface/view.js";

export class Column extends View {
    constructor({
        children: children,
        baseCSS = new BaseCSS(),
        isHorizontalCenter = false
    }){
        super({
            children,
            baseCSS,
            isHorizontalCenter
        });
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
