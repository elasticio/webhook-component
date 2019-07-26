"use strict";
const Q = require("q");

exports.process = function (msg, conf) {
    const msgId = msg.id;
    console.log("Received new message with id", msgId);
    console.log(msg);

    if (msg.body) {
        if (msg.query) {
            msg.body._query = msg.query;
        }

        if (msg.headers) {
            msg.body._headers = msg.headers;
        }
        if (msg.method) {
            msg.body.__method = msg.method;
        }

        if (msg.url) {
            msg.body._url = msg.url;
        }

        if (msg.additionalUrlPath) {
            msg.body._additionalUrlPath = msg.additionalUrlPath;
        }

        console.log('Updated body', msg.body);
    }


    let self = this;

    Q()
        .then(emitData)
        .fail(onError)
        .finally(onEnd);

    function emitData() {
        console.log("Emitting data of message:", msgId);
        self.emit('data', msg);
    }

    function onError(e) {
        console.log(e);
        self.emit('error', e);
    }

    function onEnd() {
        console.log("Finished processing message:", msgId);
        self.emit('end');
    }
};

