function Mark()
{
  this.name = this.constructor.name;
  this.renderer;
  this.currentPalette;
  this.palettes;
  this.fragment;
  this.fragmentProperties = {};
    
  /* If more then one palette provided, choose a new on (at random) each iteration (each quad) */
  this.paletteReset = Boolean(true);
};

Mark.DEFAULT_PALETTERESET = Boolean(true);

Mark.prototype.setPaletteReset = function(paletteReset)
{
  if (typeof(paletteReset) != 'undefined' && paletteReset.constructor == Boolean)
  {
    CSGlobal.csDebug(1, "Setting palette reset to " + paletteReset);
    this.paletteReset = paletteReset;
  }
  else
  {
    CSGlobal.csDebug(1, "Setting palette reset to default " + Mark.DEFAULT_PALETTERESET);
    this.paletteReset = Mark.DEFAULT_PALETTERESET;
  }
};

Mark.prototype.getRenderer = function()
{
  return this.renderer;
};

Mark.prototype.setRenderer = function(renderer)
{
  if (!(renderer instanceof Renderer))
  {
    throw new CollageException('Mark.setRenderer: Renderer argument is not a valid Renderer object.');
  }
  this.renderer = renderer;
};

Mark.prototype.getFragment = function()
{
  return this.fragment;
};

Mark.prototype.setFragment = function(fragment)
{
  if (typeof(fragment) != 'undefined' && fragment.constructor == Fragment)
  {
    this.fragment = fragment;
  }
  else
  {
    throw new CollageException("A Fragment object was not provided as argument.");
  }
};

Mark.prototype.getCurrentPalette = function()
{
  if (typeof(this.currentPalette) == 'undefined')
  {
    this.setCurrentPalette(this.getARandomPalette());
  }
  return this.currentPalette;
};

Mark.prototype.setCurrentPalette = function(palette)
{
  if (palette instanceof Palette)
  {
    CSGlobal.csDebug(2,"Setting palette: " + palette.getPalettePath().basename());
    this.currentPalette = palette;
  }
  else
  {
    throw new CollageException("Cannot set current palette. Palette argument is not a Palette object. Stopping.");
  }
};

Mark.prototype.clearPalette = function()
{
  this.currentPalette = undefined;
};

Mark.prototype.getARandomPalette = function()
{
  if (typeof(this.palettes) != 'undefined' && this.getPalettes().constructor == Array && this.getPalettes().length > 0)
  {
    var p = this.getPalettes();
    var x = Math.floor(Math.random() * p.length);
    CSGlobal.csDebug(1,"Random palette for mark type " + this.constructor.name + ": " + p[x].getPalettePath().basename());
    return p[x];
  }
  else
  {
    throw new CollageException("No current palette set and no palettes to be found!");
  }
};

Mark.prototype.getCurrentPalettePath = function()
{
  return this.currentPalette.getPalettePath();
};

Mark.prototype.setPalette = function(paletteObj)
{
  if (!(this.getRenderer() instanceof Renderer))
  {
    throw new CollageException('You need to provide a renderer for the Mark object before proceeding.');
  }

  if (!(paletteObj instanceof Palette))
  {
    throw new CollageException('Palette argument is not a valid Palette object.');
  }
  
  /* Pass Renderer from Mark into Palette object */
  paletteObj.setRenderer(this.getRenderer());

  /* Set palette sets palette array to empty. Use addPalette to add more palettes. */
  this.palettes = [];
  
  try
  {
    CSGlobal.csDebug(1, "Setting palette " + paletteObj.getPalettePath() + " for " + this.constructor.name);
    this.palettes.push(paletteObj);
  }
  catch (e)
  {
    throw new CollageException(e.message);
  }
};

Mark.prototype.addPalette = function(paletteObj)
{
  if (!(this.getRenderer() instanceof Renderer))
  {
    throw new CollageException('You need to provide a renderer for the Mark object before proceeding.');
  }

  if (!(paletteObj instanceof Palette))
  {
    throw new CollageException('Palette argument is not a valid Palette object.');
  }

  /* Pass Renderer from Mark into Palette object */
  paletteObj.setRenderer(this.getRenderer());

  if (typeof(this.palettes) == 'undefined' || this.palettes.length == 0)
  {
    this.setPalette(paletteObj);
  }
  else
  {
    try
    {
      CSGlobal.csDebug(1, "Adding palette " + paletteObj.getPalettePath() + " to " + this.constructor.name);
      this.palettes.push(paletteObj);
    }
    catch (e)
    {
      throw new CollageException(e.message);
    }
  }
};

Mark.prototype.getPalettes = function()
{
  return this.palettes;
};

Mark.prototype.getSwatches = function()
{
  return this.getCurrentPalette().getSwatches();
};

Mark.prototype.getFirstSwatch = function()
{
  return this.getCurrentPalette().getFirstSwatch();
};

Mark.prototype.setFirstSwatch = function(firstSwatch)
{
  /* There is no code here to check that this file actually exists! */
  this.getCurrentPalette().firstSwatch = firstSwatch;
};

Mark.prototype.getFragmentRandom = function(quad)
{
  this.setFragment(this.getCurrentPalette().getFragmentRandom(this, quad));
  CSGlobal.csDebug(2,"Mark, get random fragment: " + this.getFragment().getDocumentName());
  return this.getFragment();
};

