import { View } from "../interface/view.js";

export class ElevatedButton extends View {
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
        let button = document.createElement("button");
        return button;
    }

    embedScriptToView(element){
        element.addEventListener("click", this.props.onClick);
        return element;
    }

    build(){
        return this.props.child;
    }
}
