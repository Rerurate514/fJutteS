import { Card } from '../../components/card.js';
import { Chips } from '../../components/chips.js';
import { Text } from '../../components/text.js';
import { BorderCSS } from '../../models/borderCSS.js';
import { extendsWithptuId } from '../testScripts/matcherWithoutID.js';

describe('chips', () => {
  let chips;
  
  beforeEach(() => {
    chips = new Chips({
      text: "test",
      background: 'rgb(255, 255, 255)',
      borderCSS: new BorderCSS(),
    });

		extendsWithptuId();
  });

  describe('constructor', () => {
    test('デフォルト値で初期化できる', () => {
      const chips = new Chips({
        text: "test"
      });
      expect(chips.props.text).toBe("test");
      expect(chips.props.background).toBe(null);
      expect(chips.props.borderCSS).toStrictEqual(new BorderCSS());
    });

    test('カスタム値で初期化できる', () => {
      const chips = new Chips({
        text: "test",
        background: 'rgb(255, 255, 255)',
        borderCSS: new BorderCSS(),
      });
      expect(chips.props.text).toBe("test");
      expect(chips.props.background).toBe("rgb(255, 255, 255)");
      expect(chips.props.borderCSS).toStrictEqual(new BorderCSS());
    });
  });

  describe('createWrapView', () => {
    test('div要素を作成する', () => {
      const element = chips.createWrapView();
      expect(element.tagName.toLowerCase()).toBe('div');
    });
  });

  describe('styledView', () => {
    test('背景色がnullの場合でもエラーにならない', () => {
      const chipsWithoutBackground = new Chips({
        text: "test"
      });
      const element = document.createElement('div');
      const styledElement = chipsWithoutBackground.styledView(element);
      expect(styledElement.style.background).toBe('');
    });
  });

  describe('build', () => {
    test('子要素を返す', () => {
			const text = "test";
      const chipsWithChild = new Chips({
        text: text
      });
      const child = new Card({
					background: "transparent",
					child: new Text(text)
			});
      expect(chipsWithChild.build()).toMatchWithoutIds(child);;
    });
  });
});
