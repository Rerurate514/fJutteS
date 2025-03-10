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
        super({
            src,
            alt,
            title,
            baseCSS,
            webkitCSS
        });
    }

    createWrapView(){
        return document.createElement("img");
    }

    styledView(element){
        element = this.props.baseCSS.applyCSS(element);
        element = this.props.webkitCSS.applyCSS(element);

        element.src = this.props.src;
        element.alt = this.props.alt;
        element.title = this.props.title;

        return element;
    }
}
