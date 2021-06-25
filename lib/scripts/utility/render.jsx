﻿var PROJECTDIR = '/Users/cal/Work/Stichtseweg';var TARGETRESOLUTION = 300;//var NEWSRCDIR = '/Users/cal/Work/Stichtseweg/pole-001';//var FFORMAT = 'JPG';var myDocument = app.activeDocument;var thePath = myDocument.path;CSGlobal.csDebug(1,'Active Document: ' + myDocument);if (myDocument.resolution != TARGETRESOLUTION){    stopScript(myDocument.name + ' is not ' + TARGETRESOLUTION + ' dpi. Stopping.');}for (var j = 0; j < myDocument.artLayers.length; j++)   {  myDocument.activeLayer = myDocument.artLayers[j];  var theLayer = myDocument.artLayers[j];  CSGlobal.csDebug(1,'Active Layer: ' + theLayer.name);  CSGlobal.csDebug(1,'Typename: ' + theLayer.kind);      if (theLayer.kind == LayerKind.SMARTOBJECT)  {       var compositeFilename = PROJECTDIR + '/' + theLayer.name + '.psd';       CSGlobal.csDebug(1,'Composite Filename: ' + compositeFilename);       theLayer = replaceContents(compositeFilename);       var smartDocument = openSmartObject (theLayer);       smartDocument.resizeImage(smartDocument.width, smartDocument.height, TARGETRESOLUTION, ResampleMethod.BICUBIC);       setBackgroundToInvisible(smartDocument);       smartDocument.mergeVisibleLayers();       smartDocument.close(SaveOptions.SAVECHANGES);          delete smartDocument;       app.activeDocument = myDocument;  }}function stopScript(message){    CSGlobal.csDebug(1,message);    throw new Error(message);}////// see http://forums.adobe.com/message/3946520 /////  ////// also http://www.ps-scripts.com/bb/viewtopic.php?f=9&t=4513////// http://www.ps-scripts.com/bb/viewtopic.php?p=20406////// replace contents //////function replaceContents (newFileName) {// =======================================================var idplacedLayerReplaceContents = stringIDToTypeID( "placedLayerReplaceContents" );    var desc3 = new ActionDescriptor();    var idnull = charIDToTypeID( "null" );    desc3.putPath( idnull, new File( newFileName ) );    //var idPgNm = charIDToTypeID( "PgNm" );    //desc3.putInteger( idPgNm, 1 );executeAction( idplacedLayerReplaceContents, desc3, DialogModes.NO);return app.activeDocument.activeLayer};function openSmartObject (theLayer){   if (theLayer.kind == "LayerKind.SMARTOBJECT")   {      var idplacedLayerEditContents = stringIDToTypeID( "placedLayerEditContents" );      var desc2 = new ActionDescriptor();      // why does this line here throw errors sometimes, and sometimes not.      executeAction( idplacedLayerEditContents, desc2, DialogModes.NO );   };   return app.activeDocument};function setBackgroundToInvisible(theDocument){    for (var j = 0; j < theDocument.artLayers.length; j++)      {      theDocument.activeLayer = theDocument.artLayers[j];      var theLayer = theDocument.artLayers[j];      if (theLayer.isBackgroundLayer)      {          theLayer.visible = false;      }    }    theDocument.activeLayer = theDocument.artLayers[0];};