import { BaseCSS } from "../enums/baseCSS.js";
import { View } from "../interface/view.js";

export class Image extends View {
    constructor({
        src: src = "",
        alt: alt = "",
        title: title = "",
        baseCSS: baseCSS = new BaseCSS()
    }){
        super({
            src: src,
            alt: alt,
            title: title,
            baseCSS: baseCSS
        });
    }

    createWrapView(){
        let img = document.createElement("img");
        return img;
    }

    styledView(element){
        element = this.props.baseCSS.applyCSS(element);

        element.src = this.props.src;
        element.alt = this.props.alt;
        element.title = this.props.title;

        return element;
    }
}
