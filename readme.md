# react-typescript-sfdx

Demo showing how to use typescript to create client side react apps in Salesforce Visualforce pages

## Dev Setup

### setup sfdx

1. install the [sfdx cli](https://developer.salesforce.com/tools/sfdxcli)

1. authorize a dev org `sfdx force:auth:web:login -a react-dev-org --setdefaultusername`

### install

1. clone

1. `npm install`

### build

#### non-scratch org

1. `npm run deploy-dev`

#### scratch org

1. `run new-scratch-org`
1. `npm run deploy-scratch`

## develop

### on salesforce

1. navigate to: `[ORG]/apex/app`

1. start webpack-dev-server: `npm start run`

1. append `?local=1` url.  Might need to allow invalid ssl for the first time on the js file (look in source for app.js, open it in browser, tell chrome to fuck off)

1. change something & save

1. page will be updated

### locally

When working locally we can take advantage of HMR.

***Note: if you use `@RemoteActions` or `RemoteObjects` local dev will not work without mocking them out***

1. `npm run start-local`

***WARNING: to bypass salesforce CORS, we send all request to a heroku instance of [sf-cors-proxy](https://github.com/jamesward/sf-cors-proxy).  This is defaulted to a heroku instance I'm running.  IF YOU ARE CONCERNED ABOUT SECURITY, PLEASE CREATE YOUR OWN HEROKU APP AND ROUTE REQUEST THROUGH THAT.  I'M NOT LIABLE IF ANYTHING HAPPENS!  SHOULD NOT BE USED WHEN CONNECTED WITH PRODUCTION ORG!!!!***

### injecting global state

`webpack.locl.config.js` is currently setup to inject global vars need to connect to the REST API.  If you inject additional vars into your visual force page, you'll need to add these to the `webpack.DefinePlugin` section.

## release

1. authorize a production org `sfdx force:auth:web:login -a production`

1. `npm run deploy-prod`

1. drink beer ;)

## todo

- Make react example more complete
- create production webpack config
- move SObject client classes to their own package
  - add bulk API support
  - add RemoteAction support
  - add code gen tool to generate sObject types from meta-data API
