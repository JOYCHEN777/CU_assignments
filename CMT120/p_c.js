// Exercise 1
function reduceFraction(num, den) {
    let min = Math.min(num, den);
    let div;
    let ans = new Array(2);
    //use for loop find the biggest div
    for (let i = 1; i <= min; i++) {
        if (num % i === 0 && den % i === 0) {
            div = i;
        }
    }
    ans[0] = num / div;
    ans[1] = den / div;
    return ans;
}

// Exercise 2
function isMagicDate(day, month, year) {
    let num = day * month;
    let last = year % 100;
    if (num === last) {
        return true
    } else
        return false;
}

// Exercise 3
function sublist(l) {
    let ans = [[]];
    let len = l.length;
    for (let i = 0; i < len; i++) {
        for (let j = i + 1; j <= len; j++) {
            let sub = l.slice(i, j);
            ans.push(sub);
        }
    }
    return ans;
}

// Exercise 4
function pigLatin(word) {
    let res = word.toLowerCase();
    // use a variable to mark the initial case: true/false
    let markCapital = isUppercase(word);
    // if the word end with punctuation mark, use a variable to store it, and delete it
    let last = '';
    if (hasPunctuation(word)) {
        last = last + word[word.length - 1];
        res = res.slice(0, word.length - 1);
    }
    //situation1: the word begins with a consonant
    if (isConsonant(res)) {
        while (isConsonant(res)) {
            res = res + res[0];
            res = res.slice(1);
        }
        res = res + 'ay';
    }
    //situation2: add 'way' in the end
    else {
        res = res + 'way';
    }
    if (markCapital) {
        res = res.charAt(0).toUpperCase() + res.slice(1);
    }
    res = res + last;
    return res;
}

//determine if the word begin with a consonant
function isConsonant(word) {
    let newWord = word.toLowerCase();
    if (newWord[0] === 'a' || newWord[0] === 'e' || newWord[0] === 'i' || newWord[0] === 'o' || newWord[0] === 'u') {
        return false;
    }
    return true;
}

//determine if the word begin with a uppercase
function isUppercase(word) {
    let newWord = word.toLowerCase();
    if (word == newWord) {
        return false;
    }
    return true;
}

//determine if the word end with a punctuation
function hasPunctuation(word) {
    let regChar = /[a-zA-Z]/;
    let l = word.charAt(word.length - 1);
    let res = regChar.test(l);
    if (res == true) {
        return false;
    }
    return true;
}

// Exercise 5
function morseCode(message) {
    const morse = {
        'A': '.-',
        'B': '-...',
        'C': '-.-.',
        'D': '-..',
        'E': '.',
        'F': '..-.',
        'G': '--.',
        'H': '....',
        'I': '..',
        'J': '.---',
        'K': '-.-',
        'L': '.-..',
        'M': '--',
        'N': '-.',
        'O': '---',
        'P': '.--.',
        'Q': '--.-',
        'R': '.-.',
        'S': '...',
        'T': '-',
        'U': '..-',
        'V': '...-',
        'W': '.--',
        'X': '-..-',
        'Y': '-.--',
        'Z': '--..',
        '1': '.----',
        '2': '..---',
        '3': '...--',
        '4': '....-',
        '5': '.....',
        '6': '-....',
        '7': '--...',
        '8': '---..',
        '9': '----.',
        '10': '-----'
    };
    let res = '';
    message = message.toUpperCase();
    let str = '';
    // str can only contain key as the char
    for (let i = 0; i <= message.length - 1; i++) {
        let char = message.charAt(i);
        if (isKey(char)) {
            str = str + char;
        }
    }
    for (let i = 0; i <= str.length - 1; i++) {
        res = res + morse[str.charAt(i)] + ' ';
    }
    res = res.slice(0, res.length - 1);
    return res;
}

//this function can filtering illegal characters
function isKey(char) {
    let regChar = /[A-Z0-9]/;
    let res = regChar.test(char);
    if (res == true) {
        return true;
    }
    return false;
}

