!function(root) {
  var doc = root && root.document
  var common = typeof module != "undefined" && !!module.exports
  var api = common ? require("./") : root.atts

  if (!doc) return void require("open")("test.html")

  var chai = common ? require("chai") : root.chai
  var expect = chai.expect
  var keys = Object.keys

  describe("api", function() {
    it("is wrapper", function() {
      expect(api()).to.be.instanceOf(api)
      expect(api(null).length).to.equal(0)
      expect(api({}).length).to.equal(1)
    })

    keys && it("has methods", function() {
      var meths = ["atts", "attr", "toggleAttr", "removeAttr", "isAttr", "supportAttr", "anyAttr"]
      expect(keys(api).sort().join()).to.equal(meths.sort().join())
    })

    keys && it("has prototype methods", function() {
      var meths = ["atts", "attr", "toggleAttr", "removeAttr"]
      expect(keys(api.prototype).sort().join()).to.equal(meths.sort().join())
    })
  })

  // remaining tests need a browser
  if (!doc) return

  describe("#attr", function() {
    it("sets and gets", function() {
      var k = "id"
      var v = "a"
      var e = doc.createElement("div")
      api.attr(e, k, v)
      return expect(api.attr(e, k)).to.equal(v)
    })

    it("normalizes to string", function() {
      var k = "data-a"
      var n = 1
      var e = doc.createElement("div")
      api.attr(e, k, n)
      return expect(api.attr(e, k)).to.equal(String(n))
    })

    it("normalizes to undefined", function() {
      expect(api.attr(doc.createElement("div"), "data-unset")).to.be.undefined
    })
  })

  describe("#atts", function() {
    it("gets and sets all", function() {
      var e = doc.createElement("div")
      var o = {"id": "a", "data-a": "a"}
      api.atts(e, o)
      return expect(api.atts(e)).to.deep.equal(o)
    })
  })

  describe("#removeAttr", function() {
    it("removes", function() {
      var k = "id"
      var e = doc.createElement("div")
      e.setAttribute(k, "a")
      api.removeAttr(e, k)
      expect(e.getAttribute(k)).to.not.exist
    })
  })

  describe("#toggleAttr", function() {
    it("toggles on", function() {
      var k = "data-a"
      var e = doc.createElement("div")
      api.toggleAttr(e, k)
      expect(e.getAttribute(k)).to.equal("")
    })

    it("toggles off", function() {
      var k = "data-a"
      var e = doc.createElement("div")
      e.setAttribute(k, "")
      api.toggleAttr(e, k)
      expect(e.getAttribute(k)).to.not.exist
    })

    it("toggles with force", function() {
      var k = "data-a", e = doc.createElement("div")
      api.toggleAttr(e, k, true)
      expect(e.getAttribute(k)).to.equal("")
      api.toggleAttr(e, k, false)
      expect(e.getAttribute(k)).to.not.exist
    })
  })

  describe("#isAttr", function() {
    it("detects attr state", function() {
      var custom = "data-custom", e = doc.createElement("div")
      expect(api.isAttr(e, custom)).to.equal(false)
      e.setAttribute(custom, "")
      expect(api.isAttr(e, custom)).to.equal(true)
    })
  })

  describe("#supportAttr", function() {
    it("detects [checked] support", function() {
      var input = doc.createElement("input")
      expect(api.supportAttr(input, "checked")).to.equal("checked" in input)
    })

    it("detects [class] support", function() {
      var e = doc.createElement("div")
      expect(api.supportAttr(e, "class")).to.equal(true)
    })

    it("detects [for] support", function() {
      var e = doc.createElement("label")
      expect(api.supportAttr(e, "for")).to.equal(true)
    })

    it("detects support for camelCase properties", function() {
      var e = doc.createElement("div")
      expect(api.supportAttr(e, "classname")).to.equal(true)
    })

    it("detects [data-*] support false", function() {
      var e = doc.createElement("div")
      expect(api.supportAttr(e, "data-arbitrary")).to.equal(false)
    })
  })

  // remaining tests aren"t needed in old browsers
  if (!keys) return

  describe(".attr", function() {
    it("sets and gets", function() {
      var k = "id", v = "a", e = doc.createElement("div")
      return expect(api(e).attr(k, v).attr(k)).to.equal(v)
    })

    it("sets via function", function() {
      var k = "id", v = "a", e = doc.createElement("div")
      return expect(api(e).attr(k, function() {
        return v
      }).attr(k)).to.equal(v)
    })

    it("sets for each", function() {
      var k = "class", v = "test", stack = [doc.createElement("div"), doc.createElement("div")]
      api.prototype.attr.call(stack, k, v)
      expect(api.attr(stack[0], k)).to.equal(v)
      expect(api.attr(stack[1], k)).to.equal(v)
    })
  })

  describe(".atts", function() {
    it("gets and sets all", function() {
      var e = doc.createElement("div"), o = {"id": "a", "data-a": "a"}
      return expect(api(e).atts(o).atts()).to.deep.equal(o)
    })
  })

  describe(".removeAttr", function() {
    function check(stack) {
      stack.forEach(function(e) {
        list.forEach(function(k) {
          expect(api.attr(e, hash[k])).to.be.undefined
        })
      })
    }
    var hash = {"data-custom": "", "hidden": ""}
    var list = keys(hash)

    it("removes ssv for each", function() {
      var stack = [doc.createElement("div"), doc.createElement("div")]
      api.prototype.atts.call(stack, hash)
      api.prototype.removeAttr.call(stack, keys(hash).join(" "))
      check(stack)
    })

    it("removes array for each", function() {
      var stack = [doc.createElement("div"), doc.createElement("div")]
      api.prototype.atts.call(stack, hash)
      api.prototype.removeAttr.call(stack, keys(hash))
      check(stack)
    })
  })

  describe(".toggleAttr", function() {
    it("toggles for each", function() {
      var stack = [doc.createElement("div"), doc.createElement("div")]
      var k = "hidden"
      api.prototype.attr.call(stack, k, "")
      api.prototype.toggleAttr.call(stack, k)
      stack.forEach(function(e) {
        expect(api.attr(e, k)).to.be.undefined
      })
    })

    it("toggles with force", function() {
      var e = doc.createElement("div")
      var k = "hidden"
      expect(api(e).attr(k, "").toggleAttr(k, false).attr(k)).to.be.undefined
    })
  })
}(this);
