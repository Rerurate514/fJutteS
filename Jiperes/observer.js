export class ProviderObserver {
    constructor(isLogOut = false) {
        if (!ProviderObserver.instance) {
            ProviderObserver.instance = this;
            this.dependencyGraph = new Map();
            this.updateHistory = [];
        }

        this._isLogOut = isLogOut;
        return ProviderObserver.instance;
    }

    addDependency(childProvider, parentProvider) {
        if (!this.dependencyGraph.has(childProvider)) {
            this.dependencyGraph.set(childProvider, new Set());
        }
        this.dependencyGraph.get(childProvider).add(parentProvider);
        this.log(`Dependency added: ${this._getProviderInfo(childProvider)} depends on ${this._getProviderInfo(parentProvider)}`);
    }

    deleteDependency(childProvider, parentProvider){
        if (!this.dependencyGraph.has(childProvider)) {
            this.dependencyGraph.get(childProvider).delete(parentProvider);
        }
        this.log(`Dependency deleted: ${this._getProviderInfo(childProvider)} unsubscribed ${this._getProviderInfo(parentProvider)}`);
    }

    logUpdate(provider, oldValue, newValue) {
        const updateInfo = {
            timestamp: new Date(),
            provider: this._getProviderInfo(provider),
            oldValue,
            newValue,
            stackTrace: this._getStackTrace()
        };
        this.updateHistory.push(updateInfo);
        this.log(`Update: ${updateInfo.provider} changed from ${JSON.stringify(oldValue)} to ${JSON.stringify(newValue)}`);
    }

    getDependencyGraph() {
        const graph = {};
        this.dependencyGraph.forEach((dependencies, provider) => {
            graph[this._getProviderInfo(provider)] = Array.from(dependencies).map(dep => this._getProviderInfo(dep));
        });
        return graph;
    }

    getAllUpdateHistory() {
        return this.updateHistory;
    }

    getFilteredUpdateHistory(provider) {
        return this.updateHistory.filter((history) => 
            history.provider === this._getProviderInfo(provider)
        );
    }

    _getProviderInfo(provider) {
        return provider.constructor.name + ':' + provider.name;
    }

    _getStackTrace() {
        const error = new Error();
        return error.stack;
    }

    log(message) {
        if(!this._isLogOut) return;
        console.log(`[ProviderObserver] ${message}`);
    }

    static clearInstance() {
        ProviderObserver.instance = null;
    }
}
