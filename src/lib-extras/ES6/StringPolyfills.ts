interface String {
    includes(searchString: string, position?: number): boolean;
    startsWith(searchString: string, position?: number): boolean;
    endsWith(searchString: string, position?: number): boolean;
    repeat(count: number): string;
}

module lib.extras.ES6.StringPolyfills {

    if (!String.prototype.includes) {
        String.prototype.includes = function(searchString: string, position: number = 0): boolean {
            var subjectString = this.toString();
            return String.prototype.indexOf.call(subjectString, searchString, position) >= 0;
        };
    }

    if (!String.prototype.startsWith) {
        String.prototype.startsWith = function(searchString: string, position: number = 0): boolean {
            var subjectString = this.toString();
            return subjectString.lastIndexOf(searchString, position) === position;
        };
    }

    if (!String.prototype.endsWith) {
        String.prototype.endsWith = function(searchString: string, position: number = this.length): boolean {
            var subjectString = this.toString(),
                end = Math.min(position, subjectString.length);

            position = position - searchString.length;

            var lastIndex = subjectString.indexOf(searchString, position);
            return lastIndex !== -1 && lastIndex === position;
        };
    }

    if (!String.prototype.repeat) {
        String.prototype.repeat = function (count: number): string {
            count = Math.floor(count);

            if (count < 0) {
                throw new RangeError("repeat count must be non-negative");
            }

            if (count === Infinity) {
                throw new RangeError("repeat count must be less than infinity");
            }

            var subjectString = this.toString();
            return Array(count + 1).join(subjectString);
        };
    }
}
