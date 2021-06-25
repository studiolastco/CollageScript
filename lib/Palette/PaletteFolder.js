function PaletteFolder(palettePath)
{
  Palette.call(this);
  this.fileSuffix = 'psd';
  this.palettePath = palettePath;
  this.paletteFile = new Folder(palettePath);
  this.setPaletteReference();
};

PaletteFolder.prototype = new Palette();
PaletteFolder.prototype.constructor = PaletteFolder;

PaletteFolder.prototype.getFileSuffix = function()
{
  return this.fileSuffix;
};

PaletteFolder.prototype.setFileSuffix = function(fileSuffix)
{
  this.fileSuffix = fileSuffix;
};

PaletteFolder.prototype.loadSwatches = function()
{
  if (this.getFirstSwatch() === false)
  {
    return this.loadSwatchesNormal();
  }
  else
  {
    return this.loadSwatchesFirstSwatch();
  }
};

PaletteFolder.prototype.loadSwatchesNormal = function()
{
  try
  {
    CSGlobal.csDebug(2, "Loading swatches with file suffix " + this.fileSuffix + " in normal order from palette " + this.paletteFile);
    this.swatches = this.paletteFile.getFiles('*.'+this.fileSuffix);
  }
  catch (e)
  {
    throw new CollageException("Unable to load swatches. " + e.message);
  }
};

PaletteFolder.prototype.loadSwatchesFirstSwatch = function()
{
  try
  {
    CSGlobal.csDebug(2, "Loading swatches with file suffix " + this.fileSuffix + " starting with " + this.getFirstSwatch() + " from " + this.paletteFile + " palette.");
    var swatches = this.paletteFile.getFiles('*.'+this.fileSuffix);
    for (k = 0; k < swatches.length; k++)
    {
      if (swatches[k].name == this.getFirstSwatch())
      {
        var tmp = swatches.splice(k);
        this.swatches = tmp.concat(swatches);
      }
    }
  }
  catch (e)
  {
    throw new CollageException("Unable to load swatches using first swatch. " + e.message);
  }
};

/* Jonas Raoni Soares Silva */
/* http://jsfromhell.com/array/shuffle [v1.0] */
PaletteFolder.prototype.shuffleSwatches = function()
{
  for(var j, x, i = this.swatches.length; i; j = parseInt(Math.random() * i), x = this.swatches[--i], this.swatches[i] = this.swatches[j], this.swatches[j] = x);
  return this.swatches;
};

PaletteFolder.prototype.setPaletteReference = function()
{
  if (this.paletteFile.exists)
  {
    this.paletteReference = this.paletteFile;
  }
  else
  {
    throw new CollageException("Palette " + this.palettePath + " does not exist.");
  }
};

PaletteFolder.prototype.getFragmentRandom = function(m, quad)
{
  CSGlobal.csDebug(2,"Getting random fragment.");
  var f = new Fragment(this.getRenderer());
  var swatches = this.getSwatches();
  f.setKey(Math.floor(Math.random() * swatches.length));
  f.setFragmentDocument(app.open(swatches[f.getKey()]), this.getRenderer());
  f.setFragmentLayer(f.getFragmentDocument().artLayers[0]);
  f.setFragmentName(m, quad);
  f.loadBounds();
  return f;
};

PaletteFolder.prototype.getFragmentByKey = function(swatchkey)
{
  CSGlobal.csDebug(2,"Getting fragment by swatch key: " + swatchkey);
  var f = new Fragment(this.getRenderer());
  var swatches = this.getSwatches();
  f.setKey(swatchkey);
  f.setFragmentDocument(app.open(File(swatches[f.getKey()])), this.getRenderer());
  f.setFragmentLayer(f.getFragmentDocument().artLayers[0]);
  f.loadBounds();
  return f;
};

PaletteFolder.prototype.getFragmentByName = function(swatchname)
{
  CSGlobal.csDebug(2,"Getting fragment by swatch name: " + swatchname);
  var f = new Fragment(this.getRenderer());
  var swatches = this.getSwatches();
  for(i = 0; i < swatches.length; i++)
  {
    if (swatches[i].name == swatchname)
    {
      f.setKey(i);
      f.setFragmentDocument(app.open(File(swatches[f.getKey()])), this.getRenderer());
      f.setFragmentLayer(f.getFragmentDocument().artLayers[0]);
      f.loadBounds();
      return f;
    }
  }
  return false;
};

PaletteFolder.prototype.getFiles = function()
{
  return this.swatches;
};
