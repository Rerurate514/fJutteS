import { View } from "../interface/view.js";

export class Stack extends View {
    constructor({
        children: children
    }){
        super({children: children});
    }    

    createWrapView(){
        return document.createElement("div");
    }
    
    styledView(element){
        element.style.position = "relative";
        return element;
    }

    preBuild(){
        this.props.children.forEach(com => {
            com.view.style.position = "absolute";
        });
    }

    build(){
        return this.props.children;
    }
}
