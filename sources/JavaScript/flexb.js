Techie(function($, body, head, sapi, _, w, Log, stringify, stringifyAll, a){
  var _this = this, cordinates;
    function effect(target, prop,  colorValue){
      target.style[prop] = colorValue;
    }

    function create(target, txt){
         cordinates = _this.getOffset(target);
      if (txt == true) {
        txt = `
         <div id="effects" style="position: absolute; left:${cordinates.left}px; top: ${cordinates.top - 1}px;">
          <small>Background color<input type="color" class="fn" value="#2e3c4f" id="background-color"></small>
          <small>Resize box <input type="range" class="fn" value="8" max="50" min="8" step="1" id="box-size"></small>
          </div>
        `;
      }
     _this[(target == body ? "prependChild": "prepend")].call(target, _this.createFrag( (txt || `
               <div id="effects" style="position: absolute; left:${cordinates.left}px; top: ${cordinates.top - 1}px"> 
               <small>Font color<input type="color" class="fn" value="#2e3c4f" id="font-color"></small>
               <small>Resize text <input type="range" class="fn" value="23" min="15" max="42" value="16" id="font-size"></small>
               </div>
             `)));
    }
    function handle(target, input){
      switch(input.id){
        case "font-size": effect(target, "fontSize", input.value + "px"); break
        case "font-color": effect(target, "color", input.value); break
        case "background-color": effect(target, "backgroundColor", input.value); break
        case "box-size": effect(target, "flexBasis", input.value + "%"); break
      } 
        }

  $(body).get(0, function(body){

    this.click(function(event){
    var target = this.getTarget(event);
    var prop;
    if(target && target.id){
    $(".fn_").each(function(input){
      this.input(function(event){
     switch(target.id){
      case "background-color": handle(body, input); break
      case "font-color": 
      case "font-size": 
      case "box-size":
      $(".flex-item").each(function(node){
        handle(node, input)
      }); break
      default: return null;
    }
      });
     });
  }

  });

    var excludedIds = "container modifier main body".split(/\s+/);

    this.click(function(event){// Remove node upon click anywhere
      var target = this.getTarget(event);
      var effects = this.Id("effects");
      if (effects && target.className != "fn" && target.id != "effects") { 
        effects.parentNode.removeChild(effects); //Removing node id=tem
      }
    });//  Ends .removeChild

    
    this.contextmenu(function(event){//Upon right click shit inject some nodes
      var target = this.getTarget(event);  
      if (target.id && excludedIds.indexOf(target.id) == -1) {
        create(target);  a(this.getStyle("font-size", target))
      this.each.call(target.parentNode.querySelectorAll(".fn"), function(node){
      this.input(handle.bind(target, target, node));
      });
      this.prevent(event);
      }
    });// Ends .contextmenue

   
    this.dblclick(function(event){ // Upon double click 
     var target = this.getTarget(event);
     if(target.id && excludedIds.indexOf(target.id) == -1){
     create(target, true); 
     this.each.call(target.parentNode.querySelectorAll(".fn"), function(node){
      this.input(handle.bind(target, target, node));
     });

   }
    });

  });
  });


