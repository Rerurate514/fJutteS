import { Box } from '../../components/box.js';
import { Text } from '../../components/text.js';
import { BorderCSS } from '../../models/borderCSS.js';
import { WebkitCSS } from '../../enums/webkitCSS.js';

jest.mock('../../models/borderCSS', () => ({
  BorderCSS: jest.fn().mockImplementation(() => ({
    applyCSS: jest.fn(element => element)
  }))
}));

jest.mock('../../enums/webkitCSS', () => ({
  WebkitCSS: jest.fn().mockImplementation(() => ({
    applyCSS: jest.fn(element => element)
  }))
}));

describe('Box', () => {
  let box;
  
  beforeEach(() => {
    box = new Box({
      width: '100px',
      height: '200px',
      background: 'rgb(255, 255, 255)',
      borderCSS: new BorderCSS(),
      webkitCSS: new WebkitCSS()
    });
  });

  describe('constructor', () => {
    test('デフォルト値で初期化できる', () => {
      const box = new Box({});
      expect(box.props.width).toBe('0px');
      expect(box.props.height).toBe('0px');
    });

    test('カスタム値で初期化できる', () => {
      const box = new Box({
        width: '50px',
        height: '100px',
        background: 'rgb(0, 0, 0)'
      });
      expect(box.props.width).toBe('50px');
      expect(box.props.height).toBe('100px');
      expect(box.props.background).toBe('rgb(0, 0, 0)');
    });
  });

  describe('createWrapView', () => {
    test('div要素を作成する', () => {
      const element = box.createWrapView();
      expect(element.tagName.toLowerCase()).toBe('div');
    });
  });

  describe('styledView', () => {
    let element;

    beforeEach(() => {
      element = document.createElement('div');
    });

    test('基本的なスタイルを適用する', () => {
      const styledElement = box.styledView(element);
      
      expect(styledElement.style.width).toBe('100px');
      expect(styledElement.style.height).toBe('200px');
      expect(styledElement.style.background).toBe('rgb(255, 255, 255)');

      expect(box.props.borderCSS.applyCSS).toHaveBeenCalled();
      expect(box.props.webkitCSS.applyCSS).toHaveBeenCalled();
    });

    test('背景色がnullの場合でもエラーにならない', () => {
      const boxWithoutBackground = new Box({
        width: '100px',
        height: '200px'
      });
      const element = document.createElement('div');
      const styledElement = boxWithoutBackground.styledView(element);
      expect(styledElement.style.width).toBe('100px');
      expect(styledElement.style.height).toBe('200px');
    });
  });

  describe('build', () => {
    test('子要素を返す', () => {
      const text = new Text("test");
      const boxWithChild = new Box({ child: text });
      expect(boxWithChild.build()).toBe(text);
    });

    test('子要素がnullの場合はnullを返す', () => {
      const boxWithoutChild = new Box({});
      expect(boxWithoutChild.build()).toBeNull();
    });
  });
});
