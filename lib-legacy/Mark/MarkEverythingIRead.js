function MarkEverythingIRead()
{
  Mark.call(this);
  this.doRotate = false;
};

//MarkEverythingIRead.inherit(Mark);
MarkEverythingIRead.prototype = new Mark();
MarkEverythingIRead.prototype.constructor = MarkEverythingIRead;

MarkEverythingIRead.prototype.doRules = function(canvas, coordinate)
{
  canvas.toCoordinate(this, coordinate);
  if (!(!this.doRotate))
  {
    var tmp = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
    var a = new Number(tmp*90);
    this.fragment.fragment.rotate(a.toFixed(8));
  }
};

MarkEverythingIRead.prototype.setPalette = function(palettePath)
{
  try
  {
    this.palette = new PaletteFolderEverythingIRead(palettePath);
    this.palette.setPaletteReference();
  }
  catch (e)
  {
    throw new CollageException(e.message);
  }
};

MarkEverythingIRead.prototype.getDoRotate = function()
{
  return this.doRotate;
}

MarkEverythingIRead.prototype.setDoRotate = function(doRotate)
{
  if (doRotate.constructor == Boolean)
  {
    this.doRotate = doRotate;
  }
  else
  {
    this.doRotate = new Boolean(false);
  }
}
