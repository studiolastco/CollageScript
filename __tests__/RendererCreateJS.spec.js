const Renderer = require("../lib/Renderer.js");
const RendererCreateJS = require("../lib/Renderer/CreateJS.js");
const RendererConfigCreateJS = require("../lib/Renderer/Config/CreateJS.js");

describe("RendererCreateJS object unit tests.", () => {

    test("RendererCreateJS should extend Renderer object", () => {
        let r = new RendererCreateJS;
        expect(r).toBeInstanceOf(Renderer);
    });

    test("RendererCreateJS constructor should return RendererCreateJS object", () => {
        let r = new RendererCreateJS;
        expect(r).toBeInstanceOf(RendererCreateJS);
    });

    test("RendererCreateJS constructor should instantiate composed RendererConfigCreateJS object", () => {
        let r = new RendererCreateJS;
        expect(r).toHaveProperty('config');
        expect(r.config).toBeInstanceOf(RendererConfigCreateJS);
    });
});
