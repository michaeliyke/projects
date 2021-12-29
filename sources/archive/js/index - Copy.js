Techie(init);
function init (body, head, doc, $, _, w) {
var Total = 0,
    total = sapi.id("total"),       resultsPane = sapi.id("resultsPane"),
    submit = sapi.id("submit"),     item = sapi.id("item"), 
    reset = sapi.id("reset"),       amount = sapi.id("amount"), 
    Results = sapi.id("Results");   total.innerHTML = "Total: " + Total;
    item.focus();     
            // Event CALLS
            this.addHandler(submit, "click", Foo);
            this.addHandler(document, "keydown", keypress);
            this.addHandler(reset, "click", Clean);
            this.addHandler(window, "beforeunload", function(){
                console.log("Reloaded Right!");
            });

            !function(checkFirstVisit){
                if (document.cookie.indexOf("mycookie") == -1) {
                    //cookie doesn't exist, create it
                    document.cookie = "mycookie = 1";
                }
                    else{
                        //not first visit, so fire your weapon.
                        alert("You just refreshed. Why?");
                    }
                
            }();



            !function today(){
 var getNow = new Date(), dateSpan = document.createElement("small"),
footer = document.getElementById("footer"); dateSpan.class = "dateclass";
dateSpan.id = "dateid";footer.insertBefore(dateSpan, footer[1]);
dateSpan.innerHTML = getNow; dateSpan.style.cssText = 
"color:#5d66cc; font-style:oblique; text-align:center;font-style: Impact;";
}();

function keypress(evt) {    
        evt = evt || window.event;
        switch (evt.keyCode) {
                case 13:Foo();
                //leftArrowPressed(nextUrl);
                break;
                case 96: //esc .. .NOT WORKING YET
                Clean();
                break;
                 case 32: //space bar
                //rightArrowPressed(prevUrl);
                break;
                //rightArrowPressed(prevUrl);
                break;
                case 8: //backspace
                //downArrowPressed(prevUrl);
                break;

        }
    }
      

            //function initializations
     function Clean(){ 
            //reset all fields here
          var clear = (function(){
                Total = 0;
            total.innerHTML = "Total: " + Total;
           return pt(".RASTERS").empty(); 
            });

            return [clear(), Clear()];
        }


        function Clear(){
                item.value = " ";
                item.placeholder = "New item";
                amount.value = " ";
                amount.placeholder = "New vlaue";
                item.focus();
        }
        
        function Foo(){
if (/\w+/.test(amount.value) && /\w+/.test(item.value)) {
    var match =  String(amount.value).match(/^(['"]?\d+["']?)$/);
    if (match && match[0]) {
    Total += parseFloat( String(amount.value).match(/\d+/)[0], 10); //The elusive counter engine 

     pt(".RASTERS" ).prependChild( Table(item.value, amount.value) );
     var children  = pt(".RASTERS").Children();
                total.innerHTML = "Total: " + Total; 
                var reset = Clear();    
                if (children.length < 5) {  
                    emptyTable.createRows(5, table.firstChild);
                }
    }
    
        }else{  console.log("Please supply the values.");}

        }


function Tens(num) {
        if (num < 10) { num = "00" + "" + num;
    } else if (num < 100) {num = "0" + "" + num;
} return num;
    }

function Table( bool, rows, cols){//Table will not append data to the dom, it will only create.
var number = 0, length = arguments.length, stack = [], 
blob = '<table cellspacing="15" cellpadding="11" border="1"  id="table" width="100%"><tr id="row"></tr></table>', 
tem = '<td id="celli"></td><td id="cellii"></td>', temp = document.createElement("div"); temp.innerHTML = blob;
emptyTable = temp.firstChild; temp.firstChild.querySelectorAll("#row")[0].innerHTML = tem;var args = arguments;
var number2 = 0, table = emptyTable;  
emptyTable.createCells = function(row, num_cells){
    row = row.length ? row : [row]; var num = 0;
while(num < num_cells){
    pt.createFrag("<td id=cell"+num+" border='1' ><td>", row); num++;
}
};
emptyTable.createRows = function( num_Rows, table){
    if (!arguments.length) { num_Rows = 1; table = emptyTable;}
    var num = 0; while(num < num_Rows){ var tr = sapi.createElement("tr"); tr.id = "row" + num; 
 pt.css(tr, "border: 1px solid black; width: 100%;  background-color: #ccc;"); 
 (table || emptyTable).appendChild(tr);  num++;
    }
};
emptyTable.createTable = function(numb, parent){
    var num = 0, table; numb = numb || 1;
    while (num < numb){
        table  = pt.createFrag("<table  border='1' id=table"+num+"></table>", parent || null); num ++;
    }return table;
};

emptyTable.writeToCell = function(txt, cells){
cells = cells ? (cells.length ? cells : [cells]) : emptyTable.querySelectorAll("td");
pt.each(function(index, cell){
cell.textContent = txt;
}, cells); return cell;
};

if (!arguments.length) {//create an empty table with one row.
  emptyTable.firstChild.innerHTML = ""; return emptyTable;
}if (typeof arguments[0] === "boolean") {  table.firstChild.innerHTML = '';
        if (arguments.length > 3 || typeof rows !== "number" || typeof cols !== "number") { return;} 
while(number < rows){var row = document.createElement("tr");
while( number2 < cols){     var cell = document.createElement("td");
cell.textContent = Tens(number2); cell.colspan = 5;
pt.css(cell, {fontSize: "1em", color: "cyan", textAlign: "right", border: "1px double #777", backgroundColor: "#111"
}); cell.id = "cell" + Tens(number2);   row.appendChild(cell); number2++;
} row.id = "row" + Tens(number); pt.element.addChild(table.firstChild, row);  number++; number2 = 0;
}if (bool == true) {//prepend your stuff to body
pt.css(table, ["border-collapse: separate", "border: 4px solid #444", "background-color: black"]);
pt.element.prependChild(body, table); return table;
} else{//do not prepend to body, just return
return table;
}}while(number < length) { stack.push( '<td class=cell id='+ "cell" + number+'>'+args[number]+'</td>'); number++;
}temp = temp.querySelectorAll("#row")[0];  pt(temp).css({width: "100%", textAlign: "center"});
temp.innerHTML = stack.join(' ');
return temp;
}

function table (table){
table.id = "Razz"; table.className = "RASTERS";
table.createRows(15, table.firstChild);
return table;
}
Techie.element.prependChild(sapi.id("resultsPane"), table(Table()));

  

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



}