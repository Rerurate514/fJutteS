import { BaseCSS } from "../enums/baseCSS";
import { View } from "../interface/view";

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
