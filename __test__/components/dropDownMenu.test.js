import { DropDownMenu, DropDownMenuItem, DropDownMenuItemGroup } from '../../components/dropDownMenu.js';
import { BaseCSS } from '../../cssKit/baseCSS.js';
import { Provider } from '../../jiperes/logic/provider.js';
import { Moc } from '../testScripts/moc.js';

describe('DropDownMenu', () => {
    let menu;
    let mockProvider;
    let mockBaseCSS;

    beforeEach(() => {
        mockProvider = Provider.createProvider(() => {
            return "";
        });
        mockBaseCSS = new BaseCSS();
        menu = new DropDownMenu({
            item: [],
            baseCSS: mockBaseCSS,
            provider: mockProvider
        });
    });

    describe('constructor', () => {
        test('デフォルト値で初期化できる', () => {
            const menu = new DropDownMenu({
                provider: mockProvider
            });
            expect(menu.props.item).toEqual([]);
            expect(menu.props.baseCSS).toBeInstanceOf(BaseCSS);
        });

        test('カスタム値で初期化できる', () => {
            const items = [new Moc(), new Moc()];
            const menu = new DropDownMenu({
                item: items,
                baseCSS: mockBaseCSS,
                provider: mockProvider
            });
            expect(menu.props.item).toBe(items);
            expect(menu.props.baseCSS).toBe(mockBaseCSS);
        });
    });

    describe('createWrapView', () => {
        test('select要素を作成する', () => {
            const element = menu.createWrapView();
            expect(element.tagName.toLowerCase()).toBe('select');
        });
    });

    describe('styledView', () => {
        test('基本的なスタイルを適用する', () => {
            const element = document.createElement('select');
            const styledElement = menu.styledView(element);
            expect(styledElement).toBe(element);
        });
    });

    describe('embedScriptToView', () => {
        test('changeイベントリスナーを追加する', () => {
            const element = document.createElement('select');
            const changeSpy = jest.spyOn(element, 'addEventListener');
            menu.embedScriptToView(element);
            
            expect(changeSpy).toHaveBeenCalledWith('change', expect.any(Function));
        });

        test('プロバイダーのupdateが正しく呼び出される', () => {
            const element = document.createElement('select');
            menu.embedScriptToView(element);
        
            element.dispatchEvent(new Event('change', { bubbles: true }));

            const updateSpy = jest.spyOn(mockProvider, "update");
            mockProvider.update(() => "test");
            
            expect(updateSpy).toHaveBeenCalled();
            expect(mockProvider.read()).toBe('test');

            updateSpy.mockRestore();
        });
    });

    describe('build', () => {
        test('メニュー項目を返す', () => {
            const items = [new Moc(), new Moc()];
            menu = new DropDownMenu({
                item: items,
                provider: mockProvider
            });
            expect(menu.build()).toBe(items);
        });
    });
});

describe('DropDownMenuItem', () => {
    let menuItem;
    let mockText;
    let mockValue;

    beforeEach(() => {
        mockText = 'テスト項目';
        mockValue = 'test-value';
        menuItem = new DropDownMenuItem({
            text: mockText,
            value: mockValue
        });
    });

    describe('constructor', () => {
        test('テキストと値で初期化できる', () => {
            expect(menuItem.props.text).toBe(mockText);
            expect(menuItem.props.value).toBe(mockValue);
        });
    });

    describe('createWrapView', () => {
        test('option要素を作成する', () => {
            const element = menuItem.createWrapView();
            expect(element.tagName.toLowerCase()).toBe('option');
        });
    });

    describe('styledView', () => {
        test('テキストと値を設定する', () => {
            const element = document.createElement('option');
            const styledElement = menuItem.styledView(element);
            
            expect(styledElement.textContent).toBe(mockText);
            expect(styledElement.value).toBe(mockValue);
        });
    });
});

describe('DropDownMenuItemGroup', () => {
    let menuGroup;
    let mockItems;

    beforeEach(() => {
        mockItems = [new Moc(), new Moc()];
        menuGroup = new DropDownMenuItemGroup({
            item: mockItems
        });
    });

    describe('constructor', () => {
        test('デフォルト値で初期化できる', () => {
            const group = new DropDownMenuItemGroup({
                item: mockItems
            });

            expect(group.props.item).toEqual(mockItems);
        });

        test('メニュー項目リストで初期化できる', () => {
            expect(menuGroup.props.item).toBe(mockItems);
        });
    });

    describe('createWrapView', () => {
        test('optgroup要素を作成する', () => {
            const element = menuGroup.createWrapView();
            expect(element.tagName.toLowerCase()).toBe('optgroup');
        });
    });
});
