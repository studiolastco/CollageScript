function CSCircle()
{
  this.r;
  this.circumference;
  this.centerCoordinate;
  this.subpathinfo;
};

CSCircle.prototype.getR = function()
{
  if (typeof(this.r) == 'undefined')
  {
    this.setR();
  }
  return this.r;
};

CSCircle.prototype.setR = function(r)
{
  if (typeof(r) == 'undefined' || r.constructor != Number)
  {
    throw new CollageException('R is not a number.');
  }
  else
  {
    CSGlobal.csDebug(2,"Setting r: " + r);
    this.r = new Number(r);
  }
};

CSCircle.prototype.getCenterCoordinate = function()
{
  if (!(this.centerCoordinate instanceof Coordinate))
  {
    this.setCenterCoordinate();
  }
  CSGlobal.csDebug(2,"Getting center coordinate: (" + this.centerCoordinate.getX() + ", " + this.centerCoordinate.getY() + ")");
  return this.centerCoordinate;
};

CSCircle.prototype.setCenterCoordinate = function (centerCoordinate)
{
  if (centerCoordinate instanceof Coordinate)
  {
    this.centerCoordinate = centerCoordinate;
    CSGlobal.csDebug(2,"Setting center coordinate: (" + this.centerCoordinate.getX() + ", " + this.centerCoordinate.getY() + ")");
  }
  else
  {
    this.centerCoordinate = new Coordinate(new Number(0), new Number(0));
    CSGlobal.csDebug(2,"Setting begin coordinate to default value: (" + this.centerCoordinate.getX() + ", " + this.centerCoordinate.getY() + ")");
  }
};

CSCircle.prototype.getCircumference = function()
{
  return 2*Math.PI*this.getR();
};

CSCircle.prototype.getSectorAreaWithArcLength = function(arclength)
{
  var result = 0;
  if (arclength.constructor == Number && arclength > 0)
  {
    result = (2*Math.PI*r)*(arclength/360);
  }
  return result;
};

// angle in degrees
CSCircle.prototype.getSectorAreaWithCentralAngle = function(angle)
{
  var result = 0;
  if (arclength.constructor == Number && arclength > 0)
  {
    result = (Math.PI)*(r*r)*(angle/360);
  }
  return result;
};

CSCircle.prototype.getCartesianCoordinate = function(theta)
{
  if (theta.constructor != Number)
  {
    throw new CollageException('theta is not a number.');
  }
  var geometry = new Geometry();
  return geometry.getCartesian(this.r, theta);
};

CSCircle.prototype.getAnchor = function(r)
{
  // http://www.whizkidtech.redprince.net/bezier/circle/
  var result = ((Math.sqrt(2)-1)/3)*4*r;
  CSGlobal.csDebug(2, "Anchor length: " + result);
  return result;
};

CSCircle.prototype.getPath = function()
{
  if (typeof(this.subpathinfo) == 'undefined')
  {
    this.setPath();
  }
  return this.subpathinfo;
};

