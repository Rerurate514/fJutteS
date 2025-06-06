import { View } from "../../core/interface/view.js";

export class Position extends View {
    constructor({
        child, 
        top = 0, 
        left = 0
    }){
        super({
            child,
            top, 
            left
        });
    }

    styledView(element){
        element.className = "pos-wrapper";
        element.style.width = "100%";
        element.style.height = "100%";

        return element;
    }

    build(){
        return new _PositionChild({
            child: this.props.child,
            top: this.props.top,
            left: this.props.left
        });
    }
}

class _PositionChild extends View {
    constructor({child, top = 0, left = 0}){
        super({
            child, 
            top, 
            left
        });
    }

    styledView(element){
        element.className = "pos-wrapper";
        element.style.width = "100%";
        element.style.height = "100%";

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
