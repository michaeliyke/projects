jQuery(function ($) {

  var input = grab("#item");

  // Get all data
  if (input) {
    input.focus();
  }

  util.queue([
    { types: ["click"], subscribers: ["modal-yes"], handlers: [util.editRow] },
    { types: ["click"], subscribers: ["to-pdf"], handlers: [util.ConvertToPDF] },
    { types: ["click"], subscribers: ["reset"], handlers: [util.Clean, util.vars.resetVars] },
    { types: ["click"], subscribers: ["file-data"], handlers: [util.processDataUpload] },
    { types: ["click"], subscribers: ["data-upload"], handlers: [util.closeMgtTools] },
    { types: ["change"], subscribers: [$(".file-data input")], handlers: [util.uploadFileData] },
    { types: ["input"], subscribers: [$("input[name='item'], input[name='value']")], handlers: [util.calculate] }
  ]);

  util.defaults([
    { type: "keyup", handlers: [util.HandleEnter] },
    { type: "click", handlers: [util.rowActions] }
  ]);

});