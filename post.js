var request = require('./request.js');

exports.process = function (msg, conf, next) {

    request.putOrPost('POST', msg, conf, next);
};