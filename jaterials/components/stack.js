import { BaseCSS } from "../../cssKit/baseCSS.js";
import { View } from "../../core/interface/view.js";

export class Stack extends View {
    constructor({
        children,
        baseCSS = new BaseCSS()
    }){
        super();
        this.children = children;
        this.baseCSS = baseCSS;
    }
    
    styledView(element){
        element.style.position = "relative";

        element = this.baseCSS.applyCSS(element);

        return element;
    }

    preBuild(){
        this.children.forEach(com => {
            com.view.style.position = "absolute";
        });
    }

    build(){
        return this.children;
    }
}