// Draw a circle using the PS method, four Bézier curves
CSCircle.prototype.setPath = function()
{
  var g = new Geometry();
  
  var zero = new PathPointInfo();
  var zeroCoord = g.getPointOnCircle(this.getCenterCoordinate(), this.getR(), 0);
  zero.anchor = [UnitValue(zeroCoord.getX(), CSGlobal.getData('applicationUnitsString')).as('pt'), UnitValue(zeroCoord.getY(), CSGlobal.getData('applicationUnitsString')).as('pt')]; 
  zero.leftDirection = [UnitValue(zeroCoord.getX(), CSGlobal.getData('applicationUnitsString')).as('pt'), UnitValue((zeroCoord.getY() + this.getAnchor(this.getR())), CSGlobal.getData('applicationUnitsString')).as('pt')]; 
  zero.rightDirection = [UnitValue(zeroCoord.getX(), CSGlobal.getData('applicationUnitsString')).as('pt'), UnitValue((zeroCoord.getY() - this.getAnchor(this.getR())), CSGlobal.getData('applicationUnitsString')).as('pt')]; 
  zero.kind = PointKind.SMOOTHPOINT;

  var ninety = new PathPointInfo();
  var ninetyCoord = g.getPointOnCircle(this.getCenterCoordinate(), this.getR(), 90);
  ninety.anchor = [UnitValue(ninetyCoord.getX(), CSGlobal.getData('applicationUnitsString')).as('pt'), UnitValue(ninetyCoord.getY(), CSGlobal.getData('applicationUnitsString')).as('pt')]; 
  ninety.leftDirection = [UnitValue((ninetyCoord.getX()-this.getAnchor(this.getR())), CSGlobal.getData('applicationUnitsString')).as('pt'), UnitValue(ninetyCoord.getY(), CSGlobal.getData('applicationUnitsString')).as('pt')]; 
  ninety.rightDirection = [UnitValue((ninetyCoord.getX()+this.getAnchor(this.getR())), CSGlobal.getData('applicationUnitsString')).as('pt'), UnitValue(ninetyCoord.getY(), CSGlobal.getData('applicationUnitsString')).as('pt')]; 
  ninety.kind = PointKind.SMOOTHPOINT;

  var oneEighty = new PathPointInfo();
  var oneEightyCoord = g.getPointOnCircle(this.getCenterCoordinate(), this.getR(), 180);
  oneEighty.anchor = [UnitValue(oneEightyCoord.getX(), CSGlobal.getData('applicationUnitsString')).as('pt'), UnitValue(oneEightyCoord.getY(), CSGlobal.getData('applicationUnitsString')).as('pt')]; 
  oneEighty.leftDirection = [UnitValue(oneEightyCoord.getX(), CSGlobal.getData('applicationUnitsString')).as('pt'), UnitValue((oneEightyCoord.getY() - this.getAnchor(this.getR())), CSGlobal.getData('applicationUnitsString')).as('pt')]; 
  oneEighty.rightDirection = [UnitValue(oneEightyCoord.getX(), CSGlobal.getData('applicationUnitsString')).as('pt'), UnitValue((oneEightyCoord.getY() + this.getAnchor(this.getR())), CSGlobal.getData('applicationUnitsString')).as('pt')]; 
  oneEighty.kind = PointKind.SMOOTHPOINT;

  var nNinety = new PathPointInfo();
  var nNinetyCoord = g.getPointOnCircle(this.getCenterCoordinate(), this.getR(), 270);
  nNinety.anchor = [UnitValue(nNinetyCoord.getX(), CSGlobal.getData('applicationUnitsString')).as('pt'), UnitValue(nNinetyCoord.getY(), CSGlobal.getData('applicationUnitsString')).as('pt')]; 
  nNinety.leftDirection = [UnitValue((nNinetyCoord.getX() + this.getAnchor(this.getR())), CSGlobal.getData('applicationUnitsString')).as('pt'), UnitValue(nNinetyCoord.getY(), CSGlobal.getData('applicationUnitsString')).as('pt')]; 
  nNinety.rightDirection = [UnitValue((nNinetyCoord.getX() - this.getAnchor(this.getR())), CSGlobal.getData('applicationUnitsString')).as('pt'), UnitValue(nNinetyCoord.getY(), CSGlobal.getData('applicationUnitsString')).as('pt')]; 
  nNinety.kind = PointKind.SMOOTHPOINT;

  this.subpathinfo = new SubPathInfo();
  this.subpathinfo.closed = true;
  this.subpathinfo.operation = ShapeOperation.SHAPEXOR;
  this.subpathinfo.entireSubPath = [zero, ninety, oneEighty, nNinety];
  
  return this.subpathinfo;
};

