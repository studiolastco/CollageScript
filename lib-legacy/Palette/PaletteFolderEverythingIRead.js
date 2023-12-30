function PaletteFolderEverythingIRead(palettePath)
{
  PaletteFolder.call(this, palettePath);
  this.fragmentArray = [];
  this.hueLow = 0;
  this.hueHigh = 360;
  this.saturationLow = 0;
  this.saturationHigh = 100;
  this.saturationRange = [];
  this.brightnessLow = 0;
  this.brightnessHigh = 100;
  this.hueInclusive = true;
};

//PaletteFolderEverythingIRead.inherit(PaletteFolder);
PaletteFolderEverythingIRead.prototype = new PaletteFolder();
PaletteFolderEverythingIRead.prototype.constructor = PaletteFolderEverythingIRead;

PaletteFolderEverythingIRead.prototype.getFragmentRandom = function(m, quad)
{
  var f = new Fragment();
  f.setKey(Math.floor(Math.random() * this.fragmentArray.length));
  var tmp = new File(this.palettePath + "/" + this.fragmentArray[f.getKey()]);
  f.setFragmentDocument(app.open(tmp));
  f.setFragmentLayer(f.getFragmentDocument().artLayers[0]);
  f.loadBounds();
  f.setKey(0); // Is this necessary? Key for Folder-based palettes refer to file in folder. For single-file based palettes, it's the layer number in stack.
  return f;
};

PaletteFolderEverythingIRead.prototype.getHueHigh = function()
{
  return this.hueHigh;
}

PaletteFolderEverythingIRead.prototype.setHueHigh = function(hueHigh)
{
  if (hueHigh.constructor == Number && hueHigh >= 0 && hueHigh <= 360)
  {
    this.hueHigh = hueHigh;
  }
}

PaletteFolderEverythingIRead.prototype.getHueLow = function()
{
  return this.hueLow;
}

PaletteFolderEverythingIRead.prototype.setHueLow = function(hueLow)
{
  if (hueLow.constructor == Number && hueLow >= 0 && hueLow <= 360)
  {
    this.hueLow = hueLow;
  }
}

PaletteFolderEverythingIRead.prototype.getSaturationLow = function()
{
  return this.saturationLow;
}

PaletteFolderEverythingIRead.prototype.setSaturationLow = function(saturationLow)
{
  if (saturationLow.constructor == Number && saturationLow >= 0 && saturationLow <= 360)
  {
    this.saturationLow = saturationLow;
  }
}

PaletteFolderEverythingIRead.prototype.getSaturationHigh = function()
{
  return this.saturationHigh;
}

PaletteFolderEverythingIRead.prototype.setSaturationHigh = function(saturationHigh)
{
  if (saturationHigh.constructor == Number && saturationHigh >= 0 && saturationHigh <= 360)
  {
    this.saturationHigh = saturationHigh;
  }
}

PaletteFolderEverythingIRead.prototype.getBrightnessHigh = function()
{
  return this.brightnessHigh;
}

PaletteFolderEverythingIRead.prototype.setBrightnessHigh = function(brightnessHigh)
{
  if (brightnessHigh.constructor == Number && brightnessHigh >= 0 && brightnessHigh <= 360)
  {
    this.brightnessHigh = brightnessHigh;
  }
}

PaletteFolderEverythingIRead.prototype.getBrightnessLow = function()
{
  return this.brightnessLow;
}

PaletteFolderEverythingIRead.prototype.setBrightnessLow = function(brightnessLow)
{
  if (brightnessLow.constructor == Number && brightnessLow >= 0 && brightnessLow <= 360)
  {
    this.brightnessLow = brightnessLow;
  }
}

PaletteFolderEverythingIRead.prototype.setHueRange = function(low, high)
{
  this.setHueLow(low);
  this.setHueHigh(high);
};


PaletteFolderEverythingIRead.prototype.setSaturationRange = function(low, high)
{
  this.setSaturationLow(low);
  this.setSaturationHigh(high);
};


PaletteFolderEverythingIRead.prototype.setBrightnessRange = function(low, high)
{
  this.setBrightnessLow(low);
  this.setBrightnessHigh(high);
};

PaletteFolderEverythingIRead.prototype.setHueRange = function(low, high)
{
  if (low.constructor == Number && low >= 0 && low <= 360)
  {
    this.hueLow = low;
  }
  if (high.constructor == Number && high >= 0 && low <= 360)
  {
    this.hueHigh = high;
  }
};

PaletteFolderEverythingIRead.prototype.getFragmentArray = function(forceWrite)
{
  if (typeof(forceWrite) != 'Boolean')
  {
    forceWrite = new Boolean(false);
  }
  
  if (this.fragmentArray.length < 1 || forceWrite == true)
  {
    this.setFragmentArray(forceWrite);
  }

  return this.fragmentArray;
}

