/*
Fills quads with palette swatches.
Number of swatches in palette provide the sequence.
Every swatch in palette is placed once in sequence (as long as there is enough space (notice, not quads)).
Swatches are not shuffled.
Swatches have mingled among them ones designated "Head"s. This indicates a kind of subsequence.
Placing continues in one row or column until a Head swatch is found. Last filled quad/coord is noted.
Placing continues in next row or column...
*/

function CanvasGridSequenceHead()
{
  CanvasGridSequence.call(this);
};

CanvasGridSequenceHead.prototype = new CanvasGridSequence();
CanvasGridSequenceHead.prototype.constructor = CanvasGridSequenceHead;

CanvasGridSequenceHead.prototype.initCanvas = function()
{
  CanvasGridSequence.prototype.initCanvas.call(this);
}

CanvasGridSequenceHead.prototype.setSwatchShuffle = function(shuffleSwatches)
{
  /*
  Overloads parent implementation, "Head" sub sequences do not tolerate shuffling! 
  Code was removed in this class's implemetation of markAll, anyway ;)
  */
  CSGlobal.csDebug(1,"Setting shuffle to false. Sub-sequences should not be shuffled.");
  this.shuffleSwatches = new Boolean(false);
}

CanvasGridSequenceHead.prototype.markAll = function(m, groupLayers)
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
  if (!(confirm("CanvasGridSequenceHead: Number Swatches: " + m.getSwatches().length + ", number of Quads: " + quadNumber + ". Continue?")))
  {
    throw new CollageException('Stopping at user request.'); 
  }
  
  var coords = this.getCoordinateArray();
  var coordsNew = [];
  if (this.getGridDirection() == this.getRendererConfig().DEFAULT_GRIDDIRECTION_VERTICAL)
  {
    var numberOfTracks = this.getNumberOfQuadCols();
    var i,j,temparray,chunk = this.getNumberOfQuadsPerCol();
  }
  else
  {
    var numberOfTracks = this.getNumberOfQuadRows();
    var i, j, temparray, chunk = this.getNumberOfQuadsPerRow();
  }

  // Build array structure
  for (i=0, j=coords.length; i<j; i+=chunk) 
  {
    var temparray = coords.slice(i,i+chunk);
    coordsNew.push(temparray);
  }
  
  var currentRowOrCol = 0;
  var swatchCount = 0;
  for(var s = 0; s < m.getSwatches().length; s++)
  {
    var f = m.setFragmentByKey(s);    
    var isHead = f.getProperty('CSSubSequenceHead');
    if (isHead == 1)
      CSGlobal.csDebug(1, "Is Head: " + f.getDocumentName());
    
    if  (
          (isHead == 1 && s != 0) 
          || (coordsNew[currentRowOrCol].length == 0) 
          || (swatchCount >= chunk)
        )
    { 
      do 
      {
        swatchCount = 0;
        currentRowOrCol++;
        // Is this row or column the last one?
        if (currentRowOrCol >= numberOfTracks)
        {
          currentRowOrCol = 0;
        }
      } while (coordsNew[currentRowOrCol].length == 0)
    }

    CSGlobal.csDebug(1, "Current row/col: " + currentRowOrCol + ", Swatch count: " + swatchCount + ", Space remaining: " + coordsNew[currentRowOrCol].length);
    
    var coord = coordsNew[currentRowOrCol].shift();
    this.mark(m, coord);
    swatchCount++;
    quadNumber--;
    if (quadNumber < 1) { break; }
  }
}

CanvasGridSequenceHead.prototype.makeMark = function(m, coordinate)
{
  var f = m.getFragment();
  this.placeFragment(m);
  this.topLeft(m);
  if (typeof m.doRules === "function") 
  { 
    m.doRules(this, coordinate);
  }
  
  this.closeQuad(this.coordinateToQuad(coordinate));
  this.incrementMarksCount();
};
