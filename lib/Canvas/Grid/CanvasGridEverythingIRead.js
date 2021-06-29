function CanvasGridEverythingIRead()
{
  CanvasGrid.call(this);
  this.tekst;
  this.margin = [0,0,0,0];
  this.halign = 'center';
  this.valign = 'center';
  this.separationChar = '|';
  
  this.index;
  this.indexPath;
  this.indexFile;
  this.indexFileReference;
};

//CanvasGridEverythingIRead.inherit(CanvasGrid);
CanvasGridEverythingIRead.prototype = new CanvasGrid();
CanvasGridEverythingIRead.prototype.constructor = CanvasGridEverythingIRead;


/*CanvasGridEverythingIRead.prototype.getIndex = function()
{
  this.indexPath = this.getCanvasRoot()+'/eir-index.txt';
  CSGlobal.csDebug(1,'Using index file: ' + this.indexPath);
  this.indexFile = new File(this.indexPath);
  this.indexFileReference = this.indexFile.open('r');
  this.index = eval(this.indexFile.read());
  CSGlobal.csDebug(1,'Read: ' + this.index);
};*/

CanvasGridEverythingIRead.prototype.getTekst = function(tekst)
{
  if (typeof(tekst) != 'undefined')
  {
    return this.tekst;
  }
  else
  {
    CSGlobal.csDebug(1,"No tekst set for canvas.", 2);
    return '';
  }
};

CanvasGridEverythingIRead.prototype.setTekst = function(tekst)
{
  if (typeof(tekst) != 'undefined')
  {
    if (tekst.constructor == String)
    {
      this.tekst = tekst.trim();
      //this.tekst = this.tekst.split(this.separationChar);
      return true;
    }
  }
  return false;
};
