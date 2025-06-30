import { BaseCSS } from "../../cssKit/baseCSS.js";
import { View } from "../../core/interface/view.js";
import { Column } from "./column.js";
import { ElevatedButton } from "./elevatedButton.js";
import { Row } from "./row.js";
import { Text } from "./text.js";

export class SimpleDialog extends View {
    constructor({
        child,
        cancelText,
        okText,
        onCancelClickedFn = () => {},
        onOkClickedFn = () => {}
    }){
        super();
        this.child = child;
        this.cancelText = cancelText;
        this.okText = okText;
        this.onCancelClickedFn = onCancelClickedFn;
        this.onOkClickedFn = onOkClickedFn;
    }

    createWrapView(){
        return document.createElement("dialog");
    }

    styledView(element){
        return element;
    }

    build(){
        return new Column({
            children: [
                this.child,
                new Row({
                    isAlignCenter: true,
                    children: [
                        new ElevatedButton({
                            baseCSS: new BaseCSS({
                                margin: "32px"
                            }),
                            child: this.cancelText ?? new Text("cancel"),
                            onClick: () => {
                                this.onCancelClickedFn();
                                this.closeModal();
                            }
                        }),
                        new ElevatedButton({
                            baseCSS: new BaseCSS({
                                margin: "32px"
                            }),
                            child: this.okText ?? new Text("ok"),
                            onClick: () => {
                                this.onOkClickedFn();
                                this.closeModal();
                            }
                        })
                    ]
                })
            ]
        });
    }

    openModal(){
        document.body.appendChild(this.view);
        this.view.showModal();
        this.addPseudoElement();
    }

    closeModal(){
        this.view.close();
    }
}
