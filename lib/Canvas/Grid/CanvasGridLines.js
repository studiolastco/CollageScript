function CanvasGridLines()
{
  CanvasGrid.call(this);
};

/* CanvasGridLines.inherit(CanvasGrid); */
CanvasGridLines.prototype = new CanvasGrid();
CanvasGridLines.prototype.constructor = CanvasGridLines;

CanvasGridLines.prototype.initCanvas = function()
{
  CanvasGrid.prototype.initCanvas.call(this);
};

CanvasGridLines.prototype.setGuidesVertical = function()
{
  CanvasGrid.prototype.setGuidesVertical.call(this);
  CSGlobal.csDebug(1,"Called setGuidesVertical in parent from child.");
  CanvasGrid.prototype.strokeGuidesVertical.call(this);
};

CanvasGridLines.prototype.setGuidesHorizontal = function()
{
  CanvasGrid.prototype.setGuidesHorizontal.call(this);
  CSGlobal.csDebug(1,"Called setGuidesHorizontal in parent from child.");
  CanvasGrid.prototype.strokeGuidesHorizontal.call(this);
};
