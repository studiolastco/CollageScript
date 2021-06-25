/*
 * CollageScript: CanvasGrid
 *
 * author: Calhoun Smith
 * email: cal@calhounsmith.com
 */
function CanvasGrid() {
    Canvas.call(this);

    this.gridSize;
    this.gridSizeX;
    this.gridSizeY;
    this.gridGutter;
    this.gridGutterX;
    this.gridGutterY;

    /* In sequences, will marks be laid out horizontally or vertically. */
    this.gridDirection;

    this.beginCoordinate;
    this.endCoordinate;
    this.limitMinX;
    this.limitMinY;
    this.limitMaxX;
    this.limitMaxY;
    this.edgeX;
    this.edgeY;

    this.numberOfQuads;

    this.coordinateArray;
    this.coordinateArrayCountdown;

    /* quadArray contains a 0 or a 1; 0 indicates quad is open (not marked), 1 indicates marked */
    this.quadArray;

    /* Whether to apply real-estate remainders when calculating quads to canvas offsets. In effect, center grid... */
    this.applyRemainder;

    /* Whether do get next coordinate at random or in sequence */
    this.usingRandomCoordinate;

    /* Property containing a reference to the last fragment that was placd. */
    this.lastFragment;
}

CanvasGrid.prototype = new Canvas();
CanvasGrid.prototype.constructor = CanvasGrid;

/* Items to be saved via File > FileInfo in Ps to instructions IPTC filed via used of CSDocumentInfo object */
CanvasGrid.INSTRUCTIONS = ["gridSizeX", "gridSizeY", "gridGutterX", "gridGutterY"];

CanvasGrid.prototype.initCanvas = function () {
    CSGlobal.csDebug(1, "INIT: CanvasGrid");

    Canvas.prototype.initCanvas.call(this);

    if (this.getGridSizeX().constructor != Number) {
        this.setGridSizeX(this.getGridSizeX());
    }

    if (this.getGridSizeY().constructor != Number) {
        this.setGridSizeY(this.getGridSizeY());
    }

    if (this.getGridGutterX().constructor != Number) {
        this.setGridGutterX(this.getGridGutterX());
    }

    if (this.getGridGutterY().constructor != Number) {
        this.setGridGutterY(this.getGridGutterY());
    }

    if (typeof this.gridDirection == "undefined") {
        this.setGridDirection(this.getGridDirection());
    }

    /* Grid whether to use random or in sequence coordinates */
    if (typeof this.usingRandomCoordinate == "undefined") {
        this.setUsingRandomCoordinate(this.getUsingRandomCoordinate());
    }

    /* Quads are used in CanvasGrid objects */
    this.resetQuadArray();

    /* Set guides after resetting quads since remainders can adjust offsets and eventual guide placement */
    this.setGuidesVertical();
    this.setGuidesHorizontal();
};

CanvasGrid.prototype.setCanvas = function (canvasReference) {
    Canvas.prototype.setCanvas.call(this, canvasReference);

    /*if (this.getFirstVerticalGuide() !== false)
    this.setGridSizeX(this.getFirstVerticalGuide().coordinate.value);

  if (this.getFirstHorizontalGuide() !== false)
    this.setGridSizeY(this.getFirstHorizontalGuide().coordinate.value);*/

    /*if (this.getFirstVerticalGuide() !== false)
  {
    var tmp = new Number(this.getNextGuide(this.getFirstVerticalGuide()).coordinate) - new Number(this.getFirstVerticalGuide().coordinate);
    this.setGridSizeX(new Number(tmp));
  }*/

    /*if (this.getFirstHorizontalGuide() !== false)
  {
    var tmp = new Number(this.getNextGuide(this.getFirstHorizontalGuide()).coordinate) - new Number(this.getFirstHorizontalGuide().coordinate);
    this.setGridSizeY(new Number(tmp));
  }*/

    //this.addDocumentInfo(CanvasGrid.INSTRUCTIONS);
    //this.getDocumentInfo().confirmSet();
};

CanvasGrid.prototype.setGuidesVertical = function () {
    /* Add vertical guides */
    var xcoords = this.getCoordinateArrayX();
    for (var g = 0; g < xcoords.length; g++) {
        /* If gutter x is set, first guide to be set is the closing edge of the gutter, not the quad. */
        /* The second guide to be set (see inside the if control structure that follows) is the closing edge of the quad in question */
        this.getRenderer().addGuideVertical(xcoords[g]);
        if (this.getGridGutterX().constructor == Number && this.getGridGutterX() > 0 && xcoords[g] != xcoords[0]) {
            this.getRenderer().addGuideVertical(xcoords[g] - this.getGridGutterX());
        }
    }

    /* Manually add guide at far end which delineates the edge of the rows of quads. */
    this.getRenderer().addGuideVertical(this.getEdgeX());
};

CanvasGrid.prototype.setGuidesHorizontal = function () {
    /* Add horizontal guides */
    var ycoords = this.getCoordinateArrayY();
    for (var g = 0; g < ycoords.length; g++) {
        this.getRenderer().addGuideHorizontal(ycoords[g]);
        /* If gutter y is set */
        if (this.getGridGutterY().constructor == Number && this.getGridGutterY() > 0 && ycoords[g] != ycoords[0]) {
            this.getRenderer().addGuideHorizontal(ycoords[g] - this.getGridGutterY());
        }
    }
    /* Manually add guide at far end which delineates the edge of the rows of quads. */
    this.getRenderer().addGuideHorizontal(this.getEdgeY());
};

