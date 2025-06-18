import { Column } from "./column.js";
import { Header } from "./header.js";
import { View } from "../../core/interface/view.js";

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

        super();
        this.child = child;
        this.header = header;
        this.footer = footer;
        this.drawer = drawer;
        this.floatingActionButton = floatingActionButton;
    }

    styledView(element){
        element.style.width = "100%";
        element.style.height = "100%";

        return element;
    }

    build(){
        const children = [];
        
        if (this.header) {
            children.push(
                this.header
            );
        }
        
        children.push(this.child);
        
        if (this.footer) {
            children.push(this.footer);
        }
        
        return new Column({
            children: children
        });
    }
}
