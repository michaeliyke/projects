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
            



            !function today(){
 var getNow = new Date(), dateSpan = document.createElement("small"),
footer = document.getElementById("footer"); dateSpan.class = "dateclass";
dateSpan.id = "dateid";footer.insertBefore(dateSpan, footer[1]);
dateSpan.innerHTML = getNow; dateSpan.style.cssText = 
"color:#5d66cc; font-style:oblique; text-align:center;font-style: Impact;";
}();





}