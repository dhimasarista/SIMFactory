const cache = require("memory-cache")

const cacheMiddleware = (req, res, next) => {
    const key = '__express__' + req.originalUrl || req.url;
    const cachedBody = cache.get(key);
    if (cachedBody) {
      res.send(cachedBody);
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        cache.put(key, body);
        res.sendResponse(body);
      };
      next();
    }
  };

module.exports = cacheMiddleware;