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
    
    var context = null;

    $(body).click(Subscriptions).input(HandleTyping).keydown(HandlerKeyPress, $(sapi));

      function HandlerKeyPress(event, obj) {
      // obj - the target element say it's tabbing functionality targeted
      [HandleEnter, EscapeKeyHandler, MainEscapeKeyHandler].forEach(function(handler) {
        handler(event, obj);
      });

    }



    function Subscriptions(event, obj) {
      subscriptions = { //Subscription is purely by criterion -: id, class, name, data-set etc
        "default_handlers": [CloseHandler], //Default handlers will always execute
        "grouped_subscribers": [
        {"names": ["toggler", "equiv"], "handlers": [ActionsMenuToggle]},
        ],
        "subscribers": [
          {"name":"del", "handlers": [del]}, 
          {"name":"submit", "handlers": [Foo]}, 
          {"name": "projects-toggler", "handlers": [init]},
          {"name":"reset", "handlers": [Clean]}, 
          {"name":"converting", "handlers": [ConvertToPDF]},
          {"name":"open-off-canvass", "handlers": [mobile_menu_open]}
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

      filter = ActivationHandler;
      subscriptions.default_handlers.forEach(function(handler) {
        handler.call(obj, event, subscriptions.subscriber, obj);
      });
      // subscriptions.subscribers.forEach(filter);
      HandlerGroup(filter);
      HandleSingle(filter)
      function HandlerGroup(handler){
           subscriptions.grouped_subscribers.forEach(function handleSubscription(group) {
             group.names.forEach(function subscriber(subscriberString) {
                 handler(subscriberString, group); 
             });
           });
      }

      function HandleSingle(handler) {
        subscriptions.subscribers.forEach(function handleSubscription(subscriber) {
          handler(subscriber.name)
        });
      }

      function ActivationHandler(subscriberString, group){
        if (subscriptions.subscriber.classList.contains(subscriberString)) {
        if (Object.prototype.toString.call(group) == "[object Object]") {
          actions = group.handlers;
        } else {
            subscriptions.subscribers.forEach(function handleSubscription(subscriber) {
            if (subscriberString == subscriber.name) {
              actions = subscriber.handlers;
          }
        });
          }
          subscriptions.activate(event, subscriberString, actions);
        }
      }

    }

    function getByClass(name, index) {
     if (arguments.length > 1 && +index != index) {
         return console.error(`Ensure ${index} is an integer number.`);
     }
    return typeof index === "number" ? query(`.${name}`, index): query(name);
}
    function query(selector, index) {
     if (arguments.length > 1 && +index != index) {
         return console.error(`Ensure ${index} is an integer number.`);
     }
    list = [].slice.call(document.querySelectorAll(selector));
    return typeof index === "number" ? list[index]: list;
}

    var d = document, getId = this.Id, Total = 0, v1 = "Next item",v2 = '0.00',amount = getId("amount"),
    total = getId("total"), submit = getId("submit"), item = inputItem = getId("item"),
    reset = getId("reset"),  currentV = $("#current > #current"), currentItem =  $("#current > #currentItem"),
    manage = getId("managing"), printing = getId("printing"), saving = getId("saving"), _techie = this,
    table = getId("table");
    mobile_menu = getByClass("open-off-canvass");
    section = query("header section", 0);

mobile_menu_open.dumming = false;
function mobile_menu_open(){
  if (mobile_menu_open.dumming) {
    mobile_menu_open.dumming = false;
    section.style.width =  0;
    return 
  }
  mobile_menu_open.dumming = true;
  section.style.width =  "100%";
}

function mobile_menu_close(){
  section.style.width = 0;
}
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
    this.text("Total: 0", total);

      function HandleEnter(e){
         var evnt = e || global.event;
         if(evnt.keyCode == 13){
            Foo.call(null, null, item, amount);
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
        context = this;
        this.pane = this;
        width = this.computedStyle()["width"].replace(/[A-z]+/i, "");
        context.width = width;
        if (context.width == 0) {
          this.css({
            border: "0.01em solid",
            width: "250px", opacity: 1
          }); /*#equiv  &#9661;*/
          $("#equiv").html("&#120169;");
          context.width = 250;
        }else{
          closePane.call(this, event, ActionsMenuToggle, this);
        }
      });
      this.pane = pane;
    }
      // _techie.grab("body").addHandler("keypress", EscapeKeyHandler);

      function EscapeKeyHandler(event, obj){
      if(event.keyCode == 27){ //escape key
      if (context && context.width && context.width > 0) {
        closePane.call(context, event, EscapeKeyHandler, context);

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
        // case "nav":
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
          context.width = 0;
          this.pane = null;
          context = null;
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

       
        
        function toggleClass(object) { //toggle({"div": ["red", "blue"]})
            var selector;
            for( selector in object) {
                if(selector && object.hasOwnProperty(selector) && Array.isArray(object[selector])) {
                    var current = object[selector][0], replacement = object[selector][1];
                    if(typeof current !== "string" && typeof replacement !== "string") {
                        return
                    }
                    $(selector).toggleClass(current, replacement);
                }
            }
        }
        
        function init(){
                obj = {
                  "#menu-container": ["hide-view", "show-view"],
                    "#menus": ["hide-view", "show-view"],
                    "#body-cover": ["body-cover"],
                    ".wrapper": ["wrapper-show"],
                    "body": ["fix"]                    
                };
          new Promise(function foo(resolve, reject) {
            resolve(toggleClass(obj));
          }).then(function bar(obj) {
            setTimeout(function(){
              toggleClass({".menu": ["menu-tile"]});
            }, 500);
          }).catch((error) => console.log(error));
        }

          function MainEscapeKeyHandler(){
          if (document.body.classList.contains("fix")) {
            init();
          }
        }
});