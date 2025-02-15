import { View } from "../interface/view.js";

export class SpaceBox extends View {
    constructor({
        width = "0px", 
        height = "0px"
    } = {}){
        super({width: width, height: height});
    }

    createWrapView(){
        return document.createElement("div");
    }

    styledView(element){
        element.style.width = this.props.width;
        element.style.height = this.props.height;

        return element;
    }
}
