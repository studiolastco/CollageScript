﻿#include "../../Include.jsx";CSGlobal.setDebugLevel(1);var APPLICATION_ROOT = '/Users/calhoun/Work/Tanguy';var canvas = new CanvasGridSequence();CSGlobal.registerCanvas(canvas);canvas.setCanvasRoot(APPLICATION_ROOT);canvas.setName('boo.psd');canvas.setWidth(29.7); //185canvas.setHeight(42); //42canvas.setCanvasOffsetX(0);canvas.setCanvasOffsetY(0);canvas.setGridGutter(0);canvas.setGridSize(4.3);canvas.setGridSizeY(19);try{  canvas.initCanvas();  //canvas.setSwatchShuffle(false);  //canvas.setUsingRandomCoordinate(false);    var m = new MarkGrid();  m.setPalette(APPLICATION_ROOT+'/smobs-tanguy');  canvas.markAll(m);}catch (e){  $.writeln(e.message);}CSGlobal.setEnableNotifiers(false);