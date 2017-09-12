var assert = require('assert')
var picodom = require('picodom')
var onload = require('on-load')
var stringify = require('./stringify')

module.exports = Component

function Component () {
  this.browser = typeof window !== 'undefined'
  this.element = null
  this.node = null
}

Component.prototype.render = function () {
  if (!this.browser && typeof stringify === 'function') {
    return stringify(this.createElement.apply(this, arguments))
  }

  if (this.node) {
    var shouldUpdate = this.update.apply(this, arguments)
    if (!shouldUpdate) {
      return this.element
    }
  }

  var node = this.createElement.apply(this, arguments)
  if (this.node) {
    assert.equal(this.node.tag, node.tag, 'picodom-component: createElement must return same root node type')
  }
  addLifecycleHooks(this, node)

  this.element = picodom.patch(this.node, node, this.element)
  this.node = node

  if (this.afterupdate) {
    this.afterupdate(this.element)
  }

  return this.element
}

Component.prototype.createElement = function () {
  throw new Error('picodom-component: createElement should be implemented!')
}
Component.prototype.update = function () {
  throw new Error('picodom-component: update should be implemented!')
}

function addLifecycleHooks (component, node) {
  if (!component.load && !component.unload)  {
    return
  }

  var oncreate = node.oncreate
  node.data.oncreate = function (el) {
    if (oncreate) oncreate(el)

    onload(el, function () {
      if (component.load) component.load(el)
    }, function () {
      if (component.unload) component.unload(el)
    })
  }
}
