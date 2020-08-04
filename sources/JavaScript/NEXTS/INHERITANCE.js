"use strict";

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === "object" || typeof call === "function")
    ? call
    : self;
}

function _inherits(clas, SUPER) {
  clas.prototype = Object.create(SUPER && SUPER.prototype, {
    constructor: { //Just to set the constructor back to clas and prototype to super.prototype
      value: clas,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (SUPER)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(clas, SUPER)
      : (clas.__proto__ = SUPER);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var LANGUAGE = function LANGUAGE(lang) {
  _classCallCheck(this, LANGUAGE);

  this.lang = lang;
};

var JAVASCRIPT = (function(_LANGUAGE) {
  _inherits(JAVASCRIPT, _LANGUAGE);

  function JAVASCRIPT() {
    _classCallCheck(this, JAVASCRIPT);

    var _this = _possibleConstructorReturn(
      this,
      (JAVASCRIPT.__proto__ || Object.getPrototypeOf(JAVASCRIPT)).call(
        this,
        "ECMAScript"
      )
    );

    _this.language = "JavaScript";
    _this.DOM = "[DOCUMENT OBJECT MODEL]";
    return _this;
  }

  return JAVASCRIPT;
})(LANGUAGE);

var API = (function(_JAVASCRIPT) {
  _inherits(API, _JAVASCRIPT);

  function API() {
    _classCallCheck(this, API);

    return _possibleConstructorReturn(
      this,
      (API.__proto__ || Object.getPrototypeOf(API)).call(this)
    );
  }

  _createClass(API, [
    {
      key: "give",
      value: function give() {
        return this;
      }
    },
    {
      key: "take",
      value: function take() {
        return this;
      }
    }
  ]);

  return API;
})(JAVASCRIPT);

var jQuery = (function(_Language) {
  _inherits(jQuery, _Language);

  function jQuery() {
    _classCallCheck(this, jQuery);

    return _possibleConstructorReturn(
      this,
      (jQuery.__proto__ || Object.getPrototypeOf(jQuery)).call(this)
    );
  }

  _createClass(jQuery, [
    {
      key: "conduct",
      value: function conduct() {
        return this;
      }
    },
    {
      key: "struct",
      value: function struct() {
        return this;
      }
    }
  ]);

  return jQuery;
})(Language);

var plugin = (function(_jQuery) {
  _inherits(plugin, _jQuery);

  function plugin() {
    _classCallCheck(this, plugin);

    return _possibleConstructorReturn(
      this,
      (plugin.__proto__ || Object.getPrototypeOf(plugin)).call(this)
    );
  }

  return plugin;
})(jQuery);
