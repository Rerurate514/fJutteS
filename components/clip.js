import { BaseCSS } from "../enums/baseCSS.js";
import { View } from "../interface/view.js";

export class Clip extends View {
    constructor({
        child, 
        baseCSS = new BaseCSS()
    }){
        super({
            child: child,
            baseCSS: baseCSS
        });
    }

    createWrapView(){
        return document.createElement("div");
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
