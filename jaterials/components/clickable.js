import { BaseCSS } from "../../cssKit/baseCSS.js";
import { View } from "../../core/interface/view.js";

export class Clickable extends View {
    constructor({
        child,
        baseCSS = new BaseCSS(),
        onClick: onClick = () => {},
    }){
        super();
        this.child = child;
        this.baseCSS = baseCSS;
        this.onClick = onClick;
    }

    styledView(element){
        element = this.baseCSS.applyCSS(element);
        return element;
    }

    embedScriptToView(element){
        element.addEventListener("click", this.onClick);

        return element;
    }

    build(){
        return this.child;
    }
}
