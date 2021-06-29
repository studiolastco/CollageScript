const Grid = require("../lib/Canvas/Grid.js");

describe("Grid object unit tests.", () => {

    test("Grid constructor should return Grid object", () => {
        let c = new Grid;
        expect(c).toBeInstanceOf(Grid);
    });
});
