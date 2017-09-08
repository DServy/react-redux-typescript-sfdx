# react-typescript-sfdx

Demo showing how to use typescript to create client side react apps in Salesforce Visualforce pages

## Dev Setup

### setup sfdx

1. install the [sfdx cli](https://developer.salesforce.com/tools/sfdxcli)

1. authorize a dev org `sfdx force:auth:web:login -a react-dev-org --setdefaultusername`

1. optional:  authorize a production org `sfdx force:auth:web:login -a production` (used with `release` script)

### install -> build -> deploy

1. clone

1. `npm install`

1. `npm run build`

1. Deploy code: `npm run deploy`

## develop

### working on salesforce

1. navigate to: `[ORG]/apex/app`

1. start webpack-dev-server: `npm start run`

1. append `?local=1` url.  Might need to allow invalid ssl for the first time on the js file (look in souce for app.js, open it in browser, tell chrome to fuck off)

1. change something & save

1. page will be updated

### working locally

When working locally we can take advantage of HMR.  However, there is a little setup to get the app to connect with the rest API.

***Note: if you use `@RemoteActions` or `RemoteObjects` local dev will not work without mocking them out***

1. `npm run start-hot`

***Note: to bypass salesforce CORS, we send all request to a heroku instance of [sf-cors-proxy](https://github.com/jamesward/sf-cors-proxy)***

## TODO

- Make react example more complete
- add code gen tool to generate sObject types from meta-data API
- move SObject client classes to their own package
  - add bulk API support
  - add RemoteAction support
