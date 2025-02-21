import { WebkitCSS } from "../enums/webkitCSS.js";
import { View } from "../interface/view.js";
import { BorderCSS } from "../models/borderCSS.js";

export class Box extends View {
    constructor({
        width = "0px", 
        height = "0px",
        background = null,
        borderCSS = new BorderCSS(),
        webkitCSS = new WebkitCSS(),
        child = null
    }){
        super({
            width: width, 
            height: height,
            background: background,
            borderCSS: borderCSS,
            webkitCSS: webkitCSS,
            child: child
        });
    }

    createWrapView(){
        return document.createElement("div");
    }

    styledView(element){
        element.style.width = this.props.width;
        element.style.height = this.props.height;

        if(this.props.background) element.style.background = this.props.background;

        element = this.props.borderCSS.applyCSS(element)
        element = this.props.webkitCSS.applyCSS(element);

        return element;
    }

    build(){
        return this.props.child;
    }
}
