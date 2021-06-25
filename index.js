let Canvas =  require('./lib/Canvas.js');
let CanvasGrid =  require('./lib/Canvas/CanvasGrid.js');

//var APPLICATION_ROOT = '/Users/calhoun/Work/Riez';

/* Choosing to render to a Photoshop file */
/*var renderer = new RendererPhotoshop();
renderer.setConfig(new RendererPhotoshopConfig());
renderer.init();*/
console.log('boo');
/* Choose a canvas type then set some properties */
let canvas = new CanvasGrid();
/*canvas.setRenderer(renderer);
canvas.setDebugLevel(1);
CSGlobal.registerCanvas(canvas);
canvas.setCanvasRoot(APPLICATION_ROOT);
canvas.setName('my-big-ps-file.psd');
canvas.setWidth(102);
canvas.setHeight(102);
canvas.setCanvasOffset(6);
canvas.setApplyRemainder(true)
canvas.setGridGutter(0);
canvas.setGridSize(5);*/

/* Let the building begin. */
/*try
{
  canvas.initCanvas();
  canvas.setUsingRandomCoordinate(true);

  var series = new MarkSeriesRGB();
  series.addRenderer(renderer);
  series.setPalette(new PaletteFolder(APPLICATION_ROOT+'/smobs-brown'));
  series.addPalette(new PaletteFolder(APPLICATION_ROOT+'/smobs-yellow'));
  series.addPalette(new PaletteFolder(APPLICATION_ROOT+'/smobs-orange'));
  canvas.markAll(series);
}
catch (e)
{
  $.writeln(e.message);
}*/
