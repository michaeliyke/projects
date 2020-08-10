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

Techie(function($, body, head, sapi, _, global, Log,stringify, stringifyAll, a){

    $(body).click(Subscriptions); 

    function Subscriptions(event, obj, filter) {

      subscriptions = { //Subscription is purely by criterion -: id, class, name, data-set etc
        
        "resultsPane": [a],
        "del": [del],
        "submit": [Foo],
        "reset": [Clean], // subscriber: handlers
        "converting": [ConvertToPDF],
        "grouped_subscribers": [{"names": ["toggler", "equiv"], "handlers": [ActionsMenuToggle]}],
        "default_handlers": [CloseHandler], //Default handlers will always execute
        "subscribers": ["resultsPane", "del", "submit", "reset", "converting"],
        "subscriberss": [
          {"name":"del", "handlers": [del]}, {"name":"submit", "handlers": [Foo]}, 
          {"name":"reset", "handlers": [Clean]}, {"name":"converting", "handlers": [ConvertToPDF]}
        ],
        //subscribers -> classes or ids subscribing to the click (event) bubble
        "subscriber": event.target,
        "activate": function activator(event, subscriberString, actions) {
          if (actions.length < 1) {
            console.warn("You have not specified any actions for subscriber:", subscriberString);
          }
          actions.forEach(function launch(action) {
            action.call(obj, event, subscriptions.subscriber, obj);
          });
        }
      };

      filter = filter || ActivationHandler
      subscriptions.default_handlers.forEach(function(handle) {
        handle.call(obj, event, subscriptions.subscriber, obj);
      });
      subscriptions.subscribers.forEach(filter);
      HandlerGroup();
      
      function HandlerGroup(){
           subscriptions.grouped_subscribers.forEach(function handleSubscription(group) {
             group.names.forEach(function subscriber(subscriberString,) {
                 filter(subscriberString, group);           
             });
           });
      }

      function ActivationHandler(subscriberString, group){
        if (subscriptions.subscriber.classList.contains(subscriberString)) {
        if (Object.prototype.toString.call(group) == "[object Object]") {
          actions = group.handlers;
        } else {
            actions = subscriptions[subscriberString];
            subscriptions.subscriberss.forEach(function handleSubscription(subscriber) {
            if (subscriberString == subscriber.name) {
              actions = subscriber.handlers;
            return
          }
        });
          }
          subscriptions.activate(event, subscriberString, actions);
        }
      }

    }


    var d = document, getId = this.Id, Total = 0,v1 = "Next item",v2 = '0.00',amount = getId("amount"),
    total = getId("total"), submit = getId("submit"), item = inputItem = getId("item"),
    reset = getId("reset"),  currentV = $("#current > #current"), currentItem =  $("#current > #currentItem"),
    manage = getId("managing"), printing = getId("printing"), saving = getId("saving"), _techie = this,
    table = getId("table");


function del(e, btn){
  if (a("Do you want to delete this row?")) {
    new Promise(function(resolve, reject) {
      row = $(btn.parentNode)
      value_cell = row[0].querySelector(".cell ~ .cell");
      num = "-" + value_cell.textContent.replace(/[^\d]+/g) ;
      updateUI(parseFloat(num, 10));
      row.hideFX();
       setTimeout(function(){
        row.remove()
      }, 1000);
      resolve(row);
    }).then(function(row) {
    console.log("Row deleted");
    return row
    }).catch(function(error){
      console.error(error);
    });
  } 
    }

    function updateCount(number) {
      $("#total").text(`Total: ${number}`)
    }

    function Clean(){ 
        //reset all fields here
        item.value = amount.value = "";
            item.placeholder = "New item";
            amount.placeholder = "New vlaue";
            item.focus(); Total = 0;
             total.textContent = "Total: 0";
            $("table tbody").empty(); 
    }

    
    //Hooks an event on the document
    this.text("Total: 0", total).keydown(function(e){
         var evnt = e || global.event;
         if(evnt.keyCode == 13){
            Foo.call(null, null, item, amount);
         }
    }, document).oninput(function(e) {
      var target = this.getTarget(e);
      if (target.id == "item") {
        currentItem.text(target.value);
      } else if (target.id == "amount") {
        currentV.text(target.value);
      }
    }, body);
    // PDF plug
    function ConvertToPDF(){
    if (added()) {
      printsBlob();
    }
    }

// item.focus();
/*#2876a8*/
function added() {
    var ret = false;
          $("td").once(function(){ 
           if (this.text()) {
            ret = true;
           }
          })
          return ret;
        }


  function ActionsMenuToggle(event, dom, techie) {
    var width, pane;
      $("#manage").toggleClass(function(){
        pane = this;
        this.pane = this;
        width = this.computedStyle()["width"].replace(/[A-z]+/i, "");
        if (width == 0) {
          this.css({
            border: "0.01em solid",
            width: "250px", opacity: 1
          }); /*#equiv  &#9661;*/
          $("#equiv").html("&#120169;");
          width = 250;
        }else{
          closePane.call(this, event, ActionsMenuToggle, this);
        }
      });
      this.pane = pane;
    }
      _techie.grab("body").addHandler("keypress", EscapeKeyHandler);

      function EscapeKeyHandler(event){
      if(event.keyCode == 27){ //escape key
        this.type_ = "keypress";
      if (width > 0) {
        closePane(event, EscapeKeyHandler); 

      }
    }
    }



     function CloseHandler(event, dom, techie){
      var target = this.getTarget(event);
      if ((target.id == "equiv" || target.id == "manage") || (target.id == "equiv" || target.parentNode.id == "manage")) {
        return false;
      }
      switch(target.id){
        case "main":
        case "nav":
        case "header":
        case "project":
        case "project-body":
        case "trigger":
        case "inputs":
        case "input": 
        if (this.pane) {
          closePane.call(this, event, CloseHandler, this);
          this.type_ = "click";
        }
        break
        default: 
        // console.info("Delegation no match! id -", target.id);
      }
    }

    function closePane(event, handler, pane){
          this.pane.css({
            "width": "0px", opacity: 0
          });
          $("#equiv").html("&#9776;"/*"&#9776;"*/);
          width = 0;         
            if (this.type_ == "click") {
              $(body).removeHandler("click", handler);
            } else if (this.type_ == "keypress") {
              
              $(body).removeHandler("keypress", handler);
            }
          this.pane = null;
        }
    
  function Foo(){
    if (!validate(item, amount)) {
      return;
    }

   _techie.grab("table tbody").prependChild( createRow(item.value, amount.value) );
    updateUI( extractNumbers(amount.value) );
  }

  function updateUI(num){
    item.value = amount.value = "";
    item.placeholder = "New item";
    amount.placeholder = "New value";
    currentItem.text(v1); currentV.text(v2);
    item.focus(); 
    Total += num; //The elusive counter engine
    if(Total != +Total) {
      return //reset();
    }
    $("#total").text(`Total: ${Total}`);
}


function validate(item, amount) {
  var test = /^((\w*|\W*)*[\w\s-]*)+$/.test(item.value);
  if (!(test && amount.value)) {
    console.warn("Warning::   Make sure you are inputing the right values.");
    return false; 
  }
  return true
}

function extractNumbers(string){
    return parseFloat( String(string).replace(/[^\d]/g, ""), 10);
  }


function createRow( item, value){
var number =  -1, length = arguments.length, stack = [], args = arguments, txt,
row =  sapi.createElement("tr"), cell = sapi.createElement("td"); 
while(++number < 2) { 
    txt = " <td class='cell' id='cell" + number + "'> </td> <span class='del del" + number +
     "' title='Delete this row'>x</span>"
    stack.push( txt );
}
// a(stack)
row.innerHTML = stack.join(' ');
row.querySelector("#cell0").textContent = ucWord(item);
row.querySelector("#cell1").textContent = value;
return row;
}

function ucWord(str){
if (Object.prototype.toString.call( str ) !== "[object String]") {
    return null;
}
return str.charAt(0).toUpperCase().concat(str.substr(1, str.length - 1).toLowerCase());
}


function printsBlob() {
        var pdf = new jsPDF('p', 'pt', 'letter');
        source =  $('.resultsPane').html();
        specialElementHandlers = {
            '#bypassme': function (element, renderer) {
                return true
            }
        };
        margins = { top: 80, bottom: 60,left: 40,width: 522 };
        var Obj = { 'width': margins.width,'elementHandlers': specialElementHandlers};
        pdf.fromHTML( source, margins.left, margins.top, Obj, function (dispose) {
              var d = new Date(), t = d.getTime();
          pdf.save(   ( d + "" + t ).replace(/[A-z\s\W]/gi, "") + '.pdf'    );
            }, margins );
    }

});