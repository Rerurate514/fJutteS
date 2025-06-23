/**
 * devMode変数
 * ## OverView
 * fJuttesフレームワークの現在の開発モードの状態を示すグローバル変数です。
 * `true`の場合、開発者向けのデバッグ機能が有効になります（例: 各ViewにView名とランダムな背景色が付与される）。
 * デフォルトは`false`です。
 */
export let devMode = false;

/**
 * setupDevMode関数
 * ## OverView
 * fJuttesフレームワークの開発モードを有効または無効に設定します。
 * 開発モードが有効になると、各ウィジェットのHTML要素にそのウィジェットの名前とランダムな背景色が追加され、
 * デバッグ時やレイアウトの確認時に役立ちます。
 *
 * ## Parameters
 * @param isActive - 必須 開発モードを有効にする場合は `true` 、無効にする場合は `false` 。
 *
 * ## Examples
 * 開発モードを有効にする
 * @example
 * ```javascript
 * setupDevMode(true);
 *
 * class DebugApp extends View {
 *   build() {
 *     return new Column({
 *       children: [
 *         new Text("Development mode enabled!"),
 *         new Text("Elements can be debugged with background colors and names."),
 *       ]
 *     });
 *   }
 * }
 *
 * assembleView(new DebugApp());
 * ```
 *
 * 開発モードを無効にする（デフォルトの動作）
 * @example
 * ```javascript
 * setupDevMode(false);
 * ```
 */
export function setupDevMode(isActive){
    devMode = isActive;
}