describe("lib-extras.Extensions.ObjectExtensions", () => {
    describe("ObjectComparer", () => {
        it("should create a global object", () => {
            expect(ObjectComparer).toBeDefined();
        });

        describe("default", () => {
            it("should correctly compare values", () => {
                expect(ObjectComparer.default(1, 2)).toBe(-1);
                expect(ObjectComparer.default(2, 1)).toBe(1);
                expect(ObjectComparer.default(1, 1)).toBe(0);
                expect(ObjectComparer.default("a", "b")).toBe(-1);
                expect(ObjectComparer.default("b", "a")).toBe(1);
                expect(ObjectComparer.default("a", "a")).toBe(0);
            });
        });
    });

    describe("ObjectEqualityComparer", () => {
        it("should create a global object", () => {
            expect(ObjectEqualityComparer).toBeDefined();
        });

        describe("default", () => {
            it("should correctly check values for equality", () => {
                expect(ObjectEqualityComparer.default(1, 2)).toBe(false);
                expect(ObjectEqualityComparer.default(2, 1)).toBe(false);
                expect(ObjectEqualityComparer.default(1, 1)).toBe(true);
                expect(ObjectEqualityComparer.default("a", "b")).toBe(false);
                expect(ObjectEqualityComparer.default("b", "a")).toBe(false);
                expect(ObjectEqualityComparer.default("a", "a")).toBe(true);
                expect(ObjectEqualityComparer.default(null, undefined)).toBe(false);
                expect(ObjectEqualityComparer.default(null, null)).toBe(true);
            });
        });
    });
});
