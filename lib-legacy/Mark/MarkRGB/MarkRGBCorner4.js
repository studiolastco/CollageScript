function MarkRGBCorner4()
{
  MarkRGB.call(this);
};

MarkRGBCorner4.prototype = new MarkRGB();
MarkRGBCorner4.prototype.constructor = MarkRGBCorner4;

MarkRGBCorner4.prototype.getCornerNumber = function()
{
  return 4;
};

MarkRGBCorner4.prototype.doRules = function(canvas, coordinate)
{
  CSGlobal.csDebug(2, "RGB Corner 4: " + this.getFragment().getLayerName());
  MarkRGB.prototype.doRules.call(this, canvas, coordinate);
  
  /* Move fragment over lower-left corner of quad */
  canvas.getRenderer().translate(this, 0, canvas.getGridSizeY());
  
  /* calculate new fragment coordinate which will be placed above canvas coordinate after rotation */
  var coordinate = new Coordinate(this.getFragment().getProperty('cx'), this.getFragment().getProperty('cy'));
  CSGlobal.csDebug(2, "O (cx, cy): " + coordinate.getX() + ", " + coordinate.getY());
  var r = canvas.geometry.getPolarR(coordinate);
  CSGlobal.csDebug(2, "r: " + r);
  CSGlobal.csDebug(2, "a: " + this.getFragment().getProperty('a'));
  var a = new Number(this.getFragment().getProperty('a')) - 90;
  CSGlobal.csDebug(2, "a - 90: " + a);
  var theta = canvas.geometry.getPolarTheta(coordinate);
  CSGlobal.csDebug(2, "theta: " + theta);
  var theta2 = new Number((theta - a));
  CSGlobal.csDebug(2, "theta - a: " + (theta - a));
  var newCoord = canvas.geometry.getCartesian(r, theta2);
  CSGlobal.csDebug(2, "New coordinate: " + newCoord.getX() + ", " + newCoord.getY());
  canvas.getRenderer().translate(this, -newCoord.getX(), newCoord.getY());
  
  this.rotate(a, coordinate);
};

MarkRGBCorner4.prototype.getNewCoordinate = function(angle)
{
  return Mark.prototype.getNewCoordinate.call(this, new Number(-90));
};
