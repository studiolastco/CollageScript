const CanvasGrid = require("../lib/Canvas/CanvasGrid.js");

describe("CanvasGrid object unit tests.", () => {

    test("CanvasGrid constructor should return CanvasGrid object", () => {
        let c = new CanvasGrid;
        expect(c).toBeInstanceOf(CanvasGrid);
    });
});
