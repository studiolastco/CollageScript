function MarkGrid()
{
  Mark.call(this);
};

MarkGrid.prototype = new Mark();
MarkGrid.prototype.constructor = MarkGrid;

MarkGrid.prototype.doRules = function(canvas, coordinate)
{
  // Moves upperleft corner of fragment to (upperleft corner of) coordinate
  canvas.getRenderer().toCoordinate(this, coordinate);
};
