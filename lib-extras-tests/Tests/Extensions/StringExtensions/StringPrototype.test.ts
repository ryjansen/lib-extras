describe("lib-extras.Extensions.StringExtensions", () => {
    describe("StringPrototype", () => {

        describe("format", () => {
            it("should correctly format strings with unnamed arguments", () => {
                expect("".format(0, 1)).toBe("");
                expect("test".format(0, 1)).toBe("test");
                expect("test {0} {1}".format(0, 1)).toBe("test 0 1");
                expect("test {0} {1}".format(0, 1, 2)).toBe("test 0 1");
                expect("test {0} {2}".format(0, 1, 2)).toBe("test 0 2");
            });

            it("should correctly format strings with named arguments", () => {
                expect("".format({ zero: 0, one: 1 })).toBe("");
                expect("test".format({ zero: 0, one: 1 })).toBe("test");
                expect("test {zero} {one}".format({ zero: 0, one: 1 })).toBe("test 0 1");
                expect("test {zero} {one}".format({ zero: 0, one: 1, two: 2 })).toBe("test 0 1");
                expect("test {zero} {two}".format({ zero: 0, one: 1, two: 2 })).toBe("test 0 2");
            });

            it("should handle arguments with curly braces in them", () => {
                expect("test {0} {1}".format("{1}", "{0}")).toBe("test {1} {0}");
                expect("test {0} {1}".format("{2}", "{1}", "{0}")).toBe("test {2} {1}");
                expect("test {0} {2}".format("{2}", "{1}", "{0}")).toBe("test {2} {0}");
            });
        });


        describe("equals", () => {
            it("should correctly check a string for equality", () => {
                expect("".equals("")).toBe(true);
                expect("a".equals("")).toBe(false);
                expect("a".equals("b")).toBe(false);
                expect("b".equals("a")).toBe(false);
                expect("a".equals("a")).toBe(true);
            });

            it("should correctly check non-string objects for equality by calling toString", () => {
                expect("a".equals(null)).toBe(false);
                expect("a".equals(undefined)).toBe(false);
                expect("5".equals(<any>5)).toBe(true);
            });
        });

        describe("equalsIgnoreCase", () => {
            it("should correctly check a string for equality and ignore case", () => {
                expect("".equalsIgnoreCase("")).toBe(true);
                expect("a".equalsIgnoreCase("")).toBe(false);
                expect("a".equalsIgnoreCase("B")).toBe(false);
                expect("b".equalsIgnoreCase("A")).toBe(false);
                expect("a".equalsIgnoreCase("A")).toBe(true);
            });

            it("should correctly check non-string objects for equality by calling toString", () => {
                expect("a".equalsIgnoreCase(null)).toBe(false);
                expect("a".equalsIgnoreCase(undefined)).toBe(false);
                expect("5".equalsIgnoreCase(<any>5)).toBe(true);
                expect("NULL".equalsIgnoreCase(null)).toBe(true);
            });
        });
    });
});
