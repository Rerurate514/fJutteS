import { BaseCSS } from "../enums/baseCSS.js";
import { ShadowLevel } from "../enums/shadowLevel.js";
import { View } from "../interface/view.js";
import { Provider } from "../jiperes/provider.js";
import { Card } from "./card.js";
import { Column } from "./column.js";
import { ElevatedButton } from "./elevatedButton.js";
import { LimitedProviderScope } from "./limitedProviderScope.js";
import { Row } from "./row.js";
import { Shrink } from "./shrink.js";
import { SpaceBox } from "./spaceBox.js";
import { Text } from "./text.js";

export class ExpandsPanel extends View {
    constructor({
        titleItem: titleItem,
        child,
        radius = "10px",
        buttonShadowLevel = ShadowLevel.LVL3,
        panelItemBackGround = "white",
    }){
        const isExpands = Provider.createProvider(() => {
            return false;
        }, "isExpands__ExpandsPanel");
        
        super({
            titleItem,
            child,
            panelItemBackGround,
            radius,
            buttonShadowLevel,
            isExpands
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
                        new SpaceBox({
                            width: "8px",
                        }),
                        new Card({
                            radius: this.props.radius,
                            elevation: this.props.buttonShadowLevel,
                            child: new ElevatedButton({
                                baseCSS: new BaseCSS({
                                    padding: "8px",
                                }),
                                child: new LimitedProviderScope({
                                    watchingProviders: [ this.props.isExpands ],
                                    build: (isExpand) => {
                                        const button = isExpand[0] ? "∧" : "∨";
                                        return new Text(button);
                                    }
                                }),
                                onClick: () => {
                                    this.props.isExpands.update((currentValue) => {
                                        return !currentValue;
                                    });
                                }
                            })
                        })
                    ]
                }),
                new SpaceBox({
                    height: "8px",
                }),
                new LimitedProviderScope({
                    watchingProviders: [ this.props.isExpands ],
                    build: (isExpand) => {
                        const view = isExpand[0] 
                        ? this.props.child
                        : new Shrink(this.props.child);

                        return view;
                    }
                }),
            ]
        })
    }
}
