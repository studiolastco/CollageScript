function Geometry()
{
};

Geometry.prototype.getPointOnCircleRandom = function(centerCoord, r)
{
  if (!(centerCoord instanceof Coordinate))
  {
    throw new CollageException('centerCoord is not a Coordinate object.');
  }
  if (r.constructor != Number)
  {
    throw new CollageException('r is not a number.');
  }
  
  var Bx = centerCoord.getX() + (r * Math.cos(((this.getRandomAngle())*Math.PI)/180));
  var By = centerCoord.getY() + (r * Math.sin(((this.getRandomAngle())*Math.PI)/180));
  return new Coordinate(Bx,By);
};

Geometry.prototype.getPointOnCircle = function(centerCoord, r, theta)
{
  if (!(centerCoord instanceof Coordinate))
  {
    throw new CollageException('centerCoord is not a Coordinate object.');
  }
  if (r.constructor != Number)
  {
    throw new CollageException('r is not a number.');
  }
  
  if (theta.constructor != Number)
  {
    throw new CollageException('theta is not a number.');
  }
  
  var Bx = centerCoord.getX() + (r * Math.cos((theta*Math.PI)/180));
  var By = centerCoord.getY() + (r * Math.sin((theta*Math.PI)/180));
  return new Coordinate(Bx,By);
};

Geometry.prototype.getCenterCoordinateXRectangle = function(A, B)
{
  if (!(A instanceof Coordinate))
  {
    throw new CollageException('A is not a Coordinate object.');
  }
  if (!(B instanceof Coordinate))
  {
    throw new CollageException('B is not a Coordinate object.');
  }
  return (A.getX() + B.getX())/2;
};

Geometry.prototype.getCenterCoordinateYRectangle = function(A, B)
{
  if (!(A instanceof Coordinate))
  {
    throw new CollageException('A is not a Coordinate object.');
  }
  if (!(B instanceof Coordinate))
  {
    throw new CollageException('B is not a Coordinate object.');
  }
  return (A.getY() + B.getY())/2;
};

Geometry.prototype.getCenterCoordinateRectangle = function(A, B)
{
  if (!(A instanceof Coordinate))
  {
    throw new CollageException('A is not a Coordinate object.');
  }
  if (!(B instanceof Coordinate))
  {
    throw new CollageException('B is not a Coordinate object.');
  }
  return new Coordinate(this.getCenterCoordinateXRectangle(A,B), this.getCenterCoordinateYRectangle(A,B));
};

Geometry.prototype.getRandomAngle = function()
{
  /* return Math.random()*Math.PI*2; */
  return Math.floor(Math.random() * (new Number(360)));
};

Geometry.prototype.getDiagonalLength = function(w, h)
{
  if (w.constructor != Number || w < 1)
  {
    throw new CollageException('Width argument is not a number or is less than 0.');
  }
  if (h.constructor != Number || h < 1)
  {
    throw new CollageException('Height argument is not a number or is less than 0.');
  }
  return Math.sqrt(Math.pow(w,2) + Math.pow(h,2));
};

Geometry.prototype.getSlope = function(A, B)
{
  if (!(A instanceof Coordinate))
  {
    throw new CollageException('A is not a Coordinate object.');
  }
  if (!(B instanceof Coordinate))
  {
    throw new CollageException('B is not a Coordinate object.');
  }
  return ((A.getY()-B.getY())/(A.getX()-B.getX()));
};

Geometry.prototype.getDistance = function(A, B)
{
  if (!A instanceof Coordinate)
  {
    throw new CollageException('A is not a Coordinate object.');
  }
  if (!B instanceof Coordinate)
  {
    throw new CollageException('B is not a Coordinate object.');
  }
  return Math.sqrt(((B.getX() - A.getX())*(B.getX() - A.getX())) + ((B.getY() - A.getY())*(B.getY() - A.getY())))
};

Geometry.prototype.getPolarR = function(A)
{
  if (!A instanceof Coordinate)
  {
    throw new CollageException('A is not a Coordinate object.');
  }

  return Math.sqrt((((A.getY()*A.getY()) + (A.getX()*A.getX()))));
};

Geometry.prototype.getPolarTheta = function(A, B)
{
  if (!A instanceof Coordinate)
  {
    throw new CollageException('A is not a Coordinate object.');
  }

  return (180/Math.PI)*(Math.atan2(A.getY(),A.getX()));
};

Geometry.prototype.getPolarThetaCenter = function(A, Center)
{
  if (!A instanceof Coordinate)
  {
    throw new CollageException('A is not a Coordinate object.');
  }
  
  if (!Center instanceof Coordinate)
  {
    throw new CollageException('Center is not a Coordinate object.');
  }

  return (180/Math.PI)*(Math.atan2((A.getY() - Center.getY()), (A.getX() - Center.getX())));
};

Geometry.prototype.getPolarThetaCenterAs360 = function(A, Center)
{
  var result = this.getPolarThetaCenter(A, Center);
  if (result < 0)
  {
    return result + 360;
  }
  else
  {
    return result;
  }
};

