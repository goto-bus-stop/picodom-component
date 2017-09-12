'use strict'
var test = require('tape')
var h = require('picodom').h
var Picocomponent = require('../')

test('server-rendered picodom-component', function (t) {
  class TestComponent extends Picocomponent {
    createElement (value) {
      return h('div', {}, value)
    }
  }

  var component = new TestComponent
  t.equal(component.render('hello').toString(), '<div>hello</div>')
  t.end()
})
