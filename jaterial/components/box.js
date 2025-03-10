import { WebkitCSS } from "../cssKit/webkitCSS.js";
import { View } from "../core/interface/view.js";
import { BorderCSS } from "../cssKit/borderCSS.js";

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
            width, 
            height,
            background,
            borderCSS,
            webkitCSS,
            child
        });
    }

    createWrapView(){
        return document.createElement("div");
    }

    styledView(element){
        element.style.width = this.props.width;
        element.style.height = this.props.height;

        if(this.props.background) element.style.background = this.props.background;

        element = this.props.borderCSS.applyCSS(element);
        element = this.props.webkitCSS.applyCSS(element);

        return element;
    }

    build(){
        return this.props.child;
    }
}
