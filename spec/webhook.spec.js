describe("Webhook", function () {

    var send = require('../send.js');
    var getMethod = require('../get.js');
    var receive = require('../receive.js');
    var nock = require('nock');

    var self;

    beforeEach(function(){
        self = jasmine.createSpyObj('self', ['emit']);
    });

    describe("Outbound", function () {
        var webhookReturnObj = {message: 'ok', other: 'returned'};

        it('PUT No Auth', function () {
            var nockObj = nock('http://www.example.com')
                .put('/test', {k1:'v1', k2:'v2'})
                .matchHeader('Content-Type', 'application/json;charset=UTF-8')
                .reply(200, webhookReturnObj, {
                    'Content-type': 'application/json;charset=UTF-8'
                });

            runs(function() {
                send.process.call(self, {
                    body:{k1:'v1', k2:'v2'}
                }, {
                    uri: 'http://www.example.com/test',
                    method: 'PUT'
                });
            });

            waitsFor(function(){
                return self.emit.calls.length === 2;
            }, 'Timed Out', 1000);

            runs(function(){
                expect(nockObj.isDone());
                expect(self.emit.calls[0].args[0]).toEqual('data');
                expect(self.emit.calls[0].args[1].body).toEqual(webhookReturnObj);
                expect(self.emit.calls[1].args).toEqual(['end']);
            });
        });

        it('PUT Auth', function () {
            var nockObj = nock('http://www.example.com')
                .put('/test', {k1:'v1', k2:'v2'})
                .matchHeader('Content-Type', 'application/json;charset=UTF-8')
                .matchHeader('X-Api-Secret', 'theSecret')
                .reply(200, webhookReturnObj, {
                    'Content-type': 'application/json;charset=UTF-8'
                });

            runs(function() {
                send.process.call(self, {
                    body:{k1:'v1', k2:'v2'}
                }, {
                    uri: 'http://www.example.com/test',
                    secret:'theSecret',
                    method: 'PUT'
                });
            });

            waitsFor(function(){
                return self.emit.calls.length === 2;
            }, 'Timed Out', 1000);

            runs(function(){
                expect(nockObj.isDone());
                expect(self.emit.calls[0].args[0]).toEqual('data');
                expect(self.emit.calls[0].args[1].body).toEqual(webhookReturnObj);
                expect(self.emit.calls[1].args).toEqual(['end']);
            });
        });

        it('POST and get text/html response', function () {
            var nockObj = nock('http://www.example.com')
                .post('/test', {k1:'v1', k2:'v2'})
                .matchHeader('Content-Type', 'application/json;charset=UTF-8')
                .reply(200, webhookReturnObj, {
                        'Content-type': 'text/html; charset=utf-8'
                });

            runs(function() {
                send.process.call(self, {
                    body:{k1:'v1', k2:'v2'}
                }, {
                    uri: 'http://www.example.com/test'
                });
            });

            waitsFor(function(){
                return self.emit.calls.length === 2;
            }, 'Timed Out', 1000);

            runs(function(){
                expect(nockObj.isDone());
                expect(self.emit.calls[0].args[0]).toEqual('data');
                expect(self.emit.calls[0].args[1].body).toEqual({
                    responseBody : '{"message":"ok","other":"returned"}'
                });
                expect(self.emit.calls[1].args).toEqual(['end']);
            });
        });

        it('POST Auth', function () {
            var nockObj = nock('http://www.example.com')
                .post('/test', {k1:'v1', k2:'v2'})
                .matchHeader('Content-Type', 'application/json;charset=UTF-8')
                .matchHeader('X-Api-Secret', 'theSecret')
                .reply(200, webhookReturnObj, {
                    'Content-type': 'application/json;charset=UTF-8'
                });

            runs(function() {
                send.process.call(self, {
                    body:{k1:'v1', k2:'v2'}
                }, {
                    uri: 'http://www.example.com/test',
                    secret:'theSecret'
                });
            });

            waitsFor(function(){
                return self.emit.calls.length === 2;
            }, 'Timed Out', 1000);

            runs(function(){
                expect(nockObj.isDone());
                expect(self.emit.calls[0].args[0]).toEqual('data');
                expect(self.emit.calls[0].args[1].body).toEqual(webhookReturnObj);
                expect(self.emit.calls[1].args).toEqual(['end']);
            });
        });

        it('POST Auth', function () {
            var nockObj = nock('http://www.example.com')
                .post('/test', {k1:'v1', k2:'v2'})
                .matchHeader('Content-Type', 'application/json;charset=UTF-8')
                .matchHeader('X-Api-Secret', 'theSecret')
                .reply(200, webhookReturnObj, {
                    'Content-type': 'application/json;charset=UTF-8'
                });

            runs(function() {
                send.process.call(self, {
                    body:{k1:'v1', k2:'v2'}
                }, {
                    uri: 'http://www.example.com/test',
                    secret:'theSecret'
                });
            });

            waitsFor(function(){
                return self.emit.calls.length === 2;
            }, 'Timed Out', 1000);

            runs(function(){
                expect(nockObj.isDone());
                expect(self.emit.calls[0].args[0]).toEqual('data');
                expect(self.emit.calls[0].args[1].body).toEqual(webhookReturnObj);
                expect(self.emit.calls[1].args).toEqual(['end']);
            });
        });

        it('GET No Auth No QMark', function () {
            var nockObj = nock('http://www.example.com')
                .get('/test?k1=v1&k2=v2')
                .reply(200, webhookReturnObj);

            runs(function() {
                getMethod.process.call(self, {body:{k1:'v1', k2:'v2'}}, {uri: 'http://www.example.com/test'});
            });

            waitsFor(function(){
                return self.emit.calls.length === 2;
            }, 'Timed Out', 1000);

            runs(function(){
                expect(nockObj.isDone());
                expect(self.emit.calls[0].args[0]).toEqual('data');
                expect(self.emit.calls[0].args[1].body).toEqual(webhookReturnObj);
                expect(self.emit.calls[1].args).toEqual(['end']);
            });
        });

        it('GET Auth No QMark', function () {
            var nockObj = nock('http://www.example.com')
                .get('/test?k1=v1&k2=v2')
                .matchHeader('X-Api-Secret', 'theSecret')
                .reply(200, webhookReturnObj);

            runs(function() {
                getMethod.process.call(self, {body:{k1:'v1', k2:'v2'}}, {uri: 'http://www.example.com/test', secret:'theSecret'});
            });

            waitsFor(function(){
                return self.emit.calls.length === 2;
            }, 'Timed Out', 1000);

            runs(function(){
                expect(nockObj.isDone());
                expect(self.emit.calls[0].args[0]).toEqual('data');
                expect(self.emit.calls[0].args[1].body).toEqual(webhookReturnObj);
                expect(self.emit.calls[1].args).toEqual(['end']);
            });
        });

        it('GET No Auth QMark', function () {
            var nockObj = nock('http://www.example.com')
                .get('/test?k1=v1&k2=v2')
                .reply(200, webhookReturnObj);

            runs(function() {
                getMethod.process.call(self, {body:{k1:'v1', k2:'v2'}}, {uri: 'http://www.example.com/test?'});
            });

            waitsFor(function(){
                return self.emit.calls.length === 2;
            }, 'Timed Out', 1000);

            runs(function(){
                expect(nockObj.isDone());
                expect(self.emit.calls[0].args[0]).toEqual('data');
                expect(self.emit.calls[0].args[1].body).toEqual(webhookReturnObj);
                expect(self.emit.calls[1].args).toEqual(['end']);
            });
        });

        it('GET Auth QMark', function () {
            var nockObj = nock('http://www.example.com')
                .get('/test?k1=v1&k2=v2')
                .matchHeader('X-Api-Secret', 'theSecret')
                .reply(200, webhookReturnObj);

            runs(function() {
                getMethod.process.call(self, {body:{k1:'v1', k2:'v2'}}, {uri: 'http://www.example.com/test?', secret:'theSecret'});
            });

            waitsFor(function(){
                return self.emit.calls.length === 2;
            }, 'Timed Out', 1000);

            runs(function(){
                expect(nockObj.isDone());
                expect(self.emit.calls[0].args[0]).toEqual('data');
                expect(self.emit.calls[0].args[1].body).toEqual(webhookReturnObj);
                expect(self.emit.calls[1].args).toEqual(['end']);
            });
        });

        it('404', function () {
            var nockObj = nock('http://www.example.com').get('/test?k1=v1&k2=v2').matchHeader('X-Api-Secret', 'theSecret').reply(404);

            runs(function () {
                getMethod.process.call(self, {body: {k1: 'v1', k2: 'v2'}}, {uri: 'http://www.example.com/test?', secret: 'theSecret'});
            });

            waitsFor(function () {
                return self.emit.calls.length === 2;
            }, 'Timed Out', 1000);

            runs(function () {
                expect(nockObj.isDone());
                expect(self.emit.calls[0].args[0]).toEqual('error');
                expect(self.emit.calls[0].args[1].message).toEqual('Endpoint responds with 404');
                expect(self.emit.calls[1].args).toEqual(['end']);
            });
        });
    });


    it('Inbound', function () {
        var msg = {
          body: {
              foo: "bar"
          }
        };


        runs(function () {
            receive.process.call(self, msg, {});
        });

        waitsFor(function () {
            return self.emit.calls.length === 2;
        }, 'Timed Out', 1000);

        runs(function () {
            expect(self.emit.calls[0].args[1]).toBeDefined();
            expect(self.emit.calls[0].args[1].body).toBeDefined();
            expect(self.emit.calls[0].args[1].body._query).toBeUndefined();
            expect(self.emit.calls[0].args).toEqual(['data', msg]);
            expect(self.emit.calls[1].args).toEqual(['end']);
        });
    });

    it('Inbound with query', function () {
        var msg = {
            body: {
                foo: "bar"
            },
            query : {
                baz: 'boo'
            }
        };


        runs(function () {
            receive.process.call(self, msg, {});
        });

        waitsFor(function () {
            return self.emit.calls.length === 2;
        }, 'Timed Out', 1000);

        runs(function () {
            expect(self.emit.calls[0].args[1]).toBeDefined();
            expect(self.emit.calls[0].args[1].body).toBeDefined();
            expect(self.emit.calls[0].args[1].body._query).toEqual({baz: 'boo'});
            expect(self.emit.calls[0].args).toEqual(['data', msg]);
            expect(self.emit.calls[1].args).toEqual(['end']);
        });
    });
});