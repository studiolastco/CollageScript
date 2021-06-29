const CanvasGridRGB = require("../lib/Canvas/Grid/RGB.js");

describe("CanvasGridRGB tests...", () => {

    test("CanvasGridRGB constructor should return CanvasGridRGB object", () => {
        let c = new CanvasGridRGB;
        expect(c).toBeInstanceOf(CanvasGridRGB);
    });
});
