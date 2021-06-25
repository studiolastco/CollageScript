// Returns a random number between 0 (inclusive) and 1 (exclusive)
function getRandom() {
  return Math.random();
};

// Returns a random number between min (inclusive) and max (exclusive)
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
};

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// Jonas Raoni Soares Silva
// http://jsfromhell.com/array/shuffle [v1.0]
function shuffleArray(o)
{
  for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
};

if(!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g,'');
  };
}

// Replaced the use of this function with the advice: http://phrogz.net/js/classes/OOPinJS2.html
/*Object.prototype.inherit = function(superClass)
{
  var tmpClass = function() {};
  tmpClass.prototype = superClass.prototype;
  this.prototype = new tmpClass();
};*/

function isOdd(num)
{
  return num % 2;
};

// http://kevin.vanzonneveld.net
// +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
// +   improved by: Ash Searle (http://hexmen.com/blog/)
// +   improved by: Lincoln Ramsay
// +   improved by: djmix
// *     example 1: basename('/www/site/home.htm', '.htm');
// *     returns 1: 'home'
// *     example 2: basename('ecra.php?p=1');
// *     returns 2: 'ecra.php?p=1'
String.prototype.basename = function(suffix)
{  
  var b = this.replace(/^.*[\/\\]/g, '');
  if (typeof(suffix) == 'string' && b.substr(b.length - suffix.length) == suffix) 
  {
    b = b.substr(0, b.length - suffix.length);
  }
  return b;
}

// http://kevin.vanzonneveld.net
// +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
// +   improved by: vlado houba
// +   input by: Billy
// +   bugfixed by: Brett Zamir (http://brett-zamir.me)
// *     example 1: in_array('van', ['Kevin', 'van', 'Zonneveld']);
// *     returns 1: true
// *     example 2: in_array('vlado', {0: 'Kevin', vlado: 'van', 1: 'Zonneveld'});
// *     returns 2: false
// *     example 3: in_array(1, ['1', '2', '3']);
// *     returns 3: true
// *     example 3: in_array(1, ['1', '2', '3'], false);
// *     returns 3: true
// *     example 4: in_array(1, ['1', '2', '3'], true);
// *     returns 4: false
Array.prototype.inArray = function(needle, argStrict) 
{
  var key = '',
  strict = !! argStrict;

  if (strict) 
  {
    for (key in this) 
    {
      if (this[key] === needle) 
      {
        return true;
      }
    }
  } 
  else 
  {
    for (key in this) 
    {
      if (this[key] == needle) 
      {
        return true;
      }
    }
  }
  return false;
}

/*
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
*/
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (searchElement, fromIndex) {

    var k;

    // 1. Let O be the result of calling ToObject passing
    //    the this value as the argument.
    if (this == null) {
      throw new TypeError('"this" is null or not defined');
    }

    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get
    //    internal method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If len is 0, return -1.
    if (len === 0) {
      return -1;
    }

    // 5. If argument fromIndex was passed let n be
    //    ToInteger(fromIndex); else let n be 0.
    var n = +fromIndex || 0;

    if (Math.abs(n) === Infinity) {
      n = 0;
    }

    // 6. If n >= len, return -1.
    if (n >= len) {
      return -1;
    }

    // 7. If n >= 0, then Let k be n.
    // 8. Else, n<0, Let k be len - abs(n).
    //    If k is less than 0, then let k be 0.
    k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

    // 9. Repeat, while k < len
    while (k < len) {
      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the
      //    HasProperty internal method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      //    i.  Let elementK be the result of calling the Get
      //        internal method of O with the argument ToString(k).
      //   ii.  Let same be the result of applying the
      //        Strict Equality Comparison Algorithm to
      //        searchElement and elementK.
      //  iii.  If same is true, return k.
      if (k in O && O[k] === searchElement) {
        return k;
      }
      k++;
    }
    return -1;
  };
}

