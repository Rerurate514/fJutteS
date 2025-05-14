import { View } from "../../core/interface/view.js";

export class Shrink extends View {
    constructor(child){
        super({
            child
        });
    }

    styledView(element){
        element.style.width = "0px";
        element.style.height = "0px";
        element.style.overflow = "hidden";

        return element;
    }

    build(){
        return this.props.child;
    }
}
