export abstract class SimplexStepTag {
    protected constructor(
        readonly message: string
    ) {}
}

export class ArtificialSimplexStartTag extends SimplexStepTag {
    constructor() {
        super("Начался этап вычисления искусственного базиса");
    }
}
export class ArtificialSimplexEndTag extends SimplexStepTag {
    constructor() {
        super("Закончился этап вычисления искусственного базиса");
    }
}
export class DefaultSimplexStartTag extends SimplexStepTag {
    constructor() {
        super("Начался этап применения симплекс-метода");
    }
}
export class DefaultSimplexEndTag extends SimplexStepTag {
    constructor() {
        super("Начался этап применения симплекс-метода");
    }
}
export class HasResultTag extends SimplexStepTag {
    constructor() {
        super("Вычисления завершены");
    }
}
export class HasErrorTag extends SimplexStepTag {
    constructor(reason?: string) {
        super(
            "Вычисления остановлены по " + (reason
                ? `причине: ${reason}`
                : "неизвестной причине")
        );
    }
}