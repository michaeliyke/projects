let $ = Techie;
const grab = document.querySelector.bind(document); // Picks first match
const grabAll = document.querySelectorAll.bind(document); // Picks all maches

const util = {
  grab,
  grabAll,
  vars: {
    Total: 0,
    activeRow: null,
    fileOpenActive: false,
    tableData: [],
    pos: 0,
    prev: 1,
    mobile_menu_open: {
      dumming: false
    }
  },

  // Create Table data from disc uploads - application/json, text/plain
  createDataFromDisc(data) {
    const info = {
      data, //Result dump from reading a file from disc
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

  // populate HTML table body with properly formatted table data
  // Automatically include values into calculation totals
  fillTableData() {
    vars.tableData.forEach((data, it) => {
      const item = grab("#item"), amount = grab("#amount");
      item.value = data.item;
      amount.value = data.value
      const row = util.createRow(
        util.ucWord(item.value), amount.value || "",
        {
          means: data.means,
          pos: it + 1,
          prev: it
        }
      );
      const table = grab("table tbody");
      table.insertBefore(row, table.firstChild);
      vars.activeRow = grab.call(table, "tr");
      util.updateUI(item, amount);
    });
  },

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

  mobile_menu_open() {
    if (mobile_menu_open.dumming) {
      mobile_menu_open.dumming = false;
      section_lists[0].style.width = 0;
      section_lists[1].style.width = 0;
      return
    }
    mobile_menu_open.dumming = true;
    section_lists[0].style.width = "14em";// "50%";
    section_lists[1].style.width = "14em";// "50%";
  },

  mobile_menu_close() {
    section.style.width = 0;
  },

  // Reset row props upwards
  resetPropsUp(row) {
    this.scanUpwards(row, (row) => {
      console.log(row);
      // console.log(row.getAttributeNames());
    });
    console.log("reset data called-------------------------");
  },

  scanUpwards(row, fn) {
    fn(row);
    row = row.previousSibling;
    this.scanUpwards(row, fn);
  },

  // setup row props
  setDataProps(row) {
    const { vars } = util;
    row.dataset.prev = vars.pos++;
    row.dataset.pos = vars.pos;
    console.log(row);
  },

  updateUI(item, amount) {
    if (amount.dataset.operation == "delete") {
      amount.dataset.operation = "";
      vars.Total -= util.extractNumbers(amount.value);
    } else {
      vars.Total += util.extractNumbers(amount.value);
    }
    item.value = amount.value = "";
    item.focus();
    vars.activeRow = null;
    if (isNaN(vars.Total)) {
      return //reset();
    }
    $("#total").text(`Total: ${vars.Total}`);
  },

  del(e, btn) {
    if (confirm("Do you want to delete this row?")) {
      new Promise(function (resolve) {
        const row = $(e.target.parentNode);
        const amountCell = $(grab.call(row, ".cell ~ .cell"));
        // Negative number facilitates subtraction
        var value = util.extractNumbers(`-${amountCell.text()}`);
        const amount = grab("#amount");
        const item = grab("#item");
        amount.value = value;
        amount.dataset.operation = "delete";
        util.resetPropsUp(item.parentNode);
        util.updateUI(item, amount);
        row.hideFX();
        setTimeout(function () {
          row.remove();
        }, 1000);
        resolve(row);
      }).then(function (row) {
        console.log("Row deleted");
        return row;
      }).catch(function (error) {
        console.error(error);
      });
    }
  },

  updateCount() {
    $("#total").text(`Total: ${vars.Total}`);
  },

  Clean() {
    //reset all fields here
    const item = grab("#item"), amount = grab("#amount"), total = grab("#total");
    item.value = amount.value = "";
    item.placeholder = "New item";
    amount.placeholder = "New vlaue";
    item.focus();
    vars.Total = 0;
    total.textContent = "Total: 0";
    $("table tbody").empty();
  },

  ucWord(str) {
    if (Object.prototype.toString.call(str) !== "[object String]") {
      return null;
    }
    return str.charAt(0).toUpperCase().concat(str.substr(1, str.length - 1).toLowerCase());
  },

  createRow(item, value, props) {
    var number = -1, stack = [], str, row = document.createElement("tr");
    while (++number < 2) {
      str = `<td class="cell cell${number}" id=cell${number}></td> 
        <span class="del del${number}" title='Remove record'>x</span>`;
      stack.push(str);
    }

    // data-means=upload, create, download
    // modified
    row.dataset.means = "create";
    if (props) {
      Object.keys(props).forEach((prop) => {
        row.dataset[prop] = props[prop];
      });
    }
    row.innerHTML = stack.join(" ");
    row.querySelector("#cell0").textContent = util.ucWord(item);
    row.querySelector("#cell1").textContent = value;
    return row;
  },

  // Get json format of table data
  getData(table) {
    const data = Array.prototype.map.call(grabAll.call(table, "tr"), (row) => {
      const [item, amount] = row.getElementsByTagName("td");
      return item && amount ? { item: item.textContent, amount: amount.textContent } : null;
    }).filter(row => row != null);
    return JSON.stringify(data);
  },

  getByClass(name, index) {
    if (arguments.length > 1 && +index != index) {
      return console.error(`Ensure ${index} is an integer number.`);
    }
    return typeof index === "number" ? query(`.${name}`, index) : query(name);
  },

  query(selector, index) {
    if (arguments.length > 1 && +index != index) {
      return console.error(`Ensure ${index} is an integer number.`);
    }
    list = [].slice.call(document.querySelectorAll(selector));
    return typeof index === "number" ? list[index] : list;
  },

  DropdownMenus(e, target) {
    if (target && target.nodeType == 1 && target.classList.contains("toggle-sign")) {
      parent = traverseUp(target, (e) => e.querySelector(".drop-down-menu") != null);
      dropdown = parent.querySelector(".drop-down-menu");
      Techie.dropdownTarget = dropdown;
      toggleDropdown(dropdown, "show-block", target);
      return
    }
    this.toggleDropdown(Techie.dropdownTarget, "show-block");
  },

  traverseUp(e, test) {
    if (e && e.tagName != "BODY") {
      return test(e) ? e : traverseUp(e.parentNode, test);
    }
    return null;
  },

  toggleDropdown(element, name, eventTarget) {
    if (!element) {
      return
    }
    if (!(eventTarget && eventTarget.classList.contains("toggle-sign"))) {
      element.classList.remove(name);
      return
    }
    if (element.classList.contains(name)) {
      element.classList.remove(name);
    } else {
      element.classList.add(name);
    }
  },

  validate(item, amount) {
    var test = /^((\w*|\W*)*[\w\s-]*)+$/.test(item.value.trim());
    if (!(test && amount.value.trim())) {
      console.warn("Warning:-   Make sure you are inputing the right values.");
      return false;
    }
    return true
  },

  // Key press events group handler
  HandlerKeyPress(event, obj) {
    // obj - the target element say it's tabbing functionality targeted
    [
      util.HandleEnter, util.EscapeKeyHandler, util.MainEscapeKeyHandler
    ].forEach(function (handler) {
      handler(event, obj);
    });

  },

  MainEscapeKeyHandler() {
    if (document.body.classList.contains("fix")) {
      util.init();
    }
  },

  // PDF plug
  ConvertToPDF() {
    if (util.added()) {
      util.printsBlob();
    }
  },

  toggleChange(e) {

    var target = util.getTarget(e);

    $(target.classList.contains("swap") ? target.parentNode : target, function (k) {
      util.toggleClass("unchanged", "changed");
    });
  },

  added() {
    var ret = false;
    $("td").once(function () {
      if (this.text()) {
        ret = true;
      }
    });
    return ret;
  },

  EscapeKeyHandler(event, obj) {
    if (event.keyCode == 27) { //escape key
      util.DropdownMenus(event);
      if (context && context.width && context.width > 0) {
        util.closePane.call(context, event, EscapeKeyHandler, context);

      }
    }
  },

  Foo(evnt) {
    const item = grab("#item"), amount = grab("#amount");
    if (!util.validate(item, amount)) {
      return;
    }
    if (item && item.parentNode) {
      util.setDataProps(item.parentNode)
    }

    // _techie.grab("table tbody").prependChild(createRow(input.value, amount.value));
    util.updateUI(item, amount);
  },

  extractNumbers(string) {
    return parseFloat(String(string).replace(/[^\d]/g, ""), 10);
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

  toggleClass(object) { //toggle({"div": ["red", "blue"]})
    var selector;
    for (selector in object) {
      if (selector && object.hasOwnProperty(selector) && Array.isArray(object[selector])) {
        var current = object[selector][0], replacement = object[selector][1];
        if (typeof current !== "string" && typeof replacement !== "string") {
          return
        }
        $(selector).toggleClass(current, replacement);
      }
    }
  },

  CloseHandler(event, dom, techie) {
    if (event) {
      return true;
    }
    // ATTENTION: re-write this place using lass detection instead.
    // ATTENTION: Use of id detection is hereby discontinued!
    var target = event.getTarget;
    if ((target.id == "equiv" || target.id == "manage") || (target.id == "equiv" || target.parentNode.id == "manage")) {
      return false;
    }
    switch (target.id) {
      case "main":
      // case "nav":
      case "header":
      case "project":
      case "project-body":
      case "trigger":
      case "inputs":
      case "input":
        if (util.pane) {
          util.closePane.call(this, event, CloseHandler, this);
          util.type_ = "click";
        }
        break
      default:
      // console.info("Delegation no match! id -", target.id);
    }
  },

  closePane(event, handler, pane) {
    util.pane.css({
      "width": "0px", opacity: 0
    });
    $("#equiv").html("&#9776;"/*"&#9776;"*/);
    width = 0;
    if (context) {
      context.width = 0;
    }
    util.pane = null;
    context = null;
  },

  HandleEnter(evnt) {
    if (evnt.keyCode == 13) {
      util.Foo.call(null, evnt);
    }
  },

  closeMgtTools() {
    grabAll(".mgt-toggle-btn").forEach((btn) => {
      btn.setAttribute("aria-expanded", false);
      btn.classList.add("collapsed");
    });
    grabAll(".mgt.show").forEach((e) => {
      e.classList.remove("show");
    });
  },

  ActionsMenuToggle(event, dom, techie) {
    var width, pane;
    $("#manage").toggleClass(function () {
      pane = this;
      context = this;
      this.pane = this;
      width = this.computedStyle().width.replace(/[A-z]+/i, "");
      context.width = width;
      if (context.width == 0) {
        this.css({
          border: "0.01em solid",
          width: "250px", opacity: 1
        }); /*#equiv  &#9661;*/
        $("#equiv").html("&#120169;");
        context.width = 250;
      } else {
        util.closePane.call(this, event, util.ActionsMenuToggle, this);
      }
    });
    util.pane = pane;
  },

  isNode(object) {
    return object && object.nodeType == 1;
  },

  isNodeList(object) {
    if (!(object && "length" in object)) {
      return false;
    }
    for (let it = 0; it < object.length; it++) {
      if (!(util.isNode(object[it]))) {
        return false;
      }
    }
    return true;
  },

  // Returns a single array containing all args together.
  // This will spread any array argument in the list.
  mergeArgs() {
    const args = [].slice.call(arguments).map((arg) => {
      return (typeof arg === "object" && typeof arg.slice === "function") ? arg.slice() : arg;
    });
    return [].concat.apply([], args);
  },

  // Group handling is where various names subscribe to the same set of handlers
  // Throw an error if eventType is less or more than one
  // clk = subscription("click"); 
  // clk.group({subscribers: [], handlers: []},{subscribers: [], handlers: []}...);
  group() {
    if (this.events.length < 1) {
      throw new Error("group() called without an event type set");
    }
    util.mergeArgs(...arguments).forEach((s) => {
      if (!(s && Array.isArray(s.subscribers) && Array.isArray(s.handlers))) {
        throw new Error("group() called with incompatible subscription");
      }
      const subscribers = s.subscribers.filter((x) => {
        return util.isNode(x) || typeof x === "string" || util.isNodeList(x);
      });
      if (subscribers.length != s.subscribers.length) {
        throw new Error("invalid argument in call to group()");
      }
      if ("root" in this && Object.getPrototypeOf(this) == util) {
        s.types = s.types || this.events;
      }
      this.subscription(s.types).subscribe(util.mergeArgs(subscribers)).handle(s.handlers);
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
   * @returns {object}
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
   * @returns {object}
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
   * @returns 
   */
  queue() {
    return this.group(...arguments);
  },

  /**
  *
  * Every call to subscription() creates a new instance to avoid an inconsistent state.
  * create a subscription() instance with the listed events as types
  * set isDelegatable, isMixed, & delegated intsnace variables
  *
   * @param {string|object} eventType strings or object
   * @param  {...string|object} rest comma separated inputs of the same type
   * @returns {object}
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

      attach(node, type, fn) {
        if (!(node && typeof type === "string" && typeof fn === "function")) {
          throw new Error("invalid arguments in attach() in call to attach");
        }
        const fns = Array.isArray(node[type + "Events"]) ? node[type + "Events"] : [];
        if (!(fns.includes(fn))) {
          fns.push(fn);
          node.addEventListener(type, fn, false);
        }
        node[type + "Events"] = fns;
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
          this.attach(document, type, this.delegate.bind(this));
        });
        this.applyTc(this.subscribers.nodes, this.types, this.subscribers.name);
        return this;
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
            const nodes = [].slice.call(document.getElementsByClassName(className));
            nodes.push.apply(nodes, nodes);
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

  extras: {
    map: {
      enter: { code: 13, token: "key" }, escape: { code: 27, token: "key" }, space: { code: 32, token: "key" },
      tab: { code: 9, token: "key" }, capslock: { code: 20, token: "key" }, shiftkey: { code: 16, token: "key" },
      ctrl: { code: 17, token: "key" }, alt: { code: 18, token: "key" }, backspace: { code: 8, token: "key" },
      del: { code: 46, token: "key" },
      hover: {token: "mouse", code: "mousemove"}
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
        const isMixed = (function(unDel, del, ext){
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