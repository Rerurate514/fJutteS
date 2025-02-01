import { View } from "../interface/view.js";

export class Position extends View {
    constructor({
        child, 
        top = 0, 
        left = 0
    }){
        super({child: child, top: top, left: left});
    }

    createWrapView(){
        let posWrapper = document.createElement("div");
        return posWrapper;
    }

    styledView(element){
        element.className = "pos-wrapper";
        element.style.width = "100%";
        element.style.height = "100%"

        return element;
    }

    build(){
        return new _PositionChild({
            child: this.props.child,
            top: this.props.top,
            left: this.props.left
        })
    }
}

class _PositionChild extends View {
    constructor({child, top = 0, left = 0}){
        super({child: child, top: top, left: left});
    }

    createWrapView(){
        let pos = document.createElement("div");
        return pos;
    }

    styledView(element){
        element.className = "pos-wrapper";
        element.style.width = "100%";
        element.style.height = "100%"

        element.style.position = "relative";

        element.className = "pos";
        element.style.top = this.props.top + "px";
        element.style.left = this.props.left + "px";

        return element;
    }

    build(){
        return this.props.child;
    }
}
