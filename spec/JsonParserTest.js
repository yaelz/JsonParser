describe("JsonParserTest", function() {
    var parser;


    function expectParseResult(inputStr, expectedJsonObject) {
        var tree = parser.parse(inputStr);
        expect(tree).toEqual(expectedJsonObject);
    }

    beforeEach(function() {
        parser = new JsonParser();
    });

    /*describe("When Generating a JsonNumber", function() {
        it("invoking an empty constructor should result in an error", function() {
            var func = function () {new JsonNumber();};
            expect(func).toThrow(new Error('JsonNumber constructor should accept a number'));
        });
        it("invoking constructor with a string should result in an error", function() {
            var func = function () {new JsonNumber('Hello');};
            expect(func).toThrow(new Error('JsonNumber constructor should accept a number'));
        });
        it("invoking constructor with a number should be fine", function() {
            expect(new JsonNumber(3)).toEqual(new JsonNumber(3));
        });
    });*/

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
            var tree = parser.parse('{"b":false}');
            expect(tree).toEqual({b : false});
        });

        it("should parse object with single boolean which is true as value", function() {
            var tree = parser.parse('{"b":true}');
            expect(tree).toEqual({b : true});
        });

        it("should parse object with single empty array", function() {
            var tree = parser.parse('{"b":[]}');
            expect(tree).toEqual({b : []});
        });

        it("should parse object with single element in array", function() {
            var tree = parser.parse('{"b":[1]}');
            expect(tree).toEqual({b : [1]});
        });

        it("should parse object with array", function() {
            var tree = parser.parse('{"b":[1,"str",false]}');
            expect(tree).toEqual({b : [1, "str", false]});
        });

        it("should parse object with array", function() {
            var tree = parser.parse('{"b":[1,"str",false]}');
            expect(tree).toEqual({b : [1, "str", false]});
        });

        it("learning String.split", function() {

            expect("[]".split(",")).toEqual(["[]"]);
            expect("".split(",")).toEqual([""]);
            expect("[,]".split(",")).toEqual(["[","]"]);
        });



    });

    describe("Edge Cases", function() {
        it("should parse object with redundant spaces", function() {
            var tree = parser.parse('{  "b"  :  3  }');
            expect(tree).toEqual({b : 3});
        });
    });

//    describe("When parsing more than one key-value pair", function() {
//        it("should parse object with double tuple-s", function() {
//            var tree = parser.parse('{"b":3, "a":4}');
//            expect(tree).toEqual({b : 3, a : 4});
//        });
//    });


});