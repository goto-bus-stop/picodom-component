'use strict'
var test = require('tape')
var h = require('picodom').h
var Picocomponent = require('../')

test('rendering', function (t) {
  class TestComponent extends Picocomponent {
    createElement (value) {
      return h('div', {}, value)
    }
    update () { return true }
  }

  var component = new TestComponent
  var wrapper = document.createElement('div')
  var el = component.render('abc')
  wrapper.appendChild(el)
  t.equal(wrapper.innerHTML, '<div>abc</div>', 'should return native DOM elements')

  var el2 = component.render('def')
  t.equal(wrapper.innerHTML, '<div>def</div>', 'should patch dom with new props')

  t.ok(el.isSameNode(el2), 'should return the same node')

  t.end()
})

test('lifecycle', function (t) {
  var loaded = false
  var unloaded = false
  var createElements = 0
  class TestComponent extends Picocomponent {
    createElement () {
      createElements ++
      return h('div')
    }
    load () {
      loaded = true
    }
    unload () {
      unloaded = true
    }
    update () {
      return false
    }
  }

  var component = new TestComponent
  var el = component.render()
  document.body.appendChild(el)
  setTimeout(checkLoaded)
  function checkLoaded () {
    t.ok(loaded, 'should have called load')

    component.render()
    t.equal(createElements, 1, 'should have prevented an update')

    document.body.removeChild(el)
    setTimeout(checkUnloaded)
  }
  function checkUnloaded () {
    t.ok(unloaded, 'should have called unload')

    t.end()
  }
})
