function MarkSeriesGrid()
{
  MarkSeries.call(this);
  this.init();
};

MarkSeriesGrid.prototype = new MarkSeries();
MarkSeriesGrid.prototype.constructor = MarkSeriesGrid;

MarkSeriesGrid.prototype.init = function()
{

}

MarkSeriesGrid.prototype.setPaletteCluster = function(paletteCluster)
{
  //Overload, call parent, then finish by adding marks in series based on length of palette cluster
  MarkSeries.prototype.setPaletteCluster.call(this, paletteCluster);
  
  for (var x = 0; x < this.getPaletteCluster().length; x++)
  {
    this.addMark(new MarkGrid());
  }
}