Techie(function ($, body, head, document, _, global, Log, stringify, stringifyAll, a) {

  var context = null;

  const { vars } = util;

  var d = document, getId = this.Id, v1 = "Next item", v2 = '0.00';
  var amount = getId("amount"), total = getId("total"), submit = getId("submit");
  var input = getId("item"), reset = getId("reset"), currentV = $("#current > #current");
  var manage = getId("managing");
  var printing = getId("printing"), saving = getId("saving"), _techie = this;
  // var  table = getId("table"), mobile_menu = getByClass("open-off-canvass");
  // var section_lists = query("header section nav ul");

  // Get all data
  if (input) {
    input.focus();
  }

  util.queue([
    { types: ["click"], subscribers: ["to-pdf"], handlers: [util.ConvertToPDF] },
    { types: ["click"], subscribers: ["del"], handlers: [util.del] },
    { types: ["click"], subscribers: ["reset"], handlers: [util.Clean] },
    { types: ["click"], subscribers: ["file-data"], handlers: [util.processDataUpload] },
    { types: ["click"], subscribers: ["data-upload"], handlers: [dataUploadInit, util.closeMgtTools] },
    { types: ["change"], subscribers: [$(".file-data input")], handlers: [util.uploadFileData] },
    { types: ["input"], subscribers: [$("input[name='item'], input[name='value']")], handlers: [Calculator] }
  ]);

  util.defaults([
    { type: "keyup", handlers: [util.HandlerKeyPress] }
  ]);

  function dataUploadInit(e) {
    console.log("Input file clicked");
  }

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

  function init() {
    obj = {
      "#menu-container": ["hide-view", "show-view"],
      "#menus": ["hide-view", "show-view"],
      "#body-cover": ["body-cover"],
      ".wrapper": ["wrapper-show"],
      "body": ["fix"]
    };
    new Promise(function foo(resolve, reject) {
      resolve(util.toggleClass(obj));
    }).then(function bar(obj) {
      setTimeout(function () {
        util.toggleClass({ ".menu": ["menu-tile"] });
      }, 500);
    }).catch((error) => console.log(error));
  }

});