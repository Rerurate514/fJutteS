import { View } from "../../core/interface/view.js";

export class Position extends View {
    constructor({
        child, 
        top = 0, 
        left = 0
    }){
        super();
        this.child = child;
        this.top = top;
        this.left = left;
    }

    styledView(element){
        element.className = "pos-wrapper";
        element.style.width = "100%";
        element.style.height = "100%";

        return element;
    }

    build(){
        return new _PositionChild({
            child: this.child,
            top: this.top,
            left: this.left
        });
    }
}

class _PositionChild extends View {
    constructor({child, top = 0, left = 0}){
        super();
        this.child = child;
        this.top = top;
        this.left = left;
    }

    styledView(element){
        element.className = "pos-wrapper";
        element.style.width = "100%";
        element.style.height = "100%";

        element.style.position = "relative";

        element.className = "pos";
        element.style.top = this.top + "px";
        element.style.left = this.left + "px";

        return element;
    }

    build(){
        return this.child;
    }
}
