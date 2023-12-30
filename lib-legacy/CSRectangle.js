function CSRectangle()
{
  this.origin;
  this.width;
  this.height;

  this.subpathinfo;
};

// Does the bounding box of this rectangle overlaps the bounding box of the fragment layer in Ps document?
CSRectangle.prototype.overlaps = function(f)
{
  if (typeof(f) == 'undefined' || !(f instanceof Fragment))
  {
    throw new CollageException('Argument must be a Fragment object.');
  }
  
  var g = new Geometry();
  return g.overlaps(f.getProperty('center'), f.getProperty('width'), f.getProperty('height'), this.getCenterCoordinate(), this.getWidth(), this.getHeight());
};

CSRectangle.prototype.getCenterCoordinate = function()
{
  var g = new Geometry();
  return g.getCenterCoordinateRectangle(this.getTopCoordinate(), this.getBottomCoordinate());
};

CSRectangle.prototype.getOrigin = function()
{
  if (typeof(this.origin) == 'undefined' || this.origin.constructor != Coordinate)
  {
    throw new CollageException('Origin is not set or is not a coordinate.');
  }
  return this.origin;
};

CSRectangle.prototype.setOrigin = function(origin)
{
  if (typeof(origin) == 'undefined' || origin.constructor != Coordinate)
  {
    throw new CollageException('Origin is not set or is not a coordinate.');
  }
  else
  {
    CSGlobal.csDebug(2,"Setting origin: (" + origin.getX() + ", " + origin.getY() + ")");
    this.origin = origin;
  }
};

CSRectangle.prototype.getWidth = function()
{
  if (typeof(this.width) == 'undefined')
  {
    throw new CollageException('Width is not set.');
  }
  return this.width;
};

CSRectangle.prototype.setWidth = function(width)
{
  if (typeof(width) != 'undefined' && width.constructor == Number)
  {
    CSGlobal.csDebug(2,"Setting width: " + width + " to default unit of " + CSGlobal.getData('applicationUnitsString'));
    this.width = new UnitValue(width, CSGlobal.getData('applicationUnitsString'));
  }
  else if (typeof(width) != 'undefined' && width.constructor == UnitValue)
  {
    CSGlobal.csDebug(2,"Setting width to a unit value: " + width);
    this.width = width;
  }
  else
  {
    throw new CollageException('Width is not a number.');
  }
};

CSRectangle.prototype.getHeight = function()
{
  if (typeof(this.width) == 'undefined')
  {
    throw new CollageException('Height is not set.');
  }
  return this.width;
};

CSRectangle.prototype.setHeight = function(height)
{
  if (typeof(height) != 'undefined' && height.constructor == Number)
  {
    CSGlobal.csDebug(2,"Setting height: " + height + " to default unit of " + CSGlobal.getData('applicationUnitsString'));
    this.height = new UnitValue(height, CSGlobal.getData('applicationUnitsString'));
  }
  else if (typeof(height) != 'undefined' && height.constructor == UnitValue)
  {
    CSGlobal.csDebug(2,"Setting height to a unit value: " + height);
    this.height = height;
  }
  else
  {
    throw new CollageException('Height is not a number.');
  }
};

CSRectangle.prototype.getPath = function()
{
  if (typeof(this.subpathinfo) == 'undefined')
  {
    this.setPath();
  }
  return this.subpathinfo;
};

CSRectangle.prototype.setPath = function()
{
  var g = new Geometry();
  
  CSGlobal.csDebug(2, "Rectangle setPath: origin: " + this.origin.getX().value + " " + this.origin.getX().type + ", " + this.origin.getY().value + " " + this.origin.getY().type);
  
  var ul = new PathPointInfo();
  var ulCoord = this.getOrigin().clone();
  ul.anchor = ulCoord.toPtArray(); 
  ul.leftDirection = ulCoord.toPtArray();
  ul.rightDirection = ulCoord.toPtArray();
  ul.kind = PointKind.CORNERPOINT;
  CSGlobal.csDebug(2, "ul: " + ul.anchor[0] + " " + ul.anchor[1]);

  var ur = new PathPointInfo();
  var urCoord = this.getOrigin().clone();
  urCoord.adjustX(this.getWidth());
  ur.anchor = urCoord.toPtArray(); 
  ur.leftDirection = urCoord.toPtArray();
  ur.rightDirection = urCoord.toPtArray();
  ur.kind = PointKind.CORNERPOINT;
  CSGlobal.csDebug(2, "ur: " + ur.anchor[0] + " " + ur.anchor[1]);

  var lr = new PathPointInfo();
  var lrCoord = this.getOrigin().clone();
  lrCoord.adjustX(this.getWidth());
  lrCoord.adjustY(this.getHeight());
  lr.anchor = lrCoord.toPtArray(); 
  lr.leftDirection = lrCoord.toPtArray();
  lr.rightDirection = lrCoord.toPtArray();
  lr.kind = PointKind.CORNERPOINT;  
  CSGlobal.csDebug(2, "lr: " + lr.anchor[0] + " " + lr.anchor[1]);

  var ll = new PathPointInfo();
  var llCoord = this.getOrigin().clone();
  llCoord.adjustY(this.getHeight());
  ll.anchor = llCoord.toPtArray(); 
  ll.leftDirection = llCoord.toPtArray();
  ll.rightDirection = llCoord.toPtArray();
  ll.kind = PointKind.CORNERPOINT;
  CSGlobal.csDebug(2, "ll: " + ll.anchor[0] + " " + ll.anchor[1]);
  
  this.subpathinfo = new SubPathInfo();
  this.subpathinfo.closed = true;
  this.subpathinfo.operation = ShapeOperation.SHAPEXOR;
  this.subpathinfo.entireSubPath = [ul,ur,lr,ll];
  
  return this.subpathinfo;
};

// bounds
CSRectangle.prototype.getTopCoordinate = function()
{
  return new Coordinate(UnitValue(this.subpathinfo.entireSubPath[0].anchor[0], 'pt'), UnitValue(this.subpathinfo.entireSubPath[0].anchor[1], 'pt'));
};

//bounds
CSRectangle.prototype.getBottomCoordinate = function()
{
  return new Coordinate(UnitValue(this.subpathinfo.entireSubPath[2].anchor[0], 'pt'), UnitValue(this.subpathinfo.entireSubPath[2].anchor[1], 'pt'));
};


