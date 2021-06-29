const Renderer = require('../Renderer.js');
const RendererConfigPhotoshop = require('../Renderer/Config/Photoshop.js');

/**
 * RendererPhotoshop
 */
 class RendererPhotoshop extends Renderer {
    constructor() {
        super();
        this.config = new RendererConfigPhotoshop();
    }
}

module.exports = RendererPhotoshop;
