import { View } from "../interface/view.js";

export class Column extends View {
    constructor({
        children: children
    }){
        super({children: children});
    }

    createWrapView(){
        return document.createElement("div");
    }

    styledView(element){
        element.style.display = "flex";
        element.style.flexDirection = "column";
        return element; 
    }

    build(){
        return this.props.children;
    }
}