CanvasGrid.prototype.strokeGuidesVertical = function () {
    /* Add vertical guides */
    var xcoords = this.getCoordinateArrayX();
    for (var g = 0; g < xcoords.length; g++) {
        /* If gutter x is set, first guide to be set is the closing edge of the gutter, not the quad. */
        /* The second guide to be set (see inside the if control structure that follows) is the closing edge of the quad in question */
        this.getRenderer().strokeGuideVertical(xcoords[g]);
        if (this.getGridGutterX().constructor == Number && this.getGridGutterX() > 0 && xcoords[g] != xcoords[0]) {
            this.getRenderer().strokeGuideVertical(xcoords[g] - this.getGridGutterX());
        }
    }

    /* Manually add guide at far end which delineates the edge of the rows of quads. */
    this.getRenderer().strokeGuideVertical(this.getEdgeX());
};

CanvasGrid.prototype.strokeGuidesHorizontal = function () {
    /* Add horizontal guides */
    var ycoords = this.getCoordinateArrayY();
    for (var g = 0; g < ycoords.length; g++) {
        this.getRenderer().strokeGuideHorizontal(ycoords[g]);
        /* If gutter y is set */
        if (this.getGridGutterY().constructor == Number && this.getGridGutterY() > 0 && ycoords[g] != ycoords[0]) {
            this.getRenderer().strokeGuideHorizontal(ycoords[g] - this.getGridGutterY());
        }
    }
    /* Manually add guide at far end which delineates the edge of the rows of quads. */
    this.getRenderer().strokeGuideHorizontal(this.getEdgeY());
};

CanvasGrid.prototype.getEdgeX = function () {
    if (typeof this.edgeX == "undefined") {
        this.setEdgeX();
    }
    return this.edgeX;
};

CanvasGrid.prototype.setEdgeX = function () {
    var xcoords = this.getCoordinateArrayX();
    this.edgeX = xcoords[xcoords.length - 1] + this.getGridSizeX();
    CSGlobal.csDebug(1, "Setting edge X: " + this.edgeX);
};

CanvasGrid.prototype.getEdgeY = function () {
    if (typeof this.edgeY == "undefined") {
        this.setEdgeY();
    }
    return this.edgeY;
};

CanvasGrid.prototype.setEdgeY = function () {
    var ycoords = this.getCoordinateArrayY();
    this.edgeY = ycoords[ycoords.length - 1] + this.getGridSizeY();
    CSGlobal.csDebug(1, "Setting edge Y: " + this.edgeY);
};

CanvasGrid.prototype.getApplyRemainder = function () {
    if (typeof this.applyRemainder == "undefined") {
        this.setApplyRemainder();
    }
    return this.applyRemainder;
};

CanvasGrid.prototype.setApplyRemainder = function (applyRemainder) {
    if (typeof applyRemainder == "undefined" || applyRemainder.constructor != Boolean) {
        CSGlobal.csDebug(1, "Setting default applyRemainder: " + this.getRendererConfig().DEFAULT_APPLYREMAINDER);
        this.applyRemainder = this.getRendererConfig().DEFAULT_APPLYREMAINDER;
    } else {
        CSGlobal.csDebug(1, "Setting applyRemainder: " + applyRemainder);
        this.applyRemainder = applyRemainder;
    }
};

/* Shorthand method for setting both x and y at the same time */
CanvasGrid.prototype.setGridSize = function (gridSize) {
    if (gridSize < 0 || gridSize.constructor != Number) {
        CSGlobal.csDebug(1, "Setting default gridSize for x and y: " + this.getRendererConfig().DEFAULT_GRIDSIZE);
        /* this.gridSize = this.getRendererConfig().DEFAULT_GRIDSIZE; */
        this.setGridSizeX(this.getRendererConfig().DEFAULT_GRIDSIZE);
        this.setGridSizeY(this.getRendererConfig().DEFAULT_GRIDSIZE);
    } else {
        CSGlobal.csDebug(1, "Setting gridSize for x and y: " + gridSize);
        /* this.gridSize = gridSize; */
        this.setGridSizeX(gridSize);
        this.setGridSizeY(gridSize);
    }
};

CanvasGrid.prototype.getGridSizeX = function () {
    return this.gridSizeX;
};

CanvasGrid.prototype.setGridSizeX = function (gridSizeX) {
    if (gridSizeX < 0 || gridSizeX.constructor != Number) {
        CSGlobal.csDebug(1, "Setting default gridSizeX: " + this.getRendererConfig().DEFAULT_GRIDSIZEX);
        this.gridSizeX = this.getRendererConfig().DEFAULT_GRIDSIZEX;
    } else {
        CSGlobal.csDebug(1, "Setting gridSizeX: " + gridSizeX);
        this.gridSizeX = gridSizeX;
    }
};

CanvasGrid.prototype.getGridSizeY = function () {
    return this.gridSizeY;
};

