#include "../../Include.js";

var APPLICATION_ROOT = '/Users/calhoun/Work/drainpipes/drain-001';

var renderer = new RendererPhotoshop();
renderer.setConfig(new RendererPhotoshopConfig());
renderer.init();

var canvas = new CanvasGrid();
canvas.withConfirm = true;
canvas.setRenderer(renderer);
canvas.setDebugLevel(1);
CSGlobal.registerCanvas(canvas);

canvas.setCanvasRoot(APPLICATION_ROOT);
canvas.setName('aaa-printsheet.psd');
canvas.setResolution(300);
canvas.setHeight(29.7); //A3
canvas.setWidth(42);
canvas.setCanvasOffset(0);
canvas.setApplyRemainder(true)
canvas.setGridGutter(0);
canvas.setGridSizeX(10);
canvas.setGridSizeY(2.6);

try
{
  canvas.initCanvas();
  //canvas.setSwatchShuffle(true);
  canvas.setUsingRandomCoordinate(false);

  var m = new MarkGrid();
  m.setRenderer(renderer);
  m.setPalette(new PaletteFolder(APPLICATION_ROOT+'/smobs'));
  canvas.markAll(m);
}
catch (e)
{
  $.writeln(e.message);
}

renderer.setEnableNotifiers(false);