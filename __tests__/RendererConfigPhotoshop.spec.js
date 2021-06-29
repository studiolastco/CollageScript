const RendererConfigPhotoshop = require("../lib/Renderer/Config/Photoshop.js");

describe("RendererConfigPhotoshop object unit tests.", () => {

    /*beforeAll(() => {
        let r = new RendererConfigPhotoshop;
    });*/

    test("RendererConfigPhotoshop constructor should return RendererConfigPhotoshop object", () => {
        let r = new RendererConfigPhotoshop;
        expect(r).toBeInstanceOf(RendererConfigPhotoshop);
    });

    test("gridX setter", () => {
        let r = new RendererConfigPhotoshop();
        expect(r).toHaveProperty('DEFAULT_GRIDX');
        expect(r).toHaveProperty('gridX');
        expect(r.setGridX(2)).toEqual(2);
        expect(r.setGridX('a string value')).toEqual(r.DEFAULT_GRIDX);
        expect(r.setGridX(0)).toEqual(0);
        expect(r.setGridX(-1)).toEqual(r.DEFAULT_GRIDX);
    })

    test("gridY setter", () => {
        let r = new RendererConfigPhotoshop();
        expect(r).toHaveProperty('DEFAULT_GRIDY');
        expect(r).toHaveProperty('gridY');
        expect(r.setGridY(2)).toEqual(2);
        expect(r.setGridX('a string value')).toEqual(r.DEFAULT_GRIDY);
        expect(r.setGridX(0)).toEqual(0);
        expect(r.setGridX(-1)).toEqual(r.DEFAULT_GRIDY);
    })
});