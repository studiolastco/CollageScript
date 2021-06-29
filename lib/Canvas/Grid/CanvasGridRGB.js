function CanvasGridRGB()
{
  CanvasGrid.call(this);
};

CanvasGridRGB.prototype = new CanvasGrid();
CanvasGridRGB.prototype.constructor = CanvasGridRGB;

CanvasGridRGB.prototype.initCanvas = function()
{
  CanvasGrid.prototype.initCanvas.call(this);
}
