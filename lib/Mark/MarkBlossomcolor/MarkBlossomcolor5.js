function MarkBlossomcolor5()
{
  MarkBlossomcolor.call(this);
};

MarkBlossomcolor5.prototype = new MarkBlossomcolor();
MarkBlossomcolor5.prototype.constructor = MarkBlossomcolor5;

MarkBlossomcolor5.prototype.getCornerNumber = function()
{
  return 5;
}

MarkBlossomcolor5.prototype.doRules = function(canvas, coordinate)
{
  CSGlobal.csDebug(2, "Blossom color 5: " + this.getFragment().getLayerName());
  MarkBlossomcolor.prototype.doRules.call(this, canvas, coordinate);
  canvas.translate(this, 0, UnitValue(Number(4), CSGlobal.getData('applicationUnitsString')));
};