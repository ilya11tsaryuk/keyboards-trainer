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
    { id: 1, language: "JavaScript", level: '2', value: `const App = () => {\n\tif (count > 0) {\n\t\tconsole.log("count > 0")\n\t} else {\n\t\tcount++\n\t}\n}` },
    { id: 2, language: "Go", level: '1', value: "фрагмент кода на языке Go" },
    { id: 3, language: "Python", level: '1', value: "фрагмент кода на языке Python" },
    {
        id: 4, language: "Java", level: '1', value: `public class HelloWorld {\n\tpublic static void main(String[] args) {\n\tgreet("World");\t}\n\tpublic static void greet(String name) {\t\tSystem.out.println("Hello, " + name + "!");\t}\n} `
    },
    { id: 5, language: "Php", level: '1', value: "фрагмент кода на языке Php" },
    { id: 6, language: "JavaScript", level: '1', value: `let num1 = 5;\nlet num2 = 10;\nlet sum = num1 + num2;\nconsole.log("sum: " + sum);` },
    { id: 7, language: "JavaScript", level: '1', value: `let fruits = ["apple", "banana", "orange"];\nfruits.push("kiwi");\nconsole.log(fruits);` },
    { id: 8, language: "JavaScript", level: '1', value: `const array1 = [1, 2, 3];\nconst array2 = [4, 5, 6];\nconst newArray = array1.concat(array2);\nconsole.log(newArray);` },
    { id: 9, language: "JavaScript", level: '1', value: `const array = [1, 2, 3];\nconst lastElement = array.pop();\nconsole.log(lastElement);\nconsole.log(array);` },
    { id: 10, language: "JavaScript", level: '1', value: `const array = [2, 3]\nconst newLength = array.unshift(1)\nconsole.log(newLength)\nconsole.log(array);` },
    { id: 11, language: "JavaScript", level: '1', value: `const array = [1, 2, 3, 4, 5];\nconst removedElements = array.splice(2, 2, 6, 7);\nconsole.log(removedElements);\nconsole.log(array);` },
    { id: 12, language: "JavaScript", level: '2', value: `let num = parseInt(prompt("write number:"));\nif (num > 0) {\n\tconsole.log("number positive.");\n} else if (num < 0) {\n\tconsole.log("number negative.");\n} else {\n\tconsole.log("number = 0");\n}` },
    { id: 13, language: "JavaScript", level: '1', value: `let number = Math.floor(Math.random() * 10) + 1;\nconsole.log("random number: " + number);` },
    { id: 14, language: "JavaScript", level: '1', value: `let count = 0;\nwhile (count < 5) {\n\tconsole.log("Count: " + count);\n\tcount++;\n}` },
    { id: 15, language: "JavaScript", level: '1', value: `let i = 0;\nwhile (i < 5) {\n\tconsole.log(i);\n\ti++;\n}` },
    { id: 16, language: "JavaScript", level: '2', value: `const obj = { a: 1, b: 2, c: 3 };\nfor (let prop in obj) {\n\tconsole.log(prop + ": " + obj[prop]);\n}` },
    { id: 17, language: "JavaScript", level: '2', value: `for (let i = 1; i <= 3; i++) {\n\tfor (let j = 1; j <= 2; j++) {\n\t\tconsole.log(i, j);\n\t}\n}` },
    { id: 18, language: "JavaScript", level: '2', value: `outerLoop: for (let i = 0; i < 3; i++) {\n\tinnerLoop: for (let j = 0; j < 3; j++) {\n\t\tif (i === 1 && j === 1) {\n\t\t\tbreak outerLoop;\n\t\t}\n\t\tconsole.log(i, j);\n\t}\n}` },
    { id: 19, language: "JavaScript", level: '2', value: `const person = {\n\tname: "John",\n\tage: 30,\n\tcity: "New York"\n};\n\nfor (let key in person) {\n\tconsole.log(key + ": " + person[key]);\n}` },
    { id: 19, language: "JavaScript", level: '2', value: `const person = {\n\tname: "John",\n\tage: 30,\n\tcity: "New York"\n};\n\nfor (let value in person) {\n\tconsole.log(person[value]);\n}` },
    { id: 20, language: "JavaScript", level: '2', value: `let num = 10;\nif (num > 0) {\n\tconsole.log("Positive number");\n} else {\n\tconsole.log("Negative number");\n}` },
    { id: 21, language: "JavaScript", level: '2', value: `let fruits = ["apple", "banana", "orange"];\nconsole.log(fruits.length);\nconsole.log(fruits[0]);\nfruits.push("grape");\nconsole.log(fruits);` },
    { id: 22, language: "JavaScript", level: '2', value: `let x = 5;\nlet y = 2;\n\nconsole.log(x + y);\nconsole.log(x - y);\nconsole.log(x * y);\nconsole.log(x / y);` },
    { id: 23, language: "JavaScript", level: '2', value: `let numbers = [1, 2, 3, 4, 5];\nlet squaredNumbers = numbers.map(num => num ** 2);\nconsole.log(squaredNumbers);` },
    { id: 24, language: "JavaScript", level: '3', value: `function fetchData() {\n\treturn new Promise((resolve, reject) => {\n\t\tsetTimeout(() => {\n\t\t\tresolve("Data fetched successfully!");\n\t\t}, 2000);\n\t});\n}\n\nfetchData()\n\t.then(data => console.log(data))\n\t.catch(error => console.error(error));` },
    { id: 25, language: "JavaScript", level: '3', value: `function factorial(n) {\n\tif (n <= 1) {\n\t\treturn 1;\n\t} else {\n\t\treturn n * factorial(n - 1);\n\t}\n}\n\nconsole.log(factorial(5));` },
    { id: 26, language: "JavaScript", level: '3', value: `function outer() {\n\tlet count = 0;\n\tfunction inner() {\n\t\tcount++;\n\t\tconsole.log(count);\n\t}\n\treturn inner;\n}\nlet counter = outer();\ncounter();\ncounter();` },
    { id: 27, language: "JavaScript", level: '3', value: `function divide(a, b) {\n\ttry {\n\t\tif (b === 0) {\n\t\t\tthrow new Error("Divide by zero error");\n\t\t}\n\t\treturn a / b;\n\t} catch (error) {\n\t\tconsole.error(error);\n\t}\n}\nconsole.log(divide(10, 0));` },
    { id: 28, language: "JavaScript", level: '3', value: `async function getData() {\n\ttry {\n\t\tconst data = await fetchData();\n\t\tconsole.log(data);\n\t} catch (error) {\n\t\tconsole.error(error);\n\t}\n}\n\ngetData();` },
    { id: 29, language: "JavaScript", level: '3', value: `function fibonacci(n, memo = {}) {\n\tif (n in memo) {\n\t\treturn memo[n];\n\t}\n\tif (n <= 2) {\n\t\treturn 1;\n\t}\n\tconst result = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);\n\tmemo[n] = result;\n\treturn result;\n}\nconsole.log(fibonacci(5));` },
    { id: 30, language: "JavaScript", level: '3', value: `function memoize(fn) {\n\tconst cache = {};\n\treturn function (...args) {\n\t\tconst key = JSON.stringify(args);\n\t\tif (key in cache) {\n\t\t\treturn cache[key];\n\t\t}\n\t\tconst result = fn.apply(this, args);\n\t\tcache[key] = result;\n\t\treturn result;\n\t};\n}` },
    { id: 31, language: "JavaScript", level: '3', value: `f\nf\nf\nf\nf\nf\nf\nf\nf\nf\nf\nf\nf\n` },
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