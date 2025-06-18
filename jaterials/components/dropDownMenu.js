import { BaseCSS } from "../../cssKit/baseCSS.js";
import { View } from "../../core/interface/view.js";

export class DropDownMenu extends View {
    constructor({
        item = [],
        baseCSS = new BaseCSS(),
        provider
    }){
        super();
        this.item = item;
        this.baseCSS = baseCSS;
        this.provider = provider;
    }

    createWrapView(){
        return document.createElement("select");
    }

    styledView(element){
        element = this.baseCSS.applyCSS(element);

        return element;
    }

    embedScriptToView(element){
        element.addEventListener("change", (e) => {
            this.provider.update(() => {
                return e.target.value;
            });
        });

        return element;
    }

    build(){
       return  this.item;
    }
}

export class DropDownMenuItem extends View {
    constructor({
        text,
        value
    }){
        super();
        this.text = text;
        this.value = value;
    }

    createWrapView(){
        return document.createElement("option");
    }

    styledView(element){
        element.textContent = this.text;
        element.value = this.value;

        return element;
    }
}

export class DropDownMenuItemGroup extends View {
    constructor({
        item = []
    }){
        super();
        this.item = item;
    }

    createWrapView(){
        return document.createElement("optgroup");
    }


}
