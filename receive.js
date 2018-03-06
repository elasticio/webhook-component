"use strict";
var Q = require("q");

exports.process = function (msg, conf) {
    let msgId = msg.id;
    console.log("Received new message with id", msgId);
    console.log(msg);

    if (msg.query && msg.body) {
        msg.body._query = msg.query;
    }

    var self = this;

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