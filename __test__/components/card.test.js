import { Card } from '../../jaterials/components/card.js';
import { ShadowLevel } from '../../jaterials/enums/shadowLevel.js';
import { BaseCSS } from '../../cssKit/baseCSS.js';
import { WebkitCSS } from '../../cssKit/webkitCSS.js';
import { Moc } from "../testScripts/moc.js";

describe('Card', () => {
	let card;

	beforeEach(() => {
		card = new Card({
			child: new Moc(),
			radius: '4px',
			baseCSS: new BaseCSS(),
			background: 'rgb(255, 255, 255)',
			elevation: ShadowLevel.LVL1,
			webkitCSS: new WebkitCSS()
		});
	});

	describe('constructor', () => {
		test('デフォルト値で初期化できる', () => {
			const card = new Card({
				child: new Moc()
			});
			expect(card.props.radius).toBe('inherit');
			expect(card.props.background).toBeNull();
			expect(card.props.elevation).toBe(ShadowLevel.LVL0);
		});

		test('カスタム値で初期化できる', () => {
			const card = new Card({
				child: new Moc(),
				radius: '8px',
				background: 'rgb(0, 0, 0)',
				elevation: ShadowLevel.LVL1
			});
			expect(card.props.radius).toBe('8px');
			expect(card.props.background).toBe('rgb(0, 0, 0)');
			expect(card.props.elevation).toBe(ShadowLevel.LVL1);
		});
	});

	describe('createWrapView', () => {
		test('div要素を作成する', () => {
			const element = card.createWrapView();
			expect(element.tagName.toLowerCase()).toBe('div');
		});
	});

	describe('styledView', () => {
		let element;

		beforeEach(() => {
			element = document.createElement('div');
		});

		test('基本的なスタイルを適用する', () => {
			const styledElement = card.styledView(element);

			expect(styledElement.style.borderRadius).toBe('4px');
			expect(styledElement.style.background).toBe('rgb(255, 255, 255)');
			expect(styledElement.style.boxShadow).toBe(ShadowLevel.LVL1.value);
		});

		test('背景色がnullの場合でもエラーにならない', () => {
			const cardWithoutBackground = new Card({
				child: new Moc(),
				radius: '4px'
			});
			const element = document.createElement('div');;
			const styledElement = cardWithoutBackground.styledView(element);
			expect(styledElement.style.borderRadius).toBe('4px');
		});
	});

	describe('build', () => {
		test('子要素を返す', () => {
			const child = new Moc();
			const cardWithChild = new Card({ child });
			expect(cardWithChild.build()).toBe(child);
		});
	});
});
