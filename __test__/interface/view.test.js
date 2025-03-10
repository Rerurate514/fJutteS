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

	it('getBuildCompletionStateがtrueを返す', () => {
		expect(view.getBuildCompletionState()).toBe(true);
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
		mockBuild.mockReturnValue(childView);
		const testView = new (view.constructor)();
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
		mockBuild.mockReturnValue([childView1, childView2]);
		const addPseudoElementMock1 = jest.spyOn(childView1, "addPseudoElement");
		const addPseudoElementMock2 = jest.spyOn(childView2, "addPseudoElement");
		const testView = new (view.constructor)();
		testView.addPseudoElement();
		expect(addPseudoElementMock1).toHaveBeenCalled();
		expect(addPseudoElementMock2).toHaveBeenCalled();
	});
});
