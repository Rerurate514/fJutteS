import { ShadowLevel } from "../enums/shadowLevel.js";
import { View } from "../interface/view.js";

export class Hover extends View {
    constructor({
        child,
        radius = "inherit",
        shadow = ShadowLevel.LVL5,
        onClickEffect = false
    }){
        super({
            child: child,
            radius: radius,
            shadow: shadow,
            onClickEffect: onClickEffect
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

        element.style.overflow = "hidden";

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
        onClickEffect = false
    }){
        super({
            child: child,
            radius: radius,
            shadow: shadow,
            onClickEffect: onClickEffect
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

        after.style.overflow = "hidden";

        after.style.zIndex = 999;

        after.style.borderRadius = (parseInt(this.props.radius, 10)) + "px";

        after.style.width = "100%";
        after.style.height = "100%";

        after.addEventListener('mouseenter', () => {
            after.style.background = "rgb(100, 100, 100, 0.4)";
            this.entered = true;
        });

        after.addEventListener('mouseleave', () => {
            after.style.background = "rgb(0, 0, 0, 0)";
            this.entered = false;
        });

        if(!this.props.onClickEffect) return after;

        after.addEventListener('click', (e) => {
            const ripples = after.getElementsByClassName('ripple');
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
            
            const rect = after.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const w = after.offsetWidth;
            const h = after.offsetHeight;
            const dia = Math.sqrt(w * w + h * h);

            ripple.style.width = ripple.style.height = dia * 2 + 'px';
            ripple.style.left = x - dia + 'px';
            ripple.style.top = y - dia + 'px';

            after.appendChild(ripple);

            ripple.animate([
                { transform: "scale(1)", opacity: "0"}
            ], {
                duration: 1000,
                easing: "ease-in-out"
            })

            setTimeout(() => ripple.remove(), 1000);
        });

        return after;
    }

    build(){
        return this.props.child;
    }
}
