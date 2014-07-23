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

function parseValue(valString) {
    var value;
    if (!isNaN(valString)) {
        value = Number(valString);
    } else if (valString === "true" || valString === "false") {
        value = (value == "false") != Boolean(value);
    } else {
        value = valString.substr(1, valString.length - 2);
    }
    // TODO default?
    return value;
}
function parseKeyValue (str) {
    var len = str.length;
    var property = str.substring(1, len - 1);
    var splits = property.split(':');
    var key = splits[0];
    key = key.trim();
    key = key.substring(1, key.length - 1);

    var value = splits[1].trim();
    if (value == '[]') {
        value = [];
    } else if (value.charAt(0) == '[') {
        len = value.length;
        value = value.substring(1, len - 1);
        var valuesArr = value.split(",");
        var retArr = [];
        valuesArr.forEach(function (item) {
            item = parseValue(item);
            retArr.push(item);} );
        value = retArr;
    } else {
        var value = parseValue(value);
    }
    var propertyArr = [];
    propertyArr.push(key);
    propertyArr.push(value);
    return propertyArr;
};

