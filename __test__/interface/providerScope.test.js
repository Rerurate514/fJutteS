import { Provider } from '../../Jiperes/provider.js';
import { ProviderScope } from '../../interface/providerScope.js';
import { Moc } from '../testScripts/moc.js';

class MyProviderScope extends ProviderScope {
    constructor({ child, watchingProviders, props = {} }) {
        super({ child, watchingProviders, props });
    }

    createWrapView() {
        return document.createElement("div");
    }
}

describe('ProviderScope', () => {
    let mockChild;
    let mockProvider;
    let providerScope;

    beforeEach(() => {
        mockChild = new Moc();
        mockProvider = Provider.createProvider(() => 0);
    });

    it('適切なプロパティで初期化される', () => {
        providerScope = new MyProviderScope({
            child: mockChild,
            watchingProviders: [mockProvider],
        });

        expect(providerScope.props.child).toBe(mockChild);
        expect(providerScope.props.providers).toEqual([mockProvider]);
    });

    it('各プロバイダーに対してwatchが呼び出される', () => {
        const watchSpy = jest.spyOn(mockProvider, 'watch');
        
        providerScope = new MyProviderScope({
            child: mockChild,
            watchingProviders: [mockProvider],
        });

        expect(watchSpy).toHaveBeenCalled();
        watchSpy.mockRestore();
    });

    it('immediateがfalseの場合、初期化時にrebuildが呼び出されない', () => {
        providerScope = new MyProviderScope({
            child: mockChild,
            watchingProviders: [mockProvider],
        });

        const rebuildSpy = jest.spyOn(providerScope, 'rebuild');

        expect(rebuildSpy).not.toHaveBeenCalled();
        rebuildSpy.mockRestore();
    });

    it('プロバイダーが更新されたときにrebuildが呼び出される', () => {
        providerScope = new MyProviderScope({
            child: mockChild,
            watchingProviders: [mockProvider],
        });

        const rebuildSpy = jest.spyOn(providerScope, 'rebuild');
        mockProvider.update(() => 1);
        expect(rebuildSpy).toHaveBeenCalledTimes(1);
        rebuildSpy.mockRestore();
    });

    it('親クラスに適切なプロパティが渡される', () => {
        const props = { test: 'test' };
        providerScope = new MyProviderScope({
            child: mockChild,
            props: props,
            watchingProviders: [mockProvider],
        });

        expect(providerScope.props.test).toBe('test');
        expect(providerScope.props.child).toBe(mockChild);
        expect(providerScope.props.providers).toEqual([mockProvider]);
    });
});
