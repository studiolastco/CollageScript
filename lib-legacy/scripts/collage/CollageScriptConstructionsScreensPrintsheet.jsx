﻿#include "../../Include.js";var APPLICATION_ROOT = '/Users/calhoun/Work/Constructions/Constructions-garage-002';var renderer = new RendererPhotoshop();renderer.setConfig(new RendererPhotoshopConfig());renderer.init();var canvas = new CanvasGrid();canvas.withConfirm = false;canvas.setRenderer(renderer);canvas.setDebugLevel(1);CSGlobal.registerCanvas(canvas);//canvas.statistics = new CSCanvasStatistics(canvas);canvas.setCanvasRoot(APPLICATION_ROOT);canvas.setName('aaa-printsheet.psd');canvas.setWidth(29.7); //A3canvas.setHeight(42);canvas.setCanvasOffset(1);canvas.setApplyRemainder(true)canvas.setGridGutter(0);canvas.setGridSize(4);try{  canvas.initCanvas();  //canvas.setSwatchShuffle(true);  //canvas.setUsingRandomCoordinate(false);    var m = new MarkGrid();  m.setRenderer(renderer);  m.setPalette(new PaletteFolder(APPLICATION_ROOT+'/smobs-brown-brown'));  /*m.addPalette(new PaletteFolder(APPLICATION_ROOT+'/smobs-brown-ltbrown'));*/  canvas.markAll(m);}catch (e){   $.writeln(e.message);}renderer.setEnableNotifiers(false);