function PaletteListRGB(palettePath)
{
  Palette.call(this);
  this.palettePath = palettePath;
};

PaletteListRGB.prototype = new Palette();
PaletteListRGB.prototype.constructor = PaletteListRGB;

PaletteListRGB.prototype.loadSwatches = function()
{
  throw new CollageException("Swatches for rgb color list " + this.palettePath + " should already be set when Palette instance is created.");
};

PaletteListRGB.prototype.setSwatches = function(swatches)
{
  if (typeof(swatches) == 'undefined' || !(swatches instanceof Array) || swatches.length < 1)
  {
    throw new CollageException('Swatches argument is not an array or is empty. Stopping.');
  }
  this.swatches = swatches;
};

PaletteListRGB.prototype.getFragmentRandom = function(m, quad)
{
  var f = new Fragment(this.getRenderer());
  var swatches = this.getSwatches();
  f.setKey(Math.floor(Math.random() * swatches.length));
  f.setFragmentDocument((swatches[f.getKey()].id), this.getRenderer());
  /* Send fragment on through to, because Mark is enough because Fragment is not set in Mark yet! Hmmm. */
  var asset = this.getRenderer().getAsset(f);
  f.setFragmentLayer(asset, this.getRenderer());
  f.setFragmentName(m, quad);
  /* f.loadBounds(rendererObj.getAssetBounds(asset)); */
  return f;
};

PaletteListRGB.prototype.getFragmentByKey = function(swatchkey)
{
  CSGlobal.csDebug(2,"Getting fragment by swatch key: " + swatchkey);
  var f = new Fragment(this.getRenderer());
  f.setKey(swatchkey);
  return f;
};

PaletteListRGB.prototype.getFragmentByName = function(swatchname)
{
  CSGlobal.csDebug(2,"Getting fragment by swatch name: " + swatchname);
  var f = new Fragment(this.getRenderer());
  var swatches = this.getSwatches();
  for(i = 0; i < swatches.length; i++)
  {
    if (swatches[i].name == swatchname)
    {
      f.setKey(i);
      return f;
    }
  }
  return false;
};

PaletteListRGB.prototype.getFiles = function()
{
  return this.swatches;
};
