/*
 * CollageScript: Canvas
 *
 * author: Calhoun Smith
 * email: cal@calhounsmith.com
 */
function Canvas() {
    this.canvasRoot;
    this.name;
    this.renderer;

    this.units;
    this.width;
    this.height;

    this.canvasOffsetX;
    this.canvasOffsetY;

    this.canvasFile;
    this.canvasReference;
    this.marksCount;
    this.marksCountInterval = 25;

    this.memory = new CanvasMemory();
    this.statistics;
    this.drawingLayers;
    this.documentInfo;

    this.withConfirm = Boolean(false);
}

/**
 * Items to be saved via File > FileInfo in Ps to instructions IPTC filed via used of CSDocumentInfo object
 */
Canvas.INSTRUCTIONS = [
    "width",
    "height",
    "canvasOffsetX",
    "canvasOffsetY",
    "units",
    "resolution",
    "documentMode",
    "documentFill",
    "bitDepth",
    "colorProfile",
];

Canvas.prototype.shuffle = function (o) {
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

Canvas.prototype.getRendererConfig = function () {
    return this.getRenderer().getConfig();
};

//Canvas.prototype.geometry = new Geometry();

Canvas.prototype.getCanvas = function () {
    return this.canvasReference;
};

Canvas.prototype.getCanvasMemory = function () {
    return this.memory;
};

Canvas.prototype.clearCanvasMemory = function () {
    var memory = this.getCanvasMemory();
    if (memory instanceof CanvasMemory) {
        return memory.clearData();
    }
};

Canvas.prototype.getRenderer = function () {
    return this.renderer;
};

Canvas.prototype.setRenderer = function (renderer) {
    if (!(renderer instanceof Renderer)) {
        throw new CollageException("Canvas.setRenderer: Renderer argument is not a valid Renderer object.");
    }
    this.renderer = renderer;
};

Canvas.prototype.getDebugLevel = function () {
    return this.getRenderer().getDebugLevel();
};

Canvas.prototype.setDebugLevel = function (debugLevel) {
    return this.getRenderer().setDebugLevel(debugLevel);
};

/*Canvas.prototype.addDocumentInfo = function(additionalProperties)
{
  if (additionalProperties.constructor == Array)
  {
    return this.getDocumentInfo().addProperties(additionalProperties);
  }
};

Canvas.prototype.getDocumentInfo = function()
{
  return this.documentInfo;
};*/

Canvas.prototype.initCanvas = function () {
    CSGlobal.csDebug(1, "INIT: Canvas");

    this.getRenderer().setUnits(this.getRenderer().getUnits());

    if (this.getCanvasOffsetX().constructor != Number) {
        this.setCanvasOffsetX(this.getCanvasOffsetX());
    }

    if (this.getCanvasOffsetY().constructor != Number) {
        this.setCanvasOffsetY(this.getCanvasOffsetY());
    }

    this.getRenderer().initCanvas(this);

    this.resetMarksCount();
};

Canvas.prototype.setCanvas = function (canvasReference) {
    this.canvasReference = canvasReference;
    this.setCanvasRoot(this.canvasReference.path);

    this.getRenderer().setUnits(); /* will set to default cm's */

    /* Set values from open document or filesystem document */
    this.setName(this.canvasReference.name);

    /* Width */
    var widthObj = this.canvasReference.width;
    if (widthObj.type != "cm") {
        CSGlobal.csDebug(1, "Converting document to cm, was " + widthObj.type);
        var result = widthObj.convert(this.getRendererConfig().DEFAULT_UNITS);
        if (!result) throw new CollageException("Could not convert width units to cm.");
    }
    this.setWidth(widthObj);

    /* Height */
    var heightObj = this.canvasReference.height;
    if (heightObj.type != "cm") {
        CSGlobal.csDebug(1, "Converting document to cm, was " + heightObj.type);
        var result = heightObj.convert(this.getRendererConfig().DEFAULT_UNITS);
        if (!result) throw new CollageException("Could not convert height units to cm.");
    }
    this.setHeight(heightObj);

    if (this.getFirstVerticalGuide() !== false) this.setGridSizeX(this.getFirstVerticalGuide().coordinate.value);

    if (this.getFirstHorizontalGuide() !== false) this.setGridSizeY(this.getFirstHorizontalGuide().coordinate.value);

    /* Offset X */
    /*if (this.getFirstVerticalGuide() !== false)
    this.setCanvasOffsetX(this.getFirstVerticalGuide().coordinate);*/

    /* Offset Y */
    /*if (this.getFirstHorizontalGuide() !== false)
    this.setCanvasOffsetY(this.getFirstHorizontalGuide().coordinate);*/

    /* Resolution */
    var resolution = new Number(this.canvasReference.resolution);
    this.setResolution(resolution);

    /* Document Mode */
    this.getRenderer().setDocumentMode(this.canvasReference.mode);

    /* Document Fill */
    this.getRenderer().setDocumentFill(this.canvasReference.mode);

    /* Bit Depth */
    this.getRenderer().setBitDepth(this.canvasReference.bitsPerChannel);

    /* Color profile type */
    this.getRenderer().setColorProfileType(this.canvasReference.colorProfileType);

    /*this.getRenderer().addDocumentInfo(Canvas.INSTRUCTIONS);*/
};

Canvas.prototype.getDrawingLayers = function () {
    return this.drawingLayers;
};

Canvas.prototype.getDrawingLayer = function (layerName) {
    var drawingLayers = this.getDrawingLayers();
    if (typeof layerName != "undefined" && layerName.constructor == String) {
        for (var d in drawingLayers) {
            if (d == layerName) {
                var drawingLayer = this.getCanvas().artLayers.getByName(layerName);
                this.getCanvas().activeLayer = drawingLayer;
                return drawingLayer;
            }
        }
    } else {
        throw new CollageException("Drawing layer name not provided. Stopping.");
    }
    return false;
};

Canvas.prototype.addDrawingLayer = function (layerName, previousLayerName) {
    if (typeof this.drawingLayers == "undefined") {
        this.drawingLayers = {};
    }

    if (typeof this.drawingLayers[layerName] == "undefined") {
        CSGlobal.csDebug(2, "Adding drawing layer: " + layerName);
        this.drawingLayers[layerName] = this.getCanvas().artLayers.add();
        this.drawingLayers[layerName].name = layerName;
        this.getCanvas().activeLayer = this.drawingLayers[layerName];
        this.drawingLayers[layerName].move(this.getCanvas(), ElementPlacement.PLACEATBEGINNING);
        if (typeof previousLayerName != "undefined") {
            var result = this.getCanvas().artLayers.getByName(previousLayerName);
            this.getCanvas().activeLayer = result;
        }
        return this.drawingLayers[layerName];
    } else {
        return false;
    }
};

Canvas.prototype.removeDrawingLayer = function (layerName) {};

Canvas.prototype.layerExists = function (layerName) {
    if (typeof layerName != "undefined" && layerName.constructor == String) {
        var test = this.getCanvas().artLayers.getByName(layerName);
        CSGlobal.csDebug(2, "Layer " + layerName + " exists result: " + typeof test);
        if (typeof test != "undefined") {
            return true;
        } else {
            return false;
        }
    } else {
        throw new CollageException("Layer name must be provided and must be a string.");
    }
};

Canvas.prototype.getCanvasRoot = function () {
    return this.canvasRoot;
};

Canvas.prototype.setCanvasRoot = function (canvasRoot) {
    CSGlobal.csDebug(1, "Setting canvas root: " + canvasRoot);
    this.canvasRoot = canvasRoot;
};

Canvas.prototype.getName = function () {
    return this.name;
};

Canvas.prototype.setName = function (name) {
    CSGlobal.csDebug(1, "Setting canvas name: " + name);
    this.name = name;
};

Canvas.prototype.getWidth = function () {
    return this.getRenderer().getOption("width");
};

Canvas.prototype.setWidth = function (width) {
    return this.getRenderer().setWidth(width);
};

Canvas.prototype.getHeight = function () {
    return this.getRenderer().getOption("height");
};

Canvas.prototype.setHeight = function (height) {
    return this.getRenderer().setHeight(height);
};

Canvas.prototype.getResolution = function () {
    return this.getRenderer().getResolution();
};

Canvas.prototype.setResolution = function (resolution) {
    return this.getRenderer().setResolution(resolution);
};

/* Using these next two functions to try to determine canvas offset values 'achteraf' */
/* that is, when an existing canvas is being opened and set in a script... */
Canvas.prototype.getFirstVerticalGuide = function () {
    if (typeof this.getCanvas().guides != "undefined" && this.getCanvas().guides.length > 0) {
        for (var g = 0; g < this.getCanvas().guides.length; g++) {
            if (this.getCanvas().guides[g].direction == Direction.VERTICAL) return this.getCanvas().guides[g];
        }
    } else {
        return false;
    }
};

Canvas.prototype.getFirstHorizontalGuide = function () {
    if (typeof this.getCanvas().guides != "undefined" && this.getCanvas().guides.length > 0) {
        for (var g = 0; g < this.getCanvas().guides.length; g++) {
            if (this.getCanvas().guides[g].direction == Direction.HORIZONTAL) return this.getCanvas().guides[g];
        }
    } else {
        return false;
    }
};

Canvas.prototype.getNextGuide = function (guideObj) {
    if (typeof guideObj != "undefined" && guideObj instanceof Guide) {
        if (typeof this.getCanvas().guides != "undefined") {
            for (var g = 0; g < this.getCanvas().guides.length; g++) {
                if (
                    this.getCanvas().guides[g].direction == guideObj.direction &&
                    this.getCanvas().guides[g].coordinate == guideObj.coordinate
                ) {
                    CSGlobal.csDebug(
                        2,
                        "Next " +
                            this.getCanvas().guides[g + 1].direction +
                            " guide is " +
                            this.getCanvas().guides[g + 1].coordinate
                    );
                    return this.getCanvas().guides[g + 1];
                }
            }
        }
    } else {
        throw new CollageException(
            "Guide argument provided is of type " + guideObj.constructor + ". Should be a Guide."
        );
    }
};

/* Shorthand for setting x and y at the same time */
Canvas.prototype.setCanvasOffset = function (canvasOffset) {
    if (canvasOffset < this.getRendererConfig().DEFAULT_CANVASOFFSET) {
        CSGlobal.csDebug(
            1,
            "Setting default canvasOffset for x and y: " + this.getRendererConfig().DEFAULT_CANVASOFFSET
        );
        this.setCanvasOffsetX(this.getRendererConfig().DEFAULT_CANVASOFFSET);
        this.setCanvasOffsetY(this.getRendererConfig().DEFAULT_CANVASOFFSET);
    } else {
        CSGlobal.csDebug(1, "Setting canvasOffset for x and y: " + canvasOffset);
        this.setCanvasOffsetX(canvasOffset);
        this.setCanvasOffsetY(canvasOffset);
    }
};

Canvas.prototype.getCanvasOffsetX = function () {
    if (typeof this.canvasOffsetX == "undefined") {
        CSGlobal.csDebug(
            1,
            "canvasOffsetX not set. Setting to default: " + this.getRendererConfig().DEFAULT_CANVASOFFSETX
        );
        this.canvasOffsetX = this.getRendererConfig().DEFAULT_CANVASOFFSETX;
    }
    return this.canvasOffsetX;
};

Canvas.prototype.setCanvasOffsetX = function (canvasOffsetX) {
    if (canvasOffsetX < this.getRendererConfig().DEFAULT_CANVASOFFSETX) {
        CSGlobal.csDebug(1, "Setting default canvasOffsetX: " + this.getRendererConfig().DEFAULT_CANVASOFFSETX);
        this.canvasOffsetX = this.getRendererConfig().DEFAULT_CANVASOFFSETX;
    } else {
        CSGlobal.csDebug(1, "Setting canvasOffsetX: " + canvasOffsetX);
        this.canvasOffsetX = canvasOffsetX;
    }
};

Canvas.prototype.getCanvasOffsetY = function () {
    if (typeof this.canvasOffsetY == "undefined") {
        CSGlobal.csDebug(
            1,
            "canvasOffsetY not set. Setting to default: " + this.getRendererConfig().DEFAULT_CANVASOFFSETY
        );
        this.canvasOffsetY = this.getRendererConfig().DEFAULT_CANVASOFFSETY;
    }
    return this.canvasOffsetY;
};

Canvas.prototype.setCanvasOffsetY = function (canvasOffsetY) {
    if (canvasOffsetY < this.getRendererConfig().DEFAULT_CANVASOFFSETY) {
        CSGlobal.csDebug(1, "Setting default canvasOffsetY: " + this.getRendererConfig().DEFAULT_CANVASOFFSETY);
        this.canvasOffsetY = this.getRendererConfig().DEFAULT_CANVASOFFSETY;
    } else {
        CSGlobal.csDebug(1, "Setting canvasOffsetY: " + canvasOffsetY);
        this.canvasOffsetY = canvasOffsetY;
    }
};

Canvas.prototype.getMarksCount = function () {
    return this.marksCount;
};

Canvas.prototype.setMarksCount = function (marksCount) {
    if (marksCount.constructor == Number && marksCount > 0) {
        this.marksCount = marksCount;
    } else {
        this.marksCount = 0;
    }
};

Canvas.prototype.resetMarksCount = function () {
    this.setMarksCount(0);
};

Canvas.prototype.incrementMarksCount = function () {
    this.marksCount++;
    if (
        this.getMarksCount() / this.getMarksCountInterval() ==
        parseInt(this.getMarksCount() / this.getMarksCountInterval())
    ) {
        CSGlobal.csDebug(1, this.getMarksCount() + " marks made.");
    }
};

Canvas.prototype.getMarksCountInterval = function () {
    return this.marksCountInterval;
};

Canvas.prototype.setMarksCountInterval = function (marksCountInterval) {
    if (marksCountInterval.constructor == Number && marksCountInterval > 0) {
        this.marksCountInterval = marksCountInterval;
    } else {
        this.marksCountInterval = 25;
    }
};

Canvas.prototype.getCircle = function (r) {
    var c = this.geometry.getCircle(r);
    if (c === false) {
        throw new CollageException("Cannot create a circle with radius: " + r);
    } else {
        return c;
    }
};

Canvas.prototype.closeFragment = function (m) {
    if (typeof m.paletteReset != "undefined" && m.paletteReset) {
        m.clearPalette();
    }

    this.getRenderer().closeFragment(m);
    return true;
};

Canvas.prototype.removeMark = function (m) {
    this.getRenderer().removeMark(m);
    return true;
};
