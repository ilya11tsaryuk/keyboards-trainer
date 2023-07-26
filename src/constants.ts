// описать массив обьектов с языками програмирования и массив уровней сложности
export const LANGUAGE = [
    { id: 1, value: "Javascript" },
    { id: 2, value: "Php" },
    { id: 3, value: "Java" },
    { id: 4, value: "Python" },
    { id: 5, value: "Go" }
]

export const LEVEL = [
    { id: 1, value: "1" },
    { id: 2, value: "2" },
    { id: 3, value: "3" },
]

export const getRecord = () => {
    try {
        const recordJSON = localStorage.getItem('typingRecord');
        return recordJSON ? JSON.parse(recordJSON) : 0;
    } catch (error) {
        console.error('Ошибка при получении рекорда из локального хранилища:', error);
        return null;
    }
};

export const fetchResult = (record: number) => {
    try {
        const recordJSON = JSON.stringify(record);
        localStorage.setItem('typingRecord', recordJSON);
    } catch (error) {
        console.error('Ошибка при сохранении рекорда в локальное хранилище:', error);
    }
};

export const SECRET_API_TOKEN = 'patcWFaHJWHMXh3lp.6df4c2708c156e1be93ec43d54b70642c7820b8a3db94c85fd23cd95668e7757'
export const ID_DATA_BASE = 'appc46kCCAD8EzjgZ'

export const TEXTS = [
    { id: 1, language: "JavaScript", level: '2', value: `` },
    { id: 2, language: "Go", level: '1', value: "фрагмент кода на языке Go" },
    { id: 3, language: "Python", level: '1', value: "фрагмент кода на языке Python" },
    {
        id: 4, language: "Java", level: '1', value: ` `
    },
    { id: 5, language: "Php", level: '1', value: "фрагмент кода на языке Php" },
]

export const LIST_BUTTONS = [

    { id: 46, value: "`" },
    { id: 47, value: "1" },
    { id: 48, value: "2" },
    { id: 49, value: "3" },
    { id: 50, value: "4" },
    { id: 51, value: "5" },
    { id: 52, value: "6" },
    { id: 53, value: "7" },
    { id: 54, value: "8" },
    { id: 55, value: "9" },
    { id: 56, value: "0" },
    { id: 57, value: "-" },
    { id: 58, value: "=" },
    { id: 59, value: "BCSP" },
    { id: 42, value: "TAB" },
    { id: 1, value: "Q" },
    { id: 2, value: "W" },
    { id: 3, value: "E" },
    { id: 4, value: "R" },
    { id: 5, value: "T" },
    { id: 6, value: "Y" },
    { id: 7, value: "U" },
    { id: 8, value: "I" },
    { id: 9, value: "O" },
    { id: 10, value: "P" },
    { id: 11, value: "[" },
    { id: 12, value: "]" },
    { id: 44, value: "\\" },
    { id: 45, value: "CAPS" },
    { id: 13, value: "A" },
    { id: 14, value: "S" },
    { id: 15, value: "D" },
    { id: 16, value: "F" },
    { id: 17, value: "G" },
    { id: 18, value: "H" },
    { id: 19, value: "J" },
    { id: 20, value: "K" },
    { id: 21, value: "L" },
    { id: 22, value: ";" },
    { id: 23, value: "'" },
    { id: 24, value: "ENTER" },
    { id: 25, value: "SHIFT" },
    { id: 26, value: "Z" },
    { id: 27, value: "X" },
    { id: 28, value: "C" },
    { id: 29, value: "V" },
    { id: 30, value: "B" },
    { id: 31, value: "N" },
    { id: 32, value: "M" },
    { id: 33, value: "," },
    { id: 34, value: "." },
    { id: 35, value: "/" },
    { id: 36, value: "SHIFT" },
    { id: 37, value: "CTRL" },
    { id: 38, value: "ALT" },
    { id: 39, value: "SPACE" },
    { id: 40, value: "ALT" },
    { id: 41, value: "CTRL" },
]

export const LIST_BUTTONS_PRESS_SHIFT = [

    { id: 46, value: "`" },
    { id: 47, value: "!" },
    { id: 48, value: "@" },
    { id: 49, value: "#" },
    { id: 50, value: "$" },
    { id: 51, value: "%" },
    { id: 52, value: "^" },
    { id: 53, value: "&" },
    { id: 54, value: "*" },
    { id: 55, value: "(" },
    { id: 56, value: ")" },
    { id: 57, value: "_" },
    { id: 58, value: "+" },
    { id: 59, value: "BCSP" },
    { id: 42, value: "TAB" },
    { id: 1, value: "Q" },
    { id: 2, value: "W" },
    { id: 3, value: "E" },
    { id: 4, value: "R" },
    { id: 5, value: "T" },
    { id: 6, value: "Y" },
    { id: 7, value: "U" },
    { id: 8, value: "I" },
    { id: 9, value: "O" },
    { id: 10, value: "P" },
    { id: 11, value: "{" },
    { id: 12, value: "}" },
    { id: 44, value: "|" },
    { id: 45, value: "CAPS" },
    { id: 13, value: "A" },
    { id: 14, value: "S" },
    { id: 15, value: "D" },
    { id: 16, value: "F" },
    { id: 17, value: "G" },
    { id: 18, value: "H" },
    { id: 19, value: "J" },
    { id: 20, value: "K" },
    { id: 21, value: "L" },
    { id: 22, value: ";" },
    { id: 23, value: "'" },
    { id: 24, value: "ENTER" },
    { id: 25, value: "SHIFT" },
    { id: 26, value: "Z" },
    { id: 27, value: "X" },
    { id: 28, value: "C" },
    { id: 29, value: "V" },
    { id: 30, value: "B" },
    { id: 31, value: "N" },
    { id: 32, value: "M" },
    { id: 33, value: "," },
    { id: 34, value: "." },
    { id: 35, value: "/" },
    { id: 36, value: "SHIFT" },
    { id: 37, value: "CTRL" },
    { id: 38, value: "ALT" },
    { id: 39, value: "SPACE" },
    { id: 40, value: "ALT" },
    { id: 41, value: "CTRL" },
]