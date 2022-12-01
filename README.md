<div align="center">

A simple way to use localStorage, sessionStorage.

</div>

## 🔨 Usage

### 📦 install

```bash
npm install tinystore

# or

yarn add tinystore

# or

pnpm add tinystore
```

### 🪖 packages

esmodule(recommended):

```ts

import { createStorage } from 'tinystore'

```

commonjs:

```ts
const { createStorage } = require('tinystore')
```

used as umd:

```html
<script src="https://unpkg.com/tinystore"></script>
```

```js

tinystore.createStorage

```

## 📚 Documentation

core methods:

```ts

import { createStorage, createLocalStore, createSessionStorage, createMemoryStorage } from 'tinystore'

/**
 * createStorage 
 * @param { 'local' | 'session' | 'memory' } type It corresponds to localStorage, sessionStorage and memoryStorage using additional implementations.
 * @param { string | undefined } namespace it will be prefixed to the key.
 * @param { { serialize: Function, deserialize: Function } } options You can pass in custom serialize and deserialize functions to handle structured data, such as array, object. By default, `json.stringify` or `json.parse` will be used.
 */

```

We recommend that you create a store using the namespace, like:

```ts

import { createLocalStore } from 'tinystore'

const myNamespace = createLocalStorage('my')

```

If the first parameter is empty, it will use the global namespace.

```ts

const AnotherLocalStorage = createLocalStorage()

```
