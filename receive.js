exports.process = function (msg, conf) {
    this.emit('data', msg);
    this.emit('end');
};