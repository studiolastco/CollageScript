/* Fills quads with palette swatches. */
/* Number of swatches in palette provide the sequence. */
/* Every swatch in palette is placed once in sequence (as long as there are enough quads). */
/* Placing continues until all swatches are placed OR quads are filled. */
/* Coordinate for each swatch is picked in sequence returned by getCoordinateArray. */
/* Palette swatches are shuffled before sequence begins by default. setSwatchShuffle(boolean) */
/* Each swatch is placed at origin of each quad. */
/* There is no effort made to see if swatches fit quads in terms of dimensions. */
/* This means swatches may overlap in final result. Swatches are on Ps layers, so not a problem, necessarily. */

function CanvasGridSequence()
{
  CanvasGrid.call(this);
  
  this.rowFill;
  
  /* Will the swatch array be shuffled before using, affecting a random order? */
  this.shuffleSwatches = false;
  this.usingRandomCoordinate = false;
};

/* CanvasGridSequence.inherit(CanvasGrid); */
CanvasGridSequence.prototype = new CanvasGrid();
CanvasGridSequence.prototype.constructor = CanvasGridSequence;

CanvasGridSequence.prototype.initCanvas = function()
{
  CanvasGrid.prototype.initCanvas.call(this);
  /* this.setSwatchShuffle(); */
};

CanvasGridSequence.prototype.getSwatchShuffle = function()
{
  if (typeof(this.shuffleSwatches) == 'undefined')
  {
    this.setSwatchShuffle();
  }
  return this.shuffleSwatches;
};

CanvasGridSequence.prototype.setSwatchShuffle = function(shuffleSwatches)
{
  if (typeof(shuffleSwatches) != 'undefined' && shuffleSwatches.constructor == Boolean)
  {
    CSGlobal.csDebug(1,"Setting swatch shuffle to " + shuffleSwatches);
    this.shuffleSwatches = shuffleSwatches;
  }
  else
  {
    CSGlobal.csDebug(1,"Setting swatch shuffle to default true.");
    this.shuffleSwatches = Boolean(true);
  }
};

CanvasGridSequence.prototype.markAll = function(m, groupLayers)
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
  
  var quadNumber = this.getNumberOfQuads();
  if (!(confirm("CanvasGridSequence: Number Swatches: " + m.getCurrentPalette().getSwatches().length + ", number of Quads: " + quadNumber + ". Continue?")))
  {
    throw new CollageException('Stopping at user request.'); 
  }

  if (this.getSwatchShuffle())
  {
    CSGlobal.csDebug(1, "Shuffling swatches");
    m.getCurrentPalette().shuffleSwatches();
  }
  
  for(s = 0; s < m.getCurrentPalette().getSwatches().length; s++)
  {
    var f = m.setFragmentByKey(s);
    if (!(this.getUsingRandomCoordinate()))
    {
      this.mark(m, this.getCountdownCoordinateSequence());
    }
    else
    {
      this.mark(m, this.getCountdownCoordinate());
    }
    quadNumber--;
    if (quadNumber < 1) { break; }
  }
};

CanvasGridSequence.prototype.makeMark = function(m, coordinate)
{
  if (!(m instanceof Mark) && !(m instanceof MarkSeries))
  {
    throw new CollageException('Mark argument is not a valid Mark or MarkSeries object.');
  }
  
  if (typeof(coordinate) == 'undefined' || !(coordinate instanceof Coordinate))
  {
    throw new CollageException('Coordinate argument is not a Coordinate object.');
  }
  
  var f = m.getFragment();
  this.getRenderer().placeFragment(m);
  this.getRenderer().topLeft(m);
  if (typeof m.doRules === "function") 
  { 
    CSGlobal.csDebug(2,"Calling doRules for " + m.constructor.name);
    m.doRules(this, coordinate);
  }
  this.closeFragment(m);
};
