import { View } from "../../core/interface/view.js";

export class SpaceBox extends View {
    constructor({
        width = "0px", 
        height = "0px"
    } = {}){
        super();
        this.width = width;
        this.height = height;
    }

    styledView(element){
        element.style.width = this.width;
        element.style.height = this.height;

        return element;
    }
}
