import { ProviderScope } from "../interface/providerScope.js";

export class LimitedProviderScope extends ProviderScope {
    constructor({
        providers = [],
        builder = () => {
            return undefined;
        }
    }) {
        super({
            providers: providers
        });
        this.providers = providers;
        this.builder = builder;
    }

    build(){
        const readArr = this.providers.map((provider) => {
            return provider.read();
        });

        return this.builder(readArr);
    }

    postBuild(){
        this.onPostBuild();
    }
    
    onPostBuild(){

    }

    preBuild(){
        this.onPreBuild();
    }

    onPreBuild(){

    }
}
