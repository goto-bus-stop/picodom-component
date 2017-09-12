var toString = require('hyperapp-server').toString

module.exports = function stringify (vnode) {
  var wrap = new String(toString(vnode))
  wrap.__encoded = true
  return wrap
}
