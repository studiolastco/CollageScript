function Palette()
{
  this.renderer;
  
  this.palettePath;
  this.paletteReference;
  this.blacklist = [];
  
  this.paletteName;
  this.swatches;
  this.firstSwatch;
};

Palette.prototype.getRenderer = function()
{
  return this.renderer;
};

Palette.prototype.setRenderer = function(renderer)
{
  if (!(renderer instanceof Renderer))
  {
    throw new CollageException('Palette.setRenderer: Renderer argument is not a valid Renderer object.');
  }
  this.renderer = renderer;
};

Palette.prototype.getPaletteName = function()
{
  if (typeof(this.paletteName) == 'undefined' || this.paletteName.constructor != String)
  {
    return this.constructor.name;
  }
  else
  {
    return this.paletteName;
  }
}

Palette.prototype.setPaletteName = function(paletteName)
{
  this.paletteName = paletteName;
}

Palette.prototype.getSwatches = function()
{
  if (typeof(this.swatches) == 'undefined')
  {
    this.loadSwatches();
  }
  return this.swatches;
};

Palette.prototype.setSwatches = function()
{
  throw new CollageException("Set swatches is not implemented.");
};

Palette.prototype.getFirstSwatch = function()
{
  if (typeof(this.firstSwatch) == 'undefined')
  {
    return false;
  }
  else
  {
    return this.firstSwatch;
  }
};

Palette.prototype.setFirstSwatch = function(firstSwatch)
{
  /* There is no code here to check that this file actually exists! */
  this.firstSwatch = firstSwatch;
};

Palette.prototype.getPalettePath = function()
{
  return this.palettePath;
};

Palette.prototype.getBlacklist = function()
{
  return this.blacklist;
};

Palette.prototype.setBlacklist = function(blacklist)
{
  if (blacklist.constructor instanceof Array)
  {
    this.blacklist = blacklist;
  }
  else
  {
    this.blacklist = [];
  }
};

Palette.prototype.setRandomPalette = function(palettePath)
{
  var testing = File(palettePath);
  if (testing instanceof Folder)
  {
    CSGlobal.csDebug(2,'Palette parent path:' + palettePath);
    var parentPalette = new Folder(palettePath);
    var entries = parentPalette.getFiles();
    var palettes = [];
    for (var x = 0; x < entries.length; x++)
    {
      testing = File(entries[x]);
      if (testing instanceof Folder)
      {
        var tmp = new String(entries[x]);
        var blacklisted = this.blacklist.inArray(tmp.basename());
        if (!blacklisted)
        {
          palettes.push(entries[x]);
          CSGlobal.csDebug(2,tmp.basename() + " added to palette listing.");
        }
      }
    }
    
    if (palettes.length > 0)
    {
      var randomPaletteKey = Math.floor(Math.random() * palettes.length);
      var randomPalette = palettes.splice(randomPaletteKey, 1);
      CSGlobal.csDebug(2,randomPalette[0] + " chosen at random.");
      CSGlobal.csDebug(2, "Getting random palette " + randomPalette[0]);
      return this.factory(randomPalette[0]);
    }
    else
    {
      throw new CollageException("No palettes found in palette parent folder " + palettePath);
    }
  }
  else
  {
    throw new CollageException("Palette path is not a parent palette folder.");
  }
};
