function MarkBlossomcolor()
{
  Mark.call(this);
};

MarkBlossomcolor.prototype = new Mark();
MarkBlossomcolor.prototype.constructor = MarkBlossomcolor;

MarkBlossomcolor.prototype.doRules = function(canvas, coordinate)
{
  // Moves upperleft corner of fragment to (upperleft corner of) coordinate
  CSGlobal.csDebug(2, "Moving upper-left corner to coordinate: " + coordinate.getX() + ", " + coordinate.getY());
  canvas.toCoordinate(this, coordinate);
};
