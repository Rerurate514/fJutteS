import { BaseCSS } from "../../cssKit/baseCSS.js";
import { View } from "../../core/interface/view.js";
import { Center } from "./center.js";
import { Hover } from "./hover.js";

export class ElevatedButton extends View {
    constructor({
        child,
        radius = "inherit",
        baseCSS = new BaseCSS(),
        onClick: onClick = () => {},
    }){
        super({
            child,
            radius,
            baseCSS,
            onClick
        });
    }

    createWrapView(){
        return document.createElement("div");
    }

    styledView(element){
        element.style.borderRadius = this.props.radius;
        element = this.props.baseCSS.applyCSS(element);
        
        return element;
    }

    embedScriptToView(element){
        element.addEventListener("click", this.props.onClick);
        
        return element;
    }

    build(){
        return new Center(
            new Hover({
                radius: this.props.radius,
                onClickEffect: true,
                child: new _ElevatedButton(this.props)
            })
        );
    }
}

class _ElevatedButton extends View {
    constructor({
        child,
        onClick: onClick = () => {},
    }){
        super({
            child: child,
            onClick: onClick
        });
    }

    createWrapView(){
        return document.createElement("div");
    }

    styledView(element){
        element.style.borderRadius = "inherit";
        return element;
    }

    embedScriptToView(element){
        return element;
    }

    build(){
        return this.props.child;
    }
}