CanvasGrid.prototype.setGridSizeY = function (gridSizeY) {
    if (gridSizeY < 0 || gridSizeY.constructor != Number) {
        CSGlobal.csDebug(1, "Setting default gridSizeY: " + this.getRendererConfig().DEFAULT_GRIDSIZEY);
        this.gridSizeY = this.getRendererConfig().DEFAULT_GRIDSIZEY;
    } else {
        CSGlobal.csDebug(1, "Setting gridSizeY: " + gridSizeY);
        this.gridSizeY = gridSizeY;
    }
};

CanvasGrid.prototype.setGridGutter = function (gridGutter) {
    if (gridGutter < this.getRendererConfig().DEFAULT_GRIDGUTTER) {
        CSGlobal.csDebug(1, "Setting default gridGutter for x and y: " + this.getRendererConfig().DEFAULT_GRIDGUTTER);
        this.setGridGutterX(this.getRendererConfig().DEFAULT_GRIDGUTTER);
        this.setGridGutterY(this.getRendererConfig().DEFAULT_GRIDGUTTER);
    } else {
        CSGlobal.csDebug(1, "Setting gridGutter for x and y: " + gridGutter);
        this.setGridGutterX(gridGutter);
        this.setGridGutterY(gridGutter);
    }
};

CanvasGrid.prototype.getGridGutterX = function () {
    //CSGlobal.csDebug(1,this.gridGutterX + " " + this.constructor.name + " " + this.prototype.name);
    return this.gridGutterX;
};

CanvasGrid.prototype.setGridGutterX = function (gridGutterX) {
    if (gridGutterX < this.getRendererConfig().DEFAULT_GRIDGUTTERX) {
        CSGlobal.csDebug(1, "Setting default gridGutterX: " + this.getRendererConfig().DEFAULT_GRIDGUTTERX);
        this.gridGutterX = this.getRendererConfig().DEFAULT_GRIDGUTTERX;
    } else {
        CSGlobal.csDebug(1, "Setting gridGutterX: " + gridGutterX);
        this.gridGutterX = gridGutterX;
    }
};

CanvasGrid.prototype.getGridGutterY = function () {
    return this.gridGutterY;
};

CanvasGrid.prototype.setGridGutterY = function (gridGutterY) {
    if (gridGutterY < this.getRendererConfig().DEFAULT_GRIDGUTTERY) {
        CSGlobal.csDebug(1, "Setting default gridGutterY: " + this.getRendererConfig().DEFAULT_GRIDGUTTERY);
        this.gridGutterY = this.getRendererConfig().DEFAULT_GRIDGUTTERY;
    } else {
        CSGlobal.csDebug(1, "Setting gridGutterY: " + gridGutterY);
        this.gridGutterY = gridGutterY;
    }
};

CanvasGrid.prototype.getGridDirection = function () {
    return this.gridDirection;
};

CanvasGrid.prototype.setGridDirection = function (gridDirection) {
    if (
        gridDirection != this.getRendererConfig().DEFAULT_GRIDDIRECTION_VERTICAL &&
        gridDirection != this.getRendererConfig().DEFAULT_GRIDDIRECTION_HORIZONTAL
    ) {
        CSGlobal.csDebug(1, "Setting default gridDirection: " + this.getRendererConfig().DEFAULT_GRIDDIRECTION);
        this.gridDirection = this.getRendererConfig().DEFAULT_GRIDDIRECTION;
    } else {
        CSGlobal.csDebug(1, "Setting gridDirection: " + gridDirection);
        this.gridDirection = gridDirection;
    }
};

CanvasGrid.prototype.getHorizontalRealestate = function () {
    /* Get horizontal real estate (width minus offset at left and right) */
    /* return (this.getWidth().value - this.getCanvasOffsetX()*2); */
    return this.getRenderer().getHorizontalRealestate(this);
};

CanvasGrid.prototype.getVerticalRealestate = function () {
    /* Get vertical real estate (height minus offset at top and bottom) */
    /* return (this.getHeight().value - this.getCanvasOffsetY()*2); */
    return this.getRenderer().getVerticalRealestate(this);
};

CanvasGrid.prototype.getQuadWidth = function () {
    /* Get a quad's width, this includes any horizontal gutter */
    return this.getGridSizeX() + this.getGridGutterX();
};

CanvasGrid.prototype.getQuadHeight = function () {
    /* Get a quad's height, this includes any vertical gutter */
    return this.getGridSizeY() + this.getGridGutterY();
};

CanvasGrid.prototype.getNumberOfQuadCols = function () {
    var result = Math.floor(this.getNumberOfQuadsPerRow());
    var rem = Math.floor(this.getRemainderNumberOfQuadsPerRow());

    /* Add remainder to canvas offset on left and right */
    if (rem.constructor == Number && rem > 0 && this.getApplyRemainder() === true) {
        CSGlobal.csDebug(1, "Applying half of horizontal remainder (" + rem + ").");
        this.setCanvasOffsetX(this.getCanvasOffsetX() + rem / 2);
    }
    return result;
};

