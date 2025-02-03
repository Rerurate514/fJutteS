import { BaseCSS } from "../enums/baseCSS.js";
import { View } from "../interface/view.js";
import { Hover } from "./hover.js";

export class ElevatedButton extends View {
    constructor({
        child,
        baseCSS = new BaseCSS(),
        onClick: onClick = () => {},
    }){
        super({
            child: child,
            baseCSS: baseCSS,
            onClick: onClick
        });
    }

    createWrapView(){
        return document.createElement("div");
    }

    styledView(element){
        return element;
    }

    embedScriptToView(element){
        element.addEventListener("click", this.props.onClick);

        return element;
    }

    build(){
        return new Hover({
            child: new _ElevatedButton(this.props)
        })
    }
}

export class _ElevatedButton extends View {
    constructor({
        child,
        baseCSS = new BaseCSS(),
        onClick: onClick = () => {},
    }){
        super({
            child: child,
            baseCSS: baseCSS,
            onClick: onClick
        });
    }

    createWrapView(){
        return document.createElement("div");
    }

    styledView(element){
        element.style.paddingLeft = "14px";
        element.style.paddingRight = "14px";

        element = this.props.baseCSS.applyCSS(element);
        return element;
    }

    embedScriptToView(element){
        return element;
    }

    build(){
        return this.props.child;
    }
}
