import { BaseCSS } from "../enums/baseCSS.js";
import { View } from "../interface/view.js";
import { Provider } from "../jiperes/provider.js";
import { Box } from "./box.js";
import { Column } from "./column.js";
import { ElevatedButton } from "./elevatedButton.js";
import { LimitedProviderScope } from "./limitedProviderScope.js";
import { Row } from "./row.js";
import { Text } from "./text.js";
export class ExpandsPanel extends View {
    constructor({
        titleItem: titleItem,
        child,
        panelItemBackGround = "white"
    }){
        const isExpands = Provider.createProvider((ref) => {
            return false;
        }, "ExpandsPanel_isExpands");
        
        super({
            titleItem: titleItem,
            child: child,
            panelItemBackGround: panelItemBackGround,
            isExpands: isExpands
        });
    }

    createWrapView(){
        return document.createElement("div");
    }

    styledView(element){
        element.style.width = "100%";
        return element;
    }

    build(){
        return new Column({
            children: [
                new Row({
                    isJustifySpaceBetween: true,
                    isVerticalCenter: true,
                    children: [
                        this.props.titleItem,
                        new ElevatedButton({
                            radius: "8px",
                            baseCSS: new BaseCSS({
                                padding: "8px",
                            }),
                            child: new LimitedProviderScope({
                                watchingProviders: [ this.props.isExpands ],
                                build: (isExpand) => {
                                    const button = isExpand[0] ? "∧" : "∨";
                                    return new Text(button)
                                }
                            }),
                            onClick: () => {
                                this.props.isExpands.update((currentValue) => {
                                    return !currentValue;
                                });
                            }
                        })
                    ]
                }),
                new LimitedProviderScope({
                    watchingProviders: [ this.props.isExpands ],
                    build: (isExpand) => {
                        const view = isExpand[0] 
                        ? this.props.child
                        : new Box({});

                        return view;
                    }
                }),
            ]
        })
    }
}
