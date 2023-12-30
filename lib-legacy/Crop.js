function Crop()
{
  this.units;
  this.cropFolder;
  
  this.canvas;
  
  this.beginCoordinate;
  this.endCoordinate;
  
  this.cropSize;
  this.cropSizeX;
  this.cropSizeY;
  this.cropRotation;
  
  Crop.DEFAULT_UNITS = Units.CM;
  Crop.DEFAULT_BEGINCOORDINATE = new Coordinate(0,0);
};

Crop.DEFAULT_UNITS;
Crop.DEFAULT_CROPSIZE = 1;
Crop.DEFAULT_CROPSIZEX = 1;
Crop.DEFAULT_CROPSIZEY = 1;
Crop.DEFAULT_CROPROTATION = 0;
Crop.DEFAULT_BEGINCOORDINATE;
Crop.ROTATION_RANDOM = 'randomrotation';

Crop.prototype.getCropFolder = function()
{
  return this.cropFolder;
}

Crop.prototype.setCropFolder = function(pathCropFolder)
{
  var test = new Folder(pathCropFolder);
  if (typeof(test) != 'undefined' && test.exists)
  {
    CSGlobal.csDebug(1,"Setting crop folder: " + pathCropFolder);
    this.cropFolder = pathCropFolder;
    return true;
  }
  else
  {
    throw new CollageException(pathCropFolder + ' folder cannot be set as crop folder. Does it exist?');
    return false;
  }
}

Crop.prototype.getCropSize = function()
{
  return this.cropSize;
};

Crop.prototype.setCropSize = function(cropSize)
{
  if (cropSize < Crop.DEFAULT_CROPSIZE || cropSize.constructor != Number)
  {
    CSGlobal.csDebug(1,"Setting default cropSize: " + Crop.DEFAULT_CROPSIZE);
    this.cropSize = Crop.DEFAULT_CROPSIZE;
  }
  else
  {
    CSGlobal.csDebug(1,"Setting cropSize: " + cropSize);
    this.cropSize = cropSize;
  }
  
  this.setCropSizeX(this.getCropSize());
  this.setCropSizeY(this.getCropSize());
};

Crop.prototype.getCropRotation = function()
{
  if (typeof(this.cropRotation) == 'undefined')
  {
    this.setCropRotation(Crop.DEFAULT_CROPROTATION);
  }
  return this.cropRotation;
}

Crop.prototype.setCropRotation = function(cropRotation)
{
  if (cropRotation == Crop.ROTATION_RANDOM)
  {
    this.cropRotation = Crop.ROTATION_RANDOM;
  }
  else if (typeof(cropRotation) == 'undefined' || cropRotation.constructor != Number)
  {
    this.cropRotation = Crop.DEFAULT_CROPROTATION;
  }
  else
  {
    this.cropRotation = cropRotation;
  }
}

Crop.prototype.getCropSizeX = function()
{
  return this.cropSizeX;
};

Crop.prototype.setCropSizeX = function(cropSizeX)
{
  if (cropSizeX < Crop.DEFAULT_CROPSIZEX || cropSizeX.constructor != Number)
  {
    CSGlobal.csDebug(1,"Setting default cropSizeX: " + Crop.DEFAULT_CROPSIZEX);
    this.cropSizeX = Crop.DEFAULT_CROPSIZEX;
  }
  else
  {
    CSGlobal.csDebug(1,"Setting cropSizeX: " + cropSizeX);
    this.cropSizeX = cropSizeX;
  }
};

Crop.prototype.getCropSizeY = function()
{
  return this.cropSizeY;
};

Crop.prototype.setCropSizeY = function(cropSizeY)
{
  if (cropSizeY < Crop.DEFAULT_CROPSIZEY || cropSizeY.constructor != Number)
  {
    CSGlobal.csDebug(1,"Setting default cropSizeY: " + Crop.DEFAULT_CROPSIZEXY);
    this.cropSizeY = Crop.DEFAULT_CROPSIZEXY;
  }
  else
  {
    CSGlobal.csDebug(1,"Setting cropSizeY: " + cropSizeY);
    this.cropSizeY = cropSizeY;
  }
};

Crop.prototype.getBeginCoordinate = function()
{
  if (typeof(this.beginCoordinate) == 'undefined')
  {
    this.setBeginCoordinate();
  }
  return this.beginCoordinate;
};

Crop.prototype.setBeginCoordinate = function (beginCoordinate)
{
  if (!(beginCoordinate instanceof Coordinate))
  {
    CSGlobal.csDebug(1,"Setting crop begin coordinate to default: (0,0)");
    this.beginCoordinate = Crop.DEFAULT_BEGINCOORDINATE;
  }
  else
  {
    this.beginCoordinate = beginCoordinate;
  }
};

Crop.prototype.getEndCoordinate = function()
{
  return this.endCoordinate;
};

Crop.prototype.setEndCoordinate = function (endCoordinate)
{
  if (endCoordinate instanceof Coordinate)
  {
    CSGlobal.csDebug(1,"Setting crop end coordinate to coordinate: " + endCoordinate.getX() + ", " + endCoordinate.getY());
    this.endCoordinate = endCoordinate;
  }
  else
  {
    CSGlobal.csDebug(1,"Setting crop end coordinate to canvas default: " + this.canvas.getMaxX() + ", " + this.canvas.getMaxY());
    this.endCoordinate = new Coordinate(this.canvas.getMaxX(), this.canvas.getMaxY());
  }
};

Crop.prototype.getUnits = function()
{
  return this.units;
};

