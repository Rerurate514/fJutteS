import { BaseCSS } from "../enums/baseCSS.js";
import { View } from "../interface/view.js";

export class DropDownMenu extends View {
    constructor({
        item = [],
        baseCSS = new BaseCSS(),
        provider
    }){
        super({
            item,
            baseCSS,
            provider
        });
    }

    createWrapView(){
        return document.createElement("select");
    }

    styledView(element){
        element = this.props.baseCSS.applyCSS(element);

        return element;
    }

    embedScriptToView(element){
        element.addEventListener("change", (e) => {
            this.props.provider.update(() => {
                return e.target.value;
            })
        });

        return element;
    }

    build(){
       return  this.props.item;
    }
}

export class DropDownMenuItem extends View {
    constructor({
        text,
        value
    }){
        super({
            text: text,
            value: value
        });
    }

    createWrapView(){
        return document.createElement("option");
    }

    styledView(element){
        element.textContent = this.props.text;
        element.value = this.props.value;

        return element;
    }
}

export class DropDownMenuItemGroup extends View {
    constructor({
        item = []
    }){
        super({
            item: item
        });
    }

    createWrapView(){
        return document.createElement("optgroup");
    }


}
