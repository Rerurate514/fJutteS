import { View } from "../interface/view.js";
import { Column } from "./column.js";

export class Scaffold extends View {
    constructor({
        child,
        header = null,
        footer = null,
        drawer = null,
        floatingActionButton = null
    }){
        super({
            child: child,
            header: header,
            footer: footer,
            drawer: drawer,
            floatingActionButton: floatingActionButton
        });
    }

    createWrapView(){
        return document.createElement("div");   
    }

    styledView(element){
        element.style.width = "100%";
        element.style.height = "100%";

        return element;
    }

    build(){
        const children = [];
        
        if (this.props.header) {
            children.push(this.props.header);
        }
        
        children.push(this.props.child);
        
        if (this.props.footer) {
            children.push(this.props.footer);
        }
        
        return new Column({
            children: children
        });
    }
}
