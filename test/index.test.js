const expect = require('chai').expect;
const sinon = require("sinon");
const axios = require("axios");
const { User } = require('../getData')


describe('Making GET request to "example.com"', () => {
    
    describe('Successfull request', () => {

        let stub;
        const user = new User;
        beforeEach(() => {
        stub = sinon.stub(user, "getData");
        });
        afterEach(() => {
            stub.restore();
        });

        it('should respond with a status code 200', async () => {

            stub.withArgs("http://example.com").resolves({
            status: 200,
            headers: { "content-type": "text/html; charset=UTF-8" },
            data: 'string'
        });

            const result = await user.getData("http://example.com");
            expect(result.status).to.equal(200);
        });





        
        it('should have an endpoint http://www.example.com', () => {
            
        });
        it('should use a GET method', () => {
            
        });
        it('should respond with content-type header text/html', async () => {
            /* const result = await user.getData("http://example.com");
            expect(result.headers).to.include({
                "content-type": "text/html; charset=UTF-8",
              }); */
        });
        it('should respond with data in string format', async () => {
            /* const result = await axios.get("http://example.com");
            expect(result.data).to.be.a('string') */
        });
        it('should return data containing at least one char', () => {

        });
    })

    describe('Unsuccessfull request', () => {

        /* let stub;
        beforeEach(() => {
        stub = sinon.stub(axios, "get");
        stub.withArgs("http://example.com").resolves({
            status: 400
        });
        afterEach(() => {
            stub.restore();
        });
        }) */

        it('should respond with status code 405 if the specified request method is not a GET', () => {
            
        });
        it('should throw an error message: "the request method should be GET" if the specified request method is not a GET', () => {
            
        });
        it('should respond with status code 400 if the endpoint is misspelled', () => {
            
        });
        it('should throw an error message: "incorrect endpoint" if the endpoint is misspelled', () => {

        });
        it('should convert json to string format if data retrieved came with "application/json" header', () => {

        });
        it('should be a not empty string', () => {

        });
    })
    describe('Data returned in response came with content-type header "application/json"', () => {
        it('should convert json to string format', () => {

        });
    });
    describe('Server is not responding', () => {
        it('should respond with status code 500', () => {
            
        });
        it('should throw en error message "Something wrong with connection to a server. Do you want to try again?"', () => {

        });
    });
    describe('data retrieved succsessfully', () => {
        it('should log the data into the console', () => {

        });
    });
});
