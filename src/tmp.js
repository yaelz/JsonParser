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
 } else */