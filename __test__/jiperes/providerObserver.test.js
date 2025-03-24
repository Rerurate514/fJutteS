import { ProviderObserver } from '../../jiperes/logic/observer.js';
import { Provider } from '../../jiperes/logic/provider.js';
import { Moc } from '../testScripts/moc.js';

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

    it('巨大なオブジェクトを検出できる', () => {
        const largeObject = Array(1000).fill().map((_, i) => ({ id: i, data: new Moc() }));
        const isLarge = providerObserver._isLargeObject(largeObject)
    
        expect(isLarge).toEqual(true);
    });
    
    it('巨大なオブジェクトを回避できる', () => {
        const oldValue = { key: 'old value' };
        const newValue = Array(1000).fill(new Moc());

        const logSpy = jest.spyOn(providerObserver, 'log');
        
        providerObserver.logUpdate(provider1, oldValue, newValue);

        const updateHistory = providerObserver.getAllUpdateHistory();
    
        expect(updateHistory).toHaveLength(1);
        expect(updateHistory[0].provider).toBe('provider1');
        expect(updateHistory[0].oldValue).toEqual({ key: 'old value' });
        expect(updateHistory[0].newValue).toBe('Large Object (simplified)');
    
        expect(logSpy).toHaveBeenCalledWith(
            `Update: provider1 changed from ${JSON.stringify(oldValue)} to "Large Object (simplified)"`
        );
    
        logSpy.mockRestore();
    });

    it('巨大なViewオブジェクトを回避できる', () => {
        const oldValue = { key: 'old value' };
        const newValue = new Moc();

        const logSpy = jest.spyOn(providerObserver, 'log');
        
        providerObserver.logUpdate(provider1, oldValue, newValue);

        const updateHistory = providerObserver.getAllUpdateHistory();

        expect(updateHistory).toHaveLength(1);
        expect(updateHistory[0].provider).toBe('provider1');
        expect(updateHistory[0].oldValue).toEqual({ key: 'old value' });
        expect(updateHistory[0].newValue).toBe(`${newValue.constructor.name}__viewId:${newValue.props.id}`);
    
        expect(logSpy).toHaveBeenCalledWith(
            `Update: provider1 changed from ${JSON.stringify(oldValue)} to "${newValue.constructor.name}__viewId:${newValue.props.id}"`
        );
    
        logSpy.mockRestore();
    });

    it('ログ出力を抑制できる', () => {
        const consoleSpy = jest.spyOn(console, 'log');
        providerObserver.outLogs(false);
        providerObserver.log('test message');
        expect(consoleSpy).not.toHaveBeenCalled();
        consoleSpy.mockRestore();
    });
});
