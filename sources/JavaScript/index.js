jQuery(function ($) {
 
  var input = grab("#item");
  if (input) {
    input.focus();
  }
/* 
  util.queue([
    { type: "click", subscriber: "create-listing", handler: util.collections.createListing },
    { type: "click", subscriber: "to-pdf", handler: util.ConvertToPDF },
    { type: "click", subscriber: "reset", handlers: [util.Clean, util.vars.resetVars] },
    { type: "click", subscriber: "file-data", handler: util.processDataUpload },
    { type: "click", subscriber: "data-upload", handler: util.closeMgtTools },
    { type: "change", subscriber: $(".file-data input"), handler: util.uploadFileData },
    { type: "input", subscriber: $("#item, #amount"), handler: util.calculate }
  ]);
 */
  util.subscription("click", "escape").override().subscribe("modal").handle(vars.resetModalHTML);
  // util.subscription("click").override().subscribe("modal-footer").handle(util.modalDialogResponse);

  // util.defaults([
  //   { type: "keyup", handler: util.HandleEnter },
  //   { type: "click", handler: util.rowActions }
  // ]);  

});

function fn() {
  console.log("cb() called");
  console.log("Thankks!");
}