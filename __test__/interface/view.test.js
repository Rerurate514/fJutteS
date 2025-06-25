import { View } from '../../core/interface/view.js';

jest.mock('../../core/logic/generateUUID.js');

describe('View Class', () => {
	let view;
	let mockCreateWrapView;
	let mockStyledView;
	let mockEmbedScriptToView;
	let mockBuild;
	let mockPreBuild;
	let mockPostBuild;
	let mockInitialize;
	let mockTerminate;
	let mockOnDispose;
	let mockOnRendered;

	beforeEach(() => {
		mockCreateWrapView = jest.fn(() => document.createElement('div'));
		mockStyledView = jest.fn((element) => element);
		mockEmbedScriptToView = jest.fn((element) => element);
		mockBuild = jest.fn(() => undefined);
		mockPreBuild = jest.fn();
		mockPostBuild = jest.fn();
		mockInitialize = jest.fn();
		mockTerminate = jest.fn();
		mockOnDispose = jest.fn();
		mockOnRendered = jest.fn();

		class TestView extends View {
			constructor(props) {
				super(props);
			}
			createWrapView() {
				return mockCreateWrapView();
			}
			styledView(element) {
				return mockStyledView(element);
			}
			embedScriptToView(element) {
				return mockEmbedScriptToView(element);
			}
			build() {
				return mockBuild();
			}
			preBuild() {
				return mockPreBuild();
			}
			postBuild() {
				return mockPostBuild();
			}
			initialize() {
				return mockInitialize();
			}
			terminate() {
				return mockTerminate();
			}
			onDispose() {
				return mockOnDispose();
			}
			onRendered() {
				return mockOnRendered();
			}
		}

		view = new TestView();
		view.assemble();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('インスタンス化時にTypeErrorをスローする', () => {
		expect(() => new View()).toThrow(TypeError);
	});

	it('createWrapViewがHTMLElementを返す', () => {
		expect(mockCreateWrapView).toHaveBeenCalled();
	});

	it('styledViewがHTMLElementを返す', () => {
		expect(mockStyledView).toHaveBeenCalled();
	});

	it('embedScriptToViewがHTMLElementを返す', () => {
		expect(mockEmbedScriptToView).toHaveBeenCalled();
	});

	it('ライフサイクルメソッドが呼び出される', () => {
		expect(mockInitialize).toHaveBeenCalled();
		expect(mockPreBuild).toHaveBeenCalled();
		expect(mockBuild).toHaveBeenCalled();
		expect(mockPostBuild).toHaveBeenCalled();
		expect(mockTerminate).toHaveBeenCalled();
	});

	it('rebuildメソッドが呼び出されると、同じ要素と置き換えられる', () => {
		const originalView = view.view;
		view.rebuild();
		expect(originalView).toBe(view.view);
	});

	it('子要素がViewの場合、addPseudoElementが呼び出される', () => {
		class ChildView extends View {
			constructor(props) {
				super(props);
			}
			createWrapView() {
				return mockCreateWrapView();
			}
			styledView(element) {
				return mockStyledView(element);
			}
			embedScriptToView(element) {
				return mockEmbedScriptToView(element);
			}
			build() {
				return undefined;
			}
		}
		const childView = new ChildView();
		childView.assemble();
		mockBuild.mockReturnValue(childView);

		const testView = new (view.constructor)();
		testView.assemble();

		const addPseudoElementMock = jest.spyOn(childView, "addPseudoElement");
		testView.addPseudoElement();

		expect(addPseudoElementMock).toHaveBeenCalled();
	});

	it('子要素がViewの配列の場合、各要素に対してaddPseudoElementが呼び出される', () => {
		class ChildView extends View {
			constructor(props) {
				super(props);
			}
			createWrapView() {
				return mockCreateWrapView();
			}
			styledView(element) {
				return mockStyledView(element);
			}
			embedScriptToView(element) {
				return mockEmbedScriptToView(element);
			}
			build() {
				return undefined;
			}
		}
		const childView1 = new ChildView();
		const childView2 = new ChildView();
		childView1.assemble();
		childView2.assemble();

		mockBuild.mockReturnValue([childView1, childView2]);
		const addPseudoElementMock1 = jest.spyOn(childView1, "addPseudoElement");
		const addPseudoElementMock2 = jest.spyOn(childView2, "addPseudoElement");
		const testView = new (view.constructor)();
		testView.assemble();
		testView.addPseudoElement();
		expect(addPseudoElementMock1).toHaveBeenCalled();
		expect(addPseudoElementMock2).toHaveBeenCalled();
	});

	describe('updateStyle method', () => {
		let testView;
		let mockConsoleWarn;

		beforeEach(() => {
			class TestView extends View {
				constructor(props) {
					super(props);
				}
				createWrapView() {
					return document.createElement('div');
				}
				styledView(element) {
					return element;
				}
				embedScriptToView(element) {
					return element;
				}
				build() {
					return undefined;
				}
			}

			testView = new TestView();
			testView.assemble();
			
			mockConsoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});
		});

		afterEach(() => {
			mockConsoleWarn.mockRestore();
		});

		it('ViewがDOMにアタッチされていない場合、警告を出力して早期リターンする', () => {
			Object.defineProperty(testView._view, 'isConnected', {
				value: false,
				writable: true
			});

			const stylePatch = { color: 'red', fontSize: '16px' };
			testView.updateStyle(stylePatch);

			expect(mockConsoleWarn).toHaveBeenCalledWith(
				"ViewはまだDOMにアタッチされていないか、デタッチされた後です。",
				testView._view,
				false
			);
			expect(testView._view.style.color).toBe('');
			expect(testView._view.style.fontSize).toBe('');
		});

		it('ViewがDOMにアタッチされている場合、スタイルが正常に適用される', () => {
			document.body.appendChild(testView._view);

			const stylePatch = {
				color: 'red',
				fontSize: '16px',
				backgroundColor: 'blue',
				margin: '10px'
			};

			testView.updateStyle(stylePatch);

			expect(testView._view.style.color).toBe('red');
			expect(testView._view.style.fontSize).toBe('16px');
			expect(testView._view.style.backgroundColor).toBe('blue');
			expect(testView._view.style.margin).toBe('10px');
			expect(mockConsoleWarn).not.toHaveBeenCalled();

			document.body.removeChild(testView._view);
		});

		it('readOnlyPropertiesは無視される', () => {
			document.body.appendChild(testView._view);

			const stylePatch = {
				color: 'red',
				length: 100,
				parentRule: 'some rule',
				cssText: 'some css text',
				fontSize: '16px'
			};

			testView.updateStyle(stylePatch);

			expect(testView._view.style.color).toBe('red');
			expect(testView._view.style.fontSize).toBe('16px');
			expect(testView._view.style.length).not.toBe(100);
			expect(mockConsoleWarn).not.toHaveBeenCalled();

			document.body.removeChild(testView._view);
		});

		it('undefinedの値は無視される', () => {
			document.body.appendChild(testView._view);

			const stylePatch = {
				color: 'red',
				fontSize: undefined,
				backgroundColor: 'blue',
				margin: undefined
			};

			testView.updateStyle(stylePatch);

			expect(testView._view.style.color).toBe('red');
			expect(testView._view.style.backgroundColor).toBe('blue');
			expect(testView._view.style.fontSize).toBe('');
			expect(testView._view.style.margin).toBe('');
			expect(mockConsoleWarn).not.toHaveBeenCalled();

			document.body.removeChild(testView._view);
		});

		it('空のstylePatchオブジェクトでも正常に動作する', () => {
			document.body.appendChild(testView._view);

			const stylePatch = {};
			testView.updateStyle(stylePatch);

			expect(mockConsoleWarn).not.toHaveBeenCalled();

			document.body.removeChild(testView._view);
		});

		it('nullまたはundefinedのstylePatchでも正常に動作する', () => {
			document.body.appendChild(testView._view);

			testView.updateStyle(null);
			testView.updateStyle(undefined);

			expect(mockConsoleWarn).not.toHaveBeenCalled();

			document.body.removeChild(testView._view);
		});
	});
});
