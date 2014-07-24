describe("JsonParserTest", function() {
    var parser;


    function expectParseResult(inputStr, expectedJsonObject) {
        var tree = parser.parse(inputStr);
        expect(tree).toEqual(expectedJsonObject);
    }

    beforeEach(function() {
        parser = new JsonParser();
    });

    describe("When Generating a Json object with one primitive Json object", function() {
        it("should parse empty object", function() {
            expectParseResult("{}", {});
        });

        it("should parse object with number as key", function() {
            expectParseResult('{"a":3}', {a : 3});
        });

        it("should parse object with number as value, different value", function() {
            expectParseResult('{"a":4}', {a : 4});
        });

        it("should parse object with number as value, different key", function() {
            expectParseResult('{"b" : 3}',{b: 3});
        });

        it("should parse object with single boolean which is false as value", function() {
            expectParseResult('{"b":false}', {b : false});
        });

        it("should parse object with single boolean which is true as value", function() {
            expectParseResult('{"b":true}', {b : true});
        });

        it("should parse object with string as value", function() {
            expectParseResult('{"a":"str"}', {a : "str"});
        });

        it("should parse object with single empty array", function() {
            expectParseResult('{"b":[]}', {b : []});
        });

        it("should parse object with single element in array", function() {
            expectParseResult('{"b":[1]}', {b : [1]});
        });

        it("should parse object with array", function() {
            expectParseResult('{"b":[1,"str",false]}', {b : [1, "str", false]});
        });
//// TODO complex arrays
        it("should parse object with complex array with inner array empty", function() {
            expectParseResult('{"b":[1,"str",[]]}', {b : [1, "str", []]});
        });
        it("should parse object with complex array with one value in the inner array", function() {
            expectParseResult('{"b":[1,"str",[1]]}', {b : [1, "str", [1]]});
        });
        it("should parse object with complex array with one value in the inner array", function() {
            expectParseResult('{"b":[1,[2],[1]]}', {b : [1, [2], [1]]});
        });
        it("should parse object with complex array with more than one value in the inner array", function() {
            expectParseResult('{"b":[1,"str",[1, 2]]}', {b : [1, "str", [1, 2]]});
        });

//        it("learning String.split", function() {
//
//            expect("[]".split(",")).toEqual(["[]"]);
//            expect("".split(",")).toEqual([""]);
//            expect("[,]".split(",")).toEqual(["[","]"]);
//        });

    });

//    describe("When parsing more than one key-value pair", function() {
//        it("should parse two key-value pairs separately", function() {
//            expectParseResult('{"b":3, "a":4}', {b : 3, a:4});
//        });
//    });

//    describe("Array parser", function() {
//        it("should parse simple array", function() {
//            expect([1,2,3]).toEqual(parseArray('[1,2,3]'));
//        });
//
//        it("should parse array with inner array which is empty", function() {
//            expect([1,[],3]).toEqual(parseArray('[1,[],3]'));
//        });
//
//        it("should parse array with inner array with a value", function() {
//            expect([1,[false],3]).toEqual(parseArray('[1,[false],3]'));
//        });
//
//        it("should parse array with inner array with a value", function() {
//            expect([1,[2,false],3]).toEqual(parseArray('[1,[2,false],3]'));
//        });
//
//    });

// TODO
//    describe("Edge Cases", function() {
//        it("should parse object with redundant spaces", function() {
//            expectParseResult('{  "b"  :  3  }', {b : 3});
//        });
//    });

});