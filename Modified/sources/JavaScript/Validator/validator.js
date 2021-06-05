var $ = function function_name(selector, context) {
    return new $.methods.$(selector, context);
}
$.methods = $.prototype = {
    $: function $(selector, context){
        this.length = 0;
       this.each(function(node, index){
        this[index] = node; this.length++
        this.extend(node, this);
       }, (typeof context === "object" && context.nodeType ? context: document).querySelectorAll(selector), this);

    },
     plain: {
    objects: function(r){
        return Object.prototype.toString.call(r) == "[object Object]";
    },
    functions: function(r){
        return Object.prototype.toString.call(r) == "[object Function]";
    },
    arrays: function(r){
        return Object.prototype.toString.call(r) == "[object Array]";
    }
},
    each: function(fn, array, This){
        var i = 0, length = array.length; 
        for(; i < length; i++) fn.call(This|| array[i], array[i], i, array);
        return this;
    },
    validate: function(){
        if (!arguments.length) {
                this.addHandler("keydown", function(){
                    // if it is empty, stop the event and style boder red
                    if (this.isEmpty()) {
                        e.stop();
                        this.style.cssText += "border-color: red;"
                    }
                })
            return null;
        }
    },
   extend: function extend() {
 var src, copyIsArray, value, property, object, clone, plain = $.methods.plain,
        target = arguments[ 0 ] || {}, i = 1, length = arguments.length, deep = false;
    if ( typeof target === "boolean" ) { deep = target;target = arguments[ i ] || {}; i++;}
    if ( typeof target !== "object" && !plain.functions( target ) ) { target = {};}
    if ( i === length ) {target = this;i--;}
    for ( ; i < length; i++ ) {  if ( ( object = arguments[ i ] ) != null ) {
            for ( property in object ) {  src = target[ property ];value = object[ property ];
                if ( target === value ) {continue;}
                if ( deep && value && ( plain.objects( value ) ||( copyIsArray = plain.arrays( value ) ) ) ) {
                    if ( copyIsArray ) { copyIsArray = false;clone = src && plain.arrays( src ) ? src : [];
                    } else {clone = src && plain.objects( src ) ? src : {};}
                    target[ property ] = extend( deep, clone, value );//Job engine
                } else if ( value !== undefined ) { target[ property ] = value;}
            }
        }
    }
    return target;
}
   // END OF METHODS
};

$.methods.extend(true, $,  $.methods)














$.methods.$.prototype = $.methods;
$.$ = $.methods.$.$ = $