Mark.prototype.setFragmentByName = function(filename)
{ 
  this.setFragment(this.getCurrentPalette().getFragmentByName(filename));
  CSGlobal.csDebug(2,"Mark, get fragment by name: " + filename + " : " + this.getFragment().getDocumentName());
  /* Don't think this is necessary since all info about the Fragment should be in this.fragment */
  /* which is the object, which has the key, the document, etc. */
  /* this.setFragmentKey(key); */
  return this.getFragment();
};

Mark.prototype.setFragmentByKey = function(key)
{ 
  this.setFragment(this.getCurrentPalette().getFragmentByKey(key));
  CSGlobal.csDebug(2,"Mark, get fragment by key: " + key + " : " + this.getFragment().getDocumentName());
  /* Don't think this is necessary since all info about the Fragment should be in this.fragment */
  /* which is the object, which has the key, the document, etc. */
  /* this.setFragmentKey(key); */
  return this.getFragment();
};

Mark.prototype.rotate = function(angle, canvasCoord)
{
  CSGlobal.csDebug(2, "Rotate mark " + this.getFragment().getLayerName() + " " + angle.toFixed(8));
  this.getRenderer().rotate(this.getFragment(), angle.toFixed(8));
  /* this.getFragment().getFragmentLayer().rotate(angle.toFixed(8)); */
  this.getFragment().setKeyword('CSLastFragmentRotation', angle.toFixed(8));
  CSGlobal.csDebug(2, "Last rotation keyword set: " + this.getFragment().getProperty('CSLastFragmentRotation'));
  /* this.getFragment().writeKeywords(); */

  CSGlobal.notifyListener("MarkRotate", this);
};
    
Mark.prototype.getNewCoordinate = function(angle)
{
  var g = new Geometry();
  var coordinate = new Coordinate(this.getFragment().getProperty('cx'), this.getFragment().getProperty('cy'));
  var r = g.getPolarR(coordinate);
  var a = new Number(this.getFragment().getProperty('a'));
  if (typeof(angle) != 'undefined' && angle.constructor == Number)
  {
    a = angle + a;
  }
  var theta = g.getPolarTheta(coordinate);
  var theta2 = new Number((theta - a));
  var newCoord = g.getCartesian(r, theta2);
  return newCoord;
};

/* This seems to kinda work but fragment must..... */
Mark.prototype.getCanvasCoordinate = function(coord)
{
  if (!(coord instanceof Coordinate))
  {
    throw new CollageException('Coordinate provided is not a Coordinate object.');
  }
  var canvasX = (this.getCenterCoordinateCanvas().getX() + coord.getX());
  var canvasY = (this.getCenterCoordinateCanvas().getY() - coord.getY());
  return new Coordinate(new Number(canvasX), new Number(canvasY));
};

/* This seems to kinda work but fragment must..... */
Mark.prototype.getCanvasNewCoordinate = function(coord)
{
  if (!(coord instanceof Coordinate))
  {
    throw new CollageException('Coordinate provided is not a Coordinate object.');
  }
  var canvasX = (this.getCenterCoordinateCanvas().getX() + coord.getX());
  var canvasY = (this.getCenterCoordinateCanvas().getY() - coord.getY());
  return new Coordinate(new Number(canvasX), new Number(canvasY));
};

/* Not real sure what I was tryign to accomplish here just yet */
/*Mark.prototype.subtractNewCoordinate = function()
{
  var newCoord = this.getNewCoordinate();
  CSGlobal.csDebug(2, "Subtracting newCoord from " + this.getFragment().getLayerName() + ": " + newCoord.getX() + ", " + newCoord.getY());
  return CSGlobal.getCanvas().translate(this, newCoord.getX(), -newCoord.getY());
};*/

/* Gets center coordinate of mark fragment in the context of the its own bounding box */
Mark.prototype.getCenterCoordinate = function()
{
  this.getFragment().loadBounds();
  var g = new Geometry();
  return g.getCenterCoordinateRectangle(new Coordinate(new Number(0), new Number(0)), new Coordinate(this.getFragment().getProperty('width'), this.getFragment().getProperty('height')));
};

/* Gets center coordinate of mark fragment in the context of entire canvas */
Mark.prototype.getCenterCoordinateCanvas = function()
{
  this.getFragment().loadBounds();
  var g = new Geometry();
  return g.getCenterCoordinateRectangle(this.getFragment().getProperty('top'), this.getFragment().getProperty('bottom'));
};

Mark.prototype.getPaletteBlacklist = function()
{
  if (!(this.palette instanceof Palette))
  {
    throw new CollageException("Cannot get blacklist. No palette has been set for this mark.");
  }
  else
  {
    return this.palette.getBlacklist();
  }
};

Mark.prototype.setPaletteBlacklist = function(blacklist)
{
  if (!(this.palette instanceof Palette))
  {
    throw new CollageException("Cannot set blacklist. No palette has been set for this mark.");
  }
  if (blacklist.constructor instanceof Array)
  {
    this.palette.setBlacklist(blacklist);
  }
  else
  {
    this.palette.setBlacklist([]);
  }
};
