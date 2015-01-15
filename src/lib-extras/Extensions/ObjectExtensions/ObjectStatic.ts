interface ObjectConstructor {
    isObject(value: any): boolean;
    forEach<T>(obj: StringIndexable<T>, callback: (value: T, key: string, obj: StringIndexable<T>) => void, thisArg?: any): void;
    forEach<T>(obj: NumberIndexable<T>, callback: (value: T, key: number, obj: NumberIndexable<T>) => void, thisArg?: any): void;
    forEach(obj: any, callback: (value: any, key: any, obj: any) => void, thisArg?: any): void;
    map<T, U>(obj: StringIndexable<T>, callback: (value: T, key: string, obj: StringIndexable<T>) => U, thisArg?: any): U[];
    map<T, U>(obj: NumberIndexable<T>, callback: (value: T, key: number, obj: NumberIndexable<T>) => U, thisArg?: any): U[];
    map<T>(obj: any, callback: (value: any, key: string, obj: any) => T, thisArg?: any): T[];
}

declare var ObjectStatic: ObjectConstructor;

module lib.extras.Extensions.ObjectExtensions {
    var global: any = window;
    global.ObjectStatic = Object;

    if (!ObjectStatic.isObject) {
        ObjectStatic.isObject = function (value: any): boolean {
            return !!(value && typeof value === "object" && !(value instanceof Date) && !(value instanceof RegExp) && !Array.isArray(value));
        }
    }

    if (!ObjectStatic.forEach) {
        ObjectStatic.forEach = function (obj: any, callback: (value: any, key: any, obj: any) => void, thisArg?: any): void {
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    callback.apply(thisArg, [obj[key], key, obj]);
                }
            }
        }
    }

    if (!ObjectStatic.map) {
        ObjectStatic.map = function <T>(obj: any, callback: (value: any, key: any, obj: any) => T, thisArg?: any): T[]{
            var result: T[] = [];

            ObjectStatic.forEach(obj, function (value, key) {
                var mappedValue = callback.apply(thisArg, [value, key, obj]);

                if (mappedValue !== null || mappedValue !== undefined) {
                    result.push(mappedValue);
                }
            });

            return result;
        }
    }
}

