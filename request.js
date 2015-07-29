var request = require('request');
var qs = require('querystring');
var messages = require('../messages.js');

exports.putOrPost = function (method, msg, conf, next) {
    'use strict';
    var uri = conf.uri;
    var body = msg.body;

    var requestSettings = buildRequestSettings(method, uri, conf.secret);
    requestSettings.body = JSON.stringify(body);
    requestSettings.headers['Content-Type'] = 'application/json;charset=UTF-8';

    request(requestSettings, function (err, response, body) {
        callback(err, response, body, next);
    });
};

exports.get = function (msg, conf, next) {
    'use strict';
    var uri = conf.uri;

    // Check if URI ends in ?  If it doesn't add one.
    if(uri.charAt(uri.length - 1) !== '?') {
        uri += '?';
    }

    uri += qs.stringify(msg.body);

    var requestSettings = buildRequestSettings('GET', uri, conf.secret);
    request(requestSettings, function (err, response, body) {
        callback(err, response, body, next);
    });
};

function buildRequestSettings(method, uri, secret) {
    'use strict';
    var requestSettings = {
        uri: uri,
        method: method,
        headers: {}
    };

    if(secret) {
        requestSettings.headers['X-Api-Secret'] = secret;
    }

    return requestSettings;
}


var callback = function (err, response, body, next) {
    'use strict';
    if (err) {
        return next(err);
    }

    var sc = response.statusCode;

    if (sc >= 200 && sc <= 206) {
        next(null, messages.newMessageWithBody(body));
    } else {
        next(new Error('Endpoint responds with ' + sc));
    }
};