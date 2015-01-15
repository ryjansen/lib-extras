describe("lib-extras.Extensions.ObjectExtensions", () => {
    describe("ObjectStatic", () => {

        it("should create a global object", () => {
            expect(ObjectStatic).toBeDefined();
        });

        describe("isObject", () => {
            it("should correctly identify object", () => {
                expect(ObjectStatic.isObject("foo")).toBe(false);
                expect(ObjectStatic.isObject(5)).toBe(false);
                expect(ObjectStatic.isObject(true)).toBe(false);
                expect(ObjectStatic.isObject(null)).toBe(false);
                expect(ObjectStatic.isObject(undefined)).toBe(false);
                expect(ObjectStatic.isObject(new Date())).toBe(false);
                expect(ObjectStatic.isObject(new RegExp("."))).toBe(false);
                expect(ObjectStatic.isObject([])).toBe(false);
                expect(ObjectStatic.isObject({})).toBe(true);
            });
        });

        describe("forEach", () => {
            it("should correctly iterate through object properties", () => {
                var obj: any = { foo: 0, bar: 1, zed: 2 },
                    keyValuePairs: any[] = [];

                ObjectStatic.forEach(obj, (value: any, key: any) => {
                    keyValuePairs.push({ key: key, value: value });
                });

                var fooKeyValuePair = keyValuePairs.find(pair => pair.key === "foo"),
                    barKeyValuePair = keyValuePairs.find(pair => pair.key === "bar"),
                    zedKeyValuePair = keyValuePairs.find(pair => pair.key === "zed");

                expect(fooKeyValuePair.key).toBe("foo");
                expect(fooKeyValuePair.value).toBe(0);
                expect(barKeyValuePair.key).toBe("bar");
                expect(barKeyValuePair.value).toBe(1);
                expect(zedKeyValuePair.key).toBe("zed");
                expect(zedKeyValuePair.value).toBe(2);
            });

            it("should ignore properties that aren't owned by the object", () => {
                function TestClass() {
                    this.foo = 0;
                    this.bar = 1;
                    this.zed = 2;
                }

                TestClass.prototype = { protoProperty: 1 };

                var obj: any = new (<any>TestClass)(),
                    foundProtoProp = false;


                ObjectStatic.forEach(obj, (value: any, key: any) => {
                    if (key === "protoProperty") {
                        foundProtoProp = true;
                    }
                });

                expect(foundProtoProp).toBe(false);
            });
        });

        describe("map", () => {
            it("should correctly map object properties", () => {
                var obj: any = { foo: 0, bar: 1, zed: 2 },
                    expected: any = ["foo-0", "bar-1", "zed-2"];

                var result = ObjectStatic.map(obj, (value: any, key: any) => {
                    return key + "-" + value;
                });

                expect(result).toEqual(expected);
            });

            it("should ignore properties that aren't owned by the object", () => {
                function TestClass() {
                    this.foo = 0;
                    this.bar = 1;
                    this.zed = 2;
                }

                TestClass.prototype = { protoProperty: 1 };

                var obj: any = new (<any>TestClass)(),
                    expected: any = ["foo-0", "bar-1", "zed-2"];

                var result = ObjectStatic.map(obj, (value: any, key: any) => {
                    return key + "-" + value;
                });

                expect(result).toEqual(expected);
            });
        });
    });
});
