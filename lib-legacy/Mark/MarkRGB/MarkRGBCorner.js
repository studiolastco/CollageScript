function MarkRGBCorner()
{
  MarkRGB.call(this);
};

//MarkRGBCorner.inherit(MarkRGB);
MarkRGBCorner.prototype = new MarkRGB();
MarkRGBCorner.prototype.constructor = MarkRGBCorner;

MarkRGBCorner.prototype.getCornerNumber = function()
{
  return 1;
};

MarkRGBCorner.prototype.doRules = function(canvas, coordinate)
{
  CSGlobal.csDebug(2, "RGB Corner 1: " + this.getFragment().getLayerName());
  MarkRGB.prototype.doRules.call(this, canvas, coordinate);

  /* calculate new fragment coordinate which will be placed above canvas coordinate after rotation */
  var coordinate = new Coordinate(this.getFragment().getProperty('cx'), this.getFragment().getProperty('cy'));
  CSGlobal.csDebug(2, "O (cx, cy): " + coordinate.getX() + ", " + coordinate.getY());
  
  var r = canvas.geometry.getPolarR(coordinate);
  CSGlobal.csDebug(2, "r: " + r);
  CSGlobal.csDebug(2, "a: " + this.getFragment().getProperty('a'));
  
  var a = new Number(this.getFragment().getProperty('a'));
  CSGlobal.csDebug(2, "a: " + a);
  
  var theta = canvas.geometry.getPolarTheta(coordinate);
  CSGlobal.csDebug(2, "theta: " + theta);
  
  var theta2 = new Number((theta - a));
  /* So once a rotation is done, cx and cy values change with rotation, this determines that combined rotation (theta with a) */
  /* then use the value non changing value of r plus theta2 value to get new coordinate relative to Cartesian system  */
  /* which will be O */
  CSGlobal.csDebug(2, "theta - a: " + (theta - a));
  
  var newCoord = canvas.geometry.getCartesian(r, theta2);
  CSGlobal.csDebug(2, "New coordinate: " + newCoord.getX() + ", " + newCoord.getY());
  
  /* Place new O over coorindate in grid object */
  canvas.getRenderer().translate(this, -newCoord.getX(), newCoord.getY());
  
  this.rotate(a, coordinate);
};