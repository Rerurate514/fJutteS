export class ProviderObserver {
    constructor() {
        if (!ProviderObserver.instance) {
            ProviderObserver.instance = this;
            this.dependencyGraph = new Map();
            this.updateHistory = [];
        }

        return ProviderObserver.instance;
    }

    outLogs(isOutedLog = true) {
        this._isOutedLog = isOutedLog;
    }

    addDependency(childProvider, parentProvider) {
        if (!this.dependencyGraph.has(childProvider)) {
            this.dependencyGraph.set(childProvider, new Set());
        }
        this.dependencyGraph.get(childProvider).add(parentProvider);
        this.log(`Dependency added: ${this._getProviderInfo(childProvider)} depends on ${this._getProviderInfo(parentProvider)}`);
    }

    deleteDependency(childProvider, parentProvider) {
        if (this.dependencyGraph.has(childProvider)) {
            this.dependencyGraph.get(childProvider).delete(parentProvider);
        }
        this.log(`Dependency deleted: ${this._getProviderInfo(childProvider)} unsubscribed ${this._getProviderInfo(parentProvider)}`);
    }

    _isLargeObject(obj, maxSize = 1024 * 10) {
        try {
            const sizeInBytes = new Blob([obj]).size;
            return sizeInBytes > maxSize;
        } catch (error) {
            console.error('オブジェクトの解析中にエラーが発生しました:', error);
            return true;
        }
    }
    
    logUpdate(provider, oldValue, newValue) {
        const simplifiedOldValue = this._simplifyObject(oldValue);
        const simplifiedNewValue = this._simplifyObject(newValue);
    
        const record = {
            timestamp: new Date(),
            provider: provider.name,
            oldValue: simplifiedOldValue,
            newValue: simplifiedNewValue,
            stackTrace: this._getStackTrace()
        };
    
        this.updateHistory.push(record);
    
        this.log(`Update: ${record.provider} changed`, {
            from: simplifiedOldValue, 
            to: simplifiedNewValue
        });
    }

    _simplifyObject(obj, depth = 2) {
        if (depth === 0 || obj === null || typeof obj !== 'object') {
            return obj;
        }
    
        if (Array.isArray(obj)) {
            return obj.length > 10 
                ? `[Array with ${obj.length} items]` 
                : obj.map(item => this._simplifyObject(item, depth - 1));
        }
    
        const simplified = {};
        for (const [key, value] of Object.entries(obj)) {
            if (key.startsWith('_') || key === 'viewCache' || key === 'view' || key === 'child' || key === 'isLogOut' || key === 'id') continue;
            
            if (typeof value === 'object' && value !== null) {
                simplified[key] = this._simplifyObject(value, depth - 1);
            } else {
                simplified[key] = value;
            }
        }
    
        return simplified;
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
        if (!this._isOutedLog) return;
        console.log(`[ProviderObserver] ${message}`);
    }

    static clearInstance() {
        ProviderObserver.instance = null;
    }
}
