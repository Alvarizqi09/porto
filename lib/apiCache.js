// Shared cache for API routes
const cache = new Map();
const CACHE_DURATION = 25000; // 25 seconds

export function getCacheKey(route, params = {}) {
  const paramStr = Object.values(params).join("-");
  return paramStr ? `${route}-${paramStr}` : route;
}

export function getFromCache(key) {
  if (!cache.has(key)) return null;

  const cachedData = cache.get(key);
  if (Date.now() - cachedData.timestamp > CACHE_DURATION) {
    cache.delete(key);
    return null;
  }

  return cachedData.data;
}

export function setCache(key, data) {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
}

export function clearCache() {
  cache.clear();
}

export function clearCacheByPrefix(prefix) {
  for (const key of cache.keys()) {
    if (key.startsWith(prefix)) {
      cache.delete(key);
    }
  }
}
