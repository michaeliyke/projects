   var ajaxRequest; 


/*function Type(args, obj){//if(!(Type("string", "number", "object").In())){return;}
   var args = explolde(arguments), object, bool = false, strings = [], that = this;
   args.forEach(function(arg){
      if (typeof arg !== "string") {
         strings.push(arg);
       return;
    }
      object = arg;
   });
Techie.error( "type", "string", !strings.length );
return {
   In: function(obj){
      strings.forEach(function(string){
         forEach(function(prop){
            if (typeof prop === string) {
               bool = true;
            }
         }, obj || this, this);
      }, this)
   }.bind(that);
};
}*/

function parseJSON( object ) {
   if (typeof(JSON) !== "undfined" && JSON.parse) {
      object = JSON.parse(object);
   } else{
      object = eval(object);
   }
   return object;
}

function JSON(data){

}

function som(r){
  return !!r ? r: showE("This is not good");
}

function showE(t){
  eval("throw new Error(t)");
}
// som();

   /*$.ajax({
      url: '',
      type: 'post',
      data: {},
      success: function (data) {
         data
      }
   });
*/


   function ajaxHook( success, form, method,failure ){
   // Techie.error("ajaxHook", "html", isHTML(frm) || isNodeList(frm));
   /*
Hook the remaining ones together. 
serialize the form, and open a get/post as the case may be. Post is slightly different
find out the difference. Later, write for get and post separetely for easy access.
   */
Techie.error("ajaxHook", "string", !method || typeof method === "string");
        var ajaxRequest;
      try {// Opera 8.0+, Firefox, Safari
      ajaxRequest = new XMLHttpRequest();
   } catch (e) {// Internet Explorer Browsers
      try {ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");} catch (e) {
         try {ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e) {return false;}
   }} 
   if(success && success.call && Object.prototype.toString.call(success) != "[Object RegExp]"){
     var text = ajaxRequest.responseText, xml = ajaxRequest.responseXML,
     response = text && text.length ? text: (xml && xml.length ? xml: false);
      ajaxRequest.onreadystatechange = function(event){ 
         if(ajaxRequest.readyState == 4){
            success.call(ajaxRequest, response, ajaxRequest, event);
         }
      }
      
   }
   return ajaxRequest;
   }



ajaxRequest = ajaxHook(handler);
function handler(a,b,c,e) {
         var ajaxDisplay = document.getElementById('ajaxDiv');
         ajaxDisplay.innerHTML = ajaxRequest.responseText;
   }


   function ajax (){
      var f = $("#fm").serialize(), url = "ajax.php?action=result&" + f;
      Log(f, false)
   ajaxRequest.open("GET", url, true);
   ajaxRequest.send(null); 

   }

var serialize;

   // Techie(ajax);


   function foo(body, head, doc, $, _, w){
      var l = $("#fm");

      Log(l.serialize(l[0]), false)
   }


$(ajax);


$('#register_form').submit(function(e) {

var postData = $(this).serializeArray();
var formURL = $(this).attr("action");

/* start ajax submission process */
$.ajax({
    url: formURL,
    type: "POST",
    data: postData,
    success: function(data, textStatus, jqXHR) {
        alert('Success!');
    },
    error: function(jqXHR, textStatus, errorThrown) {
        alert('Error occurred!');
    }

});

e.preventDefault(); //STOP default action

/* ends ajax submission process */

});


/*
var url = "get_data.php";
var params = "lorem=ipsum&name=binny";
http.open("GET", url+"?"+params, true);
http.onreadystatechange = function() {//Call a function when the state changes.
   if(http.readyState == 4 && http.status == 200) {
      alert(http.responseText);
   }
}
*/

/*
var url = "get_data.php";
var params = "lorem=ipsum&name=binny";
http.open("POST", url, true);
*/
//Send the proper header information along with the request
/*http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
http.setRequestHeader("Content-length", params.length);
http.setRequestHeader("Connection", "close");

http.onreadystatechange = function() {//Call a function when the state changes.
   if(http.readyState == 4 && http.status == 200) {
      alert(http.responseText);
   }
}
http.send(params);*/
/*function GET(filePath, formOrData, action){//GET("action.php", $("form"), foo);

var ajax = ajaxHook(action, formOrData);
ajax.open("GET", filePath, )
}

*/

/*

*/
// aram data
 // * @param callback (Callback function to handle response state)
 // * @returns {boolean}
 // */
function makeAjaxRequest(url, method, data, callback) {
    var httpRequest;
    if (window.XMLHttpRequest) { // Mozilla, Safari, ...
        httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE
        try {
            httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e) {
            try {
                httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e) {
            }
        }
    }

    if (!httpRequest) {
        console.log('Giving up :( Cannot create an XMLHTTP instance');
        return false;
    }
    httpRequest.onreadystatechange = (function () {
        return callback(httpRequest);
    });
    if (method && method.toUpperCase() == 'POST') {
        httpRequest.open(method, url, true);
        httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        httpRequest.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        httpRequest.send(data);
    } else {
        httpRequest.open(method, url);
        httpRequest.send();
    }
}



// UPDATED CODE FOR FORM SUBMISSION **

function callbackHandler(httpRequest) {
    // response has been received so handle it now
    if (httpRequest.readyState === 4) {
        //In case status is 200 is what you are looking for implementation
        // of this will change accordingly
        if (httpRequest.status >= 200 && httpRequest.status < 400) {
            alert("Posted form successfully");
            var resp = httpRequest.responseText;
            console.log(httpRequest.responseText);
        }
    }
}


(function(){
    document.addEventListener('DOMContentLoaded',function(){
        var form = document.querySelector('form');
        form.addEventListener('submit',function(e){
            e.preventDefault();
            var login = document.getElementById("login").value;
            var nom = document.getElementById("nom").value;
            if(login==='' || nom === '') {
                alert('Les champs doivent êtres remplis');
            } else {
                var form = document.querySelector('form');
                var data = new FormData(form);
                var action = form.getAttribute("action");
                var method = form.getAttribute("method");
                makeAjaxRequest(action,method,data,handler);
            }
        });

    });
})();





