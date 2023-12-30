function MarkRGBCenter()
{
  MarkRGB.call(this);
};

MarkRGBCenter.prototype = new MarkRGB();
MarkRGBCenter.prototype.constructor = MarkRGBCenter;

MarkRGBCenter.prototype.getCornerNumber = function()
{
  return 0;
};

MarkRGBCenter.prototype.doRules = function(canvas, coordinate)
{
  CSGlobal.csDebug(1, "Canvas info: " + canvas.getGridSizeX() + ", " + canvas.getGridSizeY());
  
  /* Moves upperleft corner of fragment to (upperleft corner of) coordinate */
  CSGlobal.csDebug(2, "Moving upper-left corner to coordinate: " + coordinate.getX() + ", " + coordinate.getY());
  canvas.getRenderer().toCoordinate(this, coordinate);
  
  /* Move fragment to mid-way point x and y over coordinate of upper-right corner of quad */
  CSGlobal.csDebug(2, "Moving center point over coordinate: " + coordinate.getX() + ", " + coordinate.getY());
  canvas.getRenderer().translate(this, -(this.getFragment().getProperty('width')/2), -(this.getFragment().getProperty('height')/2));

  /* Move fragment to mid-way point x and y over coordinate of upper-right corner of quad */
  CSGlobal.csDebug(2, "Moving center point over coordinate: " + coordinate.getX() + ", " + coordinate.getY());
  canvas.getRenderer().translate(this, (canvas.getGridSizeX()/2), (canvas.getGridSizeY()/2));

  var a = new Number(this.getFragment().getProperty('a'));
  CSGlobal.csDebug(2, "a: " + a);
    
  this.rotate(a);
  
};