export type ReduxType = {
    typing: TypingState
}

type TypingState = {
    cpm: number;
    timer: string;
    error: number;
    accuracy: number;
}