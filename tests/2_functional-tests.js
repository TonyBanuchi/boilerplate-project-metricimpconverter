const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
    //#1 Convert a valid input such as 10L: GET request to /api/convert.
    test('?input=10gal', function (done) {
        chai.request(server).keepOpen().get('/api/convert?input=10gal').end(
            (err, res) => {
                assert.equal(res.status, 200, 'Response status should be 200');
                assert.deepEqual(
                    res.body,
                    {
                        "initNum": 10,
                        "initUnit": "gal",
                        "returnNum": 37.8541,
                        "returnUnit": "L",
                        "string": "10 gallons converts to 37.8541 liters"
                    },
                    'Response should contain conversion object of 10gal to L'
                );
                done();
            }
        );
    });

    //#2 Convert an invalid input such as 32g: GET request to /api/convert.
    test('?input=32g', function (done) {
        chai.request(server).keepOpen().get('/api/convert?input=32g').end(
            (err, res) => {
                assert.equal(res.status, 200, 'Response status should be 200');
                assert.equal(
                    res.text,
                    "invalid unit",
                    'Response should be "invalid unit"'
                );
                done();
            }
        );
    });

    //#3 Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert.
    test('?input=3/7.2/4kg', function (done) {
        chai.request(server).keepOpen().get('/api/convert?input=3/7.2/4kg').end(
            (err, res) => {
                assert.equal(res.status, 200, 'Response status should be 200');
                assert.equal(
                    res.text,
                    "invalid number",
                    'Response should be "invalid number"'
                );
                done();
            }
        );
    });

    //#4 Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert.
    test('?input=3/7.2/4kilomegagram', function (done) {
        chai.request(server).keepOpen().get('/api/convert?input=3/7.2/4kilomegagram').end(
            (err, res) => {
                assert.equal(res.status, 200, 'Response status should be 200');
                assert.equal(
                    res.text,
                    "invalid number and unit",
                    'Response should be "invalid number and unit"'
                );
                done();
            }
        );
    });

    //#5 Convert with no number such as kg: GET request to /api/convert.
    test('?input=gal', function (done) {
        chai.request(server).keepOpen().get('/api/convert?input=gal').end(
            (err, res) => {
                assert.equal(res.status, 200, 'Response status should be 200');
                assert.deepEqual(
                    res.body,
                    { 
                        "initNum": 1, 
                        "initUnit": "gal", 
                        "returnNum": 3.78541, 
                        "returnUnit": "L", 
                        "string": "1 gallons converts to 3.78541 liters" 
                    },
                    'Response should contain conversion object of 1gal to L'
                );
                done();
            }
        );
    });
});
