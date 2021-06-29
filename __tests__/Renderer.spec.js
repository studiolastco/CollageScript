const Canvas = require("../lib/Renderer.js");

describe("Renderer object unit tests.", () => {

    test("Direct instantiation returns error. Renderer is abstract.", () => {
        expect (() => {
            let r = new Renderer;
        }).toThrow();
    });
});
