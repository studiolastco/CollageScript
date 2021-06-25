/*
A Palette file appears to be Ps file with many layers on which are fragments or swatches.
Is this really used? Don't think so.
*/

function PaletteFile(palettePath)
{
  Palette.call(this);
  this.palettePath = palettePath;
  this.paletteFile = new File(palettePath);
};

PaletteFile.prototype = new Palette();
PaletteFile.prototype.constructor = PaletteFile;

PaletteFile.prototype.setPaletteReference = function()
{
  if (this.paletteFile.exists)
  {
    this.paletteReference = app.open(this.paletteFile);
  }
  else
  {
    throw new CollageException("Palette " + this.palettePath + " does not exist.");
  }
}

PaletteFile.prototype.getFragmentRandom = function(m, quad)
{
  var f = new Fragment(this.getRenderer());
  f.setKey(Math.floor(Math.random() * this.paletteReference.artLayers.length));
  f.setFragmentLayer(this.paletteReference.artLayers[f.getKey()]);
  f.setFragmentDocument(this.paletteReference, this.getRenderer());
  f.setFragmentName(m, quad);
  // Property source is layer name in photoshop, a string.
  f.loadProperties(f.fragment.name.split(';'));
  f.loadBounds();
  return f;
};
