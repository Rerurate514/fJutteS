import { View } from "../../interface/view.js";


export class Box extends View {
    constructor(){
        super();
    }

    createWrapView(){
        return document.createElement("div");
    }
}
