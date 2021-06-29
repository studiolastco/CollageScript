const Renderer = require("../lib/Renderer.js");
const RendererPhotoshop = require("../lib/Renderer/Photoshop.js");
const RendererConfigPhotoshop = require("../lib/Renderer/Config/Photoshop.js");

describe("RendererPhotoshop object unit tests.", () => {

    test("RendererPhotoshop should extend Renderer object", () => {
        let r = new RendererPhotoshop;
        expect(r).toBeInstanceOf(Renderer);
    });

    test("RendererPhotoshop constructor should return RendererPhotoshop object", () => {
        let r = new RendererPhotoshop;
        expect(r).toBeInstanceOf(RendererPhotoshop);
    });

    test("RendererPhotoshop constructor should instantiate composed RendererConfigPhotoshop object", () => {
        let r = new RendererPhotoshop;
        expect(r).toHaveProperty('config');
        expect(r.config).toBeInstanceOf(RendererConfigPhotoshop);
    });
});
