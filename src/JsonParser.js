"use strict";

function JsonParser() {

};

JsonParser.prototype.parse = function (str) {
    if (str === '{}') {
        return {};
    } else {
        var len = str.length;
        var property = str.substring(1, len - 1);
        var newObj = {};
        var rest = property;
        while (rest !== '') {
            var propertyAndRestArr = parseKeyValueAndRest(property);
            var keyVal = propertyAndRestArr[0];
            newObj[keyVal[0]] = keyVal[1];
            rest = propertyAndRestArr[1];
        }
        return newObj;
    }
};

function isArray(valString) {
    return valString.charAt(0) == '[';
}

function parseArray(valString) {
    if (valString == "[]") {
        return [];
    }

    var len = valString.length;
    valString = valString.substring(1, len - 1);
    var valuesArr = valString.split(",");
    var retArr = [];
    var isInnerArray = false;
    var innerArrayStr = '';
    valuesArr.forEach(function (item) {
            /*if (innerArrayStr) {
                innerArrayStr += item;
                if (item.charAt(item.length-1)) {
                    parseArray(innerArrayStr);
                    isInnerArray = false;
                }
            }
            else if (isArray(item)) {
                isInnerArray = true;
                innerArrayStr += item;
            } else */{
                // TODO refactor! Could there be rest ???
                var itemAndRest = parseValueAndRest(item);
                item = itemAndRest[0];
                retArr.push(item);
            }
        } );
    return retArr;
}

function isNumber(valString) {
    return !isNaN(valString);
}

function isBoolean(valString) {
    return (valString === "true") || (valString === "false");
}

function parseBoolean(valString) {
    return (valString == "false") != Boolean(valString);
}

function parseString(valString) {
    return valString.substr(1, valString.length - 2);
}

function splitValAndRest(valString) {
    var firstCommaChar = valString.indexOf(',');
    var valStr;
    var rest = '';
    if (firstCommaChar !== -1) {
        valStr = valString.substr(0, firstCommaChar);
        rest = valString.substr(firstCommaChar + 1, valString.length);
    } else {
        valStr = valString;
    }
    return [valStr, rest];
}

function splitValAndRestArray (valString) {
    var numOfUnBalanced = 1;
    var str = valString;
    var index = 1;
    while (numOfUnBalanced) {
        if (str.charAt(index) === '[') {
            numOfUnBalanced++;
        } else if (str.charAt(index) === ']') {
            numOfUnBalanced--;
        }
        index++;
    }
    return [str.substring(0, index), str.substring(index)];
}

function parseValueAndRest(valString) {
    if (isArray(valString)) {
        var valAndRest = splitValAndRestArray(valString);
        return [parseArray(valAndRest[0]), valAndRest[1]];
    }
    if (isNumber(valString)) {
        var valAndRest = splitValAndRest(valString);
        return [Number(valAndRest[0]), valAndRest[1]];
    }
    if (isBoolean(valString)) {
        var valAndRest = splitValAndRest(valString);
        return [parseBoolean(valAndRest[0]), valAndRest[1]];
    }
    var valAndRest = splitValAndRest(valString);
    return [parseString(valAndRest[0]), valAndRest[1]];
}

function parseKeyValueAndRest (str) {
    var splits = str.split(':');
    var key = splits[0];
    key = key.trim();
    key = key.substring(1, key.length - 1);

    var value = splits[1].trim();
//    value = parseValueAndRest(value);
    var valueAndRest = parseValueAndRest(value);
    var value = valueAndRest[0];
    var rest = valueAndRest[1];
    var propertyArr = [];
    propertyArr.push(key);
    propertyArr.push(value);
    return [propertyArr, ''];
};

