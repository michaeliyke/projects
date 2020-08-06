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

    $(body).click(Subscription);

    function Subscription(event, obj, filter) {

      subscriptions = { //Subscription is purely by criterion -: id, class, name, data-set etc
        "resultsPane": [a],
        "del": [del],
        "subscriber": event.target,
        "subscribers": ["resultsPane", "del"],
        "activate": function activator(event, subscriberString) {
          actions = this[subscriberString];
          actions.forEach(function actionsHandler(action) {
            action.call(obj, event, subscriptions.subscriber);
          })
        }
      };

      filter = filter || subscribeHandler
      subscriptions.subscribers.forEach(filter)

      function subscribeHandler(subscriberString){
        if (subscriptions.subscriber.classList.contains(subscriberString)) {
          actions = subscriptions[subscriberString]
          subscriptions.activate(event, subscriberString);
        }
      }

    }

    // {
    //   "click": ["#click"]
    // }


    // Settings

    // $(document).click(function(e) {
    //   a(this.computedStyle(this.getTarget(e))["font-size"]);
    // });
    var d = document, getId = this.Id, Total = 0,v1 = "Next item",v2 = '0.00',amount = getId("amount"), Results = getId("Results"),
    total = getId("total"), resultPane = getId("resultsPane"), submit = getId("submit"), item = inputItem = getId("item"),
    reset = getId("reset"),  currentV = $("#current > #current"), currentItem =  $("#current > #currentItem"),
    manage = getId("managing"), printing = getId("printing"), saving = getId("saving"), _techie = this,
     table = getId("table");

    // Initial calls 
    //////
    //  //
    //////
    ///
   // $("table").click(del)
function del(e, btn){
  if (a("Do you want to delete this row?")) {
    new Promise(function(resolve, reject) {
      row = $(btn.parentNode)
      value_cell = row[0].querySelector(".cell ~ .cell");
      // updateCount(value_cell.textContent.replace(/[^\d]+/g, ""))
      console.log(value_cell.textContent.replace(/[^\d]+/g, ""))
      row.hideFX();
       setTimeout(function(){
        // row.remove()
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

    
    //Hooks an event on the document
    this.text("Total: 0", total).addHandler(submit, "click", Foo.bind(null, null, item, amount)
      ).addHandler(reset, "click", function Clean(){ 
        //reset all fields here
        item.value = amount.value = "";
            item.placeholder = "New item";
            amount.placeholder = "New vlaue";
            item.focus(); Total = 0;
             total.textContent = "Total: 0";
            $("table tbody").empty(); 
    }
).keydown(function(e){
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
   $("#converting").click(function(){
    if (added()) {
      printsBlob();
    }
    });

item.focus();
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

  $("#toggler").click(function handler(event, dom, techie) {
    var pane, width, type;
      $("#manage").toggleClass(function(){
        pane = this;
        width = this.computedStyle()["width"].replace(/[A-z]+/i, "");
        if (width == 0) {
          this.css({
            border: "0.01em solid",
            width: "250px", opacity: 1
          }); /*#equiv  &#9661;*/
          $("#equiv").html("&#120169;");
          width = 250;
        }else{
          closePane.call(this, this, handler);
        }
      });
       function closePane(pane, handler){
          pane.css({
            "width": "0px", opacity: 0
          });
          $("#equiv").html("&#9776;"/*"&#9776;"*/);
          width = 0;
          
            if (type == "click") {
              $(body).removeHandler("click", handler);
            } else if (type == "keypress") {
              $(body).removeHandler("keypress", handler)
            }
            
        }
        


         $(body).addHandler("click", function handler(event){
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
        case "input": closePane(pane, handler);type = "click";break
        default: console.log(target.id);
      }
        
    });
      _techie.grab("body").addHandler("keypress", function handler(event){
      if(event.keyCode == 27){ //escape key
        type = "keypress";
      if (width > 0) {
        closePane(pane, handler); 

      }
    }
    });

    });

    
  function Foo(tem, item, amount){ 
      var test = /^((\w*|\W*)*[\w\s-]*)+$/.test(item.value);
    if (!(test && amount.value)) {
        return console.warn("Warning::   Make sure you are inputing the right values.")
    }
  function extractNumbers(value){
    return parseFloat( String(amount.value).replace(/[^\d]/g, ""), 10);
  }
Total += extractNumbers(amount.value); //The elusive counter engine 
 _techie.grab("table tbody").prependChild( createRow(item.value, amount.value) );
    total.textContent = "Total: " + Total; 
    item.value = amount.value = "";
    item.placeholder = "New item";
    amount.placeholder = "New value";
    currentItem.text(v1); currentV.text(v2);
    item.focus(); 
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