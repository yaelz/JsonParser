"use strict";

function JsonParser() {

};

JsonParser.prototype.parse = function (str) {
    if (str === '{}') {
        return {};
    } else {
        var propertyArr = parseKeyValue(str);
        var newObj = {};
//        propertyArr.forEach(function (item) {
//            newObj[item[0]] = item[1];
//        ]});
        newObj[propertyArr[0]] = propertyArr[1];
        return newObj;
    }
};

function isString(input)
{
    var firstIsQuotation = (input.substr(0,1) === '"');
    var lastIsQuotation = input.substr(input.length - 1, input.length) === '"';
    return firstIsQuotation && lastIsQuotation;
};

function isBoolean(input)
{
    var firstIsQuotation = (input.substr(0,1) === '"');
    var lastIsQuotation = input.substr(input.length - 1, input.length) === '"';
    return firstIsQuotation && lastIsQuotation && input.substr(1, input.length-1);
};

function isArray(valString) {
    return valString.charAt(0) == '[';
}

function parseArray(valString) {
    if (valString == "[]") {
        return [];
    }

    var len = valString.length;
    var valString = valString.substring(1, len - 1);
    var valuesArr = valString.split(",");
    var retArr = [];
    valuesArr.forEach(function (item) {
        item = parseValue(item);
        retArr.push(item);} );
    return retArr;
}

function isNumber(valString) {
    return !isNaN(valString);
}
function isBooleanValue(valString) {
    return (valString === "true") || (valString === "false");
}
function parseBoolean(valString) {
    return (valString == "false") != Boolean(valString);
}
function parseString(valString) {
    return valString.substr(1, valString.length - 2);
}
function parseValue(valString) {

    if (isArray(valString)) {
        return parseArray(valString)
    }

    if (isNumber(valString)) {
        return Number(valString);
    }

    if (isBooleanValue(valString)) {
        return parseBoolean(valString);
    }
    return parseString(valString);
}

function parseKeyValue (str) {
    var len = str.length;
    var property = str.substring(1, len - 1);
    var splits = property.split(':');
    var key = splits[0];
    key = key.trim();
    key = key.substring(1, key.length - 1);

    var value = splits[1].trim();
        var value = parseValue(value);
    var propertyArr = [];
    propertyArr.push(key);
    propertyArr.push(value);
    return propertyArr;
};

