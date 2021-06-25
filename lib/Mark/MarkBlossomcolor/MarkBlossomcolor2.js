function MarkBlossomcolor2()
{
  MarkBlossomcolor.call(this);
};

MarkBlossomcolor2.prototype = new MarkBlossomcolor();
MarkBlossomcolor2.prototype.constructor = MarkBlossomcolor2;

MarkBlossomcolor2.prototype.getCornerNumber = function()
{
  return 2;
}

MarkBlossomcolor2.prototype.doRules = function(canvas, coordinate)
{
  CSGlobal.csDebug(2, "Blossom color 2: " + this.getFragment().getLayerName());
  MarkBlossomcolor.prototype.doRules.call(this, canvas, coordinate);
  canvas.translate(this, 0, UnitValue(Number(1), CSGlobal.getData('applicationUnitsString')));
};