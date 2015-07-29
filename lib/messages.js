var uuid = require('node-uuid');

exports.newMessageWithBody = newMessageWithBody;
exports.newEmptyMessage = newEmptyMessage;

function newMessageWithBody(body) {
    var msg = newEmptyMessage();
    msg.body = body;
    return msg;
}

function newEmptyMessage() {
    return {
        id: uuid.v1(),
        attachments: {},
        body: {},
        headers: {},
        metadata: {}
    };
}
