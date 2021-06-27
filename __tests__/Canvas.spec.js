const Canvas = require("../lib/Canvas.js");

describe("Canvas object unit tests.", () => {

    test("Canvas constructor should return Canvas object", () => {
        let c = new Canvas;
        expect(c).toBeInstanceOf(Canvas);
    });
});
