import { View } from "../interface/view.js";

export class SpaceBox extends View {
    constructor({
        width = "0px", 
        height = "0px"
    }){
        super({width: width, height: height});
    }

    createWrapView(){
        let box = document.createElement("div");
        return box;
    }

    styledView(element){
        element.style.width = this.props.width;
        element.style.height = this.props.height;

        return element;
    }
}
