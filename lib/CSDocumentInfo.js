function CSDocumentInfo(canvas)
{  
  this.properties = {};
  this.validProperties = ['a','cx','cy','CSLastFragmentRotation','CSSubSequenceHead'];
  
  // Do this last!
  this.setCanvas(canvas);
};

CSDocumentInfo.IPTCFIELD = 'instructions';
CSDocumentInfo.KEYVALUE_SEPARATOR = ":";
CSDocumentInfo.PROPERTY_SEPARATOR = ";";

CSDocumentInfo.prototype.getCanvas = function()
{
  return this.canvas;
};

CSDocumentInfo.prototype.setCanvas = function(canvas)
{
  if (typeof(canvas) == 'undefined')
  {
    throw new CollageException("You must provide a Canvas object to use document info.");
  }
  
  if (!(canvas instanceof Canvas))
  {
    throw new CollageException("An object of type Canvas must be provided to use document info.");
  }
  
  CSGlobal.csDebug(2, "Setting canvas " + canvas.getCanvas().name + " in document info object.")
  this.canvas = canvas;
    
  this.getCanvas().getRenderer().loadProperties(this);
};

CSDocumentInfo.prototype.addProperties = function(additionalProperties)
{
  if (typeof(this.canvas) == 'undefined')
  {
    throw new CollageException("You must have already set a Canvas object to add properties.");
  }
  
  if (typeof(additionalProperties) != 'undefined' && additionalProperties.constructor == Array)
  {
    CSGlobal.csDebug(2, "Adding additional properties to document info: " + additionalProperties);
    this.validProperties = this.validProperties.concat(additionalProperties);
    return true;
  }
  return false;
};

CSDocumentInfo.prototype.confirmSet = function()
{
  var msg = this.getCanvasPropertyValues();
  msg += "\nSet and write them? You will still need to save the document."
  if (confirm(msg))
  {
    // Transfers properties from canvas to document info object
    this.setProperties();
    // Write from document info object to app.document.info.instructions metadata field
    this.getCanvas().getRenderer().writeProperties(this);
  }
}

CSDocumentInfo.prototype.getInfoPropertyValues = function()
{
  var msg = "Current loaded properties:";
  var properties = this.getProperties();
  if (properties.constructor == Object)
  {
    for (var prop in properties)
    {
      msg += "\n" + new String(prop) + " : " + new String(properties[prop]);
    }
  }
  return msg;
}

CSDocumentInfo.prototype.getCanvasPropertyValues = function()
{
  var msg = "Properties from  " + this.getCanvas().constructor.name + ":";
  for (p = 0; p < this.validProperties.length; p++)
  {
    msg += "\n" + new String(this.validProperties[p]) + " : " + this.canvas[this.validProperties[p]];
  }
  return msg;
}

CSDocumentInfo.prototype.getProperty = function(property)
{
  if (typeof(this.properties) != 'undefined' && typeof(this.properties[property]) != 'undefined' && this.properties[property] != 'undefined')
  {
    return this.properties[property];
  }
  else
  {
    return false;
  }
}

CSDocumentInfo.prototype.setProperty = function(property, propertyValue)
{
  if (typeof(this.properties) == 'undefined')
    this.properties = {};
  
  if (typeof(property) == 'undefined')
  {
    throw new CollageException("Property argument is undefined. Cannot set document info.");
  }
  
  if (!(this.isValidProperty(property)))
  {
    CSGlobal.csDebug(2, property + " is not a valid property.");
    return false;
  } 

  this.properties[property] = new String(propertyValue);
  return true;
}

CSDocumentInfo.prototype.getProperties = function()
{
  return this.properties;
}

CSDocumentInfo.prototype.setProperties = function()
{
  for (p = 0; p < this.validProperties.length; p++)
  {
    if (this.canvas.hasOwnProperty(this.validProperties[p]))
    {
      CSGlobal.csDebug(2, "Setting " + this.validProperties[p] + " from PSD " + this.getCanvas().getCanvas().name + ": " + this.getCanvas()[this.validProperties[p]]);
      this.setProperty(this.validProperties[p], this.getCanvas()[this.validProperties[p]]);
    }
    else
    {
      var tmp = this.getCanvas().getRenderer().getOption(this.validProperties[p]);
      if (tmp)
      {
        CSGlobal.csDebug(2, "Setting " + this.validProperties[p] + " from " + this.getCanvas().getRenderer().constructor.name + ": " + tmp);
        this.setProperty(this.validProperties[p], tmp);
      }
    }
  }
}

CSDocumentInfo.prototype.isValidProperty = function(propertyName)
{
  return this.validProperties.inArray(propertyName);
}
