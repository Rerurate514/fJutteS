import { Provider } from "../../jiperes/logic/provider.js";
import { View } from "../../core/interface/view.js";
import { LimitedProviderScope } from "../../jiperes/components/limitedProviderScope.js";

export const langSwitchProvider = Provider.createProvider(() => "en");

export class LangSwitcher extends View {
    constructor({
        build = () => {}
    }){
        super({
            build
        });
    }

    build(){
        return new LimitedProviderScope({
            watchingProviders: [ langSwitchProvider ],
            build: (langKey) => {
                return this.props.build(langKey[0]);
            }
        });
    }
}
