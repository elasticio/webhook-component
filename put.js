var request = require('./request.js');

exports.process = function (msg, conf, next) {

    request.putOrPost('PUT', msg, conf, next);
};