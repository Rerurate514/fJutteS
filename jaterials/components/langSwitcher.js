import { Provider } from "../../jiperes/logic/provider.js";
import { View } from "../../core/interface/view.js";
import { LimitedProviderScope } from "../../jiperes/components/limitedProviderScope.js";

export const langSwitchProvider = Provider.createProvider(() => "en");

export class LangSwitcher extends View {
    constructor({
        build = () => {}
    }){
        super();
        this.build = build;
    }

    build(){
        return new LimitedProviderScope({
            providers: [ langSwitchProvider ],
            build: (langKey) => {
                return this.build(langKey[0]);
            }
        });
    }
}
