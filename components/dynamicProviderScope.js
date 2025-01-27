/**
 * このクラスは状態管理しなくてはならない要素が動的に変化する際に有用なコンポーネントです。
 */
export default class DynamicProviderScope extends View {
    constructor({child, props = {}}){
        props.child = child;
        props.providers = [];
        super(props);
    }

    createProvider(initialValue){
        let provider = Provider.createProvider((ref) => {
            return initialValue;
        });

        this.props.providers.push(provider);

        return provider;
    }

    refreshProviders(){
        if(!this.getBuildCompletionState()){
           throw new IllegalPreBuildDoSomothingError("Viewの構築プロセスが終了するまでrefreshProvidersメソッドを呼び出さないでください。\nView構築プロセス状態 >>> isViewAssembleProccessesCompleted = " +  this.getBuildCompletionState());
        }
        this.rebuild(this.props);
    }
}
