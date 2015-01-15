interface Array<T> {
    distinct(equalityComparer?: EqualityComparer<T>): T[];
    intersection(otherArray: T[], equalityComparer?: EqualityComparer<T>): T[];
    union(otherArray: T[], equalityComparer?: EqualityComparer<T>): T[];
    stableSort<U>(property: (item: T) => U, comparer?: Comparer<U>): T[];
    sortBy<U>(property: (item: T) => U, comparer?: Comparer<U>): T[];
    sortByDescending<U>(property: (item: T) => U, comparer?: Comparer<U>): T[];
    toStringIndexable(key: (item: T) => string): StringIndexable<T>;
    toStringIndexable<U>(key: (item: T) => string, value: (item: T) => U): StringIndexable<U>;
    toNumberIndexable(key: (item: T) => number): NumberIndexable<T>;
    toNumberIndexable<U>(key: (item: T) => number, value: (item: T) => U): NumberIndexable<U>;
}

module lib.extras.Extensions.ArrayExtensions {

    if (!Array.prototype.distinct) {
        Array.prototype.distinct = function<T>(equalityComparer?: EqualityComparer<T>): T[] {
            equalityComparer = equalityComparer || ObjectEqualityComparer.default;

            var thisArrayCopy = this.slice();

            var result: T[] = [];

            thisArrayCopy.forEach((item: T) => {
                var index = result.findIndex((currentItem: T) => {
                    return equalityComparer(item, currentItem);
                });

                if (index < 0) {
                    result.push(item);
                }
            });

            return result;
        }
    }

    if (!Array.prototype.union) {
        Array.prototype.union = function<T>(otherArray: T[], equalityComparer?: EqualityComparer<T>): T[] {
            otherArray = Array.isArray(otherArray) ? otherArray : [];
            equalityComparer = equalityComparer || ObjectEqualityComparer.default;

            var thisArrayCopy = this.slice(),
                otherArrayCopy = otherArray.slice();

            return thisArrayCopy.concat(otherArrayCopy).distinct(equalityComparer);
        }
    }

    if (!Array.prototype.intersection) {
        Array.prototype.intersection = function<T>(otherArray: T[], equalityComparer?: EqualityComparer<T>): T[] {
            otherArray = Array.isArray(otherArray) ? otherArray : [];
            equalityComparer = equalityComparer || ObjectEqualityComparer.default;

            var thisArrayCopy = this.slice(),
                otherArrayCopy = otherArray.slice();

            var result: T[] = [];

            thisArrayCopy.forEach((item: T) => {
                for (var i = 0; i < otherArrayCopy.length; i++) {
                    if (equalityComparer(item, otherArray[i])) {
                        result.push(item);
                        break;
                    }
                }
            });

            return result.distinct(equalityComparer);
        }
    }

    if (!Array.prototype.sortBy) {
        Array.prototype.sortBy = function<T, U>(propertyAccessor: (item: T) => U, comparer?: Comparer<U>): T[] {
            comparer = comparer || ObjectComparer.default;

            var thisAsArray: T[] = this;

            return thisAsArray.sort((a: T, b: T) => {
                var aProperty = propertyAccessor(a);
                var bProperty = propertyAccessor(b);
                return comparer(aProperty, bProperty);
            });
        }
    }

    if (!Array.prototype.sortByDescending) {
        Array.prototype.sortByDescending = function<T, U>(propertyAccessor: (item: T) => U, comparer?: Comparer<U>): T[] {
            var thisAsArray: T[] = this;
            thisAsArray.sortBy(propertyAccessor, comparer);
            return thisAsArray.reverse();
        }
    }

    if (!Array.prototype.toStringIndexable) {
        Array.prototype.toStringIndexable = toIndexable;
    }

    if (!Array.prototype.toNumberIndexable) {
        Array.prototype.toNumberIndexable = toIndexable;
    }

    function toIndexable<T>(key: (item: T) => any, value?: (item: T) => any): any {
        var thisArrayCopy = this.slice();

        var result: any = {}

        thisArrayCopy.forEach((item: any) => {
            result[key(item)] = value ? value(item) : item;
        });

        return result;
    }
}
