const globals = {
  sapi: document,
  vars: {},

  ucWord(str) {
    if (Object.prototype.toString.call(str) !== "[object String]") {
      return null;
    }
    return str.charAt(0).toUpperCase().concat(str.substr(1, str.length - 1).toLowerCase());
  },

  createRow(item, value) {
    var number = -1, length = arguments.length, stack = [], args = arguments, txt,
      row = sapi.createElement("tr"), cell = sapi.createElement("td");
    while (++number < 2) {
      txt = " <td class='cell' id='cell" + number + "'> </td> <span class='del del" + number +
        "' title='Remove record'>x</span>"
      stack.push(txt);
    }
    // a(stack)
    row.innerHTML = stack.join(' ');
    row.querySelector("#cell0").textContent = ucWord(item);
    row.querySelector("#cell1").textContent = value;
    return row;
  },

  getData() {
    const table = grab("table tbody");
    const data = [];
    Array.forEach.call(table.children, (ch) => {
      if (ch && ch.nodeName === "ROW") {
        const item = grab.call(ch, "#cell0");
        const amount = grab.call(ch, "#cell1");
        data.push({ item: item.textContent, amount: amount.textContent });
      }
    });
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
      this.HandleEnter, this.EscapeKeyHandler, this.MainEscapeKeyHandler
    ].forEach(function (handler) {
      handler(event, obj);
    });

  },

  MainEscapeKeyHandler() {
    if (document.body.classList.contains("fix")) {
      this.init();
    }
  },

  // PDF plug
  ConvertToPDF() {
    if (this.added()) {
      this.printsBlob();
    }
  },

  toggleChange(e) {

    var target = this.getTarget(e);

    $(target.classList.contains("swap") ? target.parentNode : target, function (k) {
      this.toggleClass("unchanged", "changed");
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
      resolve(this.toggleClass(obj));
    }.bind(this)).then(function bar(obj) {
      setTimeout(function () {
        this.toggleClass({ ".menu": ["menu-tile"] });
      }, 500);
    }.bind(this)).catch((error) => console.log(error));
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
      this.DropdownMenus(event);
      if (context && context.width && context.width > 0) {
        this.closePane.call(context, event, EscapeKeyHandler, context);

      }
    }
  },

  Foo() {
    if (!validate(input, amount)) {
      return;
    }

    // _techie.grab("table tbody").prependChild(createRow(input.value, amount.value));
    updateUI(extractNumbers(amount.value));
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
    if (this.pane) {
      closePane.call(this, event, CloseHandler, this);
      this.type_ = "click";
    }
    break
  default:
  // console.info("Delegation no match! id -", target.id);
}
  },

  Subscriptions(event, obj) {

    subscriptions = {
      //Subscription is purely by criterion -: id, class, name, data-set etc
      "default_handlers": [CloseHandler], //Default handlers will always execute
      "grouped_subscribers": [
        {
          "names": ["toggler", "equiv"],
          "handlers": [ActionsMenuToggle]
        }
      ],
      "subscribers": [
        //subscribers -> classes or ids subscribing to the click (event) bubble
        { "name": "toggle-sign", "handlers": [DropdownMenus] },
        { "name": "del", "handlers": [del] }, // .del
        { "name": "submit", "handlers": [Foo] }, //.submit
        { "name": "projects-toggler", "handlers": [init] }, // .projects-toggler
        { "name": "reset", "handlers": [Clean] }, // .reset
        { "name": "converting", "handlers": [ConvertToPDF] }, // .converting
        { "name": "swap", "handlers": [mobile_menu_open, toggleChange] }, // .swap
        { "name": "open-off-canvass", "handlers": [mobile_menu_open, toggleChange] } // .open-off-canvass
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
