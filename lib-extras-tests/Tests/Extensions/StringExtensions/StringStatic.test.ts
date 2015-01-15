describe("lib-extras.Extensions.StringExtensions", () => {
    describe("StringStatic", () => {
        it("should create a global object", () => {
            expect(StringStatic).toBeDefined();
            expect(StringStatic).toBe(String);
        });

        describe("equals", () => {
            it("should correctly check a string for equality", () => {
                expect(StringStatic.equals("", "")).toBe(true);
                expect(StringStatic.equals("a", "")).toBe(false);
                expect(StringStatic.equals("a", "b")).toBe(false);
                expect(StringStatic.equals("b", "a")).toBe(false);
                expect(StringStatic.equals("a", "a")).toBe(true);
            });

            it("should correctly check non-string objects for equality by calling toString", () => {
                expect(StringStatic.equals("a", null)).toBe(false);
                expect(StringStatic.equals("a", undefined)).toBe(false);
                expect(StringStatic.equals("5", <any>5)).toBe(true);
            });
        });

        describe("equalsIgnoreCase", () => {
            it("should correctly check a string for equality and ignore case", () => {
                expect(StringStatic.equalsIgnoreCase("", "")).toBe(true);
                expect(StringStatic.equalsIgnoreCase("a", "")).toBe(false);
                expect(StringStatic.equalsIgnoreCase("a", "B")).toBe(false);
                expect(StringStatic.equalsIgnoreCase("b", "A")).toBe(false);
                expect(StringStatic.equalsIgnoreCase("a", "A")).toBe(true);
            });

            it("should correctly check non-string objects for equality by calling toString", () => {
                expect(StringStatic.equalsIgnoreCase("a", null)).toBe(false);
                expect(StringStatic.equalsIgnoreCase("a", undefined)).toBe(false);
                expect(StringStatic.equalsIgnoreCase("5", <any>5)).toBe(true);
                expect(StringStatic.equalsIgnoreCase("NULL", null)).toBe(true);
            });
        });
    });
});
