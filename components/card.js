import { View } from "../interface/view.js";
import { ShadowLevel } from '../enums/shadowLevel.js';
import { BaseCSS } from "../enums/baseCSS.js";
import { WebkitCSS } from "../enums/webkitCSS.js";
import { BorderCSS } from "../models/borderCSS.js";

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
        borderCSS = new BorderCSS(),
        webkitCSS = new WebkitCSS()
    }){
        if(!(elevation instanceof ShadowLevel)){
            throw TypeError("CardコンポーネントのElevationプロパティには、ShadowLevelクラスのみ受け付けています。\n渡された型:" + typeof elevation);
        }

        if(!(borderCSS instanceof BorderCSS)){
            throw TypeError("CardコンポーネントのborderCSSプロパティには、BorderCSSクラスのみ受け付けています。\n渡された型:" + typeof elevation);
        }

        if(!(webkitCSS instanceof WebkitCSS)){
            throw TypeError("CardコンポーネントのwebkitCSSプロパティには、WebkitCSSクラスのみ受け付けています。\n渡された型:" + typeof elevation);
        }

        super({
            child: child,
            radius: radius, 
            baseCSS: baseCSS,
            background: background,
            elevation: elevation,
            borderCSS: borderCSS,
            webkitCSS: webkitCSS
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
        element = this.props.borderCSS.applyCSS(element)
        element = this.props.webkitCSS.applyCSS(element);

        return element;
    }

    build(){
        return this.props.child;
    }
}
