import {RequestPromiseOptions} from 'request-promise'
import AssertionsClient from '@byu-oit/ts-claims-engine-client';
import * as wso2 from '@byu-oit/wso2-request';

export default class AssertionWSO2RequestClient extends AssertionsClient {
    static makeRequest = (options: RequestPromiseOptions, originalJWT?: string) => {
        // The type definition file defines multiple request functions instead of a
        // single function with a potentially undefined parameter.
        if (originalJWT) {
            return wso2.request(options, originalJWT);
        }
        return wso2.request(options);
    };

    private readonly URL: string;
    public response: any = null;

    constructor(claimsUrl: string, settings?: wso2.OauthSettings) {
        super();
        this.URL = claimsUrl;
        if (settings) {
            wso2.setOauthSettings(settings);
        }
    }

    public info = async (options?: RequestPromiseOptions, originalJWT?: string) => {
        options = Object.assign({
            url: this.URL,
            method: 'GET',
            json: true,
            resolveWithFullResponse: true,
            simple: false,
            encoding: 'utf8',
            headers: {
                Accept: 'application/json'
            }
        }, options);
        this.response = await AssertionWSO2RequestClient.makeRequest(options, originalJWT);
        return this.response;
    };

    public verify = async (options?: RequestPromiseOptions, originalJWT?: string) => {
        options = Object.assign({
            url: this.URL,
            method: 'POST',
            json: true,
            resolveWithFullResponse: true,
            simple: false,
            encoding: 'utf8',
            headers: {
                Accept: 'application/json'
            },
            body: this.assertions
        }, options);
        this.response = await AssertionWSO2RequestClient.makeRequest(options, originalJWT);
        return this.response;
    };
}
