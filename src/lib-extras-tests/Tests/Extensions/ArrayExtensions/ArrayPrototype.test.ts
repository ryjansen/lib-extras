describe("lib-extras.Extensions.ArrayExtensions", () => {
    describe("ArrayPrototype", () => {

        describe("distinct", () => {
            it("should correctly remove duplicates", () => {
                expect([1, 1, 2, 2, 3, 3].distinct()).toEqual([1, 2, 3]);
                expect([1, 1, 1, 1, 1, 1].distinct()).toEqual([1]);
                expect([1, 2, 3].distinct()).toEqual([1, 2, 3]);
                expect([false, false, true].distinct()).toEqual([false, true]);
                expect(["foo", "foo", "bar"].distinct()).toEqual(["foo", "bar"]);
            });


            it("should use an equality comparer if passed", () => {
                expect(["foo", "FOO", "bar", "BAR"].distinct(StringEqualityComparer.ignoreCase)).toEqual(["foo", "bar"]);

                var propertyEqualityComparer = (a: any, b: any) => a.foo === b.foo;
                expect([{ foo: 1 }, { foo: 1 }, { foo: 2 }, { foo: 2 }].distinct(propertyEqualityComparer)).toEqual([{ foo: 1 }, { foo: 2 }]);
            });
        });

        describe("union", () => {
            it("should correctly return the union of two arrays", () => {
                expect([1, 2, 3].union([4, 5, 6])).toEqual([1, 2, 3, 4, 5, 6]);
                expect([1, 2, 3].union([2, 3, 4])).toEqual([1, 2, 3, 4]);
                expect([1, 2, 3].union([])).toEqual([1, 2, 3]);
                expect(["foo", "bar"].union(["bar", "zed"])).toEqual(["foo", "bar", "zed"]);
                expect([].union([4, 5, 6])).toEqual([4, 5, 6]);
                expect([].union([])).toEqual([]);
                expect([].union(null)).toEqual([]);
            });

            it("should use an equality comparer if passed", () => {
                expect(["foo", "FOO"].union(["bar", "BAR"], StringEqualityComparer.ignoreCase)).toEqual(["foo", "bar"]);

                var propertyEqualityComparer = (a: any, b: any) => a.foo === b.foo;
                expect([{ foo: 1 }, { foo: 2 }].union([{ foo: 2 }, { foo: 3 }], propertyEqualityComparer)).toEqual([{ foo: 1 }, { foo: 2 }, { foo: 3 }]);
            });
        });

        describe("intersection", () => {
            it("should correctly return the intersection of two arrays", () => {
                expect([1, 2, 3].intersection([4, 5, 6])).toEqual([]);
                expect([1, 2, 3].intersection([2, 3, 4])).toEqual([2, 3]);
                expect([1, 1, 1].intersection([1, 1, 1])).toEqual([1]);
                expect(["foo", "bar"].intersection(["bar", "zed"])).toEqual(["bar"]);
                expect([].intersection([4, 5, 6])).toEqual([]);
                expect([].intersection([])).toEqual([]);
                expect([].intersection(null)).toEqual([]);
            });

            it("should use an equality comparer if passed", () => {
                expect(["foo", "FOO"].intersection(["foo", "bar"], StringEqualityComparer.ignoreCase)).toEqual(["foo"]);

                var propertyEqualityComparer = (a: any, b: any) => a.foo === b.foo;
                expect([{ foo: 1 }, { foo: 2 }].intersection([{ foo: 2 }, { foo: 3 }], propertyEqualityComparer)).toEqual([{ foo: 2 }]);
            });
        });

        describe("sortBy", () => {
            it("should sort by a property correctly", () => {
                // Arrange
                var arr: any[] = [{ x: 4 }, { x: 8 }, { x: 2 }],
                    expected: any[] = [{ x: 2 }, { x: 4 }, { x: 8 }],
                    propertyAccessor = (item: any) => item.x;

                // Act
                var sorted = arr.sortBy(propertyAccessor);

                // Assert
                expect(sorted).toBe(arr);
                expect(sorted).toEqual(expected);
            });

            it("should use a comparer if passed in", () => {
                // Arrange
                var arr: any[] = [{ x: "foo" }, { x: "FOO" }, { x: "bar" }, { x: "BAR" }],
                    expected: any[] = [{ x: "bar" }, { x: "BAR" }, { x: "foo" }, { x: "FOO" }],
                    propertyAccessor = (item: any) => item.x;

                // Act
                var sorted = arr.sortBy(propertyAccessor, StringComparer.ignoreCase);

                // Assert
                expect(sorted).toBe(arr);
                expect(sorted).toEqual(expected);
            });
        });

        describe("sortByDescending", () => {
            it("should sort by a property correctly", () => {
                // Arrange
                var arr: any[] = [{ x: 4 }, { x: 8 }, { x: 2 }],
                    expected: any[] = [{ x: 8 }, { x: 4 }, { x: 2 }],
                    propertyAccessor = (item: any) => item.x;

                // Act
                var sorted = arr.sortByDescending(propertyAccessor);

                // Assert
                expect(sorted).toBe(arr);
                expect(sorted).toEqual(expected);
            });

            it("should use a comparer if passed in", () => {
                // Arrange
                var arr: any[] = [{ x: "foo" }, { x: "FOO" }, { x: "bar" }, { x: "BAR" }],
                    expected: any[] = [{ x: "FOO" }, { x: "foo" }, { x: "BAR" }, { x: "bar" }],
                    propertyAccessor = (item: any) => item.x;

                // Act
                var sorted = arr.sortByDescending(propertyAccessor, StringComparer.ignoreCase);

                // Assert
                expect(sorted).toBe(arr);
                expect(sorted).toEqual(expected);
            });
        });

        describe("toStringIndexable", () => {
            it("should correctly create a StringIndexable", () => {
                var arr: any[] = [{ x: "foo" }, { x: "bar" }, { x: "zed" }],
                    expected: StringIndexable<any> = { foo: { x: "foo" }, bar: { x: "bar" }, zed: { x: "zed" } },
                    keyFn = (item: any) => item.x;

                var indexable = arr.toStringIndexable(keyFn);

                expect(indexable).toEqual(expected);
            });

            it("should correctly create a StringIndexable with keys and values if specified", () => {
                var arr: any[] = [{ x: "foo" }, { x: "bar" }, { x: "zed" }],
                    expected: StringIndexable<any> = { foo: "foo", bar: "bar", zed: "zed" },
                    keyFn = (item: any) => item.x,
                    valueFn = (item: any) => item.x;

                var indexable = arr.toStringIndexable(keyFn, valueFn);

                expect(indexable).toEqual(expected);
            });
        });

        describe("toNumberIndexable", () => {
            it("should correctly create a NumberIndexable", () => {
                var arr: any[] = [{ x: 0 }, { x: 1 }, { x: 2 }],
                    expected: NumberIndexable<any> = { 0: { x: 0 }, 1: { x: 1 }, 2: { x: 2 } },
                    keyFn = (item: any) => item.x;

                var indexable = arr.toNumberIndexable(keyFn);

                expect(indexable).toEqual(expected);
            });

            it("should correctly create a NumberIndexable with keys and values if specified", () => {
                var arr: any[] = [{ x: 0 }, { x: 1 }, { x: 2 }],
                    expected: NumberIndexable<any> = { 0: 0, 1: 1, 2: 2 },
                    keyFn = (item: any) => item.x,
                    valueFn = (item: any) => item.x;

                var indexable = arr.toStringIndexable(keyFn, valueFn);

                expect(indexable).toEqual(expected);
            });
        });
    });
});
