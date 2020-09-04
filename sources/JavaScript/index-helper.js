Techie(function($, body, head, d, _, w, Log, stringify, stringifyAll, a){
  


getcss("display")


$(w).resize( function(event){
  console.log(w.innerWidth)
});

function log_prop_value(event, prop) {
  x = $(event.target).getStyle(prop) | console.log(x);
  return x;
}

function getcss(css) {
  $(body).click(function(event) {
    a(w.innerWidth)
    Log(w.innerWidth)
    console.log($(event.target).getStyle(css))
  });
}


});