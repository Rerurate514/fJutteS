import { View } from "../core/interface/view.js";

export class Link extends View {
    constructor({
        child,
        href,
        rel = null,
        target = null,
        isDownload = false,
        isShownUnderline = true
    }){
        super({
            child,
            href,
            rel,
            target,
            isDownload,
            isShownUnderline
        });
    }

    createWrapView(){
        return document.createElement("a");
    }

    styledView(element){
        element.href = this.props.href;
        if(this.props.isDownload) element.download = "download";

        if(this.props.rel) element.rel = this.props.rel;
        if(this.props.target) element.target = this.props.target;

        if(!this.props.isShownUnderline) element.style.textDecoration = "none";

        return element;
    }

    build(){
        return this.props.child;
    }
}
