import { View } from "../interface/view.js";

export class Center extends View {
    constructor(child){
        super({child: child});
    }

    createWrapView(){
        return document.createElement("div");
    }

    styledView(element){
        element.style.width = "100%";
        element.style.height = "100%";

        element.style.textAlign = "center";
        element.style.justifyContent = "center";

        element.style.display = "flex";
        element.style.alignItems = "center";

        return element;
    }

    build(){
        return new _Center(this.props.child);
    }
}


export class _Center extends View {
    constructor(child){
        super({child: child});
    }

    createWrapView(){
        return document.createElement("div");
    }

    styledView(element){
        element.style.width = "fit-content";
        element.style.height = "fit-content";

        element.style.margin = "auto";

        return element;
    }

    build(){
        return this.props.child;
    }
}
