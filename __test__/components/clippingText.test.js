import { ClippingText } from '../../jaterials/components/clippingText.js';
import { Moc } from "../testScripts/moc.js";
import { extendsWithoutId } from '../testScripts/matcherWithoutId.js';

jest.mock('../../cssKit/borderCSS', () => ({
    BorderCSS: jest.fn().mockImplementation(() => ({
        applyCSS: jest.fn(element => element)
    }))
}));

jest.mock('../../cssKit/webkitCSS', () => ({
    WebkitCSS: jest.fn().mockImplementation(() => ({
        applyCSS: jest.fn(element => element)
    }))
}));

describe('ClippingText', () => {
        let clipping;
        let moc;
    
        beforeEach(() => {
            moc = new Moc();
    
            clipping = new ClippingText({
                child: moc,
                background: "rgb(255, 255, 255)"
            });
    
            extendsWithoutId();
        });

    beforeEach(() => {
        clipping = new ClippingText({
            child: moc, 
            background: "rgb(255, 255, 255)"
        });
    });

    describe('constructor', () => {
        test('デフォルト値で初期化できる', () => {
            const clipping = new ClippingText({
                child: moc
            });

            expect(clipping.child).toBe(moc);
            expect(clipping.background).toBe(null);
        });

        test('カスタム値で初期化できる', () => {
            const clipping = new ClippingText({
                child: moc, 
                background: "rgb(255, 255, 255)"
            });

            expect(clipping.background).toBe("rgb(255, 255, 255)");
        });
    });

    describe('createWrapView', () => {
        test('div要素を作成する', () => {
            const element = clipping.createWrapView();
            expect(element.tagName.toLowerCase()).toBe('div');
        });
    });

    describe('styledView', () => {
        let element;

        beforeEach(() => {
            element = document.createElement('div');
        });

        test('基本的なスタイルを適用する', () => {
            const styledElement = clipping.styledView(element);

            expect(styledElement.style.width).toBe('100%');
            expect(styledElement.style.height).toBe('100%');
            expect(styledElement.style.webkitBackgroundClip).toBe('text');
        });

        test('背景色がnullの場合でもエラーにならない', () => {
            const clippingWithoutBackground = new ClippingText({
                child: moc
            });
            const element = document.createElement('div');
            const styledElement = clippingWithoutBackground.styledView(element);

            expect(styledElement.style.width).toBe('100%');
            expect(styledElement.style.height).toBe('100%');
        });
    });

    describe('build', () => {
        test('子要素を返す', () => {
            const child = new Moc();
            const clippingWithChild = new ClippingText({ child: child });
            expect(clippingWithChild.build()).toBe(child);
        });
    });
});
