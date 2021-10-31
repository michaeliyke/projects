
const grab = document.querySelector.bind(document);
const grabAll = document.querySelectorAll.bind(document);

const util = {
  grab,
  grabAll,
  vars: {
    Total: 0,
    activeRow: null,
    mobile_menu_open: {
      dumming: false
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

  del(e, btn) {
    if (confirm("Do you want to delete this row?")) {
      new Promise(function (resolve) {
        const row = Techie(e.target.parentNode);
        const amountValue = Techie(grab.call(row, ".cell ~ .cell"));
        // Negative number facilitates subtraction
        var value = "-" + amountValue.text().replace(/[^\d]+/g);
        const amount = grab("#amount");
        amount.value = value;
        util.updateUI(grab("#item"), amount);
        row.hideFX();
        setTimeout(function () {
          row.remove();
        }, 1000);
        resolve(row);
      }).then(function (row) {
        console.log("Row deleted");
        return row
      }).catch(function (error) {
        console.error(error);
      });
    }
  },

  updateCount() {
    $("#total").text(`Total: ${util.vars.Total}`);
  },

  Clean() {
    //reset all fields here
    const item = grab("#item"), amount = grab("#amount"), total = grab("#total");
    item.value = amount.value = "";
    item.placeholder = "New item";
    amount.placeholder = "New vlaue";
    item.focus(); 
    util.vars.Total = 0;
    total.textContent = "Total: 0";
    $("table tbody").empty();
    vars = {};
  },

  ucWord(str) {
    if (Object.prototype.toString.call(str) !== "[object String]") {
      return null;
    }
    return str.charAt(0).toUpperCase().concat(str.substr(1, str.length - 1).toLowerCase());
  },

  createRow(item, value) {
    var number = -1, length = arguments.length;
    var stack = [], args = arguments, txt,
      row = document.createElement("tr"), cell = document.createElement("td");
    while (++number < 2) {
      txt = " <td class='cell' id='cell" + number + "'> </td> <span class='del del" + number +
        "' title='Remove record'>x</span>"
      stack.push(txt);
    }
    // a(stack)
    row.innerHTML = stack.join(' ');
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
    toggleDropdown(Techie.dropdownTarget, "show-block");
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
      console.warn("Warning::   Make sure you are inputing the right values.");
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

  updateUI(item, amount) {
    util.vars.Total += util.extractNumbers(amount.value); //The elusive counter engine
    item.value = amount.value = "";
    item.placeholder = "New item";
    amount.placeholder = "New value";
    item.focus();
    util.vars.activeRow = null;
    if (util.vars.Total != +util.vars.Total) {
      return //reset();
    }
    $("#total").text(`Total: ${util.vars.Total}`);
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

  Foo() {
    const item = grab("#item"), amount = grab("#amount");
    if (!util.validate(item, amount)) {
      return;
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

  HandleEnter(e) {
    var evnt = e || global.event;
    if (evnt.keyCode == 13) {
      util.Foo.call(null, null, input, amount);
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
      "subscriber": event.target,
      "activate": function activator(event, subscriberString, actions) {
        if (actions.length < 1) {
          console.warn("You have not specified any actions for subscriber:", subscriberString);
        }
        actions.forEach(function launch(action) {
          action.call(obj, event, subscriptions.subscriber, obj);
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
