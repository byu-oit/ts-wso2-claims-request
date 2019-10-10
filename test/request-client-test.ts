import {assert} from 'chai';
import sinon from 'sinon';
import {AdjudicatorWSO2RequestClient as CEC} from '../lib';

describe('Assertions WSO2 Request Client', () => {
    let client: CEC;
    const stubUrl = 'fakeUrl';
    const stubRequestOptions = {resolveWithFullResponse: true};
    const defaultId = '0';
    const flag = true;

    beforeEach(() => {
        client = new CEC({url: stubUrl}, {id: defaultId});
    });

    afterEach(() => {
        sinon.restore();
    });

    it('will instantiate the default ClaimsRequest class', () => {
        try {
            client = new CEC({url: stubUrl});
            assert.isTrue(flag);
        } catch (e) {
            assert.isFalse(flag)
        }
    });

    it('will instantiate a non-default ClaimsRequest class', () => {
        try {
            client = new CEC({url: stubUrl, request: stubRequestOptions});
            assert.isTrue(flag);
        } catch (e) {
            assert.isFalse(flag)
        }
    });

    it('will make a request to the getConcepts endpoint of the specified url', async () => {
        const stubRequest = sinon.stub(CEC, 'request');
        await client.info();
        assert.equal(stubRequest.callCount, 1);
    });

    it('will make a request to the verify "this" assertion', async () => {
        const stubRequest = sinon.stub(CEC, 'request');
        await client
            .subject('John')
            .mode('all')
            .claim(CEC.claim()
                .concept('subject-exists')
                .relationship('eq')
                .value('true')
                .qualify('age', 43))
            .verify();
        assert.equal(stubRequest.callCount, 1);
    });

    it('will make a request to verify multiple assertions', async () => {
        const stubRequest = sinon.stub(CEC, 'request');
        const first = client
            .id('1')
            .subject('John')
            .mode('all')
            .claims([
                CEC.claim()
                .concept('subject-exists')
                .relationship('eq')
                .value('true')
                .qualify('age', 43)
            ])
            .assertion();
        const second = client
            .id('2')
            .subject('Jane')
            .mode('all')
            .claims([
                CEC.claim()
                .concept('subject-exists')
                .relationship('eq')
                .value('true')
                .qualify('age', 41)
            ])
            .assertion();
        await client.verify(CEC.join(first, second));
        assert.notDeepEqual(first, second);
        assert.equal(stubRequest.callCount, 1);
    })
});
