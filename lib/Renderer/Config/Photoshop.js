const RendererConfig = require('../Config.js');

class RendererConfigPhotoshop extends RendererConfig {
    constructor() {
        super();
        this.DEFAULT_GRIDX = 1;
        this.DEFAULT_GRIDY = 1;
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

module.exports = RendererConfigPhotoshop;
