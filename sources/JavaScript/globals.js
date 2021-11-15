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
        util.subscription.trigerEvent("reset");
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
      const data = util.createDataFromDisc(this.result);
      data.fillTableData();
    });
    reader.readAsText(f, "UTF-8");
  },

  processDataUpload() {
    if (vars.fileOpenActive) {
      return;
    }
    vars.fileOpenActive = true;
    const input = grab(".file-data input");
    util.closeMgtTools();
    input.click();
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

  init() {
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

  // Returns a single array containing all args together. This will spread any array argument in the list
  mergeArgs() {
    const args = [].slice.call(arguments).map((arg) => {
      return (typeof arg === "object" && typeof arg.slice === "function") ? arg.slice() : arg;
    });
    return [].concat.apply([], args);
  },

  // Subscription is only by className
  subscription: function subscription(event, ...rest) {
    const events = util.mergeArgs(event, rest);
    const { isMixed, isDelegatable } = this.settings.events.checkDelegatable(events);
    const override_ = isMixed;

    const root = {
      override_, isDelegatable, isMixed,
      override: true,
      types: events, // All specified event types in the call to .subscription(...)
      handlers: {}, // {"className": []}
      subscribers: [], // [{className: "hide", matchset: []}]

      // Add a handler for event identified by className i.e className
      addHandler(className, handler) {
        if (!Array.isArray(this.handlers[className]) || this.handlers[className].includes(handler)) {
          return this;
        }
        this.handlers[className].push(handler);
        return this;
      },

      attach(node, eventType, handler) {
        if (!(node && node[eventType + "Events"] && node[eventType + "Events"].includes(handler))) {
          if (node && Array.isArray(node[eventType + "Events"])) {
            node[eventType + "Events"].push(handler);
          } else {
            node[eventType + "Events"] = [handler];
          }
          console.log(eventType);
          node.addEventListener(eventType, handler, false);
        }
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

      defaultHandler() {
        if (this.override) {
          this.subscribers.forEach((s) => this.publish(s.matchset, this.handlers[s.className], this.types));
          /* 
          if override is on - do not use delegation
          instead: 
          for every event listed in subscription call, 
            for every subscribbed className
              for every matchset node found
                for every handler collected - node.addEventListener(type, handler);
           */

          return this;
        }
        // if not, attatch type to document - in the fn body, switch between classNames and execute their handlers
        return this;
      },

      getGenericHandler() {
        return null;
      }
    };

    return {
      root,
      events,
      handled: false,
      overrides: [], //list of event that will not use default behaviour which is delegation

      // Add handling functions to current event - veriadic
      handle: function handle(...handlers) {
        this.root.subscribers.forEach((subscriber) => {
          handlers.forEach((handler) => {
            if (subscriber.className && typeof handler === "function" && subscriber.matchset.length > 0) {
              this.root.addHandler(subscriber.className, handler);
            }
          });
        });
        // Mark the current batch of subscribe() calls as handled and reopen upon it's next call
        this.handled = true;
        this.prepare();
        return this;
      },

      // Every call to subscribe wipes previously sunscribed classNames
      subscribe: function subscribe(...classNames) {
        let subscribers = util.mergeArgs(...classNames).map((className) => {
          if (typeof className === "string") {
            const matchset = [].slice.call(document.getElementsByClassName(className));
            if (matchset.length > 0) {
              return { className, matchset };
            }
          }
        }).filter((subscriber) => subscriber && subscriber.className);

        if (subscribers.length == 0 && classNames.length > 0) {
          const args = util.mergeArgs(...arguments);
          let className = "cN" + ("" + (new Date()).getTime()).replace(/[A-z\s\W]/gi, "");
          const matchset = args.filter((item) => item.nodeType == 1);
          if (matchset.length != args.length) {
            throw new Error("subscribe() invoked with invalid input");
          }
          subscribers = [{className, matchset}];
        }
        
        subscribers.forEach((subscriber) => this.root.handlers[subscriber.className] = []);
        // find current event set in the map list and add these classNames to its list of subbed classNames
        // this shows that these classNames subscribbed to that event set
        this.root.subscribers.push(...subscribers);
        if (this.handled) {
          this.handled = false;
          this.root.subscribers = subscribers; // Once handled overwrite upon next call to subscribe()
        }
        this.prepare();
        return this;
      },

      prepare: function prepare() {
        const handler = this.root.getGenericHandler();
        if (typeof handler === "function") {
          handler();
          return this;
        }
        this.root.defaultHandler();
        return this;
        // Receive a prepared event
        // if there's no generic handler, call default handler - 
        // get it's generic  handler and atatch the event to it - generice handler will take care of delegation
      },

      // call override removes delegation behaviour for a given event instance.
      override: function override() {
        this.root.override = true;
        // this.overrides.push(this.root);
        // this.events = this.events.filter(event => event.override);
        return this;
      },

      // An alias to util.subscription. This creates a new instance to avoids inconsistent state
      subscription: function subscription(event, ...rest) {
        return util.subscription(...util.mergeArgs(event, rest));
      }
    }
  },

  events: [
    "beforeprint", "beforeunload", "blur", "canplay", "canplaythrough", "change", "click", "contextmenu",
    "dblclick", "devicelight", "devicemotion", "deviceorientation", "deviceproximity", "drag", "dragend",
    "dragenter", "dragleave", "dragover", "dragstart", "drop", "durationchange", "emptied", "ended", "error",
    "focus", "hashchange", "input", "invalid", "keydown", "keyup", "load", "loadeddata", "loadedmetadata",
    "loadstart", "message", "mousedown", "mouseenter", "afterprint", "mouseleave", "mousemove", "mouseout",
    "mouseover", "mouseup", "mozfullscreenchange", "mozfullscreenerror", "mozpointerlockchange",
    "mozpointerlockerror", "offline", "online", "abort", "pagehide", "pageshow", "pause", "play", "playing",
    "popstate", "progress", "ratechange", "reset", "resize", "scroll", "seeked", "seeking", "select", "show",
    "stalled", "submit", "suspend", "timeupdate", "unload", "userproximity", "volumechange", "waiting", "wheel"
  ],

  extraEvents: [
    "enter", "escape", "backspace", "tab", "capslock", "shiftkey", "ctrl", "alt", "backspace", "del"
  ],

  settings: {
    events: {
      // returns status {isMixed, isDelegatable}
      checkDelegatable(events) {
        let isDelegatable = true;
        events.forEach((event) => {
          this.checkSupported(event);
          if (!this.isDelegatable(event)) {
            isDelegatable = !isDelegatable; // This is only executed if a non delegatable type is found
          }
        });
        const isMixed = !isDelegatable;
        return { isMixed, isDelegatable };
      },

      // Throw an error if specified type is not aN actual event and there's no provision
      checkSupported(event) {
        if (!util.events.includes(event)) {
          throw new Error(`unsported event '${event}'`);
        }
      },

      isDelegatable(event) {
        const supported = [
          "click", "contextmenu", "dblclick", "drag", "dragend", "dragenter", "dragleave", "dragover", "select",
          "dragstart", "drop", "keydown", "keypress", "keyup", "mousedown", "mouseenter", "mouseleave", "wheel",
          "mousemove", "mouseout", "mouseover", "mouseup", "pointerdown", "pointerup", "pointerout", "pointerover",
          "pointerleave", "pointerenter", "pointermove", "pointercancel",
        ];
        if (!supported.includes(event)) {
          return false;
        }
        return true;
      },

      setup() {
        // Loop through each. 
        // add keydown event to html and listen for any of these keys. Fire respective handler for a match
        util.events.push.apply(util.events, util.extraEvents);
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
  },

  Subscriptions(event) {
    this.subscription.defaults.click.forEach((handler) => {
      handler(event, this.subscription.subscriber);
    });
    this.subscription.handle(this.subscription.activateHandler, event);
  }

};

util.settings.events.setup();

const { vars } = util;