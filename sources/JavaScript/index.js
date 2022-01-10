jQuery(function ($) {

  var input = grab("#item");
  // Save original contents of modal dialog HTML
  // This will enable vars.restoreModalHTML() to revert modal dialog changes
  vars.saveModalHTML();

  // Get all data
  if (input) {
    input.focus();
  }

  util.queue([
    { types: ["click"], subscribers: ["to-pdf"], handlers: [util.ConvertToPDF] },
    { types: ["click"], subscribers: ["reset"], handlers: [util.Clean, util.vars.resetVars] },
    { types: ["click"], subscribers: ["file-data"], handlers: [util.processDataUpload] },
    { types: ["click"], subscribers: ["data-upload"], handlers: [util.closeMgtTools] },
    { types: ["change"], subscribers: [$(".file-data input")], handlers: [util.uploadFileData] },
    { types: ["input"], subscribers: [$("input[name='item'], input[name='value']")], handlers: [util.calculate] }
  ]);

  util.subscription("click").override().subscribe("modal-footer").handle(
    fn, util.modalDialogResponse
    );
  
    function fn() {
      console.log("cb called()");
    }


  util.defaults([
    { type: "keyup", handlers: [util.HandleEnter] },
    { type: "click", handlers: [util.rowActions] }
  ]);

});