function MarkBlossomcolor4()
{
  MarkBlossomcolor.call(this);
};

MarkBlossomcolor4.prototype = new MarkBlossomcolor();
MarkBlossomcolor4.prototype.constructor = MarkBlossomcolor4;

MarkBlossomcolor4.prototype.getCornerNumber = function()
{
  return 4;
}

MarkBlossomcolor4.prototype.doRules = function(canvas, coordinate)
{
  CSGlobal.csDebug(2, "Blossom color 4: " + this.getFragment().getLayerName());
  MarkBlossomcolor.prototype.doRules.call(this, canvas, coordinate);
  canvas.translate(this, 0, UnitValue(Number(3), CSGlobal.getData('applicationUnitsString')));
};