function array_unique(inputArr) {
// discuss at: http://phpjs.org/functions/array_unique/
// original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
// input by: duncan
// input by: Brett Zamir (http://brett-zamir.me)
// bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
// bugfixed by: Nate
// bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
// bugfixed by: Brett Zamir (http://brett-zamir.me)
// improved by: Michael Grier
// note: The second argument, sort_flags is not implemented;
// note: also should be sorted (asort?) first according to docs
// example 1: array_unique(['Kevin','Kevin','van','Zonneveld','Kevin']);
// returns 1: {0: 'Kevin', 2: 'van', 3: 'Zonneveld'}
// example 2: array_unique({'a': 'green', 0: 'red', 'b': 'green', 1: 'blue', 2: 'red'});
// returns 2: {a: 'green', 0: 'red', 1: 'blue'}
var key = '',
tmp_arr2 = {},
val = '';
var __array_search = function (needle, haystack) {
var fkey = '';
for (fkey in haystack) {
if (haystack.hasOwnProperty(fkey)) {
if ((haystack[fkey] + '') === (needle + '')) {
return fkey;
}
}
}
return false;
};
for (key in inputArr) {
if (inputArr.hasOwnProperty(key)) {
val = inputArr[key];
if (false === __array_search(val, tmp_arr2)) {
tmp_arr2[key] = val;
}
}
}
return tmp_arr2;
}

