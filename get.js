var request = require('./request.js');

exports.process = function (msg, conf, next) {

    request.get(msg, conf, next);
};