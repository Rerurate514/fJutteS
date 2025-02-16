import { View } from "fjuttes";

export class Row extends View {
    constructor({
        children,
        isAlignCenter = false, 
        isJustifySpaceAround = false,
        isJustifySpaceBetween = false,
        isVerticalCenter = false
    }){
        super({
            children: children, 
            isAlignCenter: isAlignCenter, 
            isJustifySpaceAround: isJustifySpaceAround,
            isJustifySpaceBetween: isJustifySpaceBetween,
            isVerticalCenter: isVerticalCenter
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
        if(this.props.isJustifySpaceBetween) element.style.justifyContent = "space-between";
        if(this.props.isVerticalCenter) element.style.alignItems = "center";

        return element;
    }

    build(){
        return this.props.children;
    }
}
