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

Techie(function ($, body, head, sapi, _, global, Log, stringify, stringifyAll, a) {

  var context = null;

  // Abstract all event binding using delegation
  $(body).click(Subscriptions).input(HandleTyping).keydown(HandlerKeyPress, $(sapi));

  var d = document, getId = this.Id, Total = 0, v1 = "Next item", v2 = '0.00', amount = getId("amount"),
    total = getId("total"), submit = getId("submit"), input = inputItem = getId("item"),
    reset = getId("reset"), currentV = $("#current > #current"), currentItem = $("#current > #currentItem"),
    manage = getId("managing"), printing = getId("printing"), saving = getId("saving"), _techie = this,
    table = getId("table");
  mobile_menu = getByClass("open-off-canvass");
  section_lists = query("header section nav ul");

  // Get all data
  inputItem.focus();

  mobile_menu_open.dumming = false;
  function mobile_menu_open() {
    if (mobile_menu_open.dumming) {
      mobile_menu_open.dumming = false;
      section_lists[0].style.width = 0;
      section_lists[1].style.width = 0;
      return
    }
    mobile_menu_open.dumming = true;
    section_lists[0].style.width = "14em";// "50%";
    section_lists[1].style.width = "14em";// "50%";
  }

  function mobile_menu_close() {
    section.style.width = 0;
  }
  function del(e, btn) {
    if (a("Do you want to delete this row?")) {
      new Promise(function (resolve, reject) {
        row = $(btn.parentNode)
        value_cell = row[0].querySelector(".cell ~ .cell");
        num = "-" + value_cell.textContent.replace(/[^\d]+/g);
        updateUI(parseFloat(num, 10));
        row.hideFX();
        setTimeout(function () {
          row.remove()
        }, 1000);
        resolve(row);
      }).then(function (row) {
        console.log("Row deleted");
        return row
      }).catch(function (error) {
        console.error(error);
      });
    }
  }

  function updateCount(number) {
    $("#total").text(`Total: ${number}`)
  }

  function Clean() {
    //reset all fields here
    input.value = amount.value = "";
    input.placeholder = "New item";
    amount.placeholder = "New vlaue";
    input.focus(); Total = 0;
    total.textContent = "Total: 0";
    $("table tbody").empty();
    vars = {};
  }

  //Hooks an event on the document
  this.text("Total: 0", total);

  function HandleEnter(e) {
    var evnt = e || global.event;
    if (evnt.keyCode == 13) {
      Foo.call(null, null, input, amount);
    }
  }

  function HandleTyping(e) {
    var target = this.getTarget(e);
    if (target.id == "item") {
      currentItem.text(target.value);
    } else if (target.id == "amount") {
      currentV.text(target.value);
    }
  }

  function ActionsMenuToggle(event, dom, techie) {
    var width, pane;
    $("#manage").toggleClass(function () {
      pane = this;
      context = this;
      this.pane = this;
      width = this.computedStyle().width.replace(/[A-z]+/i, "");
      context.width = width;
      if (context.width == 0) {
        this.css({
          border: "0.01em solid",
          width: "250px", opacity: 1
        }); /*#equiv  &#9661;*/
        $("#equiv").html("&#120169;");
        context.width = 250;
      } else {
        closePane.call(this, event, ActionsMenuToggle, this);
      }
    });
    this.pane = pane;
  }

  

  function closePane(event, handler, pane) {
    this.pane.css({
      "width": "0px", opacity: 0
    });
    $("#equiv").html("&#9776;"/*"&#9776;"*/);
    width = 0;
    if (context) {
      context.width = 0;
    }
    this.pane = null;
    context = null;
  }

  function updateUI(num) {
    input.value = amount.value = "";
    input.placeholder = "New item";
    amount.placeholder = "New value";
    currentItem.text(v1); currentV.text(v2);
    input.focus();
    Total += num; //The elusive counter engine
    vars.activeRow = null;
    if (Total != +Total) {
      return //reset();
    }
    $("#total").text(`Total: ${Total}`);
  }
});