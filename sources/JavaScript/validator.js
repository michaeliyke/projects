var
id = 0, 
ErrorCodes = {},
walk_the_DOM = function walk(node, func) { 
if (node && node.nodeType == 1) func.call(node, node);
   node = node.firstChild;
        while (node) {  
            walk(node, func);
            node = node.nextSibling;
        }
    },
$ =  Validator = function Validator(selector, context) { 
    return new $.fn.init(selector, context); 
},
garbage = {},
toString = tostring = garbage.toString,
garbage = [], //Garbage has changed 
slice = garbage.slice,
delta = function(dom, fn){
    var Dom = dom ? (dom.tag ? dom : Validator(dom)) 
        : delta(this);
       return fn && fn.call? fn.call(Dom, Dom): Dom;
},
is  = plain = {
    dom:  function(d){
        return d && d.nodeType && d.nodeType == 1 || ( d && d[0] && d[0].nodeType && d[0].nodeType == 1);
    },
     isEmpty: function isEmpty(x) {
        // .isEmpty(input.value)
        if (x && x.tagName  && x.type && x.type.toLowerCase() != "hidden"  &&  x.type.toLowerCase() != "submit" ) { // .isEmpty(input)
           return !(/\S+/.test(x .value.trim())) ? true: false;
        }
      return false;
               
 },
 form: function(fm){
    return fm && fm.tagName && fm.tagName.toLowerCase() == "form";
 },
 input: function(fm){
    return fm && fm.tagName && fm.tagName.toLowerCase() == "input";
 },
 element: function(node){
    return node && node.nodeType && node.nodeType == 1;
 },
 list: function isList(array) {
        if (!arguments.length) { array = this;}
        return toString.call(array) != "[object String]" && array && array.length 
        && typeof array.length === 'number' && array.length % 1 == 0;
    },
    html: function(h){
        return typeof h === "object" && h.nodeType && h.nodeType == 1;
},
    objects: function(r){
        return Object.prototype.toString.call(r) == "[object Object]";
    },
    functions: function(r){
        return Object.prototype.toString.call(r) == "[object Function]";
    },
    arrays: function(r){
        return Object.prototype.toString.call(r) == "[object Array]";
    }
};
$.fn = fn = data = $.prototype = {
    init: function init(selector, context){
        if (!selector) {
            return  new init(this);
        }
        if (typeof selector === "function") {
            return this.ready( selector );
        }
        var nodes ;
        if (is.html(selector)) {
            nodes = [selector];
        }  else if (is.list(selector)) {
            nodes = slice.call(selector);
        } else if (toString.call(selector) == "[object String]") {
            nodes = slice.call( ( is.objects(context) ? context: document).querySelectorAll(selector))
        } else{
            return selector;
        }
        this.length = 0;
       this.each(function(node, index){
        this[index] = node; this.length++
        this.extend(node, this);
       }, nodes, this);
 if (  this[0]  && ( this.parent =  this[0].parentNode) ) {
    this.isForm  = this[0].nodeName  == "FORM" || this.parent.nodeName  == "FORM";
 } 
 
    },
     isready: false,
      onReady: function onReady(func) {
            this.isready = true;
            func.call(this, func);
        },

    ready: function ready(func) { 
            if (this.isready || this.isReady()) {
                this.onReady.call(this, func);
            } else {
                this.addHandler(document, "DOMContentLoaded",  this.onReady.bind(this, func));
            }
        },
     addHandler: function addHandler(element, type, handler) {
                    element.addEventListener ? element.addEventListener(type, handler, false) :
                        element.attachEvent ? element.attachEvent( "on" + type, handler) :
                            element["on" + type] = handler;
          return this;
        },
         prevent: function(event) {
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
            return this;
        },
stop: function(event) {
            this.prevent(event);
            if (event.stopPropagation) {
                event.stopPropagation();
            } else {
                event.cancelBubble = true;
            }
            return this;
        },
        removeHandler: function removeHandler(element, type, handler) {
                    element.removeEventListener ? element.removeEventListener(type, handler, false) :
                        element.detachEvent ? element.detachEvent( "on" + type, handler) :
                            element["on" + type] = null;
          return this;
        },
        getChildren: function(dom){
            var childs = []; if (!dom && dom.childNodes)  return null;
             slice.call(dom.elements).forEach(function(node){
                if ( is.element(node)) childs.push(node);
            });
             return childs;
        },
    each: function(fn, array, This){
        array = array || this;
        var i = 0, length = array.length; 
        for(; i < length; i++) fn.call(This|| array[i], array[i], i, array);
        return this;
    },
  once: function(fn, array, This){
        array = array || this;
        var i = 0, length = array.length; 
        for(; i < length; i++)  {
            fn.call(This || array[i], array[i], i, array);
        }
        return this;
    },
   forEach: function(fn, array, This){
         array = array || this;
        var i = 0, length = array.length; 
        for(; i < length; i++) fn.call(This || array[i], array[i], i, array);
        return this;
    },
    getDom: function(d){ //with or without arguments
        var dom = this;
        if (is.dom(d))  dom = d;
    return $(dom);
    },
    tag: "Validator",
    create: function(tg, msg){
        tg = document.createElement(tg);
        tg.texContent ?  tg.texContent = msg:  tg.innerText = msg;
        return tg;
    },
    prepend: function(Newer){
        if (is.list(this)) {
        this.each(function(node){
            if (node && node.parentNode) { 
                 node.parentNode.insertBefore(Newer, node);
            }
        })
    } else  {
        this.parentNode.insertBefore(Newer, this);
    }
        return this;
    },

    getAttributeMapOf: function getAttributeMapOf(att){ 
// map elements with same attr with their associated values
var  value, map = Map = {}; 
    walk_the_DOM(document, function(node){
     if( value = node.getAttribute(att))  {
        if (!Map[value]) {
            Map[value] = [node];
        } else {
            Map[value].push(node); //map [node] = {att: tem}; Map [node] = tem;
        }
     }
    });
    return Map;
},

hasAttr: function hasAttr(element, attribute) {
    if (is.strings(element)) { attribute = element; element = this;}
            if ( eleme2nt && element.hasAttrbute) { 
               return element.hasAttribute(attribute);
            } else if ( element && element.attributes  ){ 
                return element.attributes && attribute in element.attributes;
            }
        },
        hasError: function(n){
            return !!String(n.innerText).match("Please fill in this field");
        },
override: true, //It will be searched for regexps later which will be used instead of  or with Req
      Reqs: { //Respective regexp will follow
        foolishInput: function(v){
            var numbers = v.replace(/[A-z\W]+/gi, ""),
            letters = v.replace(/[\d\W]+/g, ""),
            nboo = numbers.length > letters.length;
            if (!(v.replace(/[\W\s]+/, "").replace(/\d+/, ""))) return true; //numbers and characters only
            if ((/^(\W\s*)+$/).test(v)) return true; //only characters
            if (/^(\d\s*)+$/.test(v)) return true; //only numbers
            if (nboo) return true;//too much numbers
            return false;
             },
             number: function (v){
            /^[-]?[\d]+(\.\d)?[\d]*$/.test(v);
        } ,
        "": "", //For empty ones
        integer: function(v){
            return  /^[-]?[\d]+[\d]*$/.test(v);
        },
        float: function(v){
            return /^[-]?[\d]+(\.\d)[\d]*$/.test(v);
        },
        password: function(v){
             if (this.foolishInput(v, true)) return false;
            return /^([\w%!#@$^&*)(-+.?~]{9,})$/i.test(v);
        },
        date: function(v){
            return /^(\d{1,2}(-|\.|\/)\d{1,2}(-|\.|\/)\d{2,4})$/.test(v);
        },
        time: function(v){
            return /^(\d{1,2}(:|\.)\d{1,2})$/.test(v);
        },
        email: function(v){
             if (this.foolishInput(v, true)) return false;
            return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        phone:  function(v){
            return /^(\d{7,11})+$/.test(v);
        },
        username: function(v){
             if (this.foolishInput(v, true)) return false;
            return /^[A-z0-9_-]{2,}$/i.test(v);
        },
        name: function(v){
             if (this.foolishInput(v, true)) return false;
            return /^[A-z0-9_-]{2,}$/i.test(v);
        },
        address: function(value){
        if (this.foolishInput(value, true)) return false;
        if ( /^(\d\s*[\d\s,;#_-]+){7}$/.test(value) ) return false;
           return /^(\w\s*[\w\s,;#_-]+){7}$/i.test(value);
        },
         url: function(v){
            return ""
            // /^([A-z]{4,5}:/[A-z]\w+\.|[A-z]\w+\.|[A-z]{4,5}:/)+/ig
         }
    },
    attatch: function(msg, color){ //attatch("Good", "green")
    var prp, i = 0;
    for(prp in ErrorCodes){
         if (ErrorCodes[ this.tagName + i ++] == this)  return;
    }
    ErrorCodes[this.tagName + id++] = this;
    var span = $.fn.create("span", msg) ; span.style.color = color;  span.id = "sPGaInG";
     return   $.fn.prepend.call(this, span);
    },
    styler: function (prop, val){
                this.style[prop] = val;
        return this;
    },
    keepNeat: function(collection){
    $("#sPGaInG").each(function(){
        ErrorCodes = {}; id = 0;
        this.parentNode.removeChild(this);
    });
    return this;
},
  
    require: function(nodes, reqMap){  //require(nodes); require(nodes, map)
        this.keepNeat(nodes);
         this.each.call(nodes, function(node){ //once gotten here, we require it 
            if (is.isEmpty(node) ) {
                $.fn.attatch.call(node, "Please fill in this field.", "red");
                        // $.fn.styler.call(node,"border", "black");
            }
           });
         if (reqMap) {
            var req, nodes;
            for(req in reqMap ){
               if (  ( nodes = reqMap[req])  != null)  { //gets all nodes with same req
               this.forEach.call(nodes, function(node){
                    // We can talk to each inputs value now;
                    if ( regExp = this.Reqs[req]) {
                        if (!( regExp.call(this.Reqs, String(node.value).trim()))  ) {
                                this.attatch.call(  node, "Invalid  " + req, "red"  );
                        }
                    }
                }, null, this);

            }
            }
                           

         }

    },
    validate: function(dom, req){
        /*
validate()//checks non-form inputs for empty and valid input. \
    if input has req, we validate it against the req.
validate()//checks form inputs for empty and valid inputs
     if called on the form itself. If input has req, we validate it.
validate()//checks any single input for empty and 
    validates it against any provided req.

    validate(dom, "email")
>call require with the $(inputs) as nodes and "email" as string
>loop thru checking for other reqs, require upon finding
        */
        /*
nodes holds nodes and parent
        */
        var nodes = this.getDom( dom ).getElements();  
        if (!arguments.length) {
           // Wether form or not check all input for empty
          this.require(nodes, this.getAttributeMapOf("req"))
   
        }
    },
    getElements: function(){ //For getting the input HTML objects in a form object or group of it
       var inputs = [];
        this.each(function(item){
            if (is.form(item))  {
                this.getChildren(item).forEach(function(item){
                    if (is.input(item)) inputs.push(item);
                })
            }
                else if (is.input(item))  inputs.push(item); 
        }, null, this);
        return $(inputs);
    },
   extend: function extend(object, shim /*shim is also an object*/, prop, action){
    if (!shim) {shim = object; object = this;} //.extend({}).extend(this, {})--only two ways
    for(prop in shim){
            action = shim[prop];
            if ( object && object && !( object[prop])) {
            object[prop] = action; 
            }
    }
    return this;
},

   // END OF METHODS
};

$.fn.extend($,  $.fn)
$.fn.init.prototype = $.fn;
$.fn.fn = $.fn;
$.$ =   $.fn.$  = $;
$.fn.$ .$ = $;




