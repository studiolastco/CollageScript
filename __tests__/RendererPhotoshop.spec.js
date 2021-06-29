const Renderer = require("../lib/Renderer.js");
const RendererPhotoshop = require("../lib/Renderer/Photoshop.js");

describe("RendererPhotoshop object unit tests.", () => {

    test("RendererPhotoshop should extend Renderer object", () => {
        let r = new RendererPhotoshop;
        expect(r).toBeInstanceOf(Renderer);
    });

    test("RendererPhotoshop constructor should return RendererPhotoshop object", () => {
        let r = new RendererPhotoshop;
        expect(r).toBeInstanceOf(RendererPhotoshop);
    });
});