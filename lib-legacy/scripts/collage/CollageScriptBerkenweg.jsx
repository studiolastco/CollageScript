﻿#include "../../Include.jsx";CSGlobal.setDebugLevel(1);var APPLICATION_ROOT = '/Users/calhoun/Work/Berkenweg';var canvas = new CanvasGridSequence();CSGlobal.registerCanvas(canvas);canvas.setCanvasRoot(APPLICATION_ROOT);canvas.setName('berkenweg-002.psd');canvas.setWidth(189); //185canvas.setHeight(125); //42canvas.setCanvasOffset(0);canvas.setGridGutter(0);canvas.setGridSize(15);//canvas.setGridSizeX(7);canvas.setGridSizeY(3.3);try{  canvas.initCanvas();    //var m = new MarkGrid();  var m = new MarkGrid();  m.setPalette(APPLICATION_ROOT+'/smobs-middle');  //m.addPalette(APPLICATION_ROOT+'/smobs-middle');  //m.addPalette(APPLICATION_ROOT+'/smobs-bottom');  canvas.markAll(m);}catch (e){  $.writeln(e.message);}CSGlobal.setEnableNotifiers(false);