CanvasGrid.prototype.getNumberOfQuadRows = function () {
    var result = Math.floor(this.getNumberOfQuadsPerCol());
    var rem = Math.floor(this.getRemainderNumberOfQuadsPerCol());

    /* Add remainder to canvas offset at top and bottom */
    if (rem.constructor == Number && rem > 0 && this.getApplyRemainder() === true) {
        CSGlobal.csDebug(1, "Applying half of vertical remainder (" + rem + ").");
        this.setCanvasOffsetY(this.getCanvasOffsetY() + rem / 2);
    }
    return result;
};

CanvasGrid.prototype.getNumberOfQuadsPerRow = function () {
    return this.getHorizontalRealestate() / this.getQuadWidth();
};

CanvasGrid.prototype.getNumberOfQuadsPerCol = function () {
    return this.getVerticalRealestate() / this.getQuadHeight();
};

CanvasGrid.prototype.getRemainderNumberOfQuadsPerRow = function () {
    return this.getHorizontalRealestate() % this.getQuadWidth();
};

CanvasGrid.prototype.getRemainderNumberOfQuadsPerCol = function () {
    return this.getVerticalRealestate() % this.getQuadHeight();
};

CanvasGrid.prototype.getNumberOfQuads = function () {
    return this.numberOfQuads;
};

CanvasGrid.prototype.resetQuadArray = function () {
    this.quadArray = [];
    this.numberOfQuads = this.getNumberOfQuadRows() * this.getNumberOfQuadCols();
    for (var i = 0; i < this.getNumberOfQuads(); i++) {
        this.quadArray[i] = 0;
    }
    CSGlobal.csDebug(1, "Quad array reset: " + this.numberOfQuads);
    CSGlobal.csDebug(1, "Number of quads: " + this.numberOfQuads);
    CSGlobal.csDebug(1, "Number of quad rows: " + this.getNumberOfQuadRows());
    CSGlobal.csDebug(1, "Number of quad cols: " + this.getNumberOfQuadCols());
};

/* If one quad is found open, returns false. */
CanvasGrid.prototype.quadsFilled = function () {
    var result = new Boolean(true);
    for (var i = 0; i < this.numberOfQuads; i++) {
        if (this.quadArray[i] == 0) {
            return new Boolean(false);
        }
    }
    return result;
};

CanvasGrid.prototype.getNumberOfOpenQuads = function () {
    var result = 0;
    for (var i = 0; i < this.numberOfQuads; i++) {
        if (this.quadArray[i] == 0) {
            result++;
        }
    }
    return result;
};

/*
See comments on previous version of this function.
This new version implements the simple fact that the quad
number is simply the key of the entry in the coordinateArray
Of course, this only works for coords which ARE the origin points
of quads. Will not work for coordinates that fall "within" quad areas!
*/
CanvasGrid.prototype.coordinateToQuad = function (coord) {
    if (coord instanceof Coordinate) {
        var coords = this.getCoordinateArray();
        for (var x = 0; x < coords.length; x++) {
            /*
      Oh, the madness! Remember, had to typecast with Number() here since coordinates
      with a 1 were cast as booleans, and then 'not'd in some way...anyway. Number() fixed it.
      */
            var v1 = Number(coords[x].getX()) == Number(coord.getX());
            var v2 = Number(coords[x].getY()) == Number(coord.getY());
            if (v1 && v2) {
                return new Number(x);
            }
        }
    } else {
        throw new CollageException("Coordinate argument is not a coordinate object: " + coord);
    }
    return false;
};

CanvasGrid.prototype.quadToCoordinate = function (quad) {
    if (quad.constructor == Number) {
        var coords = this.getCoordinateArray();
        if (typeof coords[quad] != "undefined") {
            return coords[quad];
        }
    } else {
        throw new CollageException("Quad argument is not a valid quad number: " + quad);
    }
    return false;
};

CanvasGrid.prototype.coordinateToRow = function (coord) {
    if (coord instanceof Coordinate) {
        return Math.floor(coord.getY() / this.getQuadHeight());
    }
};

CanvasGrid.prototype.coordinateToCol = function (coord) {
    if (coord instanceof Coordinate) {
        return Math.floor(coord.getX() / this.getQuadWidth());
    }
};

CanvasGrid.prototype.getBeginCoordinate = function () {
    if (!(this.beginCoordinate instanceof Coordinate)) {
        this.setBeginCoordinate();
    }
    return this.beginCoordinate;
};

CanvasGrid.prototype.setBeginCoordinate = function (beginCoordinate) {
    if (beginCoordinate instanceof Coordinate) {
        this.beginCoordinate = beginCoordinate;
        CSGlobal.csDebug(
            2,
            "Setting begin coordinate: (" + this.beginCoordinate.getX() + ", " + this.beginCoordinate.getY() + ")"
        );
    } else {
        this.beginCoordinate = new Coordinate(this.getCoordinateLimitMinX(), this.getCoordinateLimitMinY());
        CSGlobal.csDebug(
            2,
            "Setting begin coordinate to default value: (" +
                this.beginCoordinate.getX() +
                ", " +
                this.beginCoordinate.getY() +
                ")"
        );
    }
};

