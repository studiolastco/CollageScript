﻿#include "../../Include.jsx";CSGlobal.setDebugLevel(2);var myDocument = app.activeDocument;var canvas = new CanvasGridRGB();CSGlobal.registerCanvas(canvas);  try{  canvas.setCanvas(myDocument);  canvas.addDrawingLayer('pencildrawing');  CSToolManager.selectRandomPencil();  CSToolManager.setForegroundColorWhite();  canvas.getDrawingLayer('pencildrawing');  for (p = 0; p < canvas.getCanvas().pathItems.length; p++)  {    canvas.getCanvas().pathItems[p].strokePath(ToolType.BRUSH);    var choice = getRandomInt(1,100);    if (choice > 50)    {      // This also 'sharpens' the pencil if it chooses the same one;      CSToolManager.selectRandomPencil();      CSToolManager.setForegroundColorWhite();    }  }}catch (e){  CSGlobal.csDebug(1,e.message);}