window.onload = init;
function init() {
   // var givenName = document.getElementById("givenName");
    /*
    givenName.addEventListener('input', (evt)=>{
        var firstName = document.getElementById("firstName");
        firstName.innerHTML += ("%s",givenName.value);
    })
*/





/*


            anST12@$

*/






window.checkPassword = checkPassword;
var doc = document,
 messageBody = getId('message-body'),
 finalMessage = getId("final-message"),
message1 = "Weak strength password",
message2 = "Medium strength password"
message3 = "strong password"
message4 = "Very Strong password";

 function getClass(name, index) {
     if (arguments.length > 1 && +index != index) {
         return console.error(`Ensure ${index} is an integer number.`);
     }
    list = [].slice.call(document.querySelectorAll(`.${name}`));
    return typeof index === "number" ? list[index]: list;
}

function getId(name) {
    return doc.getElementById(name);
}
 function populate() {
    var divs = [], div = doc.createElement("div");
while(true){
    if (divs.length == 4) break;
    div.className = "message";
    divs.push(div.outerHTML);
}
return divs.join("");
}

function log(msg){ 
    if (typeof msg === "boolean") { 
        var message = getClass('message');
       if (!(message && message[0])) { 
        messageBody.innerHTML  = populate();
        finalMessage.innerHTML ="";
       }
   } else {
    finalMessage.innerHTML = "";
    return  messageBody.innerHTML = msg;
   }
}
function checkPassword(event) {
    event.preventDefault();
    var password = getId("password");
    var passwordLength = password.value.length;
    if (passwordLength < 2) {
        return log( `<h2 id='min-error'>Passwords is too short, enter minimum of 6 characters</h2>`);
    } else if (passwordLength > 10) {
        return log(`<h2 id='min-error'>Password must be between 6 and 12 characters</h2>`);
    }

    var strength =  getId("meter");
    var lowerString = 0
    var upperString = 0
    var num = 0
    var specialChar = 0
    log(false);
    if (/[a-z]/.test(password.value)) { 
        lowerString = 1;
       getClass('message')[0].innerHTML = "<span class='passed'>Lower Case Alphabet passed</span>";
    }
    else{ 
        getClass('message')[0].innerHTML = "<span class='err'>password do not contain at least 1 Lower Case Alphabet</span>";

    }
    if (/[A-Z]/.test(password.value)) {
        upperString = 1;
       getClass('message')[1].innerHTML = "<span class='passed'>Upper Case Alphabet passed</span>";
    }
    else{ 
       getClass('message')[1].innerHTML = "<span class='err'>password do not contain at least 1 Upper Case Alphabet</span>";

    }

    if (/[0-9]/.test(password.value)) { 
        num = 1; 
        getClass('message')[2].innerHTML = "<span class='passed'>Password contains at least 1 number</span>"
    }
    else{ 
        getClass('message')[2].innerHTML = "<span class='err'>password do not contain at least 1 number<span>";

    }

    if (/[$@#&!]/.test(password.value)) { 
        specialChar = 1;
        getClass('message')[3].innerHTML = "<span class='passed'>Password contains at least 1 special character</span>";
    }
    else{
        getClass('message')[3].innerHTML = "<span class='err'>password do not contain at least 1 special character</span>";

    }
    var strengthValue = lowerString + upperString + num + specialChar;
     strength.value = (lowerString + upperString + num + specialChar) * 25;
    var passwordRate = `<h2>${strength.value}%</h2>`;
    var finalWord = "";
    getId('percent').innerHTML = passwordRate;
    switch(strengthValue){
        case 4: finalWord = message4; break;
        case 3: finalWord = message3; break;
        case 2: finalWord = message2; break;
        case 1: finalWord = message1; break;
        default: finalWord = "Please input your password";
    }
    finalMessage.innerText = finalWord;
    
}

};