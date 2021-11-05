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
        const {data} = this;
        let dataArray, text;
        if (typeof data !== "string" ) {
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
          return {item, value, means: "upload"};
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
          return {item, value, means: "upload"};
        }).filter(e => e.item != null);
      },

      // populate vars.tableData with valid data information
      // Reset table and invoke util.fillDataTable()
      fillTableData() {
        util.subscriptions.trigerEvent("reset");
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
        util.subscriptions.trigerEvent("reset");
        this.createData();
        util.fillTableData();
      }
    };
    return info;
  },

  // populate HTML table body with properly formatted table data
  // Automatically include values into calculation totals
  fillTableData(){
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
  
  uploadFileData(e){
    vars.fileOpenActive = false;
    const {files} = e.target;
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
    reader.addEventListener("load", function() {
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
    input.click();
  },

  sizeIsAllowable(size){
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

  getFileSize({size}) {
    if (size < 1024) {
        return size + "BYTES";
    }
    if (size >= 1024 && size < 1048576) {
      return (size/1024).toFixed(1) + "KB";
    }
    if (size >= 1048576) {
      return (size/1048576).toFixed(1) + "MB";
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
  setDataProps(row){
    const {vars} = util;
    row.dataset.prev = vars.pos++;
    row.dataset.pos = vars.pos;
    console.log(row);
  },
  
  updateUI(item, amount) {
    if (amount.dataset.operation == "delete") {
      amount.dataset.operation = "";
      vars.Total -= util.extractNumbers(amount.value);
    } else{
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
       row.dataset[prop]= props[prop];
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

  Subscriptions(event, obj) {

    subscriptions = {
      "subscriber": event.target,
      //Subscription is purely by criterion -: id, class, name, data-set etc
      "default_handlers": [util.CloseHandler], //Default handlers will always execute
      "grouped_subscribers": [
        {
          "names": ["toggler", "equiv"],
          "handlers": [util.ActionsMenuToggle]
        }
      ],
      "subscribers": [
        //subscribers -> classes or ids subscribing to the click (event) bubble
        { "name": "toggle-sign", "handlers": [util.DropdownMenus] },
        { "name": "del", "handlers": [util.del] }, // .del
        { "name": "submit", "handlers": [util.Foo] }, //.submit
        { "name": "projects-toggler", "handlers": [util.init] }, // .projects-toggler
        { "name": "reset", "handlers": [util.Clean] }, // .reset
        { "name": "converting", "handlers": [util.ConvertToPDF] }, // .converting
        { "name": "swap", "handlers": [util.mobile_menu_open, util.toggleChange] }, // .swap
        { "name": "open-off-canvass", "handlers": [util.mobile_menu_open, util.toggleChange] } // .open-off-canvass
      ],

      "activate": function activate(event, subscriberString, actions) {
        if (actions.length < 1) {
          console.warn("You have not specified any actions for subscriber:", subscriberString);
        }
        actions.forEach(function launch(action) {
          action.call(obj, event, subscriptions.subscriber, obj);
        });
      },

      // get a subscriber by its name
      "getSubscriber": function getSubscriber(name) {
        for (const subscriber of this.subscribers) {
          if (subscriber.name == name) {
            return subscriber;
          }
        }
      },

      // get listening DOM elements
      "getListeners": function getListeners(subscriber) {
        const { name: className} = subscriber;
        return [].slice.call(grabAll(`.${className}`));
      },

      // triggers a subscriber's event by name - executes it's listeners
      "trigerEvent": function trigerEvent(className){
        const subscriber = this.getSubscriber(className);
        if (!subscriber) {
          return
        }
        const listeners = this.getListeners(subscriber);
        listeners.forEach((listener) => {
          try {
            // something like element.click()
              listener[subscriber.event || "click"]();
          } catch (error) {
            console.warn(error);
          }
        });
      }
    };

    filter = ActivationHandler;
    subscriptions.default_handlers.forEach(function (handler) {
      handler.call(obj, event, subscriptions.subscriber, obj);
    });
    // subscriptions.subscribers.forEach(filter);
    HandlerGroup(filter);
    HandleSingle(filter);
    function HandlerGroup(handler) {
      subscriptions.grouped_subscribers.forEach(function handleSubscription(group) {
        group.names.forEach(function subscriber(subscriberString) {
          handler(subscriberString, group);
        });
      });
    }

    function HandleSingle(handler) {
      subscriptions.subscribers.forEach(function handleSubscription(subscriber) {
        handler(subscriber.name);
      });
    }

    function ActivationHandler(subscriberString, group) {
      if (subscriptions.subscriber.classList.contains(subscriberString)) {
        if (Object.prototype.toString.call(group) == "[object Object]") {
          actions = group.handlers;
        } else {
          subscriptions.subscribers.forEach(function handleSubscription(subscriber) {
            if (subscriberString == subscriber.name) {
              actions = subscriber.handlers;
            }
          });
        }
        subscriptions.activate(event, subscriberString, actions);
      }
    }

  }

};

const {vars} = util;