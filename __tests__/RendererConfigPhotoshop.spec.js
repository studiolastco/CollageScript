const RendererConfig = require("../lib/Renderer/Config.js");
const RendererConfigPhotoshop = require("../lib/Renderer/Config/Photoshop.js");

describe("RendererConfigPhotoshop object unit tests.", () => {

    test("RendererConfigPhotoshop should extend RendererConfig object", () => {
        let r = new RendererConfigPhotoshop;
        expect(r).toBeInstanceOf(RendererConfig);
    });

    test("RendererConfigPhotoshop constructor should return RendererConfigPhotoshop object", () => {
        let r = new RendererConfigPhotoshop;
        expect(r).toBeInstanceOf(RendererConfigPhotoshop);
    });

    test("gridX property testing...", () => {
        let r = new RendererConfigPhotoshop();
        expect(r).toHaveProperty('DEFAULT_GRIDX');
        expect(r.DEFAULT_GRIDX).not.toBeUndefined();
        expect(r).toHaveProperty('gridX');
        expect(r.setGridX(2)).toEqual(2);
        expect(r.setGridX('a string value')).toEqual(r.DEFAULT_GRIDX);
        expect(r.setGridX(0)).toEqual(0);
        expect(r.setGridX(-1)).toEqual(r.DEFAULT_GRIDX);
    })

    test("gridY property testing...", () => {
        let r = new RendererConfigPhotoshop();
        expect(r).toHaveProperty('DEFAULT_GRIDY');
        expect(r.DEFAULT_GRIDY).not.toBeUndefined();
        expect(r).toHaveProperty('gridY');
        expect(r.setGridY(2)).toEqual(2);
        expect(r.setGridX('a string value')).toEqual(r.DEFAULT_GRIDY);
        expect(r.setGridX(0)).toEqual(0);
        expect(r.setGridX(-1)).toEqual(r.DEFAULT_GRIDY);
    })
});