function CanvasGridRGBScatter()
{
  CanvasGridRGB.call(this);
};

//CanvasGridRGBScatter.inherit(CanvasGridRGB);
CanvasGridRGBScatter.prototype = new CanvasGridRGB();
CanvasGridRGBScatter.prototype.constructor = CanvasGridRGBScatter;

CanvasGridRGBScatter.prototype.markAll = function(m)
{
  if (!(m instanceof Mark) && !(m instanceof MarkSeries))
  {
    throw new CollageException('Mark argument is not a valid Mark or MarkSeries object.');
  }
  
  if (m instanceof Mark)
  {
    var markArray = new Array(m);
  }
  
  if (m instanceof MarkSeries)
  {
    var markArray = m.marks;
  }
  
  var coordinateArray = this.getCoordinateArray();

  var steps = new Array();
  for (var j = 0; j < coordinateArray.length; j++)
  {
    for (var k = 0; k < markArray.length; k++)
    {
      steps.push({coord:coordinateArray[j], mark:markArray[k]});
    }
  }
  var tmp = new MarkSeries();
  steps = tmp.shuffle(steps);
  
  for (var j = 0; j < steps.length; j++)
  {
    this.mark(steps[j].mark, steps[j].coord);
  }
}