// Exercise 6
function int2Text(num) {
    // dictionary ones maps the number<20
    const ones = {
        '1': 'one', '2': 'two', '3': 'three', '4': 'four', '5': 'five',
        '6': 'six', '7': 'seven', '8': 'eight', '9': 'nine', '10': 'ten', '11': 'eleven',
        '12': 'twelve', '13': 'thirteen', '14': 'fourteen', '15': 'fifteen', '16': 'sixteen',
        '17': 'seventeen', '18': 'eighteen', '19': 'nineteen'
    };
    //dictionary tens maps the decade of a number
    const tens = {
        '2': 'twenty', '3': 'thirty', '4': 'forty', '5': 'fifty', '6': 'sixty', '7': 'seventy',
        '8': 'eighty', '9': 'ninety'
    };
    let res = new String();
    if (num >= 100) {
        //variable hun store the hundred of the input number
        let hun = parseInt(num / 100);
        res = ones[hun] + ' ' + 'hundred' + ' ';
        //refresh the num to the new number which hundred had been deleted
        num = num % 100;
    }
    if (num >= 20) {
        let ten = parseInt(num / 10);
        res = res + tens[ten] + ' ';
        num = num % 10;
    }
    if (num > 0) {
        res = res + ones[num] + ' ';
    }
    //every res has been added '(blank)', so remove the last in the end
    res = res.slice(0, res.length - 1);
    return res;
}


// Exercise 7
function missingComment(filename) {
    let res = new Array();
    const fs = require("fs");
    const data = fs.readFileSync(filename, "utf8");
    //convert the data to array, elements is separated by line
    let arr = data.toString().split("\n");
    let len = arr.length;
    //if the fist line is a function, add it to result
    if (isFunction(arr[0])) {
        res.push(functionName(arr[0]));
    }
    //using a loop to find a function, then judge whether the previous line is a comment
    for (let i = 1; i <= len - 1; i++) {
        if (isFunction(arr[i])) {
            if (!(isComment(arr[i - 1]))) {
                res.push(functionName(arr[i]));
            }
        }
    }
    return res;
}

//whether a string is format as a comment
function isComment(str) {
    let reg = /\/\/.+/;
    let res = reg.test(str);
    return res;
}

//whether a string is format as a function
function isFunction(str) {
    let reg = /function\s.+/;
    let res = reg.test(str);
    return res;
}

//deal withe the function line to get function name
function functionName(str) {
    let sub = str.slice(9);
    let reg = /\s*\(.*/;
    let res = sub.replace(reg, '');
    return res;
}

// Exercise 8
function consistentLineLength(filename, length) {
    let res = new Array();
    const fs = require("fs");
    const data = fs.readFileSync(filename, "utf8");
    let reg = /[\s\n]/;
    //convert the data into arr, each element is a single word
    let arr = data.toString().split(reg);
    //delete with the '' in arr
    arr = deleteNull(arr);
    let i = 0;
    while (i <= arr.length - 1) {
        let s = '';
        //use tempLength to mark whether the sentence is under length
        let tmpLength = length;
        while (i <= arr.length - 1) {
            if (tmpLength - arr[i].length >= 0) {
                s += arr[i] + ' ';
                tmpLength -= (arr[i].length + 1);
                i++;
            } else {
                break;
            }
        }
        res.push(s.slice(0, s.length - 1));
    }
    return res;
}

//delete '' in an array
function deleteNull(arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] == '') {
            arr.splice(i, 1);
        }
    }
    return arr;
}

// Exercise 9
function knight(start, end, moves) {
    //use a grid to represent the board, so map the col to index by dictionary
    let col = {'a': 0, 'b': 1, 'c': 2, 'd': 3, 'e': 4, 'f': 5, 'g': 6, 'h': 7};
    //convert the input parameter to grid's index
    let startRow = (start.charAt(1)) - 1;
    let startCol = col[start.charAt(0)];
    let endRow = (end.charAt(1)) - 1;
    let endCol = col[end.charAt(0)];
    //array represents the board, each element is 0
    let arr = new Array();
    for (let i = 0; i <= 7; i++) {
        arr[i] = new Array();
        for (let j = 0; j <= 7; j++) {
            arr[i][j] = 0;
        }
    }
    //change the element of target position to -1 !!!!!!!!
    arr[endRow][endCol] = -1;
    //dfs
    let res = dfs(arr, startRow, startCol, moves);
    return res;
}

/*
    inspired by the algorithm: depth first search,
    move every possible direction to judge whether it's on target position,
    arr is a 8*8 grid,
    i,j is the index of arr,
    n is the given moves, limiting the depth of this function
 */
