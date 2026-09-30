const appModule = require('./dist/server.js');
const app = appModule && appModule.default ? appModule.default : appModule;

module.exports = app;
module.exports.default = app;
