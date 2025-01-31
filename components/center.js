import { View } from "../interface/view.js";

export class Center extends View {
    constructor(child){
        super({child: child});
    }

    createWrapView(){
        let center = document.createElement("div");
        return center;
    }

    styledView(element){
        element.style.width = "100%";
        element.style.height = "100%";

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
        let center = document.createElement("div");
        return center;
    }

    styledView(element){
        element.style.textAlign = "center";
        element.style.justifyContent = "center";

        return element;
    }

    build(){
        return this.props.child;
    }
}
