import { BaseCSS } from "../../cssKit/baseCSS.js";
import { ShadowLevel } from "../cssKit/shadowLevel.js";
import { View } from "../../core/interface/view.js";
import { BorderCSS } from "../../cssKit/borderCSS.js";
import { Row } from "./row.js";

export class Hover extends View {
    constructor({
        child,
        radius = "inherit",
        shadow = ShadowLevel.LVL5,
        onClickEffect = false
    }){
        super({
            child,
            radius,
            shadow,
            onClickEffect
        });
    }

    createWrapView(){
        return document.createElement("div");
    }

    styledView(element){
        element.style.width = "fit-content";
        element.style.height = "fit-content";
        element.style.position = "relative";
        element.style.borderRadius = this.props.radius;

        return element;
    }

    build(){
        return new Row({
            baseCSS: new BaseCSS({
                borderCSS: new BorderCSS({
                    radius: "inherit"
                })
            }),
            children: [
                this.props.child,
                new _HoverWrapper(this.props)
            ]
        });
    }
}

class _HoverWrapper extends View {
    constructor({
        radius = "inherit",
        onClickEffect = false
    }){
        super({
            radius,
            onClickEffect
        });
    }

    createWrapView(){
        return document.createElement("div");
    }

    styledView(element){
        element.style.position = "absolute";
        element.style.top = "0";
        element.style.left = "0";
        element.style.width = "100%";
        element.style.height = "100%";
        element.style.background = "rgb(0, 0, 0, 0)";
        element.style.overflow = "hidden";
        element.style.zIndex = 998;
        element.style.borderRadius = this.props.radius;

        return element;
    }

    build(){
        return new _Hover(this.props);
    }
}

class _Hover extends View {
    constructor({
        radius = "inherit",
        onClickEffect = false
    }){
        super({
            radius,
            onClickEffect
        });
    }

    createWrapView(){
        return document.createElement("div");
    }

    styledView(element){
        element.style.width = "100%";
        element.style.height = "100%";
        element.style.background = "rgb(0, 0, 0, 0)";
        element.style.mixBlendMode = "difference";
        element.style.transition = "background-color 0.4s";
        element.style.zIndex = 999;
        element.style.borderRadius = this.props.radius;

        return element;
    }

    embedScriptToView(element) {
        element.addEventListener('mouseenter', () => {
            element.style.background = "rgb(100, 100, 100, 0.4)";
        });

        element.addEventListener('mouseleave', () => {
            element.style.background = "rgb(0, 0, 0, 0)";
        });

        if(!this.props.onClickEffect) return element;

        element.addEventListener('click', (e) => {
            const ripples = element.getElementsByClassName('ripple');
            Array.from(ripples).forEach(ripple => ripple.remove());

            const ripple = document.createElement("div");
            ripple.classList.add('ripple');

            ripple.style.position = "absolute";
            ripple.style.transform = "scale(0)";
            ripple.style.animation = "";
            ripple.style.pointerEvents = "none";
            ripple.style.background = "rgba(200, 200, 200, 0.9)";
            ripple.style.borderRadius = "50%";
            ripple.style.mixBlendMode = "difference";

            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const w = element.offsetWidth;
            const h = element.offsetHeight;
            const dia = Math.sqrt(w * w + h * h);

            ripple.style.width = ripple.style.height = dia * 2 + 'px';
            ripple.style.left = x - dia + 'px';
            ripple.style.top = y - dia + 'px';

            element.appendChild(ripple);

            ripple.animate([
                { transform: "scale(1)", opacity: "0"}
            ], {
                duration: 1000,
                easing: "ease-in-out"
            });

            setTimeout(() => ripple.remove(), 1000);
        });

        return element;
    }
}
