import { BaseCSS } from "../../cssKit/baseCSS.js";
import { View } from "../../core/interface/view.js";
import { Center } from "./center.js";
import { Hover } from "./hover.js";
import { Padding } from "./padding.js";

export class ElevatedButton extends View {
    constructor({
        child,
        radius = "inherit",
        baseCSS = new BaseCSS(),
        onClick: onClick = () => {},
    }){
        super();
        this.child = child;
        this.radius = radius;
        this.baseCSS = baseCSS;
        this.onClick = onClick;
    }

    styledView(element){
        element.style.padding = "0px";
        
        element.style.borderRadius = this.radius;
        element = this.baseCSS.applyCSS(element);
        
        return element;
    }

    embedScriptToView(element){
        element.addEventListener("click", this.onClick);
        
        return element;
    }

    build(){
        return new Center(
            new Hover({
                radius: this.radius,
                onClickEffect: true,
                child: new Padding({
                    all: this.baseCSS.padding ?? "initial",
                    child: new _ElevatedButton({
                        child: this.child,
                        baseCSS: this.baseCSS,
                        onClick: this.onClick
                    })
                })
            })
        );
    }
}

class _ElevatedButton extends View {
    constructor({
        child,
        baseCSS,
        onClick: onClick = () => {},
    }){
        super();
        this.child = child;
        this.baseCSS = baseCSS;
        this.onClick = onClick;
    }

    styledView(element){
        element.style.borderRadius = "inherit";
        element.style.width = this.baseCSS.width;
        element.style.height = this.baseCSS.height;
        
        return element;
    }

    build(){
        return this.child;
    }
}