function print_r(array, return_val) {
// discuss at: http://phpjs.org/functions/print_r/
// original by: Michael White (http://getsprink.com)
// improved by: Ben Bryan
// improved by: Brett Zamir (http://brett-zamir.me)
// improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
// input by: Brett Zamir (http://brett-zamir.me)
// depends on: echo
// example 1: print_r(1, true);
// returns 1: 1
var output = '',
pad_char = ' ',
pad_val = 4,
d = this.window.document,
getFuncName = function (fn) {
var name = (/\W*function\s+([\w\$]+)\s*\(/)
.exec(fn);
if (!name) {
return '(Anonymous)';
}
return name[1];
};
repeat_char = function (len, pad_char) {
var str = '';
for (var i = 0; i < len; i++) {
str += pad_char;
}
return str;
};
formatArray = function (obj, cur_depth, pad_val, pad_char) {
if (cur_depth > 0) {
cur_depth++;
}
var base_pad = repeat_char(pad_val * cur_depth, pad_char);
var thick_pad = repeat_char(pad_val * (cur_depth + 1), pad_char);
var str = '';
if (typeof obj === 'object' && obj !== null && obj.constructor && getFuncName(obj.constructor) !==
'PHPJS_Resource') {
str += 'Array\n' + base_pad + '(\n';
for (var key in obj) {
if (Object.prototype.toString.call(obj[key]) === '[object Array]') {
str += thick_pad + '[' + key + '] => ' + formatArray(obj[key], cur_depth + 1, pad_val, pad_char);
} else {
str += thick_pad + '[' + key + '] => ' + obj[key] + '\n';
}
}
str += base_pad + ')\n';
} else if (obj === null || obj === undefined) {
str = '';
} else {
// for our "resource" class
str = obj.toString();
}
return str;
};
output = formatArray(array, 0, pad_val, pad_char);
if (return_val !== true) {
if (d.body) {
this.echo(output);
} else {
try {
// We're in XUL, so appending as plain text won't work; trigger an error out of XUL
d = XULDocument;
this.echo('<pre xmlns="http://www.w3.org/1999/xhtml" style="white-space:pre;">' + output + '</pre>');
} catch (e) {
// Outputting as plain text may work in some plain XML
this.echo(output);
}
}
return true;
}
return output;
}

function uniqid(prefix, more_entropy) {
// discuss at: http://phpjs.org/functions/uniqid/
// original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
// revised by: Kankrelune (http://www.webfaktory.info/)
// note: Uses an internal counter (in php_js global) to avoid collision
// test: skip
// example 1: uniqid();
// returns 1: 'a30285b160c14'
// example 2: uniqid('foo');
// returns 2: 'fooa30285b1cd361'
// example 3: uniqid('bar', true);
// returns 3: 'bara20285b23dfd1.31879087'
if (typeof prefix === 'undefined') {
prefix = '';
}
var retId;
var formatSeed = function (seed, reqWidth) {
seed = parseInt(seed, 10)
.toString(16); // to hex str
if (reqWidth < seed.length) {
// so long we split
return seed.slice(seed.length - reqWidth);
}
if (reqWidth > seed.length) {
// so short we pad
return Array(1 + (reqWidth - seed.length))
.join('0') + seed;
}
return seed;
};
// BEGIN REDUNDANT
if (!this.php_js) {
this.php_js = {};
}
// END REDUNDANT
if (!this.php_js.uniqidSeed) {
// init seed with big random int
this.php_js.uniqidSeed = Math.floor(Math.random() * 0x75bcd15);
}
this.php_js.uniqidSeed++;
// start with prefix, add current milliseconds hex string
retId = prefix;
retId += formatSeed(parseInt(new Date()
.getTime() / 1000, 10), 8);
// add seed hex string
retId += formatSeed(this.php_js.uniqidSeed, 5);
if (more_entropy) {
// for more entropy we add a float lower to 10
retId += (Math.random() * 10)
.toFixed(8)
.toString();
}
return retId;
}

function str_pad(input, pad_length, pad_string, pad_type) {
// discuss at: http://phpjs.org/functions/str_pad/
// original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
// improved by: Michael White (http://getsprink.com)
// input by: Marco van Oort
// bugfixed by: Brett Zamir (http://brett-zamir.me)
// example 1: str_pad('Kevin van Zonneveld', 30, '-=', 'STR_PAD_LEFT');
// returns 1: '-=-=-=-=-=-Kevin van Zonneveld'
// example 2: str_pad('Kevin van Zonneveld', 30, '-', 'STR_PAD_BOTH');
// returns 2: '------Kevin van Zonneveld-----'
var half = '',
pad_to_go;
var str_pad_repeater = function (s, len) {
var collect = '',
i;
while (collect.length < len) {
collect += s;
}
collect = collect.substr(0, len);
return collect;
};
input += '';
pad_string = pad_string !== undefined ? pad_string : ' ';
if (pad_type !== 'STR_PAD_LEFT' && pad_type !== 'STR_PAD_RIGHT' && pad_type !== 'STR_PAD_BOTH') {
pad_type = 'STR_PAD_RIGHT';
}
if ((pad_to_go = pad_length - input.length) > 0) {
if (pad_type === 'STR_PAD_LEFT') {
input = str_pad_repeater(pad_string, pad_to_go) + input;
} else if (pad_type === 'STR_PAD_RIGHT') {
input = input + str_pad_repeater(pad_string, pad_to_go);
} else if (pad_type === 'STR_PAD_BOTH') {
half = str_pad_repeater(pad_string, Math.ceil(pad_to_go / 2));
input = half + input + half;
input = input.substr(0, pad_length);
}
}
return input;
}

function basename(path, suffix) {
// discuss at: http://phpjs.org/functions/basename/
// original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
// improved by: Ash Searle (http://hexmen.com/blog/)
// improved by: Lincoln Ramsay
// improved by: djmix
// improved by: Dmitry Gorelenkov
// example 1: basename('/www/site/home.htm', '.htm');
// returns 1: 'home'
// example 2: basename('ecra.php?p=1');
// returns 2: 'ecra.php?p=1'
// example 3: basename('/some/path/');
// returns 3: 'path'
// example 4: basename('/some/path_ext.ext/','.ext');
// returns 4: 'path_ext'
var b = path;
var lastChar = b.charAt(b.length - 1);
if (lastChar === '/' || lastChar === '\\') {
b = b.slice(0, -1);
}
b = b.replace(/^.*[\/\\]/g, '');
if (typeof suffix === 'string' && b.substr(b.length - suffix.length) == suffix) {
b = b.substr(0, b.length - suffix.length);
}
return b;
}