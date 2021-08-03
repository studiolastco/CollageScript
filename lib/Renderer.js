const RendererConfig = require("../lib/Renderer/Config.js");

/**
 * Renderer
 * @abstract
 */
 class Renderer {

    /**
     * RendererConfig object
     */
    config;

    constructor() {
        if (new.target === Renderer) {
            throw new Error('Renderer is an abstract class and should not be directly instantiated.');
        }
    }

    /**
     * Get RendererConfig object
     * @returns RendererConfig {object}
     */
    getConfig() {
        return this.config;
    }

    /**
     * Set RendererConfig object for this Renderer
     * @param rendererConfigObject {object}
     */
     setConfig(rendererConfigObject) {
        if (rendererConfigObject instanceof RendererConfig) {
            this.config = rendererConfigObject;
        } else {
            throw new Error('RendererConfig must be set with a RendererConfig object.');
        }
        return this.config;
    }
}

module.exports = Renderer;
