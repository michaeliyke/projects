Techie(function($,body,head,doc,_,w,Log,stringify,stringifyAll,a){
  $("#center-pane").get(0, function(node){// a(node.focus)
    node.contentEditable = true;
    // node.focus(); 
    var is = {};
    is.fnKey = function(e){if (/F[0-9]/i.test(e.code)) {return true;} return false;};
    is.printable = function(e){
      if (this.fnKey(e)) {return false;}
      return  (/[A-z0-9]/i).test(String.fromCharCode(e.keyCode || e.which));
    };
    is.numbers = function(e){return /^[0-9]+$/.test(String.fromCharCode(e.keyCode || e.which));};
    this.addHandler(this, "keypress", function(event){

      if (is.printable(event)) {
        switch(true){
          case node.textContent.length == 25: /*Allow to fall through*/
          case !is.numbers(event): this.prevent(event); 
        }
      } else{
        if ( !(/[A-z0-9]+/).test(event.key) || /[|!\\/_$@`~#%^&*()-+=<>{.,;:'"}]/.test(event.key)) {
          this.prevent(event);
        }
      }
      node.textContent.replace(/[^0-9]+/, "");
    });
  });
});