function dfs(arr, i, j, n) {
    // if it has moved maximum length, return false
    if (n < 0) {
        return false;
    }
    // if it move to the position beyond arr，return false
    if (i < 0 || j < 0 || i > 7 || j > 7) {
        return false;
    }
    // if it is in the target position, return true
    if (arr[i][j] == -1) {
        return true;
    }
    // the function start and recursion here, it will go every path with limited moves
    return dfs(arr, i + 2, j + 1, n - 1) ||
        dfs(arr, i + 2, j - 1, n - 1) ||
        dfs(arr, i - 2, j + 1, n - 1) ||
        dfs(arr, i - 2, j - 1, n - 1) ||
        dfs(arr, i + 1, j + 2, n - 1) ||
        dfs(arr, i + 1, j - 2, n - 1) ||
        dfs(arr, i - 1, j + 2, n - 1) ||
        dfs(arr, i - 1, j - 2, n - 1);

}

// Exercise 10
function warOfSpecies(environment) {
    let result = new Array();
    let res = new Array();
    for (let i = 0; i <= environment.length - 1; i++) {
        res[i] = new Array();
        for (let j = 0; j <= environment[0].length - 1; j++) {
            res[i][j] = '';
        }
    }
    //editArr: modified array (given array added elements '1' at boundary )
    let editArr = new Array();
    for (let i = 0; i <= environment.length + 1; i++) {
        editArr[i] = new Array();
        for (let j = 0; j <= environment[0].length + 1; j++) {
            if (i == 0 || i == environment.length + 1 || j == 0 || j == environment[0].length + 1) {
                editArr[i][j] = '1';
            } else {
                editArr[i][j] = environment[i - 1][j - 1];
            }

        }
    }
    //loop each element in grid and change it
    for (let i = 1; i <= environment.length; i++) {
        for (let j = 1; j <= environment[0].length; j++) {
            let char = editArr[i][j];
            let dict = surround(editArr, i, j);
            res[i - 1][j - 1] = change(char, dict);
        }
    }
    // convert res to target format
    for (let i = 0; i <= environment.length - 1; i++) {
        result[i] = new String();
        for (let j = 0; j <= environment[0].length - 1; j++) {
            result[i] += res[i][j];
        }
    }
    return result;
}

/*
    the function use the rule change the current species to the target one
    dict: is a dictionary
        key:surround species
        value:the number of key species
    char: current species

*/
function change(char, dict) {
    if (char == '.') {
        if (dict['X'] >= 2 || dict["O"] >= 2) {
            if (dict['X'] == dict['O']) {
                return '.';
            }
            if (dict['X'] > dict['O']) {
                return 'X';
            }
            if (dict['X'] < dict['O']) {
                return 'O';
            }
        } else {
            return '.';
        }
    }
    if (char == 'O') {
        if (dict['X'] + dict['O'] > 6 || dict['O'] < 3 || dict['O'] < dict['X']) {
            return '.';
        } else {
            return 'O';
        }
    }
    if (char == 'X') {
        if (dict['X'] + dict['O'] > 6 || dict['X'] < 3 || dict['X'] < dict['O']) {
            return '.';
        } else {
            return 'X';
        }
    }
}

/*
    use dictionary sum to mark the number of species !!
    arr: the modified array (given array added elements '1' at boundary )
    i,j: current index
    return a dictionary with surround species and numbers
 */
function surround(arr, i, j) {
    let sum = {'X': 0, 'O': 0, '.': 0, '1': 0};
    //if it surround position is the key of sum, refresh it value by +1;
    sum[arr[i - 1][j - 1]] += 1;
    sum[arr[i - 1][j]] += 1;
    sum[arr[i - 1][j + 1]] += 1;
    sum[arr[i][j - 1]] += 1;
    sum[arr[i][j + 1]] += 1;
    sum[arr[i + 1][j - 1]] += 1;
    sum[arr[i + 1][j]] += 1;
    sum[arr[i + 1][j + 1]] += 1;
    return sum;
}


module.exports = {
    reduceFraction: reduceFraction,
    isMagicDate: isMagicDate,
    sublist: sublist,
    pigLatin: pigLatin,
    morseCode: morseCode,
    int2Text: int2Text,
    missingComment: missingComment,
    consistentLineLength: consistentLineLength,
    knight: knight,
    warOfSpecies: warOfSpecies
}