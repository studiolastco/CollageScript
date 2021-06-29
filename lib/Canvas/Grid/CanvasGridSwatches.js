function CanvasGridSwatches()
{
  CanvasGrid.call(this);
  this.shuffleSwatches;
};

//CanvasGridSwatches.inherit(CanvasGrid);
CanvasGridSwatches.prototype = new CanvasGrid();
CanvasGridSwatches.prototype.constructor = CanvasGridSwatches;

CanvasGridSwatches.prototype.initCanvas = function()
{
  CanvasGrid.prototype.initCanvas.call(this);
}

CanvasGridSwatches.prototype.markAll = function(m, groupLayers)
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
  
  var coordinateArray = this.getCoordinateArray();
  for(s = 0; s < m.palette.swatches.length; s++)
  {
    var randomCoordinateKey = Math.floor(Math.random() * coordinateArray.length);
    var tmp = coordinateArray.splice(randomCoordinateKey, 1);
    var coordinate = tmp[0];
    
    var f = m.setFragmentByKey(s);
    this.mark(m, coordinate);
  }
  
  /*var coordinateArray = this.getCoordinateArray();
  do
  {
    var randomCoordinateKey = Math.floor(Math.random() * coordinateArray.length);
    var tmp = coordinateArray.splice(randomCoordinateKey, 1);
    var coordinate = tmp[0];
    var mmm = m.palette.swatches.shift();
    CSGlobal.csDebug(1,"\nMarking...");
    this.mark(mmm, coordinate);
  } 
  while (m.palette.swatches.length > 0);*/
}