CanvasGrid.prototype.getEndCoordinate = function () {
    if (!(this.endCoordinate instanceof Coordinate)) {
        this.setEndCoordinate();
    }
    return this.endCoordinate;
};

CanvasGrid.prototype.setEndCoordinate = function (endCoordinate) {
    if (endCoordinate instanceof Coordinate) {
        this.endCoordinate = endCoordinate;
        CSGlobal.csDebug(
            2,
            "Setting end coordinate: (" + this.endCoordinate.getX() + ", " + this.endCoordinate.getY() + ")"
        );
    } else {
        this.endCoordinate = new Coordinate(this.getCoordinateLimitMaxX(), this.getCoordinateLimitMaxY());
        CSGlobal.csDebug(
            2,
            "Setting end coordinate to default value: (" +
                this.endCoordinate.getX() +
                ", " +
                this.endCoordinate.getY() +
                ")"
        );
    }
};

CanvasGrid.prototype.getQuadArray = function () {
    return this.quadArray;
};

/* This array is filled when getCoordinateArray is intially called with a copy of the coordinate array.
The countdown version is used to splice coordinate entries off for marking canvas. It keeps track of
when the canvas is fill. When the countdown array is empty, the canvas is full. */
CanvasGrid.prototype.getCountdownArray = function () {
    if (typeof this.coordinateArrayCountdown == "undefined" || this.coordinateArrayCountdown.constructor != Array) {
        CSGlobal.csDebug(2, "Countdown array is not set. Getting coordinate array.");
        this.getCoordinateArray();
        return this.coordinateArrayCountdown;
    } else {
        return this.coordinateArrayCountdown;
    }
};

CanvasGrid.prototype.getCoordinateArray = function () {
    if (typeof this.coordinateArray == "undefined" || this.coordinateArray.constructor != Array) {
        this.setCoordinateLimitMinX();
        this.setCoordinateLimitMaxX();
        this.setCoordinateLimitMinY();
        this.setCoordinateLimitMaxY();
        this.setBeginCoordinate();
        this.setEndCoordinate();

        var coordinateArray = new Array();
        if (this.getGridDirection() == this.getRendererConfig().DEFAULT_GRIDDIRECTION_VERTICAL) {
            for (
                var x = this.getBeginCoordinate().getX();
                x <= this.getEndCoordinate().getX();
                x = x + this.getQuadWidth()
            ) {
                /* CSGlobal.csDebug(1, x + " " + this.getEndCoordinate().getX() + " " + this.getCoordinateLimitMinX() + " " + this.getCoordinateLimitMaxX()); */
                if (x < this.getCoordinateLimitMinX() || x > this.getCoordinateLimitMaxX()) {
                    continue;
                }
                for (
                    var y = this.getBeginCoordinate().getY();
                    y <= this.getEndCoordinate().getY();
                    y = y + this.getQuadHeight()
                ) {
                    if (y < this.getCoordinateLimitMinY() || y > this.getCoordinateLimitMaxY()) {
                        continue;
                    }
                    coordinateArray.push(new Coordinate(x, y));
                }
            }
        } else {
            /* Essentially horizontal as default */
            CSGlobal.csDebug(
                1,
                "beginy: " +
                    this.getBeginCoordinate().getY() +
                    " endy: " +
                    this.getEndCoordinate().getY() +
                    " quadheight: " +
                    this.getQuadHeight()
            );
            for (
                var y = this.getBeginCoordinate().getY();
                y <= this.getEndCoordinate().getY();
                y = y + this.getQuadHeight()
            ) {
                CSGlobal.csDebug(
                    2,
                    "y: " + y + " min: " + this.getCoordinateLimitMinY() + " max: " + this.getCoordinateLimitMaxY()
                );
                if (y < this.getCoordinateLimitMinY() || y > this.getCoordinateLimitMaxY()) {
                    continue;
                }
                for (
                    var x = this.getBeginCoordinate().getX();
                    x <= this.getEndCoordinate().getX();
                    x = x + this.getQuadWidth()
                ) {
                    CSGlobal.csDebug(
                        2,
                        "x: " + y + " min: " + this.getCoordinateLimitMinX() + " max: " + this.getCoordinateLimitMaxX()
                    );
                    if (x < this.getCoordinateLimitMinX() || x > this.getCoordinateLimitMaxX()) {
                        continue;
                    }
                    coordinateArray.push(new Coordinate(x, y));
                }
            }
        }
        CSGlobal.csDebug(
            1,
            "Returning coordinate array: length: " +
                coordinateArray.length +
                " origin: " +
                coordinateArray[0].getX() +
                ", " +
                coordinateArray[0].getY() +
                " end: " +
                coordinateArray[coordinateArray.length - 1].getX() +
                ", " +
                coordinateArray[coordinateArray.length - 1].getY()
        );
        this.coordinateArray = coordinateArray;
        /* clone http://davidwalsh.name/javascript-clone-array */
        this.coordinateArrayCountdown = coordinateArray.slice(0);
    }
    return this.coordinateArray;
};

CanvasGrid.prototype.getCoordinateArrayX = function () {
    var xs = new Array();
    var coords = this.getCoordinateArray();
    for (var c = 0; c < coords.length; c++) {
        if (!xs.inArray(coords[c].getX().value)) {
            xs.push(coords[c].getX().value);
        }
    }
    return xs;
};

