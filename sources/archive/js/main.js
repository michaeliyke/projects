$(document).ready(function(){
$("e_error").hide();
// Email part
    function verify_email(u_email){
        $.ajax({
            url: "../PHP/action.php",
            action: "verify_email",
            method: "POST",
            data: {check_email: 1, u_email: u_email},
            success: function (data){
                $(".e_error").show();
                $(".e_error").html(data);
            }
        })
    }
    // email part
    $("#u_email").focusout(function(){
        var email = $("#u_email").val();
        verify_email(email);
    });
    // Error logger part
var o = document.createElement("h2"); 
$("form")[0].appendChild(o);  o.className = "error";


// Signup part
    $("#register_form").submit(function(){
        $.ajax({
            url: "../PHP/action.php",
            method: "POST",
            data: $("#register_form").serialize()+"&Reg_form=true",
            success: function(data){
               o.innerHTML = data;
               if(data = "Email sent successfully"){
                window.location.hfref = "verify_email.php?email="+$("#u_email").val();
               }
            }
        });
    });

    // Login part

    $("#log_form").on("submit", function(a){
        var email = $("#log_email").val();
        var password = $("#log_passowrd").val();
        $.ajax({
            url: "../PHP/action.php",
            method: "POST",
            data: $("#log_form").serialize()+"&form=log_form&page=login&log_form=&login=form",
            success: function(data){
                var datum = data.toLowerCase().trim();
                (datum.match(/email/) || datum == "ok")? $(".e_err").html(data): o.innerHTML = data;
                var wildMatch = datum.match(/not/) || datum.match(/un/), m = datum.match(/success/);
                if (m && !wildMatch) { 
                    window.location.href = "../profile/";
                } 
            }
        })
    });
});