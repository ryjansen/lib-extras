interface StringConstructor {
    /**
     * Determines if two strings are equal.
     *
     * @param str The string to test.
     * @param otherStr The other string to test.
     * @return True if the strings are equal, false otherwise.
     */
    equals(str: string, otherStr: string): boolean;

    /**
     * Determines if two strings are equal, ignoring case.
     *
     * @param str The string to test.
     * @param otherStr The other string to test.
     * @return True if the strings are equal, false otherwise.
     */
    equalsIgnoreCase(str: string, otherStr: string): boolean;
}

var StringStatic: StringConstructor = <any>String;

module lib.extras.Polyfills.StringPolyfills {
    if (!StringStatic.equals) {
        StringStatic.equals = function (str: string, otherStr: string): boolean {
            return StringEqualityComparer.default(str, otherStr);
        }
    }

    if (!StringStatic.equalsIgnoreCase) {
        StringStatic.equalsIgnoreCase = function (str: string, otherStr: string): boolean {
            return StringEqualityComparer.ignoreCase(str, otherStr);
        }
    }
}