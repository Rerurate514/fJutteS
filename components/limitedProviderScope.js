import { ProviderScope } from "../interface/providerScope.js";

export class LimitedProviderScope extends ProviderScope {
    constructor({
        props = {}, 
        watchingProviders = [],
        build = (value) => {
            return undefined;
        }
    }) {
        props.providers = watchingProviders;
        props.build = build;

        props.providers.forEach(provider => {
            provider.watch(() => {
                const view = props.build(provider.read())
                this.rebuild({
                    builtView: view
                })
            },
            { immediate: false });
        });

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
