import { View } from "../../interface/view.js";


export class Moc extends View {
    constructor(){
        super();
    }

    createWrapView(){
        return document.createElement("div");
    }
}
