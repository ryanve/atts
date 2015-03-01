# atts
#### DOM attributes JavaScript module for [ender](https://github.com/ender-js) or standalone use

```sh
npm install atts --save
```

```js
var atts = require('atts')
```

## API
- Methods are generally compatible with [jQuery methods](http://api.jquery.com/category/manipulation/general-attributes/) of the same name

#### `atts.attr(element, name?, value?)`
- Get or set attributes.
- <b>@return</b> mixed

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

## License
MIT
