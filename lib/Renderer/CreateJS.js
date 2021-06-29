const Renderer = require('../Renderer.js');
const RendererConfigCreateJS = require('../Renderer/Config/CreateJS.js');

/**
 * RendererCreateJS
 */
 class RendererCreateJS extends Renderer {
    constructor() {
        super();
        this.config = new RendererConfigCreateJS();
    }
}

module.exports = RendererCreateJS;
