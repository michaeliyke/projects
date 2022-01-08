const grab = document.querySelector.bind(document); // Picks first match

const grabAll = function grabAll(selector) {
  return [].slice.call(document.querySelectorAll.call(this, selector));
}.bind(document);

const byClass = function getElementsByClassName(className) {
  return [].slice.call(document.getElementsByClassName.call(this, className));
}.bind(document);

const util = {
  grab,
  grabAll,
  byClass,
  vars: {
    Total: 0,
    activeRow: null,
    fileOpenActive: false,
    tableData: [],
    pos: 0,
    
    /**
     * Increments the value of budget calculator total
     * @param {object} amount HTML input element object
     */
    increment(amount) {
      const n = util.extractNumbers(amount.value); // extracts the first leading integer value
      vars.Total += n;
    },

    /**
     * Decrements the value of budget calculator total
     * @param {object} amount HTML input element object
     */
    decrement(amount) {
      if (amount.dataset.operation == "decrement") {
        amount.dataset.operation = "";
      }
      const n = util.extractNumbers(amount.value);
      vars.Total -= n;
      if (vars.Total < 1) {
        vars.Total = 0;
      }
    },

    /**
     * Creates an two input fields for item and amount respectively
     * @param {string} itemText The text for the dummy item input
     * @param {string} amountText The text for the dummy amount input
     * @returns {object[]} Item and amount
     */
    generateInputs(itemText, amountText) {
      const item = document.createElement("input");
      const amount = document.createElement("input");
      item.value = itemText;
      amount.value = amountText;
      return [item, amount];
    },
    
    /**
     * vars settings method
     * @returns {object} util
     */
    setActive() {
      vars.activeRow = grab("table tr");
      return util;
    },
    /**
     * vars settings method
     * @returns {object} util
     */
    removeActive() {
      if (vars.activeRow) {
        vars.activeRow.parentNode.removeChild(vars.activeRow);
        vars.unsetActive();
      }
      return util;
    },
    /**
     * vars settings method
     * @returns {object}  util
     */
    unsetActive() {
      vars.activeRow = null;
      return util;
    },
    /**
     * vars settings method
     * @returns {object} util
     */
    resetVars() {
      const { vars: v } = util;
      v.activeRow = null;
      v.Total = 0;
      v.fileOpenActive = false;
      v.tableData = [];
      v.pos = 0;
      return util;
    }
  },

  /**
   * Create Table data from disc uploads - application/json, text/plain
   * @param {object} data Result dump from reading a file from disc
   * @returns {object} Information from data upload 
   */
  createDataFromDisc(data) {
    const info = {
      data,
      createData() {
        const { data } = this;
        let dataArray, text;
        if (typeof data !== "string") {
          return
        }
        // detect if it's json, fall back is text
        try {
          dataArray = JSON.parse(data);
        } catch (error) {
          text = data;
        }
        if (dataArray) {
          this.loadJSONData(dataArray);
          return
        }
        // Falling back to text
        this.loadTextData(text);
      },

      // Simply load given data into vars.tableData
      loadJSONData(object) {
        if (Array.isArray(object) || typeof object !== "object") {
          return
        }
        vars.tableData = Object.keys(object).map((key) => {
          const item = key, value = object[key];
          return { item, value, means: "upload" };
        });
      },

      // text format is x = y one for each line. No comma or required
      loadTextData(string) {
        vars.tableData = string.split("\n").map((line) => {
          let item, value, unit = line.split("=");
          if (unit[0] && unit[0].trim()) {
            item = unit[0].trim();
          }
          if (unit[1] && unit[1].trim()) {
            value = unit[1].trim();
          }
          return { item, value, means: "upload" };
        }).filter(e => e.item != null);
      },

      // populate vars.tableData with valid data information
      // Reset table and invoke util.fillDataTable()
      fillTableData() {
        util.settings.events.trigerEvent("reset");
        this.createData();
        util.fillTableData();
      }
    }
    return info;
  },

  /**
   * Create Table data from download - application/json
   * @returns {object} Information from data download
   */
  createDataFromDownload() {
    const info = {
      // populate vars.tableData with valid data information
      // Reset table and invoke util.fillDataTable()
      fillTableData() {
        util.subscription.trigerEvent("reset");
        this.createData();
        util.fillTableData();
      }
    };
    return info;
  },

  /**
   * Populate HTML table body with properly formatted table data
   * 
   * Automatically include values into calculation totals
   */
  fillTableData() {
    vars.tableData.forEach((data, it) => {
      const item = grab("#item"), amount = grab("#amount");
      item.value = data.item;
      amount.value = data.value;
      util.addRow(item, amount, {
        means: data.means
      });
    });
  },

  /**
   * Starts the file upload process
   * @param {object} e The file upload change event
   * @returns No return value
   */
  uploadFileData(e) {

    vars.fileOpenActive = false;
    const { files } = e.target;
    const accepts = ["application/json", "text/plain"];
    if (!files || !("length" in files) || files.length < 1) {
      return;
    }
    const [f] = files;
    if (!accepts.includes(f.type) || !util.sizeIsAllowable(util.getFileSize(f))) {
      return;
    }
    // f.length, f.name, f.size, f.type i.e mime type
    const reader = new FileReader();
    reader.addEventListener("load", function () {
      grab(".file-data input").value = null;
      grab(".reset").click();
      const data = util.createDataFromDisc(this.result);
      data.fillTableData();
    });
    reader.readAsText(f, "UTF-8");
  },

  processDataUpload() {
    util.closeMgtTools();
    // if (vars.fileOpenActive) {
    // vars.fileOpenActive = true;
    grab(".file-data input").click();
    // }
  },

  /**
   * shows if size is within the allowed range of 3MB
   * @param {string} size The size to check against
   * @returns {boolean} True if size is less than 3MB
   */
  sizeIsAllowable(size) {
    const num = size.replace(/[^\d.]/g, "");
    const unit = size.replace(/[\d.]/g, "");
    if (unit.toUpperCase() == "MB") {
      return num < 3;
    }
    if (unit == "BYTES" || unit == "KB") {
      return true;
    }
    return false;
  },

  /**
   * Converts the given size to BYTES, KB, or MB
   * @param {object} param0 An object(file) with the size property
   * @returns {string} The size in BYTES, KB, or MB
   */
  getFileSize({ size }) {
    if (size < 1024) {
      return size + "BYTES";
    }
    if (size >= 1024 && size < 1048576) {
      return (size / 1024).toFixed(1) + "KB";
    }
    if (size >= 1048576) {
      return (size / 1048576).toFixed(1) + "MB";
    }
  },

  /**
   * setup row props
   * @param {object} row table row element on which data props are set
   */
  setDataProps(row) {
    row.dataset.prev = vars.pos++;
    row.dataset.pos = vars.pos;
    // console.log(row);
  },

  /**
   * updates budget total on page, and unsets activeRow, and resets the input values, 
   * @param {object} item Input element expected to contain item description
   * @param {object} amount Input element expected to contain the mount
   * @returns No return value
   */
  updateUI(item, amount) {
    if (amount.dataset.operation == "decrement") {
      vars.decrement(amount);
    } else {
      vars.increment(amount);
    }
    item.value = amount.value = "";
    item.focus();
    return vars.unsetActive().updateCount();
  },

  /**
   * Updates the total value on the budject calculator UI
   * @returns {object} The this object
   */
  updateCount() {
    $("#total").text(`Total: ${vars.Total}`);
    return this;
  },

  /**
   * Destroy budget calculator data and resets the UI
   */
  Clean() {
    //reset all fields here
    const item = grab("#item"), amount = grab("#amount"), total = grab("#total");
    item.value = amount.value = "";
    item.placeholder = "New item";
    amount.placeholder = "New vlaue";
    item.focus();
    total.textContent = "Total: 0";
    $("table tbody").empty();
  },

  /**
   * Converts the first character of a string to uppcase and the rest to lowercase
   * @param {string} str The string to be converted
   * @returns {string} The converted string 
   */
  ucWord(str) {
    if (Object.prototype.toString.call(str) !== "[object String]") {
      return null;
    }
    return str.charAt(0).toUpperCase().concat(str.substr(1, str.length - 1).toLowerCase());
  },

  /**
   * Creates a table row element
   * @param {object} item item description
   * @param {object} value associated value
   * @param {object} props The props object containing settings to customize row creation
   * @returns {object} The newly created table row element
   */
  createRow(item, value, props) {
    var str = `<td class="cell cell-0 col-8 px-4">${util.ucWord(item)}</td>
        <td class="cell cell-1 col-4 px-4">${value}
         <div class="row-actions" aria-role="row-actions">
         <a href="JavaScript:void(0)" aria-label="Edit row" class="mx-4">
         <i class="row-action edit fas fa-pencil-alt" aria-hidden="true"></i>
         </a>
         <a href="JavaScript:void(0)" aria-label="Delete row" class="ml-4">
         <i class="row-action trash fas fa-trash" aria-hidden="true"></i>
         </a>
         </div></td>`;

    var row = document.createElement("tr");
    row.innerHTML = str;
    row.className = "row";
    row.dataset.means = "create"; // data-means=upload, create, download, edit
    if (props) {
      Object.keys(props).forEach((prop) => {
        row.dataset[prop] = props[prop];
      });
    }
    return row;
  },

  /**
   * Get the data within a row
   * @param {object} row The table row element from which to retrieve data
   * @returns {object} An object holding the item and amount of a row as properties
   */
  getRowData(row) {
    const [item, value] = row.getElementsByTagName("td");
    return { item: item.textContent, value: value.textContent };
  },

  /**
   * Get json format of table data
   * @param {object} table HTML table element form which to curate data  
   * @returns {string} A JSON string containing data
   */
  getData(table) {
    const data = [].map.call(grabAll.call(table, "tr"), (row) => util.getRowData(row));
    return JSON.stringify(data);
  },

  /**
   * Show if both item and amount input elements contain expected values
   * @param {object} item Input element expected to contain item description
   * @param {object} amount Input element expected to contain the amount value
   * @returns {boolean} True if both inputs are valid
   */
  validate(item, amount) {
    var test = /^((\w*|\W*)*[\w\s-]*)+$/.test(item.value.trim());
    if (!(test && amount.value.trim())) {
      console.warn("Wrong input found");
      return false;
    }
    return true;
  },

  // PDF plug
  ConvertToPDF() {
    if (util.added()) {
      util.printsBlob();
    }
  },

  /**
   * Returns the next table row element in relation to a given table row element
   * @param {object} row The reference table ow element for which next row is to be found
   * @returns {object} The next table row element
   */
  nextRowDown(row) {
    if (row && row.nodeName == "TR") {
      const siblings = [].slice.call(row.parentNode.children);
      const index = siblings.indexOf(row);
      const nexts = siblings.slice(index + 1);
      for (const ch of nexts) {
        if (ch && ch.nodeName == "TR") {
          return ch;
        }
      }
    }
  },

  /**
   * Reset row props upwards starting from a given table row element
   * @param {object} row The table row element from which to reset data properties
   * @returns {object} This this object
   */
  resetPropsUp(row) {
    vars.pos = row.dataset.pos - 1;
    (this.siblingRowsUp(row) || []).forEach((r) => {
      r.dataset.prev = vars.pos++;
      r.dataset.pos = vars.pos;
    });
    return this;
  },

  /**
   * Returns all the siblings table row elements that follow after the one provided
   * @param {object} row The reference table row element for which all following table rows are to be rturned
   * @returns {object[]}
   */
  siblingRowsDown(row) {
    if (row && row.nodeName == "TR") {
      const siblings = [].slice.call(row.parentNode.children);
      const index = siblings.indexOf(row);
      const nexts = siblings.slice(index + 1);
      return nexts.filter(ch => ch && ch.nodeName == "TR").sort((a, b) => b.dataset.pos - a.dataset.pos);
    }
  },

  /**
   * Get all the rows prior to the given one in order
   * @param {object} row The reference table row element
   * @returns {object} table row element
   */
  siblingRowsUp(row) {
    if (row && row.nodeName == "TR") {
      const siblings = [].slice.call(row.parentNode.children);
      const index = siblings.indexOf(row);
      const prevs = siblings.slice(0, index);
      return prevs.filter(ch => ch && ch.nodeName == "TR").sort((a, b) => a.dataset.pos - b.dataset.pos);
    }
  },

  /**
   * Returns the previous table row element in relation to a given table row element
   * @param {object} row The reference table ow element for which previous row is to be found
   * @returns {object} The previous table row element
   */
  nextRowUp(row) {
    if (row && row.nodeName == "TR") {
      const siblings = [].slice.call(row.parentNode.children);
      const index = siblings.indexOf(row);
      const prevs = siblings.slice(index - 1);
      for (const ch of prevs.reverse()) {
        if (ch && ch.nodeName == "TR") {
          return ch;
        }
      }
    }
  },

  /**
   * Deletes a row for the list, rebuilds the table data settings, and updates the counters
   * @param {object} row The table row element o delete from the DOM
   */
  deleteRow(row) {
    if (confirm("Do you want to delete this row?")) {
      new Promise(function (resolve) {
        const rowObject = $(row);
        const valueCell = $(grab.call(rowObject, ".cell ~ .cell"));
        // Negative number facilitates subtraction
        var value = util.extractNumbers(`-${valueCell.text()}`);
        const valueInput = grab("#amount");
        const itemInput = grab("#item");
        valueInput.value = value;
        valueInput.dataset.operation = "decrement";
        util.resetPropsUp(row);
        util.updateUI(itemInput, valueInput);
        rowObject.hide(700);
        setTimeout(function () {
          rowObject.remove();
        }, 1000);
        resolve(rowObject);
      }).then(function (rowObject) {
        console.log("Row deleted");
        return rowObject;
      }).catch(function (error) {
        console.error(error);
      });
    }
  },

  /**
   * The root point for dialog boxes
   * @param {string} modalType The type of modal to be created like action, info etc
   * @param {string} message The message content, could be a HTML blob
   * @param {function} cb Optional call back function to be executed
   */
  modal(modalType, message, cb) {
    const modal = $("#mainModal");
    const [header] = byClass.call(modal[0], "modal-header");
    const [body] = byClass.call(modal[0], "modal-body");
    const [footer] = byClass.call(modal[0], "modal-footer");

    header.close = byClass.call(header, "close")[0];
    header.modalTitle = byClass.call(header, "modal-title")[0];
    footer.buttons = byClass.call(footer, "btn");
    body.innerHTML = "<h2>" + message + "</h2>";

    if (typeof cb === "function") {
      const { hideCloser, borders } = cb.call(modal, body, header, footer);
      console.log(body);
      switch (true) {
        case hideCloser: header.close.style.display = "none";
        case borders:
          header.style.border = "none";
          footer.style.border = "none";
      }
    }

    if (modalType == "info") {
      // modal.find(".modal-footer").hide();
      modal.find("modal-dialog").removeClass("modal-dialog-centered");
    }
    const options = {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: true
    };
    $("#mainModal").modal(options);
  },

  infoModal(message, cb) {
    util.modal("info", message, cb);
  },

  actionModal(content, cb) {
    util.modal("action", content, cb);
  },

  rowActions(event) {
    const t = event.target, has = t.classList.contains.bind(t.classList);
    const row = util.getNextAncestor(t, "tr");
    switch (true) {
      case !(t && has("row-action")): return;

      case has("trash"):
        util.deleteRow(row);
        break;

      case has("edit"):
        $(row).addClass("editting");
        util.infoModal("", function cb(body, header, footer) {
          const [close, save] = footer.buttons;
          header.modalTitle.textContent = "Edit row";
          const { item, value } = util.getRowData(util.getNextAncestor(t, "tr"));
          const html = ` 
              <div>
                <input id="modal-item" class="item" value="${item.trim()}" />
                <input id="modal-amount" class="amount" value="${value.trim()}" />
              </div>
              `;
          body.innerHTML = html;
          close.textContent = "CANCEL";
          save.textContent = "UPDATE";
          this.find("input.item").focus();
          return {
            hideCloser: true,
            borders: true
          }
        });
        break;
    }
  },

  /**
   * Updates the row in the edit row process
   * @param {object} event The event object
   */
  editRow(event) {
    const button = event.target;
    const edit = $(".editting");
    const [editRow] = edit;
    editRow.dataset.means = "edit";
    const [actions] = byClass.call(editRow, "row-actions");
    const body = util.getPreviousSibling(button.parentNode, "div"); // modal-body
    const [modalItem, modalAmount] = $(body).find("input");
    const [item, amount] = edit.find("td");
    const [dummyItem, dummyAmount] = vars.generateInputs(
      item.firstChild.textContent, amount.firstChild.textContent
      );
    item.textContent = modalItem.value;
    amount.innerHTML = modalAmount.value + actions.outerHTML;
    dummyAmount.dataset.operation = "decrement";
    util.updateUI(dummyItem, dummyAmount);
    util.updateUI(modalItem, modalAmount);
    edit.removeClass("editting");
    $("#mainModal").modal("hide");
  },

  /**
   * This function shifts the focus of a given input element to the previous neibouring input field
   * @param {object} input The input element to start with
   * @param {string} startClassName The class name to enforce on the input from which tab is shifted
   */
  tabBackward(input, startClassName) {
    const yes = input && input.tagName.toLowerCase() == "input" && input.classList.contains(startClassName);
    if (yes) {
      if (input.value.length == 0) {
        const prev = util.getPreviousSibling(input, "input");
        if (prev) {
          prev.focus();
        }
      }
    }
  },

  /**
   * This recurses up a tree till a parent with the specified tagName is found
   * @param {object} node The node for which an ancestor is to be found
   * @param {string} tagName The tag name of the ancestor to check against
   * @returns {object}
   */
  getNextAncestor(node, tagName) {
    return !(node && tagName && node.parentNode) ? null :
      String(node.parentNode.tagName).toLowerCase() == tagName.toLowerCase() ? node.parentNode :
        util.getNextAncestor(node.parentNode, tagName);
  },

  /**
   * Gets the next previous sibling with the givn tag name of for which test function returns true
   * @param {object} node The node to start with and for which the previous sibling is to be found
   * @param {string} tagName The tag name of the previous sibling to check against
   * @param {function} tester Optional test function. If the function returns true, the node is returned
   * @returns {object|null}
   */
  getPreviousSibling(node, tagName, tester) {
    const fn = typeof tester === "function" ? tester : function temp() { return false };
    const siblings = node.parentNode.children;
    const prevs = [].slice.call(siblings, 0, [].indexOf.call(siblings, node)).reverse();
    for (const prev of prevs) {
      if (fn(prev) || prev.tagName.toLowerCase() == tagName.toLowerCase()) {
        return prev;
      }
    }
    return null;
  },

  /**
   * Creates a row with given settings and inserts it as first child of the table
   * @param {object} item Input element expected to contain item description
   * @param {object} amount Input element expected to contain the mount
   * @param {object} props The props object containing settings to customize row creation
   * @returns {object} The new row that has just been created.
   */
  insertFirstRow(item, amount, props) {
    const row = util.createRow(item.value, amount.value, props);
    const table = grab("table tbody");
    table.insertBefore(row, table.firstChild);
    vars.setActive();
    return row;
  },

  /**
   * Does the work of insertFirtRow but initiates approperiate data and UI updates
   * @param {object} item Input element expected to contain item description
   * @param {object} amount Input element expected to contain the mount
   * @param {object} props The props object containing settings to customize row creation
   * @returns {object} The this object
   */
  addRow(item, amount, props) {
    util.setDataProps(util.insertFirstRow(item, amount, props));
    util.updateUI(item, amount);
    return this;
  },

  HandleEnter(event) {
    if (event.keyCode != 13) {
      return;
    }
    const item = grab("#item"), amount = grab("#amount");
    if (!util.validate(item, amount)) {
      return;
    }
    vars.removeActive();
    util.addRow(item, amount);
  },

  /**
   * calculate does the temporary staging of a row while it's not yet committed
   * @param {object} event The event object
   * @returns No return value
   */
  calculate(event) {
    const input = event.target, value = "";
    if (input.value.trim().length > 0 && !vars.activeRow) {
      util.insertFirstRow({ value }, { value }); // Add a row for the first add
    }
    if (!vars.activeRow) {
      return
    }
    const itemInput = grab("#item"), valueInput = grab("#amount");
    const grab_ = grab.bind(vars.activeRow.parentNode);
    const itemCell = grab_(".cell-0"), valueCell = grab_(".cell-1");
    // fill row text
    if (input.id == "item") {
      itemCell.textContent = util.ucWord(input.value);
      if (valueInput.value.trim() || itemInput.value.trim()) {
        return;
      }
    }
    if (input.id == "amount") {
      valueCell.textContent = input.value;
      if (valueInput.value.trim() == "") {
        itemInput.focus();
      }
      if (valueInput.value.trim() || itemInput.value.trim()) {
        return;
      }
    }
    vars.removeActive(); // remove row if value is empty
  },

  /**
   * Extract the value number from the input element that supplies mount
   * @param {string} xyz The string value from the amount input element
   * @returns {number} A float
   */
  extractNumbers(xyz) {
    if (typeof xyz !== "string") {
      return 0;
    }
    const [x] = xyz.trim().match(/\w+/); // First set of chacters without space
    const extract = parseFloat(x.match(/^\d+/)); // Peel off trailing non-numbers
    if (isNaN(extract)) {
      return 0;
    }
    return extract;
  },

  printsBlob() {
    var pdf = new jsPDF('p', 'pt', 'letter');
    source = $('.resultsPane').html();
    specialElementHandlers = {
      '#bypassme': function (element, renderer) {
        return true
      }
    };
    margins = { top: 80, bottom: 60, left: 40, width: 522 };
    var Obj = { 'width': margins.width, 'elementHandlers': specialElementHandlers };
    pdf.fromHTML(source, margins.left, margins.top, Obj, function (dispose) {
      var d = new Date(), t = d.getTime();
      pdf.save((d + "" + t).replace(/[A-z\s\W]/gi, "") + '.pdf');
    }, margins);
  },

  /**
   * Closes the mgt family of tools within the budget calculator panel
   */
  closeMgtTools() {
    grabAll(".mgt-toggle-btn").forEach((btn) => {
      btn.setAttribute("aria-expanded", false);
      btn.classList.add("collapsed");
    });
    grabAll(".mgt.show").forEach((e) => {
      e.classList.remove("show");
    });
  },

  /**
   * Tests whether or not a given object is a DOM node
   * @param {object} object An object to test if it's a DOM node or not
   * @returns {boolean} True if the given object is a DOM node
   */
  isNode(object) {
    return object && object.nodeType == 1;
  },

  /**
  * Tests whether or not a given object is an array of DOM nodes
  * @param {object[]} object An object to test if it's an array of DOM nodes
  * @returns {boolean} True if the given object is an array of DOM nodes
  */
  isNodeList(object) {
    if (!(object && typeof object.length === "number")) {
      return false;
    }
    for (let it = 0; it < object.length; it++) {
      if (!(util.isNode(object[it]))) {
        return false;
      }
    }
    return true;
  },

  /**
   * Returns a single array containing all arguments merged together
   * 
   * This will spread any array arguments in the list
   * @returns {*[]} An array of all supplied arguments flattened together 
   */
  mergeArgs() {
    const args = [];
    [].slice.call(arguments).forEach((x) => {
      if (typeof x === "object" && typeof x.length === "number") {
        args.push.apply(args, [].slice.call(x));
      } else if (x) {
        args.push(x);
      }
    });
    return args;
  },

  /**
   * Group handling is where various names subscribe to the same set of handlers
   * 
   * Throw an error if eventType is less or more than one
   * @example clk = subscription("click");
   * clk.group({subscribers: [], handlers: []},{subscribers: [], handlers: []}...);
   * @returns {object} The this object
   */
  group() {
    util.mergeArgs(...arguments).forEach((s) => {
      if (!(s && Array.isArray(s.subscribers) && Array.isArray(s.handlers))) {
        throw new Error("group() called with incompatible subscription");
      }
      const subscribers = [];
      s.subscribers.forEach((x) => {
        if (util.isNode(x) || typeof x === "string") {
          subscribers.push(x);
        }
        if (util.isNodeList(x)) {
          subscribers.push.apply(subscribers, [].slice.call(x));
        }
      });
      if ("root" in this && Object.getPrototypeOf(this) == util) {
        s.types = s.types || this.events;
      }
      this.subscription(s.types).subscribe(subscribers).handle(s.handlers);
    });
    return this;
  },

  /**
   * Default handlers will always execute for the type provided
   * @param options {...string|object} An array of event types or an options objects
   * 
   * Or, a comma separated list of event types or options objects
   * @example 
   * util.defaults("click", "keyup", ..n).handle(f1, f2,..n)
   * util.defaults([{type: "click", handlers: []}, {type: "keyup", handlers: []}])
   * util.click().defaults([{handlers: []}, {handlers: []}])
   * util.click().defaults([f1, f2, f3])
   * @returns {object} The this object
   */
  defaults(...options) {
    options = util.mergeArgs(...options); // put all inputs into a single array
    const strArgs = options.every(o => typeof o === "string"); // All args are string
    const fnArgs = options.every(o => typeof o === "function"); // All args are functions
    const optArgs = options.every((o) => { // All args are options
      return o && typeof o.type === "string" && Array.isArray(o.handlers);
    });

    switch (true) {
      case strArgs: options = options.map((type) => {
        return { type, handlers: [] };
      });
        break;
      case fnArgs:
        if (!(this.events && this.events.length > 0)) {
          throw new Error("util.defaults(): event type not set");
        }
        options = this.events.map((type) => {
          return { type, handlers: options };
        });
        break;
      default:
        if (!optArgs) {
          throw new Error("invalid input in call to defaults()");
        }
    }
    return this.handleDefault(options, optArgs);
  },

  /**
   * The internal handling of  util.defaults()
   * If all options are provided, or return handle  
   * @param {object} options a set of information used to setup util.defaults()
   * @param {boolean} isOptions shows if a call to handle() is expected
   * @returns {object} The this object
   */
  handleDefault(options, isOptions) {
    if (!isOptions) { // handle() will completes the flow
      return util.subscription(options.map(o => o.type)).subscribe(document).override();
    }
    options.forEach((option) => {
      const { type, handlers } = option;
      return this.subscription(type).subscribe(document).override().handle(handlers);
    });
    return this;
  },

  /**
   * An alias to .group()
   * @borrows group as queue
   * @returns {object} This this object
   */
  queue() {
    return this.group(...arguments);
  },

  /**
   * This is where delegation bridges with event handlers
   * @param {object} event The event object
   */
  delegationBridge(event) {
    const tc = this.tc(event.target, event.type);
    if (tc) {
      this.execute(tc.handlers)(event);
    }
  },

  /**
  *
  * Every call to subscription() creates a new instance to ensure a consistent state.
  * 
  * Creates a subscription() instance with the listed events as types
  * 
  * Sets isDelegatable, isMixed, & delegated instance variables
  *
   * @param {string|object} eventType strings or object
   * @param  {...string|object} rest comma separated inputs of the same type
   * @returns {object} The this object
   */
  subscription: function subscription(eventType, ...rest) {
    const eventTypes = util.mergeArgs(eventType, rest);
    /**
     * Importance properties of the root object
     * 1. types - types specified in call to subscription
     * 2. override - gets and sets true or false behaviour for delegation
     * 3. isDelegatable - shows if event can be delegated
     * 4. delegated - contains list of current events to be delegated
     * 5. handlers - contains list of handlers mached to applicable subscribers
     * 6. subscribers - all 
    */
    const root = {
      get override() {
        return !this.isDelegatable;
      },

      set override(v) {
        if (typeof v !== "boolean") {
          throw new TypeError("override can only be set to true of false.");
        }
        this.isDelegatable = !v;
      },

      addHandle() {
        const handle = this.subscribers.name;
        this.subscribers.nodes.forEach((node) => {
          if (node.nodeType != 1) {
            return
          }
          if (!node.dataset.handles) {
            node.dataset.handles = handle;
            return
          }
          node.dataset.handles += " " + handle;
        });
        return this;
      },

      checkHandle(node, handle) {
        return node.dataset.handles && node.dataset.handles.split(" ").includes(handle);
      },

      // Add a handler for event identified by className
      addHandlers(handlers) {
        this.types.forEach((type) => {
          const fns = Array.isArray(this.handlers[type]) ? this.handlers[type] : [];
          fns.push.apply(fns, handlers.filter((fn) => !(fns.includes(fn))));
          this.handlers[type] = fns;
        });
        return this;
      },

      // returns  false if a subscriber has already been queued for processing for the same handler
      // returns true if not queued, and puts the subscriber in queue.
      attachx(subscriber, handlers) {
        let response = false;
        subscriber.matchset.forEach((node) => {
          handlers.forEach((h) => {
            this.types.forEach((eventType) => {
              if (!(node[eventType + "xEvents"] && node[eventType + "xEvents"].includes(handler))) {
                if (node && Array.isArray(node[eventType + "xEvents"])) {
                  node[eventType + "xEvents"].push(handler);
                } else {
                  node[eventType + "xEvents"] = [handler];
                }
                response = true;
              }
            });
          });
        });
        return response;
      },

      publish(matchset, handlers, eventTypes) {
        if (!(Array.isArray(matchset) && Array.isArray(handlers) && Array.isArray(eventTypes))) {
          throw new TypeError("Incorrect argument in call to publish()");
        }
        matchset.forEach((node) => {
          eventTypes.forEach((eventType) => {
            handlers.forEach((handler) => {
              this.attach(node, eventType, handler); // This skips those that have aLready been marked
            });
          });
        });
        return this;
      },

      // default generic handler handles all non-delegated events
      defaultHandler() {
        if (!this.override) {
          throw new Error("defaultHandler() invoked without an override")
        }
        this.subscribers.nodes.forEach((node) => {
          this.types.forEach((type) => {
            this.attach(node, type, this.execute((this.handlers[type] || [])));
          });
        });
        return this;
      },

      // delegation generic handler handles delegated events
      // attach all the events on the doc and put fnx to listen
      // avoid repeat by filtering subscribers, over-write instance subscribers with result
      // mark all subscribing nodes - data-events="click keydown drag mouseleave"
      delegationHandler() {
        this.types = this.delegated;
        this.types.forEach((type) => {
          this.attach(document, type, util.delegationBridge);
        });
        this.applyTc(this.subscribers.nodes, this.types, this.subscribers.name);
        return this;
      },

      attach(node, type, fn) {
        if (!(node && typeof type === "string" && typeof fn === "function")) {
          throw new Error("invalid arguments in attach() in call to attach");
        }
        const fns = Array.isArray(node[`${type}Events`]) ? node[`${type}Events`] : [];
        if (!(fns.includes(fn))) {
          fns.push(fn);
          node.addEventListener(type, fn.bind(this), false);
        }
        node[`${type}Events`] = fns;
      },

      extrasHandler() {
        this.extras.forEach((type) => {
          const info = util.extras.getInfo(type);
          if (info.token == "key") { // If it's a keyboard event
            this.attach(document, "keyup", (event) => {
              if (event.keyCode == info.code) {
                this.execute(this.handlers[type])(event);
              }
            });
          }

          if (info.token == "mouse") { // let's support hover
            this.attach(document, "mousemove", (event) => {
              const t = event.target;
              const s = this.subscribers;
              if (s.nodes[0] != document || (s.nodes[0] == document && s.nodes.length > 1)) {
                if (!s.nodes.includes(t)) {
                  return
                }
              }
              console.log(t);
              if (event.keyCode == info.code) {
                this.execute(this.handlers[type])(event);
              }
            });
          }
        });
      },

      applyTc(nodes, types, handle) {
        // console.log(nodes);
        nodes.forEach((node) => {
          types.forEach((type) => {
            let tc = node.tc || {}; // tc stands for type correspondence
            tc[type] = tc[type] || { handle };
            tc[type].handlers = this.handlers[type];
            node.tc = tc;
          });
        });
      },

      // retrieve a target's type correspondence for  given type if available
      tc(target, type) {
        if ("tc" in target) {
          return target.tc[type];
        }
      },

      // the delegation utility that handles the delegation job
      // it executes all the listed handlers for the event type against target
      delegate(event) {
        const tc = this.tc(event.target, event.type);
        if (tc) {
          this.execute(tc.handlers)(event);
        }
      },

      // hand the present set of information over to a generic handler for processing
      // generic handler will take care of delegation matters
      handle: function handle(instance) {
        const gh = this.getGenericHandler(instance);
        gh();
        return this;
      },

      execute(handlers) {
        return function execute(event) {
          handlers.forEach((fn) => {
            fn.call(event.target, event)
          });
        };
      },

      // determine and return the approperiate generic handling mechanism
      getGenericHandler(instance) {
        let gh;
        switch (true) {
          case this.isDelegatable:
            gh = this.delegationHandler;
            break;
          case this.isMixed: // mixed events here
            gh = this.mixedHandler;
            break;
          case this.extras.length > 0:
            gh = this.extrasHandler;
            break;
          default:
            gh = this.defaultHandler;
        }
        return gh.bind(this, instance);
      },

      // mixed handler simply stands inbetween default and delegation generic handlers
      mixedHandler(instance) {
        // extras
        this.extrasHandler(instance);  // works with this.extras
        // non-delegated
        this.types = this.types.filter(t => !(this.delegated.includes(t) || this.extras.includes(t)));
        this.defaultHandler(instance);

        // delegated
        this.override = this.isMixed = false;
        this.delegationHandler(instance);
        return this;
      }
    };

    /**
     * Important properties for the instance are as follows
     * 1. root - object for managing internal state
     * 2. events - holds all the event types ready for subscription
     * 3. handled - boolean showing if handle() has been called yet after subscribe()calls
    */

    const instance = {
      "__proto__": util, // This facilitates chaining after invoking an event method
      get isDelegatable() {
        return this.root.isDelegatable;
      },

      init(types) {
        const { isMixed, isDelegatable, delegated, extras } = util.settings.events.detect(types);
        this.events = types;// All the current event types
        this.handled = false; // Whether or not .handle() has been called
        this.root = root; // The internal root
        this.root.extras = extras;
        this.root.isDelegatable = isDelegatable; // If all supplied types are delegatable
        this.root.isMixed = isMixed; // Whether types are a mix of delegatable and non
        this.root.delegated = delegated; // an array of types to be delegated
        this.root.types = types; // All supplied event types in .subscription() call
        this.root.handlers = {}; // Event handlers identified by a ---
        this.root.subscribers = { name: "", nodes: [] };
        return this;
      },

      // subscriber list closes
      handle: function handle(...handlers) {
        const fns = util.mergeArgs(...handlers);
        if (!fns.every((fn) => typeof fn === "function")) {
          throw new Error("invalid input in handle()");
        }
        this.handled = true;
        this.root.addHandle();
        this.root.addHandlers(fns);
        this.root.handle(this);
        return this;
      },

      generateName() {
        const nameIndex = util.settings.events.vars.nameIndex++;
        return `x${nameIndex}`;
      },

      // get all matches, generate a name for them, update subscribers{name, nodes}
      subscribe: function subscribe(...classNames) {
        // build a new instance if the present one is already handled
        if (this.handled) {
          return this.init(this.events).subscribe(...classNames);
        }
        const args = util.mergeArgs(...classNames);
        // Ensure the arguments are not mixed up
        const strArgs = args.every((x) => typeof x === "string");
        const objArgs = args.every((x) => typeof x === "object");
        if (!(strArgs || objArgs)) {
          throw new Error("subscribe() invoked with invalid input");
        }
        let nodes = [];
        if (strArgs) {
          args.forEach((className) => {
            nodes = [].slice.call(document.getElementsByClassName(className));
          });
        }
        if (objArgs) {
          nodes = args.filter((i) => {
            return (i && i.nodeType == 1) || (i == window) || (i.nodeType == 9);
          });
        }
        this.root.subscribers.nodes.push(...nodes); // all subscribing nodes to the instance are put together
        if (!this.root.subscribers.name) { // under the same name for ease of use
          this.root.subscribers.name = this.generateName();
        }
        return this;
      },

      // call removes delegation behaviour for a given event instance.
      override: function override() {
        this.root.override = true;
        return this;
      },

      // An alias to util.subscription()
      subscription: function subscription(event, ...rest) {
        return this.init(util.mergeArgs(event, rest));
      }
    };

    return instance.init(eventTypes);
  },

  /**
   * All events go here - delegated, non-delegated, extra, & custom
   * 
   * Extra and custom events are merged unto this list at run time
   */
  events: [
    "beforeprint", "beforeunload", "blur", "canplay", "canplaythrough", "change", "click",
    "contextmenu", "dragend", "loadedmetadata", "mousemove", "mouseout", "select", "show",
    "dblclick", "devicelight", "devicemotion", "deviceorientation", "deviceproximity", "drag",
    "ended", "error", "mozpointerlockchange", "play", "playing", "waiting", "wheel",
    "dragenter", "dragleave", "dragover", "dragstart", "drop", "durationchange", "emptied",
    "focus", "hashchange", "input", "invalid", "keydown", "keyup", "load", "loadeddata",
    "loadstart", "message", "mousedown", "mouseenter", "afterprint", "mouseleave",
    "mouseover", "mouseup", "mozfullscreenchange", "mozfullscreenerror", "cancel",
    "mozpointerlockerror", "offline", "online", "abort", "pagehide", "pageshow", "pause",
    "popstate", "progress", "ratechange", "reset", "resize", "scroll", "seeked", "seeking",
    "stalled", "submit", "suspend", "timeupdate", "unload", "userproximity", "volumechange"
  ],

  /**
   * Extra events
   */
  extras: {
    map: {
      enter: { code: 13, token: "key" }, escape: { code: 27, token: "key" }, space: { code: 32, token: "key" },
      tab: { code: 9, token: "key" }, capslock: { code: 20, token: "key" }, shiftkey: { code: 16, token: "key" },
      ctrl: { code: 17, token: "key" }, alt: { code: 18, token: "key" }, backspace: { code: 8, token: "key" },
      del: { code: 46, token: "key" },
      hover: { token: "mouse", code: "mousemove" }
    },

    aliases: {
      key: "keydown",
      mouse: "mousemove"
    },

    getEntryType(entry) {
      for (const type of this.types) {
        if (this.map[type] == entry) {
          return type;
        }
      }
    },

    getInfo(extra) {
      return this.map[extra];
    },

    includes(type) {
      return this.types.includes(type);
    },

    get types() {
      return Object.keys(this.map)
    },

    handle() { }
  },

  /**
   * Adds a list of custom made events to the list and repeats events setup
   * 
   * These will treated like any other extras family of events
   * @param {string} eventNames The name of the custom event to add to the list of events
   */
  addCustomEvents(eventNames) {
    util.events.push.apply(util.events, eventNames);
    util.settings.events.setup();
  },

  settings: {
    events: {
      vars: {
        pending: { defaults: null },
        delegationClassName: "_del_",
        nameIndex: 0 // index of generated names for all the subscriptions
      },
      stack: {}, // Register - {type: [{name: "xyz", nodes: [Nodes]}]}
      addStack(type, name, nodes) {
        if (!(type && name && Array.isArray(nodes))) {
          return;
        }
        if (!this.stack[type]) {
          this.stack[type] = [];
        }
        this.stack[type].push({ name, nodes });
      },

      getStackItems(type) {
        return this.stack[type] || []; // [{name: "xyz", nodes: [Nodes]}]
      },

      // returns an array - [Nodes]
      getListeners(type, name) {
        const items = this.getStackItems(type);
        if (!name && items[0]) {
          return items[0].nodes; // [Nodes]
        }
        for (const item of items) {
          if (item[name]) {
            return item[name]; // [Nodes]
          }
        }
        return [];
      },

      // something like element.click()
      trigerEvent(type, className) {
        const listeners = this.getListeners(type, className);
        listeners.forEach((listener) => {
          try {
            listener[type]();
          } catch (error) {
            console.warn(error);
          }
        });
      },

      // returns status {isMixed, isDelegatable}
      detect(events) {
        let delegated = [], unDelegated = [];
        events.forEach((event) => {
          this.checkSupported(event);
          const _ = this.isDelegatable(event) ? delegated.push(event) : unDelegated.push(event);
        });
        const isDelegatable = delegated.length == events.length && !!(events[0]);
        const extras = events.filter(event => util.extras.includes(event));
        const isMixed = (function (unDel, del, ext) {
          // have both d & u or have e but u is larger in number
          return !!((unDel[0] && del[0]) || (ext[0] && unDel.length > ext.length));
        }(unDelegated, delegated, extras));
        const x = { isMixed, isDelegatable, delegated, unDelegated, extras };
        // console.log(x)
        return x;
      },

      // Throw an error if specified type is not aN actual event and there's no provision
      checkSupported(event) {
        if (!util.events.includes(event)) {
          throw new Error(`unsported event '${event}'`);
        }
      },

      isDelegatable(event) {
        const supported = [
          "click", "contextmenu", "dblclick", "keydown", "keypress", "keyup", "mousedown", "mouseenter", "mouseleave",
          "mousemove", "mouseout", "mouseover", "mouseup", "pointerdown", "pointerup", "pointerout", "pointerover",
          "pointerleave", "pointerenter", "pointermove", "pointercancel",
        ];
        return supported.includes(event)
      },

      setup() {
        // Loop through each. 
        // add keydown event to html and listen for any of these keys. Fire respective handler for a match
        util.events.push.apply(util.events, util.extras.types);
        util.events.forEach((event) => {
          const expr = `
        (function ${event}(...classNames) {
  const s = util.subscription("${event}");
  if(classNames.length < 1) {
    return s;
  }
  return s.subscribe(...classNames);
})`;
          util[event] = eval(expr);
        });
      }
    }
  }

};

util.settings.events.setup();

const { vars } = util;