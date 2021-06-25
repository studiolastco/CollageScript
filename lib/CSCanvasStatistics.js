function CSCanvasStatistics(canvas)
{
  this.canvas;
  this.filename;
  this.file;
  
  this.stats;
  
  //this.setCanvas(canvas);
  //this.setFilename();
  //this.setFile();
};

CSCanvasStatistics.prototype.registerStat = function(statName, artLayerNo, statVal)
{
  CSGlobal.csDebug(2, "Registering stat: " + statName + " " + artLayerNo + " " + statVal);
  if (typeof(this.stats) == 'undefined')
    this.stats = [];
    
  if (typeof(statName) == 'undefined' || statName.constructor != String)
  {
    throw new CollageException("Statistic name should be a string.");
  }

  if (typeof(this.stats[artLayerNo]) == 'undefined')
    this.stats[artLayerNo] = {};

  var tmp = this.stats[artLayerNo];
  tmp[statName] = statVal;
}

CSCanvasStatistics.prototype.getFilename = function()
{
  return this.filename;
}

CSCanvasStatistics.prototype.setFilename = function()
{
  if (typeof(this.getCanvas()) == 'undefined')
  {
    throw new CollageException("Canvas is not set. Cannot determine statistics filename.");
  }
  
  CSGlobal.csDebug(2, "Setting filename (canvas): " + this.getCanvas().constructor.name);
  CSGlobal.csDebug(2, "Setting filename (canvasRoot): " + this.getCanvas().getCanvasRoot().constructor.name);
  this.filename = this.getCanvas().getCanvasRoot() + "/stats/stats-" + this.getCanvas().getCanvas().name + ".txt";
};

CSCanvasStatistics.prototype.getFile = function()
{
  return this.file;
}

CSCanvasStatistics.prototype.setFile = function()
{
  if (typeof(this.getFilename()) == 'undefined')
  {
    throw new CollageException("Filename is not set. Cannot instantiate file.");
  }
  
  this.file = new File(this.getFilename());
};

CSCanvasStatistics.prototype.getCanvas = function()
{
  return this.canvas;
};

CSCanvasStatistics.prototype.setCanvas = function(canvas)
{
  if (typeof(canvas) != 'undefined' && canvas instanceof Canvas)
  {
    CSGlobal.csDebug(1, "Setting canvas for statistics.");
    this.canvas = canvas;
  }
  else
  {
    throw new CollageException("Canvas is not a canvas object.");
  }
};

CSCanvasStatistics.prototype.open = function()
{
  var fStats = this.getFile();
  
  if (fStats.open('r'))
  {
    CSGlobal.csDebug(2, "Opening statistics file " + this.getFilename() + " for reading.");
    this.stats = JSON.parse(fStats.read());
  }
  else
  {
    CSGlobal.csDebug(2, "Creating statistics file " + this.getFilename() + " for writing.");
    return fStats.open('w');
  }
}

CSCanvasStatistics.prototype.close = function()
{
  var fStats = this.getFile();
  fStats.close();
}

CSCanvasStatistics.prototype.write = function()
{
  var fStats = this.getFile();
  
  if (fStats.open('w'))
  {
    CSGlobal.csDebug(2, "Opening statistics file " + this.getFilename() + " for writing. stats size: " + this.stats.length);
    fStats.write(JSON.stringify(this.stats));
    fStats.close();
  }
};
