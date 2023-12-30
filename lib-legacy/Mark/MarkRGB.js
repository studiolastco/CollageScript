function MarkRGB()
{
  /*  
  File info properties:
  a: angle to rotate fragment in photoshop to place it on TOP of quadrant
  cx: x coordinate value in unrotated state (photoshop ruler origin placed in center of unrotated fragment) of point which will after rotation be on TOP line of quadrant
  cy: y coordinate, see cx...
  */
  Mark.call(this);
};

MarkRGB.prototype = new Mark();
MarkRGB.prototype.constructor = MarkRGB;

MarkRGB.prototype.doRules = function(canvas, coordinate)
{
  /* Moves upperleft corner of fragment to (upperleft corner of) coordinate */
  CSGlobal.csDebug(2, "Moving upper-left corner to coordinate: " + canvas.constructor.name + " " + coordinate.getX() + ", " + coordinate.getY());
  canvas.getRenderer().toCoordinate(this, coordinate);
  
  /* Move fragment to mid-way point x and y over coordinate of upper-right corner of quad */
  CSGlobal.csDebug(2, "Moving center point over coordinate: " + coordinate.getX() + ", " + coordinate.getY());
  canvas.getRenderer().translate(this, -(this.getFragment().getProperty('width')/2), -(this.getFragment().getProperty('height')/2));
};
