function CanvasMemory()
{
  this.memoryData = {};
};

CanvasMemory.prototype.getData = function(dataName)
{
  if (typeof(this.memoryData) != 'undefined' && typeof(this.memoryData[dataName]) != 'undefined')
  {
    return this.memoryData[dataName];
  }
  else
  {
    return false;
  }
};

CanvasMemory.prototype.setData = function(dataName, dataValue)
{
  CSGlobal.csDebug(2, "Set memory: " + dataName + " " + dataValue);
  this.memoryData[dataName] = dataValue;
};

CanvasMemory.prototype.clearData = function()
{
  this.memoryData = {};
};
