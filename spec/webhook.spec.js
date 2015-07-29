var put = require('../put.js');
var post = require('../post.js');
var getMethod = require('../get.js');
var receive = require('../receive.js');
var nock = require('nock');

describe("Webhook", function () {

    describe("Outbound", function () {

        var endFunc = {};
        var newMsg, calledErr;

        var webhookReturnObj = "{message: 'ok', other: 'returned'}";

        beforeEach(function() {
            endFunc.next = function(){};
            spyOn(endFunc, 'next').andCallFake(function(err, obj) {
                newMsg = obj;
                calledErr = err;
            });
        });

        it('PUT No Auth', function () {
            var nockObj = nock('http://www.example.com').put('/test', {k1:'v1', k2:'v2'}).matchHeader('Content-Type', 'application/json;charset=UTF-8').reply(200, webhookReturnObj);

            runs(function() {
                put.process({body:{k1:'v1', k2:'v2'}}, {uri: 'http://www.example.com/test'}, endFunc.next);
            });

            waitsFor(function(){
                return endFunc.next.calls.length > 0;
            }, 'Timed Out', 1000);

            runs(function(){
                expect(nockObj.isDone());
                expect(endFunc.next).toHaveBeenCalledWith(null, jasmine.any(Object));
                expect(newMsg.body);
                expect(newMsg.body).toEqual(webhookReturnObj);
            });
        });

        it('PUT Auth', function () {
            var nockObj = nock('http://www.example.com').put('/test', {k1:'v1', k2:'v2'}).matchHeader('Content-Type', 'application/json;charset=UTF-8').matchHeader('X-Api-Secret', 'theSecret').reply(200, webhookReturnObj);

            runs(function() {
                put.process({body:{k1:'v1', k2:'v2'}}, {uri: 'http://www.example.com/test', secret:'theSecret'}, endFunc.next);
            });

            waitsFor(function(){
                return endFunc.next.calls.length > 0;
            }, 'Timed Out', 1000);

            runs(function(){
                expect(nockObj.isDone());
                expect(endFunc.next).toHaveBeenCalledWith(null, jasmine.any(Object));
                expect(newMsg.body);
                expect(newMsg.body).toEqual(webhookReturnObj);
            });
        });

        it('POST No Auth', function () {
            var nockObj = nock('http://www.example.com').post('/test', {k1:'v1', k2:'v2'}).matchHeader('Content-Type', 'application/json;charset=UTF-8').reply(200, webhookReturnObj);

            runs(function() {
                post.process({body:{k1:'v1', k2:'v2'}}, {uri: 'http://www.example.com/test'}, endFunc.next);
            });

            waitsFor(function(){
                return endFunc.next.calls.length > 0;
            }, 'Timed Out', 1000);

            runs(function(){
                expect(nockObj.isDone());
                expect(endFunc.next).toHaveBeenCalledWith(null, jasmine.any(Object));
                expect(newMsg.body);
                expect(newMsg.body).toEqual(webhookReturnObj);
            });
        });

        it('POST Auth', function () {
            var nockObj = nock('http://www.example.com').post('/test', {k1:'v1', k2:'v2'}).matchHeader('Content-Type', 'application/json;charset=UTF-8').matchHeader('X-Api-Secret', 'theSecret').reply(200, webhookReturnObj);

            runs(function() {
                post.process({body:{k1:'v1', k2:'v2'}}, {uri: 'http://www.example.com/test', secret:'theSecret'}, endFunc.next);
            });

            waitsFor(function(){
                return endFunc.next.calls.length > 0;
            }, 'Timed Out', 1000);

            runs(function(){
                expect(nockObj.isDone());
                expect(endFunc.next).toHaveBeenCalledWith(null, jasmine.any(Object));
                expect(newMsg.body);
                expect(newMsg.body).toEqual(webhookReturnObj);
            });
        });

        it('GET No Auth No QMark', function () {
            var nockObj = nock('http://www.example.com').get('/test?k1=v1&k2=v2').reply(200, webhookReturnObj);

            runs(function() {
                getMethod.process({body:{k1:'v1', k2:'v2'}}, {uri: 'http://www.example.com/test'}, endFunc.next);
            });

            waitsFor(function(){
                return endFunc.next.calls.length > 0;
            }, 'Timed Out', 1000);

            runs(function(){
                expect(nockObj.isDone());
                expect(endFunc.next).toHaveBeenCalledWith(null, jasmine.any(Object));
                expect(newMsg.body);
                expect(newMsg.body).toEqual(webhookReturnObj);
            });
        });

        it('GET Auth No QMark', function () {
            var nockObj = nock('http://www.example.com').get('/test?k1=v1&k2=v2').matchHeader('X-Api-Secret', 'theSecret').reply(200, webhookReturnObj);

            runs(function() {
                getMethod.process({body:{k1:'v1', k2:'v2'}}, {uri: 'http://www.example.com/test', secret:'theSecret'}, endFunc.next);
            });

            waitsFor(function(){
                return endFunc.next.calls.length > 0;
            }, 'Timed Out', 1000);

            runs(function(){
                expect(nockObj.isDone());
                expect(endFunc.next).toHaveBeenCalledWith(null, jasmine.any(Object));
                expect(newMsg.body);
                expect(newMsg.body).toEqual(webhookReturnObj);
            });
        });

        it('GET No Auth QMark', function () {
            var nockObj = nock('http://www.example.com').get('/test?k1=v1&k2=v2').reply(200, webhookReturnObj);

            runs(function() {
                getMethod.process({body:{k1:'v1', k2:'v2'}}, {uri: 'http://www.example.com/test?'}, endFunc.next);
            });

            waitsFor(function(){
                return endFunc.next.calls.length > 0;
            }, 'Timed Out', 1000);

            runs(function(){
                expect(nockObj.isDone());
                expect(endFunc.next).toHaveBeenCalledWith(null, jasmine.any(Object));
                expect(newMsg.body);
                expect(newMsg.body).toEqual(webhookReturnObj);
            });
        });

        it('GET Auth QMark', function () {
            var nockObj = nock('http://www.example.com').get('/test?k1=v1&k2=v2').matchHeader('X-Api-Secret', 'theSecret').reply(200, webhookReturnObj);

            runs(function() {
                getMethod.process({body:{k1:'v1', k2:'v2'}}, {uri: 'http://www.example.com/test?', secret:'theSecret'}, endFunc.next);
            });

            waitsFor(function(){
                return endFunc.next.calls.length > 0;
            }, 'Timed Out', 1000);

            runs(function(){
                expect(nockObj.isDone());
                expect(endFunc.next).toHaveBeenCalledWith(null, jasmine.any(Object));
                expect(newMsg.body);
                expect(newMsg.body).toEqual(webhookReturnObj);
            });
        });

        it('404', function () {
            var nockObj = nock('http://www.example.com').get('/test?k1=v1&k2=v2').matchHeader('X-Api-Secret', 'theSecret').reply(404);

            runs(function () {
                getMethod.process({body: {k1: 'v1', k2: 'v2'}}, {uri: 'http://www.example.com/test?', secret: 'theSecret'}, endFunc.next);
            });

            waitsFor(function () {
                return endFunc.next.calls.length > 0;
            }, 'Timed Out', 1000);

            runs(function () {
                expect(nockObj.isDone());
                expect(endFunc.next).toHaveBeenCalledWith(jasmine.any(Object));
                expect(calledErr.message).toEqual('Endpoint responds with 404');
            });
        });
    });


    it('Inbound', function () {
        var msg = {
          body: {
              foo: "bar"
          }
        };

        receive.process(msg, {}, function(err, newMsg, newSnapshot){
            expect(err).toBeNull();

            expect(newMsg).toEqual(msg);

            expect(newSnapshot).toBeUndefined();
        });

    });
});