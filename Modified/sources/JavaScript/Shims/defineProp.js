

var defineProperty = Object.defineProperty;

var supported = function() {
  var obj = {};
  try {
    defineProperty(obj, "x", { enumerable: false, value: obj });
    for (var _ in obj) {
      return false;
    }
    return obj.x === obj;
  } catch (e) {
    /* this is IE 8. */
    return false;
  }
};
var supportsDescriptors =
  defineProperty && supported();

if (!supportsDescriptors) {
  Object.defineProperty = function(a, b, c) {
    //IE8支持修改元素节点的属性
    if (defineProperty && a.nodeType == 1) {
      return defineProperty(a, b, c);
    } else {
      a[b] = c.value || (c.get && c.get());
    }
  };
}






function definePropIe8(obj, prop, desc){
   if(obj.nodeType == 1) {
    return  Object.defineProperty(obj, prop, desc);
   }
    obj[prop] = (desc.value || (desc.get && desc.get));
}
