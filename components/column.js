import { View } from "../interface/view.js";

export class Column extends View {
    constructor(children){
        super({children: children});
    }

    createWrapView(){
        let col = document.createElement("div");
        return col;
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
