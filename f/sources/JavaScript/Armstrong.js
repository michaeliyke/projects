(function(doc){
  if (!(doc && doc.nodeType == 9)) {
    throw new Error("The Document object is required to load this window");
  }
  var getById = doc.getElementById.bind(doc),
   toggler = getById("toggled"),
  display_area = getById("display"),
  input_box = getById("enter"),
  checkValidity = () => {
    if (String(input_box.value).length == 3) {
     if (toggler.classList.contains("disabled")) {
        toggler.classList.remove("disabled");
      }
        if (toggler.classList.contains("enabled") == false) {
          toggler.classList.add("enabled");
        }
    } else {
    if (toggler.classList.contains("enabled")) {
        toggler.classList.remove("enabled");
      }
      if (toggler.classList.contains("disabled") == false) { 
        toggler.classList.add("disabled");
      }
    }

  },
  add_array = (numbers) =>{
    let total = 0;
    for(let number of numbers){
      total = total + number;
    }
    return total;
  },
  dispatch = function eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var obj = document.createEvent('MouseEvents');
    obj.initEvent(etype, true, false);
    if (!el.dispatchEvent(obj)) {
      // A handler called preventDefault.
      console.log("automatic click canceled");
    } else {
      // None of the handlers called preventDefault.
    } 
  }
},
  isArmstrong = (number) =>{
    if (number == +number && String(number).split("").length === 3) {
      let array = new Array(), total;
    for(let item of String(number).split("")){
      array.push(cube(item));
    }
    total = add_array(array);
    return +total == +number;
    }    
  },
  cube = (x) => Math.pow(x, 3),
  display = (res) => {
    let data;
    let info = `<p><i>An Armstrong number is a  3-digit integer that the sum of the cubes of its digits is equal to the number itsef</i></p>
            <h3 id="example">Example</h3>
            <p>407 is Armstrong because: 4<sup>3</sup> + 0<sup>3</sup> + 7<sup>3</sup> equals 407</p> 
            <big> &#10154; (4 &times; 4 &times; 4) + (0 &times; 0 &times; 0) + (7 &times; 7 &times; 7) &equals; 64 + 0 + 343 &equals; 407
            </big>`;
    switch(res){
      case true: data = `
        <h2>Very Good! ${input_box.value} is an Armstrong number  <span id="tick"> &#10004;</span></h2>
        <i>Here is how</i> </br>
        <big>${input_box.value[0]}<sup>3</sup> &plus; ${input_box.value[1]}<sup>3</sup> &plus; ${input_box.value[2]}<sup>3</sup> &equals; 
        (${input_box.value[0]} &times; ${input_box.value[0]} &times; ${input_box.value[0]}) &plus;
        (${input_box.value[1]} &times; ${input_box.value[1]} &times; ${input_box.value[1]}) &plus;
        (${input_box.value[2]} &times; ${input_box.value[2]} &times; ${input_box.value[2]})
        &equals; ${cube(input_box.value[0])} &plus; ${cube(input_box.value[1])} &plus; ${cube(input_box.value[2])}
               &equals; ${input_box.value}</big>
      `; break
      case "sorry": data = input_box.value ? "<h3><span id=\"tick\">&#10062;</span> Sorry, only three-dig numbers are allowed.</h3>" : "<h3><h3><span id=\"tick\">&#10062;</span> Please enter a 3-digit number first</h3>"; break
      case false: data = `<h2>${input_box.value} is not an Armstrong number<span id="tick"> &#10062;</span></h2> ${info}`; break
      default: data = info; break
    }
    display_area.innerHTML =  `<div class="dynamic_">${data}</div`;

    input_box.value = "";
    input_box.focus();
    if (toggler && toggler.classList) {
    toggler.classList.remove("enabled");
    if (toggler.classList.contains("disabled") == false) {
      toggler.classList.add("disabled");
    }
  }
  };
  
  display();
  // Calls
  //Trigger Click instead of binding new events
  doc.addEventListener("keypress", function handle(event){
    if (event.keyCode == 13 && event.target.id == "enter") {
      dispatch(toggler, "click");
    }
  });

  checkValidity();
  if(input_box.value) {
    display(isArmstrong(input_box.value));
  }
  input_box.oninput = function(event){
this.value = this.value.replace(/[^0-9]+/, "");

checkValidity();
  };
  getById("toggled").onclick = (function(){
  if (toggler.classList.contains("disabled") ) {
    display("sorry");
  } else if (toggler.classList.contains("enabled")) {
    display(isArmstrong(input_box.value));
  }

});

//153, 370, 371, 407
//64 + 0 + 343
    // a(cube(4))
}(typeof document != "undefined" ? document: this.document));
    