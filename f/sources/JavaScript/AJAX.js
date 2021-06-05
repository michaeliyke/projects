 function ajax(method, url, success, fail, data){
  var XHRequest = null;
  switch(true){
    case window.XMLHttpRequest != null: XHRequest = new XMLHttpRequest(); break;
    case window.ActiveXObject != null: try{
      XHRequest = new ActiveXObject("Msxml2.XMLHTTP");
    } catch(error_msg){
      try{
        XHRequest = new ActiveXObject("Microsoft.XMLHTTP");
      }catch(error_msg){
        throw new Error("AJAX is not supported in your browser. Please Use Mozilla or Chrome browser");
      }
    }
  }
  XHRequest.onreadystatechange = function(event){
    if (XHRequest.readyState === 4) {
        if (XHRequest.status >= 200 && XHRequest.status < 400) {
            (success || function(){}).call(XHRequest, XHRequest.responseText, XHRequest, event);
        }
    }
  }
  XHRequest.onerror = fail ?  fail.call(XHRequest, XHRequest): null;
  XHRequest.open(method, url);
  XHRequest.send();
 }


;(function($) { 
  $(document).ready(function(body, head, sapi, _, $, w){
   ajax("GET", "../JSON/names.json", function(text){
    log(text)
   });
  });

/*END*/
}(Techie));




