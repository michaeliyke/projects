Techie(function($, body, head, doc, _, w, Log, stringify, stringifyAll, a){
  


getcss("display")




function getcss(css) {
  $(body).click(function(event) {
    console.log($(event.target).getStyle(css))
  });
}


});