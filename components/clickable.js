import { BaseCSS } from "../enums/baseCSS.js";
import { View } from "../interface/view.js";

export class Clickable extends View {
    constructor({
        child,
        baseCSS = new BaseCSS(),
        onClick: onClick = () => {},
    }){
        super({
            child,
            baseCSS,
            onClick
        });
    }

    createWrapView(){
        return document.createElement("div");
    }

    styledView(element){
        element = this.props.baseCSS.applyCSS(element);
        return element;
    }

    embedScriptToView(element){
        element.addEventListener("click", this.props.onClick);

        return element;
    }

    build(){
        return this.props.child;
    }
}
