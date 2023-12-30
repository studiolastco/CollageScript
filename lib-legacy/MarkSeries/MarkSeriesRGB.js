function MarkSeriesRGB()
{
  MarkSeries.call(this);
  this.init();
};

MarkSeriesRGB.prototype = new MarkSeries();
MarkSeriesRGB.prototype.constructor = MarkSeriesRGB;

MarkSeriesRGB.prototype.init = function()
{
  var m = new MarkRGBCorner();
  var m2 = new MarkRGBCorner2();
  var m3 = new MarkRGBCorner3();
  var m4 = new MarkRGBCorner4();
  
  this.addMark(m);
  this.addMark(m2);
  this.addMark(m3);
  this.addMark(m4);
};
