# picodom-component

write native DOM components with [picodom][], a tiny virtual dom implementation.

## Install

```bash
npm install picodom-component picodom
```

## Usage

The API is the same as [nanocomponent][], but instead of returning a DOM element from `createElement`, return a virtual picodom node:

```js
var Picocomponent = require('picodom-component')
var h = require('picodom').h

class Counter extends Picocomponent {
  createElement (count, onclick) {
    this.count = count
    return h('div', {}, [
      count,
      h('button', { onclick: onclick }, '+1')
    ])
  }
  update (count) { return count !== this.count }
}

var count = 0
var counter = new Counter()
function render () {
  return counter.render(count, function onclick () {
    count++
    render()
  })
}
document.body.appendChild(render())
```

`.render()` returns a native DOM element that can be added to the page using `.appendChild` or used inside a [choo][] view or in any other situation where native DOM elements are useful.

### Template string tag

picodom-component also exposes a template string tag function for creating picodom nodes, using [hyperx][]:

```js
var html = require('picodom-component/html')
class Counter extends Picocomponent {
  createElement (count, onclick) {
    this.count = count
    return html`
      <div>
        ${count}
        <button onclick=${onclick}>+1</button>
      </div>
    `
  }
  update (count) { return count !== this.count }
}
```

### JSX

Since the `createElement` method only needs to return a picodom node, JSX can be used just like with bare picodom.

```js
var h = require('picodom').h

class Counter extends Picocomponent {
  createElement (count, onclick) {
    this.count = count
    return <div>
      ${count}
      <button onclick=${onclick}>+1</button>
    </div>
  }
  update (count) { return count !== this.count }
}
```

## API

### `component = Picocomponent()`

Create a new component instance.

### `component.render(...)`

Render the component. Returns a native DOM element.

### `component.element`

The DOM element.

### `Picocomponent.prototype.createElement(...)`

**Must be implemented!**
The component-specific render function--return a picodom node.
Returned picodom nodes must always have the same node type.

### `Picocomponent.prototype.update(...)`

**Must be implemented!**
Determine whether to call `createElement` and patch the DOM element.

### `Picocomponent.prototype.load(el)`

Called when the component is mounted in the DOM. Identical to picodom's `oncreate` event.

### `Picocomponent.prototype.unload(el)`

Called when the component is removed from the DOM. Identical to picodom's `onremove` event.

## License

[MIT](./LICENSE)

[picodom]: https://github.com/picodom/picodom
[nanocomponent]: https://github.com/choojs/nanocomponent
[choo]: https://github.com/choojs/choo
