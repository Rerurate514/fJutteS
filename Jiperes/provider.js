import { ProviderObserver } from "./observer.js";

/**
 * Providerクラス - UIなどの状態管理を担当する。
 * 
 * 最初にProviderを作成する際にはこのProviderクラスから
 * 提供されているファクトリメソッドを使用してインスタンス化してください。
 * 
 * 値の読み取りにはread
 * 値の変更にはupdate
 * 値の変更検知に応じてコードを実行するならwatch
 * 使用するメソッドはこの3つのみです。
 * 
 * またProvider同士の依存関係や値の更新ログを取得する際には、
 * ProviderObserverクラスを使用してください。
 * 
 * このファイル下のほうに使用例が記載されています。
 */
export class Provider {
    constructor(createFn) {
        this._dependencies = new Map();
        this._listeners = new Set();
        this._core = new ProviderCore(createFn);
    }

    /**
     * 
     * @param {Function(ref)} createFn 
     * @returns {Provider} provider
     * 
     * # Providerクラスのファクトリメソッド
     * 基本的にはnewキーワードを使用せず、
     * このファクトリを使用してProviderを作成してください。
     * 
     * 使用例：`Provider.createProvider((ref) => { return 値 });`
     */
    static createProvider(createFn, name = null) {
        let provider = new Provider(createFn);
        provider._setName(name);
        return provider;
    }

    _setName(name){
        if(name){
            this.name = name;
        }
        else {
            this.name = Math.random().toString(36).substr(2, 9);
        }
    }

    /**
     * 
     * @returns {Provider.value}
     * 
     * Provider内の値を静的に読み取る場合に使用できるメソッド
     * 
     * 使用例：`createdProvider.read();`
     */
    read() {
        if (!this._core.isInitialized) {
            const ref = this._createRef();
            this._core.value = this._core.create(ref);
            this._core.isInitialized = true;
        }

        return this._core.value;
    }

    /**
     * 
     * @param {Function(currentValue)} listener 
     * @param {boolean} immediate
     * @returns {Function} unsubscribed
     * 
     * Provider内の値が変更された際に行う動作を定義することができる。
     * Providerをリッスン状態にすることができるともいう。
     * 
     * immediate引数はwatchが呼びされた際にProviderのリスナーを発火させるかを決める。
     * trueなら発火、falseなら発火しない。
     * 
     * 使用例；`createdProvider.watch((changedValue) => { console.log("値の変更が検知されました:" + changedValue)});`
     */
    watch(listener, { immediate = true } = {}) {
        this._listeners.add(listener);

        if (immediate) {
            listener(this.read());
        }

        return () => {
            this._listeners.delete(listener);
        };
    }

    /**
     * 
     * @param {Function} updateFn 
     * 
     * Providerの値を変更したいときに使用するメソッド。
     * 
     * このメソッドが呼び出されるとwatchで定義したリスナーが一斉に発火する。
     * これによってwatchしているコードに値の変更が通知される。
     */
    update(updateFn) {
        const currentValue = this.read();
        const newValue = updateFn(currentValue);

        const observer = new ProviderObserver();
        observer.logUpdate(this, currentValue, newValue);

        this._core.value = newValue;
        this._notifyListeners(newValue);
    }

    _notifyListeners(newValue) {
        this._listeners.forEach(listener => listener(newValue));
    }

    _createRef() {
        const observer = new ProviderObserver();
        const ref = {
            read: otherProvider => {
                return otherProvider.read();
            },
            update: updateFn => {
                const oldValue = this.read();
                this.update(updateFn);
                const newValue = this.read();
                observer.logUpdate(this, oldValue, newValue);
            },
            watch: (otherProvider, updateFn) => {
                const observer = new ProviderObserver();
                observer.addDependency(this, otherProvider);
                this._dependencies.set(
                    otherProvider,
                    new Dependency(otherProvider, this, updateFn)
                );
            },
        };
        return ref;
    }

    unsubscribedDependency(parentProvider){
        const observer = new ProviderObserver();

        this._dependencies[parentProvider].unsubscribedParent();
        this._dependencies.delete(parentProvider);

        observer.deleteDependency(this.parentProvider);
    }
}

class ProviderCore {
    constructor(createFn) {
        this.create = createFn;
        this.value = null;
        this.isInitialized = false;
    }
}

class Dependency {
    constructor(parentProvider, provider, updateFn) {
        this.parentProvider = parentProvider;
        this.provider = provider;

        this._listenParent(updateFn);
    }

    printDependency() {
        console.log(this.provider + ' depends on ' + this.parentProvider);
    }

    _listenParent(updateFn) {
        this._unsubscribed = this.parentProvider.watch(
            parentValue => {
                this.provider.update(currentValue => {
                    return updateFn(parentValue, currentValue);
                });
            },
            { immediate: false }
        );
    }

    unsubscribedParent(){
        this._unsubscribed();
    }
}

// # 使用方法
// テスト用のプロバイダーを作成
// const userProvider = Provider.createProvider(ref => {
//     return { name: "田中", age: 25 };
// });

// const userAgeProvider = Provider.createProvider(ref => {
//     ref.watch(userProvider, (user, currentValue) => {
//         return user.age;
//     });
//     return ref.read(userProvider).age;
// });

// const userSummaryProvider = Provider.createProvider(ref => {
//     ref.watch(userAgeProvider, (age, currentValue) => {
//         return `年齢は${age}歳です`;
//     });
//     return `年齢は${ref.read(userAgeProvider)}歳です`;
// });

// プロバイダーの使用
// console.log("Initial values:");
// console.log("User:", userProvider.read());
// console.log("Age:", userAgeProvider.read());
// console.log("Summary:", userSummaryProvider.read());

// 値を更新
// console.log("\nUpdating user age...");
// userProvider.update(user => ({ ...user, age: 26 }));

// 更新履歴を表示
// console.log("\nUpdate History:");
// console.log(new ProviderObserver().getAllUpdateHistory());

// 更新履歴(フィルター済み)を表示
// console.log("\nUpdate History:");
// console.log(new ProviderObserver().getFilteredUpdateHistory(userProvider));

// 依存関係グラフを表示
// console.log("\nDependency Graph:");
// console.log(new ProviderObserver().getDependencyGraph());
