# atts
#### DOM attributes JavaScript module for [ender](https://github.com/ender-js) or standalone use

```sh
npm install atts --save
```

```js
var atts = require('atts')
```

## API

#### `atts.attr(element, name, value?)`
- Get or set attributes.
- <b>@return</b> string|`undefined`

#### `atts.atts(element, object?)`
- `atts.atts(element)` get object containing all attributes
- `atts.atts(element, object)` set attributes via object
- <b>@return</b> object

#### `atts.removeAttr(element, names)`
- Remove attributes.
- <b>@return</b> `undefined`

#### `atts.toggleAttr(element, name, state?)`
- Toggle an attribute's presence and return boolean state.
- <b>@return</b> boolean

#### `atts.isAttr(element, name)`
- Is attribute `name` present on `element`?
- <div><b>@return</b> boolean</div>

#### `atts.supportAttr(element, name)`
- Test if `element` supports an attribute.
- <b>@return</b> boolean

#### `atts.anyAttr(element, fn?, scope?)`
- Count or iterate <var>element</var>'s attributes.
- <b>@return</b> number

### Chain methods
These exist on `atts.prototype` and are designed for integration into jQuery-like libs but can also be used via `atts.prototype[method].call`. Methods are generally compatible with [jQuery methods](http://api.jquery.com/category/manipulation/general-attributes/) of the same name.

- `.attr(name, value?)`
- `.atts(object?)`
- `.removeAttr(ssv)`
- `.toggleAttr(name, force?)`
