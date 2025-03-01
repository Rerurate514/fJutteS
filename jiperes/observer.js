export class ProviderObserver {
    constructor() {
        if (!ProviderObserver.instance) {
            ProviderObserver.instance = this;
            this.dependencyGraph = new Map();
            this.updateHistory = [];
        }

        return ProviderObserver.instance;
    }

    outLogs(isOutedLog = true){
        this._isOutedLog = isOutedLog;
    }

    addDependency(childProvider, parentProvider) {
        if (!this.dependencyGraph.has(childProvider)) {
            this.dependencyGraph.set(childProvider, new Set());
        }
        this.dependencyGraph.get(childProvider).add(parentProvider);
        this.log(`Dependency added: ${this._getProviderInfo(childProvider)} depends on ${this._getProviderInfo(parentProvider)}`);
    }

    deleteDependency(childProvider, parentProvider){
        if (this.dependencyGraph.has(childProvider)) {
            this.dependencyGraph.get(childProvider).delete(parentProvider);
        }
        this.log(`Dependency deleted: ${this._getProviderInfo(childProvider)} unsubscribed ${this._getProviderInfo(parentProvider)}`);
    }

    logUpdate(provider, oldValue, newValue) {
        const maxLength = 1000;
        const truncatedNewValue = typeof newValue === 'string' && newValue.length > maxLength
            ? newValue.substring(0, maxLength) + '... this value is substringed because too much big'
            : newValue;

        const record = {
            timestamp: new Date,
            provider: provider.name,
            oldValue: oldValue,
            newValue: truncatedNewValue,
            stackTrace: this._getStackTrace()
        };

        console.log(truncatedNewValue)

        this.updateHistory.push(record);
        this.log(`Update: ${record.provider} changed from ${JSON.stringify(oldValue)} to ${JSON.stringify(truncatedNewValue)}`);
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
        return provider.name;
    }

    _getStackTrace() {
        const stackTrace = new Error().stack.toString();
        return stackTrace.substr(13, stackTrace.length);
    }

    log(message) {
        if(!this._isOutedLog) return;
        console.log(`[ProviderObserver] ${message}`);
    }

    static clearInstance() {
        ProviderObserver.instance = null;
    }
}
