Techie(function($, body, head, doc, _, w, Log, stringify, stringifyAll, a){
  


getcss("display")


$(w).resize(function(event){
  log_prop_value(event, "width");
});

function log_prop_value(event, prop) {
  x = $(event.target).getStyle(prop) | console.log(x);
  return x;
}

function getcss(css) {
  $(body).click(function(event) {
    console.log($(event.target).getStyle(css))
  });
}


});