function CSToolManagerObj()
{
  // removed 'Red','Sepia'
  this.validPencils = ['2H','4B','4H','9B','HB'];
};

/*
2H Pencil
4B Pencil
4H Pencil
9B Pencil
HB Pencil
Red Pencil
Sepia Pencil
*/

CSToolManagerObj.prototype.setForegroundColorWhite = function()
{
  app.foregroundColor.rgb.hexValue = 'ffffff';
}

CSToolManagerObj.prototype.isValidPencil = function(pencilType)
{
  return this.validPencils.inArray(pencilType);
}

CSToolManagerObj.prototype.selectRandomPencil = function()
{
  var choice = getRandomInt(0,6);
  this.selectPencil(this.validPencils[choice]);
}

CSToolManagerObj.prototype.selectPencil = function(pencilType)
{
  if (this.isValidPencil(pencilType))
  {
    this.selectPaintbrushTool();
    this.selectPencilPresets();
    this.selectPencilPreset(pencilType + " Pencil");
    return true;
  }
  else
  {
    return false;
  }
}

// Selects a Pencil Preset
CSToolManagerObj.prototype.selectPencilPreset = function(pencilType)
{
  CSGlobal.csDebug(2, "Selecting pencil tool preset: " + pencilType);
  var idslct = charIDToTypeID( "slct" );
  var desc24 = new ActionDescriptor();
  var idnull = charIDToTypeID( "null" );
  var ref12 = new ActionReference();
  var idtoolPreset = stringIDToTypeID( "toolPreset" );
  ref12.putName( idtoolPreset, pencilType );
  desc24.putReference( idnull, ref12 );
  executeAction( idslct, desc24, DialogModes.NO );
};

// Selects the Paintbrush Tool in Ps
CSToolManagerObj.prototype.selectPaintbrushTool = function()
{
  CSGlobal.csDebug(2, "Selecting paintbrush tool.");
  var idslct = charIDToTypeID( "slct" );
  var desc38 = new ActionDescriptor();
  var idnull = charIDToTypeID( "null" );
  var ref23 = new ActionReference();
  var idPbTl = charIDToTypeID( "PbTl" );
  ref23.putClass( idPbTl );
  desc38.putReference( idnull, ref23 );
  executeAction( idslct, desc38, DialogModes.NO );
};

// Selects the Ellipse Tool in Ps
CSToolManagerObj.prototype.selectEllipseTool = function()
{
  var idslct = charIDToTypeID( "slct" );
  var desc163 = new ActionDescriptor();
  var idnull = charIDToTypeID( "null" );
  var ref134 = new ActionReference();
  var idellipseTool = stringIDToTypeID( "ellipseTool" );
  ref134.putClass( idellipseTool );
  desc163.putReference( idnull, ref134 );
  var iddontRecord = stringIDToTypeID( "dontRecord" );
  desc163.putBoolean( iddontRecord, true );
  var idforceNotify = stringIDToTypeID( "forceNotify" );
  desc163.putBoolean( idforceNotify, true );
  executeAction( idslct, desc163, DialogModes.NO );
}

// Loads the Pencil Presets in Ps
CSToolManagerObj.prototype.selectPencilPresets = function()
{
  CSGlobal.csDebug(2, "Selecting pencil tool presets for paintbrush tool.");
  var idsetd = charIDToTypeID( "setd" );
  var desc49 = new ActionDescriptor();
  var idnull = charIDToTypeID( "null" );
  var ref34 = new ActionReference();
  var idPrpr = charIDToTypeID( "Prpr" );
  var idtoolPreset = stringIDToTypeID( "toolPreset" );
  ref34.putProperty( idPrpr, idtoolPreset );
  var idcapp = charIDToTypeID( "capp" );
  var idOrdn = charIDToTypeID( "Ordn" );
  var idTrgt = charIDToTypeID( "Trgt" );
  ref34.putEnumerated( idcapp, idOrdn, idTrgt );
  desc49.putReference( idnull, ref34 );
  var idT = charIDToTypeID( "T   " );
  desc49.putPath( idT, new File( "/Applications/Adobe Photoshop CS6/Presets/Tools/Pencil Brushes.tpl" ) );
  executeAction( idsetd, desc49, DialogModes.NO );
}