CanvasGrid.prototype.getCoordinateArrayY = function () {
    var ys = new Array();
    var coords = this.getCoordinateArray();
    for (var c = 0; c < coords.length; c++) {
        if (!ys.inArray(coords[c].getY().value)) {
            ys.push(coords[c].getY().value);
        }
    }
    return ys;
};

CanvasGrid.prototype.clearPatch = function () {
    CSGlobal.csDebug(1, "Clearing patch...");
    this.setBeginCoordinate();
    this.setEndCoordinate();
    this.setCoordinateLimitMinX(this.getMinX());
    this.setCoordinateLimitMaxX(this.getMaxX());
    this.setCoordinateLimitMinY(this.getMinY());
    this.setCoordinateLimitMaxY(this.getMaxY());
};

CanvasGrid.prototype.setPatch = function (coord1, coord2) {
    this.clearPatch();

    CSGlobal.csDebug(1, "setPatch coord1: (" + coord1.getX() + ", " + coord1.getY() + ")");
    CSGlobal.csDebug(1, "setPatch coord2: (" + coord2.getX() + ", " + coord2.getY() + ")");
    this.setPatchCoordinates(coord1, coord2);
};

CanvasGrid.prototype.setPatchCoordinates = function (coord1, coord2) {
    var beginCoord = new Coordinate(0, 0);
    var endCoord = new Coordinate(0, 0);
    if (coord1.getY() <= coord2.getY()) {
        beginCoord.setY(coord1.getY());
        endCoord.setY(coord2.getY());
    } else {
        beginCoord.setY(coord2.getY());
        endCoord.setY(coord1.getY());
    }

    if (coord1.getX() <= coord2.getX()) {
        beginCoord.setX(coord1.getX());
        endCoord.setX(coord2.getX());
    } else {
        beginCoord.setX(coord2.getX());
        endCoord.setX(coord1.getX());
    }

    this.setBeginCoordinate(beginCoord);
    this.setEndCoordinate(endCoord);
    this.setCoordinateLimitMin(this.getBeginCoordinate());
    this.setCoordinateLimitMax(this.getEndCoordinate());
};

CanvasGrid.prototype.getMinX = function () {
    return new Number(0 + this.getCanvasOffsetX());
};

CanvasGrid.prototype.getCoordinateLimitMinX = function () {
    if (typeof this.limitMinX == "undefined") {
        this.setCoordinateLimitMinX();
    }
    return this.limitMinX;
};

CanvasGrid.prototype.setCoordinateLimitMinX = function (limitMinX) {
    if (typeof limitMinX == "undefined" || limitMinX.constructor != Number || limitMinX < 0 + this.getCanvasOffsetX()) {
        this.limitMinX = this.getMinX(); /* (0 + this.getCanvasOffsetX()); */
        CSGlobal.csDebug(2, "Setting limitMinX to default value: " + this.limitMinX);
    } else {
        this.limitMinX = limitMinX;
        CSGlobal.csDebug(2, "Setting limitMinX " + this.limitMinX);
    }
};

CanvasGrid.prototype.getMaxXEdge = function () {
    return new Number(this.getMaxX() + this.getQuadWidth() + this.getCanvasOffsetY());
};

CanvasGrid.prototype.getMaxX = function () {
    var result = new Number(
        this.getCanvasOffsetX() + this.getQuadWidth() * (Math.floor(this.getNumberOfQuadsPerRow()) - 1)
    );
    return result;
};

CanvasGrid.prototype.getCoordinateLimitMaxX = function () {
    if (typeof this.limitMaxX == "undefined") {
        this.setCoordinateLimitMaxX();
    }
    return this.limitMaxX;
};

CanvasGrid.prototype.setCoordinateLimitMaxX = function (limitMaxX) {
    if (
        typeof limitMaxX == "undefined" ||
        limitMaxX.constructor != Number ||
        limitMaxX > this.width - this.getCanvasOffsetX()
    ) {
        this.limitMaxX = this.getMaxX();
        CSGlobal.csDebug(2, "Setting limitMaxX to default value: " + this.limitMaxX);
    } else {
        this.limitMaxX = limitMaxX;
        CSGlobal.csDebug(2, "Setting limitMaxX " + this.limitMaxX);
    }
};

CanvasGrid.prototype.getMinY = function () {
    return new Number(0 + this.getCanvasOffsetY());
};

CanvasGrid.prototype.getCoordinateLimitMinY = function () {
    if (typeof this.limitMinY == "undefined") {
        this.setCoordinateLimitMinY();
    }
    return this.limitMinY;
};

CanvasGrid.prototype.setCoordinateLimitMinY = function (limitMinY) {
    if (typeof limitMinY == "undefined" || limitMinY.constructor != Number || limitMinY < 0 + this.getCanvasOffsetY()) {
        this.limitMinY = this.getMinY();
        CSGlobal.csDebug(2, "Setting limitMinY to default value: " + this.limitMinY);
    } else {
        this.limitMinY = limitMinY;
        CSGlobal.csDebug(2, "Setting limitMinY " + this.limitMinY);
    }
};

