# ts-wso2-claims-request
[![Coverage Status](https://coveralls.io/repos/github/byu-oit/ts-wso2-claims-request/badge.svg?branch=master)](https://coveralls.io/github/byu-oit/ts-wso2-claims-request?branch=master)
[![Build Status](https://travis-ci.org/byu-oit/ts-wso2-claims-request.svg?branch=master)](https://travis-ci.org/byu-oit/ts-wso2-claims-request)

## Installation
`npm i @byu-oit/ts-wso2-claims-request`

## Introduction
This module is an extension of the [Claims Adjudicator Client](https://github.com/byu-oit/ts-claims-engine-client). It adds a few helper functions that are specific to users who commonly use the [BYU WSO2 Request package](htts://github.com/byu-oit/byu-wso2-request).

## Example
```ts
const {AdjudicatorClient: CEC} = require('@byu-oit/ts-claims-engine-client')
const client = new CEC();

client.subject('John')
    .mode('all')
    .claim(CEC.claim()
        .concept('subject-exists')
        .relationship('eq')
        .value('true')
        .qualify('age', 43))

// Must set the wso2 settings before attempting to verify a claim!
CEC.setOauthSettings(clientKey, clientSecret)
	.then(() => client.verify())
	.then(response => console.log(JSON.stringify(response, null, 2)))
	.catch(console.error)
```

## API
Some of the parameters and return types are complex objects. Instead of listing them in the method definitions, they have been listed in the [Appendix](#appendix) under [API Reference](#api-reference).

### AdjudicatorWSO2RequestClient
Creates a new instance of the AdjudicatorWSO2RequestClient, which is an extension of the [Claims Adjudicator Client](https://github.com/byu-oit/ts-claims-engine-client).
```ts
AdjudicatorWSO2RequestClient(config: AdjudicatorWSO2RequestClientParams, assertionParams?: AssertionClientParams)
```


### Static Methods
`AdjudicatorWSO2RequestClient.setOauthSettings`: Exposes the [BYU WSO2 Request](https://github.com/byu-oit/byu-wso2-request) setOauthSettings function.

`AdjudicatorWSO2RequestClient.request`: Exposes the [BYU WSO2 Request](https://github.com/byu-oit/byu-wso2-request) request function.

### Public Methods
`info`: Calls the "getConcepts" endpoint of the claims engine at the URL specified in the class configuration.
```ts
AdjudicatorWSO2RequestClient.info(): Promise<any>
```

`verify`: Calls the "verifyClaim" endpoint of the claims engine at the URL specified in the class configuration. The request body is given the current assertion stored in the class if no assertions are passed in. In the case that assertions are passed in, they are placed in the request body.
```ts
AdjudicatorWSO2RequestClient.verify(assertions?: any): Promise<any>
```


## Appendix

### API Reference

[RequestPromiseOptions](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/7d1ee0c34ac518764b3d2b1ee3ff9dc5c5a5ddce/types/request-promise/index.d.ts#L24)

[AssertionClientParams](https://github.com/byu-oit/ts-claims-engine-client/#api-reference)

```ts
interface AdjudicatorWSO2RequestClientParams {
    url: string
    request?: RequestPromiseOptions
}
```

### Related Packages
* **[Claims Adjudicator Module (CAM)](https://github.com/byu-oit/ts-claims-engine)**
* **[Claims Adjudicator Middleware](https://github.com/byu-oit/ts-claims-engine-middleware)**
* **[Claims Adjudicator Client](https://github.com/byu-oit/ts-claims-engine-client)**
* **[Claims Adjudicator WSO2 Request](https://github.com/byu-oit/ts-wso2-claims-request)**
* **[BYU WSO2 Request](https://github.com/byu-oit/byu-wso2-request)**
