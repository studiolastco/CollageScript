const Canvas = require("../lib/Canvas.js");

describe("Canvas object unit tests.", () => {

    test("Direct instantiation returns error. Canvas is abstract.", () => {
        expect (() => {
            let c = new Canvas;
        }).toThrow();
    });

    test("Set Renderer...", () => {
        expect (() => {
            let c = new Canvas;
        }).toThrow();
    });

});
