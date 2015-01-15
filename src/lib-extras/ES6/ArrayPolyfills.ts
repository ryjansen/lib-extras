interface Array<T> {
    includes(searchElement: T, fromIndex?: number): boolean;
    fill(value: T, start?: number, end?: number): Array<T>;
    find(callback: (element: T, index: number, array: Array<T>) => boolean, thisArg?: any): T;
    findIndex(callback: (element: T, index: number, array: Array<T>) => boolean, thisArg?: any): number;
}

module lib.extras.ES6.ArrayPolyfills {

    if (!Array.prototype.find) {
        Array.prototype.find = function<T>(callback: (element: T, index: number, array: Array<T>) => boolean, thisArg?: any): T {
            if (!this) {
                throw new TypeError("Array.prototype.find called on null or undefined");
            }

            if (typeof callback !== "function") {
                throw new TypeError(callback + " is not a function");
            }

            var arrayCopy: Array<T> = <Array<T>>(new Object(this));

            for (var i = 0; i < arrayCopy.length; i++) {
                if (callback.call(thisArg, arrayCopy[i], i, arrayCopy)) {
                    return arrayCopy[i];
                }
            }

            return undefined;
        }
    }

    if (!Array.prototype.findIndex) {
        Array.prototype.findIndex = function<T>(callback: (element: T, index: number, array: Array<T>) => boolean, thisArg?: any): number {
            if (!this) {
                throw new TypeError("Array.prototype.findIndex called on null or undefined");
            }

            if (typeof callback !== "function") {
                throw new TypeError(callback + " is not a function");
            }

            var arrayCopy: Array<T> = <Array<T>>(new Object(this));

            for (var i = 0; i < arrayCopy.length; i++) {
                if (callback.call(thisArg, arrayCopy[i], i, arrayCopy)) {
                    return i;
                }
            }

            return -1;
        }
    }

    if (!Array.prototype.includes) {
        Array.prototype.includes = function<T>(searchElement: T, fromIndex: number = 0): boolean {
            if (!this) {
                throw new TypeError("Array.prototype.findIndex called on null or undefined");
            }

            var arrayCopy: Array<T> = <Array<T>>(new Object(this));

            fromIndex = fromIndex < 0 ?
            Math.max(length + fromIndex, 0) :
            Math.min(fromIndex, length);

            for (var i = fromIndex; i < arrayCopy.length; i++) {
                if (arrayCopy[i] === searchElement) {
                    return true;
                }
            }

            return false;
        }
    }

    if (!Array.prototype.fill) {
        Array.prototype.fill = function<T>(value: T, start: number = 0, end: number = this.length) {
            if (!this) {
                throw new TypeError("Array.prototype.fill called on null or undefined");
            }

            var thisAsArray: Array<T> = <Array<T>>this,
                length = thisAsArray.length;

            start = start < 0 ?
            Math.max(length + start, 0) :
            Math.min(start, length);

            end = end < 0 ?
            Math.max(length + end, 0) :
            Math.min(end, length);

            for (var i = start; i < end; i++) {
                thisAsArray[i] = value;
            }

            return thisAsArray;
        }
    }
}

