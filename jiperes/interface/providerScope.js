import { View } from "../../core/interface/view.js";

/**
 * @param {Array<Provider>} providers - プロバイダーの配列
 *
 * このクラスに渡されたProvidersはリッスン状態となり、値の変更を常に監視しています。
 * 変更が検知されるとこのコンポーネント以下のViewがrebuild()されます。
 * 
 * FlutterでいうところのsetState、ReactでいうところのuseStateを使用したいとき、
 * このクラスをViewにラップしてwatchもしくはreadしているProvider群を渡すだけです。
 * このとき必ず、配列でProviderを渡してください。(providerが一つしかなくても！)
 */
export class ProviderScope extends View {
    /**
     * コンストラクタ
     * @param {Array<Provider>} providers - プロバイダーの配列
     */
    constructor({providers = []}) {
        super();
        this.providers = providers;

        this._iterateProviders();
    }

    _iterateProviders() {
        this.providers.forEach(provider => {
            this._watch(provider);
        });
    }

    _watch(provider) {
        provider.watch(() => {
            this.rebuild();
        },
        { immediate: false });
    }
}
