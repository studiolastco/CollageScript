const Renderer = require('./Renderer.js');

/**
 * Abstract class Canvas
 * @abstract
 */
class Canvas {

    /**
     * Renderer object. Is this canvas rendered in Photoshop, CreateJS...?
     */
    renderer;

    constructor() {
        if (new.target === Canvas) {
            throw new Error('Canvas is an abstract class and should not be directly instantiated.');
        }
    }

    /**
     * Set Renderer object for this canvas
     * @param rendererObject {object}
     */
    setRenderer(rendererObject) {
        if (rendererObject instanceof Renderer) {
            this.renderer = rendererObject;
        } else {
            throw new Error('Canvas must be set with a Renderer object.');
        }
        return this.renderer;
    }
}

module.exports = Canvas;
