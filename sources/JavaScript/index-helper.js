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
    let route = x;
    const reg = /^[A-Z]\w+$/i;
    if (reg.test(x[0])) {
     route = x[0];
   } else if (reg.test(x[1])) {
     route = x[1];
   }
   return route;
  }

  function showRate(rating) {
    let text;
    switch (Number(rating)) {
      case 5:
        text = "Excellent!";
        break;
      case 4:
        text = "Very Good!";
        break
      case 3:
        text = "Good!";
        break
      case 2:
        text = "Poor!";
        break
      case 1:
        text = "Very poor!"
        break;
      default:
        text = "Rating";
    }
    $("#rate-text").text(text.toUpperCase());
  }
  
const route = getRoute();
  $("body").getByAttribute("route").each((element, index) => {
    console.log(element);
    if (element.getAttribute("route") == route) {
      element.classList.add("active");
      element.setAttribute("href", "JavaScript:void(0)");
    }
  });

  // log("here", route)
  
  $(".rating").click(function(event) {
    const target = this.getTarget(event);
    let rating = target.getAttribute("level");
    if (rating != +rating) {
      return
    }
    showRate(rating)
    const hidden = $("input[name='rating']");
    hidden[0].value = rating;
    $(".rates").each((element) => {
      element.classList.remove("rate")
    }).each((element) => {
      let r = element.getAttribute("level")
      if (r <= rating) {
        element.classList.add("rate")
      }
    })
  })
  
});