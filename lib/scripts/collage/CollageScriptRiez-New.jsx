//@include "../../Include.js";

var APPLICATION_ROOT = '/Users/calhoun/Work/Riez';

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
canvas.setName('riez-0xx-black-yellow-blue-orange.psd');

//5 rows
//canvas.setWidth(112);//112 76%
//canvas.setHeight(37);//162

//kaalstaart
//canvas.setWidth(31);//112 76%
//canvas.setHeight(31);//162
//canvas.setCanvasOffset(2);

//fair
canvas.setWidth(36);//112 76%
canvas.setHeight(36);//162
canvas.setCanvasOffset(5);

//final
//canvas.setWidth(102);//112 76%
//canvas.setHeight(102);//162
//canvas.setCanvasOffset(6);

canvas.setApplyRemainder(true)
canvas.setGridGutter(0);
canvas.setGridSize(5);

try
{
  canvas.initCanvas();
  //canvas.setSwatchShuffle(true);
  canvas.setUsingRandomCoordinate(true);

  var series = new MarkSeriesRGB();
  series.addRenderer(renderer);
  series.setPalette(new PaletteFolder(APPLICATION_ROOT+'/smobs-brown'));
  series.addPalette(new PaletteFolder(APPLICATION_ROOT+'/smobs-yellow'));
  series.addPalette(new PaletteFolder(APPLICATION_ROOT+'/smobs-blue'));
  series.addPalette(new PaletteFolder(APPLICATION_ROOT+'/smobs-orange'));
  canvas.markAll(series);
}
catch (e)
{
  $.writeln(e.message);
}

renderer.setEnableNotifiers(false);