# Exercise 1
def reduceFraction(num, den):
    i = 2
    while i <= min(num, den):
        if num % i == 0 and den % i == 0:
            num = num / i
            den = den / i
        else:
            i = i + 1
    res = (num, den)
    return res


# Exercise 2
def isMagicDate(day, month, year):
    num = day * month
    last = year % 100
    if num == last:
        return True
    else:
        return False


# Exercise 3
def sublist(l):
    res = [[]]
    # i,j points the start and end of the list
    for i in range(0, len(l)):
        for j in range(i + 1, len(l) + 1):
            res.append(l[i:j])
    return res


# Exercise 4
def pigLatin(word):
    # mark whether the word begin with a uppercase
    capital_mark = word[0].isupper()
    # change the word to lowercase
    res = word.lower()
    # store the word last char, in case it is a punctuation
    last = word[-1:]
    last_mark = False
    if not last.isalpha():
        res = word[0:-1]
        last_mark = True
    if is_consonant(res):
        while (is_consonant(res)):
            res = res + res[0]
            res = res[1:]
        res = res + 'ay'
    else:
        res = res + 'way'
    if capital_mark:
        res = res.capitalize()
    if last_mark:
        res = res + last

    return res


# judge whether the word begin with consonant
def is_consonant(word):
    word = word.lower()
    res = word[0] in 'aeiou'
    if res:
        return False
    else:
        return True


# Exercise 5
def morseCode(message):
    morse = {
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
    }
    res = ''
    msg = message.upper()
    for i in range(0, len(msg)):
        # msg can only contain key as the char
        if msg[i].isalnum():
            res = res + morse[msg[i]] + ' '
    res = res[:-1]
    return res


# Exercise 6
def int2Text(num):
    ones = {
        '1': 'one', '2': 'two', '3': 'three', '4': 'four', '5': 'five',
        '6': 'six', '7': 'seven', '8': 'eight', '9': 'nine', '10': 'ten', '11': 'eleven',
        '12': 'twelve', '13': 'thirteen', '14': 'fourteen', '15': 'fifteen', '16': 'sixteen',
        '17': 'seventeen', '18': 'eighteen', '19': 'nineteen'
    }
    tens = {
        '2': 'twenty', '3': 'thirty', '4': 'forty', '5': 'fifty', '6': 'sixty', '7': 'seventy',
        '8': 'eighty', '9': 'ninety'
    }
    res = ''
    if num >= 100:
        hun = num // 100
        hun_str = str(hun)
        res = ones[hun_str] + ' ' + 'hundred' + ' '
        # refresh the num to the new number which hundred had been deleted
        num = num % 100
    if num >= 20:
        ten = num // 10
        ten_str = str(ten)
        res = res + tens[ten_str] + ' '
        num = num % 10
    if num > 0:
        num_str = str(num)
        res = res + ones[num_str] + ' '
    res = res[:-1]
    return res


# Exercise 7
def missingComment(filename):
    f = open(filename)
    res = []
    list = f.read().split('\n')
    if is_function(list[0]):
        res.append(function_name(list[0]))
    for i in range(1, len(list)):
        if is_function(list[i]):
            if not is_comment(list[i - 1]):
                res.append(function_name(list[i]))
    return res


# whether a string is format as a comment
def is_comment(str):
    if str == None or len(str) < 1:
        return False
    if str[0] == '#':
        return True
    else:
        return False


# whether a string is format as a function
def is_function(str):
    if str == None or len(str) < 1:
        return False
    if str[0:4] == 'def ':
        return True
    else:
        return False


# deal withe the function line to get function name
def function_name(str):
    str = str[4:]
    i = str.find('(')
    str = str[:i]
    return str


# Exercise 8
def consistentLineLength(filename, length):
    f = open(filename)
    str = ''
    for line in f.readlines():
        line = line.strip()
        str = str + line + ' '
    str = str[:-1]
    # convert the str into list, each element is a single word
    str_list = str.split()
    res = []
    i = 0
    while i <= len(str_list) - 1:
        s = ''
        # use tempLength to mark whether the sentence is under length
        temp_length = length
        while i <= len(str_list) - 1:
            if temp_length - len(str_list[i]) >= 0:
                s = s + str_list[i] + ' '
                temp_length = temp_length - len(str_list[i]) - 1
                i = i + 1
            else:
                break
        res.append(s[:-1])
    return res


