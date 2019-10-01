import {assert} from 'chai';
import {SinonStub, stub} from 'sinon';
import ClaimsRequest from '../lib'

describe('Assertions WSO2 Request Client', () => {
    let stubRequest: SinonStub;
    let client: ClaimsRequest;

    beforeEach(() => {
        stubRequest = stub(ClaimsRequest, 'makeRequest');
        client = new ClaimsRequest('fakeUrl', {
            clientKey: 'fakeKey',
            clientSecret: 'fakeSecret',
            wellKnownUrl: 'fakeWellKnown'
        });
    });

    afterEach(() => {
        stubRequest.restore();
    });

    it('will make a request to the getConcepts endpoint of the specified url', () => {
        let c = client.info();
        assert.equal(stubRequest.callCount, 1);
    });

    it('will make a request to the verify endpoint of the specified url', async () => {
        let c = client
            .assert('1')
            .subject('John')
            .mode('all')
            .claim(ClaimsRequest.claim()
                .concept('subject-exists')
                .relationship('eq')
                .value('true')
                .qualify('age', 43))
            .verify();
        assert.equal(stubRequest.callCount, 1);
    });
});
