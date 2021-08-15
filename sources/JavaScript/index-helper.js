/* jshint -W107 */
Techie(function ($, body, head, d, _, w, Log, stringify, stringifyAll, a) {
const log = console.log;


  // getcss("display")




  function log_prop_value(event, prop) {
    x = $(event.target).getStyle(prop) | console.log(x);
    return x;
  }

  function getcss(css) {

    $(w).resize(function (event) {
      console.log(w.innerWidth);
    });

    $(body).click(function (event) {
      a(w.innerWidth);
      Log(w.innerWidth);
      console.log($(event.target).getStyle(css));
    });
  }
  function getRoute() {
    const l = window.location.href;
    const x = l.split("/").reverse();
    let route = "";
   if (x[0]) {
     route = x[0];
   } else if (x[1]) {
     route = x[1];
   }
   return route;
  }
const route = getRoute();
  $("#main").Attribute("route", body).each((element, index) => {
    if (element.getAttribute("route") == route) {
      element.classList.add("current-page");
      element.setAttribute("href", "JavaScript:void(0)");
      return {};
    }
  });
});