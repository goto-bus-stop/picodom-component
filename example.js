var Pico = require('./')
var html = require('./html')

var count = 0

class Counter extends Pico {
  createElement (count, onclick) {
    this.count = count
    return html`
      <div style=${{ margin: '10px' }}>
        <span onupdate=${onupdate}>${count}</span>
        <button onclick=${onclick}>+1</button>
      </div>
    `
    function onupdate () {
      console.log('count:', count)
    }
  }
  update (count) { return count !== this.count }
}

var counter = new Counter()

function render () {
  return counter.render(count, function () {
    count++
    render()
  })
}

document.body.appendChild(render())
