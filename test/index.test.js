const sinon = require("sinon");
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
const axios = require("axios");
const { User } = require('../getData');
const { assert } = require("chai");
const dataExample = require('./dataExample')
chai.use(sinonChai);
chai.use(chaiAsPromised);

describe('Making GET request to "example.com"', () => {
    
    let stub;
    const user = new User;
    beforeEach(() => {
    stub = sinon.stub(axios, "get");
    stub.resolves({
        status: 200,
        headers: { "content-type": "text/html; charset=UTF-8" },
        data: dataExample
    });
    });
    afterEach(() => {
        stub.restore();
    });

    describe('Successfull request', () => {
        it('should make GET request only once"', async () => {
            let spy = sinon.spy(user, "getData")
            await user.getData('http://www.example.com')
            expect(spy).to.have.been.calledOnce;

            spy.restore();
        });

        it('should use only GET method', async () => {
            let postSpy = sinon.spy(axios, 'post');
            let putSpy = sinon.spy(axios,"put");
            let deleteSpy = sinon.spy(axios, "delete");
            await user.getData('http://www.example.com')
            expect(postSpy.calledOnce).to.be.false;
            expect(putSpy.calledOnce).to.be.false;
            expect(deleteSpy.calledOnce).to.be.false;
        });

        it('should call "http://www.example.com"', async () => {
            let spy = sinon.spy(user,'getData');
            await user.getData('http://www.example.com')
            expect(spy).to.have.been.calledWith('http://www.example.com');

            spy.restore();
        }); 

        it('should return response if succeeded with status code 200', async () => {
            const result = await user.getData();
            assert.isOk(result.data)
        });
    })

    describe('Unsuccessfull request', () => {
        it('should throw "Bad Request" if fails with status code 400', async () => {
            stub.resolves({
            status: 400,
        });
            const result = user.getData("http://example.com");
            await expect(result).to.eventually.rejectedWith('Bad Request');
        }); 
        
        it('should throw "Not Found" if fails with status code 404', async () => {
            stub.resolves({
            status: 404,
        });
            const result = user.getData("http://example.com");
            await expect(result).to.eventually.rejectedWith('Not Found');
        });

        it('should throw error if content type not text/html', async () => {
            stub.resolves({
                status: 200,
                headers: { "content-type": "application/json" },
            });
            const result = user.getData("http://example.com");
            await expect(result).to.eventually.rejectedWith('not text/html');
        })
    })
    describe('Server is not responding', () => {
        it('should outputs an error message to the console if fails with status code 500"', async () => {
            stub.resolves({
            status: 500,
        });
            let consoleStub = sinon.stub(console, "error");
            const clock = sinon.useFakeTimers();
            await user.getData();
            clock.tick(2000);
            expect(consoleStub).to.be.called;
        });

        it('should retry to connect if failed to connect', async() => {
            stub.resolves({
                status: 500
            });
            let retrySpy = sinon.spy(user, "retryRequest");
            const clock = sinon.useFakeTimers();
            await user.getData("http://example.com");
            clock.tick(2000);
            expect(retrySpy).to.be.calledOnce;
        })
    });

    describe('data retrieved succsessfully', () => {
        it('should log the data into the console', async () => {
            stub.resolves({
                status: 200,
                headers: { "content-type": "text/html; charset=UTF-8" },
                data: dataExample
            })
            sinon.spy(console,"log")
            await user.getData();
            expect(console.log).to.be.called;
        });
    });
});