Crop.prototype.validUnits = function(units)
{
  // CM INCHES MM PERCENT PICAS PIXELS POINTS (p 214)
  var valid = new Array(Units.CM, Units.INCHES, Units.MM, Units.PERCENT, Units.PICAS, Units.PIXELS, Units.POINTS);
  var test = valid.indexOf(units);
  if (test == -1)
  {
    return false;
  }
  else
  {
    return true;
  }
}

Crop.prototype.setUnits = function (units)
{
  if (!(this.validUnits(units)))
  {
    CSGlobal.csDebug(1,"Setting default units: " + Crop.DEFAULT_UNITS);
    this.units = Crop.DEFAULT_UNITS;
  }
  else
  {
    CSGlobal.csDebug(1,"Setting units: " + units);
    this.units = units;
  }
};

Crop.prototype.getOffsetX = function()
{
  if (!(this.getBeginCoordinate() instanceof Coordinate))
  {
    throw new CollageException('Begin coordinate is not a coordinate object.');
  }
  return (this.getBeginCoordinate().getX());
}

Crop.prototype.getOffsetY = function()
{
  if (!(this.getBeginCoordinate() instanceof Coordinate))
  {
    throw new CollageException('Begin coordinate is not a coordinate object.');
  }
  return (this.getBeginCoordinate().getY());
}

Crop.prototype.getWidth = function()
{
  if (!(this.getBeginCoordinate() instanceof Coordinate))
  {
    throw new CollageException('Begin coordinate is not a coordinate object.');
  }
  if (!(this.getEndCoordinate() instanceof Coordinate))
  {
    throw new CollageException('End coordinate is not a coordinate object.');
  }
  return (this.getEndCoordinate().getX() - this.getBeginCoordinate().getX());
}

Crop.prototype.getHeight = function()
{
  if (!(this.getBeginCoordinate() instanceof Coordinate))
  {
    throw new CollageException('Begin coordinate is not a coordinate object.');
  }
  if (!(this.getEndCoordinate() instanceof Coordinate))
  {
    throw new CollageException('End coordinate is not a coordinate object.');
  }
  return (this.getEndCoordinate().getY() - this.getBeginCoordinate().getY());
}

Crop.prototype.getCanvas = function()
{
  return this.canvas;
}

Crop.prototype.setCanvas = function(canvas)
{
  if (!(canvas instanceof Canvas))
  {
    throw new CollageException('Cannot set canvas. Canvas is not a canvas object.');
    return false;
  }
  else
  {
    this.canvas = canvas;
    return true;
  }
}

Crop.prototype.initCanvas = function()
{
  if (!(this.canvas instanceof Canvas))
  {
    throw new CollageException('Canvas is not a canvas object.');
  }
  
  if (typeof(this.cropFolder) == 'undefined')
  {
    throw new CollageException('Crop folder is not set.');
  }

  if (!(this.getBeginCoordinate() instanceof Coordinate))
  {
    this.setBeginCoordinate();
  }

  if (!(this.getEndCoordinate() instanceof Coordinate))
  {
    this.setEndCoordinate();
  }

  if (typeof(this.cropSize) == 'undefined')
  {
    this.setCropSize();
  }

  // Set offset, gutter and grid sizes
  this.canvas.setCanvasOffset(this.getOffsetX());
  this.canvas.setCanvasOffsetY(this.getOffsetY());
  this.canvas.setGridSize(this.getCropSizeX());
  this.canvas.setGridSizeY(this.getCropSizeY());
  this.canvas.setGridGutter(0);
  this.canvas.setApplyRemainder(new Boolean(false));
  
  // Quads are used in CanvasGrid objects
  this.canvas.resetQuadArray();
  
  // Set guides after resetting quads since remainders can adjust offsets and eventual guide placement
  this.canvas.setGuidesVertical();
  this.canvas.setGuidesHorizontal();
}

Crop.prototype.cropAll = function()
{
  var coords = this.getCanvas().getCoordinateArray();
  for(var x = 0; x < coords.length; x++)
  {
    this.crop(coords[x], new String(basename(this.canvas.getName(), '.cr2') + '-crop-' + str_pad((x + 1), 3, '0', 'STR_PAD_LEFT')));
  }
}

Crop.prototype.crop = function (coord, cropname)
{
  if (!(coord instanceof Coordinate))
  {
    throw new CollageException('Coord is not a Coordinate object.');
  }
  
  if (typeof(cropname) == 'undefined')
  {
    cropname = uniqid();
  }

  var rotation = this.getCropRotation();
  if (rotation == Crop.ROTATION_RANDOM)
  {
    rotation = Math.floor(Math.random() * (360 - 0)) + 0;
    CSGlobal.csDebug(1,"Using random crop rotation: " + rotation);
  }
  
  var left = new UnitValue(coord.getX(), this.getUnits());
  var top = new UnitValue(coord.getY(), this.getUnits());
  var right = new UnitValue((coord.getX() + this.getCropSizeX()), this.getUnits());
  var bottom = new UnitValue((coord.getY() + this.getCropSizeY()), this.getUnits());
  
  canvas.getCanvas().crop([left, top, right, bottom], rotation);

  var cropfile = new File(this.getCropFolder() + "/" + cropname);
  
  var tif = new TiffSaveOptions();
  tif.alphaChannels = false;
  tif.annotations = false;
  tif.byteOrder = ByteOrder.MACOS;
  tif.embedColorProfile = true;
  tif.imageCompression = TIFFEncoding.NONE;
  tif.interleaveChannels = true;
  tif.layers = false;
  tif.transparency = true;
  
  //var ps = new PhotoshopSaveOptions();
  //ps.embedColorProfile = true;
  
  canvas.getCanvas().saveAs(cropfile, tif, true, Extension.LOWERCASE);
  canvas.getCanvas().activeHistoryState = canvas.getCanvas().historyStates.getByName('Open');
}
