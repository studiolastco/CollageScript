const RendererConfig = require('../Config.js');

class RendererConfigCreateJS extends RendererConfig {
    constructor() {
        super();
        this.DEFAULT_GRIDX = 1;
        this.DEFAULT_GRIDY = 1;
    }
}

module.exports = RendererConfigCreateJS;
