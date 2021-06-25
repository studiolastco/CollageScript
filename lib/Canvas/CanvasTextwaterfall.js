function CanvasTextwaterfall()
{
  Canvas.call(this);
  
  this.beginY;
  this.intervalY;
  
  this.guideLeft; // these are the two axis on which the swatches are arranged vertically
  this.guideRight;
};

//CanvasTextwaterfall.inherit(Canvas);
CanvasTextwaterfall.prototype = new Canvas();
CanvasTextwaterfall.prototype.constructor = CanvasTextwaterfall;

CanvasTextwaterfall.DEFAULT_BEGINY = 10;
CanvasTextwaterfall.DEFAULT_INTERVALY = 10;

CanvasTextwaterfall.prototype.initCanvas = function()
{
  Canvas.prototype.initCanvas.call(this);
}

CanvasTextwaterfall.prototype.markAll = function(m, groupLayers)
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

CanvasTextwaterfall.prototype.mark = function(m, coordinateArray)
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

CanvasTextwaterfall.prototype.getCoordinateArray = function(m)
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

CanvasTextwaterfall.prototype.makeMark = function(m, coordinate)
{
  this.placeFragment(m);
  m.doRules(this, coordinate);
  this.closeFragment(m);
};

