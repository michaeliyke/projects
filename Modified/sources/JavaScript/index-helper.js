Techie(function($, body, head, d, _, w, Log, stringify, stringifyAll, a){
  


// getcss("display")




function log_prop_value(event, prop) {
  x = $(event.target).getStyle(prop) | console.log(x);
  return x;
}

function getcss(css) {
  
  $(w).resize( function(event){
  console.log(w.innerWidth)
});

  $(body).click(function(event) {
    a(w.innerWidth)
    Log(w.innerWidth)
    console.log($(event.target).getStyle(css))
  });
}


});