import { DropDownMenu, DropDownMenuItem, DropDownMenuItemGroup } from '../../components/dropDownMenu.js';
import { BaseCSS } from '../../enums/baseCSS.js';
import { View } from '../../interface/view.js';

describe('DropDownMenu', () => {
  let dropDownMenu: DropDownMenu;
  let mockProvider: any;
  let mockItem: DropDownMenuItem[];

  beforeEach(() => {
    mockProvider = {
      update: jest.fn(),
    };
    mockItem = [
      new DropDownMenuItem({ text: 'Option 1', value: 'value1' }),
      new DropDownMenuItem({ text: 'Option 2', value: 'value2' }),
    ];
    dropDownMenu = new DropDownMenu({
      item: mockItem,
      baseCSS: new BaseCSS(),
      provider: mockProvider,
    });
  });

  describe('constructor', () => {
    test('propsが正しく初期化される', () => {
      expect(dropDownMenu.props.item).toEqual(mockItem);
      expect(dropDownMenu.props.provider).toBe(mockProvider);
      expect(dropDownMenu.props.baseCSS).toBeInstanceOf(BaseCSS);
    });
  });

  describe('createWrapView', () => {
    test('select要素を作成する', () => {
      const element = dropDownMenu.createWrapView();
      expect(element.tagName.toLowerCase()).toBe('select');
    });
  });

  describe('styledView', () => {
    test('BaseCSSが適用される', () => {
      const element = document.createElement('select');
      const mockBaseCSS = {
        applyCSS: jest.fn().mockReturnValue(element),
      };
      dropDownMenu.props.baseCSS = mockBaseCSS as any;
      dropDownMenu.styledView(element);
      expect(mockBaseCSS.applyCSS).toHaveBeenCalledWith(element);
    });
  });

  describe('embedScriptToView', () => {
    test('changeイベントリスナーが追加される', () => {
      const element = document.createElement('select');
      dropDownMenu.embedScriptToView(element);
      const event = new Event('change');
      Object.defineProperty(event, 'target', { value: { value: 'newValue' }, writable: false });
      element.dispatchEvent(event);
      expect(mockProvider.update).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  describe('build', () => {
    test('itemを返す', () => {
      expect(dropDownMenu.build()).toEqual(mockItem);
    });
  });
});

describe('DropDownMenuItem', () => {
  let dropDownMenuItem: DropDownMenuItem;

  beforeEach(() => {
    dropDownMenuItem = new DropDownMenuItem({ text: 'Test Item', value: 'testValue' });
  });

  describe('constructor', () => {
    test('propsが正しく初期化される', () => {
      expect(dropDownMenuItem.props.text).toBe('Test Item');
      expect(dropDownMenuItem.props.value).toBe('testValue');
    });
  });

  describe('createWrapView', () => {
    test('option要素を作成する', () => {
      const element = dropDownMenuItem.createWrapView();
      expect(element.tagName.toLowerCase()).toBe('option');
    });
  });

  describe('styledView', () => {
    test('テキストと値が正しく設定される', () => {
      const element = document.createElement('option');
      dropDownMenuItem.styledView(element);
      expect(element.textContent).toBe('Test Item');
      expect(element.value).toBe('testValue');
    });
  });
});

describe('DropDownMenuItemGroup', () => {
  let dropDownMenuItemGroup: DropDownMenuItemGroup;
  let mockItems: DropDownMenuItem[];

  beforeEach(() => {
    mockItems = [
      new DropDownMenuItem({ text: 'Group Item 1', value: 'groupValue1' }),
      new DropDownMenuItem({ text: 'Group Item 2', value: 'groupValue2' }),
    ];
    dropDownMenuItemGroup = new DropDownMenuItemGroup({ item: mockItems });
  });

  describe('constructor', () => {
    test('propsが正しく初期化される', () => {
      expect(dropDownMenuItemGroup.props.item).toEqual(mockItems);
    });
  });

  describe('createWrapView', () => {
    test('optgroup要素を作成する', () => {
      const element = dropDownMenuItemGroup.createWrapView();
      expect(element.tagName.toLowerCase()).toBe('optgroup');
    });
  });
});
