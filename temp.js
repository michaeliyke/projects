/*
s = util.subscription("contextmenu", "dblclick", "keydown");
s.subscribe("row", "row-2", "hide", "show").handle(f, f1, f2).subscribe("db2").handle()
s.handle(alert);
s.event;

s = util.subscription("contextmenu").subscription("dblclick").subscription("keydown");
s.subscribe("root-body");
s.handle(alert);
// s.event;

*/

//Default handlers will always execute for a given subscription
      defaults: { click: [], change: [] },
      // many subscribers, for the same handlers
      grouped_subscribers: [],
      // live map of events that can be subscribed to, with associated handlers
      subscriptions: { click: [], change: [], keydown: [] },

              this.handlers.forEach((handler) => {
                this.eventTypes.forEach((eventType) => {
                  node.addEventListener(eventType, handler);
                });
              });



      activate: function activate(name, action, event) {
        action(name, this.subscriber, event);
      },

      // get a subscriber by its name
      getSubscriber: function getSubscriber(name) {
        for (const subscriber of this.subscribers) {
          if (subscriber.name == name) {
            return subscriber;
          }
        }
      },

      // returns the name of event subscribed
      getSubscription: function getSubscription(subscriber) {
        return subscriber.subscription;
      },

      // setup event defaults
      setup: function setup(setUp) {
        this.defaults.click.push(this.CloseHandler);
        this.subscribers.push(
          { subscription: "click", names: ["toggler, equiv"], handlers: util.ActionsMenuToggle },
          { subscription: "click", names: ["toggle-sign"], handlers: [util.DropdownMenus] },
          { subscription: "click", names: ["del"], handlers: [util.del] }, // .del
          { subscription: "click", names: ["submit"], handlers: [util.Foo] }, //.submit
          { subscription: "click", names: ["projects-toggler"], handlers: [util.init] }, // .projects-toggler
          { subscription: "click", names: ["reset"], handlers: [util.Clean] }, // .reset
          { subscription: "click", names: ["converting"], handlers: [util.ConvertToPDF] }, // .converting
          { subscription: "click", names: ["swap", "open-off-canvass"], handlers: [util.mobile_menu_open, util.toggleChange] }, // .swap
        );
        if (typeof setUp === "function") {
          setUp.call(this, this);
        }
      },

      
      activateHandler: function activateHandler(name, event) {
        if (this.subscriber.classList.contains(name)) {
          const subscriber = this.getSubscriber(name);
          if (!subscriber) {
            return
          }
          const subscription = this.getSubscription(subscriber);
          const { handlers } = subscription;
          handlers.forEach((handler) => {
            this.activate(name, handler, event);
          });
        }
      }

      
      
      function fire(){}

      
  let x = function x(e) { console.log(e); }
  let y = function x(e) { console.log(e); }
  let z = function x(e) { console.log(e); }
  // util.subscription("contextmenu").subscribe("root-body", "db-body").handle(x, y, z);

  

  
  /*
  subscribe = connect = add = key
  triggerEvent = trigger = execute = activate = fire
  subscription = createEvent = createSubscription = event
  .event - event in play {name: click, handlers: []};
  events - all events yes on the instance

  x =  util.subscription("click") // subscription - "click"
  x =  x.subscription("mouseup") // fresh subscription - "mouseup"
       return a subscription object with key properties - event
       event is an object to which subscribbers and handlers are added
       a call to execute will trigger the event
    
       

  x.subscribe(n1, n2, n3, [n4, n4], n6, [n7]).handle(f1, f2, f3)
  x.subscribe("mouseup").handle(fn).subscribe().handle



  
  util.subscription("click").subscription("keypress")
  .subscribe(n1).sub(n2);
  */