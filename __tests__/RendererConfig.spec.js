const RendererConfig = require("../lib/Renderer/Config.js");

describe("RendererConfig object unit tests.", () => {

    test("Direct instantiation returns error. RendererConfig is abstract.", () => {
        expect (() => {
            let r = new RendererConfig;
        }).toThrow();
    });
});
