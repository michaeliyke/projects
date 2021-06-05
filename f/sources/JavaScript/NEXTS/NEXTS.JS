/*

Here we define NEXT moves

List of native features to consider
offsetParent
replaceWith - use parent.replaceChild to simulate it for support
animate
closest
dataset
insertAdjacentHTML
insertAdjacentElement
insertAdjacentText
compareDocumentPosition
willValidate

CONFIRMATION
removeAttributeNode
setAttributeNode
getAttributeNode
hasAttributes
hasAttribute







    // http://www.w3.org/TR/css3-selectors/#whitespace
    whitespace = "[\\x20\\t\\r\\n\\f]",

    // http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
    identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

*/
function walk_back(node, func){
    while(node && (func(node) == false)){
        walk_back(node.parentNode, func);
    }
}

function closest(selector){
// We are working with this trying to find its specified ancestor or we release its very parent
var ancestors = this.all(selector), parent;
if(!element.hasObject()){if (!this.hasObject()) {return null;}element = this[0];}
var element = this[0];
walk_back(element, function walk_back_(node){
    if (node.nodeType == 1) {
        if (ancestors.indexOf(node) > -1) {
            found = true;
            while(node){
                if (node.nodeType == 1) {all.concat(node);}
                node = node.nextSibling;
            }
        }
        return true;
    }
});
}
function parents(selector){
var all = _techie._();//gets empty techie;
var element = this.all(selector)[0], parent;
if(!element){if (!this.hasObject()) {return null;}element = this[0];}
walk_back(element, function walk_back_(node){
    if (node.nodeType == 1) {
        parent = node;
        return true;
    }
});
while(parent){
    if (parent.nodeType == 1) {all.concat(parent);}
    parent = parent.nextSibling;
}
return all;
}



if (window.Element && !Element.prototype.closest) {
    Element.prototype.closest = 
    function(s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
            i,
            el = this;
        do {
            i = matches.length;
            while (--i >= 0 && matches.item(i) !== el) {};
        } while ((i < 0) && (el = el.parentElement)); 
        return el;
    };
}



function in_dom_tree(node) {
    if (!node){ return false;}
    var rect = node.getBoundingClientRect();
    offset = rect.top || rect.left || rect.height || rect.width;
    if (offset == +offset){ return true;}
   return  document.documentElement.contains(node);
}


function in_dom_tree(node){
    if (node.ownerDocument.body.contains(node);) {}
}


function in_frame(node){
    if (typeof top !== "undefined" && typeof self !== "undefined") {
        if (top != self && window.top != window.self) {
            return true;
        }
    } else if (typeof window != "undefined") {
        if (window.top != window.self) {
            return true;
        }
    }
}
var ot, ct, escape;

/*
match all attributes and remove them so we have a very basic html
detect < tag></tag> and report with regExp
//* 
What html do we fight against? List them below

<   > == detctet with regExp

</   > == detect with regExp

ot <tag       > == get with regExp =========<tag> <tag2> </tag>
ct </tag      > == get with regExp =========<tag> <tag2> </tag2>
      ot.length must*=== ct.length<tag> <tag2> </tag>
<tag> <tag2> </tag2>
*//*

*/



string.forEach(function(ch){
    "<tag attr='value' attr2 attr3=value2>Text in the tag</tag> <tag2><tag3></tag3></tag2>"
    switch(ch){
        case "<": chLess();
        case '"': 
        case "'"
        case "/"
        case "\\"
        case ">"
        case "\s"
    }
});





var datum = "htmlstring, selector, element or jQuery";
    
    // example use
    var div = document.querySelector('div');
    var divOffset = offset(div);
    console.log(divOffset.left, divOffset.top)


    function find_PosX(obj){
    var curleft=0;
    if(obj.offsetParent)
        while(1){
            curleft+=obj.offsetLeft;
            if(!obj.offsetParent)
                break;
                obj=obj.offsetParent;
        }
    else if(obj.x)curleft+=obj.x;
    return curleft;
}

function find_PosY(obj){
    var curtop=0;
    if(obj.offsetParent)
        while(1){
            curtop+=obj.offsetTop;
            if(!obj.offsetParent)
                break;
                obj=obj.offsetParent;
        }
    else if(obj.y)curtop+=obj.y;
    return curtop;
}

