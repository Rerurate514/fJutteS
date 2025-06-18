import { View } from "../../core/interface/view.js";

export class Center extends View {
    constructor(child){
        super();
        this.child = child;
    }

    styledView(element){
        element.style.width = "100%";
        element.style.height = "100%";

        element.style.textAlign = "center";
        element.style.justifyContent = "center";

        element.style.display = "flex";
        element.style.alignItems = "center";

        element.style.borderRadius = "inherit";

        return element;
    }

    build(){
        return new _Center(this.child);
    }
}


export class _Center extends View {
    constructor(child){
        super();
        this.child = child;
    }

    styledView(element){
        element.style.width = "fit-content";
        element.style.height = "fit-content";

        element.style.margin = "auto";

        element.style.borderRadius = "inherit";

        return element;
    }

    build(){
        return this.child;
    }
}
