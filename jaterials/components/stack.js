import { BaseCSS } from "../../cssKit/baseCSS.js";
import { View } from "../../core/interface/view.js";

export class Stack extends View {
    constructor({
        children,
        baseCSS = new BaseCSS()
    }){
        super({
            children,
            baseCSS
        });
    }
    
    styledView(element){
        element.style.position = "relative";

        element = this.props.baseCSS.applyCSS(element);

        return element;
    }

    preBuild(){
        this.props.children.forEach(com => {
            com.view.style.position = "absolute";
        });
    }

    build(){
        return this.props.children;
    }
}
