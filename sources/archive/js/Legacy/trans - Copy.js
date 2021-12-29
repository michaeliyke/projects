// I am going to use PT instead of Techie. PT is the newest version of the Techie API
Techie(document).ready(function(body, head, sapi, _, $, global){ 
    // Settings
    let d = document, getId = this.Id, Total = 0, 
    total = getId("total"), resultPane = getId("resultsPane"), submit = getId("submit"), item = inputItem = getId("item"),
    reset = getId("reset"), amount = getId("amount"), Results = getId("Results");


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
    });
item.focus();


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
            item.focus(); 
}


function Tens(num) {
    if (num < 10) { num = "00" + "" + num;
} else if (num < 100) {num = "0" + "" + num;
} return num;
}

function Table( bool, rows, cols){//Table will not append data to the dom, it will only create.
var number = number2 = 0, length = arguments.length, stack = [], table, args = arguments, tem = '<td id="celli"></td><td id="cellii"></td>',
table = $.createFrag('<table cellspacing="15" cellpadding="11" border="1"  id="table" width="100%"><tr id="row"></tr></table>');
$("#row", table).html(tem);
table.createCells = function(row, num_cells){
row = row.length ? row : [row]; var num = 0;
while(num < num_cells){
pt.createFrag("<td id=cell"+num+" border='1' ><td>", row); num++;
}
};

table.createRows = function( num_Rows, tble){
if (!arguments.length) { num_Rows = 1; tble = table;}
var num = 0; while(num < num_Rows){ var tr = sapi.createElement("tr"); tr.id = "row" + num; 
pt.css(tr, "border: 1px solid black; width: 100%;  background-color: #ccc;"); 
(tble || table).appendChild(tr);  num++;
}
};

if (!arguments.length) {//create an empty table with one row.
    table.firstChild.innerHTML = ""; return table;
}if (typeof arguments[0] === "boolean") {  table.firstChild.innerHTML = '';
    if (arguments.length > 3 || typeof rows !== "number" || typeof cols !== "number") { return;} 
while(number < rows){var row = document.createElement("tr");
while( number2 < cols){     var cell = document.createElement("td");
cell.textContent = Tens(number2); cell.colspan = 5;
pt.css(cell, {fontSize: "1em", color: "cyan", textAlign: "right", border: "1px double #777", backgroundColor: "#111"
}); cell.id = "cell" + Tens(number2);   row.appendChild(cell); number2++;
} row.id = "row" + Tens(number); pt.addChild(table.firstChild, row);  number++; number2 = 0;
}if (bool == true) {//prepend your stuff to body
pt.css(table, ["border-collapse: separate", "border: 4px solid #444", "background-color: black"]);
pt.prependChild(body, table); return table;
} else{//do not prepend to body, just return
return table;
}}while(number < length) { stack.push( '<td class=cell id='+ "cell" + number+'>'+args[number]+'</td>'); number++;
}
tabl = table.querySelectorAll("#row")[0];  pt(tabl).css({width: "100%", textAlign: "center"});
tabl.innerHTML = stack.join(' ');
return table;
}

function table (table){
table.id = "Razz"; table.className = "RASTERS";
table.createRows(15, table.firstChild);
return table;
}

pt("#resultsPane").prependChild(table(Table()));



function ucWord(str){
if (Object.prototype.toString.call( str ) !== "[object String]") {
    return null;
}
return str.charAt(0).toUpperCase().concat(str.substr(1, str.length - 1));
}
function ucWord(str){ // $("michal").ucWord(), $(["jamaica", "florida", toronto]).ucWord(); $.ucWord("iyke")
function is(s){return Object.prototype.toString.call( str ) == "[object String]"; }
!str ? (str = is(this) ? [this] : is(this[0]) ? this : [this] ) : (str = is(str) ? [str] : is(str[0]) ? str: [str]);
   var i = 0, string;
    for (; i < str.length; i++) {
         if (!is(str[i])) {continue;}
      string = str[i].charAt(0).toUpperCase().concat(str[i].substr(1, str[i].length - 1));
    } 
return string;
}


})