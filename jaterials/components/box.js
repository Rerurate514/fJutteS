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
        super();
        this.width = width;
        this.height = height;
        this.background = background;
        this.baseCSS = baseCSS;
        this.webkitCSS = webkitCSS;
        this.child = child;
    }


    styledView(element){
        element.style.width = this.width;
        element.style.height = this.height;

        if(this.background) element.style.background = this.background;

        element = this.baseCSS.applyCSS(element);
        element = this.webkitCSS.applyCSS(element);

        return element;
    }

    build(){
        return this.child;
    }
}
