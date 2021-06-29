const CanvasGrid = require("../lib/Canvas/Grid.js");
const Renderer = require("../lib/Renderer.js");
const RendererPhotoshop = require("../lib/Renderer/Photoshop.js");

describe("Canvas object unit tests.", () => {

    test("Direct instantiation returns error. Canvas is abstract.", () => {
        expect (() => {
            let c = new Canvas;
        }).toThrow();
    });

    test("Set Renderer (object composition)...", () => {
        let c = new CanvasGrid;
        let r = new RendererPhotoshop;
        expect(c.setRenderer(r)).toBeInstanceOf(Renderer);

        expect(() => {
            c.setRenderer(c);
        }).toThrow();

    });

});