PaletteFolderEverythingIRead.prototype.setFragmentArray = function(forceWrite)
{
  CSGlobal.csDebug(1,'Setting fragment array:');
  
  this.fragmentArray = [];
  if (typeof(forceWrite) != 'Boolean')
  {
    forceWrite = new Boolean(false);
  }
  try
  {
    var indexFile = new File(this.palettePath + '/fragment-index.txt');
    if (!(indexFile.exists) || forceWrite == true)
    {
      this.writeFragmentIndex();
    }
    var result = indexFile.open('r');
    if (result)
    {
      while (!indexFile.eof)
      {
        var ln = indexFile.readln();
        var args = ln.split(';');
        
        var filename = new String(args[0]);
        filename = filename.trim();
        
        var allsets = new String(args[1]);
        allsets = allsets.trim();
        
        var sets = allsets.split(',');
        var passedSets = [];
        CSGlobal.csDebug(1,'-----------');
        CSGlobal.csDebug(1,filename);
        CSGlobal.csDebug(1,'set length: ' + sets.length);
        for(var j = 0; j < sets.length; j++)
        {
          var hsb = sets[j].split(':');
          var h = hsb[0];
          var s = hsb[1];
          var b = hsb[2];

          CSGlobal.csDebug(1,'set: ' + sets[j]);
          CSGlobal.csDebug(1,filename + " hue " + h + ', hue low: ' + this.getHueLow() + ' hue high: ' + this.getHueHigh());
          if (new Number(h) >= this.hueLow && new Number(h) <= this.hueHigh)
          {
            CSGlobal.csDebug(1,'hue passed.');
            CSGlobal.csDebug(1,filename + " sat " + s + ', sat low: ' + this.getSaturationLow() + ' sat high: ' + this.getSaturationHigh());
            if (new Number(s) >= this.getSaturationLow() && new Number(s) <= this.getSaturationHigh())
            {
              CSGlobal.csDebug(1,'sat passed.');
              CSGlobal.csDebug(1,filename + " bri " + b + ', bri low: ' + this.getBrightnessLow() + ' bri high: ' + this.getBrightnessHigh());
              if (new Number(b) >= this.getBrightnessLow() && new Number(b) <= this.getBrightnessHigh())
              {
                CSGlobal.csDebug(1,'bri passed.');
                passedSets.push(j);
              }
            }
          }
        }
        
        CSGlobal.csDebug(1,'Inclusive? ' + this.hueInclusive);
        CSGlobal.csDebug(1,'passed length: ' + passedSets.length);
        if (((this.hueInclusive) && passedSets.length >= 1) || (!(this.hueInclusive) && passedSets.length == sets.length))
        {
          CSGlobal.csDebug(1,'ADDED:'+filename);
          this.fragmentArray.push(filename);
        }
      }
    }
    indexFile.close();
    if (this.fragmentArray.length < 1)
    {
      throw new CollageException("No fragments found matching criteria. Stopping.");
    }
    CSGlobal.csDebug(1,'Fragments found: ' + this.fragmentArray.length);
  }
  catch (e)
  {
    throw new CollageException(e.message);
  }
};

PaletteFolderEverythingIRead.prototype.writeFragmentIndex = function()
{
  CSGlobal.csDebug(1,'Writing fragment index in: ' + this.palettePath);
  var indexFile = new File(this.palettePath + '/fragment-index.txt');
  var result = indexFile.open('w');
  if (!(result))
  {
    throw new CollageException("Unable to create fragment index " + this.palettePath);
  }
  
  for (var i = 0; i < this.swatches.length; i++)
  {
    var fRef = app.open(this.swatches[i]);
    var f = new Fragment();
    f.setFragmentDocument(fRef);
    f.setFragmentLayer(fRef.artLayers[0]);
    f.loadBounds();
    fRef.colorSamplers.removeAll();
    f.setColorSamplers();
    
    var s = '';
    s += Math.round(fRef.colorSamplers[0].color.hsb.hue);
    s += ':' + Math.round(fRef.colorSamplers[0].color.hsb.saturation);
    s += ':' + Math.round(fRef.colorSamplers[0].color.hsb.brightness);
    
    s += ',' + Math.round(fRef.colorSamplers[1].color.hsb.hue);
    s += ':' + Math.round(fRef.colorSamplers[1].color.hsb.saturation);
    s += ':' + Math.round(fRef.colorSamplers[1].color.hsb.brightness);
    
    s += ',' + Math.round(fRef.colorSamplers[2].color.hsb.hue);
    s += ':' + Math.round(fRef.colorSamplers[2].color.hsb.saturation);
    s += ':' + Math.round(fRef.colorSamplers[2].color.hsb.brightness);

    s += ',' + Math.round(fRef.colorSamplers[3].color.hsb.hue);
    s += ':' + Math.round(fRef.colorSamplers[3].color.hsb.saturation);
    s += ':' + Math.round(fRef.colorSamplers[3].color.hsb.brightness);

    indexFile.writeln(fRef.name + "; " + s);
    
    fRef.colorSamplers.removeAll();
    fRef.close(SaveOptions.DONOTSAVECHANGES);
  }
  indexFile.close();
};
