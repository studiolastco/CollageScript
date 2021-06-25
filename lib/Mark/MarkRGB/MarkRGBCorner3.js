function MarkRGBCorner3()
{
  MarkRGB.call(this);
};

MarkRGBCorner3.prototype = new MarkRGB();
MarkRGBCorner3.prototype.constructor = MarkRGBCorner3;

MarkRGBCorner3.prototype.getCornerNumber = function()
{
  return 3;
};

MarkRGBCorner3.prototype.doRules = function(canvas, coordinate)
{
  CSGlobal.csDebug(2, "RGB Corner 3: " + this.getFragment().getLayerName());
  MarkRGB.prototype.doRules.call(this, canvas, coordinate);
  
  /* Move fragment over lower-right corner of quad */
  canvas.getRenderer().translate(this, canvas.getGridSizeX(), 0);
  canvas.getRenderer().translate(this, 0, canvas.getGridSizeY());
  
  /* calculate new fragment coordinate which will be placed above canvas coordinate after rotation */
  var coordinate = new Coordinate(this.getFragment().getProperty('cx'), this.getFragment().getProperty('cy'));
  CSGlobal.csDebug(2, "O (cx, cy): " + coordinate.getX() + ", " + coordinate.getY());
  var r = canvas.geometry.getPolarR(coordinate);
  CSGlobal.csDebug(2, "r: " + r);
  CSGlobal.csDebug(2, "a: " + this.getFragment().getProperty('a'));
  var a = new Number(this.getFragment().getProperty('a')) + 180;
  CSGlobal.csDebug(2, "a + 180: " + a);
  var theta = canvas.geometry.getPolarTheta(coordinate);
  CSGlobal.csDebug(2, "theta: " + theta);
  var theta2 = new Number((theta - a));
  CSGlobal.csDebug(2, "theta - a: " + (theta - a));
  var newCoord = canvas.geometry.getCartesian(r, theta2);
  CSGlobal.csDebug(2, "New coordinate: " + newCoord.getX() + ", " + newCoord.getY());
  canvas.getRenderer().translate(this, -newCoord.getX(), newCoord.getY());
  
  this.rotate(a, coordinate);
};

MarkRGBCorner3.prototype.getNewCoordinate = function(angle)
{
  return Mark.prototype.getNewCoordinate.call(this, new Number(180));
};
