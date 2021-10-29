/*
  About the Techie Library
    Techie behaves like jQuery
    - easy DOM travasal, 
    - event management, 
    - AJAX (Module still in building)
    - effects and animation (Module still in buiding)
    
    However
     Unlike jQuery Libraray:
      - You are in control
      - You do and run things your way
      - You can do it procedural pattern or OO patter, choice is yours

      $("div", function(div){ //When DOM is ready run the function
        this.doStuff();
            OR
        this.doStuff(div);
      });

      $(function(){ //Run upon DOM ready
        
      });

      $(document).ready(function(){ //Run upon DOM ready
        
      });
 */

Techie(function ($, body, head, document, _, global, Log, stringify, stringifyAll, a) {

  var context = null;

  const {
    Subscriptions, HandlerKeyPress, vars
  } = util;
  
    var d = document, getId = this.Id, v1 = "Next item", v2 = '0.00';
    var amount = getId("amount"), total = getId("total"), submit = getId("submit");
    var input = getId("item"), reset = getId("reset"), currentV = $("#current > #current");
    var  manage = getId("managing");
    var  printing = getId("printing"), saving = getId("saving"), _techie = this;
    // var  table = getId("table"), mobile_menu = getByClass("open-off-canvass");
    // var section_lists = query("header section nav ul");
  
    // Get all data
    input.focus();


  // Abstract all event binding using delegation
  $(body).click(Subscriptions).input(HandleTyping).keydown(HandlerKeyPress, $(document));  
  function HandleTyping() {}
  //Hooks an event on the document
  this.text("Total: 0", total);

});