/**
 * RendererConfig
 * @abstract
 */
class RendererConfig {

    /**
     * Quadrant size in x axis and default value property, integers
     */
    gridX;
    DEFAULT_GRIDX;

    /**
     * Quadrant size in y axis and default value property, integers
     */
    gridY;
    DEFAULT_GRIDY;

    /**
     * @constructor
     */
    constructor() {
        if (new.target === RendererConfig) {
            throw new Error('RendererConfig is an abstract class and should not be directly instantiated.');
        }

        /**
         * pseudo abstract methods, enforces in subclasses (p.316)
         */
        if (!this.setGridX) {
            throw new Error('Inheriting class must define getGridX()');
        }
        if (!this.setGridY) {
            throw new Error('Inheriting class must define getGridY()');
        }
    }
}

module.exports = RendererConfig;
