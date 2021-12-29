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
        factory.call( stub, global, machineInfo, factor, global.document, factory ); 
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
var toString = Object.prototype.toString;

// dpi calculations
!function(root, name, make) {
  if (typeof module != 'undefined' && module.exports) module.exports = make()
  else root[name] = make()
}(this, 'res', function() {

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

var shim = function shim(object, shim /*shim is also an object*/, prop, action){
    if (!shim) {shim = object; object = this;}
    for(prop in shim){
            action = shim[prop];
            if ( object && object.prototype && !( object.prototype[prop])) {
            object.prototype[prop] = action;
            }
    }
    return this;
};
shim({
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
shim(Array, {
    forEach: forEach,


    indexOf: function indexOf ( x ) { 
        var X = -1;
        this.forEach(function(element, counter){
            if (element == x) {X = counter;}
        });
        return X;
    }
});
// Basic function shims
!(function shims(shims){
    var property, action;
    for(property in shims){
        if ( shims.hasOwnProperty(property) ) {
            action = shims[property];
            if (!Function.prototype[property]) {
            Function.prototype[property] = action;
            }
        }
    }
}({
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
}));


var plain = {
        type: function type(datum, string) {
            if (string && string != null ) {
                if (toString.call(string) == "[object String]") {
                    if (/[\]\[]/.test(string)) { //[object Techie]
                        return Object.prototype.toString.call(datum) == string;
                    }
                   return typeof datum === string;
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

function type(datum, string) {
        if (type.isAtype(datum)) {
            if (string && string != null ) {
                if (toString.call(string) == "[object String]") {
                   return typeof datum === string;
                } else { error( "pt.type({}, 'object'); //true, type(28); //number", null, ln());
                }
            }
            return typeof(datum);
        }
        return null;
    }



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
         forEach.call(obj, function(prop){ 
            if (typeof prop === string) {
               bool = true;
            }
         });
      })
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






var is = {
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
        if (!arguments.length) { array = this;}
        if (is.techie(array)) {
            return !!array.length && (plain.objects(array) || plain.arrays(array));
        }
        return toString.call(array) != "[object String]" && array && array.length 
        && typeof array.length === 'number' && array.length % 1 == 0;
    },
    iterable: function iterable(x){
        if(length == +length) return true;
        return  is.list(x) || is.string(x);
    },

    html: function isHTML(datum) { //HTML tags are objects and no other data type
        if (is.node(datum) && (datum.nodeType == 1) || datum == document) {
            return true;
        }
        return false;
    }, 
    dom: function isDom(d){
        return is.html(d) || is.collection(d);
    },

    techieObject: function isTechieObject(object){
    return object && object.isTechie && object.techieString == "[object Techie]";
}, 

techie: function isTechie(object){
    return object && object.isTechie && object.techieString == "[object Techie]";
},


    collection: function isCollection(array) {
        return !!(array && array.length && is.html(array[0]));
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
        return toString.call(array) != "[object String]" && array && array.length 
        && typeof array.length === 'number' && array.length % 1 == 0;
    },
    iterable: function iterable(x){
        return is.list(x) || is.string(x);
    },

    html: function isHTML(datum) { //HTML tags are objects and no other data type
        if (is.node(datum) && (datum.nodeType == 1)) {
            return true;
        }
        return false;
    }, 
    dom: function isDom(d){
        return is.html(d) || is.collection(d);
    },

    techieObject: function isTechieObject(object){
    return object && object.isTechie && object.techieString == "[object Techie]";
}, 

techie: function isTechie(object){
    return object && object.isTechie && object.techieString == "[object Techie]";
},


    collection: function isCollection(array) {
        return array && array.length && is.html(array[0]);
    },

    absent: function isAbsent(datum) {
        return this.present(datum) ? false : true;
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


function forEach ( action, This,  object )  {
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
            },null, types); crank = false;
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

       function curry(data, fn, evaluation){//if not done, do it.
    // element = curry(element, pt.createFrag, contains.invalidChars(element));
            if (plain.functions(evaluation)) { evaluation = evaluation();}
            return !!evaluation ? fn( data): data;
        }
 function cast( sure, optional, boolean ){ //rebase between 2 options
            // nxsb = Techie.cast(this, nxsb, false);
                return optional ? optional: sure;
        }
 function enclose(dada){ //Used to form array when needed
    return is.list(dada) ? dada : [dada];
}
 function entechie(d){
    return d ? d.techieString ? d: Techie(d) : error( d + " is not a valid object", null,nl() );
}
 function plural(d){
    return is.list(d)? d: [d];
}
 function delta(ds, fn /*optional. Default is techie*/, type){
    return type ? stub.alpha(ds, type, fn) :
    (ds && ds.techieString ? fn.apply(ds, ds): fn.apply( (ds = Techie(ds) ), ds));
}
 function alpha(x, typ, fn){//.alpha(div, "array", functiion(d){a(d)})
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


var Events = {

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
            if (typeof event.charCode == "number") {
                return event.charCode;
            } else {
                return event.keyCode;
            }
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
        on: function(event, fn, object) {//window.on("scroll", function(){});;;
            enclose(cast(this, object)).forEach(function( object, index) {
                Events.addHandler(object, event, fn.bind(object));
            }); 
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
        enter: function EnterKeyPress(fn, e) {
            delta( cast(this, e), function(first_element){
             this.each(function(element){
                            if (element.nodeType == 1) {
                                this.addHandler(element, "keydown", function ( event ) {
                                    if (( event || window.event ).keyCode == 13) {
                            fn.call( element, event, event.keyCode );
                        }
                                });
                            }
                        });
            })
           
            return this;
        },

        Keypress: function Keypress(fn, e) {
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

hover: function hover(fn, func,  e) {
    delta(cast(this, e), function(){
        this.each(function(element){
            this.addHandler("mouseenter", fn.bind(element)).addHandler("mouseleave", func.bind(element));
        });
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
            if (cast(type, handler) == type) { //Hnadle two arguments case
             handler = type;   type = element; element = this;
            }
            type = Events.removeOnPrefix(type);
            delta(element, function(){
                this.each(function(element){ 
                if (element)
                    element.addEventListener ? element.addEventListener(type, handler, false) :
                        element.attachEvent ? element.attachEvent( "on" + type, handler) :
                            element["on" + type] = handler;
                });
            })
          return this;
        },
        removeHandler: function removeHandler(element, type, handler) {
            if (cast(type, handler) == type) { //Hnadle two arguments case
             handler = type;   type = element; element = this;
            }
            type = Events.removeOnPrefix(type);
            delta(element, function(){
                this.each(function(element){
                    element.removeEventListener ? element.removeEventListener(type, handler, false) :
                        element.detachEvent ? element.detachEvent( "on" + type, handler) :
                            element["on" + type] = null;
                })
            })
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
        "keydown", "keypress", "keyup", "load", "loadeddata", "loadedmetadata", "loadstart", 
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
            Events[ name ] =  Events[ "on" + capA(name) ] = Events[ "on" + name ] = function(fn, target){
                   Techie.addHandler.call(cast(this, target), name, function(event){
                        fn.apply(this.techieString ? this: Techie(this), [event, this]);
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
                base: function(platform){
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
         function istouch(){
            return  isMobile && this.touch();
        }
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
            getOrientation: getOrientation, istouch: istouch(),getMobileHeight: getMobileHeight, 
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
    is: function(reg){//.is("opera") .is("safari") .is("linux") .is("Android")
    //IOS Android OS, Windows, Mac OS, Linux, mozilla, opera, IE, safari, webkit etc 
        if (Object.prototype.toString.call(reg) == "[object String]") {
            var ua = navigator.userAgent.toLowerCase();
            reg = (new RegExp ("\\b(" + reg.toLowerCase + ")\\b", "gi ")).test(ua);
        } else if (Object.prototype.toString.call(reg) == "[object RegExp]"){
            reg = reg.test(ua);
        }
        return reg;
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
       var wt = document.documentElement.clientWidth, 
       ht = document.documentElement.clientHeight,
       availW = null, availH = null;
       if (!x) {
        return {availH: availH, availW: availW, ht: ht, wt: wt}
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
single: single, capA: capA, alpha: alpha, delta: delta, plural: plural, entechie: entechie, cast: cast,
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

    explode: function explode ( anyNoOfArgs ) {
    if (typeof explode.stk === "undefined" ) {
        this.counter = 0; this.count = arguments.length;
        this.crank = true; explode.stk = [];
    }
          if (this.counter == this.count) {
            return this.stk;
        }
        while(explode.counter > arguments.length){

 if (is.list( item )) {
        this.array = item; explode(this.array); } else { this.stk.push(item); }
    }
    return this.stk;
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
    if (this.crank == null) {
        this.counter = 0; this.count = arguments.length;
        this.crank = true; this.stk = []; this.array = arguments;
    }
          if (this.counter == this.count) {
            return this.stk;
        }
            this.counter++;
forEach( function ( item ) {
    if (Techie.isList( item )) {
        this.array = item; explode(this.array); } else { this.stk.push(item); }
    }, this.array, this );
    return this.stk;
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

      var b = Techie("head").prependChild(file);
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


  walk_the_DOM: function walk(node, func) {
        if (node && node.nodeType == 1) func.call(node, node);
        node = node.firstChild;
        while (node) {
            walk(node, func);
            node = node.nextSibling;
        }
    },
     reverse_walk_the_DOM: function walk(node, func) {
        node = node.lastChild;
        if (node && node.nodeType == 1) func.call(node, node);
        while (node) {
            walk(node, func);
            node = node.previousSibling;
        }
    },
   run_the_DOM: function run(node, func, /*ignore*/ Node, counter){
        if (typeof count === "undefined") { count = counter = 0;} //keep track
        if (node && node.nodeType && node.nodeType == 1) {
            Node = func.call(node.parentNode, node, node.firstChild, node.lastChild, counter);
            counter++;
        }
        if (!node || Node == true ) {return node;}
       node = node.nextSibling;
        run( node, func );            
    },
reverse_run_the_DOM: function run(node, func, /*ignore*/ Node, counter){
        if (typeof count === "undefined")  count = counter = 0;//keep track
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

    forEach: forEach,

    each: forEach,
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
   plural = this.plural, single = this.single, delta = this.delta, enclose = this.enclose,
   entechie = this.entechie, log = this.log, logError = console.error, warn = this.warn,
alpha = this.alpha, capA = this.capA, run = run_the_DOM = this.run_the_DOM,
   pt = PT = Techie,
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
        cell = "<td>", cellclose = "</td>",
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
                Techie.errors("string", string(str), ln());
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


var pop = {
            obj: null,
            minimal: function minimal(message, title, styleObject) {
            load("../../Styles/pop.css");
           this.originalBackround = getComputedStyle(sapi.body)["background-color"];
                message = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui  officia deserunt mollit anim id est laborum.";
                title = title || 'Prize Techie';
                var cover = sapi.createElement('div');
                cover.textContent = "I love crazy boys";
                    //focus on it and blur the body of the document                 
                    //pt.css(cover, {opacity:1, "background-color": "blue", "z-index": 2, width: body.width, height: body.height});
                Blob = "<div id=pop >" +
                            "<h1 id=header class=header > Dummy Text </h1> <hr />" +
                            "<p id=message class=message body> Dummy Text  </p>" +
                            "<footer id=footer> <hr />" +
                             "<span id=Cancel>Nope!</span> <span id=Ok>Sure!</span>"+
                           " </footer>" +

                    "</div>",
                    div = pt.createFrag(Blob);
                if (styleObject) {
                    if (toSting.call(styleObject) != '[object Object]') {
                        throw new TypeError('Only a plain object is required to extend the popup styles. Array or string is not supported');
                    }
                    pt.mixin( this.css,styleObject);
                }
                var header, body, footer,  Ok, Cancel; div.Children = div.srcObject.Children;
                  ( header = div.Children(0)).innerHTML = title;
                    (body = div.Children(2)).innerHTML = message;
                    footer = div.Children(3); 
sapi.body.appendChild(div);Ok = pt("#Ok", footer)[0]; Cancel = pt("#Cancel", footer)[0];
/*pt.css(Cancel, {'position': 'relative','right': '6em',
    'display': 'inline-block','padding-top': '3em'});
 pt.css(Ok, {'position': 'relative','left': '4em',
    'display': 'inline-block','padding-top': '3em'
         });*/




/* 
Background colors starts

#560000
00c8c8
008484
7D8A98 
Background colors ends

Font colors starts

Font colors ends
 */

 /*var bbb = " \
 \
#Ok {  \
    background: #979090 none repeat scroll 0 0;  \
    border-radius: 30px;  \
    bottom: 0;  \
    display: inline-block;  \
    margin-bottom: 1em;  \
    padding: 1em 2em;  \
    position: absolute;  \
    right: 1em;  \
}  \
#pop {  \
    background: #7D8A98;  \
    border-radius: 5px;  \
    color: #ffffff;  \
    font-family: Verdana;  \
    font-size: 120%;  \
    height: 20em;  \
    left: 25%;  \
    opacity: 1;  \
    padding: 1.5em;  \
    pointer-events: auto;  \
    position: absolute;  \
    text-align: center;  \
    top: 3em;  \
    width: 40%;  \
    z-index: 25000000;  \
}  \
#Cancel {  \
    background: #979090 none repeat scroll 0 0;  \
    border: medium none;  \
    border-radius: 30px;  \
    bottom: 0;  \
    left: 1em;  \
    margin-bottom: 1em;  \
    padding: 1em 2em;  \
    position: absolute;  \
}  \ 
#message {  \
    font-family: fantasy;  \
    font-size: 84%;  \
    line-height: 1.5;  \
    text-align: center;  \
    word-wrap: break-word;  \
}  \
  \
body{  \
    background-color: #979090 ;  \
    pointer-events: none;  \
    background: #ffefff;  \
}  ";

*/



                //data-dissabled
sapi.body.style["pointer-events"] = "none";
sapi.body.style["position"] = "fixed";

                pt.css( div,this.css); //styles the div
                /*EventUtil.addHandler(Cancel, 'click', function() {
                    pt.pop.hide(Cancel);
                });*/
                pt(Ok).click(pt.pop.hide.bind(Ok, div));
                pt(Cancel).click(pt.pop.hide.bind(Cancel, div));
                
            },
            css: {
/*'display': 'block','font-size': '120%','color': 'white','left': '25%',
'background': 'purple','position': 'absolute',"text-align": "center",
'top': '3em','width': '40%','border-radius': '.3em','z-index': '1',
'padding': '1em',"pointer-events": "auto",opacity: "1"
*/},
            display: function display() {
                pt.css(this.obj,"display:block");
            },

            hide: function hide(object) {
                pt.FX.fadeOut(object || this.obj, {
                    duration: 500,
                    complete: function complete(e) {
                sapi.body.style["position"] = "relative";
                sapi.body.style["pointer-events"] = "auto";
                sapi.body.style["background-color"] = pt.pop.originalBackround;
                element.removeChild(sapi.tagName("head"), sapi.id("dynamic_style"));
                    }
                });

       pt.css(sapi.body, {
     
});

            //(object || this.obj).style.display = 'none';
            },
              show: function show(object) {
                sapi.body.style["pointer-events"] = "auto";
                pt.FX.fadeIn(object || this.obj, {
                    duration: 500,
                    complete: function complete(e) {
                        // a(this.textContent)
                    }
                });

       pt.css(sapi.body, {
    "position": "relative",opacity: 1  
});

            //(object || this.obj).style.display = 'none';
            },
            small: function small(msg) {
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
                Techie.css( div, def1);
                Events.addHandler(sapi, 'click', function() {
                    pt.pop.hide(div)
                });

            }
        }

!(function() {
    var FX = {
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
                        element.style.display = 'none';
                },
                step: function(delta) {
                    element.style.opacity = to - delta;
                }
            });
        },

 fade: function fade (node) { // fade(document.body);
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

 
 
    fadeIn: function(element, options) {
            var to = 0;
            this.animate({
                duration: options.duration,
                delta: function(progress) {
                    progress = this.progress;
                    return FX.easing.swing(progress);
                },
                complete: options.complete,
                step: function(delta) {
                    element.style.opacity = to + delta;
                }
            });
        }
    };
    Techie.FX = FX;
})();

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
    Animate: function(){

    }
})

 function Techie(selector, context) {
        //Welcome To Techie JavaScript API version 1.0; Techie constructor lives in Techie
        return this instanceof Techie ? Techie(selector, context) : new Techie.PT.Techie(selector, context);
    }

     Techie.PT = Techie.pt = Techie.prototype = {

    constructor: Techie,
        

Techie: function PT(selector, context) {
    if (plain.functions(context)) { var Context = context;
 this.ready(function(body, head,  doc,  _, $,  w){
    return Techie(Context.call((Context = Techie(selector)),    $,  Context[0],  body,  head, doc,  _,  w ));
});
}
var funcs, string, object, others, index = 0, str = ({}).toString.call(selector), 
prevObject, nextObject, nodes = [], length, toString, wrapper, leng = 0;/* a = b;*/
this.techie = this.techieString = "[object Techie]"; this.isTechie = true;
this.toString = toString = function toString( arg, nothing ){
  if (!arguments.length) {return this.techieString;} var 
    type = typeof this[0], data = types.data, datum = data[type], data = eval(datum);
    return data && data.call ? (data(this[0])).toString(arguments[0]):
    Object.prototype.toString.call(arguments[0]); 
}

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
        if ( !isHTML(selector) && selector != window && selector != document && !selector.document) {
            forEach.call(selector, function(property, index){
            this[index] = property; leng++;
        }, null, this);
            Techie.DefineProperty( this, "length", leng, true );
            return this;
        } else { if (isHTML(selector)) {
            nodes = [selector];
        } else{
            this[0] = selector;
        Techie.DefineProperty( this, "length", 1, false ); return this;
        }
    }
        
     
    }
    

} else if (plain.strings(selector)) {
    selector.trim();
        typeof context === "string" ? context = Techie(context) :
           is.list(context) ? context =  context[0]: context;
  context = !context ? document: isList(context) && context[0].querySelectorAll ?
   context[0]: context.querySelectorAll ? context : document;
    if (selector [0] === '<' && selector[selector.length - 1] === ">" && selector.length >= 3 ) {
                    nodes = [this.createFrag(selector, context == sapi ? null: context)];
 } else if (Techie.PT.matchesSelector(context, selector)) { 
                    nodes = slice.call(context.querySelectorAll(selector));
} else  if (Techie.PT.matchesSelector( context, "."+selector)) {
        console.warn("Wrong Techie syntax. It ought to be " + "." + selector);
        return Techie("."+selector, context);
    } else if (Techie.PT.matchesSelector(context, "#"+selector)) {
       console.warn("Wrong Techie syntax. It ought to be " + "#" + selector);
        return Techie("#"+selector, context);
    }

 } else if ( str != "[object String]" && typeof selector.length === "number" && selector.length % 1 == 0 ) {
nodes = slice.call(selector);
} else {
    others = slice.call(arguments); length = others.length; Techie.DefineProperty( this, "length", length, false );
    while ( length ) { this[ index ] = others[ index ]; length--; index++; } index = 0; return this;
}
if (!(nodes[0] && nodes[0].nodeType)) { return this;}
var That = this
forEach(function( node, index, object ) { 
    this[index] = node;
    prevObject = pt.previous(node);
nextObject = pt.next( node );
wrapper = pt.getParent( node );
pt.DefineProperties(this[index], {
    srcObject: That
}, false);
pt.DefineProperties(this[index], Techie.PT, false);
 }, this, nodes);
pt.DefineProperties(this, {
 selector: selector, wrapper: wrapper, prevObject: prevObject,nextObject: nextObject,
 context: context,nodes: nodes,length: nodes.length
}, false);
this.toString = toString;
this.each(function(e) {
    if (e && e.tagName && !this[e.tagName]) {
    this[e.tagName.toLowerCase()] = e;
    }
    
}, this);
if (this[0] && this[0].tagName) {
   if (! this["head"]) { this["head"] = this[0].ownerDocument.head;}
   if (! this["body"]) { this["body"] = this[0].ownerDocument.body;}
}

    },
state:  sapi.readyState,
readyState: sapi.readyState,
version: "1.0",
loadStatus: function loadStatus (  ) {
    return sapi.readyState;
},
isReady: function isLoaded ( ) {
    return ["complete","loaded", "interactive"].indexOf(sapi.readyState) != -1;
},
  isready: false,

        onReady: function onReady(func) {
            this.isready = true;
            var head = this.head = sapi.head;
           var body = this.body = pt.next(head);
            this.head = document.head; /*a = b;*/
            func.call(this, sapi.body, sapi.head, sapi, SAPI,  Techie, window);
        },
        ready: function ready(func) { 
            if (this.isReady()) {
                this.onReady.call(this, func);
            } else {
                Events.addHandler(sapi,"DOMContentLoaded", this.onReady.bind(this, func));
            }
        },

        hasObjects: function hasObjects( ref ) {
          if (!ref) { ref = this;} return typeof ( ref === "object" && !!ref[0] );
        },

        hasNodes: function hasNodes( element ) {//(element || this) is a HTMLCollection or a nodeList
    if (!element) {element = this;} return (typeof element === "object" && isNode( element[0] ));
        },

        push: function push( o ) {
             explode(arguments).forEach(function (e) {
                this[this.length] = e; this.length++
            }, this );
            return this;
        },
        shift: function shift ( o ){
            explode (arguments).concat(this).forEach(function ( e, iota ){
                this[ iota ] = e; this.length = iota + 1;
            }, this);

        },
        unshift: function unshift (  ) {
            var Os = [].concat(this); this.length = 0;
            Os.forEach(function (e, iota){
                if ( iota != 0 ) {
                    this[this.length] = e; this.length++
                }
            }, this );
            delete this[this.length + 1];
            return this;
        },
        pop: function pop () {
            delete this[this.length]; this.length--
            return this;
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

getElementsByAttribute: function getElementsByAttribute(attribute, context){ //"div[data-dim='dimmer']", ctxt[attr]
    var elements = document.querySelectorAll(context || "*" + "[" +attribute + "]");
    pt.mixin(elements, pt.element);
    return Array.prototype.slice.call(elements);
},

getElementsByAttribute: function getElementsByAttribute(att, value) {
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

attributesTransfer: function attributesTransfer( old_e, new_e ) {
        var o = old_e, n = new_e;
        if ( arguments.length == 1 ) {
            o = this; n = old_e;
        }
        o = isCollection(o) ? o[o] : o; n = isCollection(n) ? n[0] : n;
        Techie.errors( isHTML(o) && isHTML(n), ln() );
        forEach.call(o.attributes, function(attribute){
           n.setAttribute( attribute.name, attribute.value );
        });
        return this;
    },

show: function show(rg, o) {
        var stk = [],
            j, i, t = pt.type;
        if (!o) {
            o = (this !== window) ? this : pt;
        }
        if (typeof rg === 'boolean') {
            //style display to block;
            this.style.display = 'block';
            return this;
        }
        if (rg.search('prop') != -1) {
            pt.props(o);
            return;
        }
        if (rg.search('meth') != -1) {
            pt.methods(o);
            return;
        }
        if (index(type.types, rg)) {
            var j, msg;
            for (i in o) {
                j = o[i];
                if(o.hasOwnProperty(i)){
                    if (type(j, rg)) {
                        stk.push(h4 + type(j) + ': ' + i);
                    }
                }
            }
        }
        pt.Log(stk, false);
        return stk;
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
forEach.call(element, function each( element, index){
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
}, this);
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

hasClass: function hasClass (name, element){
    var crank = false, classes, name = name? name.trim(): null, names;
delta(cast(this, element), function(){
    this.each(function(){
        classes = this.className.trim().split(/\s+/);
        if (name) {
            names = (names =  name.split(/\s+/).length > 1) ? names: null;
            if (names) {
                names.forEach(function(name){
                    crank = classes.indexOf(name) > -1;
                });
            } else{
                crank = classes.indexOf(name) > -1;
            }
        } else{
            crank = !!classes[0];
        }
    })
});
return crank;
},

toggleClass: function toggleClass(name1, name2){//.toggleClass(display, hide) .toggleClass("hide")
var clas = ""; 
this.forEach(function(){
   clas = this.className; a(clas)
   [name1, name2].forEach(function(name){
    if(clas.indexOf(name)){ a(name)
        this.className.replace(name, "");
    } else{
        this.className.concat(name.trim);
    }
   }, this);

});
    return this;
},


addClass: function addClass(name, element) {
    var classes = [], crank = false;
    forEach( function(){ 
        if (is.string(this) ) {
            classes = classes.concat(this.trim().split(/\s+/));
        } else if (is.object(this)) { 
            element = !crank ? this: error("List names first and object later", null, ln()); 
            crank = true;
        }
    }, arguments); 
    delta(cast(this, is.html(element)? element: null), function(){
        this.each(function(element){
            classes.forEach(function(str){ 
                if (is.html(element)) {
                    element.classList ? element.classList.add(str): element.className.trim() += " " + this.trim();
                }
            });
        });
    });
    return this;
},

 css: function css ( element, style, options )    {/*a(element)*/
var temp1, temp2, temp3, ret, string, object, array, elements,
styleError = "Techie.css:- the style specified is invalid. It should be a plain object, array or string",
elementError = "Techie.css:- the element specified is invalid. It should be a HTMLObject or a collection of elements",
cssTextblob =  /(\w+[-]{0,1}\w+\s*:\s*\w+[-]{0,1}\w+\s*[;]{0,1})+/g; //normal-dev: good-hand
cssTextblob = /([\d\w]+[-]{0,1}[\d\w]+\s*:\s*[#\d\w]+[-]{0,1}[\d\w%]*\s*[;]{0,1})+/g;//dev-improvedBy: #20%  
cssTextblob =  /(([\d\w]+[-]{0,1}[\d\w]+)+\s*:\s*[#\d\w]+[-]{0,1}[\d\w%]*\s*[;]{0,1})+/g;//mega-dev-man: #-Goody-dev%
cssTextblob = /(([-]{0,1}[\d\w]+[-]{0,1}[\d\w]+)+\s*:\s*[\W\d\w]+[-]{0,1}[\d\w\W]*\s*[;]{0,1})+/g; //-New-dev-in-town; #-Goody-Goody-by-%/100%
var propReg = /^(\s*\w+[-]{0,1}\w+\s*)$/g;

//NO ARGUMENTS SUPPLIED
if(!arguments.length && isHTML(this)){
 ret = computedStyle(this);
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
        ret = computedStyle(elem)[style];
    }     else if (style.match(cssTextblob)) {string = style;
    } else if (!style.length) { var elem = element.nodeType ? element : element[0];
     ret = pt.stringifyAll(computedStyle(elem), false);}
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

else if (arguments.length == 1) { 
 (isHTML(element) || isCollection(element)) ? style = style : style = element; 
element = (isHTML(element) || isCollection(element)) ? element : (isHTML(this) || isCollection(this)) ? this :  null;
if (!element) { throw new Error("Techie.css -- no element provided. ");}
if (!style) { ret = pt.stringifyAll(computedStyle(element), false);
}
    else {
        if  (typeof style === "string")  {
            if (style.match(propReg)) {
                ret =   computedStyle(element) ?  computedStyle(element)[style] : null;
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
forEach.call(element, function(element, index){
    if (string) {
element.style.cssText = string; ret = this;
}else if (array) { 
    forEach (function (  style, index ){
        element.style.cssText += style; ret = this;
    }, array, this);
    }
    else if (object) {
        forEach (function (  style, prop ){
            element.style[prop] = style; ret = this;
        }, object, this);
    }
});
return ret;
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
            forEach.call(nodes, function( node, index, all ) {
                this[index] = node;
                try {
                   Techie.DefineProperties(this[index], element, false);
                } catch (e) {
                    console.warn("Techie: No elements found.")
                }
            }, this);
            Techie.DefineProperties(this, {
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

createFrag: function createFrag(blob, context) {
        var temp = sapi.createElement("div");
        temp.innerHTML = blob; 
         curry("could not create the node from fragment.", log , !!temp.firstChild);
        forEach.call(( typeof context === "object" && context && isList(context)) ? context : [context], function( context, index ){
        if(context && context.nodeType){
            context.appendChild(temp.firstChild);
        }
    });
        return Techie(temp.firstChild)[0];
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
            Techie.errors( "html", isHTML(form) || isCollection(form), ln());
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

        removeClass: function removeClass(element, className) {
            removeClass(element, className);
            return this;
        },
        eachChild: function eachChild(fn, Thisarg, element) {
            element = Techie.Children((element || this)); 
            for (var index in element){
                if (element[index].nodeType && fn.call) {
                     fn.call(Thisarg || element[index], element[index], index, element);

                } 
            }
            return this;
        },


        eachElement: function each(fn, Thisarg, element) {
            element = Techie.Children(element || this);
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
        return Techie.Children(parent, child);
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

hide: function hide (e) {
    if (typeof e === "string") {e = Techie(e);}
    !e ? e = this : isHTML(e) ? e = [e] :  error("html", isCollection(e), ln());
    e.forEach(function(node){
        isCollection (node) ? pt.hide(node) : error("html", isHTML(node), ln());
        node.style.display = "none";
    });
    return this;
},

display: function display (e){
    if (typeof e === "string") {e = Techie(e);}
    !e ? e = this : isHTML(e) ? e = [e] :  error("html", isCollection(e), ln());
    e.forEach(function(node){
        isCollection (node) ? pt.display(node) : error("html", isHTML(node), ln());
        node.style.display = "block";
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
                    e.innerHTML = ""; e.appendChild(Techie.createFrag("<div></div>"));
                    child = e.querySelector("div");
                } else if ( !(child.nodeType)) { throw ("child supplied is not an element");}
                if (!(newObj && newObj.nodeType)) { throw ("replacement object is not a valid html object");}
               e.insertBefore(newObj, child);
                e.removeChild(child);
                }
               
        return this;
        },
        
        Remove: function Remove( e ) { //used to remove element or this using dom reomoveChild 
            if (typeof e === "string") { e = pt(e);}
            !e ? e = this : isHTML(e) ? e = [e] :  error("html", isCollection(e), ln());
             e.forEach(function(e){
               Events.unbind(e, true);
               // Techie.slice.call(e.childNodes).forEach(function(node){});
               e.parentNode.removeChild(e);
            });

             return this;
        },
RemoveAll: function RemoveAllChildren( e ) { 
            //used to remove element or this using dom reomoveChild 
            if (typeof e === "string") { e = pt(e);}
            !e ? e = this : isHTML(e) ? e = [e] :  error("html", isCollection(e), ln());
             e.forEach(function(e){
               // Events.off(e);
               Techie.slice.call(e.childNodes).forEach(function(node){
                if (e.hasChildNodes  ) {
                    e.removeChild(e.firstChild);
                    
                }
                
               }); 
            });
             return this;
        },
        RemoveChild: function RemoveChild(element, child) { //rvC(div, pt("h2")), [h2].rvC(3), rvC(div, 0), [nav].rvC(div), 
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
             if (typeof child === "number") { child = Techie.Children (element, child);}
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
        getAttr: function getAttr(element, attribute) {
            return Attr(element, attribute)
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
       TraceDept: function TraceDept( dom ) {
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
        
        GetMiddle: function GetMiddle( node ){ // Find the middle
            var length, tree = { length: 0};
            run_the_DOM(node, function(node){
                tree[tree.length] = node; tree.length++;
            });
            return {
                middle: function( object){
                    array = []; length = this.Dept;
                    if (length % 2) { //gives 1
                        array.push(object[  (length + 1) / 2  ]);
                    } else {//gives 0
                        array.push(  object[ (length - 1) / 2 ] ).push( object[ (length + 1) / 2 ] );
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
            if ( !(dom = is.collection(this) ? this[0]: is.element(this)? this: null)) {
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
            entechie(cast(this, element)).each(function (){
               original = this.parentNode; 
                return walk_the_DOM(this, function(node){ 
                    a(node)
                });
            });
            return sib;
        },
        
        getLastChild: function getLastChild( element) {
            var  nodes = [], node = null;
            delta( cast(this, element), function(){
                this.each(function(){ var P = this;
                    walk(this, function(e, firstChild, lastChild, parent){ 
                        if(this.parentNode == P && is.html(this)){
                            node = this;
                        }
                    }); nodes.push(node);
                });
            });
            return nodes[1] ? Techie(nodes) : nodes[0];
        },

        getFirstChild: function getFirstChild( element) {
            var  nodes = [], node = null;
            delta( cast(this, element), function(){
                this.each(function(){ var P = this;
                    walk(this, function(e, firstChild, lastChild, parent){ 
                        if (e.parentNode == P) {
                            if ( e.nodeType == 1 ) {
                           return (node = e); //It will always catch the last one
                        }
                        }
                        
                    }); nodes.push(node);
                });
            });
            return nodes[1] ? Techie(nodes) : nodes[0];
        },

        hasAttr: function hasAttr(element, attribute) {
            if ( element && element.hasAttrbiute) { 
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
            element = curry(element, pt.createFrag, contains.invalidChars(element));
            element = curry(element, pt.create, plain.text(element));
            is.techie(nxsb) ? ( //used to create previousSibling
                nxsb.each(function(nxsb){
                    error("html", is.html(nxsb), ln());
                    error("The element is not in the document",is.html(nxsb.parentNode), ln())
                    nxsb.parentNode.insertBefore(element, nxsb);
                })
                ) : setPreviousSibling.call(Techie(nxsb), element);
            return this;
        },
        setNextSibling: function setNextSibling(element, nxsb){//Used to create nextSibling
            nxsb = cast(this, nxsb, false);//Use nxsb || this
            element = curry(element, pt.createFrag, contains.invalidChars(element));
            element = curry(element, sapi.createElement.bind(sapi), plain.text(element));
            is.techie(nxsb) ? ( //used to create previousSibling
                nxsb.each(function(nxsb){
                    error("html", is.html(nxsb), ln());
                    error("The element should be in the document",is.html(nxsb.parentNode), ln());
                   (plain.text(element))
                    nxsb.parentNode.insertBefore(element, nxsb.nextSibling);
                })
                ) : setNextSibling.call(Techie(nxsb), element);
            return this;
        },

        appendTo: function appendTo(parent, child){ //pt("h2").appendTo(body)
            delta ( curry(this, child), function (){
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


setLastChild: function setLastChild(e, parent){
//.appendChild(div).appendChild("h2").appendChild("<h1></h1>")
        e = curry(e, pt.createFrag, contains.invalidChars(e));
        e = curry(e, sapi.createElement.bind(sapi), plain.text(e));
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
            element = curry(element, pt.createFrag, contains.invalidChars(element));
            element = curry(element, pt.create, plain.text(element));
            is.techie(nxsb) ? ( //used to create previousSibling
                nxsb.each(function(nxsb){
                    error("html", is.html(nxsb), ln());
                    error("The element is not in the document",is.html(nxsb.parentNode), ln())
                    nxsb.parentNode.insertBefore(element, nxsb);
                })
                ) : prepend.call(Techie(nxsb), element);
            return this;
        },
        append: function prepend(element, nxsb){//Used to create nextSibling
            nxsb = cast(this, nxsb, false);//Use nxsb || this
            element = curry(element, pt.createFrag, contains.invalidChars(element));
            element = curry(element, sapi.createElement.bind(sapi), plain.text(element));
            is.techie(nxsb) ? ( //used to create previousSibling
                nxsb.each(function(nxsb){
                    error("html", is.html(nxsb), ln());
                    error("The element should be in the document",is.html(nxsb.parentNode), ln());
                   (plain.text(element))
                    nxsb.parentNode.insertBefore(element, nxsb.nextSibling);
                })
                ) : prepend.call(Techie(nxsb), element);
            return this;
        },
        slice: function(){
            return Array.prototype.slice.call(this);
        },

        html: function html(neW, parent){
        //.html("div").html("<h2></h2>").html(p, div).html().html("My God!");
        neW = curry(neW, pt.createFrag, contains.invalidChars(neW));
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
        } ) : html.call(Techie(parent), neW);
            return this;
        },

text: function text(str, parent){//.text().text("meat").text("egg", div)
       var e = str; parent = cast(this, parent);
        if (!arguments.length || !str) { // pt("div").text().text(null, div) gets
            var iterator = 0, nodes = cast(parent, parent[0]).childNodes, node, firstChild = null;
    for(; iterator < nodes.length; iterator++ ){
        if ( (node = nodes[iterator]).nodeType == 1 ) {
            return this.getText(node);
        }
    }
        }
        parent.techieString ? parent.each(function(p){
            if (!is.html(p)) {return;}
                    curry(str, this.setText.bind(this), is.string(str));
        }, this) : text.call(Techie(parent), e);
            return this;
        },
        before: function before (){},//Used to create previous sibling
        // pt(div).before("<h3>stopped</h3>").after().text("started")        
        after: function (){},//Used to create next sibling
        before: function before(element, nxsb){//used to create previousSibling
            // pt(div).before("<h3>stopped</h3>").after().text("started")
            nxsb = cast(this, nxsb, false);
            element = curry(element, pt.createFrag, contains.invalidChars(element));
            element = curry(element, pt.create, plain.text(element));
            is.techie(nxsb) ? ( //used to create previousSibling
                nxsb.each(function(nxsb){
                    error("html", is.html(nxsb), ln());
                    error("The element is not in the document",is.html(nxsb.parentNode), ln())
                    nxsb.parentNode.insertBefore(element, nxsb);
                })
                ) : before.call(Techie(nxsb), element);
            return this;
        },
        after: function after(element, nxsb){//Used to create nextSibling
            // pt(div).before("<h3>stopped</h3>").after().text("started")
            nxsb = cast(this, nxsb, false);//Use nxsb || this
            element = curry(element, pt.createFrag, contains.invalidChars(element));
            element = curry(element, sapi.createElement.bind(sapi), plain.text(element));
            is.techie(nxsb) ? ( //used to create previousSibling
                nxsb.each(function(nxsb){
                    error("html", is.html(nxsb), ln());
                    error("The element should be in the document",is.html(nxsb.parentNode), ln());
                   (plain.text(element))
                    nxsb.parentNode.insertBefore(element, nxsb.nextSibling);
                })
                ) : after.call(Techie(nxsb), element);
            return this;
        },



        first: function first(child, parent){//.first(div).first("h2").first("<h1></h1>")
        child = curry(child, pt.createFrag, contains.invalidChars(child));
        child = curry(child, sapi.createElement.bind(sapi), plain.text(child));
        parent = cast(this, parent); var fn, frst;
        if (!arguments.length || plain.functions((fn = arguments[0]))) {
         // pt("div").first() gets the first element child  pt("div").first(func)
            var iterator = 0, nodes = cast(parent, parent[0]).childNodes, node, firstChild = null;
    for(; iterator < nodes.length; iterator++ ){ 
        if ( (node = nodes[iterator]).nodeType == 1 ) { firstChild = node; break;}
    }
    return (frst = Techie(firstChild)[0]) && fn ? fn.call( frst, frst) : frst;
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
         : first.call(Techie(parent), child);
            return this;
        },
        last: function last(e, parent){//.first(div).first("h2").first("<h1></h1>")
        e = curry(e, pt.createFrag, contains.invalidChars(e));
        e = curry(e, sapi.createElement.bind(sapi), plain.text(e));
        parent = cast(this, parent); var fn, lst;

        if (!arguments.length || plain.functions((fn = arguments[0]))) {
            var iterator, nodes = cast(parent, parent[0]).childNodes, node, lastChild = null;
    for( iterator = nodes.length - 1; iterator > 0; iterator-- ){
        if ( (node = nodes[iterator]) && node.nodeType == 1 ) {lastChild = node;break;
}
    }
    return (lst = Techie(lastChild)[0]) && fn ? fn.call( lst, lst) : lst;
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
         : last.call(Techie(parent), e);
            return this;
        },

       addChild: function addChild(e, parent){//.first(div).first("h2").first("<h1></h1>")
        e = curry(e, pt.createFrag, contains.invalidChars(e));
        e = curry(e, sapi.createElement.bind(sapi), plain.text(e));
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
         : addChild.call(Techie(parent), e);
            return this;
        },

        elementsScreener: function elementsScreener(element) {
            if (!arguments.length) {
                throw new TypeError("Techie: No element to provided")
            }
            var elements = Techie.explode(arguments);
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
           delta(context, function(context){ //a(this[0])
            this.each(function(parent){
                delta(child, function(child){
                    parent.insertBefore(child, parent.firstChild);
                });
            });
           });
           return this;
        },
    supports: function (prop) { //used to check if a css property is supported
    var styles = Techie(sapi.body).computedStyle(), x;
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

matchesSelector: this.matchesSelector || function matchesSelector(element, selector){ 
//clunky workaround. serious test required to standardize.
  if (element == null ) {
return false;
  } /*else if ( element && element.matches) {
    return element.matches(selector);
} else if ( element && element.matchesSelector){ 
return element.matchesSelector(selector);
} else if ( element && element.msMatchesSelector){ 
return element.msMatchesSelector(selector);
} else if ( element && element.mozMatchesSelector){ 
return element.mozMatchesSelector(selector);
} else if ( element && element.webkitMatchesSelector){ 
return element.webkitMatchesSelector(selector);
} */else { 
try { return element.querySelector(selector) != null; }catch (err) {return false;}
}
},

AppendChild: function appendChild(e, parent){
//.appendChild(div).appendChild("h2").appendChild("<h1></h1>")
        e = curry(e, pt.createFrag, contains.invalidChars(e));
        e = curry(e, sapi.createElement.bind(sapi), plain.text(e));
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

        qs: function qs(selector, context) {
            context = context || this; 
          context = curry(document, is.dom(context) ? context: null); var all = [];
            delta(context, function(){
                this.each(function(context){
                    error("html", is.node(context), ln()); 
                    all = all.concat(explode(this.querySelectorAll(selector)));
                });
            });
          return all[1] ? all: all[0];
        },
        
        all: function all(selector, context) {
            context = context || this; 
          context = curry(document, is.dom(context) ? context: null); var all = [];
            delta(context, function(){
                this.each(function(context){
                    error("html", is.html(context), ln()); 
                    all.concat(this.querySelectorAll(selector));
                });
            });
            
          return all[1] ? all: all[0];
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
            return Techie().push(array);
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
            return Techie().push(arr);
        },

        getClass: function getClass(context) { //all the class
            // pt("body").getClass()//"case container book"
            context = context || this; context = isCollection(context) ? 
            context [0] : error("html", isHTML(context), ln()); 
            return string(context.className);
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
        var pos = Techie.Children(parent).indexOf(element);
        return (pos < 0) ? null : pos;
    },


items: function items( a, b ) { //item(2, arr); $("p").items(), items(arr), body.items(0)
var l = isList, al = l(a) || !!(a&&a.nodeType),bl =  l(b) || !!(b&&b.nodeType),
an = typeof a === "number",bn = typeof b === "number",thisl = l(this) || !!this.nodeType,
index = ( !a || al ) ? ( bn ? b : null) : ( an ? a : null ), 
arr = al ? a : bl ? b : thisl ? this : null;
if (!arr || ( a && b && (arr == this)) ) { throw(" Techie.items:- bag args. ");}
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
create: function create(x, properties, worker) { //create("div", {}, func) create({})
var str, collector = [], func, length = arguments.length,error = error, prop,val;
 error("arg", length && length < 4 , ln()); //At most three args and at least one arg
  if (plain.objects(x)) {
    str = x.tag || x.tagName;
    properties = x;
  } 
  if (func) {
func.call()
 }
 // a(str + this)
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
                   e[prop] ? e[prop].call(e, val): Techie[prop].call(e, val);
                   }
                else{
                    e[prop] = val;//.innerTextb = "foo"
                }
                collector.push(prop);
            }else if (plain.strings(val) && !collector[prop]) {
            Techie.Attr(e, prop, val);
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
      return Techie(e)[0];

    }

        // END OF TECHIE PROTOTYPE
    };

// EXTEND Techie
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
            Techie.css( div, def1);
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
            if (text == null) { 
                return Log("Use Log to quickly print visual results on the page."+br+" Just type Log()    " + "You can do this on the console or from your code." , false);}
            Techie.PT.ready(function(body, head, doc, PT, _, w) {
                if (bool == false) { 
                    this.hideErrors();
                } 
                var log = this.createFrag(  h3 + text + h3close + hr );
                log.id = "err";
                element = element || body;
                    Log.div = Techie(element).prependChild(div + divclose ).first();
                 Log.div.first(log).css({
                    width: "100%", margin: "auto auto", position: "relative"
                });


                Techie.css(log, { background: "#a9a965",  "right": "0",
'padding': '2em','box-sizing': 'border-box',display: "inline-block", "position": "relative", 
'word-wrap': 'break-word','color': 'cyan','border-radius': '30px', "text-align": "center"
                } );
            }); return text;
        },





        hideErrors: function hideErrors(err) {
            var msg = Techie('msg'),
                error = Techie("#err");
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
            Techie.css(error, {
'color': 'crimson','border': '.1em solid crimson','position': 'absolute',
'font-size': '1em','display': 'block-block','box-sizing': 'border-box',
'word-wrap': 'break-word', padding: "4px 6px", borderRadius: "2px"
            });
            // pt.css(sapi.body, "width:23em");
            return error;
        },


        stringifyAll: function stringifyAll(object, bool, element) {
            //if bool is false, for in will be careful. if e is a bool, store wont
             // be logged, if it an elem, fine, else body is the default container
            var store = [],stk = [],j, i; object = object || this;
            for (i in object) {
                if (bool == false) {
                    if (object.hasOwnProperty(i)) {store.push(p+i+": "+object[i]+pclose);
                        stk.push(i + ': ' + object[i]); 
                    }
                } else { 
                    store.push(i+": "+object[i]+pclose); stk.push(i+': '+object[i]);
                }
            }
            if ( plain.booleans(arguments[2]) ) { 
            //Do not log if the third arguments is a boolean
                return stk;
            }
          Log(store) ;return stk;
        },


        stringify: function stringify(obj, element) {
            if (!!arguments.length && !(obj && typeof obj === "object")){
                return logError(obj + " is a valid object.");
            }
            var store = []; obj = obj || this;
            if (plain.arrays(obj)) { 
                obj.forEach(function(prop, index){
                    store.push(p + index + " :   " + prop + pclose);
                });
            } else { 
                var index; for(index in obj){
                    if (obj.hasOwnProperty(index)) {
                        prop = obj[index]; store.push(p+index+" :   "+ prop + pclose);
                    }
                }
            } 
            return  is.boolean(element) ? store: delta(element, function(){
              is.dom(this) ?  this.each(function(dom){ 
                     this.html(store);
                }): Log(store); 

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
   Techie.explode ( arguments, 2 ).forEach ( function ( element ){ 
 if ( plain.numbers(element) ) {
    base = combine ( base, element );
 }  });
 return function final( numbers  ) {
    Techie.explode( arguments ).forEach (function ( number ) {
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
   }, is.string(array) || is.number(array));
   delta(array, function(aryray){
    this.forEach(function(any, number){  
        if(element == any){
          return  (index = number);
        } else if(element == number){return (index = any);}
    })
   }, "array");
       return index;
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
Techie.Globalize ({
    Log: Techie.Log, sapi:sapi,SAPI: SAPI, pt: Techie, a: a, 
    log:Techie.Log, PT: PT, Techie: Techie
});
// alert(Techie.Techie.Techie.Techie.Techie.Techie.Techie.on)
// a(Techie.PT.is)
/////////================================///////////
/////////================================///////////
/////////================================///////////
/////////================================///////////
/////////================================///////////
/////////================================///////////



 

function SAPI( selector, context ) {
    return this instanceof SAPI ? function ( selector, context, nodes ) {
if ( !selector ) { return this;} 
if (plain.functions(selector)) { return selector.call(this, context || this);}
if (plain.objects(selector) || plain.arrays(selector)) { return this;}
if (isNode(selector) || isCollection (selector)) {
    nodes = selector.nodeType ? [selector] : selector; selector = null;
} 
if (selector && typeof selector !== "string") {
    this[0] = Object(selector); this.length = 1;  selector = null; return this;
}
if (selector && typeof selector === "string") {
context = (typeof context === 'object' && context.querySelectorAll) ? context : document;

    if (selector[0] === '<' && selector[selector.length - 1] === ">") {
                nodes = [createFrag(selector, context)];
            } else {
                nodes = context.querySelectorAll(selector);
            }
}
    if (nodes.length) {
            forEach(function( node, index, all) {
                this[index] = node;
                this.length = index + 1;
                try {
                   Techie.DefineProperties(this[index], element, false);
                } catch (e) {
                    console.warn("Techie: No elements found.")
                }
            }, nodes, this );
            // return nodes[1] ? nodes : nodes[0];
        }


    }.call( this, selector  ) : new SAPI (selector, context );
}
SAPI.prototype = Techie.prototype;



    function SAPY(selector, context, nodes) { //don't bother, I,ll overwrite the variable nodes
        if (!selector) {
            return this;
        }
        context = (typeof context === 'object' && context.querySelectorAll) ? context : document;
        var nodes = [];
        if (isList(selector)) {
            nodes = selector.length > 1 ? slice.call(selector) : [selector];
        }
        if (typeof selector === 'string') {
            if (selector[0] === '<' && selector[selector.length - 1] === ">") {
                nodes = [createFrag(selector, context)];
            } else {
                nodes = slice.call(context.querySelectorAll(selector));
            }
        }
        if (nodes.length) {
            forEach(function( node, index, all) {
                this[index] = node;
                try {
                   Techie.DefineProperties(this[index], element, false);
                } catch (e) {
                    console.warn("Techie: No elements found.")
                }
            }, nodes, nodes);
            return nodes[1] ? nodes : nodes[0];
        }
    }


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
           Techie.DefineProperties(this[0], element, false);
           Techie.DefineProperties(this, {
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


            each: forEach,
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
        push: function push(s) {
            var i = 0, length = arguments.length;
            for ( ; i < length; i++ ) {
            this[this.length] =  arguments[i];
            this.length++; 
        }
return this;
        },

        unshift: function unshift () {
            
            return this;
        },
        shift: function shift(s) {
            var stk = Techie.extend(true, {},  this), i, j, len = arguments.length; 
            this.length++;
            for ( i = 0; i < len; i++ ) {
                this[ i ] =  arguments[ i ];
            }               
                for ( j = 0; j < stk.length; j++, i++ ) {
                  this[ i ] = stk[j];
                }
                this.length = i;
                return this;
        },


        chop: function chop(s) {
            var stk = Techie.extend(true, {},  this), i = 0,  j = 1, length = stk.length;
                for ( ; j < length + 1; j++, i++ ) {
                this [ j - 1 ] = stk[j];
                }
                delete this[ length - 1 ];
                 this.length--;
                return this;
        },
        pop: function pop(){
            delete this[ this.length - 1 ];
            this.length--;
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
                    Techie.Log(obj);
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



Techie.DefineAccessors(Techie.prototype, "READY", function gttr() {
        /*///////////////////ready getter/////////////////////////*/
        /*a = b;*/ /////////////////ready getter//////////////////

        var timer;
        return function(fn) {
            timer = setInterval(function() {
                if (isLoaded() == true) {
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
            if (this.isLoaded()) {
                clearInterval(timer);
                this.head = sapi.head;
                    this.body = sapi.body
                    fn.call(this, sapi.body, sapi.head, sapi, Techie, SAPI, window);
                return this.status;
            }
        }.bind(this), 0);
    }, true);


    Techie.DefineAccessors(Techie.prototype, 'Ready', function gttr() {
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
            a = b; ///////////////Ready setter/////////////////////
            if (this.isready) {
                this.onReady.call(this, fn);
            } else {
                    Events.addHandler( document, "DOMContentLoaded", this.onReady.bind(this, fn));
            }

        });

    Techie.DefineAccessors(Techie.prototype, "forEach",  function gttr(fn, object, thisArg) {
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

Techie.DefineAccessors(Techie.prototype, "Each", function gttr(){
return forEach;
}, function sttr(fn){
forEach(fn, this)
});







}));