CanvasGrid.prototype.getMaxYEdge = function () {
    return new Number(this.getMaxY() + this.getQuadHeight() + this.getCanvasOffsetY());
};

CanvasGrid.prototype.getMaxY = function () {
    var result = new Number(
        this.getCanvasOffsetY() + this.getQuadHeight() * (Math.floor(this.getNumberOfQuadsPerCol()) - 1)
    );
    return result;
};

CanvasGrid.prototype.getCoordinateLimitMaxY = function () {
    if (typeof this.limitMaxY == "undefined") {
        this.getCoordinateLimitMaxY();
    }
    return this.limitMaxY;
};

CanvasGrid.prototype.setCoordinateLimitMaxY = function (limitMaxY) {
    if (
        typeof limitMaxY == "undefined" ||
        limitMaxY.constructor != Number ||
        limitMaxY > this.height - this.getCanvasOffsetY()
    ) {
        this.limitMaxY = this.getMaxY(); /* (this.height - this.getCanvasOffsetY()); */
        CSGlobal.csDebug(2, "Setting limitMaxY to default value: " + this.limitMaxY);
    } else {
        this.limitMaxY = limitMaxY;
        CSGlobal.csDebug(2, "Setting limitMaxY " + this.limitMaxY);
    }
};

CanvasGrid.prototype.getRandomCoordinate = function () {
    var coordinateArray = this.getCoordinateArray();
    var randomCoordinateKey = Math.floor(Math.random() * coordinateArray.length);
    var randomCoordinate = coordinateArray[randomCoordinateKey];
    CSGlobal.csDebug(
        2,
        "Getting random coordinate: (" + randomCoordinate.getX() + ", " + randomCoordinate.getY() + ")"
    );
    return randomCoordinate;
};

CanvasGrid.prototype.getCountdownCoordinate = function () {
    var countdownArray = this.getCountdownArray();
    var randomCoordinateKey = Math.floor(Math.random() * countdownArray.length);
    /* Shortens countdown array, using splice... */
    var randomCoordinate = countdownArray.splice(randomCoordinateKey, 1);
    CSGlobal.csDebug(
        2,
        "Getting random countdown coordinate: (" + randomCoordinate[0].getX() + ", " + randomCoordinate[0].getY() + ")"
    );
    return randomCoordinate[0];
};

CanvasGrid.prototype.getCountdownCoordinateSequence = function () {
    var countdownArray = this.getCountdownArray();
    var sequenceCoordinate = countdownArray.shift();
    CSGlobal.csDebug(
        2,
        "Getting countdown coordinate in sequence: (" +
            sequenceCoordinate.getX() +
            ", " +
            sequenceCoordinate.getY() +
            ")"
    );
    return sequenceCoordinate;
};

CanvasGrid.prototype.getUsingRandomCoordinate = function () {
    if (typeof this.usingRandomCoordinate == "undefined") {
        this.setUsingRandomCoordinate();
    }
    return this.usingRandomCoordinate;
};

CanvasGrid.prototype.setUsingRandomCoordinate = function (usingRandomCoordinate) {
    if (typeof usingRandomCoordinate != "undefined" && usingRandomCoordinate.constructor == Boolean) {
        CSGlobal.csDebug(1, "Setting usingRandomCoordinate: " + usingRandomCoordinate);
        this.usingRandomCoordinate = Boolean(usingRandomCoordinate);
    } else {
        CSGlobal.csDebug(
            1,
            "Setting default usingRandomCoordinate to " + this.getRendererConfig().DEFAULT_RANDOMCOORDINATE
        );
        this.usingRandomCoordinate = this.getRendererConfig().DEFAULT_RANDOMCOORDINATE;
    }
};

CanvasGrid.prototype.openQuad = function (quad) {
    if (typeof quad != "undefined") {
        if (quad.constructor == Number && typeof this.quadArray[quad] != "undefined") {
            if (this.quadArray[quad] == 1) {
                this.quadArray[quad] = 0;
                CSGlobal.csDebug(2, "Opening quad " + quad + ".");
            }
        }
    }
};

CanvasGrid.prototype.quadIsOpen = function (quad) {
    if (
        typeof quad != "undefined" &&
        quad.constructor == Number &&
        typeof this.quadArray[quad] != "undefined" &&
        this.quadArray[quad] == 0
    ) {
        CSGlobal.csDebug(2, "Quad " + quad + " is open.");
        return true;
    } else {
        CSGlobal.csDebug(2, "Quad " + quad + " is not open.");
        return false;
    }
};

CanvasGrid.prototype.closeQuad = function (quad) {
    if (quad.constructor == Number && typeof this.quadArray[quad] != "undefined") {
        if (this.quadArray[quad] == 0) {
            this.quadArray[quad] = 1;
            CSGlobal.csDebug(2, "Closing quad " + quad + ".");
            return true;
        }
    }
    CSGlobal.csDebug(2, "Could not close quad " + quad + ".");
    return false;
};

CanvasGrid.prototype.quadIsClosed = function (quad) {
    if (
        typeof quad != "undefined" &&
        quad.constructor == Number &&
        typeof this.quadArray[quad] != "undefined" &&
        this.quadArray[quad] == 1
    ) {
        CSGlobal.csDebug(2, "Quad " + quad + " is closed.");
        return true;
    } else {
        CSGlobal.csDebug(2, "Quad " + quad + " is not closed.");
        return false;
    }
};

