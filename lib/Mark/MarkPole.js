function MarkPole()
{
  Mark.call(this);
};

MarkPole.prototype = new Mark();
MarkPole.prototype.constructor = MarkPole;

MarkPole.prototype.doRules = function(canvas, coordinate)
{
  canvas.getRenderer().toCoordinate(this, coordinate);
  
  // rotate
  /*var a = this.getFragment().getProperty('a');
  if (a !== false)
  {
    a = a + 90;
    this.rotate(a, coordinate);
  }*/
};