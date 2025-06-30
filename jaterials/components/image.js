import { BaseCSS } from "../../cssKit/baseCSS.js";
import { WebkitCSS } from "../../cssKit/webkitCSS.js";
import { View } from "../../core/interface/view.js";

export class Image extends View {
    constructor({
        src: src = "",
        alt: alt = "",
        title: title = "",
        baseCSS: baseCSS = new BaseCSS(),
        webkitCSS: webkitCSS = new WebkitCSS()
    }){
        super();
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.baseCSS = baseCSS;
        this.webkitCSS = webkitCSS;
    }

    createWrapView(){
        return document.createElement("img");
    }

    styledView(element){
        element = this.baseCSS.applyCSS(element);
        element = this.webkitCSS.applyCSS(element);

        element.src = this.src;
        element.alt = this.alt;
        element.title = this.title;

        return element;
    }
}
