describe("lib-extras.Extensions.StringExtensions", () => {
    describe("StringComparer", () => {
        it("should create a global object", () => {
            expect(StringComparer).toBeDefined();
        });

        describe("default", () => {
            it("should correctly compare strings", () => {
                expect(StringComparer.default("a", "b")).toBe(-1);
                expect(StringComparer.default("b", "a")).toBe(1);
                expect(StringComparer.default("a", "a")).toBe(0);
            });

            it("should correctly compare non-string objects by calling toString", () => {
                expect(StringComparer.default(<any>5, <any>5)).toBe(0);
                expect(StringComparer.default(null, null)).toBe(0);
                expect(StringComparer.default(<any>{}, <any>{})).toBe(0);
            });
        });

        describe("ignoreCase", () => {
            it("should correctly compare strings and ignore the case", () => {
                expect(StringComparer.ignoreCase("a", "B")).toBe(-1);
                expect(StringComparer.ignoreCase("b", "A")).toBe(1);
                expect(StringComparer.ignoreCase("a", "A")).toBe(0);
            });

            it("should correctly compare non-string objects by calling toString", () => {
                expect(StringComparer.ignoreCase(<any>5, <any>5)).toBe(0);
                expect(StringComparer.ignoreCase(null, null)).toBe(0);
                expect(StringComparer.ignoreCase(<any>{}, <any>{})).toBe(0);
            });
        });
    });

    describe("StringEqualityComparer", () => {
        it("should create a global object", () => {
            expect(StringEqualityComparer).toBeDefined();
        });

        describe("default", () => {
            it("should correctly check strings for equality", () => {
                expect(StringEqualityComparer.default("", "")).toBe(true);
                expect(StringEqualityComparer.default("a", "")).toBe(false);
                expect(StringEqualityComparer.default("a", "b")).toBe(false);
                expect(StringEqualityComparer.default("b", "a")).toBe(false);
                expect(StringEqualityComparer.default("a", "a")).toBe(true);
            });

            it("should correctly check non-string objects for equality by calling toString", () => {
                expect(StringEqualityComparer.default("a", null)).toBe(false);
                expect(StringEqualityComparer.default("a", undefined)).toBe(false);
                expect(StringEqualityComparer.default(null, null)).toBe(true);
                expect(StringEqualityComparer.default("5", <any>5)).toBe(true);
            });
        });

        describe("ignoreCase", () => {
            it("should correctly check strings for equality and ignore the case", () => {
                expect(StringEqualityComparer.ignoreCase("", "")).toBe(true);
                expect(StringEqualityComparer.ignoreCase("a", "")).toBe(false);
                expect(StringEqualityComparer.ignoreCase("a", "B")).toBe(false);
                expect(StringEqualityComparer.ignoreCase("b", "B")).toBe(true);
                expect(StringEqualityComparer.ignoreCase("A", "a")).toBe(true);
            });

            it("should correctly check non-string objects for equality by calling toString", () => {
                expect(StringEqualityComparer.ignoreCase("a", null)).toBe(false);
                expect(StringEqualityComparer.ignoreCase("a", undefined)).toBe(false);
                expect(StringEqualityComparer.ignoreCase(null, null)).toBe(true);
                expect(StringEqualityComparer.ignoreCase("5", <any>5)).toBe(true);
                expect(StringEqualityComparer.ignoreCase("NULL", null)).toBe(true);
            });
        });
    });
});