# Exercise 9
def knight(start, end, moves):
    # use a grid to represent the board, so map the col to index by dictionary
    col = {'a': 0, 'b': 1, 'c': 2, 'd': 3, 'e': 4, 'f': 5, 'g': 6, 'h': 7}
    # convert the input parameter to grid's index
    start_row = int(start[1]) - 1
    start_col = col[start[0]]
    end_row = int(end[1]) - 1
    end_col = col[end[0]]
    # array represents the board, each element is 0
    arr = [[0 for i in range(0, 8)] for i in range(0, 8)]
    # change the element of target position to 1 !!!!!!!!
    arr[end_row][end_col] = 1
    res = knight_dfs(arr, start_row, start_col, moves)
    return res


'''
    inspired by the algorithm: depth first search,
    move every possible direction to judge whether it's on target position,
    arr ： a 8*8 grid,
    i,j ：the index of arr,
    n ：the given moves, limiting the depth of this function
'''


def knight_dfs(arr, i, j, n):
    # if it has moved maximum length, return false
    if n < 0:
        return False
    # if it move to the position beyond arr，return false
    if i < 0 or i > 7 or j < 0 or j > 7:
        return False
    # if it is in the target position, return true
    if arr[i][j] == 1:
        return True
    return (knight_dfs(arr, i + 1, j + 2, n - 1)
            or knight_dfs(arr, i + 1, j - 2, n - 1)
            or knight_dfs(arr, i - 1, j + 2, n - 1)
            or knight_dfs(arr, i - 1, j - 2, n - 1)
            or knight_dfs(arr, i + 2, j + 1, n - 1)
            or knight_dfs(arr, i + 2, j - 1, n - 1)
            or knight_dfs(arr, i - 2, j + 1, n - 1)
            or knight_dfs(arr, i - 2, j - 1, n - 1))


# Exercise 10
def warOfSpecies(environment):
    x = len(environment)
    y = len(environment[0])
    res = [['' for i in range(y)] for i in range(x)]
    result = ['' for i in range(x)]
    # edit_arr: modified array (given array added elements '1' at boundary )
    edit_arr = [['1' for i in range(y + 2)] for i in range(x + 2)]
    for i in range(1, x + 1):
        for j in range(1, y + 1):
            edit_arr[i][j] = environment[i - 1][j - 1]
    # loop each element in grid and change it
    for i in range(1, x + 1):
        for j in range(1, y + 1):
            char = edit_arr[i][j]
            dict = surround(edit_arr, i, j)
            res[i - 1][j - 1] = change(char, dict)
    # convert res to target format
    for i in range(0, x):
        for j in range(0, y):
            result[i] += res[i][j]
    return result


'''
    the function use the rule change the current species to the target one
    dict: is a dictionary
        key:surround species
        value:the number of key species
    char: current species
'''


def change(char, dict):
    if char == '.':
        if dict['X'] >= 2 or dict["O"] >= 2:
            if dict['X'] == dict['O']:
                return '.'
            if dict['X'] > dict['O']:
                return 'X'
            if dict['X'] < dict['O']:
                return 'O'
        else:
            return '.'
    if char == 'O':
        if dict['X'] + dict['O'] > 6 or dict['O'] < 3 or dict['O'] < dict['X']:
            return '.'
        else:
            return 'O'
    if char == 'X':
        if dict['X'] + dict['O'] > 6 or dict['X'] < 3 or dict['O'] > dict['X']:
            return '.'
        else:
            return 'X'


'''
    use dictionary sum to mark the number of species !!
    arr: the modified array (given array added elements '1' at boundary )
    i,j: current index
    return a dictionary with surround species and numbers
'''


def surround(list, i, j):
    sum = {'X': 0, 'O': 0, '.': 0, '1': 0}
    sum[list[i - 1][j - 1]] += 1
    sum[list[i - 1][j]] += 1
    sum[list[i - 1][j + 1]] += 1
    sum[list[i][j - 1]] += 1
    sum[list[i][j + 1]] += 1
    sum[list[i + 1][j - 1]] += 1
    sum[list[i + 1][j]] += 1
    sum[list[i + 1][j + 1]] += 1
    return sum
