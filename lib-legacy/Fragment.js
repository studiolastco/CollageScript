function Fragment(renderer)
{
  if (typeof(renderer) == 'undefined' || !(renderer instanceof Renderer))
  {
    throw new CollageException("You must provide a renderer to Fragment constructor.");
  }
  
  this.fragmentName;
  this.fragmentKey;
  this.fragmentLayer;
  this.fragmentDocument;
  this.fragmentProperties = {};
  this.validKeywords = ['a','cx','cy','CSLastFragmentRotation','CSSubSequenceHead'];
  
  this.setRenderer(renderer);
};

Fragment.prototype.getRenderer = function()
{
  return this.renderer;
};

Fragment.prototype.setRenderer = function(renderer)
{
  if (!(renderer instanceof Renderer))
  {
    throw new CollageException('Fragment.setRenderer: Renderer argument is not a valid Renderer object.');
  }
  this.renderer = renderer;
};

/*Fragment.prototype.factory = function(canvasDocument, x)
{
  if (typeof(canvasDocument) == 'undefined' || !(canvasDocument instanceof Document))
  {
    throw new CollageException("Canvas argument is not a Document object.");
  }
  if (typeof(x) == 'undefined' || x.constructor != Number)
  {
    throw new CollageException("Key argument is not a number object.");
  }
  
  var tmp = new Fragment();
  tmp.setKey(x);
  tmp.setFragmentDocument(canvasDocument);
  tmp.setFragmentLayer(tmp.getFragmentDocument().artLayers[tmp.getKey()]);
  return tmp;
};*/

Fragment.prototype.getFragmentName = function()
{
  return this.fragmentName;
};

Fragment.prototype.setFragmentName = function(m, quad)
{
  CSGlobal.csDebug(2, "Naming fragment: " + m.name + " " + quad);
  this.fragmentName = this.getRenderer().nameFragment(m, this, quad);
};

Fragment.prototype.getFragmentLayer = function()
{
  return this.fragmentLayer;
};

Fragment.prototype.loadBounds = function()
{
  this.setBounds(this.getBounds());
}

Fragment.prototype.setFragmentLayer = function(fragmentLayer)
{
  this.fragmentLayer = fragmentLayer;
  this.loadBounds();
};

Fragment.prototype.getBounds = function()
{
  return this.getRenderer().getAssetBounds(this)
}

Fragment.prototype.remove = function()
{
  return this.getRenderer().remove(this)
}

Fragment.prototype.hide = function()
{
  return this.getRenderer().hide(this)
}

Fragment.prototype.show = function()
{
  return this.getRenderer().show(this)
}

Fragment.prototype.getFragmentDocument = function()
{
  return this.fragmentDocument;
};

Fragment.prototype.setFragmentDocument = function(fragmentDocument)
{
  this.fragmentDocument = fragmentDocument;
  CSGlobal.csDebug(2, "Fragment document set: " + this.fragmentDocument);
  //this.loadKeywords(this.getRenderer());
  this.getRenderer().loadKeywords(this);
};

Fragment.prototype.getKey = function()
{
  return this.fragmentKey;
};

Fragment.prototype.setKey = function(fragmentKey)
{
  this.fragmentKey = fragmentKey;
};

Fragment.prototype.getDocumentName = function()
{
  return this.getFragmentDocument();
};

Fragment.prototype.getLayerName = function()
{
  return this.getFragmentLayer().name;
};

Fragment.prototype.isBackground = function()
{
  return this.getFragmentLayer().isBackgroundLayer;
};

Fragment.prototype.setVisibility = function(visible)
{
  if (typeof(visible) != 'undefined' && visible.constructor == Boolean)
  {
    this.getFragmentLayer().visible = visible;
    return true;
  }
  return false;
};

/* Should be provided an array as argument with following structure. This will come from the Renderer Object */
/* array('topx','topy','bottomx','bottomy') */
Fragment.prototype.setBounds = function(fragmentBounds)
{
  CSGlobal.csDebug(2,"Setting fragment bounds.");
  
  if (typeof(fragmentBounds) == 'undefined' || !(fragmentBounds instanceof Array))
  {
    throw new CollageException('Fragment bounds argument is not an array.');
  }

  var g = new Geometry();
  this.fragmentProperties.top = new Coordinate(new Number(fragmentBounds[0]),new Number(fragmentBounds[1]));
  this.fragmentProperties.bottom = new Coordinate(new Number(fragmentBounds[2]),new Number(fragmentBounds[3]));
  this.fragmentProperties.width = (this.fragmentProperties.bottom.getX() - this.fragmentProperties.top.getX());
  this.fragmentProperties.height = (this.fragmentProperties.bottom.getY() - this.fragmentProperties.top.getY());
  this.fragmentProperties.center = g.getCenterCoordinateRectangle(this.fragmentProperties.top, this.fragmentProperties.bottom);
};

Fragment.prototype.getProperty = function(property)
{
  if (typeof(this.fragmentProperties) != 'undefined' && typeof(this.fragmentProperties[property]) != 'undefined')
  {
    return this.fragmentProperties[property];
  }
  else
  {
    return false;
  }
};

Fragment.prototype.setKeyword = function(keyword, keywordValue)
{
  if (this.isValidKeyword(keyword) && typeof(keywordValue) != 'undefined')
  {
    this.fragmentProperties[keyword] = keywordValue;
  }
};

Fragment.prototype.getKeyword = function(keywordName)
{
  var keywords = this.getKeywords();
  if (typeof(keywords[keywordName]) != 'undefined')
  {
    return keywords[keywordName];
  }
  else
  {
    return false;
  }
};

Fragment.prototype.getKeywords = function()
{
  var result = {};
  for (var x = 0; x < this.validKeywords.length; x++)
  {
    var keywordName = this.validKeywords[x];
    if (this.isValidKeyword(keywordName) && typeof(this.getProperty(keywordName)) !== false)
    {
      result[keywordName] = this.getProperty(keywordName);
    }
  }
  return result;
};

Fragment.prototype.isValidKeyword = function(keywordName)
{
  return this.validKeywords.inArray(keywordName);
};

Fragment.prototype.getWidth = function()
{
  return this.getProperty('width');
};

Fragment.prototype.getHeight = function()
{
  return this.getProperty('height');
};
