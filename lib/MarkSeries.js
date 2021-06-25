function MarkSeries()
{
  //this.renderer;
  
  this.marks;
  
  //Per Mark in a MarkSeries one can define an array of possible palettes that will
  //then be chosen from randomly at the time of Mark placement (Made for Blossom)
  this.paletteCluster;
  
  /* Marks array is shuffled each time before marks are placed in canvas. */
  /* In the case of RGB, for instance, this means corner 3 can be placed before 1. */
  this.shuffleSetting;
  
  /* Palettes cluster array is shuffled each time before applied to marks in series. */
  /* In the case of RGB, for instance, this means each corner will potentially have */
  /* a different palette each time, depending on cluster definition. */
  this.shuffleSettingCluster;
  
  /* Is used from CanvasGrid to save the (last) shuffled order of a mark series */
  /* The shuffle method in this class accepts any array as argument, so it's no */
  /* guarantee that the array saved under this var is the series of mark objects! */
  this.lastShuffle;

};

MarkSeries.DEFAULT_SHUFFLESETTING = Boolean(true);
MarkSeries.DEFAULT_SHUFFLESETTINGCLUSTER = Boolean(true);

/*MarkSeries.prototype.getRenderer = function()
{
  return this.renderer;
};*/

MarkSeries.prototype.addRenderer = function(renderer)
{
  if (!(renderer instanceof Renderer))
  {
    throw new CollageException('MarkSeries.setRenderer: Renderer argument is not a valid Renderer object.');
  }
  
  for (var x = 0; x < this.marks.length; x++)
  {
    this.marks[x].setRenderer(renderer);
  }
};

MarkSeries.prototype.addMark = function(m, howMany)
{
  if (!(m instanceof Mark))
  {
    throw new CollageException('Cannot add non-Mark object to series.');
  }
  if (typeof(howMany) == 'undefined' || howMany.constructor != Number || howMany < 1)
  {
    var howMany = 1;
  }
  
  if (typeof(this.marks) == 'undefined')
  {
    this.marks = [];
  }

  if (howMany == 1)
  {
    this.marks.push(m);
  }
  else
  {
    for(var j = 0; j < howMany; j++)
    {
      this.marks.push(m);
    }
  }
};

/* Jonas Raoni Soares Silva */
/* http://jsfromhell.com/array/shuffle [v1.0] */
MarkSeries.prototype.shuffle = function(o)
{
  for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  this.lastShuffle = o;
  return o;
};

MarkSeries.prototype.getMarks = function()
{
  return this.marks;
};

MarkSeries.prototype.getShuffle = function()
{
  if (typeof(this.shuffleSetting) == 'undefined')
  {
    this.setShuffle()
  }
  return this.shuffleSetting;
};

MarkSeries.prototype.setShuffle = function(shuffleSetting)
{
  if (typeof(shuffleSetting) != 'undefined' && shuffleSetting.constructor == Boolean)
  {
    CSGlobal.csDebug(2, "Setting marks series shuffle to " + shuffleSetting);
    this.shuffleSetting = shuffleSetting;
  }
  else
  {
    CSGlobal.csDebug(2, "Setting marks series shuffle to default " + MarkSeries.DEFAULT_SHUFFLESETTING);
    this.shuffleSetting = MarkSeries.DEFAULT_SHUFFLESETTING;
  }
};

MarkSeries.prototype.getShuffleCluster = function()
{
  if (typeof(this.shuffleSettingCluster) == 'undefined')
  {
    this.setShuffleCluster()
  }
  return this.shuffleSettingCluster;
};

MarkSeries.prototype.setShuffleCluster = function(shuffleSettingCluster)
{
  if (typeof(shuffleSettingCluster) != 'undefined' && shuffleSettingCluster.constructor == Boolean)
  {
    CSGlobal.csDebug(2, "Setting palette cluster shuffle to " + shuffleSettingCluster);
    this.shuffleSettingCluster = shuffleSettingCluster;
  }
  else
  {
    CSGlobal.csDebug(2, "Setting palette cluster shuffle to default " + MarkSeries.DEFAULT_SHUFFLESETTINGCLUSTER);
    this.shuffleSettingCluster = MarkSeries.DEFAULT_SHUFFLESETTINGCLUSTER;
  }
};

MarkSeries.prototype.setPalette = function(palettePath)
{
  var marks = this.getMarks();
  for (var x = 0; x < this.marks.length; x++)
  {
    marks[x].setPalette(palettePath);
  }
};

MarkSeries.prototype.addPalette = function(palettePath)
{
  var marks = this.getMarks();
  for (var x = 0; x < this.marks.length; x++)
  {
    marks[x].addPalette(palettePath);
  }
};

MarkSeries.prototype.paletteClusterIsset = function()
{
  if (typeof(this.paletteCluster) != 'undefined' && this.getPaletteCluster().constructor == Array && this.getPaletteCluster().length > 0)
  {
    return true;
  }
  else
  {
    return false;
  }
};

MarkSeries.prototype.getPaletteCluster = function()
{
  return this.paletteCluster;
};

MarkSeries.prototype.setPaletteCluster = function(paletteCluster)
{
  if (paletteCluster.constructor !== Array)
  {
    throw new CollageException("An array of palette paths was not provided to setPaletteCluster.");
  }
  this.paletteCluster = paletteCluster;
};

MarkSeries.prototype.shufflePaletteCluster = function()
{
  var cluster = this.getPaletteCluster();
  cluster = this.shuffle(cluster);
  this.setPaletteCluster(cluster);
};

MarkSeries.prototype.applyPaletteCluster = function()
{
  if (this.paletteCluster.constructor !== Array)
  {
    throw new CollageException("There is no palette cluster set.");
  }

  var marks = this.getMarks();
  if (this.paletteCluster.length !== this.marks.length)
  {
    throw new CollageException("Palette cluster length is not the same as marks series length.");
  }
  
  for (var x = 0; x < this.marks.length; x++)
  {
    if (this.paletteCluster[x].constructor == Array)
    {
      for (y = 0; y < this.paletteCluster[x].length; y++)
      {
        marks[x].addPalette(this.paletteCluster[x][y]);
      }
    }
    else
    {
      marks[x].setPalette(this.paletteCluster[x]);
    }
  }
};
