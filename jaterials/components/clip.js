import { BaseCSS } from "../../cssKit/baseCSS.js";
import { View } from "../../core/interface/view.js";

export class Clip extends View {
    constructor({
        child, 
        baseCSS = new BaseCSS()
    }){
        super({
            child,
            baseCSS
        });
    }

    styledView(element){
        element = this.props.baseCSS.applyCSS(element);

        element.style.overflow = "hidden";

        return element;
    }

    build(){
        return this.props.child;
    }
}
