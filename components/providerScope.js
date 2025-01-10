/**
 * @param {View} child - 子要素
 * @param {Object} props - プロップス
 * @param {Array<Provider>} watchingProviders - プロバイダーの配列
 *
 * このクラスに渡されたProvidersはリッスン状態となり、値の変更を常に監視しています。
 * 変更が検知されるとこのコンポーネント以下のViewがrebuild()されます。
 * 
 * FlutterでいうところのsetState、ReactでいうところのuseStateを使用したいとき、
 * このクラスをViewにラップしてwatchもしくはreadしているProvider群を渡すだけです。
 * このとき必ず、配列でProviderを渡してください。(providerが一つしかなくても！)
 * 
 * そしてproviderの値を初期化する際にはpreBuildメソッドではなく、initializeメソッドを使用してください。
 * これはpreBuildでプロバイダーを定義すると、値の変更を検知したリスナーがrebuildを呼び出します。
 * しかしrebuildメソッドでもpreBuildが実行されるので無限回帰となり、エラーとなるからです。
 */
class ProviderScope extends View {
    /**
     * コンストラクタ
     * @param {View} child - 子要素
     * @param {Object} props - プロップス
     * @param {Array<Provider>} watchingProviders - プロバイダーの配列
     */
    constructor({child, props = {}, watchingProviders = []}) {
        props.providers = watchingProviders;
        props.child = child;
        super(props);

        this._iterateProviders();
    }

    _iterateProviders() {
        this.props.providers.forEach(provider => {
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
