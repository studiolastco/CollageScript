function CSLine()
{
  this.beginCoord;
  this.endCoord;
  this.subpathinfo;
};

CSLine.prototype.getBeginCoordinate = function()
{
  return this.startCoord;
}

CSLine.prototype.setBeginCoordinate = function(startCoord)
{
  if (!(startCoord instanceof Coordinate))
  {
    throw new CollageException('startCoord is not a coordinate object.');
  }
  this.startCoord = startCoord;
}

CSLine.prototype.getEndCoordinate = function()
{
  return this.endCoord;
}

CSLine.prototype.setEndCoordinate = function(endCoord)
{
  if (!(endCoord instanceof Coordinate))
  {
    throw new CollageException('endCoord is not a coordinate object.');
  }
  this.endCoord = endCoord;
}

CSLine.prototype.getPath = function()
{
  if (typeof(this.subpathinfo) == 'undefined')
  {
    this.setPath();
  }
  return this.subpathinfo;
};

CSLine.prototype.setPath = function()
{
  var beginPoint = new PathPointInfo(); 
  beginPoint.anchor = [UnitValue(this.getBeginCoordinate().getX(), CSGlobal.getData('applicationUnitsString')).as('pt'), UnitValue(this.getBeginCoordinate().getY(), CSGlobal.getData('applicationUnitsString')).as('pt')]; 
  beginPoint.leftDirection = [UnitValue(this.getBeginCoordinate().getX(), CSGlobal.getData('applicationUnitsString')).as('pt'), UnitValue(this.getBeginCoordinate().getY(), CSGlobal.getData('applicationUnitsString')).as('pt')]; 
  beginPoint.rightDirection = [UnitValue(this.getBeginCoordinate().getX(), CSGlobal.getData('applicationUnitsString')).as('pt'), UnitValue(this.getBeginCoordinate().getY(), CSGlobal.getData('applicationUnitsString')).as('pt')]; 
  beginPoint.kind = PointKind.CORNERPOINT;

  var endPoint = new PathPointInfo(); 
  endPoint.anchor = [UnitValue(this.getEndCoordinate().getX(), CSGlobal.getData('applicationUnitsString')).as('pt'), UnitValue(this.getEndCoordinate().getY(), CSGlobal.getData('applicationUnitsString')).as('pt')]; 
  endPoint.leftDirection = [UnitValue(this.getEndCoordinate().getX(), CSGlobal.getData('applicationUnitsString')).as('pt'), UnitValue(this.getEndCoordinate().getY(), CSGlobal.getData('applicationUnitsString')).as('pt')]; 
  endPoint.rightDirection = [UnitValue(this.getEndCoordinate().getX(), CSGlobal.getData('applicationUnitsString')).as('pt'), UnitValue(this.getEndCoordinate().getY(), CSGlobal.getData('applicationUnitsString')).as('pt')]; 
  endPoint.kind = PointKind.CORNERPOINT;
  
  this.subpathinfo = new SubPathInfo();
  this.subpathinfo.closed = false;
  this.subpathinfo.operation = ShapeOperation.SHAPEXOR;
  this.subpathinfo.entireSubPath = [beginPoint, endPoint];
  return this.subpathinfo;
};
