function CSListenerDraw()
{
  CSListener.call(this);
  this.drawingLayerName;
};

//CSListenerDraw.inherit(CSListener);
CSListenerDraw.prototype = new CSListener();
CSListenerDraw.prototype.constructor = CSListenerDraw;

CSListenerDraw.prototype.getDrawingLayerName = function()
{
    return this.drawingLayerName;
};

CSListenerDraw.prototype.setDrawingLayerName = function(layerName)
{  
  if (typeof(layerName) != 'undefined' && layerName.constructor == String)
  {
    this.drawingLayerName = layerName;
  }
};
