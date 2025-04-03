import { WebkitCSS } from "../../cssKit/webkitCSS.js";
import { View } from "../../core/interface/view.js";
import { BaseCSS } from "../../cssKit/baseCSS.js";

export class Box extends View {
    constructor({
        width = "0px", 
        height = "0px",
        background = null,
        baseCSS = new BaseCSS(),
        webkitCSS = new WebkitCSS(),
        child = null
    }){
        super({
            width, 
            height,
            background,
            baseCSS,
            webkitCSS,
            child
        });
    }


    styledView(element){
        element.style.width = this.props.width;
        element.style.height = this.props.height;

        if(this.props.background) element.style.background = this.props.background;

        element = this.props.baseCSS.applyCSS(element);
        element = this.props.webkitCSS.applyCSS(element);

        return element;
    }

    build(){
        return this.props.child;
    }
}
