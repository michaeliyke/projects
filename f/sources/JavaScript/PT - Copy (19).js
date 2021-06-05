// Architecture of the Techie API
;
(function Environment(global, factor, factory, machineInfo, b, stub) {
stub = factor.call(global, global, factory ); machineInfo = stub.machine;
if (typeof module === "object" && typeof module.exports === "object") {

module.exports = global.document ?
    factory.call(stub, global, true) : function(w) {
        if (!w.document) {
            throw new Error("Techie requires a window with a document");
        }
        return factory(stub,  w, machineInfo, factor, w.document, factory );
    };
} else {

if (   !(machineInfo && machineInfo.noIssues)   ) { 
throw new TypeError("Sorry, some issus were encountered while loading core files.");
}
global.Techie = global.pt = factory.call( stub, global, machineInfo, factor, global.document, factory ); 
// console.clear();
console.info("Techie JavaScript API working perfectly");
} 
}












(typeof window !== "undefined" ? window : this, function factor( w, _pt, stub ) {

/**************factor*********************/


/*
*
*Application Work starts below
*_pt is factory
*
*/
var toString = Object.prototype.toString, fooWalk = function foolWalker(){}, fooCounter;

// dpi calculations

if (w.Node && Node.prototype && !Node.prototype.contains){ //.contains() shim
// https://www.quirksmode.org/blog/archives/2006/01/contains_for_mo.html
  Node.prototype.contains = function (arg) {
    return !!(this.compareDocumentPosition(arg) & 16)
  }
}

var res = (function(root, name, make) {

var one = {dpi: 96, dpcm: 96 / 2.54}

function ie() {
return Math.sqrt(screen.deviceXDPI * screen.deviceYDPI) / one.dpi
}

function dppx() {
// devicePixelRatio: Webkit (Chrome/Android/Safari), Opera (Presto 2.8+), FF 18+
return typeof window == 'undefined' ? 0 : +window.devicePixelRatio || ie() || 0
}

function dpcm() {
return dppx() * one.dpcm
}

function dpi() {
return dppx() * one.dpi
}

return {'dppx': dppx, 'dpi': dpi, 'dpcm': dpcm}
});

function shim(object, shim /*shim is also an object*/, prop, action){
if (!shim) {shim = object; object = this;}
for(prop in shim){
    action = shim[prop];
    if ( object && object && !( object[prop])) {
    object[prop] = action;
    }
}
return this;
};
shim(this, {
// Shim for the global object
// Basic Array shims
// Get device pixel ratio
devicePixelRatio: function getDPR() { /*https://gist.github.com/gdi2290/7772743*/
var mediaQuery;
// Fix fake window.devicePixelRatio on mobile Firefox
var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
if (window.devicePixelRatio !== undefined && !is_firefox) {
return window.devicePixelRatio;
} else if (window.matchMedia) {
mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),\
      (min--moz-device-pixel-ratio: 1.5),\
      (-o-min-device-pixel-ratio: 3/2),\
      (min-resolution: 1.5dppx)";
if (window.matchMedia(mediaQuery).matches) return 1.5;
mediaQuery = "(-webkit-min-device-pixel-ratio: 2),\
      (min--moz-device-pixel-ratio: 2),\
      (-o-min-device-pixel-ratio: 2/1),\
      (min-resolution: 2dppx)";
if (window.matchMedia(mediaQuery).matches) return 2;
mediaQuery = "(-webkit-min-device-pixel-ratio: 0.75),\
      (min--moz-device-pixel-ratio: 0.75),\
      (-o-min-device-pixel-ratio: 3/4),\
      (min-resolution: 0.75dppx)";
if (window.matchMedia(mediaQuery).matches) return 0.7;
} else return 1;
}
})
shim(function(){}, {
forEach: function forEach ( action, object, This )  {
var length, index = 0;  object = object || this;
if (object.length) {  length = object.length;
    for (; index < length; index++) {
        if ( action.call(This || object[index], object[index], index, object) === false ) {  break; }
    } } else {  for (index in object) {
        if (object.hasOwnProperty( index )) {
            if (action.call( This || object[index], object[index], index,  object ) === false) { break; } 
} } }
return object;
},


indexOf: function indexOf ( x ) { 
var X = -1;
this.forEach(function(element, counter){
    if (element == x) {X = counter;}
});
return X;
}
});
// Basic Object shims
/*shim(Object.prototype, {
addProperty: function addProperty(obj, name, onGet, onSet) {

    // wrapper functions
    var
        oldValue = obj[name],
        getFn = function () {
            return onGet.apply(obj, [oldValue]);
        },
        setFn = function (newValue) {
            return oldValue = onSet.apply(obj, [newValue]);
        };

    // Modern browsers, IE9+, and IE8 (must be a DOM object),
    if (Object.defineProperty) {

        Object.defineProperty(obj, name, {
            get: getFn,
            set: setFn
        });

    // Older Mozilla
    } else if (obj.__defineGetter__) {

        obj.__defineGetter__(name, getFn);
        obj.__defineSetter__(name, setFn);

    // IE6-7
    // must be a real DOM object (to have attachEvent) and must be attached to document (for onpropertychange to fire)
    } else {

        var onPropertyChange = function (e) {

            if (event.propertyName == name) {
                // temporarily remove the event so it doesn't fire again and create a loop
                obj.detachEvent("onpropertychange", onPropertyChange);

                // get the changed value, run it through the set function
                var newValue = setFn(obj[name]);

                // restore the get function
                obj[name] = getFn;
                obj[name].toString = getFn;

                // restore the event
                obj.attachEvent("onpropertychange", onPropertyChange);
            }
        };  

        obj[name] = getFn;
        obj[name].toString = getFn;

        obj.attachEvent("onpropertychange", onPropertyChange);

    }
},
keys: (function() {
    'use strict';
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
        dontEnums = ['toString','toLocaleString','valueOf','hasOwnProperty',
        'isPrototypeOf','propertyIsEnumerable','constructor'],
        dontEnumsLength = dontEnums.length;
    return function(obj) {
      if (typeof obj !== 'function' && (typeof obj !== 'object' || obj === null)) {
        throw new TypeError('Object.keys called on non-object');
      }
      var result = [], prop, i;
      for (prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          result.push(prop);
        }
      }
      if (hasDontEnumBug) {
        for (i = 0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) {
            result.push(dontEnums[i]);
          }
        }
      }
      return result;
    };
  }()),
  defineProperties: function defineProperties(obj, properties) {
  function convertToDescriptor(desc) {
    function hasProperty(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    }

    function isCallable(v) {
      return typeof v === 'function';
    }

    if (typeof desc !== 'object' || desc === null)
      throw new TypeError('bad descriptor');

    var d = {};

    if (hasProperty(desc, 'enumerable'))
      d.enumerable = !!desc.enumerable;
    if (hasProperty(desc, 'configurable'))
      d.configurable = !!desc.configurable;
    if (hasProperty(desc, 'value'))
      d.value = desc.value;
    if (hasProperty(desc, 'writable'))
      d.writable = !!desc.writable;
    if (hasProperty(desc, 'get')) {
      var g = desc.get;

      if (!isCallable(g) && typeof g !== 'undefined')
        throw new TypeError('bad get');
      d.get = g;
    }
    if (hasProperty(desc, 'set')) {
      var s = desc.set;
      if (!isCallable(s) && typeof s !== 'undefined')
        throw new TypeError('bad set');
      d.set = s;
    }

    if (('get' in d || 'set' in d) && ('value' in d || 'writable' in d))
      throw new TypeError('identity-confused descriptor');
    return d;
  }

  if (typeof obj !== 'object' || obj === null)
    throw new TypeError('bad object');

  properties = Object(properties);

  var keys = Object.keys(properties);
  var descs = [];

  for (var i = 0; i < keys.length; i++)
    descs.push([keys[i], convertToDescriptor(properties[keys[i]])]);

  for (var i = 0; i < descs.length; i++)
    Object.defineProperty(obj, descs[i][0], descs[i][1]);

  return obj;
},
    assign: function assign(target, sources) {
  ([]).slice.call(arguments, 1).forEach(function(source){
    let descriptors = Object.keys(source).reduce(function(descriptors, key){
      descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
      return descriptors;
    }, {});
    // by default, Object.assign copies enumerable Symbols too
    Object.getOwnPropertySymbols(source).forEach(function(sym) {
      let descriptor = Object.getOwnPropertyDescriptor(source, sym);
      if (descriptor.enumerable) {
        descriptors[sym] = descriptor;
      }
    });
    Object.defineProperties(target, descriptors);
  });
  return target;
},
createObject: function (proto, propertiesObject) {
        if (typeof proto !== 'object' && typeof proto !== 'function') {
            throw new TypeError('Object prototype may only be an Object: ' + proto);
        } else if (proto === null) {
            throw new Error("This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument.");
        }

        if (typeof propertiesObject != 'undefined') {
            throw new Error("This browser's implementation of Object.create is a shim and doesn't support a second argument.");
        }
        
        function F() {}
        F.prototype = proto;
        
        return new F();
    }
})*/
// Basic function shims
shim(Function.prototype, {
bind: function bind (This) {
var arg = arguments, slice = Array.prototype.slice, args = slice.call(arg, 1),
fn = this; function foo () {} 
function bound ( ) { arg = slice.call(arguments);
This = this instanceof foo && This ? this : This; args = args.concat(arg);
return fn.apply(This, args);
}
foo.prototype = this.prototype; bound.prototype = new foo ();
return bound;
}
});


var plain = {
type: function type(datum, string) { 
    if (string && string != null ) {
        if (toString.call(string) == "[object String]") {
            if (/[\]\[]/.test(string)) { //[object Techie]
                return Object.prototype.toString.call(datum) == string;
            }
           return toString.call(datum) == "[object "+string[0].toUpperCase()+string.substr(1)+"]";
        } else { error( "pt.type({}, 'object'); //true, type(28); //number", null, ln());
        }
    }
    return Object.prototype.toString.call(datum);
},
isEmptyTechie: function isEmptyTechie(t) {
if (!t.techieString) { return;}
return !!(t && t.length && t[0]);
},
isEmptyObject: function isEmptyObject ( obj ) {
var name;
for ( name in obj ) {
    return false;
}
return true;
},
booleans: function booleans(value) {
    return Object.prototype.toString.call(value) == "[object Boolean]";
},
objects: function objects(value) {
    return Object.prototype.toString.call(value) == "[object Object]";
},
arrays: function arrays(value) {
    return Object.prototype.toString.call(value) == "[object Array]";
},

functions: function functions(value) {
    var f = Object.prototype.toString.call(value) == "[object Function]" || typeof value === 'function',
        notReg = Object.prototype.toString.call(value) != "[object RegExp]";
    return (f && notReg);
},
RegExp: function RegExp(value) {
    return Object.prototype.toString.call(value) == "[object RegExp]";
},

isNativeJSON: function isNativeJSON(value) {
    return window.JSON && Object.prototype.toString.call(JSON) == "[object JSON]";
},

strings: function strings(x) {
     return ( (typeof x === "string") || (Object.prototype.toString.call(x) == "[object String]") );
   
   
},
numbers: function numbers(x) {
    return !!(x && +x && toString.call(+x) == "[object Number]" &&  
                    (typeof +x === "number" && x % 1 == 0));
},
text: function plainText(txt){
    return plain.strings(txt) && (/^[A-z]+[0-9]$/i).test(txt);
},
blob: function blob(bb){ 
    bb = String( bb ).trim()
    n = bb[0] == "<" && bb[bb.length - 1] == ">";
    // var reg = /([<])/
    return plain.strings(bb) && n;
}
};

var type = plain.type;

function types(arg, obj){//if(!(Type("string", "number", "object").In())){return;}
var args = explode(arguments), object, bool = false, strings = [], that = this;
args.forEach(function(arg){
if (typeof arg === "string") {
 strings.push(arg);
return;
}
object = arg;
});
error(  "string", !!strings.length, ln() );
return {
In: function(obj){ 
obj = obj || this;
strings.forEach(function(string){
 forEach(function(prop){ 
    if (typeof prop === string) {
       bool = true;
    }
 }, obj);
}, this)
return bool;
}.bind(that)
};

}

(function type_(methods){
var p;  for(p in methods){
    if (methods.hasOwnProperty(p)) {
        type[p] = methods[p];
    }
}
}( {
types: {
        "undefined": "[object Undefined]",   "nan": "[object Nan]",
        "null": "[object Null]",             "boolean": "[object Boolean]",
        "string": "[object String]",         "number": "[object Number]",
        "array": "[object Array]",           "function": "[object Function]",
        "object": "[object Object]",         "html": "[object HTMLElement]",
        "collection": "[object HTMLCollection]", "nodeList": "[object HTMLNodeList]",
        "date": "[object Date]",  "regExp": "[object RegExp]", 
        "techie": "[object Techie]"
        },
type: type,
  isAtype: function isAtype(string) {
        switch ((string = Object.prototype.toString.call(string))) {
            case '[object String]':
            case '[object Number]':
            case '[object Boolean]':
            case '[object Null':
            case '[object Nan]':
            case '[object Undefined]':
            case '[object Array]':
            case '[object Function]':
            case '[object Techie]':
            case '[object RegExp]':
            case '[object Date]':
            case '[object Object]':
            return true;
                break;
            default:
                return false;
        }
    },

isNothing: function isNothing(x){
        return type.isAtype(x) ? false: true;
    },
isEmpty: function isEmpty(x) {
       return !x || plain.isEmptyObject(x) || !(/\S+/.test(x)) ? true: false;
    },
isEmptyObject: function isEmptyObject ( obj ) {
        error( "object", types.primitives(obj) == false, ln());
        var name;
        for ( name in obj ) {
              return false;
            }
         return true;
        },
primitives: function primitives(datum) {
    var isPrimitive = false, counter = 0,primitive, primitives = ["[object Undefined]",
    "[object Number]","[object Boolean]","[object Nan]","[object Null]","[object String]"
    ], string = toString.call(datum);
    while ((primitive = primitives[counter++])) {if (string == primitive) { 
        isPrimitive = true;}} return isPrimitive;
    },
numbers: function numbers(x) {
        return !!(x && +x &&  toString.call(+x) == "[object Number]" &&  
                        (typeof +x === "number" && x % 1 == 0));
    },
    strings: function strings(x) {
        return ( (typeof x === 'string') || (Object.prototype.toString.call(x) == "[object String]") );
    },
    booleans: function booleans(x) {
        return toString.call(x) == "[object Boolean]";
    },
    undefineds: function undefineds(x) {
        return (toString.call(x) == "[object Undefined]") || x == undefined;
    },
    nulls: function nulls(x) {
        return toString.call(x) == "[object Null]" || x == null;
    },
    nans: function nans (x){
        return x === NaN || Number.prototype.toString.call(Number(x)) == "NaN" || 
        Object.prototype.toString.call(x) == "[object Nan]" || 
        (typeof x === "number" && x % 1 != 0);
    },
    objects: function objects(x) {
        return toString.call(x) == "[object Object]";
    },
    functions: function functions(x) {
        return toString.call(x) == "[object Function]";
    },
    arrays: function arrays(x) {
        return toString.call(x) == "[object Array]";
    },
data: {
        "undefined": undefined, "null": null, "nan": NaN,
         "boolean": Boolean, "string": String, "number": Number,
         "array": Array, "object": Object, "function": Function,
         "date": Date, "regexp": RegExp, "techie": "Techie" 
    }
    
}
));

( function types_ ( methods ) {
var p;  for ( p in methods ){
    if ( methods.hasOwnProperty ( p ) ) {
        types [ p ] = methods [ p ];
    }
}
}(type));

var walk_The_Dom = function walk(grab) {
var walk_The_Dom = function walk(node, func) {
    if (node && (node.nodeType == 1 || node == document)){
  grab =  func.call(node, node);
node = node.firstChild;
if (grab != null ) { return grab; } 
    while (node) {  
     if (grab) { return grab; }
        var d = walk(node, func);
        node = node.nextSibling;
        }

   } 
return grab;        

}
return walk_The_Dom;
}();




var is = {
  getObjectDetail: function getObjectDetail(x){
    var ret = null;
    if(x && typeof x === "object"){
      var node = x.nodeType && x.nodeType > 0;
      var html = (node && x.nodeType == 1);
      var collection = x.length && x[0].nodeType  && x[0].nodeType == 1 || x[0] == document;
      ret = {
        isDom: function(){
          return html || collection;
        }(),
        isCollection: collection,
        isHTML: html,
        isTechie: x.techieString,
        isNode: node
      }
    }
    return ret;
  },
object: function object ( x ) {
return Object.prototype.toString.call( x ) === "[object Object]";
},
element: function(node){
return node && node.nodeType && +node.nodeType == node.nodeType;
},
emptyObject: function isEmptyObject ( obj ) {
        error( "object", types.primitives( obj ) == false, ln());
        var name;
        for ( name in obj ) {
            if(name != null) { return false;}
            }
         return true;
        },

isFunction: function isFunction(x){
return Object.prototype.toString.call(x) === "[object Function]";
},
functions: function isFunction(x){
return Object.prototype.toString.call(x) === "[object Function]" && typeof x.call === "function";
},

isArrayLike: function isArrayLike(e) {
if (Array.isArray && Array.isArray(e)) {  return true; }
var string = Object.prototype.toString.call(e);
if (string === "[object HTMLCollection]" || string === "[object NodeList]") { return true;}
if (typeof e !== "object" || !e.hasOwnProperty("length") || e.length < 0) {return false; }
if (e.length === 0) { return true;} else if (e[0] && e[0].nodeType) {return true; }
return false;
},
arrayLike: function isArrayLike(e) {
if (Array.isArray(e)) {  return true; }
var string = Object.prototype.toString.call(e);
if (string === "[object HTMLCollection]" || string === "[object NodeList]") { return true;}
if (typeof e !== "object" || !e.hasOwnProperty("length") || e.length < 0) {return false; }
if (e.length === 0) { return true;} else if (e[0] && e[0].nodeType) {return true; }
return false;
},

array: function isArray(x){
return Object.prototype.toString.call(x) === "[object Array]";
},
number: function isNumber(x){
return !!(x && +x &&  toString.call(+x) == "[object Number]" &&  
                        (typeof +x === "number" && x % 1 == 0));
},
string: function isString(x){
return Object.prototype.toString.call(x) === "[object String]";
},
character: function character(x){ //Mostly comments and texts nodes
  switch(true){
    case x instanceof CharacterData:
    case x instanceof Node && typeof x.nodeValue === "string":
    case x instanceof Text:
    case x instanceof Comment: return true; break;
    default: return false;
  }
},

boolean: function isBoolean(x){
return Object.prototype.toString.call(x) === "[object Boolean]";
},
isNull: function isNull(x){
return Object.prototype.toString.call(x) === "[object Null]";
},
isUndefined: function isUndefined(x){
return Object.prototype.toString.call(x) === "[object Undefined]";
},

emptyTechie: function isEmptyTechie(t){
if (!t.techieString) { return;}
return !!(t && t.length && t[0]);
},
list: function isList(array) {
array = array || this;
if (is.techie(array)) {
    return true;
}
var sr = Object.prototype.toString.call(array);
return sr != "[object String]" && sr != "[object Comment]" && sr != "[object Text]" && array && array.length 
&& typeof array.length === 'number' && array.length % 1 == 0; 
},
iterable: function iterable(x){
if(length == +length) return true;
return  is.list(x) || is.string(x);
},

html: function isHTML(datum) { //HTML tags are objects and no other data type
  if (typeof datum === "object") {
var node = datum instanceof HTMLElement || datum == document || datum.ownerDocument == document;
if (node && (datum.nodeType == 1)) {
    return true;
}
  }
return false;
}, 
hidden: function(){
  alert(this)
},
dom: function isDom(d){
if (typeof d === "object") {
var html = d.ownerDocument == document || d == document || d instanceof HTMLElement;
var collection = (d.length && d[0] && d[0].nodeType);
if(html || collection){
  return true;
}
}
return false;
},

in_dom: function in_dom_tree(node) {//.in_dom(Node);
    if (!node){ return false;}
    var rect = node.getBoundingClientRect(),
    offset = rect.top || rect.left;
    if (offset == +offset && node.offsetParent != null){ return true;}
   return  document.documentElement.contains(node);
},
in_body: function in_body(node){
  var rect = node.getBoundingClientRect(),
  offset = rect.left || rect.top;
  if (offset == +offset && node.offsetParent != null){ return true;}
  return  document.body.contains(node);
},

techieObject: function isTechieObject(object){
return object && object.isTechie && object.techieString == "[object Techie]";
}, 

techie: function isTechie(object){
return !!(object && object.techieString == "[object Techie]");
},


collection: function isCollection(array) {
if (array && typeof array === "object") {
var html = (array[0] && array[0].nodeType);
if ((array.length && html)) {return true}
}
return false;
},

absent: function isAbsent(datum) {
return this.present(datum) ? false : true;
},
present: function isPresent(datum) {
datum = datum || this;

function Query(tag) {
    try {
        return sapi.querySelectorAll(tag)[0] ? true : false;
    } catch (err) {
        return false
    }
}

if (typeof datum !== 'string' && typeof datum !== 'object') {
    return false;
}
if (is.html(datum)) {
    if (datum.ownerDocument.body.contains(datum)) {
        return true;
    }
}
var tag, invalidCharacters;
if (typeof datum === 'string') {
    invalidCharacters = /[#.]+/.test(datum);
    var cLass = /\s+class\s*=/i,
        id = /\s+id\s*=/i;
    others = /([\w-]+\s*=\s*['"][\w\s*].+?['"])/;
    if (invalidCharacters) {
        return Query(datum);
    } else
    if (id.test(datum)) {
        var reg1 = /(id\s*=\s*['"][\w\s*].+?['"])/i;
        var match = datum.match(reg1);
        var reg2 = String(match[0]).match(/['|"'](.*?)['|"']/);
        tag = '#' + reg2[1];
        return Query(tag);
    } else
    if (cLass.test(datum)) {
        var reg1 = /(class\s*=\s*['"][\w\s*].+?['"])/i;
        var match = datum.match(reg1)
        var reg2 = String(match[0]).match(/['|"'](.*?)['|"']/);
        tag = "." + reg2[1];
        return Query(tag);
    } else
    if (others.test(datum)) {
        datum = datum.match(others);
        tag = "[" + datum[0] + "]";
        // a(tag)
        return Query(tag);
    } else { //match all "< p >", "p"
        tag = datum.match(/<{0,1}(\s*\w+)?/);
        return Query(tag)
    }
}
//objects considerations
else {
    if (is.nodeList(datum)) {
        datum = datum[0];
    }
    if (is.node(datum)) {
        return sapi.querySelectorAll(datum.tagName)[0] ? true : false;
    }
    return false;


}
/*end of func*/
},

nodeList: function isNodeList( object ) {
if (!arguments.length) { object = this;}
var string = toString.call(object), ret = true;
if (string == "[object HTMLCollection]" || string == "[object NodeList]") { return true;}
if ( is.collection( object ) ) { return true; } if (!is.list(object)) {return false;}
forEach.call(object, function(node){ if ( !is.node(node) ) { ret = false; }});
return ret;
},

tag: function isTag(string) {
//It should be clear that isTag focuses on checking a string for html tag validity
if (!string || (typeof string !== "string") || invalidChars(string)) {
    return false; /*men*/
}
if (string.charAt(0) === '<' && string.charAt(string.length - 1) === '>') {
    string = string.split(/\W+/)[1]; //split by all non-word characters and give me the second item
    //I could also use createFrag and check it against isNode
}
if (is.node(sapi.createElement(string))) {
    return true;
}
return false;
},

node: function isNode( object ) {  /*HTML nodes are objects and no other data type;
Use isTag(string) instead; string will be created and checked against  isNode(object);*/
object = object || this; 
/*var unknowns = ['UNKNOWN','UNDEFINED','NULL','NAN','OBJECT OBJECT'],
 ret = true, string = toString.call(object).replace(/\[\]/g, "").toUpperCase(),  i = 0;
    while(i < unknowns.length){ if (index(string, unknowns[i]) != -1) { ret = false;} 
    i++; 
} if (ret == false) { return false;}*/
if ( object == document || object instanceof HTMLElement ) { return true;}

if (object.ownerDocument == document) {return true}
    return false;
},

list: function isList(array) {
if (!arguments.length) { array = this;}
if (is.techie(array)) {
    return !!array.length && (plain.objects(array) || plain.arrays(array));
}
var sr = Object.prototype.toString.call(array);
return sr != "[object String]" && sr != "[object Comment]" && sr != "[object Text]" && array && array.length 
&& typeof array.length === 'number' && array.length % 1 == 0;
},
iterable: function iterable(x){
return is.list(x) || is.string(x);
},

html: function isHTML(datum) { //HTML tags are objects and no other data type
  if (datum && typeof datum === "object") {
var node = datum instanceof HTMLElement || datum == document || datum.ownerDocument == document;
if (node && (datum.nodeType == 1)) {
    return true;
}
  }
return false;
}, 
techieObject: function isTechieObject(object){
return object && object.isTechie && object.techieString == "[object Techie]";
}, 


collection: function isCollection(array) {
if (array && typeof array === "object") {
var html = (array[0] && array[0].nodeType);
if ((array.length && html)) {return true}
}
return false;
},

absent: function isAbsent(datum) {
return !this.present(datum);
}
/*END OF IS*/
};

var contains = {
invalidChars: function invalidChars(c) {
if (toString.call(c) == '[object String]') {
    return (/[\\"'`:@_<>{}()#.*+=?^$~|,&%;!-/\[\]]+/g).test(c);
}
}
/*END OF CONTAINS*/ 
};


function forEach ( action, object, This )  {
var length, index = 0;  object = object || this;
if (object.length) {  length = object.length;
    for (; index < length; index++) {
        if ( action.call(This || object[index], object[index], index, object) === false ) {  break; }
    } } else {  for (index in object) {
        if (object.hasOwnProperty( index )) {
            if (action.call( This || object[index], object[index], index,  object ) === false) { break; } 
} } }
return object;
}
function ln() {
var e = new Error();
if (!e.stack) try {
// IE requires the Error to actually be throw or else the Error's 'stack'
// property is undefined.
throw e;
} catch (e) {
if (!e.stack) {
return 0; // IE < 10, likely
}
}
var stack = e.stack.toString().split(/\r\n|\n/);
// We want our caller's frame. It's index into |stack| depends on the
// browser and browser version, so we need to search for the second frame:
var frameRE = /:(\d+):(?:\d+)[^\d]*$/;
do {
var frame = stack.shift();
} while (!frameRE.exec(frame) && stack.length);
return frameRE.exec(stack.shift())[1];
}

function error (  msg, evaluation, line ) {//error("CSS", "Bad grammer!")
var caller = kaller = this.kaller || arguments.callee.caller, lineSeparator = "\u000A" + "\u000A",
stack = []; var counter = 0, tab = "\t", br  = "\u000A", origin,crank = true,
 types = type.types; line = line ? " on line " + line: " On line '...' ";
if (plain.numbers(msg)) {
    this.kaller = kaller; 
    return error("", null, msg);
}
while( counter < 20 ){
    if (kaller && kaller.name) {
        stack.push(kaller.name);
    } else if (kaller) { // a name is absent, so get some of its text
    var n =   String(kaller).match(/[\w\s]+\s*(\s+\w+){0,1}\(([\w\s\W].)+/)[0].trim();
    if (n[n.length - 1] != "{") { n += " {"; } 
    stack.push( n );
    }
    counter++; 
    if (kaller) {
        try{
            kaller = kaller.caller;
        }catch(err){
            continue;
        }
    }
}
delete this.kaller;
origin = stack[0];

if (msg) { 
   if (types[msg]) {
    msg = types[msg]; crank = false;
} else{
    forEach(function(type){
        if (type.match(msg)) { 
            msg = msg.replace(type.match(msg)," " + types[type]); 
        }
    }, types); crank = false;
}
}
 msg = !!msg ? "Error: " + msg: "Invallid arguments @" + origin;
plain.functions(evaluation) ? evaluation = !!(evaluation()) : 
    evaluation = !!(evaluation);  
if (!evaluation) {
    throw new TypeError( "Techie JavaScript API " + lineSeparator + 
        tab  + "Detailed API Error Message" + lineSeparator +
        "method:" + tab + tab + (caller ?  caller.name : null) + br
     + "call origin:" + tab + origin + br + 
     "message: " + tab + msg + br
      + "call chain:" + tab + tab + stack + br
       + "line:" + tab + tab + tab  + line + br );
}
return true;     
}
function warn (  msg, evaluation, line ) {//error("CSS", "Bad grammer!")
var caller = kaller = this.kaller || arguments.callee.caller, lineSeparator = "\u000A" + "\u000A",
stack = []; var counter = 0, tab = "\t", br  = "\u000A", origin,crank = true,
 types = type.types; line = line ? " on line " + line: " On line '...' ";
if (plain.numbers(msg)) {
    this.kaller = kaller; 
    return error("", null, msg);
}
while( counter < 20 ){
    if (kaller && kaller.name) {
        stack.push(kaller.name);
    } else if (kaller) { // a name is absent, so get some of its text
    var n =   String(kaller).match(/[\w\s]+\s*(\s+\w+){0,1}\(([\w\s\W].)+/)[0].trim();
    if (n[n.length - 1] != "{") { n += " {"; } 
    stack.push( n );
    }
    counter++; 
    if (kaller) {
        kaller = kaller.caller;
    }
}
origin = stack[0];

if (msg) { 
   if (types[msg]) {
    msg = types[msg]; crank = false;
} else{
    forEach(function(type){
        if (type.match(msg)) { 
            msg = msg.replace(type.match(msg)," " + types[type]); 
        }
    }, types); crank = false;
}
}
 msg = !!msg ? "Error: " + msg: "Invallid arguments @" + origin;
plain.functions(evaluation) ? evaluation = !!(evaluation()) : 
    evaluation = !!(evaluation);  
if (!evaluation) {
    console.error( "Techie JavaScript API " + lineSeparator + 
        tab  + "Detailed API Error Message" + lineSeparator +
        "method:" + tab + tab + (caller ?  caller.name : null) + br
     + "call origin:" + tab + origin + br + 
     "message: " + tab + msg + br
      + "call chain:" + tab + tab + stack + br
       + "line:" + tab + tab + tab  + line + br );
}
return true;     
}

function curry(data, fn, evaluation){
// element = curry(element, pt.createFrag, contains.invalidChars(element));
    if (plain.functions(evaluation)) { evaluation = evaluation();}
    return !evaluation ? function(){
    try { return fn( data);
    } catch(err){}
    }()
      /*if not done, cook it for me */ : data; /*Givee me to eat*/
}
function cast( sure, optional, boolean ){ //rebase between 2 options
    // nxsb = Techie.cast(this, nxsb, false);
        return optional ? optional: sure;
}
function enclose(dada){ //Used to form array when needed
return is.list(dada) ? dada : [dada];
}
function entechie(d){
return d ? d.techieString ? d: Techie.PT._(d) : error( d + " is not a valid object", null,nl() );
}
function pluralize(d){
return is.list(d)? d: [d];
}
function delta(ds, fn /*optional. Default is techie*/, type){
return type ? stub.alpha(ds, type, fn) :
(ds && is.techie(ds) && is.list(ds) ? fn.apply(ds, ds): fn.apply( (ds = Techie.emptyPT(ds)) , ds));
}
function alpha(x, typ, fn){//.alpha(div, "array", function(d){a(d)})
typ = type.data[stub.capA(typ).toLowerCase()]; if (!is.list(x)) {x = [x];}
return fn.call( (x = typ.apply(null, x)),   x );
}
function capA(s){//.capA("abacus") ====== Abacus
error("We need string here but got " + type(s), type(s, "string"), ln())
return s[0].toUpperCase() + s.slice(1, s.length);
}
function single(d){
return is.list(d) ? d[0]: d;
}


// 
var EventsHook = { 
/*I WANT TO MAKE A CONNECTION BETWEEN ELEMENT< EVENT AND HANDLER
Premise: The data here is mostly recieved from addHandler and removeHandler methods. These already 
     work on the basis of plurals. So, eveeery data here is singular and should be treated so.

*/
hasEvent: function(element, eventType){
// if no eventType is provided, we check wether it has an event at all.
// Check if a particular event e.g click exists on a single element
var present = this.hookedElements.indexOf(element) > -1;
if (eventType && present) {
present = this.events[eventType]["elements"].indexOf(element) > -1;
} 
return present;
},
hasHandler: function(handler, element){
// check wether this particlular handler has bee registered on element
// If element is not present, we just check if we have handler registered on any element at all
var registered = this["details"]["handlers"].indexOf(handler) > -1;
if (registered && element) {
    registered = this["monitoredElements"][element]["handlers"].indexOf(handler) > -1;
}
return registered;
},
hook: function(dom, event, handler){ 
this["details"]["handlers"] = this["details"]["handlers"] || [];
this["details"]["elements"] = this["details"]["elements"] || [];
this["details"]["events"] = this["details"]["events"] || [];
this["details"]["handlers"].push(handler);
this["details"]["events"].push(event);
this["details"]["elements"].push(dom);

this["events"][event] = this["events"][event] || {};
this["events"][event]["handlers"] = this["events"][event]["handlers"] || [];
this["events"][event]["elements"] = this["events"][event]["elements"] || [];
this["events"][event]["handlers"].push(handler);
this["events"][event]["elements"].push(dom);

this["monitoredElements"][dom] = this["monitoredElements"][dom] || {};
this["monitoredElements"][dom]["handlers"] = this["monitoredElements"][dom]["handlers"] || [];
this["monitoredElements"][dom]["events"] = this["monitoredElements"][dom]["events"] || [];
this["monitoredElements"][dom]["handlers"].push(handler);
this["monitoredElements"][dom]["events"].push(event);

this["types"].push(event);
this["number"] += 1;
},
unhook: function(dom, event, handler){
this["details"][handler] = null;
// this[event].push(handler);
// this["types"].push(event);
},
empty: function(click){
// Destroy all click events from here
click = this["events"][click]; var Handler;
click.forEach(function(hanlder){
Handler = this["details"][handler];        
Techie.PT.removeHandler(Handler[0], Handler[1], handler);
}.call(this));
this["events"][click] = null;
return this;
},
emptyAll: function(){
// Destroy all registered events
this.types.forEach(function(focus){
this.empty(focus);
}.call(this));
},
details: {},
types: [],
monitoredElements: {},
number: 0,
events: {}
/*T,
handler: [dom, event],
click: [handler, handle, hand, an], //These are filled up automatically
types: [click, focus, mouseup, mousedown, keyup]*/
};
EventsHook["hookedEvents"] = EventsHook.types
EventsHook["hookedElements"] = EventsHook["monitoredElements"];
// EventsHook[""] = EventsHook["monitoredElements"];


var Events = {
EventsHook: EventsHook,
bind: function bind(type, data, handler){
if (is.functions(this)) {
    return Function.prototype.bind.apply(null, arguments);
}
// .bind("focus", Object("Mike stop!"), alert);
// .bind("click event", console.log);
// .bind("change", showMessage)
// .bind("click, change, mouseover", {verify:true}, allow);
// .bind({}); 
handler = handler || data;
if (handler == data) {data = null;}
var built = {}, indication, object = this;
switch(true){
case typeof type === "string" || plain.arrays(type):
(typeof type === "string" ? type.split(" ") : type).forEach(function(type){built[type] = handler;}); break;
case plain.primitives(type): throw new Error("Wrong syntax at event.bind()");break;
default: built = type;
}
forEach.call(built, function( handler, type){
if (handler && type && typeof handler.bind === "function") {
    object.addHandler(type, handler.bind(null, data));
}
});
return this;
},
isEventSupported: function isEventSupported(global) {
var TAGNAMES = {
'select':'input','change':'input',
'submit':'form','reset':'form',
'error':'img','load':'img','abort':'img'
}, 
oneventName,  clean, cache  =  {}, /*catched results*/element ;
return function isSupported ( eventName ) {
clean = function(expr){
cache[eventName] = expr; 
if (element && element[oneventName]) element[oneventName] = null    
if (element && element.setAttribute) element.removeAttribute(oneventName);
element = null; return expr;
};
 if(cache[eventName]) return cache[eventName]; //Use availabe storage
element   =  document.createElement(TAGNAMES[eventName] || 'div');
if (  (oneventName = 'on' + eventName.toLowerCase() ) in window)  return clean(true);
if (   (oneventName in element) )   return clean(true);
  // if it has no `setAttribute` (i.e. doesn't implement Node interface), try generic element
if (!element.setAttribute) element = document.createElement('div');
element.setAttribute(oneventName, "return" );
if (    typeof element[oneventName] === 'function' )    return clean(true);
if( global.Event && typeof(global.Event)  === "object") return clean(oneventName.toUpperCase() in global.Event);
return clean(false);
}
}(w),
addListener: function(type, listener) { // create an array if it doesn't exist 
    if (!this.hasOwnProperty("_listeners")) {
        this._listeners = [];
    }
    if (typeof this._listeners[type] == "undefined") {
        this._listeners[type] = [];
    }
    this._listeners[type].push(listener);
},
fire: function(event) {
    if (!event.target) {
        event.target = this;
    }
    if (!event.type) { //falsy
        throw new Error("Event object missing 'type' property.");
    }
    if (this._listeners && this._listeners[event.type] instanceof Array) {
        var listeners = this._listeners[event.type];
        var i, len = listeners.length;
        for (i = 0; i < len; i++) {
            listeners[i].call(this, event);
        }
    }
},
removeListener: function(type, listener) {
    if (this._listeners && this._listeners[type] instanceof Array) {
        //corrected listeners 's'
        var listener = this._listeners[type];
        var i, len = listeners.length;
        for (i = 0; i < len; i++) {
            if (listeners[i] === listener) {
                listeners.splice(i, 1);
                break;
            }
        }
    }
},
getClipboardText: function(event) {
    var clipboardData = (event.clipboardData || window.clipboardData);
    return clipboardData.getData("text");
},

setClipboardText: function(event, value) {
    if (event.clipboardData) {
        return event.clipboardData.setData("text/plain", value);
    } else if (window.clipboardData) {
        return window.clipboardData.setData("text", value);
    }
},

getWheelDelta: function(event) {
    if (event.wheelDelta) {
        return (client.engine.opera && client.engine.opera < 9.5 ?
            -event.wheelDelta : event.wheelDelta);
    } else {
        return -event.detail * 40;
    }
},
getCharCode: function(event) { 
    if (Object.prototype.toString.call(event.charCode) == "[object Number]") {
        return event.charCode;
    } else if (event.keyCode) { 
        return event.keyCode;
    }
    return null;
},
//used to get mouse click right, left, midle wheel
getMouseButton: function(event) {
    if (document.implementation.hasFeature("MouseEvents", "2.0")) {
        return event.button;
    } else {
        switch (event.button) {
            case 0:
            case 1:
            case 3:
            case 5:
            case 7:
                return 0;
            case 2:
            case 6:
                return 2;
            case 4:
                return 1;
        }
    }
},
on: function on(event, fn, object) {//window.on("scroll", function(){});
    enclose(cast(this, object)).forEach(function( object, index) {
        Events.addHandler(object, event, fn.bind(this));
    }, null, this); 
    return this;
},


unbind: function recreateNode(el, withChildren) {
/* unbind(node) clone only the parent node 
unbind(node, true)Remove event listeners on an element and all of its children
*/
el = isCollection(el) ? el : is.html(el) ? [el]: error("html", null, ln());
forEach(function(el){
if (withChildren) {
el.parentNode.replaceChild(el.cloneNode(true), el);
}else {
var newEl = el.cloneNode(false);
while (el.hasChildNodes()) newEl.appendChild(el.firstChild);
el.parentNode.replaceChild(newEl, el);
}
}, el);
return this;
},

//TECHIE METHODS

//TECHIE METHODS
dispatch: function dispatch(event_type){//Fire event_type on all matching set .dispatch("submit").dispatch("click")
  if (!(event_type && event_type.split)) {
    return console.error(event_type + " is not a valid event type.")
  }

  this.each(function(element){
    if (element.fireEvent) {
      element.fireEvent("on" + event_type);
    } else {
      var eventObject = document.createEvent("MouseEvents");
      eventObject.initEvent(event_type, true, false);
      if (element.dispatchEvent(eventObject) == false) {
        console.info( event_type + "Event default behaviour was prevented.");
        // Something can be done here as a fallback since preventDefault ws called
      } else{
        // Success! Do more after the event has successfully handled
      }
    }
  });
  return this;
},
enter: function enter(fn) {
  this.once(function(){  
    var This = this;
    this.addHandler(document, "keydown", function(event){
      if (( event || window.event ).keyCode == 13) {
         fn.call(This);
  }
    });
  });
    return this;
},

escape: function escape(fn) {
  this.once(function(){
    this.addHandler(document, "keydown", function(event){
      if (( event || window.event ).keyCode == 27) {
         fn.call(this);
  }
    });
  });
    return this;
},


 keypress: function keypress(fn, e) {
    delta( cast(this, e), function(element){
        this.addHandler(document, "keypress", function ( event ) {
                fn.call( element[0], event, element[0] ); 
        });
    }.bind(this));
   
    return this;
},

keypresss: function Keypress(fn, e) {
    delta(cast(this, e), function(){
          this.each(function(element){
        this.addHandler(element, "keydown", function(event){
    var evt = evt || window.event;
    fn.call(element, evt, evt.keyCode);
        })
});
    });
},

off: function recreateNode(el) {
/* off(node) clone only the parent node */
el = isCollection(el) ? el : is.html(el) ? [el]: new Error("unbind no element");
forEach(function(el){
var newEl = el.cloneNode(false);
while (el.hasChildNodes()) newEl.appendChild(el.firstChild);
el.parentNode.replaceChild(newEl, el);
}, el);

return this;
},


mouseEnter: function mouseEnter(fn, obj){
delta(cast(this, obj), function(){
this.each(function(element){
    this.addHandler("mouseenter", fn.bind(obj))
})
});
return this;
},

mouseLeave: function mouseLeave(fn, obj){
delta(cast(this, obj), function(){
this.each(function(element){
    this.addHandler("mouseleave", fn.bind(obj))
})
});
return this;
},

hover: function hover(fn, func) {
  switch(true){
    case Object.prototype.toString.call(fn) != "[object Function]":
    case Object.prototype.toString.call(func) != "[object Function]" && Object.prototype.toString.call(func) != "[object Undefined]":
      throw new TypeError(".hover expects a function and an optional second argument which must also be a function if provided.");
  }
  this.each(function(element){
    this.addHandler("mouseenter", (fn || function(){}).bind(this)).addHandler("mouseleave", (func || function(){}).bind(element));
  });
return this;
},

clicker: function click( handler, object ) {
    delta(cast(this, dom), function(){
        this.each(function(element){
            this.addHandler("click", handler.bind(element))
        });
    });
    return this;
},

changeer: function (handler, dom){
   delta(cast(this, dom), function(){
    this.each(function(element){
        this.addHandler("change",  handler.bind(element));
    });
   });
   return this;
},

Submit: function(fn, dom){
    delta(cast(this, dom), function(){
        this.each(function(element){
            this.addHandler("submit", fn.bind(element));
        })
    })
    return this;
},
removeOnPrefix: function removeOnPrefix(type){
    return type.replace(/^on/i, "");
},
addHandler: function addHandler(element, type, handler) {
    if (cast(type, handler) == type) { //Hanadle two arguments case
     handler = type;   type = element; element = this;
    }
    type = Events.removeOnPrefix(type);
    delta(element, function(){
      var dom = this, und;
        this.each(function(element){
            element.addEventListener ? element.addEventListener(type, handler.bind(dom), false) :
                element.attachEvent ? element.attachEvent( "on" + type, handler.bind(dom)) :
                    element["on" + type] = handler.bind(dom);
                    EventsHook.hook(element, type, handler.bind(dom));
        });
    });
  return this;
},
removeHandler: function removeHandler(element, type, handler) {
    if (cast(type, handler) == type) { //Handle two arguments case
     handler = type;   type = element; element = this;
    }
    type = Events.removeOnPrefix(type);
    delta(element, function(){
        this.each(function(element){
            element.removeEventListener ? element.removeEventListener(type, handler, false) :
                element.detachEvent ? element.detachEvent( "on" + type, handler) :
                    element["on" + type] = null;
                    EventsHook.unhook(element, type, handler);
        });
    });
  return this;
},

getEvent: function(event) {
    return event ? event : window.event;
},


getTarget: function(event) {
    return event.target || event.srcElement;
},

target: function(event) {
    return event.target || event.srcElement;
},


preventDefault: function(event) {
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
},
prevent: function(event) {
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
},

stopPropagation: function(event) {
    if (event.stopPropagation) {
        event.stopPropagation();
    } else {
        event.cancelBubble = true;
    }
},

stop: function(event) {
    if (event.stopPropagation) {
        event.stopPropagation();
    } else {
        event.cancelBubble = true;
    }
},

relatedTarget: function(event) {
        if (event.relatedTarget) {
            return event.relatedTarget;
        } else if (event.toElement) {
            return event.toElement;
        } else if (event.fromElement) {
            return event.fromElement;
        } else {
            return null;
        }
    },

getRelatedTarget: function(event) {
        if (event.relatedTarget) {
            return event.relatedTarget;
        } else if (event.toElement) {
            return event.toElement;
        } else if (event.fromElement) {
            return event.fromElement;
        } else {
            return null;
        }
    },
    strew: function(){// event bindings 
["beforeprint", "beforeunload", "blur", "canplay", "canplaythrough", "change", "click", 
"contextmenu", "dblclick", "devicelight", "devicemotion", "deviceorientation", "deviceproximity", 
"drag", "dragend", "dragenter", "dragleave", "dragover", "dragstart", "drop", 
"durationchange", "emptied", "ended", "error", "focus", "hashchange", "input", "invalid", 
"keydown", /*"keypress",*/ "keyup", "load", "loadeddata", "loadedmetadata", "loadstart", 
"message", "mousedown", "mouseenter", "afterprint", "mouseleave", "mousemove", 
"mouseout", "mouseover", "mouseup", "mozfullscreenchange", "mozfullscreenerror", 
"mozpointerlockchange", "mozpointerlockerror", "offline", "online", "abort", "pagehide", 
"pageshow", "pause", "play", "playing", "popstate", "progress", "ratechange", "reset", 
"resize", "scroll", "seeked", "seeking", "select", "show", "stalled", "submit", "suspend", 
"timeupdate", "unload", "userproximity", "volumechange", "waiting", "wheel"
/*<<<<<<<<<<<<<<<< timeupdate.>>>>>>>find out>>>>>>>>>>*/
/*HOW TO CREATE NEW EVENT IN JS.  we want to create an event called onconnect and dispatch 
it by the time the machine has internet access*/
].forEach(function(name){
    Events[ name ] =  Events[ "on" + capA(name) ] = Events[ "on" + name ] = function eventCliper(fn, target){
           Techie.PT.addHandler.call(cast(this, target), name, function eventHandler(event){
                fn.apply(this.each ? this: Techie.PT._(this), [event, this]);
            });
       return this;
    }
});
}
};

Events.strew();

var client = function client() { //client machine information

function istouch(){
return 'ontouchstart' in window || window.DocumentTouch && 
        document instanceof window.DocumentTouch || navigator.maxTouchPoints > 0 ||
            window.navigator.msMaxTouchPoints > 0;
}
var isMobile = /Mobi/i.test(navigator.userAgent);
   

    
   return {
    networkStatus: function(){
      // Will return either online or offline
      // Make a very reliable ajax request here to a file. 
      // request for a jSON file names status.json. If successful, return its status property esle offline
      var status = "offline";
      return status;
    }(),
    //Return client information

/* 

(function () {
var displayOnlineStatus = document.getElementById("online-status"),
isOnline = function () {
    displayOnlineStatus.innerHTML = "Online";
    displayOnlineStatus.className = "online";
},
isOffline = function () {
    displayOnlineStatus.innerHTML = "Offline";
    displayOnlineStatus.className = "offline";
};

if (window.addEventListener) {

    // Works well in Firefox and Opera with the 
    // Work Offline option in the File menu.
    // Pulling the ethernet cable doesn't seem to trigger it.
    // Later Google Chrome and Safari seem to trigger it well

window.addEventListener("online", isOnline, false);
window.addEventListener("offline", isOffline, false);
}
else {

    // Works in IE with the Work Offline option in the 
    // File menu and pulling the ethernet cable

document.body.ononline = isOnline;
document.body.onoffline = isOffline;
}
})();
*/

   online: function online(){
    //Determine if machine is online
     var ret = false;
    w.addEventListener("online", function(e){
        ret = true;
    });
    return ret;
   }(),
    offline: function offline(){
    //Determine if machine is online or just sitting down low
     var ret = true;
    w.addEventListener("online", function(e){
        ret = false;
    });
    return ret;
   }(),
        OS: "null",
        OSVERSION: "null",
        base: function(platform){//Platform x64/x86
            return platform ? platform.replace(/[A-z]+/i, "base x").replace("32", 86) : "null";
        }(navigator.platform),
        platform: function(platform){
            return platform ? platform.replace(/[\d]+/i, "").replace(/win/i, "Windows") : "null";
        }(navigator.platform),
        CPU: "null",
        GPU: "null",
    Locale: { //client machine location information
        Language: function lang(){
return navigator.language ? navigator.language: /*All except IE > 11*/
navigator.browserLanguage;
}(),
        country: null,
        state: null
    },
    mobile: function() { 
  function getOrientation(){
return Math.abs(window.orientation) - 90 == 0 ? "landscape" : "portrait";
}
 function getMobileWidth(){
return getOrientation() == "landscape" ? screen.availHeight : screen.availWidth;
}
 function getMobileHeight(){
return getOrientation() == "landscape" ? screen.availWidth : screen.availHeight;
}

return  {
    getOrientation: getOrientation, istouch: isMobile && istouch(), getMobileHeight: getMobileHeight, 
    getMobileWidth: getMobileWidth, orientation: getOrientation(), mobileHeight: getMobileHeight(),
    mobileWidth: getMobileWidth()
};
}(),
isMobile: isMobile,
isiphone: function(){
return /(iPhone|iPod|iPad)/i.test(navigator.userAgent);
}(),
isblackberry: function(){
return /BlackBerry/i.test(navigator.userAgent);
},
isandroidMobile: function (){
return  /Android/i.test(navigator.userAgent);
}(),
isnokiaMobile: function (){
return /Nokia/i.test(navigator.userAgent);
}(),
isoperaMobile: function() {
return /Opera Mini/i.test(navigator.userAgent);
}(),
iswindowsMobile: function() {
return /IEMobile/i.test(navigator.userAgent);
}(),
isMobileTouch: function(){
return istouch() && isMobile;
}(),
is: function(reg){//.is("opera") .is("safari") .is("linux") .is("Android") //IOS Android OS, Windows, Mac OS, Linux, mozilla, opera, IE, safari, webkit etc 
var ua = navigator.userAgent;
if (Object.prototype.toString.call(reg) == "[object String]") {
    reg = ua.match( (new RegExp ("\\b(" + reg + ")\\b", "gi")));
} else if (Object.prototype.toString.call(reg) == "[object RegExp]"){
    var match = ua.toLowerCase().match(reg);
    reg = match ? match: ua.match(reg);
}
return !!reg;
},
language: function lang(){
return navigator.language ? navigator.language: /*All except IE > 11*/
navigator.browserLanguage;
}(),
host: function(){ //To get the client platform like win linux android etc
var userAgent = window.navigator.userAgent,
platform = window.navigator.platform,
macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
iosPlatforms = ['iPhone', 'iPad', 'iPod'],
os = null;

if (macosPlatforms.indexOf(platform) !== -1) {
os = 'Mac OS';
} else if (iosPlatforms.indexOf(platform) !== -1) {
os = 'iOS';
} else if (windowsPlatforms.indexOf(platform) !== -1) {
os = 'Windows';
} else if (/Android/.test(userAgent)) {
os = 'Android';
} else if (!os && /Linux/.test(platform)) {
os = 'Linux';
}
return os;
}(),
browser: function(){ /*https://stackoverflow.com/questions/21391593/what-is-a-reliable-way-to-detect-a-clients-browser-and-its-version-number*/
var ua= navigator.userAgent, tem, 
M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*([\d\.]+)/i) || [];
if(/trident/i.test(M[1])){
tem=  /\brv[ :]+(\d+(\.\d+)?)/g.exec(ua) || [];
return 'IE '+(tem[1] || '');
}
M= M[2]? [M[1], M[2]]:[navigator.appName, navigator.appVersion, '-?'];
if((tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
return M.join(' ');
}(),
/*
var DOC = document;
var isStrict = DOC.compatMode == "CSS1Compat";
var isOpera = check(/opera/);
var isChrome = check(/chrome/);
var isWebKit = check(/webkit/);
var isSafari = !isChrome && check(/safari/);
var isSafari2 = isSafari && check(/applewebkit\/4/); // unique to
// Safari 2
var isSafari3 = isSafari && check(/version\/3/);
var isSafari4 = isSafari && check(/version\/4/);
var isIE = !isOpera && check(/msie/);
var isIE7 = isIE && check(/msie 7/);
var isIE8 = isIE && check(/msie 8/);
var isIE6 = isIE && !isIE7 && !isIE8;
var isGecko = !isWebKit && check(/gecko/);
var isGecko2 = isGecko && check(/rv:1\.8/);
var isGecko3 = isGecko && check(/rv:1\.9/);
var isBorderBox = isIE && !isStrict;
var isWindows = check(/windows|win32/);
var isMac = check(/macintosh|mac os x/);
var isAir = check(/adobeair/);
var isLinux = check(/linux/);
var isSecure = /^https/i.test(window.location.protocol);
var isIE7InIE8 = isIE7 && DOC.documentMode == 7;

var jsType = '', browserType = '', browserVersion = '', osName = '';

*/
screen: function(x){//.screen() .screen("width") .screen("height")
var width = document.documentElement.clientWidth, 
height = document.documentElement.clientHeight,
availableWidth = null, availabeHeight = null;
if (!x) {
return {availabeHeight: availabeHeight, availableWidth: availableWidth, height: height, width: width};
}
},


getScreenWidth: function getScreenWidth(){
var de = document.body.parentNode;
var db = document.body;
if(window.opera) return db.clientWidth;
if (document.compatMode == 'CSS1Compat') return de.clientWidth;
else return db.clientWidth;
}
}

}();
window.c = client;
return stub = {
Events: Events,
is: is,
contains: contains,
type: type,
types: types,
plain: plain,
error: error,
errors: error,
warn: warn,
log: console.log,
single: single, capA: capA, alpha: alpha, delta: delta, pluralize: pluralize, entechie: entechie, cast: cast,
ln: ln, enclose: enclose, curry: curry,
isHTML: function isHTML(s) {
return this.is.node(s) ? ( (s.nodeType == 1) ? true : false) : false;
},
mixin: function mixin(receiver, supplier) {
receiver = !supplier ? this : receiver;
supplier = supplier || receiver;
if (Object.getOwnPropertyDescriptor && Object.keys ) {
    Object.keys(supplier).forEach(function(property) {
        var descriptor = Object.getOwnPropertyDescriptor(supplier, property);
        if (!(property in receiver)) {
            Object.defineProperty(receiver, property, descriptor);
        }
        
    });
} else {
    for (var property in supplier) {
        if (supplier.hasOwnProperty(property)) {
            if (!receiver [ property ]) {
                receiver[ property ] = supplier[ property ]
            }
            
        }
    }
    return receiver;
}
return receiver;
},
Slice: function Slice(array, n, stop) {
n = n || 0;
array = array || this;
stop = stop || array.length;
var argsArray = [],
    length = stop,
    i = 0; 
for (; i < length; i++) {
    argsArray[i] = array[n];
    n++
}
return argsArray;
},
implode: function(array, This){
  // array is a real list nesetd to any length. Break all the elements involved into the array at This or this
  This = This || this;
  if (This.concat) {

   return This.concat(this.explode(array));
  }
  throw new TypeError("impode called on non array. ");
},
explode: function explode ( anyNoOfArgs ) {
if (typeof explode.stk === "undefined" ) {
explode.counter = 0; explode.count = arguments.length;
explode.crank = true; explode.stk = [];
}
  if (explode.counter == explode.count) {
    return explode.stk;
}
while(explode.counter > arguments.length){

if (is.list( item )) {
explode.array = item; explode(explode.array); } else { explode.stk.push(item); }
}
return explode.stk;
},
List: function List ( array ) {
List.array = typeof List.array === "undefined" ? [] : List.array;
List.Length = typeof  List.Length === "undefined" ? 0 :  List.Length;
if (  List.Length < array.length ) {
List.array [ List.Length ] =  array [  List.Length ];  List.Length++;
List ();
}

},

exploder: function explode ( anyNoOfArgs ) {
if (explode.crank == null) {
explode.counter = 0; explode.count = arguments.length;
explode.crank = true; explode.stk = []; explode.array = arguments;
}
  if (explode.counter == explode.count) {
    return explode.stk;
}
    explode.counter++;
forEach( function ( item ) {
if (Techie.PT.isList( item )) {
explode.array = item; explode(explode.array); } else { explode.stk.push(item); }
}, explode.array, this );
return explode.stk;
},

explode: function explode(array, n) {
if (typeof array !== 'object' && typeof array !== 'array') {throw "Errors"}
var stk = [], item = null, argsArray = array, index;
if ((Object.prototype.toString.call(array) != '[object Object]') && ('0' in array)) {
    argsArray = stub.Slice(array, n || 0);
}
return function explode(array) {
    for (index in array) {
        if (array.hasOwnProperty(index)) {
            item = array[index];
            if (toString.call(item) == '[object Array]' || toString.call(item) == '[object Arguments]') {
                explode(item);
            } else {
                stk.push(item);
            }
        }
    }
    return stk
}(argsArray);
},
parseHTML: function strToEls(str) {
var contextRange = document.createRange();
contextRange.setStart(document.body, 0);
return contextRange.createContextualFragment(str);
},
load: function loadScripts(urls, yeyCallback, neyCallback) {
var count = urls.length;
var errored = false;

if (urls.length == 0) return yeyCallback();

urls.forEach(function(url) {
var script = document.createElement('script');
script.onload = function() {
if (errored) return;
if (!--count) yeyCallback();
};
script.onerror = function() {
if (errored) return;
neyCallback();
errored = true;
};
script.src = url;
document.head.insertBefore(script, document.head.firstChild);
});
},

load: function load(src){
var length = 0;
while ( length < arguments.length ){
    src = arguments[length];
    var file, ext = /\.[A-z]+$/.exec(src)[0], 
 script = sapi.createElement("script"), bool, css = sapi.createElement("link");
  css.id = "dynamic_style"; script.id = "dynamic_script";
switch(ext){
    case ".css": 
    file = css; file.rel = "stylesheet"; file.href = src;
    file.type = "text/css";
    break;
    case ".js":
    file = script;file.type = "text/javascript"; file.src = src;
    break;
    default: throw new Error("The extension suppied is invalid.");
}

var b = Techie.PT._("head").prependChild(file);
length++;
}
return bool;
},

extend: function extend() {
/*
LEGEND
copy: 
*/
var src, copyIsArray, copy, name, options, clone,
target = arguments[ 0 ] || {},
i = 1,
length = arguments.length,
deep = false;

// Handle a deep copy situation
if ( typeof target === "boolean" ) {
deep = target;

// skip the boolean and the target
target = arguments[ i ] || {};
i++;
}

// Handle case when target is a string or something (possible in deep copy)
if (typeof target !== "object" && typeof target !== "function") {
target = {};
}

// extend jQuery itself if only one argument is passed
if ( i === length ) {
target = this;
i--;
}

for ( ; i < length; i++ ) {

// Only deal with non-null/undefined values
if ( ( options = arguments[ i ] ) != null ) {
    // Extend the base object
    for ( name in options ) {
        src = target[ name ];
        copy = options[ name ];

        // Prevent never-ending loop
        if ( target === copy ) {
            continue;
        }
        // Recurse if we're merging plain objects or arrays
        if ( deep && copy && ( Object.prototype.toString.call(copy) == "[object Object]"
         ||  ( copyIsArray = Object.prototype.toString.call(copy) == "[object Array]" ) ) ) {

            if ( copyIsArray ) {
                copyIsArray = false;
                clone = src && Object.prototype.toString.call(src) == "[object Array]" ? src : [];

            } else {
                clone = src && Object.prototype.toString.call(src) == "[object Object]" ? src : {};
            }

            // Never move original objects, clone them
            if (!target[name]) {
            target[ name ] = extend( deep, clone, copy );//Job engine
            }

        // Don't bring in undefined values
        } else if ( copy !== undefined ) {
            if (!target[name]) {
                target[ name ] = copy;
            }
        }
    }
}
}

// Return the modified object
return target;
},




getSelectionString: function getSelectionString(el, win) {
win = win || window;
var doc = win.document, sel, range, prevRange, selString;
if (win.getSelection && doc.createRange) {
sel = win.getSelection();
if (sel.rangeCount) {
  prevRange = sel.getRangeAt(0);
}
range = doc.createRange();
range.selectNodeContents(el);
sel.removeAllRanges();
sel.addRange(range);
selString = sel.toString();
sel.removeAllRanges();
prevRange && sel.addRange(prevRange);
} 
else if (doc.body.createTextRange) {
range = doc.body.createTextRange();
range.moveToElementText(el);
range.select();
}
return selString;
},
walk_the_NODES: function walk(node, func) {   
 func(node);   
  node = node.firstChild;    
  while (node) {        
    walk(node, func);        
    node = node.nextSibling;   
     } 
 },


walk_My_DOM: function walk(node, func) {
func(node);
node = node.firstChild;
while (node) {
walk(node, func);
node = node.nextSibling;
}
},
walk_the_DOM: walk_The_Dom,
reverse_walk_the_DOM: function walk(node, func) {
node = node.lastChild;
if (node && node.nodeType == 1) func.call(node, node);
while (node) {
    walk(node, func);
    node = node.previousSibling;
}
},
run_the_DOM: function run(node, func, /*ignore*/ Node, counter){
if (typeof count === "undefined") {var count = counter = 0;} //keep track
if (node && node.nodeType && node.nodeType == 1) {
    Node = func.call(node.parentNode, node, node.firstChild, node.lastChild, counter);
    counter++;
}
if (!node || Node == true ) {return node;}
node = node.nextSibling;
run( node, func );            
},
reverse_run_the_DOM: function run(node, func, /*ignore*/ Node, counter){
if (typeof count === "undefined") var count = counter = 0;//keep track
if (node && node.nodeType && node.nodeType == 1) {
    Node = func.call(node.parentNode, node, node.firstChild, node.lastChild, counter);
    counter++;
}
if (!node || Node == true ) {return node;}
node = node.previousSibling;
run( node, func );            
},

run_the_NODES: function run(node, func){
if (!node || func(node) == true ) {return node;}
node = node.nextSibling;
run( node, func );            
},

forEach: function forEach ( action, object, This )  {
var length, index = 0;  object = object || this;
if (object.length) {  length = object.length;
    for (; index < length; index++) {
        if (action && action.call &&  action.call(This || Techie.PT.emptyPT().push(object[index]), object[index], index, object) === false ) {  break; }
    } } else {  for (index in object) {
        if ( action && action.call && object.hasOwnProperty( index )) {
            if (action.call( This ||  Techie.PT.emptyPT().push(object[index]), object[index], index,  object ) === false) { break; } 
} } }
return object;
},


    once: function once (fn, This){
        var length = this.length; var jota = 0;
        for ( ; jota < length; jota++ ) { 
        fn.call(  This || Techie.PT.emptyPT().push(this[ jota ]), this[ jota ], jota, this );
        break;
        }
        return this;
    },


each: function forEach ( action, object, This )  {
var length, index = 0;  object = object || this;
if (object.length) {  length = object.length;
    for (; index < length; index++) {
        if ( action && action.call(This ||  Techie.PT.emptyPT().push(object[index]), object[index], index, object) === false ) {  
            break; 
        } else{ /*Fix stuff here*/ }
    }
     } else {  for (index in object) {
        if (object.hasOwnProperty( index )) {
            if (action.call( This ||  Techie.PT.emptyPT().push(object[index]), object[index], index,  object ) === false) { break; } 
} } }
return object;
},
index: function index(array, item, start) {
if (Object.prototype.toString.call(item) == "[object String]" 
&& Object.prototype.toString.call(array) == "[object String]") {
return array.search(item);}//good
var originalArray = array,originalItem = item, jota, er, count = -1;
array = isList(this) ? (toString.call(array) == "[object Array]" ? 
array : this) : array; var length = array.length;
item = array == this ? originalArray : item;
if (array == this && item == originalArray && start) {
er = "Techie.index(array, item, start), pt(array).index(item, start)";
throw new Error("Techie.index:- "+er);
}start = item == originalArray ? originalItem : start;
if (typeof start !== "number") {start = 0;}
if (start < 0) {start += length;if (start < 0) {start = 0;}}
if (start >= length) {return -1;}
for (;start < length; start++) {jota = array[start];
if (item == jota) { count = start;break;
} else if (item == start) {count = jota; break;}
}
return count;
},
Extender: function Extender(Recievers, Suppiers) {
if (!Recievers) {
    return null
}
if (arguments.length < 2) { //Rebase accordingly
    Suppiers = Recievers;
    Recievers = this;
}
if (toString.call(Recievers) != '[object Array]') { //Recievers is an array of objects
    Recievers = new Array(Recievers);
}
if (toString.call(Suppiers) != '[object Array]') { //Suppiers is an array objects
    Suppiers = [Suppiers];
}
var index, jot;
Recievers = slice.call(Recievers);
Suppiers = slice.call(Suppiers); 
Recievers.forEach(function(Reciever) {
    Suppiers.forEach(function(object) {
        for (jot in object) {
            if (object.hasOwnProperty(jot)) {
                Reciever[jot] = object[jot];
            }
        }
    });
});
return Recievers[1] ? Recievers : Recievers[0];
},


machine: { //

issues: [], //cache to hold all issues if any
noIssues: true, //A crank to latch on when issues come up. Just crank it to false and everything stops!
vendor: { // browser infos
        online: function online (){
            return global.navigator && global.navigator.online;
        }
}, //browser
version: null, //version
support: { //browser supports level determination
        html5: null,
        JS5: null,
        JS6: null,
        JS7: null
    },
online: function(){
        return global.navigator && global.navigator.online;
    },
    offline: function (){
        return global.navigator && global.navigator.online;
    },
    client: client,

}
};

}, function factory( window, machine, factor, sapi, _pt ) {

/**************factory*********************/


    /*
    *
    *Application Work starts below
    *_pt is factory
    *
    *_pt is factory, sapi is document, machine is machineInfo
    */

function a(msg){try {return confirm(msg) ?  a = null : false;}catch(e){ }}
function EventTarget() {}
var Events = EventUtil =  this.EventUtil = EventTarget.prototype = this.Events, contains = this.contains,
getSelectionString = this.getSelectionString , extend = this.extend, ln = this.ln,
mixin = this.mixin, error = errors = this.errors, type = this.type, plain = this.plain,
walk_the_DOM = walk = this.walk = this.walk_the_DOM, explode = this.explode, is = this.is,
Extender = this.Extender, types = this.types, forEach = each = this.forEach,
isList = is.list, isCollection = is.collection, isTechie = is.techie, 
isHTML = is.html, isNode = is.node, curry = this.curry, cast = this.cast,
pluralize = this.pluralize, single = this.single, delta = this.delta, enclose = this.enclose,
entechie = this.entechie, log = this.log, logError = console.error, warn = this.warn,
alpha = this.alpha, capA = this.capA, run_the_DOM = run = run_the_DOM = this.run_the_DOM,
pt = PT = Techie, Log, stringify, stringifyAll, _techie, _PT, _sapi,
Store = {},
search = ("str").search,
lower = ("str").toLowerCase,
upper = ("str").toUpperCase,
toString = Store.toString,
array = [],
slice = array.slice,
split = ("str").split,
splice = array.splice,
join = array.join,
h1 = '<h1>', h1close = "</h1>",
h2 = '<h2>', h2close = "</h2>",
h3 = '<h3>', h3close = "</h3>",
h4 = '<h4>', h4close = "</h4>",
h5 = '<h5>', h5close = "</h5>",
h6 = '<h6>', h6close = "</h6>",
div = '<div>', divclose = "</div>",
table = '<table>', tableclose = "</table>",
row = '<tr>', rowclose = "</row>",
 p = '<p>', pclose = "</p>",
br = '<br />',
hr = '<hr />',
head = "<head>", headclose = "</head>",
header = "<header>", headerclose = "</header>",
footer = "<footer>", footerclose = "</footer>",
body = "<body>", bodyclose = "</body>",
small = "<small>", smallclose = "</small>",
input = "<input type='text'>",
form = "<form>", formclose = "</form>",
cell = "<td>",
thead = "<thead>", theadclose = "</thead>",
tbody = "<tbody>", tbodyclose = "</tbody>",
span = '<span>', spanclose = "</span>"
;
// a(error("html"))

var matchFunc = this.matchFunc = function matchFunc(fn){
    fn = String(fn).match(/[\w\s]+\s*(\s+\w+){0,1}\(([\w\s\W].)+/)[0].trim();
        return fn[fn.length - 1] == "{" ? fn : fn + " {";
    };
var match = this.match = function match( pattern, string ) {
var regexp = new RegExp("\\ b(" + pattern + ")\\b", "gi");
   return regexp.match( string );
};

var Reg = {
    match: function (pattern, str){
        if (!str) {
            if (string(this)) {
                str = this;
            } else if(string(this[0])){
                str = this[0];
            }
        }
        Techie.PT.errors("string", string(str), ln());
       return (str = new RegExp("\\(" + pattern + ")\\", "gi").match(str));
    },

    getFlags: function getFlags(re) {
            var text = re.toString();
            return text.substring(text.lastIndexOf("/") + 1, text.length);
        },
   hasRegExpU: function hasRegExpU() { 
    /* /^.$/u  method  to check if u flag is supported */
    try {
    var pattern = new RegExp(".", "u");
    return true;
    } catch (ex) {
    return false;
        }
    },

    hasRegExpY: function hasRegExpY() {
    try {
    var pattern = new RegExp(".", "y");
    return true;
    } catch (ex) {
    return false;
    }
}

};


var FX = function(){
  return {
    slow: 600,
  xslow: 800,
  vslow: 1000,
  normal: 400,
  fast: 200,
  xfast: 100,

  settings: {
    options: ["slow", "fast", "xslow", "xfast", "normal"],
    slow: function(n){
      this.setting("slow", n);
      return this;
    },
    fast: function(n){
      this.setting("fast", n);
      return this;
    },
    xslow: function(n){
      this.setting("xslow", n);
      return this;
    },
    xfast: function(n){
      this.setting("xfast", n);
      return this;
    },
    setting: function(speed, degree){
      FX[speed] = degree;
    }
  },
easing: {
    linear: function(progress) {
        return progress;
    },
    quadratic: function(progress) {
        return Math.pow(progress, 2);
    },
    swing: function(progress) {
        return 0.5 - Math.cos(progress * Math.PI) / 2;
    },
    circ: function(progress) {
        return 1 - Math.sin(Math.acos(progress));
    },
    back: function(progress, x) {
        return Math.pow(progress, 2) * ((x + 1) * progress - x);
    },
    bounce: function(progress) {
        for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
            if (progress >= (7 - 4 * a) / 11) {
                return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
            }
        }
    },
    elastic: function(progress, x) {
        return Math.pow(2, 10 * (progress - 1)) * Math.cos(20 * Math.PI * x / 3 * progress);
    }
},

fadeIn: function(element, options) {
    var to = 0;
    this.animate({
        duration: options.duration,
        delta: function(progress) { 
            progress = this.progress;
            return FX.easing.swing(progress);
        },
        complete: function complete(){
          if (options.complete) {
            options.complete();
          }
        },
step: function(delta) {
            if (element && element.style) {
              var display, timer = setTimeout(function(){
                clearTimeout(timer);
              if ((display = FX.displays.search(element))) {
                element.style.display = display;
                FX.displays.unregister(element);
              } else{
                element.style.display = "block";
              }
              element.style.opacity = to + delta;
              }, 0);
            }
        }
    });
},

fadeStyle: function fade (node) { // fade(document.body);
var level = 1;    
var step = function () {
var hex = level.toString(16);
node.style.backgroundColor = '#FFFF' + hex + hex; 
if (level < 15) {
level += 1;  
setTimeout(step, 100);  
}};       
setTimeout(step, 100); 
},

fadeOut: function(element, options) {
    var to = 1;
    this.animate({
        duration: options.duration,
        delta: function(progress) {
            progress = this.progress;
            return FX.easing.swing(progress);
        },
        complete: function(){
            if (options.complete) {options.complete.call(element, element)}
              FX.displays.register(element);
                // element.style.display = 'none';
        },
        step: function(delta) {        
            element.style.opacity = to - delta; 
        }
    });
},

animate: function(options) {
    var start = new Date;
    var id = setInterval(function() {
        var timePassed = new Date - start;
        var progress = timePassed / options.duration; 
        if (progress > 1) {
            progress = 1;
        }
        options.progress = progress; 
        var delta = options.delta(progress);
        options.step(delta);
        if (progress == 1) {
            clearInterval(id);
            options.complete();
        }
    }, options.delay || 10);
},

  displays: {
    // "inline-block": [elementOne, elementTwo, elementThree, elementFour]
    register: function register(node){
      var display = Techie.computedStyle(node)["display"];
      if (this[display] == null) {
        this[display] = [];
      }
      this[display].push(node);
    },
    unregister: function unregister(node){
      var display = Techie.computedStyle(node)["display"], array;
      if (!(array = this[display])) {
        return null
      }
      this[display].splice(this[display].indexOf(node), 1);
    },
    search: function search(node){
      var bool = null, jot, display;
      for(jot in this){
        if (this.hasOwnProperty(jot)) {
          display = this[jot];
          if (is.array(display) && display.indexOf(node) > -1) {
          console.log(display)
            bool = jot;
            break
          }
        }
      }

      return bool;
    }
  },

  
  };
}();

function Animation (){ 
//jQuery(selector).animate({css},speed,easing,callback)
// jQuery(selector).animate({css},{options})
// https://www.w3schools.com/jquery/eff_animate.asp
// var animation = element.animate(keyframes, options); 
// https://developer.mozilla.org/en-US/docs/Web/API/Element/animate
// Proper planning of the Techie animation module
}

extend(Animation, {
// Techie animation methods and options here
Animate: function(data){
// requestAnimationFrame(data)
}
})

function Techie(selector, context) {
//Welcome To Techie JavaScript API version 0.0.1; Techie constructor lives in Techie
return this instanceof Techie ? Techie(selector, context) : new Techie.PT.Techie(selector, context);
}

Techie.PT = Techie.pt = Techie.prototype = _techie = {

constructor: Techie,

FX: FX,
Animation: Animation,
Techie: function PT(selector, context) { 
 var funcs, string, object, others, index = 0, str = ({}).toString.call(selector), 
prevObject, nextObject, nodes = [], length, toString, wrapper, leng = 0;
if (typeof defaultContext === "undefined") {
  var defaultContext = context;
}
var tostring = function toString( arg, nothing ){
if (!arguments.length) {return this.techieString;} var 
type = typeof this[0], data = types.data, datum = data[type], data = eval(datum);
return data && data.call ? (data(this[0])).toString(arguments[0]):
Object.prototype.toString.call(arguments[0]); 
}
Techie.PT.DefineProperties(this, {
toString: tostring
}, true);

if ( selector && context == null ) {arguments.length = 1;}
if (!selector) {
this.length = 0;
return this;
} else if (plain.functions(selector)) {
Techie.PT.ready( selector );
return this;
} else if ( typeof selector === "object" ) {  
// document window Date, RegExp "[object Array]" "[object Object]" "[object Techie]"
if(isCollection(selector)){
// "[object Nodelist]" "[object HTMLCollection]" "[object Techie]"
nodes = slice.call(selector); 
} else{  
if (selector.nodeType != +selector.nodeType && selector != window && selector != document && !selector.document) {
    this.each(function(property, index){
    this[index] = property; leng++;
}, selector, this);
    Techie.PT.DefineProperty( this, "length", leng, true );
    return this;
} else { if(selector.nodeType == 1 || selector == sapi) { //Document, Nodes and Elements
    nodes = [selector];
} else{
    this[0] = selector; this.length = 1;
}
}


}


} else if (plain.strings(selector)) {
selector =  selector.trim();
typeof context === "string" ? context = Techie.PT.grab(context) :
   is.list(context) ? context =  context[0]: context;
context = !context ? document: isList(context) && context[0].querySelectorAll ?
context[0]: context.querySelectorAll ? context : document;
if (selector [0] === '<' && selector[selector.length - 1] === ">" && selector.length >= 3 ) {
            nodes = [this.createFrag(selector, context == sapi ? null: context)];
} else if (Techie.PT.matchesSelector(context, selector)) {
            nodes = slice.call(context.querySelectorAll(selector));
} else  if (Techie.PT.matchesSelector( context, "."+selector)) {
console.warn("Wrong Techie syntax. It ought to be " + "." + selector);
return Techie.PT._("."+selector, context);
} else if (Techie.PT.matchesSelector(context, "#"+selector)) {
console.warn("Wrong Techie syntax. It ought to be " + "#" + selector);
return Techie.PT._("#"+selector, context);
}

} else if ( str != "[object String]" && str != "[object Comment]" && str != "[object Text]" && (selector.length == +selector.length) ) {
nodes = slice.call(selector);
} else {
others = slice.call(arguments); length = others.length; Techie.PT.DefineProperty( this, "length", length, false );
while ( length ) { this[ index ] = others[ index ]; length--; index++; } index = 0; return this;
}
if (!(nodes[0] && nodes[0].nodeType) && Object.prototype.toString.call(selector) != "[object String]") { return this;}
var That = this
forEach(function( node, index, object ) { 
this[index] = node;
}, nodes, this);
this.length = nodes.length;
this.each(function(e) {
if (e && e.tagName && !this[e.tagName]) {
this[e.tagName.toLowerCase()] = e;
}
}, null, this);
if (this[0] && this[0].tagName) {
if (!this["head"]) { this["head"] = this[0].ownerDocument.head;}
if (!this["body"]) { this["body"] = this[0].ownerDocument.body;}
}
Techie.prototype.defaultParameters = this.parameters;
if (plain.functions(defaultContext)) { 
this.ready(function( $, body, head, doc, _, w, Log, stringify, stringifyAll, a ){
var cntxt = defaultContext, data = $(selector); //We have already fetched data normally
if (this.parameters.indexOf("element") < 0) {
  this.parameters.splice(1, 0, "element"); this.parameters.push("data");
}
return cntxt.apply(data, [$, data[0], body, head, doc, _, w, Log, stringify, stringifyAll, a, data]);
}); 
}
},
parameters: ["$", "body", "head",  "doc",  "_",  "w", "Log", "stringify", "stringifyAll", "a"],
state:  sapi.readyState,
isTechie: true, 
techieString: "[object Techie]", 
techie: "[object Techie]",
readyState: sapi.readyState,
version: "1.0",
loadStatus: function loadStatus (  ) {
return sapi.readyState;
},
isReady: function isLoaded ( ) {
return ["complete","loaded", "interactive"].indexOf(sapi.readyState) != -1;
},
isready: false,
SAPI: SAPI,
_: SAPI,
grab: grab,
emptyPT: emptyPT,

onReady: function onReady(func) { 
    this.isready = true;
    var head = this.head = sapi.head;
   var body = this.body = pt.next(head);
    this.head = document.head; 
    var Log = this.Log, stringify = this.stringify, stringifyAll = this.stringifyAll, element = this[0];
    if (func && func.call) {
    func.call(this, Techie,  sapi.body, sapi.head, sapi, SAPI, window, Log, stringify, stringifyAll, a);
}
},
ready: function ready(func) {
    if (this.isReady()) {
       return this.onReady.call(this, func);
    } else {
       // return  sapi.addEventListener("DOMContentLoaded", ready.bind(this, func));
       return  Events.addHandler(sapi,"DOMContentLoaded", ready.bind(this, func));
    }
},

hasObjects: function hasObjects( ref ) {
  if (!ref) { ref = this;} return typeof ( ref === "object" && !!ref[0] );
},

hasNodes: function hasNodes( element ) {//(element || this) is a HTMLCollection or a nodeList
if (!element) {element = this;} return (typeof element === "object" && isNode( element[0] ));
},
concat: function(array){
    var This = this;
  this.each.call(array, function(element){
    var length = This.length;
    This[length] = element; This.length++;
  });
  return this;
},
push: function(item){
  this[this.length++] = item;
  return this;
},


 shift: function(item){
  this.splice(0, 0, item);
  return this;
},
splice: Array.prototype.splice,
  slice: Array.prototype.slice,
 indexOf: Array.prototype.indexOf,
indexOf: Array.prototype.indexOf,
removeItem: function(item){  //.remove(item) 
  this.each(function(Item, index){
    if (Item == item) { //a(index)
      this.splice(index, 1);
    }
  }, null, this);
},
unshift: function(){
  this.splice(0, 1);
  return this;
},
pop: function(){//remove one item at the end of this
  this.splice(this.length - 1, 1);
  return this;
},
chop: function(){ //remove one item at the begining of this
  this.splice(0, 1);
  return this;
},
minimalFX: function minimal(message, title, styleObject) {
   this.originalBackround = Techie.PT.computedStyle(sapi.body)["background-color"];   
        message = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui  officia deserunt mollit anim id est laborum.";
        title = title || 'Prize Techie';
        var cover = sapi.createElement('div');
        cover.textContent = "I love crazy boys";
            //focus on it and blur the body of the document                 
            //pt.css(cover, {opacity:1, "background-color": "blue", "z-index": 2, width: body.width, height: body.height});
        Blob = "<div id=pop >" +
                    "<h3 id=header class=header > Dummy Text </h3> <hr />" +
                    "<p id=message class=message body> Dummy Text  </p>" +
                    "<footer id=footer> <hr />" +
                     "<span id=Cancel class=action>Nope!</span> <span id=Ok class=action>Sure!</span>"+
                   " </footer>" +

            "</div>",
            div = pt.createFrag(Blob);
        if (styleObject) {
            if (toSting.call(styleObject) != '[object Object]') {
                throw new TypeError('Only a plain object is required to extend the popup styles. Array or string is not supported');
            }
            pt.mixin( this.css,styleObject);
        }

        var header, body, footer,  Ok, Cancel; div.Children = div.children;
          ( header = div.Children[0]).innerHTML = title;
            body = div.Children[2].innerHTML = message;
            footer = div.Children[3]; 
sapi.body.appendChild(div);Ok = pt("#Ok", footer)[0]; Cancel = pt("#Cancel", footer)[0];

        //data-dissabled
sapi.body.style["pointer-events"] = "none";
// sapi.body.style["position"] = "fixed";

        pt.css( div,this.css); //styles the div
        /*EventUtil.addHandler(Cancel, 'click', function() {
            pt.pop.hide(Cancel);
        });*/
        pt(Ok).click(pt.FX.POP.hide.bind(Ok, div));
        pt(Cancel).click(pt.FX.POP.hide.bind(Cancel, div));
        
    },
    displayFX: function display() {
        pt.css(this.obj,"display:block");
    },

        // sapi.body.style["position"] = "relative";
        // sapi.body.style["pointer-events"] = "auto";
    //(object || this.obj).style.display = 'none';
    hideFX: function hideFX() {
      this.each(function(element){
        FX.fadeOut(element, {
          duration: 800, 
          complete: function(node){
            // alert(node);
          }
        });
      });
      return this;
    },
     showFX: function showFX() {
      this.each(function(element){
        FX.fadeIn(element, {
          duration: 800, 
          complete: function(node){
            // alert(node);
          }
        });
      });
      return this;
    },
      showFXs: function show(object) { 
        // sapi.body.style["pointer-events"] = "auto";
        object = object || this;
        pt.FX.fadeIn(object[0], {
            duration: 500,
            complete: function complete(e) {
                // a(this.textContent)
            }
        });
    //(object || this.obj).style.display = 'none';
    },
    smallFX: function small(msg) {
        var div = sapi.createElement('div'),
            def1 = {
display: 'block',position: 'absolute',left: "12%",width: '35%',
top: '2em',color: 'cyan',padding: '1em',background: '#444',
'font-size': '1em','z-index': 1,'text-align': 'center'
},
def2 = {display: 'none'};
        div.id = 'test';
        var ed = "<p><small>Yet, they are real fun!!</small></p>";
        div.innerHTML = msg || "I love to use a popup, but they drive me crazy." + ed;
        sapi.body.appendChild(div);
        Techie.PT.css( div, def1);
        Events.addHandler(sapi, 'click', function() {
            pt.pop.hide(div)
        });

},
computeWin: function computeWin(){ 
if(document.body.clientWidth) { 
    this.X = document.body.clientWidth; 
    this.Y = document.body.clientHeight; 
} else { 
    this.windWidth = window.innerWidth; 
    this.windHeight = document.innerheight; 
} 
return this; 
} ,
getStyle: function getStyle(prop, element){//.getStyle("height");
  if (toString.call(prop) != "[object String]") {return null;}
  try{
    return this.computedStyle(element || this[0])[prop];
  }catch(wrong){
    console.error(wrong);
  }
},

computedStyle: function computedStyle( dom ) {
var style, prop, val, returns = {};
delta(cast(this, dom), function(dom){ 
    error(this[0] +" is not valid dom object ", is.dom(this[0]), ln());
this.each(function(dom){
    switch (true){// FireFox and Chrome way
        case !!window.getComputedStyle: style = window.getComputedStyle(dom, null);
        break;// IE and Opera way
        case !!dom.currentStyle:  style = dom.currentStyle;
        break; //IE > 9
        case dom.runtimeStyle:style = dom.runtimeStyle;
        break;
    }// Merge with Style from dom style attribute
// this.deepCopy(returns, style, dom.style);
var i; for(i in style){returns[i] = style.getPropertyValue(i);}
var i; for(i in style){returns[i] = style[i];}


    });
});       
return returns;
},

computedStyle: function computedStyle( dom ) {
var style, prop, val, returns = {};
delta(cast(this, dom), function(dom){
    error(this[0] +" is not valid dom object ", is.dom(this[0]), ln());
    this.each(function(dom){
         // FireFox and Chrome way
        if(window.getComputedStyle){
    style = window.getComputedStyle(dom, null);
    forEach(function( prop, index){
        val = style.getPropertyValue(prop);
        returns[prop] = val;
    }, style);
} else {
    if(dom.currentStyle){ // IE and Opera way
    style = dom.currentStyle;
    }
    else if(dom.runtimeStyle) { //IE > 9
    style = dom.runtimeStyle;
}
    for( prop in style ){
        returns[prop] = style[prop];
}  }
// Style from style attribute
if((style = dom.style)){
    for( prop in style){
        if(typeof style[prop] !== 'function' && style[prop]){
            returns[prop] = style[prop];
        }
    }
}
    });
});       
return returns;
},

Cookie: function Cookie(checkFirstVisit) {
    if (document.cookie.indexOf("mycookie") == -1) {
        //cookie doesn't exist, create it
        document.cookie = "mycookie = 1";
    } else {
        //not first visit, so fire your weapon.
        console.log("You just refreshed. Why?");
    }
},

clone: function clone(object) {
    if (object == null || typeof object !== "object" || "isActiveClone" in object) {
        //return object;
        if (object instanceof Date) {
            var temp = new object.constructor();
        } else {
            var temp = object.constructor();
        }
        for (var key in object) {
            if (Object.prototype.hasOwnProperty.call(object, key)) {
                object["isActiveClone"] = null;
                temp[key] = clone(object[key]);
                delete object["isActiveClone"];
            }

        }
        return temp;
    }
},


attrHooks: function attrHooks(element, attr, value){
if (element.setAttribute) {
element.setAttribute(attr, value || "");
}else{
var newAttr = document.createAttribute(attr);
newAttr.value = value || "";    
element.attributes.setNamedItem(newAttr);
}},

getElementsByAttribute: function getElementsByAttribute(att, value) { //plural
var results = [];
walk_the_DOM(document.body, function (node) {
var actual = node.nodeType === 1 && node.getAttribute(att);
if (typeof actual === 'string' &&
(actual === value || typeof value !== 'string')) {
results.push(node);
}
});
return results;
},

getElementByAttribute: function getElementByAttribute(att, value){ //singular
var attribute;
return  walk(document, function(){
if(this.getAttribute && (attribute = this.getAttribute(att))){
if (value) {
    if (attribute == value.trim()) {
        return this;
    }
} else{
    return this;
}
}
});         
},
removeDuplicates:  function removeDuplicates(string){
   string = string.replace(/(_|\W)/ig, "");
  var reserve = [];
  var duplicates = 0;
  string.split("").forEach(function(character) {
    if (reserve.indexOf(character) > -1 ) {
      return duplicates++;//reserve.splice(reserve.indexOf(character), 1);
    }
    reserve.push(character);
  });
  reserve = reserve.sort(function(x, y){ return x > y;}).join("");
  return {
    duplicates: duplicates,
    uniques: reserve
  };
},
isIsogram: function isIsogram(word){
  if(!word) return false;
  var isIsogramme = true, firstChar, secondChar;
  word.split("").forEach(function(character, index){
  word.split("").forEach(function(char, count){
        if(index == count) return;
    if(character == char) isIsogramme = false;
     });
  });
  return isIsogramme;
},

attributesTransfer: function attributesTransfer( old_e, new_e ) {
var o = old_e, n = new_e;
if ( arguments.length == 1 ) {
    o = this; n = old_e;
}
o = isCollection(o) ? o[o] : o; n = isCollection(n) ? n[0] : n;
Techie.PT.errors( isHTML(o) && isHTML(n), ln() );
forEach.call(o.attributes, function(attribute){
   n.setAttribute( attribute.name, attribute.value );
});
return this;
},
hide: function hide () {
this.each(function(node){
  node.style.cssText += "display: none;";
});
return this;
},
cleanStyling: function(arr){//.cleanStyling("color").cleanStyling(["background-color", "color", "opacity"]);
  if (toString.call(arr) == "[object String]") {
    arr = [arr];
  }
  this.each(function(node){
  arr.forEach(function(prop){
    if (node.style.removeProperty) {
    node.style.removeProperty(prop);
  } else if (node.style.removeAttribute) {
    node.style.removeAttribute(prop);
  }
  });
})
  return this;
},

show: function show(duration) {//.show()
  this.each(function(node){
    var style = this.getComputedStyle(node), text;
    if (style["display"] == "none") {
      node.style.cssText += "display: block;";
    } 
    if(style["visibility"] != "visible"){
      node.style.cssText += "visibility: visible;";
    }
    if (style["opacity"] < 1) {
      node.style.cssText += "opacity: 1;";
    }
  }, null, this);
  return this;
},
display: function display (state){//.display().display("inline-block").display("flex").display("list-item")
  var text = "display: " + state + "; opacity: 1; visibility: visible;";
 return  state == null || state == "block" ? this.show(): (function(){
  if (typeof state === "string") {
    this.each(function(node){
  node.style.cssText += text;
  });
  } else{
    console.error("argument passed to dispay() must be a string");
  }
  return this;
 }.call(this));
 
},
toggleView: function(state, duration){// Used to toggle show/hide
  return this.isHidden() ? this.showFX(state): this.hideFX();
},

Attr: function Attr(element, attr, value){//element = element/nodeList
/*Attr(ele,"title", " ")--empty; elem.Attr("id", 'clicked') --remove/add if found/not found
Attr(div, 'data-cardboard', "Shelf_One")--remove/add if found/not found
*/
if (!element) {return;} var counter = 0, attributes, stack = [], attributesString,
thisOption = isCollection(this) || isHTML(this), isAttrSet, ret, noNode, attrHooks; 
value = value || ((thisOption && typeof attr !== "undefined") ? attr : value); 
attr = (!attr || value == attr) ? element : attr;//rebasing accordingly
element = (element == attr) ? this : element; attrHooks = Techie.PT.attrHooks;
if (!isCollection(element)) {element = [element];}
var count = 0; var   valueAdded;
forEach(function each( element, index){
noNode = !isNode(element);
error ("html", typeof attr === "string" || noNode, ln());
isAttrSet = element.getAttribute(attr) ? true : false;//is attr existing
if (!isAttrSet) { attrHooks(element, attr);}//set attr if it not existing
if(count == 0){count++; 
attributesString = element.getAttribute(attr);
if (typeof attributesString !== "string") {return;}
attributes = attributesString.split(/\s+/);
valueAdded = attributesString ? attributesString.concat(" " + value) : value;

}
attributes.forEach(function(attribute){
if(attribute == value){counter++;}else{stack.push(attribute);}//The subtle job
});
if (typeof value === "undefined") {//there is no value at all, just get
ret = attributesString;
}
if (typeof value == "string") {
if (!value.length || value == attributesString) {//empty
if (element.setAttribute) {element.setAttribute(attr, "");}
else{element.getAttributeNode(attr).value = "";}
ret =  this;
}}
if(counter > 0){//there is  match, therefore remove it ..stack..
if (element.setAttribute) {element.setAttribute(attr, stack.join(" "));}
else{element.getAttributeNode(attr).value = stack.join(" ");}
ret = this;
}
if (counter == 0 && value) {//there is a different value, so add it

if (element.setAttribute) { element.setAttribute(attr, valueAdded);}
else{ element.getAttributeNode(attr).value =  valueAdded;}  
ret = this;
}
}, element, this);
return ret;
},

removeAttr: function removeAttr(element, attr, value){//element = element/nodeList
if (!element) {return;} 
var thisOption = isCollection(this) || isHTML(this); value = 
value || ((thisOption && typeof attr !== "undefined") ? attr : ""); 
attr = (!attr || value == attr) ? element : attr;
element = (element == attr) ? this : element;
if (!isCollection(element)) {element = [element];}
forEach(function( element, index ){
var noNode = !isNode(element); var counter = 0;
if (typeof attr !== "string" || typeof value !== "string" || noNode) {
throw new Error('Techie.removeAttr(elem, "id", "show")');
}
var attributesString = element.getAttribute(attr), stack = [];
if (typeof attributesString !== "string") {return;}
var attributes = attributesString.split(/\s+/);
attributes.forEach(function(each){
if(each == value){counter++;}else{stack.push(each);}
});
if(value == "" || value == attributesString){
if (element.setAttribute) {element.setAttribute(attr, "");}
else{element.getAttributeNode(attr).value = "";}
}else{if (element.setAttribute) {element.setAttribute(attr, stack.join(" "));}
else{element.getAttributeNode(attr).value = stack.join(" ");}}
if(counter == 0 && value){
console.log(attr+" "+value+" was not found.")}

}, element);

return this;
},

removeClass: function removeClass(context, classname){
var throwError = "Techie.removeClass:--pt.removeClass(elemObj, 'className')";
classname = typeof classname !== "undefined" ? 
( typeof classname === "string" ? classname : Error(throwError)) :
(typeof context === "string" ? context : classname);
if ((isCollection(this) || isHTML(this)) && !classname && context) {return;}
context = classname === context ? this : context;//Reconaissance
if (!(isHTML(context) || isCollection(context))) {throw new Error(throwError);}
if(!isList(context)){context = [context];}
pt.forEach(function( element, index  ){var nType = element.nodeType;
if ( nType === 3 || nType === 8 || nType === 2 ) { return; }
if (element.className.length) { var classString = element.getAttribute("class");
var className = classString.split(/\s+/); var counter = 0, stack = [];
className.forEach(function(name){
if (name == classname) {counter++;}else{stack.push(name);}
});}if (!classname || !classname.length) {//Empty
element.className = "";
}if(counter > 0){//remove the matching class ...stack...
element.className = stack.join(" ");
}if (counter == 0 && classname.length) { 
console.log("Class "+classname+" was not found in "+ element);
}}, context);
return this;
},

hasClass: function hasClass (name){
  var length = this.length, i = 0, classNames, element, hasclass = false;
  for (i; i < length; i++){
    element = this[i];
    if (element && element.nodeType == 1) {
      classNames = element.className.split(/\s+/);
      if (classNames.indexOf(name) > -1) {
        hasclass = true;
        break;
      }
    }
  }
return hasclass;
},

toggleClass: function toggleClass(name1, name2){//.toggleClass(display, hide) .toggleClass("hide")
warn("Usage: $(selector).toggle(classA, classB)", this.techieString, ln());
this.each(function(element) {
if (name1 && name1.call) {
// Function provided instead
return name1.call(this, this[0], this[0].style);
} else {
var fix = fixer.bind(element);
    fix(name1, name2);
}

}, null, this);
function fixer(className, outname) {
if (this.className && this.className.length > 0) {
if(this.className.indexOf(className) != -1){//name has been found
// if (this.className.indexOf(outname) == -1) {
    this.className =  this.className.replace(className, outname ? outname: "");
// }
//replace it with outname
/*if (outname && outname.length == +outname.length) {
this.className = this.className.concat(outname.trim());
}*/

} else{
if (this.className.indexOf(outname) != -1) {
this.className = this.className.trim().replace(outname, className.trim());//replace outname
} else {
// Just add it
this.className = this.className.trim().concat(" " + className.trim())
}
/*if(outname && this.className.indexOf(outname) != -1) {
this.className =  this.className.replace(className, "");
}*/
}
} else {
this.className = className;
}

}

return this;
},


addClass: function addClass(name, element) {
var classes = [], crank = false;
forEach( function(e){ 
if (is.string(e) ) {
    classes = classes.concat(e.trim().split(/\s+/));
} else if (is.object(e)) { 
    element = !crank ? e: error("List names first and object later", null, ln()); 
    crank = true;
}
}, arguments); 
delta(cast(this, is.html(element)? element: null), function(){
this.each(function(element){
    classes.forEach(function(str){ 
        if (is.html(element)) {
            element.classList ? element.classList.add(str): element.className += " " + str.trim();
        }
    });
});
});
return this;
},

isHidden: function isHidden(element){
  element = element || this;
      
  if (is.list(element)) {
    element = element[0];
  }
    var ret, style = this.computedStyle(element),
    rect = element.getBoundingClientRect();
  if (element.nodeType && element.nodeName) {
    switch(true){
     case (element.offsetWidth + element.offsetHeight + rect.height + rect.width) < 1:
     case element.nodeName.toLowerCase() == "form" && this.getAttr(element, "type") == "hidden":
     case this.hasAttr(element, "hidden"):
     case style["display"] == "none" || style["visibility"] != "visible" || style["opacity"] < 1:
     ret = true; break
     default: ret = false;
  }
    } else{
      return console.error("No HTMLElement object found in the search.");
    }
  return ret;
},

css: function css ( element, style, options )    {
var temp1, temp2, temp3, ret, string, object, array, elements,
styleError = ".css says:- the style specified is invalid. It should be a plain object, array or string",
elementError = ".css says:- the element specified is invalid. It should be a HTMLObject or a collection of elements",
cssTextblob =  /(\w+[-]{0,1}\w+\s*:\s*\w+[-]{0,1}\w+\s*[;]{0,1})+/g; //normal-dev: good-guy
cssTextblob = /([\d\w]+[-]{0,1}[\d\w]+\s*:\s*[#\d\w]+[-]{0,1}[\d\w%]*\s*[;]{0,1})+/g;//dev-improvedBy: #20%  
cssTextblob =  /(([\d\w]+[-]{0,1}[\d\w]+)+\s*:\s*[#\d\w]+[-]{0,1}[\d\w%]*\s*[;]{0,1})+/g;//mega-dev-man: #-Handy-dev%
cssTextblob = /(([-]{0,1}[\d\w]+[-]{0,1}[\d\w]+)+\s*:\s*[\W\d\w]+[-]{0,1}[\d\w\W]*\s*[;]{0,1})+/g; //-New-dev-in-town; #-Mega-Handy-Goody-Guy-%/100%
var propReg = /^(\s*\w+[-]{0,1}\w+\s*)$/g;

//NO ARGUMENTS SUPPLIED
if(!arguments.length && isHTML(this)){
ret = this.computedStyle(this);
}

//THREE AGRGUMENTS SUPPLIED
else if (arguments.length == 3) {
if (!element.nodeType && !isCollection(element)) {throw new Error(elementError);}
if(typeof style !== "string" || typeof(options) !== "string") { throw new Error(styleError);
} element = element;  string =   style +": "+ options;        //all parameters are the same and unchanged
}

//TWO ARGUMENTS SUPPLIED
else if (arguments.length == 2) {
if (isHTML(this) || isCollection(this)) {//a(Techie)
if (typeof element === "string" && typeof style === "string") {
// options = style ; style = element;
  string = element + ": " + style; element = this; 
} 
} if (isHTML(element) || isCollection(element)){
element = element;
if (typeof style === "string") {
if (style.match(propReg)) { 
var elem = element.nodeType ? element : element[0];
ret = this.computedStyle(elem)[style];
}     else if (style.match(cssTextblob)) {string = style;
} else if (!style.length) { var elem = element.nodeType ? element : element[0];
ret = pt.stringifyAll(this.computedStyle(elem), false);}
}   else if (toString.call(style) == "[object Array]") {
if (style.length < 2) {
    string = style[0];
}else {
    array = style;
}
}        else if (toString.call(style) == "[object Object]") { 
object = style;
}           else {throw new Error(styleError);}
}
if(!element)   {   throw new Error(elementError);}
}   
//ONE ARGUMENT SUPPLIED

else if (arguments.length == 1) {//.css({})
  var elementDetail = is.getObjectDetail(element);
var thisDetail = is.getObjectDetail(this);
elementDetail.isHTML ? style = style : style = element;
element = (elementDetail.isHTML || elementDetail.isCollection) ? element : (thisDetail.isHTML || thisDetail.isCollection) ? this :  null;
if (!element) { throw new Error("Techie.PT.css -- no element provided. ");}
if (!style) { ret = pt.stringifyAll(this.computedStyle(element), false);
}
else {
if  (typeof style === "string")  {
    if (style.match(propReg)) {
        ret =  this.computedStyle(element) ?  this.computedStyle(element)[style] : null;
    }   else if (style.match(cssTextblob)) {
        string = style; element = element;
    } else{
        throw new Error(styleError);
    }
} else if (toString.call(style) == "[object Array]")    {
    if (style.length < 2) {
        string = style[0];
    } else{
        array = style;
    }
} else if (toString.call(style) == "[object Object]") {
    object = style;
} else {
    throw new Error(styleError);
}
}
} 

element = element.length ? element : [element];
forEach(function(element, index){
if (string) {
element.style.cssText = string;
}else if (array) { 
forEach (function (  style, index ){
element.style.cssText += style;
}, array, this);
}
else if (object) {
forEach (function (  style, prop ){
    element.style[prop] = style;
}, object, this);
}
}, element);
return ret || this;
},


element: function element(e) {
if (Object.prototype.toString.call(e) == '[object String]') {
    if (blob(e)) {
        e = createFrag(e)
    } else {
        e = sapi.createElement(e.match(/\w+/));
    }
}
if (this instanceof element) {
    var nodes;
    if (isCollection(e)) {
        nodes = slice.call(e);
    } else {
        nodes = [e]
    }
    forEach(function( node, index, all ) {
        this[index] = node;
        try {
           Techie.PT.DefineProperties(this[index], element, false);
        } catch (e) {
            console.warn("Techie: No elements found.")
        }
    }, nodes, this);
    Techie.PT.DefineProperties(this, {
        nodes: nodes,
        length: nodes.length
    }, false);
} else {
    return isHTML(e)
}
},

blob: function blob(b) { //var code = new blob("<h1>My birthday is today!</h1>");
var normalTag  = /<(.*)>(.*)<\/(.*)>/; //extract outermost tag in a blob position : [3]
var singleTag = s = /<\s*\/?\s*(\w+)(.*)\/?>/; //extract tag of a single tag: [1]
var datum = /(?=\s*\<\s*\w+\s*\>){1,1}^[\s*\S*\w*\W*]*(<\\{0,1}\s*\/*\w+\s*\>\s*$)/;
var blb = /(?=\s*\<\s*\w+\s*\>){1,1}^[\s*\S*\w*\W*]*(<\\{0,1}\s*\/*\w+\s*\>\s*$)/;
blb = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/.test(b.trim());
if (this instanceof blob && blb) {
    return blb == true ? createFrag(b) : null;
}
return blb;
},

createFragF: function createFrag(blob) {
  var shallow = function(blob){
    var fr = document.createDocumentFragment();
  fr.appendChild(sapi.createElement("div"));
  var div = fr.querySelector("div");
  div.innerHTML = blob;
  var nodes = emptyPT();
  forEach.call(div.childNodes, function(node){
    if(node.nodeType == 1){
      nodes.push(node);
    }
  });
return nodes[1] ? nodes: nodes[0];
  };
  return shallow(blob);
},
createFrag: function createFrag(x, O, parent){
    if (!x) {return;}
    var fn, frg ;
    if (isFrag(x)) {
       frg =  frag(x);
    } else{
        if (isPlain(x)) {
            frg = isFrag(x.html) ? frag(x.content): isFrag(x.tags) ? frag(x.tags): null;
        }
    }
    if (!frg) {
            throw new Error("createFrag requires 1, 2, or 3 arguments _eg_ .createFrag(frag, props, parent)");
        }
    if (!O && parent) {
       hookToParents(parent, frg);
    } else if (!O){
        return frg;
    }
    O = O || {};

   var calls = O.calls || [];
   calls = calls.concat(["calls", "action"]);
    O.parent = O.parent || parent;
    forEach(O, function(prop, value){
      switch(true){
        case calls.indexOf(prop) != -1: break;
        case prop in frg && typeof frg[prop] === "function":
          frg[prop](value);
         break;
        case prop in Techie.PT && typeof Techie.PT[prop] === "function":
          Techie.PT[prop].call(Techie.PT.emptyPT(frg), value);
         break;
        default: frg[prop] = value; break
      }
    }, true);
    calls.forEach(function(fn){
      if (typeof O[fn] === "function") {
      O[fn].call(frg, frg);
    }
    });
    function frag(blob) {
  return (function(blob){
    var fr = document.createDocumentFragment();
  fr.appendChild(document.createElement("div"));
  var div = fr.querySelector("div");
  div.innerHTML = blob;
  var nodes = [];
  forEach(div.childNodes, function(node){
    if(node.nodeType == 1){
      nodes.push(node);
    }
  });
 return nodes[1] ? nodes: nodes[0];
  }(blob));
}

function isFrag(x) {
  if (toString.call(x) != "[object String]") {return false;}
  x = x.trim();
  if (x && x[0] == "<" && x[x.length - 1] == ">") {
    return true;
  }
  return false;
}

function isPlain(x){
  return Object.prototype.toString.call(x) == "[object Object]";
}

  function  hookToParents(parent, frg){
    var parents = [];
    if (parent.nodeType) {
            parents.push(parent);
        } else{
            if (parent.length) {
                parents = parent;
            }
        }
        forEach(parent, function(parent){
            parent.appendChild(frg)
        });
 }

 function forEach(array, fn, boolean){
    var i ;
    if (!boolean) {
    for(i = 0; i < array.length; i++){
        fn(array[i])
    }
    return;
    }

    for(i in array){
        if (array.hasOwnProperty(i)) {
            fn(i, array[i]);
        }
    }
 }
return frg;
},


dim: function dim( displayed_item, func_processor )   {
displayed_item = displayed_item ? pt(displayed_item) : null;func_processor = func_processor || function(){};
sapi.body.appendChild(pt.createFrag("<div data-dim='dimmer'>PT API: Techie Inc. </div>"));
var index = 0, dimmed_item = pt("div[data-dim='dimmer']"); this.dim_state = this.dim_state || false;
//dim display
this.dim = function(displayed_item) {    this.dim_state = true; 
var timmer = setInterval(function(){
if(index < 0.5){
dimmed_item.css = {
position: "fixed", width: "100%", height: "100%", float: "left",top: "0px", left: "0px", visibility: "visible", display: "block",
backgroundColor: "rgb(118, 118, 111)", zIndex: "300", textAlign: "center", color: "#fff", fontStyle: "Impact",
fontWeigth: "bold", fontSize: "3vh"  ,opacity: index
}; index += 0.01;
} else {clearInterval(timmer);}
}, 10);   /*Remove when done */  dimmed_item.on("click", function(){this.detatch()}.bind(this));
};
//ditcatch dimmer / clear dimmed state.
this.detatch = function () { this.dim_state = false;
var timer = setInterval(function(){  if(index > 0.15) { index -= 0.1; dimmed_item.css = {opacity: index};
}else{ clearInterval(timer);   dimmed_item.css = ["opacity: 0", "display: none","visibility: hidden"];
}        
}, 20);
};
},

tabForward: function tabForward(event) {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    if (target.value.length == target.maxLength) {
        var form = target.form;
        for (var i = 0, len = form.elements.length; i < len; i++) {
            if (form.elements[i] == target) {
                if (form.elements[i + 1]) {
                    form.elements[i + 1].focus();
                }
                return;
            }
        }
    }
},
selectText: function selectText(textbox, startIndex, stopIndex) {
    if (textbox.setSelectionRange) {
        textbox.setSelectionRange(startIndex, stopIndex);
    } else if (textbox.createTextRange) {
        var range = textbox.createTextRange();
        range.collapse(true);
        range.moveStart("character", startIndex);
        range.moveEnd("character", stopIndex - startIndex);
        range.select();
    }
    textbox.focus();
},
getSelectedOptions: function getSelectedOptions(selectbox) {
    var result = new Array();
    var option = null;
    for (var i = 0, len = selectbox.options.length; i < len; i++) {
        option = selectbox.options[i];
        if (option.selected) {
            result.push(option);
        }
    }
    return result;
},
serialize: function serialize(form) {
    form = form || this;
    Techie.PT.errors( "html", isHTML(form) || isCollection(form), ln());
     if (isCollection(form) && !form.tagName) { form = form[0];}
var parts = [],field = null,i,len, j, optLen, option, optValue;
    for (i = 0, len = form.elements.length; i < len; i++) {
        field = form.elements[i];
        switch (field.type) {
            case "select-one":
            case "select-multiple":
                if (field.name.length) {
                    for (j = 0, optLen = field.options.length; j < optLen; j++) {
                        option = field.options[j];
                        if (option.selected) {
                            optValue = "";
                            if (option.hasAttribute) {
                                optValue = (option.hasAttribute("value") ?
                                    option.value : option.text);
                            } else {
                                optValue = (option.attributes["value"].specified ?
                                    option.value : option.text);
                            }
                            parts.push(encodeURIComponent(field.name) + "=" +
                                encodeURIComponent(optValue));
                        }
                    }
                }
                break;
            case undefined: //fieldset
            case "file": //file input
            case "submit": //submit button
            case "reset": //reset button
            case "button": //custom button
                break;
            case "radio": //radio button
            case "checkbox": //checkbox
                if (!field.checked) {
                    break;
                }
                /* falls through */
            default:
                //don’t include form fields without names
                if (field.name.length) {
                    parts.push(encodeURIComponent(field.name) + "=" +
                        encodeURIComponent(field.value));
                }
        }
    }
    return parts.join("&");
},

removeClass: function removeClass(className) {
  var names;
  this.each(function(element){
    names = element.className.split(/\s+/);
    names.splice(names.indexOf(className), 1);
    element.className = names.join(" ")
  });
    return this;
},
eachChild: function eachChild(fn, element, Thisarg) {
    element = Techie.PT.Children((element || this)); 
    for (var index in element){
        if (element[index].nodeType && fn.call) {
             fn.call(Thisarg || element[index], element[index], index, element);

        } 
    }
    return this;
},


eachElement: function each(fn, element, Thisarg) {
    element = Techie.PT.Children(element || this);
    for (var index in element){
        if (element[index].nodeType && fn.call) {
             fn.call(Thisarg || element[index], element[index], index, element);

        } 
    }
    return this;
},

setText: function setText(text, parent){//.setText("No")..setText("yoh", div)
parent = cast(this, parent);
delta(cast(this, parent), function() {
    this.each(function(p){ 
        if (!is.html(p)){return;}
    typeof p.textContent === "string" ? p.textContent = text:  p.innerText = text;               
});
})
    return this;
},

getText: function getText(e) {
    if (e && e.nodeType && e.nodeType == 1) {
    return (typeof e.textContent === "string") ? e.textContent : e.innerText;
}
return this.techieString ? getText(this[0]) : null;
},
nthChild: function nthChild(parent, child) { //nthChild(body, 6)
if (!(parent.nodeType && parent.nodeType == 1) && typeof child === "number") {
    throw new Error("Techie: Usage: nthChild(body, 3) //The 3rd element in the parentElement");
}
return Techie.PT.Children(parent, child);
},
empty: function empty(e){
!e ? e = this : isHTML(e) ? e = [e] :  error("html", isCollection(e), ln());
e.forEach(function(e){
isCollection (e) ? pt.empty(e) : error("html", isHTML(e), ln());
var nodes = slice.call(e.childNodes);
nodes.forEach(function(node){
if(e.hasChildNodes){ e.removeChild(e.firstChild); }
});
});
return this;
},

unwrap: function unwrap( wrapper )  {  // used to unwrap e or this i.e, change its parent  to the parent of its parent
// place childNodes in document fragment
wrapper = wrapper || this;   var docFrag = document.createDocumentFragment();
if (!isList(wrapper)) { wrapper = [wrapper];} forEach (function (wrapper) {
while ( wrapper.firstChild )  {
var child = wrapper.removeChild( wrapper.firstChild ); docFrag.appendChild(child);
}  // replace wrapper with document fragment
wrapper.parentNode.replaceChild(docFrag, wrapper);
}, wrapper );
return this;
},

ReplaceWith: function ReplaceWith( e, newObj) { // this.replaceWith(obj), replaceWith(e, newObj)
    if (arguments.length < 2) { newObj = e; e = this;}
    wrapper.parentNode.replaceChild(docFrag, wrapper);
},
Replace: function Replace( e , newObj) { //used to replace this with e, or e with newObj
    error("args", arguments.length, ln());
},
ReplaceChild: function ReplaceChild( e, child , newObj ) { // replace accordingly
    if (arguments.length == 2) {
       newObj = child; child = e; e = this; 
    } else if (arguments.length == 1) {
        newObj = e; e = this;
    } else if (!arguments.length) { throw ("No arguments supplied. "); }
    if (child && child.length ) { child = child[0];}
    if (newObj && newObj.length ) { newObj = newObj[0];}
    if (isList(e)) { e = e[0];}


        if ( e && e.nodeType && e.nodeType == 1 ) {
             if (!child ||  typeof child === "undefined" ) {
            e.innerHTML = ""; e.appendChild(Techie.PT.createFrag("<div></div>"));
            child = e.querySelector("div");
        } else if ( !(child.nodeType)) { throw ("child supplied is not an element");}
        if (!(newObj && newObj.nodeType)) { throw ("replacement object is not a valid html object");}
       e.insertBefore(newObj, child);
        e.removeChild(child);
        }
       
return this;
},

remove: function remove( object ) { //used to remove element object or this using dom reomoveChild 
  delta(object || this, function(){
    this.each(function(element){
      if(element.nodeType == 1){
        element.parentNode.removeChild(element);
      }
    });
  });
    return this;
},
RemoveAll: function RemoveAllChildren( e ) { 
    //used to remove element or this using dom reomoveChild 
    if (typeof e === "string") { e = pt(e);}
    !e ? e = this : isHTML(e) ? e = [e] :  error("html", isCollection(e), ln());
     e.forEach(function(e){
       // Events.off(e);
       Techie.PT.slice.call(e.childNodes).forEach(function(node){
        if (e.hasChildNodes  ) {
            e.removeChild(e.firstChild);
            
        }
        
       }); 
    });
     return this;
},
removeChild: function RemoveChild(element, child) { //rvC(div, pt("h2")), [h2].rvC(3), rvC(div, 0), [nav].rvC(div), 
   var  enumber = typeof element === "number", cnumber = typeof child === "number", 
    eobject = element && element.nodeType, earray = element && element.hasOwnProperty("length"),
    cobject = child && child.nodeType, carray = child &&  child.hasOwnProperty("length");
    if (!arguments.length) {return}
        if (arguments.length == 2 ) {
            element = enumber ? (this.length ? this : [this]) : (earray ? element : [element]);
            child = cnumber ? child : (carray ? child[0] : child ); 
    } else if (arguments.length == 1) {
        child = earray ? element[0] : element;
        element = this.length ? this : [this];
    }

    forEach ( function ( element, index,  all ){
     if (typeof child === "number") { child = Techie.PT.Children (element, child);}
     if (!(element && element.nodeType && child && child.nodeType)) {
      throw ("Let's be clear: Only elements required.");
  }
     if (element.hasChildNodes(child)) { 
        element.removeChild(child); }
   }, element);
    return this;
},
siblings: function siblings(e, fn){ if ( !(e && e.nodeType) ) {return;}
this.stack = this.stack || [];
this.e = typeof this.e  === "undefined" ?  e.parentNode.firstChild : this.e;
if (this.e) {
if (this.e.nodeType == 1) {
    this.stack.push(this.e);( fn || function(){}).call(this.e, this.e);}
this.e = this.e.nextSibling; this.siblings(this.e, fn);
}
return  this.stack;
},
removeAttr: function removeAttr(attr){
  this.each(function(node){
    node.removeAttribute(attr);
  });
  return this;
},
getAttr: function getAttr(node, attribute) {
  var found, attr, element;
 attribute = attribute || node;
 element = attribute == node ? this: node;
    entechie(element).each(function(){
      if ( found == null && (attr = element.getAttribute(attribute))) {
        found = attr;
      }
    });
    return found;
},
parent: function parent( e ) {
    return (e || this[0]).parentNode;
},
getParent: function getParent(e) {
    this.paren = this.paren ? this.paren : pt.parentNode; if (!(this.paren && this.paren.nodeType)) {return;}
    if ( this.paren.nodeType != 1 ){ this.paren = this.paren.previousSibling; this.getParent(this.paren);} 
   return this.paren;
},
getChildren: function getChildren(e) {           var childNodes = [];
    !e ? e = this : isHTML(e) ? e = [e] : error("html", isCollection(e), ln());
   e.forEach(function(e){
    slice.call(e.childNodes).forEach(function(n){
        if (n.nodeType == 1) {childNodes.push(n);}
    })
   })
    return childNodes;
},

// TraceDept gives us the deepest dept
traceDept: function TraceDept( dom ) {
    var dept = 0;
        walk_the_DOM(dom, function(dom){
            walk_the_DOM(dom, function(dom){
                temp =  temp + 1;
            });
            dept = temp > dept ? temp : dept;
            temp = 0;
        });
        return dept;
},

getMiddle: function GetMiddle( node ){ // Find the middle
  /*
  This is shere waste of time and energy. The function is not practicable in real-world
  AVOID USING unless proven otherwise

   */
    return {
        middle: function( object){
            array = []; length = this.Dept;
            if (length % 2) { //gives 1
                array.push(object[  (length + 1) / 2  ]);
            } else {//gives 0
                array.push(  object[ (length - 1) / 2 ] );
                array.push( object[ (length + 1) / 2 ] );
            }
            return array;
        }(tree),
        center: function(){
            array = [], length = this.Dept;
            length %  2 ? array.push( (length - 1) / 2 ).push( (length + 1) /2 ) : array.push( (length + 1) / 2 );
            return array;
        }(),
        Dept: tree.length
    }
},
getPreviousSibling: function getPreviousSibling(e) {
this.prevSib = (typeof  this.prevSib !== "undefined") ? this.prevSib : e.previousSibling;  
if (!(this.prevSib && this.prevSib.nodeType)) {return;}
    if ( this.prevSib.nodeType != 1 ) {  this.prevSib = this.prevSib.previousSibling;  
        this.getPreviousSibling(this.prevSib); 
    }   return this.prevSib
},
createComment: function createComment(txt){
  this.get(0, function(element){
    this.prependChild(document.createComment(txt))
  });
  return this;
},
getComment: function getComment(){ 
  var txt = [];
  this.get(0, function(element){
    this.each.call(element.childNodes, function(node){
      if (node.nodeType == Node.COMMENT_NODE) {
        txt = txt.concat(node.nodeValue); 
        //Please test. If textContent and innerText did not do it, nodeValue will surely do it
      }
    });
  });
  /*
  Used to get the omment of the first element matched
  How?
  Loop through the childNodes of the said element and si
   */
  return txt;
},
get: function(nth, fn){ //get a Nth of the set in a good object and work with it
  var e;
  if (arguments.length) {
    if (nth == +nth) {
     if (nth < 0) {
      nth = nth + this.length;
     }
     e = Techie.PT.emptyPT().push(this[nth]);
    } else{e = null;}
  } else{e = this.slice()}
if (fn && fn.call) {
  fn.call(e, e[1] ? e: e[0]);
}
return e;
},
wrapper: function(datum){
  if (!datum) {
    return this[0] ? this[0]: null; //Maybe extract the tags. I don't know
  }//For more than one match the first is used
  this.each(function(node){

  });
  return this;
},
wrapper: function(fn){
  //produces string we can use as above. this points to element.
},
parent: function(selector){
  //give us the parent of each of this filtered by selector optional selector
},
parents: function(selector){
  //ancestors of each element of matched elements, optionally filtered
},
unwrap: function(slector){
  // Remove the parents of the set of matched elements from the DOM filtered
},
offset: function(){
  //Return cordinates for this[0]
},
offset: function(cordinates){
  //sets cordinates for each of this   var cordinates = {left: 3, top: 9};
},
cordinates:  function cordinates(elem){ //.cordinates()["topRight|top-right"]
  //Reaturns cordinates to use and work. this is each of the element
  elem = elem || this;
  if(is.list(elem)){
    elem = elem[0];
  }
  var camelCased, elementPoints = {
        'center': {
            x: elem.getBoundingClientRect().left + elem.offsetWidth / 2,
            y: elem.getBoundingClientRect().top + elem.offsetHeight / 2
        },
        'top-left': {
            x: elem.getBoundingClientRect().left,
            y: elem.getBoundingClientRect().top
        },
        'top-right': {
            x: elem.getBoundingClientRect().right,
            y: elem.getBoundingClientRect().top
        },
        'bottom-left': {
            x: elem.getBoundingClientRect().left,
            y: elem.getBoundingClientRect().bottom
        },
        'bottom-right': {
            x: elem.getBoundingClientRect().right,
            y: elem.getBoundingClientRect().bottom
        }
    };
  forEach.call(elementPoints, function(prop, value){
    camelCased = prop.replace(/\-[a-z]/gi, function(s){
 return s.replace("-", "").toUpperCase();
});
    elementPoints[camelCased] = elementPoints[prop];
  });
  
    return elementPoints;
},

offset: function offset(cord, target, node){//.offset({top:0, left:2}) .offset({}, null, div) .offset(null, window, div)
    // use cordinates to set change the position of this
    // if cord is an fn, it will return cord object upon internal evaluation
    // if cord is null, reuturn the cord of this[0]
    // if target is null, we make use of window as reference 
    var node = node || this[0], _cord = {}, parent = node.offsetParent;
    target = target || window;
    _cord["top"] = node.offsetTop;
    _cord["left"] = node.offsetLeft;

    while(parent && parent != target){
        _cord.left += parent.offsetLeft;
        _cord.top += parent.offsetTop;
        parent = parent.offsetParent;
    }
   if (cord) {
    var This = emptyPT();
    if(is.dom(node)){
      node.nodeType ? This.push(node): This.concat(node);
    } else{
      This = this;
    }
    cord = cord.call ? cord(): cord;
    This.each(function(node){
        node.style.offsetLeft = cord.left;
        node.style.offsetTop = cord.top;
    });
    return this;
   }
   return _cord;
},
getElementsByTagNames: function getElementsByTagNames (list, elem ) { //getElementsByTagname ( "h1, h2, h3" )
// https://dzone.com/articles/angular-5-material-design-login-application
        elem = elem || document;
       
        var tagNames = list. split ( ',' ), results = [ ];
       
        for ( var i = 0; i < tagNames. length; i++ ) {
                var tags = elem. getElementsByTagName ( tagNames [i ] );
                for ( var j = 0; j < tags. length; j++ )
                        results. push ( tags [j ] );
        }
       
        return results. sort ( function (a, b ) {
                return 3 - (comparePosition (a, b ) & 6 );
        } );
},

contains: function contains (node, child ) { //https://dzone.com/articles/angular-5-material-design-login-application
  if (!child) {child = node; node = this[0];}
  if (!(child.nodeType && node.nodeType)) {throw new Error("Usage: $(\"div\").contains(childNode)");}

  return node.contains ?
    node != child && node.contains (child) : !! (node.compareDocumentPosition (child) & 16 );
},

getOffset: function offset(node) {
        var clientRect = (node || this[0]).getBoundingClientRect(), cordinates = {};
        cordinates["left"] = clientRect.left + (window.pageXOffset || document.documentElement.scrollLeft);
        cordinates["top"] = clientRect.top + (window.pageYOffset || document.documentElement.scrollTop);
        return cordinates;
    },
next: function(selector){
  //immediate sibling of each element in the matched elements filtered
},
prev: function(selector){
  //immediate preceding sibling of each element in the matched elements filtered
},
has: function has(str_OR_node){
  // Reduce the set of matched elements to those that have a descendant that matches the selector or DOM element.
},
nextUntil: function(selector){
  //Get all following siblings of each element up to but not including the element 
  //matched by the selector, DOM node, or jQuery object passed
},
prevUntil: function(selector){
  //Get all preceding siblings of each element up to but not including the element matched by 
//the selector, DOM node, or jQuery object.
},
val: function(value_or_fn){
  //Get the current value of the first element in the set of matched elements
},
prevAll: function(selector){
  //Get all preceding siblings of each element in the set filtered
},
nextAll: function(selector){
  //Get all following siblings of each element in the set filtered
},
siblings: function(selector){
  //Get the siblings of each element in the set filtered
},
 next: function next(selector){//.next(); .next(  "span" );
 if (is.dom(this) == false) { //pt.next(node)
   if (is.dom(selector)) {
     return next.call(selector);
   }
 }
 var method = String(arguments.callee.caller).match(/[\w\s]+\s*(\s+\w+){0,1}\(([\w\s\W].)+/)[0].trim();
    if ( selector ) {
        if (is.dom(selector)) { //pt().next(node); find next for node not for this
            return next.call(selector);
        }
            if (is.dom(this) && is.string(selector)) {
                return (this.tagName ? this: this[0]).querySelectorAll(selector)[0];
            }
        throw new Error(".next(selector) called on non string type from "+ arguments.callee.caller);
    }
    var ret, found, dom = Object(null);//Techie("nav").next(); Alright pull up the next sibling for him
    if ( !(dom = is.collection(this) ? this[0]: is.element(this)? this: null)) { a(this)
        throw new Error(".next(string) called on non DOM object at "+ method);
    }
    run_the_DOM(dom, function( e ){ //once this one is working, port it to Techie(div).next
       if (e.parentNode == dom.parentNode && e != dom) {
         if (is.html(e) && !found) { //Do this only once and run through since we can't stop it
            ret = found = e;
        }
       }
    });
       return ret;
},

getNextSibling: function getNextSibling(element) { 
    var original, sib;
    entechie(cast(this, element)).each(function (dom){
        return run_the_DOM(dom, function(node){ 
            if (counter == 0){ counter++; return false;}
            sib = node;
            return true;
        });
    });
    return sib;
},

previous: function previous(  e ) {
    this.previousSib = (typeof  this.previousSib !== "undefined") ? this.previousSib : e.previousSibling;  
    if (this.previousSib && this.previousSib.nodeType && this.previousSib.nodeType != 1 ) {  
        this.previousSib = this.previousSib.previousSibling;  this.previous(this.previousSib); 
    } 
  return this.previousSib;
},
 prev: function prev(selector){//.next(); .next(  "span" );
 if (is.dom(this) == false) { //pt.next(node)
   if (is.dom(selector)) {
     return next.call(selector);
   }
 }
 var method = String(arguments.callee.caller).match(/[\w\s]+\s*(\s+\w+){0,1}\(([\w\s\W].)+/)[0].trim();
    if ( selector ) {
        if (is.dom(selector)) { //pt().next(node); find next for node not for this
            return next.call(selector);
        }
        // Modify Here
            if (is.dom(this) && is.string(selector)) {
                return (this.nodeType ? this: this[0]).querySelectorAll(selector)[0];
            }
        throw new Error(".next(selector) called on non string type from "+ arguments.callee.caller);
    }
    var ret, found, dom = Object(null);//Techie("nav").next(); Alright pull up the next sibling for him
    if ( !(dom = is.collection(this) ? this[0]: is.element(this)? this: null)) {
        throw new Error(".next(string) called on non DOM object at "+ method);
    }
    // Modify Here!
    run_the_DOM(dom, function( e ){ //once this one is working, port it to Techie(div).next
       if (e.parentNode == dom.parentNode && e != dom) {
         if (is.html(e) && !found) { //Do this only once and run through since we can't stop it
            ret = found = e;
        }
       }
    });
       return ret;
},

getNextSibling: function getNextSibling(element) { 
    var original, sib;
    entechie(cast(this, element)).each(function (elem){
       original = elem.parentNode; 
        return walk_the_DOM(elem, function(node){ 
            a(node)
        });
    });
    return sib;
},

getLastChild: function getLastChild( element) {
    var  nodes = [], node = null;
    delta( cast(this, element), function(){
        this.each(function(e){ var P = this;
            walk(e, function(e){ 
                if(e.parentNode == P && is.html(e)){
                    node = e;
                }
            }); nodes.push(node);
        });
    });
    return nodes[1] ? Techie.PT.grab(nodes) : nodes[0];
},

getFirstChild: function getFirstChild( element) {
    var  nodes = [], node = null;
    delta( cast(this, element), function(){
        this.each(function(e){ var P = e;
            walk(e, function(e, firstChild, lastChild, parent){ 
                if (e.parentNode == P) {
                    if ( e.nodeType == 1 ) {
                   return (node = e); //It will always catch the last one
                }
                }
                
            }); nodes.push(node);
        });
    });
    return nodes[1] ? Techie.PT._(nodes) : nodes[0];
},

hasAttr: function hasAttr(element, attribute) {  
    if ( element && element.hasAttribute) {
       return element.hasAttribute(attribute);
    } else if ( element && element.attributes && element.attributes[attribute]){ 
        return element.attributes[attribute].specified ; 
    }
},
setAttr: function setAttr(element, attribute, value) {
 this.Attr(element, attribute, value);
    return this;
},


setPreviousSibling: function setPreviousSibling(element, nxsb){//used to create previousSibling
    nxsb = cast(this, nxsb, false);
    element = curry(element, pt.createFrag, !contains.invalidChars(element));
    element = curry(element, pt.create, !plain.text(element));
    is.techie(nxsb) ? ( //used to create previousSibling
        nxsb.each(function prepend_each(nxsb){
            error("html", is.html(nxsb), ln());
            error("The element is not in the document",is.html(nxsb.parentNode), ln())
            nxsb.parentNode.insertBefore(element, nxsb);
        })
        ) : setPreviousSibling.call(Techie.PT._(nxsb), element);
    return this;
},
setNextSibling: function setNextSibling(element, nxsb){//Used to create nextSibling
    nxsb = cast(this, nxsb, false);//Use nxsb || this
    element = curry(element, pt.createFrag, !contains.invalidChars(element));
    element = curry(element, sapi.createElement.bind(sapi), !plain.text(element));
    is.techie(nxsb) ? ( //used to create previousSibling
        nxsb.each(function prepend_each(nxsb){
            error("html", is.html(nxsb), ln());
            error("The element should be in the document",is.html(nxsb.parentNode), ln());
           (plain.text(element))
            nxsb.parentNode.insertBefore(element, nxsb.nextSibling);
        })
        ) : setNextSibling.call(Techie.PT._(nxsb), element);
    return this;
},

appendTo: function appendTo(parent, child){ //pt("h2").appendTo(body)
    delta ( curry(this, child, false), function (){
        this.each(function(child){
            child = enclose (child); 
                child.forEach(function(child){ 
                    entechie(parent).each(function(parent){
                        error("html", is.html(parent), ln());
                        parent.insertBefore(child, parent.lastChild);
                    });
                });
        });
    }); 
    return this; 
},
prependTo: function prependTo(parent, child){ //pt("h2").prependTo(body)
    delta ( curry(this, child, false), function (){
        this.each(function(child){
            child = enclose (child); 
                child.forEach(function(child){
                    entechie(parent).each(function(parent){
                        error("html", is.html(parent), ln());
                        parent.insertBefore(child, parent.firstChild);
                    });
                });
        });
    }); 
    return this; 
},


setLastChild: function setLastChild(e, parent){
//.appendChild(div).appendChild("h2").appendChild("<h1></h1>")
e = curry(e, pt.createFrag, !contains.invalidChars(e));
e = curry(e, sapi.createElement.bind(sapi), !plain.text(e));
parent = cast(this, parent);
delta(parent, function(){ 
    this.each(function(parent){
        error("html", is.html(parent), ln()); 
    if (is.collection(e)) {
        forEach(function(e){
            error("html", is.html(e), ln());
            parent.insertBefore(e, parent.firstChild);
        },e)
    } else{
        error("html", is.html(e), ln());
        parent.insertBefore(e, parent.lastChild);
    }
    });
});
    return this;
},


setFirstChild: function setFirstChild(parent, child){
    delta ( curry(this, child), function (){
        this.each(function(child){
            child = enclose (child); 
                child.forEach(function(child){ 
                    entechie(parent).each(function(parent){
                        error("html", is.html(parent), ln());
                        parent.insertBefore(child, parent.firstChild);
                    });
                });
        });
    }); 
    return this; 
},


prepend: function prepend(element, nxsb){//used to create previousSibling
    nxsb = cast(this, nxsb, false);
    element = curry(element, pt.createFrag, !contains.invalidChars(element));
    element = curry(element, pt.create, !plain.text(element));
    is.techie(nxsb) ? ( //used to create previousSibling
        nxsb.each(function prepend_each(nxsb){
            error("html", is.html(nxsb), ln());
            error("The element is not in the document",is.html(nxsb.parentNode), ln())
            nxsb.parentNode.insertBefore(element, nxsb);
        })
        ) : prepend.call(Techie.PT._(nxsb), element);
    return this;
},
append: function prepend(element, nxsb){//Used to create nextSibling
    nxsb = cast(this, nxsb, false);//Use nxsb || this
    element = curry(element, pt.createFrag, !contains.invalidChars(element));
    element = curry(element, sapi.createElement.bind(sapi), !plain.text(element));
    is.techie(nxsb) ? ( //used to create previousSibling
        nxsb.each(function prepend_each(nxsb){
            error("html", is.html(nxsb), ln());
            error("The element should be in the document",is.html(nxsb.parentNode), ln());
           (plain.text(element))
            nxsb.parentNode.insertBefore(element, nxsb.nextSibling);
        })
        ) : prepend.call(Techie.PT._(nxsb), element);
    return this;
},
slice: function(){
    return Array.prototype.slice.call(this);
},

html: function html(neW, parent){
//.html("div").html("<h2></h2>").html(p, div).html().html("My God!");
neW = curry(neW, pt.createFrag, !contains.invalidChars(neW));
parent = cast(this, parent);
if (!arguments.length) { // pt("div").html() get the innerHTML first element
    var iterator = 0, nodes = cast(parent, parent[0]).childNodes, node, firstChild = null;
for(; iterator < nodes.length; iterator++ ){
if ( (node = nodes[iterator]).nodeType == 1 ) {
    return node.innerHTML;
}
}
}
is.techie(parent) ? parent.each(function(p){
    error("html", is.html(p), ln()); 
    if (is.collection(neW)) {neW = neW[0];}
    if (typeof neW === "string") {
        p.innerHTML = neW;
    } else {
       if (p && p.nodeType && neW && neW.nodeType) {
        p.innerHTML = null; p.appendChild(neW);
       }

    }
} ) : html.call(Techie.PT._(parent), neW);
    return this;
},

text: function text(str, element){//.text().text("meat").text("egg", div)
var e = str, txt;
element = cast(this, element);
if(!is.dom(element) && is.dom(str)) {//pt.text(pt.Id("message-body"))
element = str; str = null;
}
if (!arguments.length || !str) { // pt("div").text().text(null, div) gets text at this[0]
   element = cast(element, element[0]); 
        return _techie.getText(element);
}
forEach.call(pluralize(element), function(element){
    if (!is.dom(element)) {return;}
            curry(str, _techie.setText.bind(this), !is.string(str));
});

    return this;
},
before: function before (){},//Used to create previous sibling
// pt(div).before("<h3>stopped</h3>").after().text("started")        
after: function (){},//Used to create next sibling
before: function before(element, nxsb){//used to create previousSibling
    // pt(div).before("<h3>stopped</h3>").after().text("started")
    nxsb = cast(this, nxsb, false);
    element = curry(element, pt.createFrag, !contains.invalidChars(element));
    element = curry(element, pt.create, !plain.text(element));
    is.techie(nxsb) ? ( //used to create previousSibling
        nxsb.each(function(nxsb){
            error("html", is.html(nxsb), ln());
            error("The element is not in the document",is.html(nxsb.parentNode), ln())
            nxsb.parentNode.insertBefore(element, nxsb);
        })
        ) : before.call(Techie.PT._(nxsb), element);
    return this;
},
after: function after(element, nxsb){//Used to create nextSibling
    // pt(div).before("<h3>stopped</h3>").after().text("started")
    nxsb = cast(this, nxsb, false);//Use nxsb || this
    element = curry(element, pt.createFrag, !contains.invalidChars(element));
    element = curry(element, sapi.createElement.bind(sapi), !plain.text(element));
    is.techie(nxsb) ? ( //used to create previousSibling
        nxsb.each(function(nxsb){
            error("html", is.html(nxsb), ln());
            error("The element should be in the document",is.html(nxsb.parentNode), ln());
           (plain.text(element))
            nxsb.parentNode.insertBefore(element, nxsb.nextSibling);
        })
        ) : after.call(Techie.PT._(nxsb), element);
    return this;
},



first: function first(child, parent){//.first(div).first("h2").first("<h1></h1>").first() 
child = curry(child, pt.createFrag, !contains.invalidChars(child));
child = curry(child, sapi.createElement.bind(sapi), !plain.text(child));
parent = cast(this, parent); var fn, frst;
if (!arguments.length || plain.functions((fn = arguments[0]))) {
 // pt("div").first() gets the first element child  pt("div").first(func)
    var iterator = 0, nodes = cast(parent, parent[0]).childNodes, node, firstChild = null;
if (nodes)
for(; iterator < nodes.length; iterator++ ){ 
if ( (node = nodes[iterator]).nodeType == 1 ) { firstChild = node; break;}
}
return (frst = Techie.PT._(firstChild)) && fn ? fn.call( frst, frst) : frst;
}
is.techie(parent) ? parent.each(function(p){
    error("html", is.html(p), ln()); 
    if (is.collection(child)) {
        forEach(function(child){
            error("html", is.html(child), ln()); 
            p.insertBefore(child, p.firstChild);
        },child)
    } else{ 
        error("html", is.html(child), ln()); 
        p.insertBefore(child, p.firstChild);
    }
})
 : first.call(Techie.PT._(parent), child);
    return this;
},
last: function last(e, parent){//.first(div).first("h2").first("<h1></h1>")
e = curry(e, pt.createFrag, !contains.invalidChars(e));
e = curry(e, sapi.createElement.bind(sapi), !plain.text(e));
parent = cast(this, parent); var fn, lst;

if (!arguments.length || plain.functions((fn = arguments[0]))) {
    var iterator, nodes = cast(parent, parent[0]).childNodes, node, lastChild = null;
for( iterator = nodes.length - 1; iterator > 0; iterator-- ){
if ( (node = nodes[iterator]) && node.nodeType == 1 ) {lastChild = node;break;
}
}
return (lst = Techie.PT._(lastChild)[0]) && fn ? fn.call( lst, lst) : lst;
}
is.techie(parent) ? parent.each(function(p){
    error("html", is.html(p), ln()); 
    if (is.collection(e)) {
        forEach(function(e){
            error("html", is.html(e), ln());
            p.insertBefore(e, p.firstChild);
        },e)
    } else{
        error("html", is.html(e), ln());p.insertBefore(e, p.lastChild);
    }
})
 : last.call(Techie.PT._(parent), e);
    return this;
},

addChild: function addChild(e, parent){//.first(div).first("h2").first("<h1></h1>")
e = curry(e, pt.createFrag, !contains.invalidChars(e));
e = curry(e, sapi.createElement.bind(sapi), !plain.text(e));
parent = cast(this, parent);

is.techie(parent) ? parent.each(function(p){
    error("html", is.html(p), ln()); 
    if (is.collection(e)) {
        forEach(function(e){
            error("html", is.html(e), ln());
            p.insertBefore(e, p.firstChild);
        },e)
    } else{
        error("html", is.html(e), ln());p.insertBefore(e, p.lastChild);
    }
})
 : addChild.call(Techie.PT._(parent), e);
    return this;
},

elementsScreener: function elementsScreener(element) {
    if (!arguments.length) {
        throw new TypeError("Techie: No element to provided")
    }
    var elements = Techie.PT.explode(arguments);
    elements.forEach(function(element) {
        if (!isHTML(element)) {
            throw new TypeError("Techie: " + element + " is not an object HTMLElement");
        }
    });
    return true;
},
prependChild: function prependChild(element, child) { //used to create 1stChild
    error("arguments", element != null, ln());
child = cast(element, child);//no child? use element: use child
     var context = cast(this, element == child ? null: element);
   delta(context, function(context){
    this.each(function(parent){
        if(parent) {
        delta(child, function(child){
          if (Object.prototype.toString.call(child) == "[object String]") {
            if (child.trim()[0] == "<") {
              child = _techie.createFrag(child);
            } else{
              child = document.createElement(child);
            }
          }
           parent.insertBefore(child, parent.firstChild);
        });
    }
    });
   });
   return this;
},
supports: function (prop) { //used to check if a css property is supported
var styles = Techie.PT._(sapi.body).computedStyle(), x;
if (/[A-Z]/.test(prop)) {
prop.split(/([A-Z][a-z]+)/g).forEach(function(s){//split string by the capitals
if (typeof x === "undefined") {
x = s;//The first string part is in lowercase.
} else {
x = x.concat(s ? "-" + s.toLowerCase(): "");
}
});prop = x;
// Now we have a well hephenated css string if required
}
if (prop in styles) {return true;} //Direct lookup
for(property in styles){//vendor prefixes considerations
if (property.search(prop) != -1) {return true;}
}
return false;
},

contains: function (refNode, otherNode){
if (typeof refNode.contains === "function" &&
(!client.engine.webkit || client.engine.webkit >= 522)){
return refNode.contains(otherNode);
} else if (typeof refNode.compareDocumentPosition === "function"){
return !!(refNode.compareDocumentPosition(otherNode) & 16);
} else {
var node = otherNode.parentNode;
do {if (node === refNode){
return true;
} else {
node = node.parentNode;
}
} while (node != null);
return false;
}
},

matchesSelector: function matchesSelector(element, selector){ 
//clunky workaround. serious test required to standardize.
if (element == null ) {
return false;
} else if ( element && element.matches) {
return element.matches(selector);
} else if ( element && element.matchesSelector){ 
return element.matchesSelector(selector);
} else if ( element && element.msMatchesSelector){ 
return element.msMatchesSelector(selector);
} else if ( element && element.mozMatchesSelector){ 
return element.mozMatchesSelector(selector);
} else if ( element && element.webkitMatchesSelector){ 
return element.webkitMatchesSelector(selector);
} else { 
try { return element.querySelector(selector) != null; }catch (err) {return false;}
}
},

AppendChild: function appendChild(e, parent){
//.appendChild(div).appendChild("h2").appendChild("<h1></h1>")
e = curry(e, pt.createFrag, !contains.invalidChars(e));
e = curry(e, sapi.createElement.bind(sapi), !plain.text(e));
parent = cast(this, parent);
delta(parent, function(){ 
    this.each(function(parent){
        error("html", is.html(parent), ln()); 
    if (is.collection(e)) {
        forEach(function(e){
            error("html", is.html(e), ln());
            parent.insertBefore(e, parent.firstChild);
        },e)
    } else{
        error("html", is.html(e), ln());
        parent.insertBefore(e, parent.lastChild);
    }
    });
});
    return this;
},

qs: function qs(selector, context, entechie) {//Equivalent of querySelecor
    context = context || this; 
  context = is.dom(context) ? context: document;
  var all, element;
    context = context.nodeType && context.nodeName ? context: context[0];
    error("html", (context && context.nodeType), ln());
    if (entechie == true) {
      return new emptyPT(context.querySelector(selector));
    }
     return context.querySelector(selector);
},
queryAll: function(selector, context){
  context = context || document;
  var matched = [];
  delta(context, function(context){
    this.each(function(context){
    if (context && context.nodeType) {
      matched = matched.concat(matched.slice.call(context.querySelectorAll(selector)));
    }
    });
  });
  return matched;
},
all: function all(selector, context) {
    context = context || this; 
  context = curry(document, !is.dom(context) ? context: null); var all;
    delta(context, function(){
      all = this;
        this.each(function(context){
            error("html", is.node(context), ln()); 
            all = all.concat(sapi.querySelectorAll(selector));
        });
    });
  return all;
},
Attribute: function Attribute(attr, context) { //.Attribute("prize"); .Attribute("data-set");
    var nodes = _techie.emptyPT();
    delta(context || is.dom(this) ? this : document, function(){
        this.each(function(context){   
            error("html", is.node(context), ln()); 
             walk_the_DOM(context, function(element){
                if (element && element.attributes) {
                  if (element.hasAttribute(attr.toLowerCase()) || element.attributes[attr.toLowerCase()] ) {
                   nodes.push(element);
                }
                }
            });
        });
    });
    return nodes;
},

Class: function Class(className, context) {
    var nodes = _techie.emptyPT(); 
    delta(context || is.dom(this) ? this : document, function(node){
        this.each(function(context){
            error("html", is.node(context), ln());
             walk_the_DOM(context, function(element){
              if(!(element && element.className)){return}
              var classList = element.className.split(/\s+/);
                if (classList.indexOf(className) > -1 ) {
                   nodes.push(element);
                }
            });
        });
    });
    return nodes;
},
Id: function id(id, context) { var e, grab;
    delta(context || is.dom(this) ? this : document, function(){
        this.each(function(context){   
            error("html", is.node(context), ln()); 
             walk_the_DOM(context, function(element){ 
                if (element.id == id.trim() && !grab) { //get the first one only
                   grab = e = element;
                    return true;
                }
            });
            if (e) {
                return e;
            }
        });
    });
    return e;
},

ids: function ids(id, context){
    var array = [];
    walk(context || sapi, function (e){
        if (e.id && e.id == id.trim()) {
            array.push(e);
        }
    });
    return Techie.PT._().push(array);
},

classes: function classes (clss, context){
    var arr = [];
    walk(context || sapi, function(e){
        if (e.className && e.className.contains) {
            if ( e.className.contains(clss.trim()) ) {
            arr.push(e);
        }
        }
        
    });
    return Techie.PT._().push(arr);
},

getClass: function getClass() { //all the class names 
    var names = "";
    this.each(function(element){
      names = names.concat(element.className + " ");
    });
    return names;
},

classname: function classname (clas, context){ //gets only the first occurence
     context =  context ? ( isCollection( context ) ?  context : [ context] ) :
    (isCollection(this) ? this : isHTML(this) ? [this] : [document]);
    var crank,
    ret,arr = [], i, length = context.length, contains = this.containsString;
     for ( i = 0; i < length; i++ ) {
        walk(context [i], function(e){
        if (e.className && e.className.contains) {
            if (e.className.contains(clas.trim())) {
                 if (crank == null) {
                    crank = e;
                 }
            }
        }
    });
     }
     return crank;
},
containsString: function containsString(string){
    return this.indexOf(string.trim() != -1);
},

classNames: function classNames(className, context) {
    context = context ||
    (isCollection(this) ? this : isHTML(this) ? [this] : [document]);
    var arr = [], i, length = context.length,contains = this.containsString;
    for ( i = 0; i < length; i++ ) {
    walk(context[i], function(e){
        if (e.className && e.className.contains) {
            if ( contains.call(e.className, className.trim()) ) {
                arr.push(e);
            }

        }
    });
}
    return arr;
},


classname: function classname(className, context) {
   var  name, bool; context = context ||
    (isCollection(this) ? this : isHTML(this) ? [this] : [document]);
    var arr = [], i, length = context.length,contains = this.containsString;
    for ( i = 0; i < length; i++ ) {
    walk(context[i], function(e){
        if (e.className && e.className.contains) {
            if ( contains.call(e.className, className.trim()) ) {
                if (bool == false) {
                    bool = true; name = e;
                }
                arr.push(e);
            }

        }
    });
}
    return name;
},
names: function names(name, context) {
   context = context || (this.nodeType ? this : document);
   if (context.nodeType != 1) {return;}
    return slice.call(context.getElementsName(name));
},
Children: function Children(parent) { //Children(body, 4)
var children = [], child = null, thisB = this.nodeType || isCollection(this);
error( "No arguments supplied", (arguments.length || thisB), ln());
if (!arguments.length) { parent = this;} 
if (arguments.length == 1) {
    if (thisB) {    child = parent;  parent = this;
    } else {
        parent = arguments[0];
    }
}
if (arguments.length > 1) {  parent = arguments[0];  child = arguments[1];
} 
if (isList(parent)) {  parent = parent[0]; }
error( parent + " is not object HTMLElement", parent && parent.nodeType, ln() );
    (function Next(div) {
    if (div && div.nodeType && div.nodeType == 1 ) {children.push(div);}
    if (div.parentNode && div == div.parentNode.lastChild) { return div;} 
    div = div.nextSibling;  Next(div);
}(parent.firstChild));
if (typeof child === "number") {
    var pos = children[ child ];
    return pos ? pos : null;
} else if (child && child.nodeType && child.nodeType == 1) {
    return children.indexOf(child);
}
return children;
},

ChildPos: function ChildPos(parent, element) { //returns the nth pos of an element in parent;  number is based on element siblings
var pos = Techie.PT.Children(parent).indexOf(element);
return (pos < 0) ? null : pos;
},


items: function items( a, b ) { //item(2, arr); $("p").items(), items(arr), body.items(0)
var l = isList, al = l(a) || !!(a&&a.nodeType),bl =  l(b) || !!(b&&b.nodeType), count,
an = typeof a === "number",bn = typeof b === "number",thisl = l(this) || !!this.nodeType,
index = ( !a || al ) ? ( bn ? b : null) : ( an ? a : null ), 
arr = al ? a : bl ? b : thisl ? this : null;
if (!arr || ( a && b && (arr == this)) ) { throw(" Techie.PT.items:- bag args. ");}
var i = 0, count, stk = [], cont = false;
if (arr.length && arr.length < 2) { arr = arr[0];}
if (l(arr)) { //array supplied; work up array items
return function (array, index) {
for ( ; i < array.length; i++) { if (array[i].nodeType && !array[i].items) {array[i].items = items;}
if ( typeof index === "number" && index % 1 == 0 ) { if ( i == index ) count = array[i]; break;}    
stk.push(array[index]);
}
return count ? count : stk;
}( arr, index );
} else { //html object supplied; work up the children items
var nodes = arr.childNodes, elements = [];
if ( typeof index === "number" && index % 1 == 0 ) {  
for (i = 0; i < nodes.length; i++) {if (nodes[i].nodeType == 1) {elements.push(nodes[i]);}}
for ( i = 0; i < elements.length; i++ ) {if (i == index ) { count = elements[i]; break;}}
return count;
} else {
for (i = 0; i < nodes.length; i++) {
if (nodes[i].nodeType != 1) {continue;}stk.push(nodes[i]);
} return stk;
}
}
},
tagNames: function tagNames(tagName, context) {
   context = context || (this.nodeType ? this : document);
   if (context.nodeType != 1) {return;}
    return slice.call(context.getElementsByTagName(tagName));
},
getDom: function(d){ //with or without arguments helps 
var dom = this;
if (is.dom(d))  dom = d;
return $(dom);
},
parent: function(parent, child){ //Just append this child to whatever parent they want
child = child || this;
if(!parent){
  return this[0] && this[0].parentNode;
}
grab(parent).each(function(node){
  forEach.call(child.nodeType ? [child]: child, function(child){
   try{node.appendChild(child);}catch(error){console.log(error)}
  });
});
return this;
},
create: function create(x, properties, worker) { //create("div", {}, func) create({})
var str = x, collector = [], func, len = length = arguments.length, prop,val, args = arguments;
error("arg", length && length < 4 , ln()); //At most three args and at least one arg
if (plain.objects(x)) {
str = x.tag || x.tagName;
properties = x;
} 
if (func) {
func.call()
}
error( "string", str && plain.strings(str), ln());
error("string", contains.invalidChars(str) != true, ln() );
e = sapi.createElement(str.trim());
collector.push("calls");
if(properties)
for (prop in properties){
if (properties.hasOwnProperty(prop)) {
    val = properties[prop]; 
    if (prop in e || prop in Techie) {//functions and strings
        // HERE HERE HERE HERE HERE
        if (plain.functions(e[prop]) || plain.functions(Techie[prop])) {
           e[prop] ? e[prop](val): Techie[prop].call(e, val);
           }
        else{
            e[prop] = val;//.innerText = "foo"
        }
        collector.push(prop);
    }else if (plain.strings(val) && !collector[prop]) {
    Techie.PT.Attr(e, prop, val);
} else {
    if (!collector[prop]) {
        e[prop] = val;
    }
}

}
}
// Run a chain of calls if was provided.
if (properties && properties.calls && properties.calls.length) { 
var i = 0, call;
        for (; i < properties.calls.length; i++) {
           call =  properties["calls"][i]; 
           if (call && call.apply) {
            call.apply(e, call.arguments)
        }
        }

} 

if (func) { func.call(e, e);}
return e;
}

// END OF TECHIE PROTOTYPE
};

// EXTEND Techie
Techie.prototype.getComputedStyle = Techie.prototype.computedStyle;

extend(Techie.PT, {
methods: function methods(o, boo) {
    var stk = [],
        j, i;
    o = o || pt;

    for (i in o) {
        j = o[i];
        if (typeof j === "function") {
            if (o.hasOwnProperty(i)) {
                stk.push(h4 + (typeof o[i]) + ': ' + i);
            }
        }      
    }if (boo == true) {stk = stk.sort(this.Alphabetical);}
    this.Log(stk, false);
    return stk;
},
props: function props(o) {
    var stk = [],
        i, j;
    o = o || pt;
    for (i in o) {
        j = o[i];
        if (type.isAtype(j)) {
            if (o.hasOwnProperty(i)) {
                stk.push(h4 + (typeof o[i]) + ': ' + i);
            }
        }
        stk = stk.sort(this.Alphabetical);
    }
    this.Log(stk, false);
    return stk;
},
search: function search(o, s) {
    if (arguments.length === 1) {
        s = this.explode(arguments);
        o = this;
    } else {
        s = this.explode(arguments, 1);
    }
    var store = [],
        name, value;
    for (i in o) {
        try {
            if (o[i].name) {
                name = o[i].name;
            } else {
                name = matchFunc(i);
            }
        } catch (e) {
            name = matchFunc(i);
        }
        value = o[i];
        s.filter(function(e) {
            if (e === name) {
                e = h4 + name + ': ' + value;
                store.push(e);
            }
        });
    }
    this.Log(store, false);
}, 
small: function small(boo, msg) {
    var div = sapi.createElement('div'),
        def1 = {
            display: 'none',
            position: 'absolute',
            left: "12%",
            width: '90%',
            top: '2em',
            color: 'crimson',
            background: 'silver',
            'font-size': '2em',
            'z-index': 1
        },
        def2 = {
            display: 'none'
        };
    div.textContent = msg || "I love to use a popup. It's fun!!";
    sapi.body.appendChild(div);
    Techie.PT.css( div, def1);
    //pt.pop.small(true,msg).trigger;
    return {
        trigger: function trigger() {
            if (!!boo) {
                console.log("work in progress");
            }
            if (div.style.display == 'block') {
                div.style.display = 'none';
            } else if (div.style.display == 'none') {
                div.style.display = 'block';
            }
        }
    };
},

msg: function msg(text, e) {
    this.hideErrors();
    var ee = sapi.createElement("span");
    ee.id = 'msg';
    e = e || sapi.body;
    if (arguments.length == 1) {
        if (this instanceof HTMLElement) {
            e = this;
        }
    }
    ee.innerHTML = text;
    Elements.props.append(ee, e);
    pt.css(ee, {
'box-sizing': 'border-box','word-wrap': 'break-word','color': 'indigo',
'position': 'absolute','display': 'inline','border-radius': '2px',
'padding': '1em','background-color': '#efefef','top': '0',
'border': '1px solid olive','margin': 'inherit','font-size': '10px'
});
    pt.css( sapi.body,"width:23em");

    function fire(fn, x) {
        var timer = setTimeout(function() {
            fn();
            clearTimeout(timer);
        }, x);
    }
    fire(pt.hideErrors, 5000);
},


Log: function Log(text, bool, element) {
    if (sapi.body == null) {
        return console.error("Log Failed: Make sure the document is ready or else, put you script near the end of the body tag");
    }
    if (text == null) {
        return Log("Use Log to quickly print visual results on the page."+br+" Just type Log()    " + "You can do this on the console or from your code." , false);
    }
    if (plain.type( bool, "boolean")) {
        _techie.hideErrors();
    }   
    var log = Techie.PT.createFrag(  "<h3>" + text + "</h3> <hr />" );
    log.id = "err";
    if (!is.dom(element)) {element = sapi.body;}
     SAPI(element).prependChild( "<div></div>" ).first().first(log).css({
        width: "100%", margin: "auto auto", position: "relative"
    });

    Techie.PT.css(log, { background: "#a9a965",  "right": "0",
'padding': '2em','box-sizing': 'border-box',display: "inline-block", "position": "relative", 
'word-wrap': 'break-word','color': 'cyan','border-radius': '30px', "text-align": "center"
        } );
    return text;
},





hideErrors: function hideErrors(err) {
    var msg = Techie.PT.grab('#msg'),
        error = Techie.PT.grab("#err");
    err = msg[0] ? msg : error;
    forEach(function(err, index) {
        if (isHTML(err)) {
            err.style.display = 'none';
        }
    }, err);
    return 'done';
},

min: function min(text, element) {
    this.hideErrors();
    var error = sapi.createElement("span");
    error.id = 'err';
    element = element || sapi.body;
    if (arguments.length == 1) {
        if (this instanceof HTMLElement) {
            element = this;
        }
    }
    error.innerHTML = text;
    Elements.props.prependChild(element, error);
    Techie.PT.css(error, {
'color': 'crimson','border': '.1em solid crimson','position': 'absolute',
'font-size': '1em','display': 'block-block','box-sizing': 'border-box',
'word-wrap': 'break-word', padding: "4px 6px", borderRadius: "2px"
    });
    // pt.css(sapi.body, "width:23em");
    return error;
},


stringifyAll: function stringifyAll(object, bool, element) { /*Just here*/
    //if bool is false, for in will be careful. if e is a bool, store wont
     // be logged, if it an elem, fine, else body is the default container
    var stk = [],j, i; object = object || this;
    for (i in object) {
        if (bool == false) { //for in will be carefull
            if (!object.hasOwnProperty(i)) {continue;}
        } 
            stk.push( "'" + i + "'" + ': ' + "'" + object[i] + "'");
    }
    if ( plain.booleans(arguments[2]) ) {return stk.join(",");/*Do not log */}
  Techie.PT.Log(stk.join(",<br />"));
  return stk.join(",");
},


stringify: function stringify(obj, element) {
    var store = []; obj = obj || this;
   var prop; for(prop in obj){
            if (obj.hasOwnProperty(prop)) {store.push("'"+prop+"'"+": " +"'"+ obj[prop]+"'");}
        }
   return is.boolean(element) ? store.join(","): /*Don't Log nothing*/
    delta(element, function(){
      is.dom(this) ?  this.each(function(dom){ 
             this.html(store.join(",<br />"));/*log on matched nodes*/}): 
             Log(store.join(",<br />"));//Log on body
         return store.join(",");
    });
},
populate: function populate(receiver, supplier) {
//USE: populate(arrayOne, arrayTwo); simply extends arrayOne
// USE: populate(Techie, [['fire', 'water', 'saver'], [fire, water, saver]])
//USER2 : populate(sapi, [['fire,water, saver'], [fire, water, saver]])
if (isList(receiver) && isList(supplier)) {
    if (receiver.length != supplier.length) {
        throw new Error("Both receiver and supplier must be equal");
    }
    var index = 0,
        length = supplier.length;
    for (; index < length; index++) {
        receiver[receiver.length] = supplier[index];
    }
    return receiver;
} else
if (isList(supplier)) {
    var index = 0,
        props = supplier[0],
        vals = supplier[1],
        length = vals.length;
    if (props.length = 1) {
        props = String(props[0]).split(/,/)
    }
    if (props.length != vals.length) {
        throw new Error(supplier + " should have two equal arrays: first - strings, second the reference objects")
    }
    for (; index < length; index++) {
        receiver[props[index]] = vals[index];
    }
}
},

Reduce: function Reduce ( combine, base, array ) {
base = plain.numbers(base) ? base : 0;//
if ( combine (12, 2) == 24 ) { if (base == 0) {base = 1;}} 
//Multiplicative combinaion threshold should be 0
Techie.PT.explode ( arguments, 2 ).forEach ( function ( element ){ 
if ( plain.numbers(element) ) {
base = combine ( base, element );
}  });
return function final( numbers  ) {
Techie.PT.explode( arguments ).forEach (function ( number ) {
error("@Reduce:Invalid number-- "+ number,!plain.numbers(number), ln());
base = combine ( base, number );
});
return base;
}
},


DefineAccessors: function DefineAccessors(object, name, gttr, sttr, boo) {
boo = boo == false ? false : true;
try {
    Object.defineProperty(object, name, {
    get: gttr,
    set: sttr,
    enumerable: boo,
    configurable: true
}); 
} catch(error){/*Do nothing*/}

},


Globalize: function Globalize ( object, /*o be ignored*/ index) {
//object is an object containing 
// key : value pairs to populate the global name-space with
for ( index in object ){
    if (!window[index]) { window[index] = object[index];}
}
},

DefineGlobals: function DefineGlobals(object, array) {
if (arguments.length < 2) {
    array = object;
    object = typeof Techie !== 'undefined' ? Techie : this;
}
if (!plain.arrays(array)) {
    array = [array];
}
var length = array.length, i = 0;
for (; i < length; i++) { window[array[i]] = object;}
    return this;
},

DefineProperties: function DefineProperties(object, properties, boo) {
var i; if (boo != false) {boo = true;}
for (i in properties) {
    if (properties.hasOwnProperty(i) && !(i in object) ) {
        if (Object.defineProperty) {
        Object.defineProperty( object, i, {
            value: properties[i],
            writable: true,
            configurable: true,
            enumerable: boo
        });
} else{object[i] = properties[i];warn("Object.defineProperty no supported")}
    }
} return this;
},


DefineProperty:  function DefineProperty( object, name, value, boo ) {
if (boo != false) {boo = true;}
if (Object.defineProperty) {
Object.defineProperty( object, name, {
    value: value,
    writable: true,
    configurable: true,
    enumerable: boo
} );
} else{object[name] = value; warn("Object.defineProperty not supported");}
return this; 
},

IndexOf: function IndexOf(array, element) {//.IndexOf([a,b,c], "c")this.IndexOf(2)
error("No arguments supplied", !!arguments.length, ln());
element = cast(array, element );     var index = -1;
array = cast(this, array == element ? null: array); 
curry(array, function(string){
if(is.number(element)){
index = string.substr(element, string.length);
if (/\s/.test(index)) {
index = index.split(/[\s]+/g)[0];
} else{index = index[0];}
} else{
index = string.indexOf(element);
}
}, !(is.string(array) || is.number(array)));
delta(array, function(aryray){
this.forEach(function(any, number){  
if(element == any){
  return  (index = number);
} else if(element == number){return (index = any);}
})
}, "array");
return index;
},

cloneDeep: function cloneDeep(obj) {
    var clone = {};
    for(var i in obj) {
        if(obj[i] != null &&  typeof(obj[i]) === "object"){
            clone[i] = cloneDeep(obj[i]);
        }else{
            clone[i] = obj[i];
        }
    }
    return clone;
},


deepCopy: function deepCopy() {
/*
LEGEND
copy: 
*/
var src, copyIsArray, copy, name, options, clone,
target = arguments[ 0 ] || {},
i = 1,
length = arguments.length,
deep = false;

// Handle a deep copy situation
if ( typeof target === "boolean" ) {
deep = target;

// skip the boolean and the target
target = arguments[ i ] || {};
i++;
}

// Handle case when target is a string or something (possible in deep copy)
if (typeof target !== "object" && typeof target !== "function") {
target = {};
}

// extend jQuery itself if only one argument is passed
if ( i === length ) {
target = this;
i--;
}

for ( ; i < length; i++ ) {

// Only deal with non-null/undefined values
if ( ( options = arguments[ i ] ) != null ) {
    // Extend the base object
    for ( name in options ) {
        src = target[ name ];
        copy = options[ name ];

        // Prevent never-ending loop
        if ( target === copy ) {
            continue;
        }
        // Recurse if we're merging plain objects or arrays
        if ( deep && copy && ( Object.prototype.toString.call(copy) == "[object Object]"
         ||  ( copyIsArray = Object.prototype.toString.call(copy) == "[object Array]" ) ) ) {

            if ( copyIsArray ) {
                copyIsArray = false;
                clone = src && Object.prototype.toString.call(src) == "[object Array]" ? src : [];

            } else {
                clone = src && Object.prototype.toString.call(src) == "[object Object]" ? src : {};
            }

            // Never move original objects, clone them
            // if (!target[name]) {
            target[ name ] = deepCopy( deep, clone, copy );//Job engine
            // }

        // Don't bring in undefined values
        } else if ( copy !== undefined ) {
            if (!target[name]) {
                target[ name ] = copy;
            }
        }
    }
}
}

// Return the modified object
return target;
},
find: function find(selector){
var found = [];
this.each(function(element){
  found.concat(element.queryselectorAll(selector));
});
  function finder(selector){
  dissolve(found, this, true);
}
finder.prototype = Techie.PT;
return new fincder(selector);
},
workup: function(element, cmd){
var $ = Techie.PT, txt;
if (!element) {return false;}
if (is.string(element)) {
    txt = element;
}else if ( "value" in element && typeof element.value === "string") {
 txt = element.value;
} else if(is.dom(element)){
txt =  $.text(element);
} else{return false;}
var o = $.create("input", {parent: "body", value: txt});
if ("execCommand" in document) {
    o.select(); 
    ret = document.execCommand(cmd);
    o.parentNode.removeChild(o);
    return ret;
}else{return false;}
},
copy: function copy(input){ //give it text to copy or an element  to copy its text or value
return Techie.PT.workup(input, "copy");
},
cut: function copy(input){ //give it text to cut or an element to cut its text or value
return Techie.PT.workup(input, "cut");
},
printFile: function printFile(data, title, stylesheet) {
var blob = '<html><head><title>'+title+'</title><link rel="stylesheet" href=' + stylesheet + ' type="text/css"/></head><body>' + data + '</body></html>';
    var Win = window.open('', 'Document Heading', 'height=400,width=600');
    Win.document.write(blob);
    Win.onload = function(){ // necessary if the div contain images
        Win.focus(); // necessary for IE >= 10
        Win.print();
        Win.close();
    };
    Win.document.close(); // necessary for IE >= 10
},


extend: extend







// END OF TECHIE EXTEND
}).extend(Techie.PT).extend(Events).extend(this).extend( Techie, Techie.PT );

/////////================================///////////
/////////================================///////////
/////////================================///////////
/////////================================///////////
/////////================================///////////
/////////================================///////////
// extend( Techie, Techie.PT ).extend(type).extend(Events).extend(Techie.PT,this);
// extend(Techie.PT, type).extend(Events).extend(this).extend( Techie, Techie.PT );
Techie.PT.Techie.prototype = Techie.PT;
Techie.PT.Techie.constructor = Techie;
Techie.PT.Techie.PT = Techie.PT.Techie.pt = Techie;
Techie.PT.PT = Techie.PT.pt = Techie.Techie.Techie = Techie;
// Techie.PT.Globalize ({pt: Techie, a: a,Techie: Techie});
stringify = Techie.PT.stringify; 
stringifyAll = Techie.PT.stringifyAll;
Log = Techie.PT.Log;
// alert(Techie.Techie.Techie.Techie.Techie.Techie.Techie.on)
// a(Techie.PT.is)
/////////================================///////////
/////////================================///////////
/////////================================///////////
/////////================================///////////
/////////================================///////////
/////////================================///////////

function dissolve(object, This, boolean){ //dissolve(nodes, this, true); 
if (!object) {return}
This = This || this;
var str = Object.prototype.toString.call(object);
    if (boolean == true ) {
        if (str == "[object String]" || str == "[object Comment]" || str == "[object Text]") {
            object = [object];
        } else {
          object = object.length == +object.length  ? object : [object];
        }
    } else{
     object =  object.length == +object.length ? object: [object];
    }
forEach.call(object, function(value, prop){ 
This[prop] = value;
});
try{
  if (object && "length" in object ) {
This.length = object.length;
}
}catch(error){}
}
function grab(selector){
// For minimal grabs only
return this instanceof grab ? function(selector){
dissolve(this.type(selector, "string") ? sapi.querySelectorAll(selector):(is.list(selector) ? selector:[selector]), this, true);
}.call(this, selector): new grab(selector);
}
grab.prototype = Techie.PT;

function emptyPT(object){//var o = new empty(); new emptyPT(sapi.querySelector(".menu"));
    function empty(object){
        this.length = 0;
        this.isTechie = true;
        this.techie = "[object Techie]";
        this.techieString = this.techie;
        if(object){
            dissolve(object, this, true);
        }
    }
    empty.prototype = Techie.PT;
   return this instanceof emptyPT ? emptyPT(object): new empty(object);
}

function SAPI( selector, context ) {
return this instanceof SAPI ? function ( selector, context, nodes ) {
nodes = []; var isNumber = is.number(selector);
if ( !selector ) { return this;} 
if (plain.functions(selector)) { return selector.call(this, context || this);}
if (plain.objects(selector) || plain.arrays(selector)) {
if (("length" in selector)) {
nodes = selector;
} else{
nodes = [selector];
}
}
if (is.dom(selector)) {nodes = pluralize(selector);} 
if (selector && type.primitives(selector) && (typeof selector !== "string" || isNumber)) {
nodes = [selector];
}
if (selector && typeof selector === "string" && !(isNumber)) { 
context = (typeof context === 'object' && context.querySelectorAll) ? context : document;
if (selector[0] === '<' && selector[selector.length - 1] === ">") {
        nodes = [Techie.PT.createFrag(selector)];
    } else {
        try{nodes = context.querySelectorAll(selector);}catch(err){}
    }
}
if (nodes.length) {//Fill up this array with indexed elements
   dissolve(nodes, this, true);
   this.length = nodes.length;
}
}.call( this, selector  ) : new SAPI (selector, context );
}
SAPI.prototype = Techie.prototype;






function tag(string) {
//It should be clear that isTag focuses on checking a string for html tag validity
if (!string || (typeof string !== "string") || invalidChars(string)) {
    return false;
}
if (string.charAt(0) === '<' && string.charAt(string.length - 1) === '>') {
    string = string.split(/\W+/)[1]; //split by all non-word characters and give me the second item
    //I could also use createFrag and check it against isNode
}
var tg = sapi.createElement(string),
    nodes;
if (!isNode(tg)) {
    return false;
}
if (this instanceof tag) {
    this[0] = tg;
   Techie.PT.DefineProperties(this[0], element, false);
   Techie.PT.DefineProperties(this, {
        nodes: [tg],
        length: this.nodes.length
    }, false);

} else {
    return true;
}
}

function date (){
return Date.apply(this, arguments);
}

date.prototype = extend(date, {
today: function today() {
    var getNow = function() {
        var DateToday = new Date();
        return DateToday;
    }();
    var dateDiv = document.createElement("h3");
    var dateDivPos = document.body.appendChild(dateDiv);
    dateDiv.innerHTML = getNow;
    dateDiv.style.cssText = "background: #000000; color: #ebebeb; text-align:center;font-style: Impact;font-weight:bold;font-size:100%;border-radius:4%;width:20%;position:absolute;right:0;top:0";
}
});

function object(o) {
    return Object.apply(this, arguments);
}

object.prototype = extend(object, {

ObjectToArray: function ObjectToArray(o) {
    o = pt.stringifyAll(o, false, false);
    return o;
}
});

function boolean(o, boo) {
    return Boolean.apply(this, arguments);
}


function string (s) {

function string (x) {
// Make explode handle argumants objects well. It is an array
var arr = explode(arguments), iota = 0, length = arr.length,  str;
for ( ; iota < arr.length; iota++ ) {
str = arr[iota];
this[iota] = str;
}
var that = this;
return String.apply(this, arguments );
}

}


string.prototype = extend(string, {
toString: function toString (){
var D = "";
that.each(function(s, i, arr){ 
  D =  D.concat(s);
  if (i + 1 != arr.length) {
    D += ", ";
  }
});
return D;
}.bind(window),

length: length,
commaSeparated: function commaSeparated(x) {
    var comSep = /(?=\w)+?[\w]+\s*\,\s*(\w+|\,)\s*$/;
    return comSep.test(x);
},
StripSpace: function StripSpace(s) {
    //x.replace(/(^\s+|\s+$)/g, "")
    return String(s).replace(/\s/g, '');
},

StripCommas: function StripCommas( str ) {
    return str.replace(/,/g, " ").trim().replace(/\s+/g, ", ");
   
},

mergeCommas: function mergeCommas( string ) {//merge(", ,,Head, ,First, ,Java, ,Programming, , ,")
// first strip extra commas, then strip commas at the ends of the resulting string
string = string.replace(/,(\s*,+)+/g, ",").match(/[,\s]*(.*)[,\s]/)[1];
return string.replace(/\s*,\s*/g, ", ");
},

ExtractLetters: function ExtractLetters(s) {
    if (arguments.length) {
        var stk = [];
        s = slice.call(arguments);
        s.forEach(function(s) {
            stk.push(String(s));
        });
        s = String(stk).split('');
        s = String(s).split(/[\W]*\s*/);
        return s;
    }
    return '--NIL--';
},


ExtractWords: function ExtractWords(s) {
    if (arguments.length) {
        var stk = [];
        s = slice.call(arguments);
        s.forEach(function(s) {
            stk.push(String(s));
        });
        s = String(stk);
        s = s.split(/[\W]+\s*/);
        return s;
    }
    return '--NIL--';
},


capitalize: function capitalize(s) {
    if (arguments) {
        var stk = [],
            arr = slice.call(arguments);
        arr.forEach(function(s) {
            //t hold one item from pos 0
            var t = String(s).slice(0, 1);
            //u hold all items from pos 1
            var u = String(s).slice(1);
            var C = t.toUpperCase().concat(u.toLowerCase());
            stk.push(C);
        });
        return stk;
    }
    return false;
},
    
    eachWord: function (fn, This) { 
        var length = this.length; var index =  jota = 0, words = [], word, wordslength; 
        for ( ; index < this.length; index++ ) { 
            if (this[index])
            words = this[ index ].split(/\s+/); wordslength = words.length; 
            for  ( ; jota < wordslength; jota++) {
               word =  words[jota]; 
               if ( fn.call( word || This, word, jota, words ) === false ) {
                // break;
               } 
         }
         jota = 0;
    }
    return this;
    },


 ucFirst: function ucFirst(s){ //Capitalize the first letter of a whole string
    // $("michal").ucWord(), $(["jamaica", "florida", toronto]).ucWord(); $.ucWord("iyke")
    !str ? (str = is(this) ? [this] : is(this[0]) ? this : [this] ) : (str = is(str) ? [str] : is(str[0]) ? str: [str]);
var i = 0, string; 
for (; i < str.length; i++) {//a( is(str[i]) );
     if (!is(str[i])) {continue;}
  string = str[i].charAt(0).toUpperCase().concat(str[i].substr(1, str[i].length - 1));
}   function is( x ) {    return plain.strings(x);    } 

 return string;
},
ucWord: function ucWord(s) {//capitalize the first of each word in a sentence
    return
},
reverse: function reverse(s){//reverse a string like this Michael => leahciM
    return
},
upper: function upper(s){ //convert a whole string to uppercase
    return s.toUpperCase();
},
lower: function lower(s){ //converts a whole string to lowercae
    return s.toLowerCase();
},
alphabetical: function alphabetical(s){ //returns the alphabetical order of the given string
    return
}
});


function array(o) {
    return Array.apply(this, arguments);
}
array.prototype = extend(array, {

searchArray: function searchArray(A, Aa) {
    var stk = [];
    Aa = pt.explode(arguments, 1);
    Aa = pt.StripCommas(String(Aa)).split(',')
    Aa.forEach(function(e) {
        if (pt.index(e, A) != -1) {
            stk.push(e);
        }
    });
    return stk;
},


ArrayToObject: function ArrayToObject(rr) {
    var object = {},
        vls = this.StripCommas(String(rr).split(/[\w]+\:/)).split(','),
        prps = this.StripCommas(String(rr).split(/\:\w+/)).split(',');
    prps.forEach(function(prp, i) {
        object[prp] = vls[i];
    });
    return object;
},
ExtractArgsArr: function ExtractArgsArr() {
    if (arguments) {
        var args = slice.call(arguments),
            len = args.length,
            stk = [];
        args.forEach(function(e) {
            stk.push(e);
        });
        this.length = len;
        return stk;
    }
    return false;
},

Reverse: function Reverse(arr) {
    if (toString.call(arr) != "[object Array]") {
        var err = "Only arrays are supported.";
        pt.min(err);  throw new TypeError(err);
    }
    var i, Results = [];
    for (i = arr.length; i >= 0; --i) {
        Results.push(arr[i])
    }
    return Results.join(' ');
},

Alphabetical: function Alphabetical(a, b) {
    return (a < b) ? -1 : (a > b) ? 1 : 0;
},

extendArray: function extendArray(x, y) { //extend x with y
    if (x.length && y.length) {
        var i = x.length,
            j;
        for (j in y) {
            i += 1;
            if (y.hasOwnProperty(j))
                x[i] = y[j];
        }
        x = pt.StripCommas(x);
        return x.split(',');
    }
},

merge: function merge(first, second) {
    var len = +second.length,
        j = 0,
        i = first.length;
    while (j < len) {
        first[i++] = second[j++];
    } // Support: IE<9 // Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists) 
    if (len !== len) {
        while (second[j] !== undefined) {
            first[i++] = second[j++];
        }
    }
    first.length = i;
    return first;
},


MapArrayToArray: function MapArrayToArray(x, y) {
    if (x.length !== y.length) {
        return null
    }
    var mapped = {};
    x.forEach(function(e, index) {
        mapped[e] = y[index];
    });
    mapped = pt.ObjectToArray(mapped);
    return mapped;
},
       
}) ;
function number(n) {
    return Number.apply(this, arguments);
}
number.prototype = extend(number, {
m:true,
       Hex: function Hex(obj) {
    if (!obj) {
        obj = {};
        var i = 0;
        while (i < 1000) {
            obj[i] = i;
            i++;
        }
    } else
    if (plain.numbers(obj)) {
            obj = obj.toString(16);
            Techie.PT.Log(obj);
            return obj;
    }
    var store = [];
    Object.keys(obj).forEach(function(e, i, arr) {
        arr = Object.getOwnPropertyDescriptor(obj, e);
        i = arr.value;
        i = h3 + i + ': ' + i.toString(16);
        store.push(i);
    });
    pt.Log(store.join(' '));
},
add: function add(x) {
    var total = 0;
    x = pt.explode(arguments, 0);
    var len = x.length,
        i = 0;
    return function add(x) {
        if (len) {
            if (typeof x[i] === 'number') {
                total += +x[i];
                i++;
                len--;
                add(x);
            }
        }
        return total;
    }(x);
},

Binarize: function Binarize(x) {
    match = plain.nan(x);
    var s = this.Bool.empty(x);
    if (s || match) {
        var err = "Invalid command";
        pt.min(err);
        throw new Error(err);
    }
    var Results = [],
        y = x;
    if (x == 0) {
        Results.push(x);
    }
    while (true) {
        if (x < 1) {
            break;
        } else {
            if (x % 2 == 0) {
                x = x / 2;
                Results.push(0);
            } else if (x % 2 == 1) {
                x -= 1;
                x = x / 2;
                Results.push(1);
            }
        }
    }
    return {
        Raw: Results.join(' '),
        Results: function Results() {
            var r = pt.Reverse(Results);
            return "The binary of " + y + " is " + r.join(' ');

        }()
    };
},

Timestable: function Timestable(count, limit, rounds) {
    //Timestable(1, 12, 12); Perfect
    count = count || 1,
        limit = limit || 12, rounds = rounds || 12;
    var round = 1,
        store = [],
        stk = [],
        ocount = count;
    while (true) {
        if (count <= limit * ocount) {
            store.push(count);
            count += ocount;
        } else {
            store.push("<br/>");
            stk.push(round);
            ocount++;
            count = ocount;
            if (round < rounds) {
                round++;
            } else {
                pt.Log(store.join(" "), false);
                pt.Log(stk, false);
                break;
            }
        }
    }
},
counter: function counter(count, limit, rounds) {
    //use: counter(0, 21, 7);
    /*//count will show the start
    01 ,02 ,03 ,04, 05, 06, 07,//End-game: round will indicate how long for each row across
    08, 09, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21//limit will show the limit of the overall count
    */
    count = count || 1,
        limit = limit || 15, rounds = rounds || 15;
    var round = 1,
        store = [],
        stk = [],
        ocount = count;
    while (true) {
        if (count <= limit) {
            store.push(count);
            count++;
        } else {
            store.push("<br/>");
            stk.push(round);
            if (round < rounds) {
                round++;
                count = ocount;
            } else {
                pt.Log(store, false);
                pt.Log(stk, false)
                break;
            }
        }
    }
}
});



Techie.PT.DefineAccessors(Techie.prototype, "READY", function gttr() {
/*///////////////////ready getter/////////////////////////*/
/*a = b;*/ /////////////////ready getter//////////////////

var timer;
return function(fn) { a(arguments.callee.caller.callee)
    timer = setInterval(function() {
        if (this.isReady() == true) {
            clearInterval(timer);
            this.head = sapi.head;
            this.body = sapi.body
            fn.call(this, sapi.body, sapi.head, sapi, Techie, SAPI, window);
            return this.status;
        } 
    }.bind(this), 0);
};
}, function sttr(fn) {
/*///////////////////ready setter/////////////////////////*/
/* a = b;*/ ////////////////ready setter////////////////////
var timer;
timer = setInterval(function() {
    if (this.isReady()) {
        clearInterval(timer);
        this.head = sapi.head;
            this.body = sapi.body
            fn.call(this, sapi.body, sapi.head, sapi, Techie, SAPI, window);
        return this.status;
    }
}.bind(this), 0);
}, true);


Techie.PT.DefineAccessors(Techie.prototype, 'Ready', function gttr() {
    /*/////////////////////Ready getter///////////////////////*/
   /* a = b;*/ /////////////////Ready getter///////////////////
    return function( fn ) {
        if ( this.isready ) {
            this.onReady.call(this, fn);
        } else {
            Events.addHandler( document, "DOMContentLoaded", this.onReady.bind(this, fn));
        }
    };
},
function sttr(fn) {
    /*/////////////////Ready setter///////////////////////////*/
 ///////////////Ready setter/////////////////////
    if (this.isready) {
        this.onReady.call(this, fn);
    } else {    
            Events.addHandler( document, "DOMContentLoaded", this.onReady.bind(this, fn));
    }

});

Techie.PT.DefineAccessors(Techie.prototype, "forEach",  function gttr(fn, object, thisArg) {
return function(fn, object, thisArg) {
    if (toString.call(fn) != "[object Function]") {
        return;
    }
    if (toString.call(this) == "[object Array]") {
        thisArg = object;
        object = this;
    }
    if (!object) {
        object = this;
    }
    if (object.hasOwnProperty("0") && typeof object.length === "number") {
        var index = 0,
            length = object.length;
        for (index; index < length; ++index) {
            fn.call(thisArg || object[index], object[index], index, object);
        }
    } else {
        for (index in object) {
            if (object.hasOwnProperty(index)) {
                fn.call(thisArg || object[index], object[index], index, object);
            }
        }
    }
    return object;
};
}, function sttr(fn) {
if (toString.call(fn) != "[object Function]") {
    return;
}
var object = this;
if ('0' in object && typeof object.length === "number") {
    var index = 0,
        length = object.length;
    for (index; index < length; ++index) {
        fn.call(object[index], index, object[index], object);
    }
} else {
    for (index in object) {
        if (object.hasOwnProperty(index)) {
            fn.call(object[index], index, object[index], object);
        }
    }
}
return object;
}, true);
// grab.prototype.__proto__ = Array.prototype;
// SAPI.prototype.__proto__ = Array.prototype;
// Techie.prototype.Techie.prototype.__proto__ = Array.prototype;
// a(grab.prototype.__proto__ === Techie.prototype.__proto__)
Techie.PT.DefineAccessors(Techie.prototype, "Each", function gttr(){
return forEach;
}, function sttr(fn){
forEach(fn, this)
});


//PURGE
(function wash_the_global_env(params){
  params.forEach(function(param){
   if (param) { delete window[param];}
  });
}([]));


/*"error", "each", "walk", "errors", "count", "EventUtil", "run_the_DOM", "run"*/
return Techie;
}));


