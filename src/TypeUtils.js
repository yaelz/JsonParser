function isArray(valString) {
    if (valString.charAt(0) !== '[') {
        return false;
    }
    var len = valString.length;
    var str = valString;
    var numOfUnbalanced = 1;
    var index = 1;
    while (index < len) {
        if (str.charAt(index) === '[') {
            numOfUnbalanced++;
        } else if (str.charAt(index) === ']') {
            numOfUnbalanced--;
        }
        index++;
    }
    return numOfUnbalanced === 0;
}

function isNumber(valString) {
    return !isNaN(valString) && valString != '';
}

function isString(valString) {
    var len = valString.length;
    return valString.charAt(0) === '"' && valString.charAt(len-1) === '"';
}

function isBoolean(valString) {
    return (valString === "true") || (valString === "false");
}