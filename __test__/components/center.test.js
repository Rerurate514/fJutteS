import { Center, _Center } from "../../jaterials/components/center.js";
import { Moc } from "../testScripts/moc.js";

describe('Center', () => {
	let center;

	beforeEach(() => {
		center = new Center({
			child: new Moc()
		});
	});

	describe('constructor', () => {
		test('子要素を正しく初期化できる', () => {
			const child = new Moc();
			const center = new Center(child);
			expect(center.child).toBe(child);
		});
	});

	describe('createWrapView', () => {
		test('div要素を作成する', () => {
			const element = center.createWrapView();
			expect(element.tagName.toLowerCase()).toBe('div');
		});
	});

	describe('styledView', () => {
		let element;

		beforeEach(() => {
			element = document.createElement('div');
		});

		test('スタイルを正しく適用する', () => {
			const styledElement = center.styledView(element);

			expect(styledElement.style.width).toBe('100%');
			expect(styledElement.style.height).toBe('100%');
			expect(styledElement.style.textAlign).toBe('center');
			expect(styledElement.style.justifyContent).toBe('center');
			expect(styledElement.style.display).toBe('flex');
			expect(styledElement.style.alignItems).toBe('center');
			expect(styledElement.style.borderRadius).toBe('inherit');
		});
	});

	describe('build', () => {
		test('子要素を返す', () => {
			const child = new Moc();
			const center = new _Center(child);
			expect(center.build()).toBe(child);
		});
	});
});

describe('_Center', () => {
	let _center;

	beforeEach(() => {
		_center = new _Center({
			child: new Moc()
		});
	});

	describe('constructor', () => {
		test('子要素を正しく初期化できる', () => {
			const child = new Moc();
			const _center = new _Center(child);
			expect(_center.child).toBe(child);
		});
	});

	describe('createWrapView', () => {
		test('div要素を作成する', () => {
			const element = _center.createWrapView();
			expect(element.tagName.toLowerCase()).toBe('div');
		});
	});

	describe('styledView', () => {
		let element;

		beforeEach(() => {
			element = document.createElement('div');
		});

		test('スタイルを正しく適用する', () => {
			const styledElement = _center.styledView(element);

			expect(styledElement.style.margin).toBe('auto');
			expect(styledElement.style.borderRadius).toBe('inherit');
		});
	});

	describe('build', () => {
		test('子要素を返す', () => {
			const child = document.createElement("div");
			const _center = new _Center(child);
			expect(_center.build()).toBe(child);
		});
	});
});
