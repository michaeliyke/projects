"use strict";
(function(w){
class Transcoder  {
	constructor(data) {}
		lowers(){
			return {
			a: "01", b:  "02", c:  "03", d:  "04", e: "05", f:  "06", g:  "07", h:  "08", i:  "09", j: "10",
			k: "11", l:  "12", m:  "13", n:  "14", o: "15", p:  "16", q:  "17", r:  "18", s:  "19", t:  "20", 
			u: "21", v:  "22", w:  "23", x:  "24", y: "25", z:  "26"
			};
		}
		uppers(){
			return {
 			A: "27", B: "28", C: "29", D: "30", E: "31", F: "32", G: "33", H: "34", I: "35", J: "36", 
 		 	K: "37",  L: "38", M: "39", N: "40", O: "41", P: "42", Q: "43", R: "44", S: "45", T: "46", 
 		 	U: "47",  V: "48", W: "49", X: "50", Y: "51", Z: "52"
 		 	};
		}
		metas(){
			return {
				"1": "!", "2": "@", "3": "#", "4":"$", "5":"%", "6":"^", "7":"&", "8":"*", "9": "+", "0": "~"
			};
		}
		transcode(data){
			if (Object.prototype.toString.call(data) == "[object String]") {
			if (data == +data) {
				return this.toAlphabets(data);
			} else{
				return this.toNumbers(data);
			}
		} else if(data){
			throw new TypeError("transcode must be called with a string type but you supplied " + typeof(data));
		}
		}
		lowercase(char){
			return this.scan(this.lowers(), char);
		}
 		uppercase(char){ 
 		 	return this.scan(this.uppers(), char);
 		 }
 		 meta(char){
 		 	return this.scan(this.metas(), char);
 		 }
 		 extract(data){
		let d = String(data).split(/(\d{2})/),
			col = [];
				for(let i of d){
				  if(i){
				    col.push(i)
				  }
				}
				return col;
 		 }
 		 toAlphabets(numbers){ 
 		 	numbers = this.extract(numbers);
 		 	let snippings = [], extraMeta = 0; 
 		 	for (let current of numbers){
 		 		switch(current){
 		 			case "0": case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8":
 		 			case "9": snippings.push(this.meta(current)); extraMeta++;
 		 		}
 		 		if (extraMeta > 1) {
 		 			throw new RangeError("Only one meta char is currently allowed. Support is on the way.");
 		 		}
 		 		if ( +current < 27) {
 		 			snippings.push(this.lowercase(current));
 		 		} else {
 		 			snippings.push(this.uppercase(current))
 		 		} 		 	}
 		 	return snippings.join("");
 		 }
 		 toNumbers(string){
 		 	let snippings = [], extraMeta = 0;
 		 	for (let char of string.split("")){
 		 		switch(char){
 		 			case "!": case "@": case "#": case "$": case "%": case "^": case "&": case "*": case "+":
 		 			case "~": snippings.push(this.meta(char)); extraMeta++;
 		 		}
 		 		if (extraMeta > 1) {
 		 			throw new RangeError("Only one meta char is currently allowed. Support is on the way.");
 		 		}
 		 		if (this.uppers()[char]) {
 		 			snippings.push(this.scan(this.uppers(), char));
 		 		} else{
 		 			snippings.push(this.scan(this.lowers(), char));
 		 		}
 		 	}
 		 	return snippings.join("");
 		 }
 		 scan(object, char){ 
 		 	let ret = null;
 		 	for (let key of Object.keys(object)){
 		 		let value = Object.getOwnPropertyDescriptor(object, key).value;
 		 		if (char == key) {
 		 			return value;
 		 		} else if (char == value){
 		 			return key;
 		 		}
 		 	}
 		 	return ret;
 		 }
}
w.Transcoder = Transcoder;
}(window));

Techie(window).ready( function Init (body, head, sapi, $, _, global, Log, stringify, stringifyAll, element) {

	


var tr = new Transcoder();

// var p = tr.transcode("ZPdEFYeikZbYxSPwsfiWkbcaqAKUplmxytt");
Log(tr.transcode("tRatutuspi^"));
Log(tr.transcode(
"204401202120211916096"));
// Log(tr.transcode("Michael^"))
this.hideErrors();

});



