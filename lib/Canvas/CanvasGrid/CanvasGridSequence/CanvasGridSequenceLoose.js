function CanvasGridSequenceLoose()
{
  CanvasGridSequence.call(this);
};

//CanvasGridSequenceLoose.inherit(CanvasGridSequence);
CanvasGridSequenceLoose.prototype = new CanvasGridSequence();
CanvasGridSequenceLoose.prototype.constructor = CanvasGridSequenceLoose;

CanvasGridSequenceLoose.prototype.initCanvas = function()
{
  CanvasGridSequence.prototype.initCanvas.call(this);
}

/*
// Fills quads with palette swatches.
// Number of swatches in palette provide the sequence.
// Every swatch in palette is placed once in sequence (as long as there is enough space (notice, not quads)).
// Swatch is by default shuffled before sequence is begun.
// Placing continues until all swatches are placed OR space is filled.
// Placement of each swatch is determined in sequence and placed after previous, regardless of any coordinate array.
// Palette swatches are shuffled before sequence begins by default. setSwatchShuffle(boolean)
// Each swatch is placed at origin of the end of each previous placed swatch.
*/
CanvasGridSequenceLoose.prototype.markAll = function(m, groupLayers)
{
  if (!(m instanceof Mark) && !(m instanceof MarkSeries))
  {
    throw new CollageException('Mark argument is not a valid Mark or MarkSeries object.');
  }
  
  if (typeof(groupLayers) != 'undefined')
  {
    if (groupLayers.constructor instanceof Boolean)
    {
      this.setGroupLayers(groupLayers);
    }
  }
  
  var shuffle = this.getSwatchShuffle();
  if ((shuffle))
  {
    m.palette.shuffleSwatches();
  }
  
  var beginX = this.getBeginCoordinate().getX();
  var beginY = this.getBeginCoordinate().getY();
  var ys = this.getCoordinateArrayY();
  
  //CSGlobal.csDebug(1,"Y coordinates length: " + ys.length);
  //CSGlobal.csDebug(1,"getMaxXEdge: " + this.getMaxXEdge());
  //CSGlobal.csDebug(1,"Number of swatches: " + m.palette.swatches.length);
  
  var currentX = beginX;
  var currentY = beginY;
  for(s = 0; s < m.palette.swatches.length; s++)
  {
    CSGlobal.csDebug(1,"Swatch: " + (s + 1) + " of " + m.palette.swatches.length);
    if (currentX >= this.getMaxXEdge())
    {
      currentY = ys.shift();
      if (typeof(currentY) == 'undefined')
      {
        break;
      }
      CSGlobal.csDebug(1,"New currentY: " + currentY);
      currentX = beginX;
    }
    CSGlobal.csDebug(1,"currentX: " + currentX + ", currentY: " + currentY);
    var f = m.setFragmentByKey(s);
    var coord = new Coordinate(currentX, currentY);
    this.mark(m, coord);
    
    CSGlobal.csDebug(1,"Fragment width: " + f.getWidth());
    currentX += f.getWidth();
  }
}

CanvasGridSequenceLoose.prototype.mark = function(m, coordinate)
{
  if (!(m instanceof Mark) && !(m instanceof MarkSeries))
  {
    throw new CollageException('Mark argument is not a valid Mark or MarkSeries object.');
  }
  if (typeof(coordinate) == 'undefined' || !(coordinate instanceof Coordinate))
  {
    throw new CollageException('Coordinate is not set. Aborting.');
  }
  
  this.makeMark(m, coordinate);
}

CanvasGridSequenceLoose.prototype.makeMark = function(m, coordinate)
{
  CSGlobal.csDebug(1,"makeMark: getFragment");
  var f = m.getFragment();
  CSGlobal.csDebug(1,"makeMark: placeFragment");
  this.placeFragment(m);
  CSGlobal.csDebug(1,"makeMark: topLeft");
  this.topLeft(m);
  if (typeof m.doRules === "function") 
  { 
    CSGlobal.csDebug(1,"makeMark: doRules");
    m.doRules(this, coordinate);
  }
};
