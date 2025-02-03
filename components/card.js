import { View } from "../interface/view.js";
import { ShadowLevel } from '../enums/shadowLevel.js';
import { Border } from "../models/border.js";
import { BaseCSS } from "../enums/baseCSS.js";

export class Card extends View {
    constructor({
        child,
        radius = "inherit", 
        baseCSS = new BaseCSS({
            width: "inherit",
            height: "inherit"
        }),
        background = null,
        elevation = ShadowLevel.LVL0,
        border = new Border()
    }){
        if(!(elevation instanceof ShadowLevel)){
            throw TypeError("CardコンポーネントのElevationプロパティには、ShadowLevelクラスのみ受け付けています。\n渡された型:" + typeof elevation);
        }

        if(!(border instanceof Border)){
            throw TypeError("Cardコンポーネントのborderプロパティには、Borderクラスのみ受け付けています。\n渡された型:" + typeof elevation);
        }

        super({
            child: child,
            radius: radius, 
            baseCSS: baseCSS,
            background: background,
            elevation: elevation,
            border: border.assembleCSS()
        });
    }

    createWrapView(){
        return document.createElement("div");
    }

    styledView(element){
        element.style.borderRadius = this.props.radius;
        if(this.props.background) element.style.background = this.props.background;
        element.style.boxShadow = this.props.elevation;
        element.style.border = this.props.border;

        element = this.props.baseCSS.applyCSS(element);

        return element;
    }

    build(){
        return this.props.child;
    }
}
