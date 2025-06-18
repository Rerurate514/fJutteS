import { Card } from '../../jaterials/components/card.js';
import { Chips } from '../../jaterials/components/chips.js';
import { Text } from '../../jaterials/components/text.js';
import { BorderCSS } from '../../cssKit/borderCSS.js';
import { extendsWithoutId } from '../testScripts/matcherWithoutId.js';

describe('chips', () => {
	let chips;

	beforeEach(() => {
		chips = new Chips({
			text: "test",
			background: 'rgb(255, 255, 255)',
			borderCSS: new BorderCSS(),
		});

		extendsWithoutId();
	});

	describe('constructor', () => {
		test('デフォルト値で初期化できる', () => {
			const chips = new Chips({
				text: "test"
			});
			expect(chips.text).toBe("test");
			expect(chips.background).toBe(null);
			expect(chips.borderCSS).toStrictEqual(new BorderCSS());
		});

		test('カスタム値で初期化できる', () => {
			const chips = new Chips({
				text: "test",
				background: 'rgb(255, 255, 255)',
				borderCSS: new BorderCSS(),
			});
			expect(chips.text).toBe("test");
			expect(chips.background).toBe("rgb(255, 255, 255)");
			expect(chips.borderCSS).toStrictEqual(new BorderCSS());
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
