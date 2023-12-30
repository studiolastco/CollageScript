#include "../../Include.js";

var APPLICATION_ROOT = '/Users/calhoun/Work/POI-alphabet';

var renderer = new RendererPhotoshop();
renderer.setConfig(new RendererPhotoshopConfig());
renderer.init();

var canvas = new CanvasGrid();
canvas.withConfirm = true;
canvas.setRenderer(renderer);
canvas.setDebugLevel(1);
CSGlobal.registerCanvas(canvas);

canvas.setCanvasRoot(APPLICATION_ROOT);
canvas.setName('aaa-printsheet-a4.psd');
canvas.setResolution(30);
canvas.setHeight(60);
canvas.setWidth(60);
canvas.setCanvasOffset(1);
canvas.setApplyRemainder(true)
canvas.setGridGutter(0);
canvas.setGridGutterX(0);
//canvas.setGridSizeX(10);
canvas.setGridSizeY(6.18);
canvas.setGridSizeX(4);

try
{
  canvas.initCanvas();
  //canvas.setSwatchShuffle(true);
  canvas.setUsingRandomCoordinate(false);

  var m = new MarkGridNudge();
  m.setRenderer(renderer);
  m.setPalette(new PaletteFolder(APPLICATION_ROOT+'/smobs-a'));
  canvas.markAll(m, true);
}
catch (e)
{
  $.writeln(e.message);
}

renderer.setEnableNotifiers(false);