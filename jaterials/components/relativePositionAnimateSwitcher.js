import { View } from "../../core/interface/view.js";

export class RelativePositionAnimateSwitcher extends View {
    constructor({
        child,
        beginPosition,
        endPosition,
        duration = 600
    }){
        super({child, beginPosition, endPosition, duration});
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

        element.style.borderRadius = "inherit";
        element.style.transition = "all 0.5s ease-in-out";

        return element;
    }

    build(){
        const repos = new _RelativePositionAnimateSwitcher(this.props);
        this.repos = repos;
        return repos;
    }

    animate(){
        this.repos.animate();
    }
}


export class _RelativePositionAnimateSwitcher extends View {
    constructor({
        child,
        beginPosition,
        endPosition
    }){
        super({child, beginPosition, endPosition});
    }

    createWrapView(){
        return document.createElement("div");
    }

    styledView(element){
        element.style.width = "fit-content";
        element.style.height = "fit-content";

        element = this.props.beginPosition.applyCSS(element);

        element.style.borderRadius = "inherit";
        element.style.transition = "all 0.5s ease-in-out";

        return element;
    }

    build(){
        return this.props.child;
    }

    animate(){
        let element = document.getElementById(this.props.id);

        if (element) {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    this.props.endPosition.applyCSS(element);
                });
            });
        }
    }
}
