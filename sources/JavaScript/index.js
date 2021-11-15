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

  const { vars } = util;

  var d = document, getId = this.Id, v1 = "Next item", v2 = '0.00';
  var amount = getId("amount"), total = getId("total"), submit = getId("submit");
  var input = getId("item"), reset = getId("reset"), currentV = $("#current > #current");
  var manage = getId("managing");
  var printing = getId("printing"), saving = getId("saving"), _techie = this;
  // var  table = getId("table"), mobile_menu = getByClass("open-off-canvass");
  // var section_lists = query("header section nav ul");

  // Get all data
  if (input) {
    input.focus();
  }


  // Abstract all event binding using delegation
  // $(body).click(util.Subscriptions).keydown(util.HandlerKeyPress, $(document));
  $("input[name='item'], input[name='value']").on("input", Calculator);

  util.click($(".file-data input")).handle(util.uploadFileData);
  util.click($(".file-data input")).handle(util.uploadFileData);
  util.click("file-data").handle(util.processDataUpload);
  let x = function x(e) { console.log(e); }
  let y = function x(e) { console.log(e); }
  let z = function x(e) { console.log(e); }
  // util.subscription("contextmenu").subscribe("root-body", "db-body").handle(x, y, z);

  

  
  /*
  subscribe = connect = add = key
  triggerEvent = trigger = execute = activate
  subscription = createEvent = createSubscription = event
  .event - event in play {name: click, handlers: []};
  events - all events yes on the instance

  x =  util.subscription("click") // subscription - "click"
  x =  x.subscription("mouseup") // fresh subscription - "mouseup"
       return a subscription object with key properties - event
       event is an object to which subscribbers and handlers are added
       a call to execute will trigger the event
    
       

  x.subscribe(n1, n2, n3, [n4, n4], n6, [n7]).handle(f1, f2, f3)
  x.subscribe("mouseup").handle(fn).subscribe().handle



  
  util.subscription("click").subscription("keypress")
  .subscribe(n1).sub(n2);
  */

// event.pointerType == mouse|pen|touch
// event.type == click
  function Calculator(e) {
    const input = e.target;
    if (input.value.trim().length > 0) {
      if (!vars.activeRow) {
        // Add a row for the first add
        const row = util.createRow("", "");
        const table = grab("table tbody");
        table.insertBefore(row, table.firstChild);
        vars.activeRow = grab.call(table, "tr");
      }

      const cell0 = grab("#cell0");
      const cell1 = grab("#cell1");
      // fill row text
      if (input.id === "item") {
        cell0.textContent = util.ucWord(input.value);
        return
      }
      cell1.textContent = input.value;
      return
    }
    // remove row if value is empty
    if (!vars.activeRow) {
      return
    }
    const cell0 = grab("#cell0");
    const cell1 = grab("#cell1");
    const amount = grab.call(vars.activeRow.parentNode, "#amount");
    const item = grab.call(vars.activeRow.parentNode, "#item");
    if (item.value.trim() || amount.value.trim()) {
      return
    }
    cell0.textContent = "";
    vars.activeRow.parentNode.removeChild(vars.activeRow);
    vars.activeRow = null;
  }
});