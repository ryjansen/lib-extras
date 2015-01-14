interface String {
    /**
     * Replaces one or more format items in a string with the string representation of a specified object.
     *
     * @param args The list of format arguments. For example: "String with params {0} and {1}".format("val1", "val2");.
     * @return The formatted string.
     */
    format(...args: any[]): string;

    /**
     * Replaces one or more format items in a string with the string representation of a specified object.
     *
     * @param args An object that contains format arguments. For example: "String with parameters {one} and {two}".format({one: "val1", two: "val2"});.
     * @return The formatted string.
     */
    format(args: Object): string;

    /**
     * Determines if another string is equal to the string.
     *
     * @param otherStr The other string to test.
     * @param [comparer] The comparer to use. Defaults to StringComparer.default.
     * @return True if the other string is equal to the string, false otherwise.
     */
    equals(otherStr: string): boolean;

    /**
     * Determines if another string is equal to the string, ignoring case.
     *
     * @param otherStr The other string to test.
     * @return True if the other string is equal to the string, false otherwise.
     */
    equalsIgnoreCase(otherStr: string): boolean;
}

module lib.extras.Extensions.StringExtras {

    if (!String.prototype.format) {
        String.prototype.format = function (): string {
            var thisAsString: string = this,
                args = Array.prototype.slice.apply(arguments, 1);

            var namedFormatSpecifierRegex = /\{[a-zA-Z$_\d]*\}/g,
                numberedFormatSpecifierRegex = /\{(\d+)\}/g;

            var matched = false,
                retVal: string;

            if (args && args.length === 1 && args[0] && typeof args[0] === "object") {
                var namedArgs: any = args[0];
                retVal = thisAsString.replace(namedFormatSpecifierRegex, (match: string) => {
                    var name = match.substring(1, match.length - 1);
                    if (namedArgs.hasOwnProperty(name)) {
                        matched = true;
                        return namedArgs[name];
                    } else {
                        return match;
                    }
                });
            }

            if (!matched) {
                retVal = thisAsString.replace(numberedFormatSpecifierRegex, (match: string, num: number) => {
                    return args[num] !== undefined ? args[num] : match;
                });
            }

            return retVal;
        }
    }

    if (!String.prototype.equals) {
        String.prototype.equals = function (otherStr: string): boolean {
            return StringStatic.equals(this, otherStr);
        }
    }

    if (!String.prototype.equalsIgnoreCase) {
        String.prototype.equalsIgnoreCase = function (otherStr: string): boolean {
            return StringStatic.equalsIgnoreCase(this, otherStr);
        }
    }
}