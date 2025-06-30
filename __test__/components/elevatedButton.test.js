import { ElevatedButton } from '../../jaterials/components/elevatedButton.js';
import { BaseCSS } from '../../cssKit/baseCSS.js';
import { Center } from '../../jaterials/components/center.js';
import { Hover } from '../../jaterials/components/hover.js';

describe('ElevatedButton', () => {
    let button;
    let mockChild;
    let mockBaseCSS;
    let mockOnClick;

    beforeEach(() => {
        mockChild = document.createElement('div');
        mockBaseCSS = new BaseCSS();
        mockOnClick = jest.fn();
        button = new ElevatedButton({
            child: mockChild,
            radius: '4px',
            baseCSS: mockBaseCSS,
            onClick: mockOnClick
        });
    });

    describe('constructor', () => {
        test('デフォルト値で初期化できる', () => {
            const button = new ElevatedButton({
                child: mockChild
            });
            expect(button.radius).toBe('inherit');
            expect(button.baseCSS).toBeInstanceOf(BaseCSS);
            expect(typeof button.onClick).toBe('function');
        });

        test('カスタム値で初期化できる', () => {
            const button = new ElevatedButton({
                child: mockChild,
                radius: '8px',
                baseCSS: mockBaseCSS,
                onClick: mockOnClick
            });
            expect(button.radius).toBe('8px');
            expect(button.baseCSS).toBe(mockBaseCSS);
            expect(button.onClick).toBe(mockOnClick);
        });
    });

    describe('createWrapView', () => {
        test('div要素を作成する', () => {
            const element = button.createWrapView();
            expect(element.tagName.toLowerCase()).toBe('div');
        });
    });

    describe('styledView', () => {
        test('border-radiusを適用する', () => {
            const element = document.createElement('div');
            const styledElement = button.styledView(element);
            expect(styledElement.style.borderRadius).toBe('4px');
        });
    });

    describe('embedScriptToView', () => {
        test('clickイベントリスナーを追加する', () => {
            const element = document.createElement('div');
            const addEventListenerSpy = jest.spyOn(element, 'addEventListener');
            button.embedScriptToView(element);
            
            expect(addEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function));
        });

        test('onClickが正しく呼び出される', () => {
            const element = document.createElement('div');
            button.embedScriptToView(element);
            
            element.dispatchEvent(new Event('click'));
            
            expect(mockOnClick).toHaveBeenCalled();
        });
    });
});
