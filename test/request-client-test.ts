import {assert} from 'chai';
import * as sinon from 'sinon';
import ClaimsRequest from '../lib'
import AssertionWSO2RequestClient from "../lib";

describe('Assertions WSO2 Request Client', () => {
    let client: ClaimsRequest;

    beforeEach(() => {
        client = new ClaimsRequest('fakeUrl', {
            clientKey: 'fakeKey',
            clientSecret: 'fakeSecret',
            wellKnownUrl: 'fakeWellKnown'
        })
    });

    it('will make a request to the getConcepts endpoint of the specified url', () => {
        const stubRequest = sinon.stub(ClaimsRequest, 'makeRequest');
        let c = client
            .assert('1')
            .subject('John')
            .mode('all')
            .claim(ClaimsRequest.claim()
                .concept('subject-exists')
                .relationship('eq')
                .value('true')
                .qualify('age', 43)) as AssertionWSO2RequestClient;
        const response = c.info();
        assert.equal(stubRequest.callCount, 1);
    });

    it('will make a request to the verify endpoint of the specified url', async () => {
        const stubRequest = sinon.stub(ClaimsRequest, 'makeRequest');
        let c = client
            .assert('1')
            .subject('John')
            .mode('all')
            .claim(ClaimsRequest.claim()
                .concept('subject-exists')
                .relationship('eq')
                .value('true')
                .qualify('age', 43)) as AssertionWSO2RequestClient;
        const response = c.verify();
        assert.equal(stubRequest.callCount, 1);
    });
});
