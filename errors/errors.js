class CustomError extends Error {
    constructor(message) {
        super(message);
        
        this.name = this.constructor.name;
        
        Error.captureStackTrace(this, this.constructor);
    }
}

class OverridePreBuildMethodInProviderScopeError extends CustomError {
    constructor(viewName){
        super("In " + viewName + "クラス, ProviderScopeを継承したクラス内ではpreBuildメソッドが継承できません。\n代わりに同じ動作を持つpreBuildScopeメソッドを継承してください。");
        this.viewName = viewName;
    }
}

class CreateIllegalInstanceError extends CustomError {
    constructor(classType){
        super("このクラス(" + classType + ")はインスタンス化してはいけません。");
        this.classType = classType;
    }
}

class IllegalPreBuildDoSomothingError extends CustomError {
    constructor(ms){
        super("Viewの構築プロセスが終了するまで以下の操作を行ってはなりません。\n\n"+  ms + "\n\nまたViewの構築プロセスが終了したかはgetBuildCompletionStateメソッドにて取得することができます。\n\n" + "stackTrace:");
    }
}

class ValidationError extends CustomError {
    constructor(message, field) {
        super(message);
        this.field = field;
    }
}

class NetworkError extends CustomError {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
