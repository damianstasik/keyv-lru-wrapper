# keyv-lru-wrapper
Keyv storage adapter wrapper which adds an LRU cache layer.

## Installation
```bash
yarn add keyv-lru-wrapper

npm i keyv-lru-wrapper
```

## Usage
```js
const Keyv = require('keyv');
const KeyvRedis = require('@keyv/redis');
const lruWrapper = require('keyv-lru-wrapper');

const redis = new KeyvRedis('redis://user:pass@localhost:6379');

const keyv = new Keyv({
  store: lruWrapper(redis, {
    maxItems: 100,
    ttl: 1000 * 60 * 60 * 24,
  }),
});
```
