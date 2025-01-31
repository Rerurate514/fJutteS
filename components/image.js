import { View } from "../interface/view.js";

export class Image extends View {
    constructor({
        width = "auto", 
        height = "auto", 
        src: src = "",
        alt: alt = "",
        title: title = ""
    }){
        super({
            width: width, 
            height: height, 
            src: src,
            alt: alt,
            title: title
        });
    }

    createWrapView(){
        let img = document.createElement("img");
        return img;
    }

    styledView(element){
        element.style.width = this.props.width;
        element.style.height = this.props.height;

        element.src = this.props.src;
        element.alt = this.props.alt;
        element.title = this.props.title;

        return element;
    }
}
