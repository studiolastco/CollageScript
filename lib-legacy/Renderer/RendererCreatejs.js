function RendererCreatejs()
{
  Renderer.call(this);
  this.debuglevel;
  
  this.stage;
  this.asset = {};
  this.hline;
  this.vline;
  
  this.validOptions.push('fragmentSize');
};

RendererCreatejs.prototype = new Renderer();
RendererCreatejs.prototype.constructor = RendererCreatejs;

RendererCreatejs.prototype.getStage = function()
{
  return this.stage;
};

RendererCreatejs.prototype.setStage = function(stage)
{
  this.stage = stage;
};

RendererCreatejs.prototype.setApplicationUnits = function(appUnits)
{
  if (typeof(appUnits) == 'undefined' || !(this.getConfig().VALID_APPLICATIONUNITS.inArray(appUnits)))
  {
    CSGlobal.csDebug(2, "Setting default application units: " + this.getConfig().DEFAULT_APPLICATIONUNITS);
    CSGlobal.csDebug(2, "Application units: " + this.getApplicationUnitsString());
    CSGlobal.csDebug(2, "Createjs only works in px!");
  }
  else
  {
    CSGlobal.csDebug(2, "Setting application units: " + appUnits);
    CSGlobal.csDebug(2, "Application units: " + this.getApplicationUnitsString());
    CSGlobal.csDebug(2, "Createjs only works in px!");
  }
};

RendererCreatejs.prototype.validUnits = function(units)
{
  var valid = new Array('px');
  var test = valid.indexOf(units);
  if (test == -1)
  {
    return false;
  }
  else
  {
    return true;
  }
};

RendererCreatejs.prototype.csDebug = function(debugLevel, msg)
{
  if (this.getConfig().VALID_DEBUGLEVEL.inArray(debugLevel) && debugLevel <= this.getDebugLevel() && window.console && window.console.log)
  {
    console.debug(msg);
  }
};

RendererCreatejs.prototype.getDebugLevel = function()
{
  return this.debuglevel;
};

RendererCreatejs.prototype.setDebugLevel = function(debugLevel)
{
  if (typeof(debugLevel) == 'undefined' || !(this.getConfig().VALID_DEBUGLEVEL.inArray(debugLevel)))
  {
    CSGlobal.csDebug(2, "Setting default debug level: " + this.getConfig().DEFAULT_DEBUGLEVEL);
    this.debuglevel = this.getConfig().DEFAULT_DEBUGLEVEL;
  }
  else
  {
    CSGlobal.csDebug(2, "Setting debug level: " + debugLevel);
    this.debuglevel = debugLevel;
  }
};

RendererCreatejs.prototype.initCanvas = function(canvas)
{
  // Canvas offset X
  if (canvas.getCanvasOffsetX().constructor != Number)
  {
    canvas.setCanvasOffsetX(canvas.getCanvasOffsetX());
  }

  // Canvas offset Y
  if (canvas.getCanvasOffsetY().constructor != Number)
  {
    canvas.setCanvasOffsetY(canvas.getCanvasOffsetY());
  }
};

RendererCreatejs.prototype.setWidth = function (width)
{
  if (width.constructor == Number)
  {
    CSGlobal.csDebug(1,"Setting canvas to width: " + width);
    this.setOption('width', new Number(width));
  }
  else
  {
    throw new CollageException("Canvas width must be a Number object.");
  }
};

RendererCreatejs.prototype.setHeight = function (height)
{
  if (height.constructor == Number)
  {
    CSGlobal.csDebug(1,"Setting canvas to height: " + height);
    this.setOption('height', new Number(height));
  }
  else
  {
    throw new CollageException("Canvas height must be a Number object.");
  }
};

RendererCreatejs.prototype.update = function()
{
  this.stage.update();
};

RendererCreatejs.prototype.getHorizontalRealestate = function(canvas)
{
  // Get horizontal real estate (width minus offset at left and right)
  return (canvas.getWidth() - canvas.getCanvasOffsetX()*2);
}

RendererCreatejs.prototype.getVerticalRealestate = function(canvas)
{
  // Get vertical real estate (height minus offset at top and bottom)
  return (canvas.getHeight() - canvas.getCanvasOffsetY()*2);
}

