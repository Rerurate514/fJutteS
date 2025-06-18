import { View } from "../../core/interface/view.js";
import { Provider } from "../logic/provider.js";

/**
 * このクラスは状態管理しなくてはならない要素が動的に変化する際に有用なコンポーネントです。
 */
export class DynamicProviderScope extends View {
    constructor({child}){
        super();
        this.child = child;
        this.providers = [];
    }

    createProvider(initialValue){
        let provider = Provider.createProvider(() => {
            return initialValue;
        });

        this.providers.push(provider);

        return provider;
    }

    refreshProviders(){
        this.rebuild({
            props: this.props
        });
    }
}
