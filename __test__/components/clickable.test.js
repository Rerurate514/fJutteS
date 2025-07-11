import { Clickable } from '../../jaterials/components/clickable.js';
import { BaseCSS } from '../../cssKit/baseCSS.js';
import { extendsWithoutId } from '../testScripts/matcherWithoutId.js';
import { Moc } from "../testScripts/moc.js";
import { mocOnClick, onClickMoc } from '../testScripts/onClickMoc.js';

jest.mock('../../cssKit/baseCSS', () => ({
    BaseCSS: jest.fn().mockImplementation(() => ({
      applyCSS: jest.fn(element => element)
    }))
  }));

describe('Clickable', () => {
    let clickable;
    let moc;

    beforeEach(() => {
        moc = new Moc();

        clickable = new Clickable({
            child: moc,
            baseCSS: new BaseCSS(),
            onClick: () => { }
        });

        extendsWithoutId();
    });

    describe('constructor', () => {
        test('デフォルト値で初期化できる', () => {
            const clickable = new Clickable({
                child: moc
            });

            clickable.assemble();

            expect(clickable.child).toBe(moc);
            expect(clickable.baseCSS.applyCSS).toHaveBeenCalled();
        });

        test('カスタム値で初期化できる', () => {
            const clickable = new Clickable({
                child: moc,
                baseCSS: new BaseCSS(),
                onClick: onClickMoc
            });

            clickable.assemble();

            expect(clickable.child).toBe(moc);
            expect(clickable.baseCSS.applyCSS).toHaveBeenCalled();

            mocOnClick(clickable);
        });
    });

    describe('createWrapView', () => {
        test('div要素を作成する', () => {
            const element = clickable.createWrapView();
            expect(element.tagName.toLowerCase()).toBe('div');
        });
    });

    describe('styledView', () => {
        test('基本的なスタイルを適用する', () => {
            clickable.assemble();
            expect(clickable.baseCSS.applyCSS).toHaveBeenCalled();
        });

        describe('build', () => {
            test('子要素を返す', () => {
                const clickableWithChild = new Clickable({ child: moc });
                expect(clickableWithChild.build()).toBe(moc);
            });
        });
    });
})