CSCircle.prototype.sortPathPoints = function()
{
  var g = new Geometry();
  // Registering 'this' circle's centerpoint in global data for compare function coming up in a closure.
  // Could not call 'this' from within it. 
  CSGlobal.setData('centerCoord', this.getCenterCoordinate());
  this.subpathinfo.entireSubPath.sort(function(a,b)
  {
    var g = new Geometry();
    var thetaA = g.getPolarThetaCenterAs360(g.pointToCoordinate(a.anchor), CSGlobal.getData('centerCoord'));
    var thetaB = g.getPolarThetaCenterAs360(g.pointToCoordinate(b.anchor), CSGlobal.getData('centerCoord'));
    if (thetaA < thetaB) 
    {
      CSGlobal.csDebug(2, thetaA + " < " + thetaB);
      return -1;
    }
    if (thetaA > thetaB) 
    {
      CSGlobal.csDebug(2, thetaA + " > " + thetaB);
      return 1;
    }
    if (thetaA == thetaB)
    {
      CSGlobal.csDebug(2, thetaA + " == " + thetaB);
      return 0;
    }
  });
  /*for(x = 0; x < this.subpathinfo.entireSubPath.length; x++)
  {
    var tmp = this.subpathinfo.entireSubPath[x].anchor;
    var tmpCoord = g.pointToCoordinate(tmp);
    
    CSGlobal.csDebug(2, "Point [" + tmp[0] + ", " + tmp[1] + "] is Coordinate (" + tmpCoord.getX() + ", " + tmpCoord.getY() + ") with theta " + g.getPolarThetaCenter2(tmpCoord, this.getCenterCoordinate()));
  }*/
};

// A bit unusual, since the actual path of the circle was created based on an r value and center coordinate
// in the canvas, the point passed here as argument is only needed to determine the theta of the point to
// be added. The coordinate argument and circle object this should have already the same r values.
CSCircle.prototype.addPoint = function(coord)
{
  var g = new Geometry();
  
  if (!(coord instanceof Coordinate))
  {
    throw new CollageException('Coordinate argument does not appear to be a Coordinate object.');
  }
  if (g.getPolarR(coord).toFixed(8) !== this.getR().toFixed(8))
  {
    CSGlobal.csDebug(2, g.getPolarR(coord) + " does not equal " + this.getR());
    throw new CollageException('Coordinate distance and circle radius are not equal.');
  }

  var tmp = new PathPointInfo();
  var tmpCoord = g.getPointOnCircle(this.getCenterCoordinate(), this.getR(), g.getPolarTheta(coord));
  tmp.anchor = [UnitValue(tmpCoord.getX(), CSGlobal.getData('applicationUnitsString')).as('pt'), UnitValue(tmpCoord.getY(), CSGlobal.getData('applicationUnitsString')).as('pt')]; 
  tmp.leftDirection = [UnitValue(tmpCoord.getX(), CSGlobal.getData('applicationUnitsString')).as('pt'), UnitValue(tmpCoord.getY(), CSGlobal.getData('applicationUnitsString')).as('pt')]; 
  tmp.rightDirection = [UnitValue(tmpCoord.getX(), CSGlobal.getData('applicationUnitsString')).as('pt'), UnitValue(tmpCoord.getY(), CSGlobal.getData('applicationUnitsString')).as('pt')]; 
  //tmp.leftDirection = [UnitValue((tmpCoord.getX() + this.getAnchor(this.getR())), CSGlobal.getData('applicationUnitsString')).as('pt'), UnitValue(tmpCoord.getY(), CSGlobal.getData('applicationUnitsString')).as('pt')]; 
  //tmp.rightDirection = [UnitValue((tmpCoord.getX() - this.getAnchor(this.getR())), CSGlobal.getData('applicationUnitsString')).as('pt'), UnitValue(tmpCoord.getY(), CSGlobal.getData('applicationUnitsString')).as('pt')]; 
  tmp.kind = PointKind.CORNERPOINT;

  this.subpathinfo.entireSubPath.push(tmp);
};
