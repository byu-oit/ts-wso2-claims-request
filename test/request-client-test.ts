import {assert} from 'chai';
import {SinonStub, stub} from 'sinon';
import * as wso2 from '@byu-oit/wso2-request'
import ClaimsRequest from '../lib'

describe('Assertions WSO2 Request Client', () => {
    let stubRequest: SinonStub;
    let client1: ClaimsRequest;
    let client2: ClaimsRequest;

    beforeEach(() => {
        stubRequest = stub(wso2, 'request');
        client1 = new ClaimsRequest('fakeUrl', {
            clientKey: 'fakeKey',
            clientSecret: 'fakeSecret',
            wellKnownUrl: 'fakeWellKnown'
        });
        client2 = new ClaimsRequest('fakeUrl');
    });

    afterEach(() => {
        stubRequest.restore();
    });

    it('will make a request to the getConcepts endpoint of the specified url', () => {
        let c = client1.info({}, 'fakeJWT');
        assert.equal(stubRequest.callCount, 1);
    });

    it('will make a request to the verify endpoint of the specified url', async () => {
        let c = client2
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
