function MarkBlossomcolor1()
{
  MarkBlossomcolor.call(this);
};

MarkBlossomcolor1.prototype = new MarkBlossomcolor();
MarkBlossomcolor1.prototype.constructor = MarkBlossomcolor1;

MarkBlossomcolor1.prototype.getCornerNumber = function()
{
  return 1;
}

MarkBlossomcolor1.prototype.doRules = function(canvas, coordinate)
{
  CSGlobal.csDebug(2, "Blossom color 1: " + this.getFragment().getLayerName());
  MarkBlossomcolor.prototype.doRules.call(this, canvas, coordinate);
};