/*
 * CollageScript: CanvasGridRiez
 *
 * author: Calhoun Smith
 * email: cal@calhounsmith.com
 */
function CanvasGridRiez() {
    CanvasGrid.call(this);
}

CanvasGridRiez.prototype = new CanvasGrid();
CanvasGridRiez.prototype.constructor = CanvasGridRiez;

CanvasGridRiez.prototype.initCanvas = function() {
    CanvasGrid.prototype.initCanvas.call(this);
};

CanvasGridRiez.prototype.makeMark = function(m, coordinate) {
    if (!(m instanceof Mark) && !(m instanceof MarkSeries)) {
        throw new CollageException("Mark argument is not valid.");
    }

    if (typeof coordinate == "undefined" || !(coordinate instanceof Coordinate)) {
        throw new CollageException("Coordinate argument is not valid.");
    }

    var f = m.getFragmentRandom(this.coordinateToQuad(coordinate));
    this.getRenderer().placeFragment(m);
    this.getRenderer().offScreenRandom(m);
    var quadWidth = Number(this.getQuadWidth());
    var gutterWidth = Number(this.getGridGutterX());
    /* var markWidth = f.getFragmentLayer().getBounds().width; */
    /* var markHeight = f.getFragmentLayer().getBounds().height; */
    var markCorner = m.getCornerNumber();
    var markX = coordinate.getX();
    var markY = coordinate.getY();
    var markRotation = f.getProperty("a");
    /* CSGlobal.csDebug(1, "Quad width: " + quadWidth + " gutterWidth: " + gutterWidth + " markWidth: " + markWidth + " markHeight: " + markHeight + " markCorner: " + markCorner + " markX: " + markX + " markY: " + markY + " markRotation: " + markRotation); */
    switch (markCorner) {
        case 2:
            var newCoord = m.getNewCoordinate(90);
            markRotation = markRotation + 90;
            markX = markX + quadWidth - gutterWidth - Number(newCoord.getX());
            markY = markY + Number(newCoord.getY());
            break;

        case 3:
            var newCoord = m.getNewCoordinate(180);
            markRotation = markRotation + 180;
            markX = markX + quadWidth - gutterWidth - Number(newCoord.getX());
            markY = markY + quadWidth - gutterWidth + Number(newCoord.getY());
            break;

        case 4:
            var newCoord = m.getNewCoordinate(-90);
            markRotation = markRotation - 90;
            markX = markX - Number(newCoord.getX());
            markY = markY + quadWidth - gutterWidth + Number(newCoord.getY());
            break;

        default:
            var newCoord = m.getNewCoordinate();
            markX = markX - Number(newCoord.getX());
            markY = markY + Number(newCoord.getY());
            break;
    }
    /*CSGlobal.csDebug(1, "New coordinate: (" + newCoord.getX() + ", " + newCoord.getY() + ")");*/
    var tmp = {
        doc: f.getFragmentDocument(),
        name: f.getFragmentName(),
        x: markX,
        y: markY,
        rotation: markRotation,
        corner: markCorner
    };
    this.getCanvasMemory().setData(f.getFragmentLayer().name, tmp);
    this.closeFragment(m);
};
