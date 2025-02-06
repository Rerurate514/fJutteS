import { ShadowLevel } from "../enums/shadowLevel.js";
import { View } from "../interface/view.js";

export class Hover extends View {
    constructor({
        child,
        radius = "inherit",
        shadow = ShadowLevel.LVL5,
    }){
        super({
            child: child,
            radius: radius,
            shadow: shadow
        });
    }

    createWrapView(){
        return document.createElement("div");
    }

    styledView(element){
        element.style.display = "inline-block";
        element.style.width = "fit-content";
        element.style.height = "fit-content";

        element.style.position = "relative";
        element.style.background = "transparent";

        element.style.borderRadius = this.props.radius;

        return element;
    }

    build(){
        return new _Hover(this.props);
    }
}

class _Hover extends View {
    constructor({
        child,
        radius = "inherit",
        shadow = ShadowLevel.LVL5,
    }){
        super({
            child: child,
            radius: radius,
            shadow: shadow
        });
    }

    createWrapView(){
        return document.createElement("div");
    }

    styledView(element){
        element.style.display = "inline-block";
        element.style.width = "fit-content";
        element.style.height = "fit-content";
        element.style.borderRadius = this.props.radius;
        element.style.background = "transparent";

        return element;
    }

    createAfterElement(){
        let after = document.createElement("div");

        after.content = "";
        after.style.position = "absolute";
        after.style.top = "0";
        after.style.left = "0";
        after.style.background = "rgb(0, 0, 0, 0)";
        after.style.mixBlendMode = "difference";
        after.style.transition = "background-color 0.4s";

        after.style.zIndex = 999;

        after.style.borderRadius = (parseInt(this.props.radius, 10)) + "px";

        after.style.width = "100%";
        after.style.height = "100%";

        after.addEventListener('mouseenter', () => {
            after.style.background = "rgb(100, 100, 100, 0.4)";
        });

        after.addEventListener('mouseleave', () => {
            after.style.background = "rgb(0, 0, 0, 0)";
        });

        return after;
    }

    build(){
        return this.props.child;
    }
}
