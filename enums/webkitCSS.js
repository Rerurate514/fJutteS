export class WebkitCSS {
    #properties = {};

    constructor({
        // 変形と遷移
        webkitTransform = null,
        webkitTransformOrigin = null,
        webkitTransformStyle = null,
        webkitTransition = null,
        webkitTransitionDelay = null,
        webkitTransitionDuration = null,
        webkitTransitionProperty = null,
        webkitTransitionTimingFunction = null,
        
        // アニメーション
        webkitAnimation = null,
        webkitAnimationDelay = null,
        webkitAnimationDirection = null,
        webkitAnimationDuration = null,
        webkitAnimationFillMode = null,
        webkitAnimationIterationCount = null,
        webkitAnimationName = null,
        webkitAnimationPlayState = null,
        webkitAnimationTimingFunction = null,
        
        // フレックスボックス
        webkitFlex = null,
        webkitFlexBasis = null,
        webkitFlexDirection = null,
        webkitFlexFlow = null,
        webkitFlexGrow = null,
        webkitFlexShrink = null,
        webkitFlexWrap = null,
        webkitJustifyContent = null,
        webkitAlignItems = null,
        webkitAlignContent = null,
        webkitAlignSelf = null,
        webkitOrder = null,
        
        // ボックスモデル
        webkitBoxSizing = null,
        webkitBoxShadow = null,
        webkitBoxReflect = null,
        webkitBoxPack = null,
        webkitBoxAlign = null,
        webkitBoxFlex = null,
        webkitBoxFlexGroup = null,
        webkitBoxLines = null,
        webkitBoxOrdinalGroup = null,
        webkitBoxOrient = null,
        webkitBoxDirection = null,
        
        // テキスト関連
        webkitFontSmoothing = null,
        webkitTextSizeAdjust = null,
        webkitTextFillColor = null,
        webkitTextStroke = null,
        webkitTextStrokeColor = null,
        webkitTextStrokeWidth = null,
        webkitBackgroundClip = null,
        webkitTextSecurity = null,
        webkitLineClamp = null,
        webkitLineBreak = null,
        
        // その他
        webkitAppearance = null,
        webkitFilter = null,
        webkitBackdropFilter = null,
        webkitUserSelect = null,
        webkitUserDrag = null,
        webkitUserModify = null,
        webkitTouchCallout = null,
        webkitOverflowScrolling = null,
        webkitMaskImage = null,
        webkitMaskSize = null,
        webkitMaskPosition = null,
        webkitMaskRepeat = null,
        webkitMaskOrigin = null,
        webkitMaskClip = null,
        webkitMaskComposite = null,
        webkitPerspective = null,
        webkitPerspectiveOrigin = null,
        webkitBackfaceVisibility = null,
        webkitTapHighlightColor = null,
        webkitHyphenateCharacter = null,
        webkitLocale = null,
        webkitMarginBefore = null,
        webkitMarginAfter = null,
        webkitMarginStart = null,
        webkitMarginEnd = null,
        webkitPaddingBefore = null,
        webkitPaddingAfter = null,
        webkitPaddingStart = null,
        webkitPaddingEnd = null,
        webkitBorderStart = null,
        webkitBorderEnd = null,
        webkitBorderBefore = null,
        webkitBorderAfter = null,
        webkitBorderStartWidth = null,
        webkitBorderEndWidth = null,
        webkitBorderBeforeWidth = null,
        webkitBorderAfterWidth = null,
        webkitBorderStartColor = null,
        webkitBorderEndColor = null,
        webkitBorderBeforeColor = null,
        webkitBorderAfterColor = null,
        webkitBorderImage = null,
        webkitBorderRadius = null,
        webkitColumnCount = null,
        webkitColumnGap = null,
        webkitColumnRule = null,
        webkitColumnRuleColor = null,
        webkitColumnRuleStyle = null,
        webkitColumnRuleWidth = null,
        webkitColumnSpan = null,
        webkitColumnWidth = null,
        webkitColumns = null,
        webkitShapeOutside = null,
        webkitShapeImageThreshold = null,
        webkitShapeMargin = null
    } = {}) {
        this.#properties = {
            // 変形と遷移
            webkitTransform,
            webkitTransformOrigin,
            webkitTransformStyle,
            webkitTransition,
            webkitTransitionDelay,
            webkitTransitionDuration,
            webkitTransitionProperty,
            webkitTransitionTimingFunction,
            
            // アニメーション
            webkitAnimation,
            webkitAnimationDelay,
            webkitAnimationDirection,
            webkitAnimationDuration,
            webkitAnimationFillMode,
            webkitAnimationIterationCount,
            webkitAnimationName,
            webkitAnimationPlayState,
            webkitAnimationTimingFunction,
            
            // フレックスボックス
            webkitFlex,
            webkitFlexBasis,
            webkitFlexDirection,
            webkitFlexFlow,
            webkitFlexGrow,
            webkitFlexShrink,
            webkitFlexWrap,
            webkitJustifyContent,
            webkitAlignItems,
            webkitAlignContent,
            webkitAlignSelf,
            webkitOrder,
            
            // ボックスモデル
            webkitBoxSizing,
            webkitBoxShadow,
            webkitBoxReflect,
            webkitBoxPack,
            webkitBoxAlign,
            webkitBoxFlex,
            webkitBoxFlexGroup,
            webkitBoxLines,
            webkitBoxOrdinalGroup,
            webkitBoxOrient,
            webkitBoxDirection,
            
            // テキスト関連
            webkitFontSmoothing,
            webkitTextSizeAdjust,
            webkitTextFillColor,
            webkitTextStroke,
            webkitTextStrokeColor,
            webkitTextStrokeWidth,
            webkitBackgroundClip,
            webkitTextSecurity,
            webkitLineClamp,
            webkitLineBreak,
            
            // その他
            webkitAppearance,
            webkitFilter,
            webkitBackdropFilter,
            webkitUserSelect,
            webkitUserDrag,
            webkitUserModify,
            webkitTouchCallout,
            webkitOverflowScrolling,
            webkitMaskImage,
            webkitMaskSize,
            webkitMaskPosition,
            webkitMaskRepeat,
            webkitMaskOrigin,
            webkitMaskClip,
            webkitMaskComposite,
            webkitPerspective,
            webkitPerspectiveOrigin,
            webkitBackfaceVisibility,
            webkitTapHighlightColor,
            webkitHyphenateCharacter,
            webkitLocale,
            webkitMarginBefore,
            webkitMarginAfter,
            webkitMarginStart,
            webkitMarginEnd,
            webkitPaddingBefore,
            webkitPaddingAfter,
            webkitPaddingStart,
            webkitPaddingEnd,
            webkitBorderStart,
            webkitBorderEnd,
            webkitBorderBefore,
            webkitBorderAfter,
            webkitBorderStartWidth,
            webkitBorderEndWidth,
            webkitBorderBeforeWidth,
            webkitBorderAfterWidth,
            webkitBorderStartColor,
            webkitBorderEndColor,
            webkitBorderBeforeColor,
            webkitBorderAfterColor,
            webkitBorderImage,
            webkitBorderRadius,
            webkitColumnCount,
            webkitColumnGap,
            webkitColumnRule,
            webkitColumnRuleColor,
            webkitColumnRuleStyle,
            webkitColumnRuleWidth,
            webkitColumnSpan,
            webkitColumnWidth,
            webkitColumns,
            webkitShapeOutside,
            webkitShapeImageThreshold,
            webkitShapeMargin
        };
    }

    applyCSS(element) {
        // 変形と遷移
        if (this.#properties.webkitTransform) element.style.webkitTransform = this.#properties.webkitTransform;
        if (this.#properties.webkitTransformOrigin) element.style.webkitTransformOrigin = this.#properties.webkitTransformOrigin;
        if (this.#properties.webkitTransformStyle) element.style.webkitTransformStyle = this.#properties.webkitTransformStyle;
        if (this.#properties.webkitTransition) element.style.webkitTransition = this.#properties.webkitTransition;
        if (this.#properties.webkitTransitionDelay) element.style.webkitTransitionDelay = this.#properties.webkitTransitionDelay;
        if (this.#properties.webkitTransitionDuration) element.style.webkitTransitionDuration = this.#properties.webkitTransitionDuration;
        if (this.#properties.webkitTransitionProperty) element.style.webkitTransitionProperty = this.#properties.webkitTransitionProperty;
        if (this.#properties.webkitTransitionTimingFunction) element.style.webkitTransitionTimingFunction = this.#properties.webkitTransitionTimingFunction;
        
        // アニメーション
        if (this.#properties.webkitAnimation) element.style.webkitAnimation = this.#properties.webkitAnimation;
        if (this.#properties.webkitAnimationDelay) element.style.webkitAnimationDelay = this.#properties.webkitAnimationDelay;
        if (this.#properties.webkitAnimationDirection) element.style.webkitAnimationDirection = this.#properties.webkitAnimationDirection;
        if (this.#properties.webkitAnimationDuration) element.style.webkitAnimationDuration = this.#properties.webkitAnimationDuration;
        if (this.#properties.webkitAnimationFillMode) element.style.webkitAnimationFillMode = this.#properties.webkitAnimationFillMode;
        if (this.#properties.webkitAnimationIterationCount) element.style.webkitAnimationIterationCount = this.#properties.webkitAnimationIterationCount;
        if (this.#properties.webkitAnimationName) element.style.webkitAnimationName = this.#properties.webkitAnimationName;
        if (this.#properties.webkitAnimationPlayState) element.style.webkitAnimationPlayState = this.#properties.webkitAnimationPlayState;
        if (this.#properties.webkitAnimationTimingFunction) element.style.webkitAnimationTimingFunction = this.#properties.webkitAnimationTimingFunction;
        
        // フレックスボックス
        if (this.#properties.webkitFlex) element.style.webkitFlex = this.#properties.webkitFlex;
        if (this.#properties.webkitFlexBasis) element.style.webkitFlexBasis = this.#properties.webkitFlexBasis;
        if (this.#properties.webkitFlexDirection) element.style.webkitFlexDirection = this.#properties.webkitFlexDirection;
        if (this.#properties.webkitFlexFlow) element.style.webkitFlexFlow = this.#properties.webkitFlexFlow;
        if (this.#properties.webkitFlexGrow) element.style.webkitFlexGrow = this.#properties.webkitFlexGrow;
        if (this.#properties.webkitFlexShrink) element.style.webkitFlexShrink = this.#properties.webkitFlexShrink;
        if (this.#properties.webkitFlexWrap) element.style.webkitFlexWrap = this.#properties.webkitFlexWrap;
        if (this.#properties.webkitJustifyContent) element.style.webkitJustifyContent = this.#properties.webkitJustifyContent;
        if (this.#properties.webkitAlignItems) element.style.webkitAlignItems = this.#properties.webkitAlignItems;
        if (this.#properties.webkitAlignContent) element.style.webkitAlignContent = this.#properties.webkitAlignContent;
        if (this.#properties.webkitAlignSelf) element.style.webkitAlignSelf = this.#properties.webkitAlignSelf;
        if (this.#properties.webkitOrder) element.style.webkitOrder = this.#properties.webkitOrder;
        
        // ボックスモデル
        if (this.#properties.webkitBoxSizing) element.style.webkitBoxSizing = this.#properties.webkitBoxSizing;
        if (this.#properties.webkitBoxShadow) element.style.webkitBoxShadow = this.#properties.webkitBoxShadow;
        if (this.#properties.webkitBoxReflect) element.style.webkitBoxReflect = this.#properties.webkitBoxReflect;
        if (this.#properties.webkitBoxPack) element.style.webkitBoxPack = this.#properties.webkitBoxPack;
        if (this.#properties.webkitBoxAlign) element.style.webkitBoxAlign = this.#properties.webkitBoxAlign;
        if (this.#properties.webkitBoxFlex) element.style.webkitBoxFlex = this.#properties.webkitBoxFlex;
        if (this.#properties.webkitBoxFlexGroup) element.style.webkitBoxFlexGroup = this.#properties.webkitBoxFlexGroup;
        if (this.#properties.webkitBoxLines) element.style.webkitBoxLines = this.#properties.webkitBoxLines;
        if (this.#properties.webkitBoxOrdinalGroup) element.style.webkitBoxOrdinalGroup = this.#properties.webkitBoxOrdinalGroup;
        if (this.#properties.webkitBoxOrient) element.style.webkitBoxOrient = this.#properties.webkitBoxOrient;
        if (this.#properties.webkitBoxDirection) element.style.webkitBoxDirection = this.#properties.webkitBoxDirection;
        
        // テキスト関連
        if (this.#properties.webkitFontSmoothing) element.style.webkitFontSmoothing = this.#properties.webkitFontSmoothing;
        if (this.#properties.webkitTextSizeAdjust) element.style.webkitTextSizeAdjust = this.#properties.webkitTextSizeAdjust;
        if (this.#properties.webkitTextFillColor) element.style.webkitTextFillColor = this.#properties.webkitTextFillColor;
        if (this.#properties.webkitTextStroke) element.style.webkitTextStroke = this.#properties.webkitTextStroke;
        if (this.#properties.webkitTextStrokeColor) element.style.webkitTextStrokeColor = this.#properties.webkitTextStrokeColor;
        if (this.#properties.webkitTextStrokeWidth) element.style.webkitTextStrokeWidth = this.#properties.webkitTextStrokeWidth;
        if (this.#properties.webkitBackgroundClip) element.style.webkitBackgroundClip = this.#properties.webkitBackgroundClip;
        if (this.#properties.webkitTextSecurity) element.style.webkitTextSecurity = this.#properties.webkitTextSecurity;
        if (this.#properties.webkitLineClamp) element.style.webkitLineClamp = this.#properties.webkitLineClamp;
        if (this.#properties.webkitLineBreak) element.style.webkitLineBreak = this.#properties.webkitLineBreak;
        
        // その他
        if (this.#properties.webkitAppearance) element.style.webkitAppearance = this.#properties.webkitAppearance;
        if (this.#properties.webkitFilter) element.style.webkitFilter = this.#properties.webkitFilter;
        if (this.#properties.webkitBackdropFilter) element.style.webkitBackdropFilter = this.#properties.webkitBackdropFilter;
        if (this.#properties.webkitUserSelect) element.style.webkitUserSelect = this.#properties.webkitUserSelect;
        if (this.#properties.webkitUserDrag) element.style.webkitUserDrag = this.#properties.webkitUserDrag;
        if (this.#properties.webkitUserModify) element.style.webkitUserModify = this.#properties.webkitUserModify;
        if (this.#properties.webkitTouchCallout) element.style.webkitTouchCallout = this.#properties.webkitTouchCallout;
        if (this.#properties.webkitOverflowScrolling) element.style.webkitOverflowScrolling = this.#properties.webkitOverflowScrolling;
        if (this.#properties.webkitMaskImage) element.style.webkitMaskImage = this.#properties.webkitMaskImage;
        if (this.#properties.webkitMaskSize) element.style.webkitMaskSize = this.#properties.webkitMaskSize;
        if (this.#properties.webkitMaskPosition) element.style.webkitMaskPosition = this.#properties.webkitMaskPosition;
        if (this.#properties.webkitMaskRepeat) element.style.webkitMaskRepeat = this.#properties.webkitMaskRepeat;
        if (this.#properties.webkitMaskOrigin) element.style.webkitMaskOrigin = this.#properties.webkitMaskOrigin;
        if (this.#properties.webkitMaskClip) element.style.webkitMaskClip = this.#properties.webkitMaskClip;
        if (this.#properties.webkitMaskComposite) element.style.webkitMaskComposite = this.#properties.webkitMaskComposite;
        if (this.#properties.webkitPerspective) element.style.webkitPerspective = this.#properties.webkitPerspective;
        if (this.#properties.webkitPerspectiveOrigin) element.style.webkitPerspectiveOrigin = this.#properties.webkitPerspectiveOrigin;
        if (this.#properties.webkitBackfaceVisibility) element.style.webkitBackfaceVisibility = this.#properties.webkitBackfaceVisibility;
        if (this.#properties.webkitTapHighlightColor) element.style.webkitTapHighlightColor = this.#properties.webkitTapHighlightColor;
        if (this.#properties.webkitHyphenateCharacter) element.style.webkitHyphenateCharacter = this.#properties.webkitHyphenateCharacter;
        if (this.#properties.webkitLocale) element.style.webkitLocale = this.#properties.webkitLocale;
        if (this.#properties.webkitMarginBefore) element.style.webkitMarginBefore = this.#properties.webkitMarginBefore;
        if (this.#properties.webkitMarginAfter) element.style.webkitMarginAfter = this.#properties.webkitMarginAfter;
        if (this.#properties.webkitMarginStart) element.style.webkitMarginStart = this.#properties.webkitMarginStart;
        if (this.#properties.webkitMarginEnd) element.style.webkitMarginEnd = this.#properties.webkitMarginEnd;
        if (this.#properties.webkitPaddingBefore) element.style.webkitPaddingBefore = this.#properties.webkitPaddingBefore;
        if (this.#properties.webkitPaddingAfter) element.style.webkitPaddingAfter = this.#properties.webkitPaddingAfter;
        if (this.#properties.webkitPaddingStart) element.style.webkitPaddingStart = this.#properties.webkitPaddingStart;
        if (this.#properties.webkitPaddingEnd) element.style.webkitPaddingEnd = this.#properties.webkitPaddingEnd;
        if (this.#properties.webkitBorderStart) element.style.webkitBorderStart = this.#properties.webkitBorderStart;
        if (this.#properties.webkitBorderEnd) element.style.webkitBorderEnd = this.#properties.webkitBorderEnd;
        if (this.#properties.webkitBorderBefore) element.style.webkitBorderBefore = this.#properties.webkitBorderBefore;
        if (this.#properties.webkitBorderAfter) element.style.webkitBorderAfter = this.#properties.webkitBorderAfter;
        if (this.#properties.webkitBorderStartWidth) element.style.webkitBorderStartWidth = this.#properties.webkitBorderStartWidth;
        if (this.#properties.webkitBorderEndWidth) element.style.webkitBorderEndWidth = this.#properties.webkitBorderEndWidth;
        if (this.#properties.webkitBorderBeforeWidth) element.style.webkitBorderBeforeWidth = this.#properties.webkitBorderBeforeWidth;
        if (this.#properties.webkitBorderAfterWidth) element.style.webkitBorderAfterWidth = this.#properties.webkitBorderAfterWidth;
        if (this.#properties.webkitBorderStartColor) element.style.webkitBorderStartColor = this.#properties.webkitBorderStartColor;
        if (this.#properties.webkitBorderEndColor) element.style.webkitBorderEndColor = this.#properties.webkitBorderEndColor;
        if (this.#properties.webkitBorderBeforeColor) element.style.webkitBorderBeforeColor = this.#properties.webkitBorderBeforeColor;
        if (this.#properties.webkitBorderAfterColor) element.style.webkitBorderAfterColor = this.#properties.webkitBorderAfterColor;
        if (this.#properties.webkitBorderImage) element.style.webkitBorderImage = this.#properties.webkitBorderImage;
        if (this.#properties.webkitBorderRadius) element.style.webkitBorderRadius = this.#properties.webkitBorderRadius;
        if (this.#properties.webkitColumnCount) element.style.webkitColumnCount = this.#properties.webkitColumnCount;
        if (this.#properties.webkitColumnGap) element.style.webkitColumnGap = this.#properties.webkitColumnGap;
        if (this.#properties.webkitColumnRule) element.style.webkitColumnRule = this.#properties.webkitColumnRule;
        if (this.#properties.webkitColumnRuleColor) element.style.webkitColumnRuleColor = this.#properties.webkitColumnRuleColor;
        if (this.#properties.webkitColumnRuleStyle) element.style.webkitColumnRuleStyle = this.#properties.webkitColumnRuleStyle;
        if (this.#properties.webkitColumnRuleWidth) element.style.webkitColumnRuleWidth = this.#properties.webkitColumnRuleWidth;
        if (this.#properties.webkitColumnSpan) element.style.webkitColumnSpan = this.#properties.webkitColumnSpan;
        if (this.#properties.webkitColumnWidth) element.style.webkitColumnWidth = this.#properties.webkitColumnWidth;
        if (this.#properties.webkitColumns) element.style.webkitColumns = this.#properties.webkitColumns;
        if (this.#properties.webkitShapeOutside) element.style.webkitShapeOutside = this.#properties.webkitShapeOutside;
        if (this.#properties.webkitShapeImageThreshold) element.style.webkitShapeImageThreshold = this.#properties.webkitShapeImageThreshold;
        if (this.#properties.webkitShapeMargin) element.style.webkitShapeMargin = this.#properties.webkitShapeMargin;
        
        return element;
    }

    // getter メソッド - 変形と遷移
    get webkitTransform() { return this.#properties.webkitTransform; }
    get webkitTransformOrigin() { return this.#properties.webkitTransformOrigin; }
    get webkitTransformStyle() { return this.#properties.webkitTransformStyle; }
    get webkitTransition() { return this.#properties.webkitTransition; }
    get webkitTransitionDelay() { return this.#properties.webkitTransitionDelay; }
    get webkitTransitionDuration() { return this.#properties.webkitTransitionDuration; }
    get webkitTransitionProperty() { return this.#properties.webkitTransitionProperty; }
    get webkitTransitionTimingFunction() { return this.#properties.webkitTransitionTimingFunction; }
    
    // getter メソッド - アニメーション
    get webkitAnimation() { return this.#properties.webkitAnimation; }
    get webkitAnimationDelay() { return this.#properties.webkitAnimationDelay; }
    get webkitAnimationDirection() { return this.#properties.webkitAnimationDirection; }
    get webkitAnimationDuration() { return this.#properties.webkitAnimationDuration; }
    get webkitAnimationFillMode() { return this.#properties.webkitAnimationFillMode; }
    get webkitAnimationIterationCount() { return this.#properties.webkitAnimationIterationCount; }
    get webkitAnimationName() { return this.#properties.webkitAnimationName; }
    get webkitAnimationPlayState() { return this.#properties.webkitAnimationPlayState; }
    get webkitAnimationTimingFunction() { return this.#properties.webkitAnimationTimingFunction; }
    
    // getter メソッド - フレックスボックス
    get webkitFlex() { return this.#properties.webkitFlex; }
    get webkitFlexBasis() { return this.#properties.webkitFlexBasis; }
    get webkitFlexDirection() { return this.#properties.webkitFlexDirection; }
    get webkitFlexFlow() { return this.#properties.webkitFlexFlow; }
    get webkitFlexGrow() { return this.#properties.webkitFlexGrow; }
    get webkitFlexShrink() { return this.#properties.webkitFlexShrink; }
    get webkitFlexWrap() { return this.#properties.webkitFlexWrap; }
    get webkitJustifyContent() { return this.#properties.webkitJustifyContent; }
    get webkitAlignItems() { return this.#properties.webkitAlignItems; }
    get webkitAlignContent() { return this.#properties.webkitAlignContent; }
    get webkitAlignSelf() { return this.#properties.webkitAlignSelf; }
    get webkitOrder() { return this.#properties.webkitOrder; }
    
    // getter メソッド - ボックスモデル
    get webkitBoxSizing() { return this.#properties.webkitBoxSizing; }
    get webkitBoxShadow() { return this.#properties.webkitBoxShadow; }
    get webkitBoxReflect() { return this.#properties.webkitBoxReflect; }
    get webkitBoxPack() { return this.#properties.webkitBoxPack; }
    get webkitBoxAlign() { return this.#properties.webkitBoxAlign; }
    get webkitBoxFlex() { return this.#properties.webkitBoxFlex; }
    get webkitBoxFlexGroup() { return this.#properties.webkitBoxFlexGroup; }
    get webkitBoxLines() { return this.#properties.webkitBoxLines; }
    get webkitBoxOrdinalGroup() { return this.#properties.webkitBoxOrdinalGroup; }
    get webkitBoxOrient() { return this.#properties.webkitBoxOrient; }
    get webkitBoxDirection() { return this.#properties.webkitBoxDirection; }
    
    // getter メソッド - テキスト関連
    get webkitFontSmoothing() { return this.#properties.webkitFontSmoothing; }
    get webkitTextSizeAdjust() { return this.#properties.webkitTextSizeAdjust; }
    get webkitTextFillColor() { return this.#properties.webkitTextFillColor; }
    get webkitTextStroke() { return this.#properties.webkitTextStroke; }
    get webkitTextStrokeColor() { return this.#properties.webkitTextStrokeColor; }
    get webkitTextStrokeWidth() { return this.#properties.webkitTextStrokeWidth; }
    get webkitBackgroundClip() { return this.#properties.webkitBackgroundClip; }
    get webkitTextSecurity() { return this.#properties.webkitTextSecurity; }
    get webkitLineClamp() { return this.#properties.webkitLineClamp; }
    get webkitLineBreak() { return this.#properties.webkitLineBreak; }
    
    // getter メソッド - その他
    get webkitAppearance() { return this.#properties.webkitAppearance; }
    get webkitFilter() { return this.#properties.webkitFilter; }
    get webkitBackdropFilter() { return this.#properties.webkitBackdropFilter; }
    get webkitUserSelect() { return this.#properties.webkitUserSelect; }
    get webkitUserDrag() { return this.#properties.webkitUserDrag; }
    get webkitUserModify() { return this.#properties.webkitUserModify; }
    get webkitTouchCallout() { return this.#properties.webkitTouchCallout; }
    get webkitOverflowScrolling() { return this.#properties.webkitOverflowScrolling; }
    get webkitMaskImage() { return this.#properties.webkitMaskImage; }
    get webkitMaskSize() { return this.#properties.webkitMaskSize; }
    get webkitMaskPosition() { return this.#properties.webkitMaskPosition; }
    get webkitMaskRepeat() { return this.#properties.webkitMaskRepeat; }
    get webkitMaskOrigin() { return this.#properties.webkitMaskOrigin; }
    get webkitMaskClip() { return this.#properties.webkitMaskClip; }
    get webkitMaskComposite() { return this.#properties.webkitMaskComposite; }
    get webkitPerspective() { return this.#properties.webkitPerspective; }
    get webkitPerspectiveOrigin() { return this.#properties.webkitPerspectiveOrigin; }
    get webkitBackfaceVisibility() { return this.#properties.webkitBackfaceVisibility; }
    get webkitTapHighlightColor() { return this.#properties.webkitTapHighlightColor; }
    get webkitHyphenateCharacter() { return this.#properties.webkitHyphenateCharacter; }
    get webkitLocale() { return this.#properties.webkitLocale; }
    get webkitMarginBefore() { return this.#properties.webkitMarginBefore; }
    get webkitMarginAfter() { return this.#properties.webkitMarginAfter; }
    get webkitMarginStart() { return this.#properties.webkitMarginStart; }
    get webkitMarginEnd() { return this.#properties.webkitMarginEnd; }
    get webkitPaddingBefore() { return this.#properties.webkitPaddingBefore; }
    get webkitPaddingAfter() { return this.#properties.webkitPaddingAfter; }
    get webkitPaddingStart() { return this.#properties.webkitPaddingStart; }
    get webkitPaddingEnd() { return this.#properties.webkitPaddingEnd; }
    get webkitBorderStart() { return this.#properties.webkitBorderStart; }
    get webkitBorderEnd() { return this.#properties.webkitBorderEnd; }
    get webkitBorderBefore() { return this.#properties.webkitBorderBefore; }
    get webkitBorderAfter() { return this.#properties.webkitBorderAfter; }
    get webkitBorderStartWidth() { return this.#properties.webkitBorderStartWidth; }
    get webkitBorderEndWidth() { return this.#properties.webkitBorderEndWidth; }
    get webkitBorderBeforeWidth() { return this.#properties.webkitBorderBeforeWidth; }
    get webkitBorderAfterWidth() { return this.#properties.webkitBorderAfterWidth; }
    get webkitBorderStartColor() { return this.#properties.webkitBorderStartColor; }
    get webkitBorderEndColor() { return this.#properties.webkitBorderEndColor; }
    get webkitBorderBeforeColor() { return this.#properties.webkitBorderBeforeColor; }
    get webkitBorderAfterColor() { return this.#properties.webkitBorderAfterColor; }
    get webkitBorderImage() { return this.#properties.webkitBorderImage; }
    get webkitBorderRadius() { return this.#properties.webkitBorderRadius; }
    get webkitColumnCount() { return this.#properties.webkitColumnCount; }
    get webkitColumnGap() { return this.#properties.webkitColumnGap; }
    get webkitColumnRule() { return this.#properties.webkitColumnRule; }
    get webkitColumnRuleColor() { return this.#properties.webkitColumnRuleColor; }
    get webkitColumnRuleStyle() { return this.#properties.webkitColumnRuleStyle; }
    get webkitColumnRuleWidth() { return this.#properties.webkitColumnRuleWidth; }
    get webkitColumnSpan() { return this.#properties.webkitColumnSpan; }
    get webkitColumnWidth() { return this.#properties.webkitColumnWidth; }
    get webkitColumns() { return this.#properties.webkitColumns; }
    get webkitShapeOutside() { return this.#properties.webkitShapeOutside; }
    get webkitShapeImageThreshold() { return this.#properties.webkitShapeImageThreshold; }
    get webkitShapeMargin() { return this.#properties.webkitShapeMargin; }
}
