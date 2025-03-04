import { ProviderObserver } from '../../jiperes/observer.js';
import { Provider } from '../../jiperes/provider.js';

describe('ProviderObserver', () => {
    let providerObserver;
    let provider1;
    let provider2;

    beforeEach(() => {
        ProviderObserver.clearInstance();
        providerObserver = new ProviderObserver();
        provider1 = Provider.createProvider(() => 1, 'provider1');
        provider2 = Provider.createProvider(() => 2, 'provider2');
    });

    it('シングルトンとして動作する', () => {
        const providerObserver2 = new ProviderObserver();
        expect(providerObserver).toBe(providerObserver2);
    });

    it('依存関係を追加できる', () => {
        providerObserver.addDependency(provider1, provider2);
        const dependencyGraph = providerObserver.getDependencyGraph();
        expect(dependencyGraph['provider1']).toEqual(['provider2']);
    });

    it('依存関係を削除できる', () => {
        providerObserver.addDependency(provider1, provider2);
        providerObserver.deleteDependency(provider1, provider2);
        const dependencyGraph = providerObserver.getDependencyGraph();

        expect(dependencyGraph['provider1']).toEqual([]);
    });

    it('更新履歴を記録できる', () => {
        providerObserver.logUpdate(provider1, 1, 2);
        const updateHistory = providerObserver.getAllUpdateHistory();
        expect(updateHistory.length).toBe(1);
        expect(updateHistory[0].provider).toBe('provider1');
        expect(updateHistory[0].oldValue).toBe(1);
        expect(updateHistory[0].newValue).toBe(2);
    });

    it('更新履歴をフィルタリングできる', () => {
        providerObserver.logUpdate(provider1, 1, 2);
        providerObserver.logUpdate(provider2, 2, 3);
        const filteredHistory = providerObserver.getFilteredUpdateHistory(provider1);
        expect(filteredHistory.length).toBe(1);
        expect(filteredHistory[0].provider).toBe('provider1');
    });

    it('ログ出力を抑制できる', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        providerObserver.outLogs(false);
        providerObserver.log('test message');
        expect(consoleSpy).not.toHaveBeenCalled();
        consoleSpy.mockRestore();
    });
});
