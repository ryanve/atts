/*!
 * atts 0.0.2+201503010140
 * https://github.com/ryanve/atts
 * MIT License (c) 2015 Ryan Van Etten
 */
!function(root, name, make) {
  if (typeof module != 'undefined' && module.eapis) module.eapis = make();
  else root[name] = make();
}(this, 'atts', function() {

  var ssv = /\S+/g
    , api = {}
    , effin = api['fn'] = {}
    , owns = api.hasOwnProperty
    , setAttr = 'setAttribute'
    , getAttr = 'getAttribute'
    , remAttr = 'removeAttribute'
    , unbox = 'valueOf';
  
  /**
   * Count (or iterate) an element's attributes.
   * @param {Element} e element 
   * @param {(Function|number)=} fn or index, fns break as in [].some
   * @param {*=} scope defaults to `e`
   * @return {number} #attributes (#iterations if any pass, 0 if none)
   */
  function anyAttr(e, fn, scope) {
    var a, o = e.attributes, l = o && o.length, i = 0;
    if (typeof fn != 'function') return +l || 0;
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
  }
  
  /**
   * @param {Element} e element
   * @param {(string|String|Object)=} k attribute name
   * @param {(string|boolean|null)=} v attribute value
   */  
  function attr(e, k, v) {
    if (1 !== e.nodeType) throw new TypeError('@0');
    if (void 0 === k && k === v) return getAtts(e);
    k = k[unbox](); // throws on null
    if (typeof k != 'string') setAtts(e, k);
    else if (void 0 === v) return null == (k = e[getAttr](k)) ? v : '' + k;
    else if (null === v) e[remAttr](k);
    else if (typeof v == 'boolean') toggleAttr(e, k, v);
    else e[setAttr](k, v = '' + v);
    return v;
  }
  
  /**
   * @param {Element} e
   * @param {Array|string} keys
   */
  function removeAttr(e, keys) {
    keys = typeof keys == 'string' ? keys.match(ssv) : [].concat(keys);
    for (var i = keys && keys.length; i--;) e[remAttr](keys[i]);
  }
  
  /**
   * @param {Element} e
   * @param {string} k attribute name
   * @param {boolean=} force
   * @return {boolean}
   */
  function toggleAttr(e, k, force) {
    typeof force == 'boolean' || (force = null == e[getAttr](k) || e[k] === false);
    var opposite = !force;
    force ? e[setAttr](k, '') : e[remAttr](k);
    return e[k] === opposite ? e[k] = force : force;
  }
  
  /**
   * hasAttr(element, name) tests if element *has* the attribute now
   * hasAttr(name, element) tests if element *supports* the attribute
   * @param {string|Element} e
   * @param {string|Node} n
   * @return {boolean}
   */
  function hasAttr(e, n) {
    if (typeof e != 'string') return null != e[getAttr](n);
    n = typeof n != 'number' ? n || 'div' : this[unbox](); // arrays 
    n = typeof n != 'string' ? n : document.createElement(n); // tags
    if (e in n) return true; // Case-sensitive check catches most inputs.
    if ('class' === e) return 'className' in n;
    // Do case-insensitive check on all enumerables to cover inputs 
    // like "contenteditable" whose property is "contentEditable"
    for (var p in n) if (e.toLowerCase() === p.toLowerCase()) return true;
    return false;
  }

  /** 
   * @param {{length:number}} stack
   * @param {Function} fn
   */
  function each(stack, fn) {
    for (var l = stack.length, i = 0; i < l; i++) fn(stack[i]);
    return stack;
  }
  
  api['attr'] = attr;
  api['atts'] = getAtts;
  api['hasAttr'] = hasAttr;
  api['anyAttr'] = anyAttr;
  api['removeAttr'] = removeAttr;
  api['toggleAttr'] = toggleAttr;
  
  /**
   * @this {{length:number}}
   * @param {(string|Object)=} k
   * @param {*=} v
   */  
  effin['attr'] = function(k, v) {
    return void 0 !== v || k !== v && typeof(k = k[unbox]()) != 'string' ? each(this, function(e) {
      var x = typeof v == 'function' ? v.call(e) : v;
      void 0 === x || attr(e, k, x);
    }) : attr(this[0], k);
  };
  
  /**
   * Remove attributes for each element in a collection.
   * @this {{length:number}}
   * @param {Array|string} keys
   */
  effin['removeAttr'] = function(keys) {
    return each(this, function(e) {
      removeAttr(e, keys);
    });
  };
  
  effin['toggleAttr'] = function(k, force) {
    return each(this, function(e) {
      toggleAttr(e, k, force);
    });
  };

  return api;
});