RendererCreatejs.prototype.addGuideVertical = function(canvas, guide)
{
  if (typeof(this.vline) != 'undefined')
  {
    CSGlobal.csDebug(2,"Canvas addGuideVertical: cloning for guide " + guide);
    var newline = this.vline.clone();
    newline.x = guide;
    this.getStage().addChild(newline);
  }
  else
  {
    CSGlobal.csDebug(2,"Canvas addGuideVertical: initial shape for cloning " + guide);
    this.vline = new createjs.Shape();
    this.vline.snapToPixel = true;
    this.vline.graphics.setStrokeStyle(0.25).beginStroke("#ffffff");
    this.vline.graphics.moveTo(0, 0);
    this.vline.graphics.lineTo(0, canvas.height);
    this.vline.graphics.endStroke();
    this.vline.x = guide;
    this.getStage().addChild(this.vline);
  }
};

RendererCreatejs.prototype.addGuideHorizontal = function (canvas, guide)
{
  if (typeof(this.hline) != 'undefined')
  {
    CSGlobal.csDebug(2,"Canvas addGuideHorizontal: cloning for guide " + guide);
    var newline = this.hline.clone();
    newline.y = guide;
    this.getStage().addChild(newline);
  }
  else
  {
    CSGlobal.csDebug(2,"Canvas addGuideHorizontal: initial shape for cloning " + guide);
    this.hline = new createjs.Shape();
    this.hline.snapToPixel = true;
    this.hline.graphics.setStrokeStyle(0.25).beginStroke("#ffffff");
    this.hline.graphics.moveTo(0, 0);
    this.hline.graphics.lineTo(canvas.width, 0);
    this.hline.graphics.endStroke();
    this.hline.y = guide;
    this.getStage().addChild(this.hline);
  }
};

RendererCreatejs.prototype.translate = function(m, x, y)
{
  CSGlobal.csDebug(2,"Translate fragment: " + m.constructor.name);
  if (!(m instanceof Mark))
  {
    throw new CollageException('Mark argument is not a valid Mark object.');
  }
  if (typeof(x) == 'undefined' || x.constructor != Number)
  {
    throw new CollageException("X is not set or is not a Number");
  }
  if (typeof(y) == 'undefined' || y.constructor != Number)
  {
    throw new CollageException("Y is not set or is not a Number");
  }
  var shape = m.getFragment().getFragmentLayer();
  shape.x = shape.x + x;
  shape.y = shape.y + y;
  return shape;
};

RendererCreatejs.prototype.toCoordinate = function(m, coordinate)
{
  CSGlobal.csDebug(2,"Moving fragment to coordinate: " + m.constructor.name);
  if (!(m instanceof Mark))
  {
    throw new CollageException('Mark argument is not a valid Mark object.');
  }
  if (typeof(coordinate) == 'undefined' || !(coordinate instanceof Coordinate))
  {
    throw new CollageException('Coordinate argument is not a Coordinate object.');
  }
  var shape = m.getFragment().getFragmentLayer();
  shape.x = coordinate.getX();
  shape.y = coordinate.getY();
  return shape;
};

RendererCreatejs.prototype.topLeft = function(m)
{
  CSGlobal.csDebug(2,"Moving fragment to top-left: " + m.getFragment().getFragmentName());
  if (!(m instanceof Mark))
  {
    throw new CollageException('Mark argument is not a valid Mark object.');
  }
  var shape = m.getFragment().getFragmentLayer();
  shape.x = 0;
  shape.y = 0;
  return shape;
};

RendererCreatejs.prototype.offScreen = function(m)
{
  CSGlobal.csDebug(2,"Moving fragment off-screen: " + m.getFragment().getFragmentName());
  if (!(m instanceof Mark))
  {
    throw new CollageException('Mark argument is not a valid Mark object.');
  }
  var shape = m.getFragment().getFragmentLayer();
  var b = shape.getBounds();
  shape.x = 0 - (b.width);
  shape.y = window.innerHeight/2;
  return shape;
};

RendererCreatejs.prototype.getOffScreenRandom = function(shape)
{
  if (!(shape instanceof createjs.DisplayObject))
  {
    throw new CollageException('Shape argument is not a valid createJS object.');
  }
  var choice = getRandomInt(1,5);
  //CSGlobal.csDebug(2,"Getting off-screen position randomly (" + choice + ")");
  var coordinate = new Coordinate(0,0);
  switch(choice)
  {
    case 2:
    coordinate.setX(window.innerWidth + (shape.getBounds().width*2));
    coordinate.setY(getRandomInt(1, window.innerHeight));
    break;
    case 3:
    coordinate.setY(window.innerHeight + (shape.getBounds().height*2));
    coordinate.setX(getRandomInt(1, window.innerWidth));
    break;
    case 4:
    coordinate.setX(0 - (shape.getBounds().width*2));
    coordinate.setY(getRandomInt(1, window.innerHeight));
    break;
    default:
    coordinate.setY(0 - (shape.getBounds().height*2));
    coordinate.setX(getRandomInt(1, window.innerWidth));
    break;
  }
  return coordinate;
};

