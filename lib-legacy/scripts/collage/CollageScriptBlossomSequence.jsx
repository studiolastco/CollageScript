﻿#include "../../Include.jsx";CSGlobal.setDebugLevel(1);var APPLICATION_ROOT = '/Users/calhoun/Work/Blossom';var canvas = new CanvasGrid();CSGlobal.registerCanvas(canvas);canvas.setCanvasRoot(APPLICATION_ROOT);canvas.setName('boo.psd');canvas.setWidth(90); //185canvas.setHeight(45); //42canvas.setCanvasOffsetX(0);canvas.setCanvasOffsetY(0);canvas.setGridGutter(0);canvas.setGridSize(5);//canvas.setGridSizeY(6);try{  canvas.initCanvas();  //canvas.setSwatchShuffle(false);  //canvas.setUsingRandomCoordinate(false);    var m = new MarkGrid();  m.setPalette(APPLICATION_ROOT+'/smobs-full-white');  m.addPalette(APPLICATION_ROOT+'/smobs-full-orange');  //m.addPalette(APPLICATION_ROOT+'/smobs-angle-white-dark');  //m.addPalette(APPLICATION_ROOT+'/smobs-angle-orange-dark');  canvas.markAll(m);}catch (e){  $.writeln(e.message);}CSGlobal.setEnableNotifiers(false);