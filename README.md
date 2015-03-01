# atts
#### DOM attributes JavaScript module for ender or standalone use

```js
var atts = require('atts')
```

## API

#### `atts.attr(element, name?, value?)`
Get or set attributes.

#### `atts.removeAttr(element, names)`
Remove attributes.

#### `atts.toggleAttr(element, name, state?)`
Toggle an attribute's presence and return boolean state.

#### `atts.hasAttr(name, element|tagName)`
Test if `element` <strong>supports</strong> an attribute.

#### `atts.hasAttr(element, name)`
Test  if an attribute is <strong>present</strong> on `element`.

#### `atts.anyAttr(element, fn?, scope?)`
Count or iterate <var>element</var>'s attributes.

## License
MIT
