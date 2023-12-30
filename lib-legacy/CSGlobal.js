function CSGlobalObj()
{ 
  this.canvas;
  
  /* CSGlobal.csDebug(1, "/************************"); */
  /* CSGlobal.csDebug(1, "Instantiating CSGlobalObj. "); */
  /* CSGlobal.csDebug(1, "/************************"); */
  /* this.startDateTime = new Date(); */
  /* CSGlobal.csDebug(1, "Start: " + this.startDateTime.toDateString() + " " + this.startDateTime.toTimeString()); */
  /* CSGlobal.csDebug(1, "/************************"); */
  
  /* To provide event listening */
  this.listeners;
  
  /* A kind of Registry */
  this.globalData;
};

CSGlobalObj.prototype.csDebug = function(debugLevel, msg)
{
  /* This is global, if Renderer does not provide output path for debug info, then....tough luck? */
  if (typeof(this.canvas) != 'undefined' && typeof(this.canvas.renderer) != 'undefined' && (this.canvas instanceof Canvas) && (this.canvas.renderer instanceof Renderer) && debugLevel <= this.getCanvas().getRenderer().getDebugLevel())
  { 
    return this.getCanvas().getRenderer().csDebug(debugLevel, msg);
  }
};

CSGlobalObj.prototype.csDebugArray = function(debugLevel, msgArray)
{
  return this.csDebug(debugLevel, msgArray.join('\n'));
};

CSGlobalObj.prototype.getData = function(dataName)
{
  if (typeof(this.globalData) != 'undefined' && typeof(this.globalData[dataName]) != 'undefined')
  {
    return this.globalData[dataName];
  }
  else
  {
    return false;
  }
};

CSGlobalObj.prototype.setData = function(dataName, dataValue)
{
  if (typeof(this.globalData) == 'undefined')
  {
    this.globalData = {};
  }
  CSGlobal.csDebug(2, "Setting '" + dataName + "' to '" + dataValue + "' in Global Data.");
  this.globalData[dataName] = dataValue;
};

CSGlobalObj.prototype.clearData = function()
{
  this.globalData = {};
};

/* Listener name is of the form: ObjectMethod */
CSGlobalObj.prototype.addListener = function(listenerName, listenerObj)
{
  if (typeof(this.listeners) == 'undefined')
    this.listeners = [];

  /* What about more than one listener per ObjectMethod? */
  if (typeof(this.listeners[listenerName]) == 'undefined')
    this.listeners[listenerName] = [];
    
  CSGlobal.csDebug(2, "Add " + listenerObj.constructor.name + " as " + listenerName + " listener to Mark.");
  this.listeners[listenerName].push(listenerObj);
};

CSGlobalObj.prototype.removeListener = function(listenerName)
{
  CSGlobal.csDebug(2, "Remove " + listenerName + " listener from Mark.");
  if (typeof(this.listeners) != 'undefined' && typeof(this.listeners[listenerName]) != 'undefined' && this.listeners[listenerName].inArray(listenerName))
  {
    CSGlobal.csDebug(1, "Remove listener not yet implemented.");
    /* this.listeners[listenerName][?] = undefined; */
  }
};

CSGlobalObj.prototype.notifyListener = function(listenerName, notifierObj)
{
  if (typeof(this.listeners) != 'undefined' && typeof(this.listeners[listenerName]) != 'undefined')
  {
    CSGlobal.csDebug(2, "Notify " + listenerName + " listener(s) (" + this.listeners[listenerName].length + ") in " + notifierObj.constructor.name);
    for (var n = 0; n < this.listeners[listenerName].length; n++)
    {
      return this.listeners[listenerName][n].update(notifierObj);
    }
  }
};

CSGlobalObj.prototype.getCanvas = function()
{
  if (typeof(this.canvas) == 'undefined' || !(this.canvas instanceof Canvas))
  {
    throw new CollageException("There is no Canvas object currently registered.");
  }
  else
  {
    return this.canvas;
  }
};

CSGlobalObj.prototype.registerCanvas = function(canvas)
{
  if (canvas instanceof Canvas)
  {
    CSGlobal.csDebug(1, "Setting canvas in Global registry.");
    this.canvas = canvas;
  }
};