RendererCreatejs.prototype.offScreenRandom = function(m)
{
  CSGlobal.csDebug(2,"Moving fragment off-screen randomly: " + m.getFragment().getFragmentName());
  if (!(m instanceof Mark))
  {
    throw new CollageException('Mark argument is not a valid Mark object.');
  }
  var shape = m.getFragment().getFragmentLayer();
  var coordinate = this.getOffScreenRandom(shape);
  shape.x = Number(coordinate.getX());
  shape.y = Number(coordinate.getY());
  return shape;
};

RendererCreatejs.prototype.placeFragment = function(m)
{
  if (!(m instanceof Mark))
  {
    throw new CollageException('Mark argument is not a valid Mark object.');
  }

  CSGlobal.csDebug(1, "Placing fragment: " + m.getFragment().getFragmentName() + " (" + m.getCurrentPalette().getPalettePath() + " " + m.getFragment().getFragmentDocument() + " " + m.getFragment().getFragmentLayer() + ")");
  if (!(m instanceof Mark))
  {
    throw new CollageException('Mark argument is not a valid Mark object.');
  }
  this.getStage().addChild(m.getFragment().getFragmentLayer());
  return m.getFragment().getFragmentLayer();
};

RendererCreatejs.prototype.nameFragment = function(m, f, quad)
{
  if (!(m instanceof Mark))
  {
    throw new CollageException('Mark argument is not a valid Mark object.');
  }

  if (!(f instanceof Fragment))
  {
    throw new CollageException('Fragment argument is not a valid Fragment object.');
  }

  var assetName = ("asset-" + quad + "-" + m.name);
  f.getFragmentLayer().name = assetName;
  return assetName;
};

RendererCreatejs.prototype.getAsset = function(m, f)
{
  if (!(m instanceof Mark))
  {
    throw new CollageException('Mark argument is not a valid Mark object.');
  }
  
  if (!(f instanceof Fragment))
  {
    throw new CollageException('Fragment argument is not a valid Fragment object.');
  }
  
  var fragmentSize = Number(this.getOption('fragmentSize'));
  CSGlobal.csDebug(2, "RGB value for asset: " + f.getFragmentDocument());
  
  if (typeof(this.asset[f.getFragmentDocument()]) != 'undefined')
  {
    var newasset = this.asset[f.getFragmentDocument()].clone();
    this.getStage().addChild(newasset);
    return newasset;
  }
  else
  {
    this.asset[f.getFragmentDocument()] = new createjs.Shape();
    this.asset[f.getFragmentDocument()].snapToPixel = true;
    this.asset[f.getFragmentDocument()].graphics.setStrokeStyle(0);
    this.asset[f.getFragmentDocument()].graphics.f(("#"+f.getDocumentName()));
    this.asset[f.getFragmentDocument()].graphics.dr(0, 0, fragmentSize, fragmentSize);
    this.asset[f.getFragmentDocument()].graphics.ef();
    this.asset[f.getFragmentDocument()].setBounds(0,0,fragmentSize,fragmentSize);
    this.asset[f.getFragmentDocument()].x = 0;
    this.asset[f.getFragmentDocument()].y = 0;
    this.asset[f.getFragmentDocument()].regX = (fragmentSize/2);
    this.asset[f.getFragmentDocument()].regY = (fragmentSize/2);
    this.asset[f.getFragmentDocument()].cache(-fragmentSize/2, -fragmentSize/2, fragmentSize * 2, fragmentSize * 2);
    return this.asset[f.getFragmentDocument()];
  }
};

/* Should return: array('topx','topy','bottomx','bottomy') */
RendererCreatejs.prototype.getAssetBounds = function(asset)
{
  if (!(asset instanceof createjs.Shape))
  {
    throw new CollageException('Asset argument is not an object.');
  }
  
  var bounds = asset.getBounds();
  return [bounds.x,bounds.y,(bounds.x + bounds.width),(bounds.y + bounds.height)];
};

RendererCreatejs.prototype.rotate = function(f, a)
{
  if (!(f instanceof Fragment))
  {
    throw new CollageException('Fragment argument is not an Fragment object.');
  }
  
  var shape = f.getFragmentLayer();
  shape.rotation = a;
};
