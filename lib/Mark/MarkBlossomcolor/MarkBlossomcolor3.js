function MarkBlossomcolor3()
{
  MarkBlossomcolor.call(this);
};

MarkBlossomcolor3.prototype = new MarkBlossomcolor();
MarkBlossomcolor3.prototype.constructor = MarkBlossomcolor3;

MarkBlossomcolor3.prototype.getCornerNumber = function()
{
  return 3;
}

MarkBlossomcolor3.prototype.doRules = function(canvas, coordinate)
{
  CSGlobal.csDebug(2, "Blossom color 3: " + this.getFragment().getLayerName());
  MarkBlossomcolor.prototype.doRules.call(this, canvas, coordinate);
  canvas.translate(this, 0, UnitValue(Number(2), CSGlobal.getData('applicationUnitsString')));
};