class TIME{
    constructor(){
        this.data = new Date();
        this.total = "";
    }
    addTime(time1, time2){
        time1 = String(time1);
        time2 = String(time2);
        time1.reverse();
        time2.reverse();
        let t1, t2, t = index = -1;
        for(t1 of time1.split("")){
            t2 = time2[++index];
            t += (t1 + t2);
            switch(index){
                case 0:this.rebase(t, 10);/*calculate in base 10*/
                case 1: this.rebase(t, 6);/*calculate in base 10*/
                case 2:this.rebase(t, 10);/*calculate in base 10*/
                case 3:this.rebase(t, 10);/*Not necessary but our algorithm isn't perfect*/
            }
        }
        return this.total;
    }
    subtractTime(time1, time2){
        time1 = String(time1).reverse().split("");
        time2 = String(time2).reverse().split("");
        let upper, lower, index = -1;
        for(upper of time1){
            lower = time2[++index];            
            switch(index){
                case 0:this.total = caculate(upper, lower, 10, time1, index).concat(this.total);
                case 1:this.total = caculate(upper, lower, 6, time1, index).concat(this.total);
                case 2:this.total = caculate(upper, lower, 10, time1, index).concat(this.total);
                case 3:this.total = caculate(upper, lower, 10, time1, index).concat(this.total);
            }
        }
        function caculate(upper, lower, limit, array, index){
            var next = array[index];
            var deeperNext;
            if (upper < lower) { //2400 = 2259
                if (upper == 0) {
                if (next > 0) {
                    array[index] = String((limit - 1));
                }else if(array[next + 1] > 0){
                    array[index] = String((limit - 1));
                    array[index + 1] = String((limit - 1));
                } 
            }
            }
            return upper - lower;
        }
        return this.total;
        return this.total;
    }
    rebase(number, limit){
     if(number >= limit){
        this.total = "0".concat(total);
        number = 1;
      } else {
        this.total = number.concat(total);
          }
    }
}

appendChild: function(div){
  this.each(function(node){
    node.insertAdjacentHTML("beforeend", div.outerHTML);
  });
  return this;
}
prependChild: function(div){
  this.each(function(node){
    node.insertAdjacentHTML("afterbegin", div.outerHTML);
  });
  return this;
}
prepend: function(div){
  this.each(function(node){
    node.insertAdjacentHTML("beforebegin", div.outerHTML);
  });
  return this;
}
postpend: function(div){
  this.each(function(node){
    node.insertAdjacentHTML("afterend", div.outerHTML);
  });
  return this;
}
append: function(div){
  this.each(function(node){
    node.insertAdjacentHTML("afterend", div.outerHTML);
  });
  return this;
}
(function(win){
var global = win;
var doc = global.document;
var dom = function(params,context){
return new GetOrMakeDom(params,context);
};
var regXContainsTag = /^\s*<(\w+|!)[^>]*>/;
var GetOrMakeDom = function(params,context){
var currentContext = doc;
if(context){
if(context.nodeType){
currentContext = context;
}else{
currentContext = doc.querySelector(context);
}
}
//if no params, return empty dom() object
if(!params || params === '' ||
typeof params === 'string' && params.trim() === ''){
this.length = 0;
return this;
}
//if HTML string, construct domfragment, fill object, then return object
if(typeof params === 'string' && regXContainsTag.test(params)){
//yup it's for sure html string
/* create div and docfrag, append div to docfrag, then set its div's inner
HTML to the string, then get first child */
var divElm = currentContext.createElement('div');
divElm.className = 'hippo-doc-frag-wrapper';
var docFrag = currentContext.createDocumentFragment();
156 | Chapter 12: Creating dom.js: A Wishful jQuery-Inspired DOM Library for Modern Browsers
www.it-ebooks.info
docFrag.appendChild(divElm);
var queryDiv = docFrag.querySelector('div');
queryDiv.innerHTML = params;
var numberOfChildren = queryDiv.children.length;
/* loop over nodelist and fill object, needs to be done because a string
of html can be passed with siblings */
for (var z = 0; z < numberOfChildren; z++) {
this[z] = queryDiv.children[z];
}
//give the object a length value
this.length = numberOfChildren;
//return object
return this; //return e.g. {0:ELEMENT_NODE,1:ELEMENT_NODE,length:2}
}
//if a single node reference is passed, fill object, return object
if(typeof params === 'object' && params.nodeName){
this.length = 1;
this[0] = params;
return this;
}
/* if it's an object but not a node assume nodelist or array, else it's a
string selector, so create nodelist */
var nodes;











function createFrag(x, O, parent){
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
    O.parent = O.parent || parent;
    forEach(O, function(prop, value){
        frg[prop] = value;
    });

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