Geometry.prototype.getCartesian = function(r, theta)
{
  if (r.constructor != Number)
  {
    throw new CollageException('r is not a number.');
  }
  if (theta.constructor != Number)
  {
    throw new CollageException('theta is not a number.');
  }
  
  var x = r*(Math.cos((theta*Math.PI)/180));
  var y = r*(Math.sin((theta*Math.PI)/180));
  return new Coordinate(x,y);
};

Geometry.prototype.getCartesianX = function(r, theta)
{
  var coord = this.getCartesian(r, theta);
  return coord.getX();
};

Geometry.prototype.getCartesianY = function(r, theta)
{
  var coord = this.getCartesian(r, theta);
  return coord.getY();
};

Geometry.prototype.getCircle = function(r)
{
  if (typeof(r) == 'undefined' || r.constructor != Number || r <= 0)
  {
    return false;
  }
  else
  {
    return new Circle(r);
  }
};

/* c1, c2 and c3 are points on the circumference of the circle */
Geometry.prototype.getDiameterCircumcircle = function(c1, c2, c3)
{
  var a = this.getDistance(c1, c2);
  var b = this.getDistance(c2, c3);
  var c = this.getDistance(c3, c1);
  return (2*a*b*c)/Math.sqrt((a+b+c)*(-a+b+c)*(a-b+c)*(a+b-c));
};

/* https://stackoverflow.com/questions/7586063/how-to-calculate-the-angle-between-a-line-and-the-horizontal-axis */
Geometry.prototype.getAngle = function(c1, c2)
{
  if (!c1 instanceof Coordinate)
  {
    throw new CollageException('c1 is not a Coordinate object.');
  }

  if (!c2 instanceof Coordinate)
  {
    throw new CollageException('c2 is not a Coordinate object.');
  }

  var deltaY = c2.getY() - c1.getY();
  var deltaX = c2.getX() - c1.getX();
  
  var angle = (180/Math.PI)*(Math.atan2(deltaY,deltaX));
  return angle;
};

Geometry.prototype.pointToCoordinate = function(pathPoint)
{
  if (typeof(pathPoint) == 'undefined')
  {
    throw new CollageException('Path point is not provided.');
  }
  if (pathPoint.constructor != Array)
  {
    throw new CollageException('Path point is not an array.');
  }
  return new Coordinate(UnitValue(pathPoint[0], 'pt').as(CSGlobal.getData('applicationUnitsString')), UnitValue(pathPoint[1], 'pt').as(CSGlobal.getData('applicationUnitsString')));
};

Geometry.prototype.coordinateToPoint = function(coord)
{
  if (typeof(coord) == 'undefined')
  {
    throw new CollageException('coord is not provided.');
  }
  if (!(coord instanceof Coordinate))
  {
    throw new CollageException('coord is not a Coordinate object.');
  }
  return [UnitValue(coord.getX(), CSGlobal.getData('applicationUnitsString')).as('pt'), UnitValue(coord.getY(), CSGlobal.getData('applicationUnitsString')).as('pt')];
};

Geometry.prototype.overlaps = function(centerA, widthA, heightA, centerB, widthB, heightB)
{
  if (typeof(centerA) == 'undefined' || !(centerA instanceof Coordinate))
  {
    throw new CollageException('centerA is not a Coordinate object.');
  }

  if (typeof(widthA) == 'undefined' || !(widthA instanceof UnitValue))
  {
    throw new CollageException('widthA is not a UnitValue object.');
  }

  if (typeof(heightA) == 'undefined' || !(heightA instanceof UnitValue))
  {
    throw new CollageException('heightA is not a UnitValue object.');
  }

  if (typeof(centerB) == 'undefined' || !(centerB instanceof Coordinate))
  {
    throw new CollageException('centerB is not a Coordinate object.');
  }

  if (typeof(widthB) == 'undefined' || !(widthB instanceof UnitValue))
  {
    throw new CollageException('widthB is not a UnitValue object.');
  }

  if (typeof(heightB) == 'undefined' || !(heightB instanceof UnitValue))
  {
    throw new CollageException('heightB is not a UnitValue object.');
  }

  /* https://gamedev.stackexchange.com/questions/586/what-is-the-fastest-way-to-work-out-2d-bounding-box-intersection */
  /* return (abs(a.x - b.x) * 2 < (a.width + b.width)) && (abs(a.y - b.y) * 2 < (a.height + b.height)); */
  /* CSGlobal.csDebug(2, f.getProperty('center').toPt().getX() + " - " + this.getCenterCoordinate().toPt().getX() + " " + f.getProperty('width').as('pt') + " " + this.getWidth().as('pt')); */
  var test1 = (Math.abs(centerA.toPt().getX() - centerB.toPt().getX()) * 2 < (widthA.as('pt') + widthB.as('pt')));
  var test2 = (Math.abs(centerA.toPt().getY() - centerB.toPt().getY()) * 2 < (heightA.as('pt') + heightB.as('pt')));
  
  return (test1 && test2);
};
