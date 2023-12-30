//@include '../../Include.js';

CSGlobal.setDebugLevel(1);

var APPLICATION_ROOT = '/Users/calhoun/Work/Riez';

var canvas = new CanvasGridRGB();
CSGlobal.registerCanvas(canvas);

canvas.setCanvasRoot(APPLICATION_ROOT);
canvas.setName('riez-006-orange.psd');

//5 rows
//canvas.setWidth(112);//112 76%
//canvas.setHeight(37);//162

//kaalstaart
//canvas.setWidth(31);//112 76%
//canvas.setHeight(31);//162
//canvas.setCanvasOffset(2);

//final
canvas.setWidth(112);//112 76%
canvas.setHeight(112);//162
canvas.setCanvasOffset(4);

//canvas.setApplyRemainder(false)
canvas.setGridGutter(0);
canvas.setGridSize(5);

try
{
  canvas.initCanvas();
  
  var series = new MarkSeriesRGB();
  series.setPalette(APPLICATION_ROOT+'/smobs-brown');
  series.addPalette(APPLICATION_ROOT+'/smobs-blue');
  //series.addPalette(APPLICATION_ROOT+'/smobs-orange');
  //series.addPalette(APPLICATION_ROOT+'/smobs-blue');
  //series.addPalette(APPLICATION_ROOT+'/smobs-black');
  //series.addPalette(APPLICATION_ROOT+'/smobs-orange');
  
  //series.addPalette(APPLICATION_ROOT+'/smobs-brown');
  //series.addPalette(APPLICATION_ROOT+'/smobs-yellow');
  //series.addPalette(APPLICATION_ROOT+'/smobs-grey');
  //series.addPalette(APPLICATION_ROOT+'/smobs-blue');
  //series.addPalette(APPLICATION_ROOT+'/smobs-black');
  //series.addPalette(APPLICATION_ROOT+'/smobs-orange');
   
  canvas.markAll(series);
}
catch (e)
{
  $.writeln(e.message);
}

CSGlobal.setEnableNotifiers(false);
