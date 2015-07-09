module lib.extras.ES6.FunctionPolyfills {

    if (!Function.prototype.bind) {
        Function.prototype.bind = function (thisArg: any, ...argArray: any[]): any {
            var thisAsFunction: Function = <Function>this;

            if (typeof thisAsFunction !== "function") {
                throw new TypeError("Bind must be called on a function");
            }

            var args = Array.prototype.slice.call(arguments, 1);
            
            var baseFunction: any = function () { };
            baseFunction.prototype = thisAsFunction.prototype;

            var boundFunction = function () {
                return thisAsFunction.apply(this instanceof baseFunction ? this : thisArg, args.concat(Array.prototype.slice.call(arguments)));
            };
            boundFunction.prototype = new baseFunction();

            return boundFunction;
        }
    }
}

