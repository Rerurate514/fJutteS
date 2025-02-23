import { ProviderScope } from "../interface/providerScope.js";

export class LimitedProviderScope extends ProviderScope {
    constructor({
        props = {}, 
        watchingProviders = [],
        build = () => {
            return undefined;
        }
    }) {
        props.providers = watchingProviders;
        props.build = build;

        super({
            props: props,
            watchingProviders: props.providers
        });
    }

    createWrapView(){
        return document.createElement("div");
    }

    build(){
        const readArr = this.props.providers.map((provider) => {
            return provider.read();
        });

        return this.props.build(readArr);
    }
}
