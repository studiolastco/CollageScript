function Renderer()
{ 
  this.config;
  this.canvas;
  
  this.options = {};
  this.validOptions = ['units','width','height'];
};

Renderer.prototype.init = function()
{
  this.setApplicationUnits();
  this.setEnableNotifiers();
  CSGlobal.setData('applicationUnitsString', this.getApplicationUnitsString());
  this.setDebugLevel();
};

Renderer.prototype.getConfig = function()
{
  return this.config;
};

Renderer.prototype.setConfig = function(configObj)
{
  this.config = configObj;
};

Renderer.prototype.getApplicationUnitsString = function()
{
  return this.getConfig().DEFAULT_APPLICATIONUNITSTRING;
};

Renderer.prototype.getApplicationUnits = function()
{
  return this.getConfig().DEFAULT_APPLICATIONUNITSTRING;
};

Renderer.prototype.getUnits = function()
{
  return this.getOption('units');
};

Renderer.prototype.setUnits = function (units)
{
  if (!(this.validUnits(units)))
  {
    CSGlobal.csDebug(1,"Setting default units: " + this.getConfig().DEFAULT_UNITS);
    return this.setOption('units', this.getConfig().DEFAULT_UNITS);
  }
  else
  {
    CSGlobal.csDebug(1,"Setting units: " + units);
    return this.setOption('units', units);
  }
};

Renderer.prototype.getEnableNotifiers = function()
{
  return false;
};

Renderer.prototype.setEnableNotifiers = function(enableNotifiers)
{
  CSGlobal.csDebug(2, "Ignoring set enable notifiers call...");
  return false;
};

Renderer.prototype.isValidOption = function(optionName)
{
  if (typeof(this.validOptions) != 'undefined' && this.validOptions.constructor == Array)
  {
    return this.validOptions.inArray(optionName);
  }
  else
  {
    return false;
  }
};

Renderer.prototype.getOption = function(optionName)
{
  if (typeof(this.validOptions) != 'undefined' && typeof(this.options[optionName]) != 'undefined')
  {
    return this.options[optionName];
  }
  else
  {
    return false;
  }
};

Renderer.prototype.setOption = function(optionName, optionValue)
{
  if (this.isValidOption(optionName) && typeof(optionValue) != 'undefined')
  {
    this.options[optionName] = optionValue;
  }
  else
  {
    throw new CollageException(optionName + " is not a valid Renderer option. Stopping.");
  }
};
