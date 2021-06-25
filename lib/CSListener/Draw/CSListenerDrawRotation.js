function CSListenerDrawRotation()
{
  CSListenerDraw.call(this);
};

//CSListenerDrawRotation.inherit(CSListenerDraw);
CSListenerDrawRotation.prototype = new CSListenerDraw();
CSListenerDrawRotation.prototype.constructor = CSListenerDrawRotation;

CSListenerDrawRotation.prototype.update = function(notifierObj)
{
  CSGlobal.csDebug(1, "Draw rotation listener notified.");
  CSToolManager.selectPencil('HB');
  
  var g = new Geometry();
  var coord = new Coordinate(new Number(notifierObj.getFragment().getProperty('cx')), new Number(notifierObj.getFragment().getProperty('cy'))); 
  var coordCanvas = notifierObj.getCanvasCoordinate(coord);
  var newCoord = notifierObj.getNewCoordinate();  
  var newCoordCanvas = notifierObj.getCanvasNewCoordinate(newCoord);
  var centerCoord = notifierObj.getCenterCoordinate();
  var centerCoordCanvas = notifierObj.getCenterCoordinateCanvas();
  var thirdCoordCanvas = g.getPointOnCircleRandom(centerCoordCanvas, g.getPolarR(coordCanvas));
  
  CSGlobal.csDebug(2, "polarR coordCanvas" + g.getPolarR(coord));
  CSGlobal.csDebug(2, "coord " + " (" + coord.getX() + ", " + coord.getY() + ")");
  CSGlobal.csDebug(2, "coordCanvas " + " (" + coordCanvas.getX() + ", " + coordCanvas.getY() + ")");
  CSGlobal.csDebug(2, "coordCanvas (pts) " + " (" + UnitValue(coordCanvas.getX(), 'cm').as('pt') + ", " + UnitValue(coordCanvas.getY(), 'cm').as('pt') + ")");
  CSGlobal.csDebug(2, "newCoord " + " (" + newCoord.getX() + ", " + newCoord.getY() + ")");
  CSGlobal.csDebug(2, "newCoordCanvas " + " (" + newCoordCanvas.getX() + ", " + newCoordCanvas.getY() + ")");
  CSGlobal.csDebug(2, "newCoordCanvas " + " (" + newCoordCanvas.getX()*CSGlobal.getCanvas().getCanvasResolution() + ", " + newCoordCanvas.getY()*CSGlobal.getCanvas().getCanvasResolution() + ")");
  CSGlobal.csDebug(2, "centerCoord " + " (" + centerCoord.getX() + ", " + centerCoord.getY() + ")");
  CSGlobal.csDebug(2, "centerCoordCanvas " + " (" + centerCoordCanvas.getX() + ", " + centerCoordCanvas.getY() + ")");
  CSGlobal.csDebug(2, "thirdCoordCanvas " + " (" + thirdCoordCanvas.getX() + ", " + thirdCoordCanvas.getY() + ")");
  
  this.boo(notifierObj, centerCoordCanvas, coord, newCoord);
};

CSListenerDrawRotation.prototype.boo = function(notifierObj, centerCoordCanvas, coord, newCoord)
{ 
  var g = new Geometry();
  var circle = new CSCircle();
  circle.setR(g.getPolarR(coord));
  circle.setCenterCoordinate(centerCoordCanvas);
  var circlePath = circle.getPath();

  circle.addPoint(coord);
  circle.addPoint(newCoord);
  
  circle.sortPathPoints();
  
  var layerName = notifierObj.getFragment().getLayerName();
  var layerName = layerName.concat("-" + String(new Date().getTime()));
  
  var circle = CSGlobal.getCanvas().getCanvas().pathItems.add(("Circle-" + layerName), [circle.getPath()]);
};
