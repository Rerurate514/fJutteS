import { View } from "../../core/interface/view.js";

export class RelativePosition extends View {
    constructor({
        child,
        relativePositions
    }){
        super();
        this.child = child;
        this.relativePositions = relativePositions;
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
        return new _RelativePosition({
            child: this.child,
            relativePositions: this.relativePositions
        });
    }
}


export class _RelativePosition extends View {
    constructor({
        child,
        relativePositions
    }){
        super();
        this.child = child;
        this.relativePositions = relativePositions;
    }

    styledView(element){
        element.style.width = "fit-content";
        element.style.height = "fit-content";

        element = this.relativePositions.applyCSS(element);

        element.style.borderRadius = "inherit";

        return element;
    }

    build(){
        return this.child;
    }
}
