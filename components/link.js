import { View } from "../interface/view.js";

export class Link extends View {
    constructor({
        child,
        href,
        rel = null,
        target = null,
        isDownload = false
    }){
        super({
            child: child,
            href: href,
            rel: rel,
            target: target,
            isDownload: isDownload
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

        return element;
    }

    build(){
        return this.props.child;
    }
}
