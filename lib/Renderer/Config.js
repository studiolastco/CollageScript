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
    }

    getGridX() {
        return this.gridX;
    }

    setGridX(x) {
        if (
            Number.isInteger(x)
            && x >= 0
        ) {
            this.gridX = x;
        } else {
            this.gridX = this.DEFAULT_GRIDX;
        }
        return this.gridX;
    }

    getGridY() {
        return this.gridY;
    }

    setGridY(y) {
        if (
            Number.isInteger(y)
            && y >= 0
        ) {
            this.gridY = y;
        } else {
            this.gridY = this.DEFAULT_GRIDY;
        }
        return this.gridY;
    }
}

module.exports = RendererConfig;
