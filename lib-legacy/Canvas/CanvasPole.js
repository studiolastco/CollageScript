function CanvasPole()
{
  Canvas.call(this);
  
  this.beginY;
  this.intervalY;
  
  this.guideLeft; // these are the two axis on which the swatches are arranged vertically
  this.guideRight;
};

//CanvasPole.inherit(Canvas);
CanvasPole.prototype = new Canvas();
CanvasPole.prototype.constructor = CanvasPole;

CanvasPole.DEFAULT_BEGINY = 10;
CanvasPole.DEFAULT_INTERVALY = 10;

CanvasPole.prototype.initCanvas = function()
{
  Canvas.prototype.initCanvas.call(this);
}

CanvasPole.prototype.getGuideLeft = function()
{
  return this.guideLeft;
}

CanvasPole.prototype.setGuideLeft = function(guideLeft)
{
  if (guideLeft.constructor == Number && guideLeft > 0)
  {
    CSGlobal.csDebug(1,"CanvasPole setting guide left: " + guideLeft);
    this.guideLeft = guideLeft;
  }
  else
  {
    CSGlobal.csDebug(1,"CanvasPole setting guide left to 1.");
    this.guideLeft = 1;
  }
  this.addGuideVertical(guideLeft);
}

CanvasPole.prototype.getGuideRight = function()
{
  return this.guideRight;
}

CanvasPole.prototype.setGuideRight = function(guideRight)
{
  if (guideRight.constructor == Number && guideRight > 0)
  {
    CSGlobal.csDebug(1,"CanvasPole setting guide right: " + guideRight);
    this.guideRight = guideRight;
  }
  else
  {
    CSGlobal.csDebug(1,"CanvasPole setting guide right to 2.");
    this.guideRight = 2;
  }
  this.addGuideVertical(guideRight);
}

CanvasPole.prototype.getBeginY = function()
{
  if (typeof(this.beginY) == 'undefined' || this.beginY.constructor != Number)
  {
    CSGlobal.csDebug(1,"BeginY is not set. Setting default beginY: " + CanvasPole.DEFAULT_BEGINY);
    this.setBeginY(CanvasPole.DEFAULT_BEGINY);
  }
  return this.beginY;
};

CanvasPole.prototype.setBeginY = function (beginY)
{
  if (beginY.constructor == Number)
  {
    this.beginY = beginY;    
  }
  else
  {
    CSGlobal.csDebug(1,"Setting default beginY: " + CanvasPole.DEFAULT_BEGINY);
    this.beginY = CanvasPole.DEFAULT_BEGINY;
  }
};

CanvasPole.prototype.getIntervalY = function()
{
  if (typeof(this.intervalY) == 'undefined' || this.intervalY.constructor != Number)
  {
    CSGlobal.csDebug(1,"intervalY is not set. Setting default intervalY: " + CanvasPole.DEFAULT_INTERVALY);
    this.setIntervalY(CanvasPole.DEFAULT_INTERVALY);
  }
  return this.intervalY;
};

CanvasPole.prototype.setIntervalY = function (intervalY)
{
  if (intervalY.constructor == Number)
  {
    this.intervalY = intervalY;    
  }
  else
  {
    CSGlobal.csDebug(1,"Setting default intervalY: " + CanvasPole.DEFAULT_INTERVALY);
    this.intervalY = CanvasPole.DEFAULT_INTERVALY;
  }
};

CanvasPole.prototype.markAll = function(m, groupLayers)
{
  if (!(m instanceof MarkSeries))
  {
    throw new CollageException('Mark argument is not a valid MarkSeries object.');
  }
  
  if (typeof(groupLayers) != 'undefined')
  {
    if (groupLayers.constructor instanceof Boolean)
    {
      this.setGroupLayers(groupLayers);
    }
  }
  
  var coordinateArray = this.getCoordinateArray(m);
  this.mark(m, coordinateArray);
}

CanvasPole.prototype.mark = function(m, coordinateArray)
{
  if (!(m instanceof MarkSeries))
  {
    throw new CollageException('mark: Mark argument is not a valid MarkSeries object.');
  }
  
  for (var y = 0; y < m.getMarks().length; y++)
  {
    var coord = coordinateArray.shift();
    if (typeof(coord) == 'undefined' || !(coord instanceof Coordinate))
    {
      throw new CollageException('mark: coord is not a valid Coordinate object.');
    }
    this.makeMark(m.marks[y], coord);
  }
};

CanvasPole.prototype.getCoordinateArray = function(m)
{
  if (!(m instanceof MarkSeries))
  {
    throw new CollageException('Mark argument is not a valid MarkSeries object.');
  }

  if (this.guideLeft.constructor != Number)
  {
    throw new CollageException('guideLeft is not defined.');
  }

  if (this.guideRight.constructor != Number)
  {
    throw new CollageException('guideRight is not defined.');
  }

  var coordinateArray = new Array();
  CSGlobal.csDebug(1,'Begin Y ' + this.getBeginY());
  CSGlobal.csDebug(1,'m length ' + m.palette.swatches.length);
  CSGlobal.csDebug(1,'Interval Y ' + this.getIntervalY());
  for (var y = 1; y <= m.palette.swatches.length; y++)
  {
    if (isOdd(y))
    {
      var xcoord = this.getGuideLeft();
      var ycoord = y*this.getIntervalY() - ((Math.floor(y/2))*10);
    }
    else
    {
      var xcoord = this.getGuideRight();
    }
    coordinateArray.push(new Coordinate(xcoord, ycoord));
  }
  CSGlobal.csDebug(1,'coordinateArray length ' + coordinateArray.length);

  return coordinateArray;
};

CanvasPole.prototype.makeMark = function(m, coordinate)
{
  this.placeFragment(m);
  m.doRules(this, coordinate);
  this.closeFragment(m);
};

