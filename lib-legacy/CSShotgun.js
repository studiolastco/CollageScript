function CSShotgun()
{
  // This is not referencing necessarily a quad coordinate like in CanvasGrid objects.
  // It's the upper left coordinate location of the entry impact area.
  this.entryCoord;
  
  // Array of art layers. Each contains a drawn bounding shape which defines a single shot spread
  // First or key 0, is the size of shotSize, the entry coord, enz.
  this.boundaries;
  
  // Initial size. "Shot" is square, hence one measurement for width x height
  this.shotSize;
  
  // Number of concentric areas to be drawn beyond shotSize
  this.shotSpread;
  
  // The multiplication factor used to determine distance between "concentric" spread areas
  this.shotSpreadfactor;
  
  // Shot head on, or at angle. Almost like a clock, but then with 8 hours ;) Oops and 1 is 12!
  this.shotAngle;
  
  // How powerful is the shot. Given as maximum number of fragments that can be removed at the entry coordinate.
  this.shotStrength;
  
  // Sets defaults
  this.init();
};

// DEFAULTS
CSShotgun.DEFAULT_SHOTSPREAD = new Number(3); //includes shot
CSShotgun.DEFAULT_SHOTSPREADFACTOR = new Number(1);
CSShotgun.DEFAULT_SHOTANGLE = new Number(0);
CSShotgun.DEFAULT_SHOTSTRENGTH = new Number(4);

CSShotgun.BOUNDARYLAYER_PRFEFIX = new String("boundary-");

CSShotgun.prototype.init = function()
{
  CSShotgun.DEFAULT_SHOTSIZE = UnitValue(1, CSGlobal.getData('applicationUnitsString'));
  this.setShotSize();
  this.setShotSpread();
  this.setShotSpreadfactor();
  this.setShotAngle();
  this.setShotStrength();
};

CSShotgun.prototype.bang = function(entryCoord)
{
  this.drawBoundaries();
  this.gatherStats();
  
  for (b = 0; b < this.getShotSpread(); b++)
  {
    CSGlobal.csDebug(2, "BANG: spread " + b);
    this.removeFragments(this.boundaries[b], b);
  }
  
  this.removeBoundaries();
};

CSShotgun.prototype.gatherStats = function()
{
  var fname = this.getCanvas().getCanvasRoot() + "/stats/stats-" + this.getCanvas().getCanvas().name + ".txt";
  var fStats = new File(fname);
  
  if (fStats.open('r'))
  {
    CSGlobal.csDebug(2, "Opening statistics file " + fname + " for reading.");
    this.stats = JSON.parse(fStats.read());
  }
  else
  {
    CSGlobal.csDebug(2, "Creating statistics file " + fname + " for writing.");
    this.stats = [];
    for (x = 0; x < this.getCanvas().getCanvas().artLayers.length; x++)
    {
      CSGlobal.csDebug(2, "Getting stats for art layer " + x + " of " + this.getCanvas().getCanvas().artLayers.length);
      var f = Fragment.prototype.factory.call(this, this.getCanvas().getCanvas(), x);
      this.stats[x] = {};
      this.stats[x].centerx = new String(f.getProperty('center').getX());
      this.stats[x].centery = new String(f.getProperty('center').getY());
      this.stats[x].width = new String(f.getProperty('width'));
      this.stats[x].height = new String(f.getProperty('height'));
      this.stats[x].background = f.isBackground();
    }
    fStats.open('w');
    fStats.write(JSON.stringify(this.stats));
    fStats.close();
  }
};

CSShotgun.prototype.getBoundaries = function()
{
  if (typeof(this.boundaries) == 'undefined')
  {
    this.setBoundaries();
  }
  return this.boundaries;
}

