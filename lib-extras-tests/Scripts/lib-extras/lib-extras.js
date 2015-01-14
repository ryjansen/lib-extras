var lib;
(function (lib) {
    var extras;
    (function (extras) {
        var Extensions;
        (function (Extensions) {
            var ArrayExtensions;
            (function (ArrayExtensions) {
                if (!Array.prototype.distinct) {
                    Array.prototype.distinct = function (equalityComparer) {
                        equalityComparer = equalityComparer || ObjectEqualityComparer.default;
                        var thisArrayCopy = this.slice();
                        var result = [];
                        thisArrayCopy.forEach(function (item) {
                            var index = result.findIndex(function (currentItem) {
                                return equalityComparer(item, currentItem);
                            });
                            if (index < 0) {
                                result.push(item);
                            }
                        });
                        return result;
                    };
                }
                if (!Array.prototype.union) {
                    Array.prototype.union = function (otherArray, equalityComparer) {
                        otherArray = Array.isArray(otherArray) ? otherArray : [];
                        equalityComparer = equalityComparer || ObjectEqualityComparer.default;
                        var thisArrayCopy = this.slice(), otherArrayCopy = otherArray.slice();
                        var result = thisArrayCopy.slice();
                        otherArrayCopy.forEach(function (item) {
                            var resultAlreadyHasItem = result.find(function (existingItem) {
                                return equalityComparer(item, existingItem);
                            });
                            if (!resultAlreadyHasItem) {
                                result.push(item);
                            }
                        });
                        return result;
                    };
                }
                if (!Array.prototype.intersection) {
                    Array.prototype.intersection = function (otherArray, equalityComparer) {
                        otherArray = Array.isArray(otherArray) ? otherArray : [];
                        equalityComparer = equalityComparer || ObjectEqualityComparer.default;
                        var thisArrayCopy = this.slice(), otherArrayCopy = otherArray.slice();
                        var result = [];
                        thisArrayCopy.forEach(function (item) {
                            for (var i = 0; i < otherArrayCopy.length; i++) {
                                if (equalityComparer(item, otherArray[i])) {
                                    result.push(item);
                                    break;
                                }
                            }
                        });
                        return result;
                    };
                }
                if (!Array.prototype.sortBy) {
                    Array.prototype.sortBy = function (propertyAccessor, comparer) {
                        comparer = comparer || ObjectComparer.default;
                        var thisAsArray = this;
                        return thisAsArray.sort(function (a, b) {
                            var aProperty = propertyAccessor(a);
                            var bProperty = propertyAccessor(b);
                            return comparer(aProperty, bProperty);
                        });
                    };
                }
                if (!Array.prototype.sortByDescending) {
                    Array.prototype.sortByDescending = function (propertyAccessor, comparer) {
                        var thisAsArray = this;
                        thisAsArray.sortBy(propertyAccessor, comparer);
                        return thisAsArray.reverse();
                    };
                }
                if (!Array.prototype.toStringIndexable) {
                    Array.prototype.toStringIndexable = toIndexable;
                }
                if (!Array.prototype.toNumberIndexable) {
                    Array.prototype.toNumberIndexable = toIndexable;
                }
                function toIndexable(key, value) {
                    var thisArrayCopy = this.slice();
                    var result = {};
                    thisArrayCopy.forEach(function (item) {
                        result[key(item)] = value ? value(item) : item;
                    });
                    return result;
                }
            })(ArrayExtensions = Extensions.ArrayExtensions || (Extensions.ArrayExtensions = {}));
        })(Extensions = extras.Extensions || (extras.Extensions = {}));
    })(extras = lib.extras || (lib.extras = {}));
})(lib || (lib = {}));
var lib;
(function (lib) {
    var extras;
    (function (extras) {
        var ES6;
        (function (ES6) {
            var ArrayPolyfills;
            (function (ArrayPolyfills) {
                if (!Array.prototype.find) {
                    Array.prototype.find = function (callback, thisArg) {
                        if (!this) {
                            throw new TypeError("Array.prototype.find called on null or undefined");
                        }
                        if (typeof callback !== "function") {
                            throw new TypeError(callback + " is not a function");
                        }
                        var arrayCopy = (new Object(this));
                        for (var i = 0; i < arrayCopy.length; i++) {
                            if (callback.call(thisArg, arrayCopy[i], i, arrayCopy)) {
                                return arrayCopy[i];
                            }
                        }
                        return undefined;
                    };
                }
                if (!Array.prototype.findIndex) {
                    Array.prototype.findIndex = function (callback, thisArg) {
                        if (!this) {
                            throw new TypeError("Array.prototype.findIndex called on null or undefined");
                        }
                        if (typeof callback !== "function") {
                            throw new TypeError(callback + " is not a function");
                        }
                        var arrayCopy = (new Object(this));
                        for (var i = 0; i < arrayCopy.length; i++) {
                            if (callback.call(thisArg, arrayCopy[i], i, arrayCopy)) {
                                return i;
                            }
                        }
                        return undefined;
                    };
                }
                if (!Array.prototype.includes) {
                    Array.prototype.includes = function (searchElement, fromIndex) {
                        if (fromIndex === void 0) { fromIndex = 0; }
                        if (!this) {
                            throw new TypeError("Array.prototype.findIndex called on null or undefined");
                        }
                        var arrayCopy = (new Object(this));
                        fromIndex = fromIndex < 0 ? Math.max(length + fromIndex, 0) : Math.min(fromIndex, length);
                        for (var i = fromIndex; i < arrayCopy.length; i++) {
                            if (arrayCopy[i] === searchElement) {
                                return true;
                            }
                        }
                        return false;
                    };
                }
                if (!Array.prototype.fill) {
                    Array.prototype.fill = function (value, start, end) {
                        if (start === void 0) { start = 0; }
                        if (end === void 0) { end = this.length; }
                        if (!this) {
                            throw new TypeError("Array.prototype.fill called on null or undefined");
                        }
                        var thisAsArray = this, length = thisAsArray.length;
                        start = start < 0 ? Math.max(length + start, 0) : Math.min(start, length);
                        end = end < 0 ? Math.max(length + end, 0) : Math.min(end, length);
                        for (var i = start; i < end; i++) {
                            thisAsArray[i] = value;
                        }
                        return thisAsArray;
                    };
                }
            })(ArrayPolyfills = ES6.ArrayPolyfills || (ES6.ArrayPolyfills = {}));
        })(ES6 = extras.ES6 || (extras.ES6 = {}));
    })(extras = lib.extras || (lib.extras = {}));
})(lib || (lib = {}));
var lib;
(function (lib) {
    var extras;
    (function (extras) {
        var ES6;
        (function (ES6) {
            var StringPolyfills;
            (function (StringPolyfills) {
                if (!String.prototype.includes) {
                    String.prototype.includes = function (searchString, position) {
                        if (position === void 0) { position = 0; }
                        var subjectString = this.toString();
                        return String.prototype.indexOf.call(subjectString, searchString, position) >= 0;
                    };
                }
                if (!String.prototype.startsWith) {
                    String.prototype.startsWith = function (searchString, position) {
                        if (position === void 0) { position = 0; }
                        var subjectString = this.toString();
                        return String.prototype.lastIndexOf.call(subjectString, searchString, position) === position;
                    };
                }
                if (!String.prototype.endsWith) {
                    String.prototype.endsWith = function (searchString, position) {
                        if (position === void 0) { position = this.length; }
                        var subjectString = this.toString(), end = Math.min(position, subjectString.length);
                        return String.prototype.lastIndexOf.call(subjectString, searchString) === Math.min(position, subjectString.length) - searchString.length;
                    };
                }
                if (!String.prototype.repeat) {
                    String.prototype.repeat = function (count) {
                        count = Math.floor(count);
                        if (count < 0) {
                            throw new RangeError('repeat count must be non-negative');
                        }
                        if (count == Infinity) {
                            throw new RangeError('repeat count must be less than infinity');
                        }
                        var subjectString = this.toString();
                        return Array(count + 1).join(subjectString);
                    };
                }
            })(StringPolyfills = ES6.StringPolyfills || (ES6.StringPolyfills = {}));
        })(ES6 = extras.ES6 || (extras.ES6 = {}));
    })(extras = lib.extras || (lib.extras = {}));
})(lib || (lib = {}));
var lib;
(function (lib) {
    var extras;
    (function (extras) {
        var Extensions;
        (function (Extensions) {
            var ObjectExtensions;
            (function (ObjectExtensions) {
                var global = window;
                global.ObjectStatic = Object;
                if (!ObjectStatic.isObject) {
                    ObjectStatic.isObject = function (value) {
                        return value && typeof value === "object" && !(value instanceof Date) && !Array.isArray(value);
                    };
                }
                if (!ObjectStatic.forEach) {
                    ObjectStatic.forEach = function (obj, callback, thisArg) {
                        for (var key in obj) {
                            if (obj.hasOwnProperty(key)) {
                                callback.call(thisArg, (obj[key], key, obj));
                            }
                        }
                    };
                }
                if (!ObjectStatic.map) {
                    ObjectStatic.map = function (obj, callback, thisArg) {
                        var result = [];
                        ObjectStatic.forEach(obj, function (value, key) {
                            var mappedValue = callback(value, key, obj);
                            if (mappedValue !== null || mappedValue !== undefined) {
                                result.push(mappedValue);
                            }
                        });
                        return result;
                    };
                }
            })(ObjectExtensions = Extensions.ObjectExtensions || (Extensions.ObjectExtensions = {}));
        })(Extensions = extras.Extensions || (extras.Extensions = {}));
    })(extras = lib.extras || (lib.extras = {}));
})(lib || (lib = {}));
var ObjectComparer = (function () {
    function ObjectComparer() {
    }
    ObjectComparer.default = function (a, b) {
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        return 0;
    };
    return ObjectComparer;
})();
var ObjectEqualityComparer = (function () {
    function ObjectEqualityComparer() {
    }
    ObjectEqualityComparer.default = function (a, b) {
        return a === b;
    };
    return ObjectEqualityComparer;
})();
var StringComparer = (function () {
    function StringComparer() {
    }
    StringComparer.default = function (a, b) {
        a = "" + a;
        b = "" + b;
        return ObjectComparer.default(a, b);
    };
    StringComparer.ignoreCase = function (a, b) {
        a = ("" + a).toUpperCase();
        b = ("" + b).toUpperCase();
        return StringComparer.default(a, b);
    };
    return StringComparer;
})();
var StringEqualityComparer = (function () {
    function StringEqualityComparer() {
    }
    StringEqualityComparer.default = function (a, b) {
        return StringComparer.default(a, b) === 0;
    };
    StringEqualityComparer.ignoreCase = function (a, b) {
        return StringComparer.ignoreCase(a, b) === 0;
    };
    return StringEqualityComparer;
})();
var StringStatic = String;
var lib;
(function (lib) {
    var extras;
    (function (extras) {
        var Polyfills;
        (function (Polyfills) {
            var StringPolyfills;
            (function (StringPolyfills) {
                if (!StringStatic.equals) {
                    StringStatic.equals = function (str, otherStr) {
                        return StringEqualityComparer.default(str, otherStr);
                    };
                }
                if (!StringStatic.equalsIgnoreCase) {
                    StringStatic.equalsIgnoreCase = function (str, otherStr) {
                        return StringEqualityComparer.ignoreCase(str, otherStr);
                    };
                }
            })(StringPolyfills = Polyfills.StringPolyfills || (Polyfills.StringPolyfills = {}));
        })(Polyfills = extras.Polyfills || (extras.Polyfills = {}));
    })(extras = lib.extras || (lib.extras = {}));
})(lib || (lib = {}));
var lib;
(function (lib) {
    var extras;
    (function (extras) {
        var Extensions;
        (function (Extensions) {
            var StringExtras;
            (function (StringExtras) {
                if (!String.prototype.format) {
                    String.prototype.format = function () {
                        var thisAsString = this, args = Array.prototype.slice.apply(arguments, 1);
                        var namedFormatSpecifierRegex = /\{[a-zA-Z$_\d]*\}/g, numberedFormatSpecifierRegex = /\{(\d+)\}/g;
                        var matched = false, retVal;
                        if (args && args.length === 1 && args[0] && typeof args[0] === "object") {
                            var namedArgs = args[0];
                            retVal = thisAsString.replace(namedFormatSpecifierRegex, function (match) {
                                var name = match.substring(1, match.length - 1);
                                if (namedArgs.hasOwnProperty(name)) {
                                    matched = true;
                                    return namedArgs[name];
                                }
                                else {
                                    return match;
                                }
                            });
                        }
                        if (!matched) {
                            retVal = thisAsString.replace(numberedFormatSpecifierRegex, function (match, num) {
                                return args[num] !== undefined ? args[num] : match;
                            });
                        }
                        return retVal;
                    };
                }
                if (!String.prototype.equals) {
                    String.prototype.equals = function (otherStr) {
                        return StringStatic.equals(this, otherStr);
                    };
                }
                if (!String.prototype.equalsIgnoreCase) {
                    String.prototype.equalsIgnoreCase = function (otherStr) {
                        return StringStatic.equalsIgnoreCase(this, otherStr);
                    };
                }
            })(StringExtras = Extensions.StringExtras || (Extensions.StringExtras = {}));
        })(Extensions = extras.Extensions || (extras.Extensions = {}));
    })(extras = lib.extras || (lib.extras = {}));
})(lib || (lib = {}));
//# sourceMappingURL=lib-extras.js.map