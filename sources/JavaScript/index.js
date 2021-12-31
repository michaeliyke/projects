jQuery(function ($) {

  const { vars } = util;

  var input = grab("#item");

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
    { types: ["input"], subscribers: [$("input[name='item'], input[name='value']")], handlers: [Calculator] }
  ]);

  util.defaults([
    { type: "keyup", handlers: [util.HandleEnter] },
    { type: "click", handlers: [util.deleteRow] }
  ]);

  function Calculator(e) {
    const input = e.target;
    if (input.value.trim().length > 0) {
      if (!vars.activeRow) {
        // Add a row for the first add
        const row = util.createRow("", "");
        const table = grab("table tbody");
        table.insertBefore(row, table.firstChild);
        vars.activeRow = grab.call(table, "tr");
      }

      const cell0 = grab("#cell0");
      const cell1 = grab("#cell1");
      // fill row text
      if (input.id === "item") {
        cell0.textContent = util.ucWord(input.value);
        return
      }
      cell1.textContent = input.value;
      return
    }
    // remove row if value is empty
    if (!vars.activeRow) {
      return
    }
    const cell0 = grab("#cell0");
    const cell1 = grab("#cell1");
    const amount = grab.call(vars.activeRow.parentNode, "#amount");
    const item = grab.call(vars.activeRow.parentNode, "#item");
    if (item.value.trim() || amount.value.trim()) {
      return
    }
    cell0.textContent = "";
    vars.activeRow.parentNode.removeChild(vars.activeRow);
    vars.activeRow = null;
  }


});