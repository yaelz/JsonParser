describe("TypeUtilsTest", function() {
    describe("Is String", function() {
        it("should return true on a string", function() {
            expect(isString('"hi"')).toEqual(true);
        });
        it("should return false on a string without a close quotation", function() {
            expect(isString('"hi')).toEqual(false);
        });
        it("should return true on a string", function() {
            expect(isString('3')).toEqual(false);
        });
    });

    describe("Is array", function() {
        it("should return true on an empty array", function() {
            expect(true).toEqual(isArray('[]'));
        });

        it("should return false on one opening parenthesis", function() {
            expect(false).toEqual(isArray('['));
        });
    });

    describe("isValidValue", function() {
        it("should return false on nothing", function() {
            expect(false).toEqual(isValidValue(''));
        });

        it("should return true on a string", function() {
            expect(true).toEqual(isValidValue('""'));
        });

        it("should return true on a string", function() {
            expect(true).toEqual(isValidValue('3'));
        });

        it("should return true on a string", function() {
            expect(true).toEqual(isValidValue('false'));
        });

    });

});