function MarkSeriesPole()
{
  MarkSeries.call(this);
};

MarkSeriesPole.prototype = new MarkSeries();
MarkSeriesPole.prototype.constructor = MarkSeriesPole;

MarkSeriesPole.prototype.initPole = function(palette, renderer)
{
  //var p = new Palette();
  //CSGlobal.csDebug(2, "Getting palette " + palette + " for " + this.constructor.name);
  //this.palette = p.factory(palette);
  //this.setPalette(palette);
  //var swatches = palette.loadSwatches();
  for (var x = 0; x < palette.getSwatches().length; x++)
  {
    m = new MarkPole();
    m.setRenderer(renderer);
    m.setPalette(palette);
    m.setFragmentByKey(x);
    this.addMark(m);
  }
}