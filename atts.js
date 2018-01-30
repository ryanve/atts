/** @preserve npm.im/atts */
!function(root, name, make) {
  if (typeof module != "undefined" && module.exports) module.exports = make();
  else root[name] = make();
}(this, "atts", function() {

  var ssv = /\S+/g
    , effin = api.prototype
    , setAttr = "setAttribute"
    , getAttr = "getAttribute"
    , remAttr = "removeAttribute"
    , owns = {}.hasOwnProperty;

  /**
   * @constructor
   * @param {?Node=} e
   * @return {api}
   */
  function api(e) {
    if (!(this instanceof api)) return new api(e);
    if (this.length = null == e ? 0 : 1) this[0] = e;
  }

  /**
   * Count (or iterate) an element"s attributes.
   * @param {Element} e element
   * @param {(Function|number)=} fn or index, fns break as in [].some
   * @param {*=} scope defaults to `e`
   * @return {number} #attributes (#iterations if any pass, 0 if none)
   */
  function anyAttr(e, fn, scope) {
    var a, o = e.attributes, l = o && o.length, i = 0;
    if (typeof fn != "function") return +l || 0;
    scope = scope || e;
    while (i < l) if (fn.call(scope, (a = o[i++]).value, a.name, a)) return i;
    return 0;
  }

  function copy(v, k) {
    this[k] = v;
  }

  function getAtts(e) {
    var o = {};
    anyAttr(e, copy, o);
    return o;
  }

  function setAtts(e, o) {
    for (var n in o) owns.call(o, n) && attr(e, n, o[n]);
    return o;
  }

  /**
   * @param {Element} e
   * @param {Object=} o
   */
  function atts(e, o) {
    return void 0 === o ? getAtts(e) : setAtts(e, o);
  }

  /**
   * @param {*} v
   * @return {string|undefined}
   */
  function normalize(v) {
    return null == v ? void 0 : "" + v;
  }

  /**
   * @param {Element} e
   * @param {string=} k attribute name
   * @param {(string|boolean|null)=} v attribute value
   */
  function attr(e, k, v) {
    if (void 0 === v) return normalize(e[getAttr](k));
    if (typeof v == "boolean") toggleAttr(e, k, v);
    else if (null === v) e[remAttr](k);
    else e[setAttr](k, v = "" + v);
    return v;
  }

  /**
   * @param {Element} e
   * @param {Array|string} keys
   */
  function removeAttr(e, keys) {
    keys = typeof keys == "string" ? keys.match(ssv) : [].concat(keys);
    for (var i = keys && keys.length; i--;) e[remAttr](keys[i]);
  }

  /**
   * @param {Element} e
   * @param {string} k attribute name
   * @param {boolean=} force
   * @return {boolean}
   */
  function toggleAttr(e, k, force) {
    typeof force == "boolean" || (force = null == e[getAttr](k) || e[k] === false);
    var opposite = !force;
    force ? e[setAttr](k, "") : e[remAttr](k);
    return e[k] === opposite ? e[k] = force : force;
  }

  /**
   * @param {Element} e element to test on
   * @param {string} n attribute name
   * @return {boolean} true if element supports attribute
   */
  function supportAttr(e, n) {
    if (n in e) return true; // Case-sensitive check catches most inputs
    if ("class" === n) return "className" in e;
    // Do case-insensitive check on all enumerables to cover inputs
    // like "contenteditable" whose property is "contentEditable"
    for (var p in e) if (n.toLowerCase() === p.toLowerCase()) return true;
    return false;
  }

  /**
   * @param {Element} e element to test on
   * @param {string} n attribute name
   * @return {boolean} true if attribute is present
   */
  function isAttr(e, n) {
    return null != e[getAttr](n);
  }

  /**
   * @param {{length:number}} stack
   * @param {Function} fn
   */
  function each(stack, fn) {
    for (var l = stack.length, i = 0; i < l; i++) fn(stack[i]);
    return stack;
  }

  api["attr"] = attr;
  api["atts"] = atts;
  api["isAttr"] = isAttr;
  api["supportAttr"] = supportAttr;
  api["anyAttr"] = anyAttr;
  api["removeAttr"] = removeAttr;
  api["toggleAttr"] = toggleAttr;

  /**
   * @this {{length:number}}
   * @param {Object=} o
   */
  effin["atts"] = function(o) {
    return void 0 === o ? atts(this[0]) : each(this, function(e) {
      atts(e, o);
    });
  };

  /**
   * @this {{length:number}}
   * @param {string=} k
   * @param {*=} v
   */
  effin["attr"] = function(k, v) {
    return void 0 === v ? attr(this[0], k) : each(this, function(e) {
      var x = typeof v == "function" ? v.call(e) : v;
      void 0 === x || attr(e, k, x);
    });
  };

  /**
   * Remove attributes for each element in a collection.
   * @this {{length:number}}
   * @param {Array|string} keys
   */
  effin["removeAttr"] = function(keys) {
    return each(this, function(e) {
      removeAttr(e, keys);
    });
  };

  effin["toggleAttr"] = function(k, force) {
    return each(this, function(e) {
      toggleAttr(e, k, force);
    });
  };

  return api;
});
