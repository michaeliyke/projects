// I am going to use PT instead of Techie. PT is the newest version of the Techie API
Techie(document).ready(function(body, head, sapi, $, _, global){ 
    // Settings
    let d = document, getId = this.Id, Total = 0,v1 = "Next item",v2 = '0.00',amount = getId("amount"), Results = getId("Results"),
    total = getId("total"), resultPane = getId("resultsPane"), submit = getId("submit"), item = inputItem = getId("item"),
    reset = getId("reset"),  currentV = $("#current > #current"), currentItem =  $("#current > #currentItem"),
    manage = getId("managing"), printing = getId("printing"), saving = getId("saving");


    // Initial calls 

    //Hooks an event on tne document
    this.text("Total: 0", total).addHandler(submit, "click", Foo.bind(null, null, item, amount)).addHandler(reset, "click", function Clean(){ 
        //reset all fields here
        item.value = amount.value = "";
            item.placeholder = "New item";
            amount.placeholder = "New vlaue";
            item.focus(); Total = 0;
             total.innerHTML = "Total: 0";
            $(".RASTERS").empty(); 
    }
).keydown(function(e){ 
         var evnt = e || global.event;
         if(evnt.keyCode == 13){
            Foo.call(null, null, item, amount);
         }
    }).oninput(function(e) {
      var target = this.getTarget(e);
      if (target.id == "item") {
        currentItem.text(target.value);
      } else if (target.id == "amount") {
        currentV.text(target.value);
      }
    }, body);
    // PDF plug
    $("#converting").click(function(){ alert()
     printsBlob(); 
    })

// item.focus();



  $("#toggler").click(function handler(event, dom, techie) {
    var pane, width, type;
      $("#manage").toggleClass(function(){
        pane = this;
        width = this.computedStyle()["width"].replace(/[A-z]+/i, "");
        if (width == 0) {
          this.css({
            width: "250px", opacity: 1
          });
          $("#equiv").html("X");
          width = 250;
        }else{
          closePane.call(this, this, handler);
        }
      });
       function closePane(pane, handler){
          pane.css({
            "width": "0px", opacity: 0
          });
          $("#equiv").html("&#9776;");
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
      $(body).addHandler("keypress", function handler(event){
      if(event.keyCode == 27){ //escape key
        type = "keypress";
      if (width > 0) {
        closePane(pane, handler); 

      }
    }
    });

    });

 //function initializations  
    function Foo(tem, item, amount){
    if (!(/^[\w]+$/.test(item.value) && /^[\d]+$/.test(amount.value))) {
        return console.warn("Warning::   Make sure you are inputing the right values.")
    }
Total += parseFloat( String(amount.value).match(/\d+/)[0], 10); //The elusive counter engine 
 pt(".RASTERS" ).prependChild( Table(item.value, amount.value) );
            total.innerHTML = "Total: " + Total; 
            item.value = amount.value = "";
            item.placeholder = "New item";
            amount.placeholder = "New vlaue";
            currentItem.text(v1); currentV.text(v2);
            item.focus(); 
}


function Tens(num) {
    if (num < 10) { num = "00" + "" + num;
} else if (num < 100) {num = "0" + "" + num;
} return num;
}

function Table( bool, rows, cols){//Table will not append data to the dom, it will only create.
var number = number2 = 0, length = arguments.length, stack = [], table, args = arguments, tem = '<td id="celli"></td><td id="cellii"></td>',
table = $.createFrag('<table cellspacing="15" cellpadding="11" border="1"  id="table" width="100%"><tr id="row"></tr></table>'),
row = tr = sapi.createElement("tr"), cell = document.createElement("td"); 
$("#row", table).html(tem);
table.createCells = function(row, num_cells){
row = row.length ? row : [row]; var num = 0;
while(num < num_cells){
pt.createFrag("<td id=cell"+num+" border='1' ><td>", row); num++;
}
};

table.createRows = function createRows( num_Rows, tble){
var num = 0; num_Rows = num_Rows || 1;  tble = tble || table;
 while(num < num_Rows){ 
     tr.id = "row" + num; pt.css(tr, "border: 1px solid black; width: 100%;  background-color: #ccc;"); 
     tble.appendChild(tr);  num++;
}
};

if (!bool) { return table; }//create an empty table/* with one row*/.
if (bool == true || bool == false) {  //boolean
while( number < rows ){ 
while( number2 < cols){
cell.textContent = Tens(number2); cell.colspan = 5; cell.id = "cell" + Tens(number2); 
pt.css(cell, {fontSize: "1em", color: "cyan", textAlign: "right", border: "1px double #777", backgroundColor: "#111"
});   row.appendChild(cell); number2++;
}
 row.id = "row" + Tens(number); pt.addChild(table, row);  number++; number2 = 0;
}
if (bool == true) {//prepend your stuff to body
pt.css(table, ["border-collapse: separate", "border: 4px solid #444", "background-color: black"]);
pt.prependChild(body, table); 
return table;
} else{//do not prepend to body, just return
return table;
}}

while(number < length) { stack.push( '<td class=cell id='+ "cell" + number+'>'+args[number]+'</td>'); number++;
}
tabl = table.querySelectorAll("#row")[0];  pt(tabl).css({width: "100%", textAlign: "center"});
tabl.innerHTML = stack.join(' ');
return table;
}

function table (table){
table.id = "Razz"; table.className = "RASTERS";
table.createRows(15, table);
return table;
}


pt("#resultsPane").prependChild( table(Table()) );



function ucWord(str){
if (Object.prototype.toString.call( str ) !== "[object String]") {
    return null;
}
return str.charAt(0).toUpperCase().concat(str.substr(1, str.length - 1));
}


function printsBlob() {
        var pdf = new jsPDF('p', 'pt', 'letter');
        source =  $('#resultsPane').html();
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