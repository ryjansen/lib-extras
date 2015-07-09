describe("lib.extras.ES6.StringPolyfills", () => {

    describe("includes", () => {
        it("should return true if a substring is found", () => {
            expect("This is a test".includes("is a")).toBe(true);
        });

        it("should return false if a substring is not found", () => {
            expect("This is a test".includes("is not a")).toBe(false);
        });
    });

    describe("startsWith", () => {
        it("should return true if the string starts with the substring", () => {
            expect("This is a test".startsWith("This")).toBe(true);
        });

        it("should return false if the string does not start with the substring", () => {
            expect("This is a test".startsWith("test")).toBe(false);
        });

        it("should start searching from position if specified", () => {
            expect("This is a test".startsWith("is", 5)).toBe(true);
            expect("This is a test".startsWith("This", 5)).toBe(false);
        });
    });

    describe("endsWith", () => {
        it("should return true if the string ends with the substring", () => {
            expect("This is a test".endsWith("test")).toBe(true);
        });

        it("should return false if the string does not end with the substring", () => {
            expect("This is a test".endsWith("This")).toBe(false);
        });

        it("should start searching from position if specified", () => {
            expect("This is a test".endsWith("a", 9)).toBe(true);
            expect("This is a test".endsWith("test", 5)).toBe(false);
        });
    });

    describe("repeat", () => {
        it("should correctly repeat strings", () => {
            expect("abc".repeat(0)).toBe("");
            expect("abc".repeat(1)).toBe("abc");
            expect("abc".repeat(2)).toBe("abcabc");
            expect("abc".repeat(3.5)).toBe("abcabcabc");
            expect("".repeat(5)).toBe("");
        });

        it("should throw RangeError for bad count values", () => {
            expect(() => { "abc".repeat(-1); }).toThrow();
            expect(() => { "abc".repeat(Infinity); }).toThrow();
        });
    });
});
