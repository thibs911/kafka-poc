'use strict';

module.exports = function (server) {
  const router = server.loopback.Router(); //eslint-disable-line new-cap
  router.get('/api', server.loopback.status());
  server.use(router);
};
