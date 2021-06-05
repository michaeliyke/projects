
function Super(){}Super.prototype = Array.prototype;
function Super2(){this.isTechie = "Truth";}Super2.prototype = {leave: true};
function clas() {Super.call(this);Super2.call(this);  }

// inherit one class
clas.prototype = Object.create(Super.prototype);
// mixin another
Object.assign(clas.prototype, Super2.prototype);
// re-assign constructor
clas.prototype.constructor = clas;

clas.prototype.go = function() {
  alert("Leave?" +this.leave)
  alert("come?" + this.come);
  // do a thing
};

/*var c = new clas()
alert(c.isTechie)*/

function foo(){
  this[0] = "net"; this[1] = "kit"; this[2] = "nit";
  this.length = 3;
}
foo.prototype = {
  you: false
}
foo.prototype.__proto__ = Array.prototype
var f = new foo();
// alert(f.you)
// alert(f)