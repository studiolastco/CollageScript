/*
Canvas is filled like any CanvasRGB piece.
Difference is that all four marks for each quad
are forced to use the same palette.
*/
function CanvasGridRGBButton()
{
  CanvasGridRGB.call();
};

//CanvasGridRGBButton.inherit(CanvasGridRGB);
CanvasGridRGBButton.prototype = new CanvasGridRGB();
CanvasGridRGBButton.prototype.constructor = CanvasGridRGBButton;

CanvasGridRGBButton.prototype.initCanvas = function()
{
  CanvasGridRGB.prototype.initCanvas.call(this);
}

CanvasGridRGBButton.prototype.mark = function(m, coordinate)
{
  if (!(m instanceof MarkSeries))
  {
    throw new CollageException('Mark argument is not a valid MarkSeries object.');
  }
  
  if (typeof(coordinate) == 'undefined' || !(coordinate instanceof Coordinate))
  {
    var coordinate = this.getRandomCoordinate();
  }
  
  var quad = this.coordinateToQuad(coordinate);
  if (this.quadArray[quad] < 1)
  {
    //var loopArray = m.marks.slice(0);
    var loopArray = m.getMarks();
    if (m.getShuffle())
    {
      CSGlobal.csDebug(2,"Shuffling marks.");
      loopArray = m.shuffle(loopArray);
    }
    
    // Use the first mark in the series to get a random palette
    var palette = loopArray[0].getARandomPalette();
    for(var j = 0; j < loopArray.length; j++)
    {
      // Setting a random palette to be used by all four marks of any single quad
      loopArray[j].setCurrentPalette(palette);
      this.makeMark(loopArray[j], coordinate);
    }

    this.closeQuad(quad);
    this.incrementMarksCount();
    CSGlobal.csDebug(1,"Quads left open: " + this.getNumberOfOpenQuads());
  }
  else
  {
    CSGlobal.csDebug(1,"Quad " + quad + " is closed. Skipping");
  }
};