CSShotgun.prototype.setBoundaries = function()
{
  if (typeof(this.boundaries) == 'undefined')
    this.boundaries = [];

  // loop through shot spreads
  for (b = 0; b < this.getShotSpread(); b++)
  {
    var factor = b*this.getShotSpreadfactor();

    var rect = new CSRectangle();
    rect.setWidth(this.getShotSize() + (this.getShotSize()*factor));
    rect.setHeight(this.getShotSize() + (this.getShotSize()*factor));
    // Make all spread "concentric" to begin with, they share center coordinate
    var origin = new Coordinate((this.getEntryCoordinate().getX() - (rect.getWidth()/2)), (this.getEntryCoordinate().getY() - (rect.getHeight()/2)));
    
    switch(this.getShotAngle())
    {
      case 1:
      origin.adjustY(UnitValue((-rect.getHeight()/2), CSGlobal.getData('applicationUnitsString')));
      break;

      case 2:
      origin.adjustY(UnitValue((-rect.getHeight()/2), CSGlobal.getData('applicationUnitsString')));
      origin.adjustX(UnitValue((rect.getWidth()/2), CSGlobal.getData('applicationUnitsString')));
      break;

      case 3:
      origin.adjustX(UnitValue((rect.getWidth()/2), CSGlobal.getData('applicationUnitsString')));
      break;

      case 4:
      origin.adjustX(UnitValue((rect.getWidth()/2), CSGlobal.getData('applicationUnitsString')));
      origin.adjustY(UnitValue((rect.getHeight()/2), CSGlobal.getData('applicationUnitsString')));
      break;

      case 5:
      origin.adjustY(UnitValue((rect.getHeight()/2), CSGlobal.getData('applicationUnitsString')));
      break;

      case 6:
      origin.adjustY(UnitValue((rect.getHeight()/2), CSGlobal.getData('applicationUnitsString')));
      origin.adjustX(UnitValue((-rect.getWidth()/2), CSGlobal.getData('applicationUnitsString')));
      break;

      case 7:
      origin.adjustX(UnitValue((-rect.getWidth()/2), CSGlobal.getData('applicationUnitsString')));
      break;

      case 8:
      origin.adjustX(UnitValue((-rect.getWidth()/2), CSGlobal.getData('applicationUnitsString')));
      origin.adjustY(UnitValue((-rect.getHeight()/2), CSGlobal.getData('applicationUnitsString')));
      break;
      
      default:
      // Entry coordinate is actually center of all 'concentric' rectangles
      var origin = new Coordinate((this.getEntryCoordinate().getX() - (rect.getWidth()/2)), (this.getEntryCoordinate().getY() - (rect.getHeight()/2)));
      break;
    }
    
    rect.setOrigin(origin);

    this.boundaries.push(rect);
  }
}

CSShotgun.prototype.drawBoundaries = function()
{
  var bs = this.getBoundaries();
  for (b = 0; b < bs.length; b++)
  {
    var layerName = CSShotgun.BOUNDARYLAYER_PRFEFIX + new String(b);
    this.getCanvas().getCanvas().pathItems.add(layerName, [this.boundaries[b].getPath()]);
  }
}

CSShotgun.prototype.removeBoundaries = function()
{
  var bs = this.getBoundaries();
  for (b = 0; b < bs.length; b++)
  {
    var layerName = CSShotgun.BOUNDARYLAYER_PRFEFIX + new String(b);
    this.getCanvas().getCanvas().pathItems.getByName(layerName).remove();
  }
}

CSShotgun.prototype.removeFragments = function(b, factor)
{
  if (typeof(b) == 'undefined' || b.constructor != CSRectangle)
  {
    throw new CollageException("First argument must be a CSRectangle object");
  } 

  if (typeof(factor) == 'undefined' || factor.constructor != Number || factor < 0)
  {
    throw new CollageException("Factor should be a number >= 0");
  } 

  var canvasDocument = CSGlobal.getCanvas().getCanvas();
  var g = new Geometry();

  // Loop through all fragments (art layers) of the canvasDocument to see which ones overlap shot spread
  // Changed to loop through stats file, since this runs faster and sows shotgun results way quicker
  var overlaps = [];
  for (x = 0; x < this.stats.length; x++)
  {
    var centerCoord = new Coordinate(UnitValue(this.stats[x].centerx), UnitValue(this.stats[x].centery));
    if (!(this.stats[x].background) && g.overlaps(centerCoord, UnitValue(this.stats[x].width), UnitValue(this.stats[x].height), b.getCenterCoordinate(), b.getWidth(), b.getHeight()))
    {
      overlaps.push(x);
    }
  }
  
  CSGlobal.csDebug(2, "Number of overlaps: " + overlaps.length);

  var percentage = (100 - (factor*(100/this.getShotSpread())))/100;
  CSGlobal.csDebug(2, "Percentage: " + percentage + " factor: " + factor);
  
  var maxNoOfRemovals = Math.floor(overlaps.length*percentage);
  CSGlobal.csDebug(2, "Max. number of removals: " + maxNoOfRemovals);
  var minNoOfRemovals = ((this.getShotStrength() > maxNoOfRemovals) ? maxNoOfRemovals : this.getShotStrength());
  CSGlobal.csDebug(2, "Min. number of removals: " + minNoOfRemovals);
  var noOfRemovals = getRandomInt(minNoOfRemovals, maxNoOfRemovals);
  CSGlobal.csDebug(2, "Number of removals: " + noOfRemovals);
  
  overlaps = shuffleArray(overlaps);
  var onesToRemove = overlaps.slice(0, noOfRemovals);
  for (y = 0; y < onesToRemove.length; y++)
  {
    canvasDocument.artLayers[onesToRemove[y]].visible = Boolean(false);
  }
}

CSShotgun.prototype.heal = function()
{
  CSGlobal.csDebug(2, "Healing canvas...");
  var canvasDocument = CSGlobal.getCanvas().getCanvas();
  for (a = 0; a < canvasDocument.artLayers.length; a++)
  {
    canvasDocument.artLayers[a].visible = Boolean(true);
  }
};


