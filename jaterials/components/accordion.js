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
        super();
        this.items = items;
        this.radius = radius;
        this.shadowLevel = shadowLevel;
        this.baseCSS = baseCSS;
    }

    build() {
        return this.items.map((item) => {
            return new AccordionItem({ 
                ...item, 
                radius: this.radius, 
                shadowLevel: this.shadowLevel 
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
        super();
        this.title = title;
        this.content = content;
        this.radius = radius;
        this.shadowLevel = shadowLevel;
        this.isExpanded = Provider.createProvider(() => false, `AccordionItem_isExpanded_${generateUUID()}`);
        this.baseCSS = baseCSS;
    }

    styledView(element){
        element = this.baseCSS.applyCSS(element);

        return element;
    }

    build() {
        return new Card({
            radius: this.radius,
            elevation: this.shadowLevel,
            baseCSS: new BaseCSS({
                padding: "4px"
            }),
            child: new Column({
                children: [
                    new Row({
                        children: [
                            new Text(this.title, new TextCSS({ fontCSS: new FontCSS({ fontWeight: "bold" }) })),
                            new SpaceBox({ width: "8px" }),
                            new LimitedProviderScope({
                                providers: [this.isExpanded],
                                build: (values) => new Text(values[0] ? "▲" : "▼"),
                            }),
                        ],
                        isJustifySpaceBetween: true,
                        isVerticalCenter: true,
                    }),
                    new LimitedProviderScope({
                        providers: [this.isExpanded],
                        build: (values) => values[0] ? this.content : new Shrink(this.content),
                    }),
                ],
            }),
        });
    }

    embedScriptToView(e) {
        e.addEventListener("click", () => {
            this.isExpanded.update((value) => !value);
        });
        return e;
    }
}
