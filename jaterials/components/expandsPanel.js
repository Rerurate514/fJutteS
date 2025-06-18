import { BaseCSS } from "../../cssKit/baseCSS.js";
import { ShadowLevel } from "../enums/shadowLevel.js";
import { View } from "../../core/interface/view.js";
import { Provider } from "../../jiperes/logic/provider.js";
import { Card } from "./card.js";
import { Column } from "./column.js";
import { ElevatedButton } from "./elevatedButton.js";
import { LimitedProviderScope } from "../../jiperes/components/limitedProviderScope.js";
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
        
        super();
        this.titleItem = titleItem;
        this.child = child;
        this.radius = radius;
        this.buttonShadowLevel = buttonShadowLevel;
        this.isExpands = isExpands;
        this.panelItemBackGround = panelItemBackGround;
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
                        this.titleItem,
                        new SpaceBox({
                            width: "8px",
                        }),
                        new Card({
                            radius: this.radius,
                            elevation: this.buttonShadowLevel,
                            child: new ElevatedButton({
                                baseCSS: new BaseCSS({
                                    padding: "8px",
                                }),
                                child: new LimitedProviderScope({
                                    watchingProviders: [ this.isExpands ],
                                    build: (isExpand) => {
                                        const button = isExpand[0] ? "∧" : "∨";
                                        return new Text(button);
                                    }
                                }),
                                onClick: () => {
                                    this.isExpands.update((currentValue) => {
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
                    watchingProviders: [ this.isExpands ],
                    build: (isExpand) => {
                        const view = isExpand[0] 
                        ? this.child
                        : new Shrink(this.child);

                        return view;
                    }
                }),
            ]
        });
    }
}
