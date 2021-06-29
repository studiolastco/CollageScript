/**
 * Abstract class Canvas
 * @abstract
 */
class Canvas {
    constructor() {
        if (new.target === Canvas) {
            throw new Error('Canvas is an abstract class and should not be directly instantiated.');
        }
    }
}

module.exports = Canvas;
