describe("lib.extras.ES6.FunctionPolyfills", () => {
    describe("bind", () => {
        it("should return a new function with the 'this' pointer bound", () => {
            // Setup
            var thisArg = {};

            var boundThisArg: any;
            var fn = function () { boundThisArg = this; };
            
            // Act
            var boundFn = fn.bind(thisArg);
            boundFn();

            expect(boundThisArg).toBe(thisArg);
        });

        it("should return a new function with the arguments bound", () => {
            // Setup
            var args = [{}, {}, {}];

            var boundArgs: any[];
            var fn = function () { boundArgs = Array.prototype.slice.call(arguments); };
            
            // Act
            var boundFn = Function.prototype.bind.apply(fn, [{}].concat(args));
            boundFn();

            expect(boundArgs[0]).toBe(args[0]);
            expect(boundArgs[1]).toBe(args[1]);
            expect(boundArgs[2]).toBe(args[2]);
        });
    });
});
