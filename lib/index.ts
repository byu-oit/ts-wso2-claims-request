import {AdjudicatorClient, AssertionClientParams} from '@byu-oit/ts-claims-engine-client';
import * as wso2 from 'byu-wso2-request';
import {RequestPromiseOptions} from 'request-promise';

export interface AdjudicatorWSO2RequestClientParams {
    url: string;
    request?: RequestPromiseOptions;
}

const defaultOptions = {
    json: true,
    simple: false,
    encoding: 'utf8',
    headers: {
        Accept: 'application/json'
    }
};

export class AdjudicatorWSO2RequestClient extends AdjudicatorClient {

    public static setOauthSettings = wso2.setOauthSettings;

    public static request = wso2.request;
    private static getInfoOptions = (url: string, requestOptions: RequestPromiseOptions = {}) => {
        return Object.assign(defaultOptions, requestOptions, {url, method: 'GET'});
    };

    private static getVerifyOptions = (assertions: any, url: string, requestOptions: RequestPromiseOptions = {}) => {
        return Object.assign(defaultOptions, requestOptions, {url, method: 'PUT', body: assertions});
    };

    private readonly url: string;
    private readonly requestOptions?: RequestPromiseOptions;

    constructor(config: AdjudicatorWSO2RequestClientParams, assertionParams?: AssertionClientParams) {
        super(assertionParams);
        this.url = config.url;
        this.requestOptions = config.request;
    }

    public info = async () => {
        const options = AdjudicatorWSO2RequestClient.getInfoOptions(this.url, this.requestOptions);
        return AdjudicatorWSO2RequestClient.request(options);
    };

    public verify = async (assertions?: any) => {
        const options = AdjudicatorWSO2RequestClient.getVerifyOptions(assertions || this.assertion, this.url, this.requestOptions);
        return AdjudicatorWSO2RequestClient.request(options);
    };
}
