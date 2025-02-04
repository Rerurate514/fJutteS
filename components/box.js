import { View } from "../interface/view.js";
import { Border } from "../models/border.js";

export class Box extends View {
    constructor({
        width = "0px", 
        height = "0px",
        border = new Border(),
        child = null
    }){
        super({
            width: width, 
            height: height, 
            border: border,
            child: child
        });
    }

    createWrapView(){
        return document.createElement("div");
    }

    styledView(element){
        element.style.width = this.props.width;
        element.style.height = this.props.height;

        element = this._styleBorder(element);

        return element;
    }

    _styleBorder(element){
        let border = this.props.border;
        if(border.isTop){
            element.style.borderTop = border.assembleCSS();
        }
        if(border.isLeft){
            element.style.borderLeft= border.assembleCSS();
        }
        if(border.isRight){
            element.style.borderRight = border.assembleCSS();
        }
        if(border.isBottom){
            element.style.borderBottom = border.assembleCSS();
        }

        return element;
    }

    build(){
        return this.props.child;
    }
}
