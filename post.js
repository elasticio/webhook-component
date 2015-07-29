var request = require('./request.js');

exports.process = function (msg, conf) {
    request.putOrPost.call(this, 'POST', msg, conf);
};