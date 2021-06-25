function MarkGridNudge()
{
  MarkGrid.call(this);
};

MarkGridNudge.prototype = new MarkGrid();
MarkGridNudge.prototype.constructor = MarkGridNudge;

MarkGridNudge.prototype.doRules = function(canvas, coordinate)
{
  MarkGrid.prototype.doRules.call(this, canvas, coordinate);
  
  if (typeof(canvas.lastFragment) != 'undefined' && (canvas.lastFragment instanceof Fragment))
  {
    var lastBounds = canvas.lastFragment.getBounds();
    /* Is this moved to its coordinate already? */
    var thisBounds = this.getFragment().getBounds();
    
    var lastBoundsRight = UnitValue(new Number(lastBounds[2]), CSGlobal.getData('applicationUnitsString'));
    var thisBoundsLeft = UnitValue(new Number(thisBounds[0]), CSGlobal.getData('applicationUnitsString'));

    var lastBoundsTop = UnitValue(new Number(lastBounds[1]), CSGlobal.getData('applicationUnitsString'));
    var thisBoundsTop = UnitValue(new Number(thisBounds[1]), CSGlobal.getData('applicationUnitsString'));
    
    /* Are we on same row still. Remember, this is only nudging fragments in X axis, horizontally. */
    if (lastBoundsTop == thisBoundsTop)
    {
      CSGlobal.csDebug(2, "Last fragment bounds: " + lastBoundsRight + " " + thisBoundsLeft);
      canvas.getRenderer().translate(this, (lastBoundsRight - thisBoundsLeft), 0);
    }
  }
};
