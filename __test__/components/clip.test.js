import { Clip } from '../../components/clip.js';
import { BaseCSS } from '../../enums/baseCSS.js';
import { extendsWithoutId } from '../testScripts/matcherWithoutId.js';
import { Moc } from "../testScripts/moc.js";

jest.mock('../../enums/baseCSS', () => ({
    BaseCSS: jest.fn().mockImplementation(() => ({
        applyCSS: jest.fn(element => element)
    }))
}));

describe('Clip', () => {
    let clip;
    let moc;

    beforeEach(() => {
        moc = new Moc();

        clip = new Clip({
            child: moc,
            baseCSS: new BaseCSS()
        });

        extendsWithoutId();
    });

    describe('constructor', () => {
        test('デフォルト値で初期化できる', () => {
            const clip = new Clip({
                child: moc
            });

            expect(clip.props.baseCSS.applyCSS).toHaveBeenCalled();
        });

        test('カスタム値で初期化できる', () => {
            const clip = new Clip({
                child: moc,
                baseCSS: new BaseCSS()
            });
            
            expect(clip.props.child).toBe(moc);
            expect(clip.props.baseCSS.applyCSS).toHaveBeenCalled();
        });
    });

    describe('createWrapView', () => {
        test('div要素を作成する', () => {
            const element = clip.createWrapView();
            expect(element.tagName.toLowerCase()).toBe('div');
        });
    });

    describe('styledView', () => {
        let element;

        beforeEach(() => {
            element = document.createElement('div');
        });

        test('基本的なスタイルを適用する', () => {
            const styledElement = clip.styledView(element);

            expect(styledElement.style.overflow).toBe('hidden');
        });
    });

    describe('build', () => {
        test('子要素を返す', () => {
            const boxWithChild = new Clip({ child: moc });
            expect(boxWithChild.build()).toBe(moc);
        });
    });
});
