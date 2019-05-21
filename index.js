const lru = require('tiny-lru');

module.exports = (adapter, options) => {
  const { maxItems = 50, ttl } = options;
  const cache = lru(maxItems, ttl);

  return {
    ...adapter,
    async get(key) {
      let item = cache.get(key);

      if (item) {
        return item;
      }

      item = await adapter.get(key);

      if (item) {
        cache.set(key, item);
      }

      return item;
    },
    set(key, value, ...rest) {
      cache.set(key, value);

      return adapter.set(key, value, ...rest);
    },
    delete(key) {
      cache.delete(key);

      return adapter.delete(key);
    },
    clear() {
      cache.clear();

      return adapter.clear();
    },
  };
}
