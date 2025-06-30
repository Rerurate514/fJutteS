import { View } from "../../core/interface/view.js";

export class Link extends View {
    constructor({
        child,
        href,
        rel = null,
        target = null,
        isDownload = false,
        isShownUnderline = true
    }){
        super();
        this.child = child;
        this.href = href;
        this.rel = rel;
        this.target = target;
        this.isDownload = isDownload;
        this.isShownUnderline = isShownUnderline;
    }

    createWrapView(){
        return document.createElement("a");
    }

    styledView(element){
        element.href = this.href;
        if(this.isDownload) element.download = "download";

        if(this.rel) element.rel = this.rel;
        if(this.target) element.target = this.target;

        if(!this.isShownUnderline) element.style.textDecoration = "none";

        return element;
    }

    build(){
        return this.child;
    }
}
