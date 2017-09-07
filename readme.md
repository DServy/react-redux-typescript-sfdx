# react-typescript-sfdx

Demo showing how to use typescript to create client side react apps in Salesforce Visualforce pages

## Dev Setup

1. `npm install`

1. add `build.properties` to `./sfdx-build` (will be replaced with sfdx in future)

1. Deploy code: `npm run deploy`

1. navigate to `[ORG]/apex/app`

1. start webpack-dev-server `npm start run`

1. append `?local=1` url.  Might need to allow invalid ssl for the first time on the js file (look in souce for app.js, open it in browser, tell chrome to fuck off)

1. change something & save

1. page will be updated