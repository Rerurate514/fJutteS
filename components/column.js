import { View } from "../interface/view.js";

export class Column extends View {
    constructor({
        children: children,
        isHorizontalCenter = false
    }){
        super({
            children: children,
            isHorizontalCenter: isHorizontalCenter
        });
    }

    createWrapView(){
        return document.createElement("div");
    }

    styledView(element){
        element.style.display = "flex";
        element.style.flexDirection = "column";

        if(this.props.isHorizontalCenter) element.style.alignItems = "center";

        return element; 
    }

    build(){
        return this.props.children;
    }
}
