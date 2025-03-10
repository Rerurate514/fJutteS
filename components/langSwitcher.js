import { Provider } from "../jiperes/provider.js";
import { View } from "../interface/view.js";
import { LimitedProviderScope } from "./limitedProviderScope.js";

export const langSwitchProvider = Provider.createProvider(() => "en");

export class LangSwitcher extends View {
    constructor({
        build = () => {}
    }){
        super({
            build
        });
    }

    createWrapView(){
        return document.createElement("div");
    }

    build(){
        return new LimitedProviderScope({
            watchingProviders: [ langSwitchProvider ],
            build: (langKey) => {
                return this.props.build(langKey);
            }
        });
    }
}
