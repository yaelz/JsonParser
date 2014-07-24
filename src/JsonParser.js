"use strict";

function JsonParser() {

}

//(function(){


JsonParser.prototype.parse = function (str) {
    if (str === '{}') {
        return {};
    } else {
        var len = str.length;
        var property = str.substring(1, len - 1);
        var newObj = {};
        property= parseKeyValue(property);
        var keyVal = property;
        newObj[keyVal[0]] = keyVal[1];
        return newObj;
    }
};



function parseBoolean(valString) {
    return (valString == "false") != Boolean(valString);
}

function parseString(valString) {
    return valString.substring(1, valString.length - 1);
}

function isValidValue (valString) {
    var array = isArray(valString);
    var number = isNumber(valString);
    var string = isString(valString);
    var boolean = isBoolean(valString);
    return array || number || string || boolean;
}

function parseArray(valString) {
    if (valString == "[]") {
        return [];
    }
    var len = valString.length;
    var str = valString.substring(1,len-1);
    var retArr = [];
    var index = 1;
    var commaSeparated = str.split(',');
    var index = 0;
    var commaSeparatedLength = commaSeparated.length;
    var currStrVal='';
    while (index < commaSeparatedLength) {
        currStrVal += commaSeparated[index];
        // TODO the same with isValidTuple
        if (isValidValue(currStrVal)) {
            retArr.push(parseValue(currStrVal));
            currStrVal = '';
        } else {
            currStrVal += ',';
        }
        index++;
    }

    return retArr;
}

function parseValue(valString) {
    if (isArray(valString)) {
        return parseArray(valString);
    }
    if (isNumber(valString)) {
        return Number(valString);
    }
    if (isBoolean(valString)) {
        return parseBoolean(valString);
    }
    if (isString(valString)) {
        return parseString(valString);
    }
    return Error('Invalid value to parse: '+valString);
}

function parseKeyValue (str) {
    //console.log(str);
    var splits = str.split(':');
    var key = splits[0].trim();
    key = key.substring(1, key.length - 1);

    var valStr = splits[1].trim();
    var value = parseValue(valStr);
    var propertyArr = [];
    propertyArr.push(key);
    propertyArr.push(value);
    return propertyArr;
}

//})();