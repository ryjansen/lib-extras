describe("$lib", () => {
    describe("uuid", () => {
        it("should generate a valid uuid", () => {
            var uuids: string[] = [];

            for (var i = 0; i < 1000; i++) {
                uuids.push($lib.uuid());
            }

            uuids.forEach((uuid) => {
                var pieces = uuid.split("-");
                expect(pieces[0].length).toBe(8);
                expect(pieces[1].length).toBe(4);
                expect(pieces[2].length).toBe(4);
                expect(pieces[2][0]).toBe("4");
                expect(pieces[3].length).toBe(4);
                expect(["8", "9", "A", "B"].indexOf(pieces[3][0].toUpperCase())).toBeGreaterThan(-1);
                expect(pieces[4].length).toBe(12);
            });
        });

        it("should generate random uuids", () => {
            var uuids: string[] = [];

            for (var i = 0; i < 1000; i++) {
                uuids.push($lib.uuid());
            }

            expect(uuids.length).toBe(uuids.distinct().length);
        });
    });
});