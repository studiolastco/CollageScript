const RendererConfig = require("../lib/Renderer/Config.js");
const RendererConfigCreateJS = require("../lib/Renderer/Config/CreateJS.js");

describe("RendererConfigCreateJS object unit tests.", () => {

    test("RendererConfigCreateJS should extend RendererConfig object", () => {
        let r = new RendererConfigCreateJS;
        expect(r).toBeInstanceOf(RendererConfig);
    });

    test("RendererConfigCreateJS constructor should return RendererConfigCreateJS object", () => {
        let r = new RendererConfigCreateJS;
        expect(r).toBeInstanceOf(RendererConfigCreateJS);
    });

    test("gridX property testing...", () => {
        let r = new RendererConfigCreateJS();
        expect(r).toHaveProperty('DEFAULT_GRIDX');
        expect(r.DEFAULT_GRIDX).not.toBeUndefined();
        expect(r).toHaveProperty('gridX');
        expect(r.setGridX(2)).toEqual(2);
        expect(r.setGridX('a string value')).toEqual(r.DEFAULT_GRIDX);
        expect(r.setGridX(0)).toEqual(0);
        expect(r.setGridX(-1)).toEqual(r.DEFAULT_GRIDX);
    })

    test("gridY property testing...", () => {
        let r = new RendererConfigCreateJS();
        expect(r).toHaveProperty('DEFAULT_GRIDY');
        expect(r.DEFAULT_GRIDY).not.toBeUndefined();
        expect(r).toHaveProperty('gridY');
        expect(r.setGridY(2)).toEqual(2);
        expect(r.setGridX('a string value')).toEqual(r.DEFAULT_GRIDY);
        expect(r.setGridX(0)).toEqual(0);
        expect(r.setGridX(-1)).toEqual(r.DEFAULT_GRIDY);
    })
});