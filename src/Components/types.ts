export type ReduxType = {
    typing: TypingState,
    mainInfo: MainInfoSlice,
}

type TypingState = {
    cpm: number;
    timer: string;
    error: number;
    accuracy: number;
}

type MainInfoSlice = {
    theme: string,
    language: string, 
    level: string,
    globalRecord: string, 
    globalRecordID: string,
}