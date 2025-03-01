import { View } from "../interface/view.js";
import { Text } from "./text.js";
import { Card } from "./card.js";
import { ShadowLevel } from "../enums/shadowLevel.js";
import { BorderCSS } from "../models/borderCSS.js";

export class Chips extends View {
    constructor({
        text,
        background = null,
        borderCSS = new BorderCSS()
    }){
        super({
            text,
            background,
            borderCSS
        });
    }

    createWrapView(){
        return document.createElement("div");
    }

    styledView(element){
        element.style.borderRadius = "32px";

        element.style.paddingLeft = "16px";
        element.style.paddingRight = "16px";

        element.style.overflow = "hidden";

        element.style.boxShadow = ShadowLevel.LVL3;

        if(this.props.background) element.style.background = this.props.background;

        element = this.props.borderCSS.applyCSS(element);

        return element;
    }

    build(){
        return new Card({
            background: this.props.background ?? "transparent",
            child: new Text(this.props.text)
        });
    }
}