/*
Each quad in grid is marked until all are filled.
Countdown (coordinate) array provides sequence.
Placing continues until all quads are filled.
*/
CanvasGrid.prototype.markAll = function (m, groupLayers) {
    if (!(m instanceof Mark) && !(m instanceof MarkSeries)) {
        throw new CollageException("Mark argument is not a valid Mark or MarkSeries object.");
    }

    if (typeof groupLayers != "undefined") {
        if (groupLayers.constructor instanceof Boolean) {
            this.setGroupLayers(groupLayers);
        }
    }

    if (
        this.withConfirm &&
        !confirm(
            "CanvasGrid: Number of rows: " +
                this.getNumberOfQuadRows() +
                ", number of column: " +
                this.getNumberOfQuadCols() +
                ", number of quads: " +
                this.getNumberOfQuads() +
                ". Continue?"
        )
    ) {
        throw new CollageException("Stopping at user request.");
    }

    do {
        if (this.getUsingRandomCoordinate()) {
            this.mark(m, this.getCountdownCoordinate());
        } else {
            this.mark(m, this.getCountdownCoordinateSequence());
        }
    } while (this.getCountdownArray().length > 0);

    if (typeof this.statistics != "undefined" && this.statistics instanceof CSCanvasStatistics) {
        this.statistics.write();
    }
};

CanvasGrid.prototype.mark = function (m, coordinate) {
    if (!(m instanceof Mark) && !(m instanceof MarkSeries)) {
        throw new CollageException("Mark argument is not a valid Mark or MarkSeries object.");
    }

    if (typeof coordinate == "undefined" || !(coordinate instanceof Coordinate)) {
        throw new CollageException("Coordinate argument is not a Coordinate object.");
    }

    var quad = this.coordinateToQuad(coordinate);
    CSGlobal.csDebug(
        1,
        "Marking quad " + quad + " (" + coordinate.getX() + ", " + coordinate.getY() + ") with " + m.constructor.name
    );
    if (this.quadIsOpen(quad)) {
        if (m instanceof Mark) {
            this.makeMark(m, coordinate);
        } else {
            if (m instanceof MarkSeries) {
                if (m.paletteClusterIsset()) {
                    if (m.getShuffleCluster()) {
                        m.shufflePaletteCluster();
                    }
                    m.applyPaletteCluster();
                }

                var loopArray = m.marks.slice(0);
                if (m.getShuffle()) {
                    CSGlobal.csDebug(2, "Shuffling marks series.");
                    loopArray = m.shuffle(loopArray);
                }
                for (var j = 0; j < loopArray.length; j++) {
                    this.makeMark(loopArray[j], coordinate);
                }
            }
        }
        this.closeQuad(quad);
        this.incrementMarksCount();
        CSGlobal.csDebug(1, "Quads left open: " + this.getNumberOfOpenQuads());
    } else {
        CSGlobal.csDebug(1, "Quad " + quad + " is closed. Skipping");
    }
};

CanvasGrid.prototype.makeMark = function (m, coordinate) {
    if (!(m instanceof Mark) && !(m instanceof MarkSeries)) {
        throw new CollageException("Mark argument is not a valid Mark or MarkSeries object.");
    }

    if (typeof coordinate == "undefined" || !(coordinate instanceof Coordinate)) {
        throw new CollageException("Coordinate argument is not a Coordinate object.");
    }

    var f = m.getFragmentRandom(this.coordinateToQuad(coordinate));
    m.setFragment(f);
    var f2 = this.getRenderer().placeFragment(m);
    this.getRenderer().topLeft(m);
    if (typeof m.doRules === "function") {
        CSGlobal.csDebug(2, "Calling doRules for " + m.constructor.name);
        m.doRules(this, coordinate);
    }

    /* Save to canvas object AFTER placement and doRules for accurate bounds */
    this.lastFragment = f2;

    if (typeof this.statistics != "undefined" && this.statistics instanceof CSCanvasStatistics) {
        /* Register mark statistics in an array indexed by quad number to write to file */
        /* Subtracting two from artLayers to account for array notation AND existance of bakcgorund layer */
        var artLayerNo = this.getCanvas().artLayers.length - 2;
        var fL = Fragment.prototype.factory.call(this, this.getCanvas(), artLayerNo);
        this.statistics.registerStat("centerx", artLayerNo, new String(fL.getProperty("center").getX()));
        this.statistics.registerStat("centery", artLayerNo, new String(fL.getProperty("center").getY()));
        this.statistics.registerStat("width", artLayerNo, new String(fL.getProperty("width")));
        this.statistics.registerStat("height", artLayerNo, new String(fL.getProperty("height")));
    }

    this.closeFragment(m);
};

CanvasGrid.prototype.refreshCanvas = function () {
    this.coordinateArray = "undefined";
    this.coordinateArrayCountdown = "undefined";
    this.resetQuadArray();
    this.clearCanvasMemory();
    this.getRenderer().refreshCanvas();
};
