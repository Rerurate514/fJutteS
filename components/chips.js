import { View } from "../interface/view.js";
import { Text } from "./text.js";
import { Card } from "./card.js";
import { ShadowLevel } from "../enums/shadowLevel.js";
import { Border } from "../models/borderCSS.js";

export class Chips extends View {
    constructor({
        text,
        background = null,
        border = new Border()
    }){
        super({
            text: text,
            background: background,
            border: border.assembleCSS()
        });
    }

    createWrapView(){
        return document.createElement("div");
    }

    styledView(element){
        element.style.borderRadius = "32px";

        element.style.paddingLeft = "16px";
        element.style.paddingRight = "16px";
        element.style.border = this.props.border;

        element.style.overflow = "hidden";

        element.style.boxShadow = ShadowLevel.LVL3;

        if(this.props.background) element.style.background = this.props.background;

        return element;
    }

    build(){
        return new Card({
            background: this.props.background ?? "transparent",
            child: new Text(this.props.text)
        });
    }
}
