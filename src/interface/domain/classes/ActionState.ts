export class ActionState {
    constructor(
        readonly title: string,
        readonly recommendedColor: string
    ) {}

    static Error(reason?: string) {
        return new ActionState(
            "Произошла " + (reason && reason.length > 0 ? `ошибка: ${reason}` : "неизвестная ошибка"),
            "#f83636"
        )
    }
    static InProcess() {
        return new ActionState(
            "Действие выполняется",
            "#f1a41c"
        )
    }
    static Success() {
        return new ActionState(
            "Выполнено успешно",
            "#2fa90f"
        )
    }
}