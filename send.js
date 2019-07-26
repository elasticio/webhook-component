var request = require('./request.js');
var DEFAULT_METHOD = 'POST';

exports.process = function(msg, conf) {
    request.putOrPost.call(this, conf.method || DEFAULT_METHOD, msg, conf);
};
