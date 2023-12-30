# CollageScript
CollageScript is a library of Javascript code I developed to automate the creation of large, multi-layered Photoshop files using ~~Adobe's ExtendScript Toolkit~~ Visual Studio Code. It was used to create a number of large-format digital print editions and series. See https://www.calhounsmith.com/portfolio/code-based/

CollageScript is also used, along with the mighty help of [CreateJS](https://github.com/createjs), to render animations. See https://www.calhounsmith.com/animation/riez-animation/riez/ for a description and short video of the animation Riez.

CollageScript code developed organically in response to functionality I needed as I made artwork over a period of a few years. The best way to get an idea of how this code is used is to look at the [example-script.js](example-script.js). This is the kind of script that is run from Visual Studio Code using the ExtendScript Debugger extension with the Photoshop API selected as the target. Take a look at the [example image](example-image.jpg).

## Note on lib directories
The contents of the `lib` directory is a stalled attempt to rewrite CollageScript from a couple years ago. The `lib-legacy` directory contains the goods, the set of files used to generate many of the print editions found at my [website](https://calhounsmith.com).
