#include "../../Include.js";

var APPLICATION_ROOT = '/Users/calhoun/Work';

var renderer = new RendererPhotoshop();
renderer.setConfig(new RendererPhotoshopConfig());
renderer.init();

var canvas = new CanvasGridRGB();
canvas.withConfirm = true;
canvas.setRenderer(renderer);
canvas.setDebugLevel(1);
CSGlobal.registerCanvas(canvas);

//canvas.statistics = new CSCanvasStatistics(canvas);

canvas.setCanvasRoot(APPLICATION_ROOT);
canvas.setName('study.psd');
canvas.setWidth(30); //A3
canvas.setHeight(30);
canvas.setCanvasOffset(1);
canvas.setApplyRemainder(true)
canvas.setGridGutter(0);
canvas.setGridSize(4.5);

try
{
  canvas.initCanvas();
  //canvas.setSwatchShuffle(true);
  canvas.setUsingRandomCoordinate(true);

  var series = new MarkSeriesRGB();
  series.addRenderer(renderer);
  series.setPalette(new PaletteFolder(APPLICATION_ROOT+'/white-wood-smobs'));
  //series.addPalette(new PaletteFolder(APPLICATION_ROOT+'/smobs-rust'));
  canvas.markAll(series);
}
catch (e)
{
  $.writeln(e.message);
}

renderer.setEnableNotifiers(false);