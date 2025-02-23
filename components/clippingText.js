import { View } from "../interface/view.js";

export class ClippingText extends View {
  constructor(child){
    super({
      child: child
    });
  }

  createWrapView(){
    return document.createElement("div");
  }

  styledView(element){
    element.style.width = "100%";
    element.style.height = "100%";

    element.style.webkitBackgroundClip = "text";

    return element;
  }

  build(){
    return this.props.child;
  }
}
