jQuery(function ($) {
 
  var input = grab("#item");
  if (input) {
    input.focus();
  }
// abulegba
// signup

  util.queue([
    { type: "click", subscriber: "create-listing", handler: util.collections.launchCreateListing },
    { type: "click", subscriber: "to-pdf", handler: util.ConvertToPDF },
    { type: "click", subscriber: "reset", handlers: [util.Clean, util.vars.resetVars] },
    { type: "click", subscriber: "file-data", handler: util.processDataUpload },
    { type: "click", subscriber: "data-upload", handler: util.closeMgtTools },
    { type: "change", subscriber: $(".file-data input"), handler: util.uploadFileData },
    { type: "input", subscriber: $("#item, #amount"), handler: util.calculate }
  ]);
 
  /*util.subscription("click", ).override().subscribe(
    "modal"
    ).handle(vars.resetModalHTML);
 */
  util.subscription("click", "escape").override().subscribe(
    "modal-footer", "modal", "modal-header"
    ).handle(util.modalDialogResponse);

  util.defaults([
    { type: "keyup", handler: util.HandleEnter },
    { type: "click", handlers: [util.rowActions, util.collections.triggerSelection] }
  ]);

});


function fn(event) {
  console.log("cb() called");
  console.log("Thankks!");
}