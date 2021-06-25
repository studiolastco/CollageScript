function MarkSeriesBlossomcolors()
{
  MarkSeries.call(this);
  this.init();
};

MarkSeriesBlossomcolors.prototype = new MarkSeries();
MarkSeriesBlossomcolors.prototype.constructor = MarkSeriesBlossomcolors;

MarkSeriesBlossomcolors.prototype.init = function()
{
  var m1 = new MarkBlossomcolor1();
  var m2 = new MarkBlossomcolor2();
  var m3 = new MarkBlossomcolor3();
  var m4 = new MarkBlossomcolor4();
  var m5 = new MarkBlossomcolor5();
  
  this.addMark(m1);
  this.addMark(m2);
  this.addMark(m3);
  this.addMark(m4);
  this.addMark(m5);
}
