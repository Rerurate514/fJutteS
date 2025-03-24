import { View } from "../../core/interface/view.js";
import { Text } from "./text.js";
import { Row } from "./row.js";
import { Column } from "./column.js";
import { SpaceBox } from "./spaceBox.js";
import { Card } from "./card.js";
import { ShadowLevel } from "../enums/shadowLevel.js";
import { TextCSS } from "../../cssKit/textCSS.js";
import { FontCSS } from "../../cssKit/fontCSS.js";
import { Provider } from "../../jiperes/logic/provider.js";
import { LimitedProviderScope } from "../../jiperes/components/limitedProviderScope.js";
import { generateUUID } from "../../core/logic/generateUUID.js";
import { BaseCSS } from "../../cssKit/baseCSS.js";
import { Shrink } from "./shrink.js";


export class Accordion extends View {
    constructor({ 
        items, 
        radius = "10px", 
        shadowLevel = ShadowLevel.LVL2,
        baseCSS = new BaseCSS()
    }) {
        super({ 
            items, 
            radius, 
            shadowLevel,
            baseCSS
        });
    }

    createWrapView() {
        return document.createElement("div");
    }

    build() {
        return this.props.items.map((item) => {
            return new AccordionItem({ 
                ...item, 
                radius: this.props.radius, 
                shadowLevel: this.props.shadowLevel 
            });
        });
    }
}

class AccordionItem extends View {
    constructor({ 
        title, 
        content, 
        radius, 
        shadowLevel,
        baseCSS = new BaseCSS({
            padding: "4px"
        })
    }) {
        super({ 
            title, 
            content, 
            radius, 
            shadowLevel, 
            isExpanded: Provider.createProvider(() => false, `AccordionItem_isExpanded_${generateUUID()}`),
            baseCSS
        });
    }

    createWrapView() {
        return document.createElement("div");
    }

    styledView(element){
        element = this.props.baseCSS.applyCSS(element);

        return element;
    }

    build() {
        return new Card({
            radius: this.props.radius,
            elevation: this.props.shadowLevel,
            baseCSS: new BaseCSS({
                padding: "4px"
            }),
            child: new Column({
                children: [
                    new Row({
                        children: [
                            new Text(this.props.title, new TextCSS({ fontCSS: new FontCSS({ fontWeight: "bold" }) })),
                            new SpaceBox({ width: "8px" }),
                            new LimitedProviderScope({
                                watchingProviders: [this.props.isExpanded],
                                build: (values) => new Text(values[0] ? "▲" : "▼"),
                            }),
                        ],
                        isJustifySpaceBetween: true,
                        isVerticalCenter: true,
                    }),
                    new LimitedProviderScope({
                        watchingProviders: [this.props.isExpanded],
                        build: (values) => values[0] ? this.props.content : new Shrink(this.props.content),
                    }),
                ],
            }),
        });
    }

    embedScriptToView(e) {
        e.addEventListener("click", () => {
            this.props.isExpanded.update((value) => !value);
        });
        return e;
    }
}
