import { Column } from '../../components/column.js';
import { BaseCSS } from '../../cssKit/baseCSS.js';
import { extendsWithoutId } from '../testScripts/matcherWithoutId.js';
import { Moc } from "../testScripts/moc.js";

jest.mock('../../cssKit/baseCSS', () => ({
    BaseCSS: jest.fn().mockImplementation(() => ({
        applyCSS: jest.fn(element => element)
    }))
}));


describe('Column', () => {
    let column;
    let moc;
    let children;

    beforeEach(() => {
        moc = new Moc();
        children = [ moc, moc, moc ];

        column = new Column({
            baseCSS: new BaseCSS(),
            isHorizontalCenter: true,
            children: children
        });

        extendsWithoutId();
    });

    describe('constructor', () => {
        test('デフォルト値で初期化できる', () => {
            const column = new Column({ children: children });

            expect(column.props.baseCSS.applyCSS).toHaveBeenCalled();
            expect(column.props.isHorizontalCenter).toBe(false);
        });

        test('カスタム値で初期化できる', () => {
            const column = new Column({
                baseCSS: new BaseCSS(),
                isHorizontalCenter: true,
                children: children
            });

            expect(column.props.baseCSS.applyCSS).toHaveBeenCalled();
            expect(column.props.isHorizontalCenter).toBe(true);
            expect(column.props.children).toBe(children);
        });
    });

    describe('createWrapView', () => {
        test('div要素を作成する', () => {
            const element = column.createWrapView();
            expect(element.tagName.toLowerCase()).toBe('div');
        });
    });

    describe('styledView', () => {
        let element;

        beforeEach(() => {
            element = document.createElement('div');
        });

        test('基本的なスタイルを適用する', () => {
            const styledElement = column.styledView(element);

            expect(styledElement.style.display).toBe('flex');
            expect(styledElement.style.flexDirection).toBe('column');
            expect(styledElement.style.alignItems).toBe('center');

            expect(column.props.baseCSS.applyCSS).toHaveBeenCalled();
        });
    });

    describe('build', () => {
        test('子要素を返す', () => {
            const columnWithChildren= new Column({ children: children });
            expect(columnWithChildren.build()).toBe(children);
        });
    });
});
