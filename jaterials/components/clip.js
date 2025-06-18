import { BaseCSS } from "../../cssKit/baseCSS.js";
import { View } from "../../core/interface/view.js";

export class Clip extends View {
    constructor({
        child, 
        baseCSS = new BaseCSS()
    }){
        super();
        this.child = child;
        this.baseCSS = baseCSS;
    }

    styledView(element){
        element = this.baseCSS.applyCSS(element);

        element.style.overflow = "hidden";

        return element;
    }

    build(){
        return this.child;
    }
}
