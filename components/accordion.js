import { View } from "../interface/view.js";
import { Text } from "../components/text.js";
import { Row } from "../components/row.js";
import { Column } from "../components/column.js";
import { SpaceBox } from "../components/spaceBox.js";
import { Card } from "../components/card.js";
import { ShadowLevel } from "../enums/shadowLevel.js";
import { TextCSS } from "../enums/textCSS.js";
import { FontCSS } from "../enums/fontCSS.js";
import { Provider } from "../jiperes/provider.js";
import { LimitedProviderScope } from "../components/limitedProviderScope.js";
import { generateUUID } from "../utils/generateUUID.js";
import { Shrink } from "./shrink.js";
import { BaseCSS } from "../enums/baseCSS.js";


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
