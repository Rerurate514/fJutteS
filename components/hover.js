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

        this._addHoverEffect(element);

        return element;
    }

    createAfterElement(){
        let after = document.createElement("div");

        after.content = "";
        after.style.position = "absolute";
        after.style.top = "0";
        after.style.left = "0";
        after.style.background = "rgb(128, 128, 128, 0)";
        after.style.mixBlendMode = "difference";
        after.style.transition = "background-color 0.3s";

        after.style.borderRadius = (parseInt(this.props.radius, 10)) - 3 + "px";

        after = this._calcAfterSize(after);
        console.log(after)

        after.addEventListener('mouseenter', () => {
            after.style.background = "rgb(128, 128, 128, 0.3)";
        });

        after.addEventListener('mouseleave', () => {
            after.style.background = "rgb(128, 128, 128, 0)";
        });

        return after;
    }

    _calcAfterSize(element){
        const hover = document.getElementById(`${this.props.id}`);
        const clientWidth = hover.clientWidth;
        const clientHeight = hover.clientHeight;

        element.style.width = clientWidth + "px";
        element.style.height = clientHeight + "px";

        console.log(element)

        return element;
    }

    build(){
        return this.props.child;
    }

    _addHoverEffect(element){
        element.style.boxShadow = ShadowLevel.LVL0;
        element.style.transition = 'box-shadow 0.3s ease-in-out';

        element.addEventListener('mouseenter', () => {
            element.style.boxShadow = this.props.shadow;
            element.style.mixBlendMode = "multiply";
            element.style.background = "rgb(0, 0, 0, 0.1)";
        });

        element.addEventListener('mouseleave', () => {
            element.style.boxShadow = ShadowLevel.LVL0;
            element.style.background = "rgb(0, 0, 0, 0.1)";
            element.style.transition = "background 0.3s";
        });

        return element;
    }
}
