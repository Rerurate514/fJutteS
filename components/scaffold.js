import { Column } from "./column.js";
import { Header } from "./header.js";
import { View } from "../interface/view.js";

export class Scaffold extends View {
    constructor({
        child,
        header = null,
        footer = null,
        drawer = null,
        floatingActionButton = null,
    }){
        if(!(header instanceof Header)){
            throw new Error("Scaffold header property must assign Header class");
        }

        super({
            child: child,
            header: header,
            footer: footer,
            drawer: drawer,
            floatingActionButton: floatingActionButton,
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
            children.push(
                this.props.header
            );
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
