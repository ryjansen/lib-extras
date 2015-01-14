interface ObjectConstructor {
    isObject(value: any): boolean;
    forEach(obj: any, callback: (value: any, key: string, obj: any) => void, thisArg?: any): void;
    map<T>(obj: any, callback: (value: any, key: string, obj: any) => T, thisArg?: any): T[];
}

declare var ObjectStatic: ObjectConstructor;

module lib.extras.Extensions.ObjectExtensions {
    var global: any = window;
    global.ObjectStatic = Object;

    if (!ObjectStatic.isObject) {
        ObjectStatic.isObject = function (value: any): boolean {
            return value && typeof value === "object" && !(value instanceof Date) && !Array.isArray(value);
        }
    }

    if (!ObjectStatic.forEach) {
        ObjectStatic.forEach = function (obj: any, callback: (value: any, key: string, obj: any) => void, thisArg?: any): void {
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    callback.call(thisArg, (obj[key], key, obj));
                }
            }
        }
    }

    if (!ObjectStatic.map) {
        ObjectStatic.map = function <T>(obj: any, callback: (value: any, key: string, obj: any) => T, thisArg?: any): T[]{
            var result: T[] = [];

            ObjectStatic.forEach(obj, function (value, key) {
                var mappedValue = callback(value, key, obj);

                if (mappedValue !== null || mappedValue !== undefined) {
                    result.push(mappedValue);
                }
            });

            return result;
        }
    }
}

