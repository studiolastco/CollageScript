function PaletteListImages(palettePath)
{
  PaletteListRGB.call(this, palettePath);
};

PaletteListImages.prototype = new PaletteListRGB();
PaletteListImages.prototype.constructor = PaletteListImages;
