const Renderer = require("../lib/Renderer.js");
const RendererConfig = require("../lib/Renderer/Config.js");
const RendererPhotoshop = require("../lib/Renderer/Photoshop.js");
const RendererConfigPhotoshop = require("../lib/Renderer/Config/Photoshop.js");

describe("Renderer object unit tests.", () => {

    test("Direct instantiation returns error. Renderer is abstract.", () => {
        expect (() => {
            let r = new Renderer;
        }).toThrow();
    });

    test("Set Config (object composition)...", () => {
        let r = new RendererPhotoshop;
        let c = new RendererConfigPhotoshop;
        expect(r.setConfig(c)).toBeInstanceOf(RendererConfig);

        expect(() => {
            r.setConfig(r);
        }).toThrow();

    });

});
