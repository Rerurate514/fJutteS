import { View } from "../interface/view.js";

export class Card extends View {
    constructor({
        child,
        radius = "0px", 
        background = "transparent",
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
            background: background,
            elevation: elevation,
            border: border.assembleCSS()
        });
    }

    createWrapView(){
        let card = document.createElement("div");
        return card;
    }

    styledView(element){
        element.style.borderRadius = this.props.radius;
        element.style.background = this.props.background;
        element.style.boxShadow = this.props.elevation;
        element.style.border = this.props.border;

        element.style.width = "fit-content";
        element.style.height = "fit-content";

        return element;
    }

    build(){
        return this.props.child;
    }
}
