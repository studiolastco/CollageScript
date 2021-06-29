/**
 * Abstract class Renderer
 */
 class Renderer {
    constructor() {
        //console.log('Renderer const');
        if (new.target === Renderer) {
            throw new Error('Renderer is an abstract class and should not be directly instantiated.');
        }
    }
}

module.exports = Renderer;
