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

/*
this.FRAGMENT_LAYERNAME_PREFIX = 'fragment:';
  this.DEFAULT_CANVASOFFSET = 0;
  this.DEFAULT_CANVASOFFSETX = 0;
  this.DEFAULT_CANVASOFFSETY = 0;
  this.DEFAULT_RESOLUTION = 30;
  this.DEFAULT_DOCUMENTMODE = null;
  this.DEFAULT_DOCUMENTFILL = null;
  this.DEFAULT_BITDEPTH = null;
  this.DEFAULT_COLORPROFILETYPE = null;
  //this.DEFAULT_GRIDSIZE = 1;
  //this.DEFAULT_GRIDSIZEX = 1;
  //this.DEFAULT_GRIDSIZY = 1;
  this.DEFAULT_GRIDGUTTER = 0;
  this.DEFAULT_GRIDGUTTERX = 0;
  this.DEFAULT_GRIDGUTTERY = 0;
  this.DEFAULT_GRIDDIRECTION_HORIZONTAL = 'horizontal';
  this.DEFAULT_GRIDDIRECTION_VERTICAL = 'vertical';
  this.DEFAULT_GRIDDIRECTION = this.DEFAULT_GRIDDIRECTION_HORIZONTAL;
  this.DEFAULT_APPLYREMAINDER = new Boolean(true);
  this.DEFAULT_RANDOMCOORDINATE = new Boolean(true);

  this.VALID_APPLICATIONUNITS  = ['px'];
  this.DEFAULT_APPLICATIONUNITS = 'px';
  this.DEFAULT_APPLICATIONUNITSTRING = 'px';
  this.DEFAULT_UNITS = this.DEFAULT_APPLICATIONUNITS;
  this.DEFAULT_UNITSTRING = this.DEFAULT_APPLICATIONUNITSTRING;
  this.VALID_DEBUGLEVEL = [0,1,2];
  this.DEFAULT_DEBUGLEVEL = 2;
  this.DEFAULT_ENABLENOTIFIER = Boolean(false);
  */