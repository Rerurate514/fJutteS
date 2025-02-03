import { View } from "../interface/view.js";

export class Row extends View {
    constructor(
        children, { 
        isAlignCenter = false, 
        isJustifySpaceAround = false
    } = {}){
        super({
            children: children, 
            isAlignCenter: isAlignCenter, 
            isJustifySpaceAround: isJustifySpaceAround
        });
    }

    createWrapView(){
        return document.createElement("div");
    }

    styledView(element){
        element.className = "row-container";
        element.style.display = "flex";

        if(this.props.isAlignCenter) element.style.justifyContent = "center";
        if(this.props.isJustifySpaceAround) element.style.justifyContent = "space-around";

        return element;
    }

    build(){
        return this.props.children;
    }
}
