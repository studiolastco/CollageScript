const CanvasGrid = require("../lib/Canvas/Grid.js");

describe("CanvasGrid unit tests.", () => {

    test("CanvasGrid constructor should return CanvasGrid object", () => {
        let c = new CanvasGrid;
        expect(c).toBeInstanceOf(CanvasGrid);
    });
});
