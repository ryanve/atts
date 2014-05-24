!function(root) {
  var doc = root && root.document
  var common = typeof module != 'undefined' && !!module.exports
  var api = common ? require('../src') : root.atts
  var chai = common ? require('chai') : root.chai
  var expect = chai.expect
  
  describe('existance', function() {
    it('is of Object', function() {
      return expect(api).to.be.instanceOf(Object)
    })
    
    it('has methods', function() {
      return ['atts', 'attr', 'toggleAttr', 'removeAttr', 'hasAttr', 'anyAttr'].every(function(method) {
        return expect(typeof api[method]).to.equal('function')
      })
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
}(this);