var Q = require("q");

exports.process = function (msg, conf) {
    console.log("Received new message");
    console.log(msg);

    var self = this;

    Q()
        .then(emitData)
        .fail(onError)
        .finally(onEnd);

    function emitData() {
        console.log("Emitting data");
        self.emit('data', msg);
    }

    function onError(e) {
        console.log(e);
        self.emit('error', e);
    }

    function onEnd() {
        console.log("Emitting end");
        self.emit('end');
    }
};