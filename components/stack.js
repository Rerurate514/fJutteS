import { View } from "../interface/view.js";

export class Stack extends View {
    constructor(children){
        super({children: children});
    }    

    createWrapView(){
        let stack = document.createElement("div");
        return stack;
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
