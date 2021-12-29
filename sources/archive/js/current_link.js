  /*
  Use this plugin to add style to to the current page's link.
  what to do: make a style rule for .current in your css
  That's all!

   */
  (function(w){

    var timer = setTimeout(function(){
      clearTimeout(timer);
      var href = location.pathname.substr(location.pathname.lastIndexOf("/")+1), i = 0;
      var links = document.querySelectorAll("a");
      var found = false;
      function addCurrent(link){found = true; link.classList.add("current");} /*Add .current class to current page link*/
      Array.prototype.forEach.call(links, function(link){
        if (href) {
          if (link.href.indexOf(href) > -1) {addCurrent(link);}
        }
        if (found) {return;}
        switch(true){
          case (new RegExp("index.htm", "i")).test(link.href): addCurrent(link); break
          case (new RegExp("default.htm", "i")).test(link.href): addCurrent(link); break
          case (new RegExp("index.php", "i")).test(link.href): addCurrent(link); break
          case (new RegExp("default.php", "i")).test(link.href): addCurrent(link); break
        }
      });

    }, 1000);

  }(this));