CSShotgun.prototype.getShotSize = function()
{
  return this.shotSize;
};

CSShotgun.prototype.setShotSize = function(shotSize)
{
  if (typeof(shotSize) == 'undefined' || shotSize.constructor != UnitValue)
  {
    CSGlobal.csDebug(1,"Setting default shotSize: " + CSShotgun.DEFAULT_SHOTSIZE);
    this.shotSize = CSShotgun.DEFAULT_SHOTSIZE;
  }
  else
  {
    CSGlobal.csDebug(1,"Setting shotSize: " + shotSize);
    this.shotSize = shotSize;
  }
};

CSShotgun.prototype.getShotSpread = function()
{
  return this.shotSpread;
};

CSShotgun.prototype.setShotSpread = function(shotSpread)
{
  if (typeof(shotSpread) == 'undefined' || shotSpread.constructor != Number)
  {
    CSGlobal.csDebug(1,"Setting default shotSpread: " + CSShotgun.DEFAULT_SHOTSPREAD);
    this.shotSpread = CSShotgun.DEFAULT_SHOTSPREAD;
  }
  else
  {
    CSGlobal.csDebug(1,"Setting shotSpread: " + shotSpread);
    this.shotSpread = shotSpread;
  }
};

CSShotgun.prototype.getShotSpreadfactor = function()
{
  return this.shotSpreadfactor;
};

CSShotgun.prototype.setShotSpreadfactor = function(shotSpreadfactor)
{
  if (typeof(shotSpreadfactor) == 'undefined' || shotSpreadfactor.constructor != Number)
  {
    CSGlobal.csDebug(1,"Setting default shotSpreadfactor: " + CSShotgun.DEFAULT_SHOTSPREADFACTOR);
    this.shotSpreadfactor = CSShotgun.DEFAULT_SHOTSPREADFACTOR;
  }
  else
  {
    CSGlobal.csDebug(1,"Setting shotSpreadfactor: " + shotSpreadfactor);
    this.shotSpreadfactor = shotSpreadfactor;
  }
};

CSShotgun.prototype.getShotAngle = function()
{
  return this.shotAngle;
};

CSShotgun.prototype.setShotAngle = function(shotAngle)
{
  if (typeof(shotAngle) == 'undefined' || shotAngle.constructor != Number || shotAngle < 0 || shotAngle > 8)
  {
    CSGlobal.csDebug(1,"Setting default shotAngle: " + CSShotgun.DEFAULT_SHOTANGLE);
    this.shotAngle = CSShotgun.DEFAULT_SHOTANGLE;
  }
  else
  {
    CSGlobal.csDebug(1,"Setting shotAngle: " + shotAngle);
    this.shotAngle = shotAngle;
  }
};

CSShotgun.prototype.getShotStrength = function()
{
  return this.shotStrength;
};

CSShotgun.prototype.setShotStrength = function(shotStrength)
{
  if (typeof(shotStrength) == 'undefined' || shotStrength.constructor != Number)
  {
    CSGlobal.csDebug(1,"Setting default shotStrength: " + CSShotgun.DEFAULT_SHOTSTRENGTH);
    this.shotStrength = CSShotgun.DEFAULT_SHOTSTRENGTH;
  }
  else
  {
    CSGlobal.csDebug(1,"Setting shotStrength: " + shotStrength);
    this.shotStrength = shotStrength;
  }
};

CSShotgun.prototype.getCanvas = function(entryCoord)
{
  return CSGlobal.getCanvas();
}

CSShotgun.prototype.getEntryCoordinate = function()
{
  if (typeof(this.entryCoord) == 'undefined')
  {
    this.setEntryCoordinate();
  }
  return this.entryCoord;
};

CSShotgun.prototype.setEntryCoordinate = function(entryCoord)
{
  if (entryCoord instanceof Coordinate)
  {
    CSGlobal.csDebug(2, "Setting entry coordinate: (" + entryCoord.getX() + ", " + entryCoord.getY() + ")");
    this.entryCoord = entryCoord;
  }
  else
  {
    if (typeof(entryCoord) == 'undefined')
    {
      this.entryCoord = this.setEntryCoordinateRandom();
      CSGlobal.csDebug(2, "Set random entry coordinate: (" + this.getEntryCoordinate.getX() + ", " + this.getEntryCoordinate.getY() + ")");
    }
    else
    {
      throw new CollageException("Entry coordinate provided is not a Coordinate object."); 
    }
  }
};

CSShotgun.prototype.setEntryCoordinateRandom = function(entryCoord)
{
  var w = this.getCanvas().getWidth().value;
  var h = this.getCanvas().getHeight().value;
  var x = Math.floor(Math.random() * (w - 0)) + 0;
  var y = Math.floor(Math.random() * (h - 0)) + 0;
  return new Coordinate(new Number(x), new Number(y));
};
