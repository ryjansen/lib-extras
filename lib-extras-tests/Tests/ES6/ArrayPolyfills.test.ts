describe("lib.extras.ES6.ArrayPolyfills", () => {
    describe("find", () => {
        it("should return an item if it is found", () => {
            var items: any[] = [{ x: 2 }, { x: 4 }, { x: 6 }, { x: 8 }];

            var result = items.find(item => item.x === 6);

            expect(result).toBe(items[2]);
        });

        it("should return undefined if an item is not found", () => {
            var items: any[] = [{ x: 2 }, { x: 4 }, { x: 6 }, { x: 8 }];

            var result = items.find(item => item.x === 5);

            expect(result).toBeUndefined();
        });
    });

    describe("findIndex", () => {
        it("should return an item's index if it is found", () => {
            var items: any[] = [{ x: 2 }, { x: 4 }, { x: 6 }, { x: 8 }];

            var result = items.findIndex(item => item.x === 6);

            expect(result).toBe(2);
        });

        it("should return -1 if an item is not found", () => {
            var items: any[] = [{ x: 2 }, { x: 4 }, { x: 6 }, { x: 8 }];

            var result = items.findIndex(item => item.x === 5);

            expect(result).toBe(-1);
        });
    });

    describe("includes", () => {
        it("should return true if an item is found", () => {
            var items: any[] = [2, 4, 6, 8];

            var result = items.includes(6);

            expect(result).toBe(true);
        });

        it("should return false if an item does not exist", () => {
            var items: any[] = [2, 4, 6, 8];

            var result = items.includes(5);

            expect(result).toBe(false);
        });
    });

    describe("fill", () => {
        it("should fill all elements with the specified value", () => {
            var items: any[] = [2, 4, 6, 8],
                expected: any[] = [5, 5, 5, 5];

            var result = items.fill(5);

            expect(result).toBe(items);
            expect(result).toEqual(expected);
        });

        it("should fill elements after the start index if specified", () => {
            var items: any[] = [2, 4, 6, 8],
                expected: any[] = [2, 5, 5, 5];

            var result = items.fill(5, 1);

            expect(result).toBe(items);
            expect(result).toEqual(expected);
        });

        it("should fill elements between the start and end indicies if specified", () => {
            var items: any[] = [2, 4, 6, 8],
                expected: any[] = [2, 5, 5, 8];

            var result = items.fill(5, 1, 3);

            expect(result).toBe(items);
            expect(result).toEqual(expected);
        });

        it("should fill elements correctly if start and end indicies are negative", () => {
            var items: any[] = [2, 4, 6, 8],
                expected: any[] = [2, 5, 6, 8];

            var result = items.fill(5, -3, -2);

            expect(result).toBe(items);
            expect(result).toEqual(expected);
        });

        it("should handle NaN start and end indices", () => {
            var items: any[] = [2, 4, 6, 8],
                expected: any[] = [2, 4, 6, 8];

            var result = items.fill(5, NaN, NaN);

            expect(result).toBe(items);
            expect(result).toEqual(expected);
        });

        it("should be callable on non-array types", () => {
            var items: any = { length: 3 },
                expected: any = { 0: 5, 1: 5, 2: 5, length: 3 };

            var result = [].fill.call(items, 5);

            expect(result).toBe(items);
            expect(result).toEqual(expected);
        });
    });
});
