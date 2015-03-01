!function(root) {
  var doc = root && root.document
  var common = typeof module != 'undefined' && !!module.exports
  var api = common ? require('../src') : root.atts
  var chai = common ? require('chai') : root.chai
  var expect = chai.expect
  var keys = Object.keys
  
  describe('api', function() {
    it('is wrapper', function() {
      expect(api()).to.be.instanceOf(api)
      expect(api(null).length).to.equal(0)
      expect(api({}).length).to.equal(1)
    })
    
    keys && it('has methods', function() {
      var meths = ['atts', 'attr', 'toggleAttr', 'removeAttr', 'isAttr', 'supportAttr', 'anyAttr']
      expect(keys(api).sort().join()).to.equal(meths.sort().join())
    })
      
    keys && it('has prototype methods', function() {
      var meths = ['attr', 'toggleAttr', 'removeAttr']
      expect(keys(api.prototype).sort().join()).to.equal(meths.sort().join())
    })
  })
    
  if (!doc) return // browser tests:
  
  describe('.attr', function() {
    it('sets and gets', function() {
      var k = 'id', v = 'a', e = doc.createElement('div')
      api.attr(e, k, v)
      return expect(api.attr(e, k)).to.equal(v)
    })
    
    it('gets and sets all', function() {
      var e = doc.createElement('div'), o = {'id': 'a', 'data-a': 'a'}
      api.attr(e, o)
      return expect(api.attr(e)).to.deep.equal(o)
    })
    
    it('normalizes to string', function() {
      var k = 'data-a', n = 1, e = doc.createElement('div')
      api.attr(e, k, n)
      return expect(api.attr(e, k)).to.equal(String(n))
    })
    
    it('normalizes to undefined', function() {
      expect(api.attr(doc.createElement('div'), 'data-unset')).to.be.undefined
    })
  })
  
  describe('.removeAttr', function() {
    it('removes', function() {
      var k = 'id', e = doc.createElement('div')
      e.setAttribute(k, 'a')
      api.removeAttr(e, k)
      expect(e.getAttribute(k)).to.not.exist
    })
  })
  
  describe('.toggleAttr', function() {
    it('toggles on', function() {
      var k = 'data-a', e = doc.createElement('div')
      api.toggleAttr(e, k)
      expect(e.getAttribute(k)).to.equal('')
    })

    it('toggles off', function() {
      var k = 'data-a', e = doc.createElement('div')
      e.setAttribute(k, '')
      api.toggleAttr(e, k)
      expect(e.getAttribute(k)).to.not.exist
    })
  })
  
  describe('.isAttr', function() {
    it('detects attr state', function() {
      var custom = 'data-custom', e = doc.createElement('div')
      expect(api.isAttr(e, custom)).to.equal(false)
      e.setAttribute(custom, '')
      expect(api.isAttr(e, custom)).to.equal(true)
    })
  })
  
  describe('.supportAttr', function() {
    it('detects [checked] support', function() {
      var input = doc.createElement('input')
      expect(api.supportAttr(input, 'checked')).to.equal('checked' in input)
    })
    
    it('detects [class] support', function() {
      var e = doc.createElement('div')
      expect(api.supportAttr(e, 'class')).to.equal(true)
    })
    
    it('detects support for camelCase properties', function() {
      var e = doc.createElement('div')
      expect(api.supportAttr(e, 'classname')).to.equal(true)
    })

    it('detects [data-*] support false', function() {
      var e = doc.createElement('div')
      expect(api.supportAttr(e, 'data-arbitrary')).to.equal(false)
    })
  })
}(this);